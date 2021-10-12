import { useEffect, useState } from 'react';
import { connect } from "react-redux";
import Select from 'react-select';

function Categories(props) {

    const [moviesCopy, setMoviesCopy] = useState([]);
    const [stateCatego, setStateCatego] = useState([]);

    useEffect(() => {
        async function loadData() {
          if(props.counterFilter === 1) {
            setMoviesCopy(props.movies);
          }
          props.filterCatego(stateCatego, moviesCopy, props.counterFilter);
        };
        loadData()
    }, [props.counterFilter]);

    const options = props.categoryReduc.map(category => {
        return { value: category, label: category }
    });

    const onChangeSelect = (selectedOption) => {
        props.setCounterFilter(props.counterFilter+1);
        setStateCatego(selectedOption);
    }

    return (
        <Select 
            options={options}
            isMulti
            className='selectCatego'
            onChange={onChangeSelect}
        />
    );
}

function mapStateToProps(state) {
    return { movies: state.movies, categoryReduc: state.categoryReduc}
}

function mapDispatchToProps(dispatch) {
  return {
    filterCatego: function (catego, arrayMovies, counterFilter) {
        dispatch({ type: "filterCatego", catego: catego, arrayMovies: arrayMovies, counterFilter: counterFilter });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);