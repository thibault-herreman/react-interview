import { connect } from "react-redux";

function Categories(props) {

    const displayOptionCategory = props.categoryReduc.map((category, i) => <option key={i} value={category}>{category}</option>);

    const onChangeSelect = (catego) => {
        props.setCounterFilter(props.counterFilter+1);
        props.setStateCatego(catego);
    }

    return (
        <select name="selectCatego" className="selectCatego" onChange={ (e) => onChangeSelect(e.target.value) }>
            <option value="Category">Filtrer par catégories</option>
            {displayOptionCategory}
        </select>
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