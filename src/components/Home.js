import { useEffect, useState } from 'react';
import { movies$ } from '../lib/movies';
import { connect } from "react-redux";
import Movie from './Movie';

function Home(props) {

  const [bool, setBool] = useState(false);
  const [counterFilter, setCounterFilter] = useState(0);
  const [moviesCopy, setMoviesCopy] = useState([]);
  const [stateCatego, setStateCatego] = useState('');

  useEffect(() => {
    // chargement du tableau à l'initialisation
    async function loadData() {
      const promise = movies$;
      promise.then(moviesLb => {
        props.addMovies(moviesLb);

        const optionCategory = moviesLb.map((movie) => movie.category);
        const filteredArray = optionCategory.filter((el, pos) => optionCategory.indexOf(el) === pos);
        props.addCategory(filteredArray);
      });
    };
    loadData()
  }, []);

  useEffect(() => {
    async function loadData() {
      const optionCategory = props.movies.map((movie) => movie.category);
      const filteredArray = optionCategory.filter((el, pos) => optionCategory.indexOf(el) === pos);
      props.addCategory(filteredArray);
    };
    loadData()
  }, [bool]);

  useEffect(() => {
    async function loadData() {
      if(counterFilter === 1) {
        setMoviesCopy(props.movies);
      }
      props.filterCatego(stateCatego, moviesCopy, counterFilter);
    };
    loadData()
  }, [counterFilter]);

  const onChangeSelect = (catego) => {
    setCounterFilter(counterFilter+1);
    setStateCatego(catego);
  }

  const tabMovies = props.movies.map((movie) => {
    return (
      <Movie 
        key={movie.id}
        bool={bool}
        setBool={setBool}
        counterFilter={counterFilter}
        setCounterFilter={setCounterFilter}
        id={movie.id}
        title={movie.title}
        category={movie.category}
        likes={movie.likes}
        dislikes={movie.dislikes}
      />
    )
  });

  const displayOptionCategory = props.categoryReduc.map((category, i) => <option key={i} value={category}>{category}</option>);

  return (
    <div className="containerFull">
      <select name="selectCatego" className="selectCatego" onChange={ (e) => onChangeSelect(e.target.value) }>
        <option value="Category">Filtrer par catégories</option>
        {displayOptionCategory}
      </select>
      <div className="container">
          {tabMovies}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return { movies: state.movies, categoryReduc: state.categoryReduc}
}

function mapDispatchToProps(dispatch) {
  return {
    addMovies: function (movies) {
      dispatch({ type: "addMovies", movies: movies });
    },
    addCategory: function (category) {
      dispatch({ type: "addCategory", categoryReduc: category });
    },
    filterCatego: function (catego, arrayMovies, counterFilter) {
      dispatch({ type: "filterCatego", catego: catego, arrayMovies: arrayMovies, counterFilter: counterFilter });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);