import { useEffect, useState } from 'react';
import { movies$ } from '../lib/movies';
import { connect } from "react-redux";
import { 
  CloseOutlined,
  LikeOutlined,
  DislikeOutlined
} from '@ant-design/icons';

function Home({movies, category, ...props}) {

  const [arrayMovies, setArrayMovies] = useState([]);
  const [bool, setBool] = useState(false);

  useEffect(() => {
    // chargement du tableau à l'initialisation
    async function loadData() {
      const promise = movies$;
      promise.then(moviesLb => {
        props.addMovies(moviesLb);
        setArrayMovies(moviesLb);

        const optionCategory = moviesLb.map((movie) => movie.category);
        const filteredArray = optionCategory.filter((el, pos) => optionCategory.indexOf(el) === pos);
        props.addCategory(filteredArray);
      });
    };
    loadData()
  }, []);

  useEffect(() => {
    async function loadData() {
      const optionCategory = movies.map((movie) => movie.category);
      const filteredArray = optionCategory.filter((el, pos) => optionCategory.indexOf(el) === pos);
      // console.log(filteredArray);
      props.addCategory(filteredArray);
    };
    loadData()
  }, [bool]);

  const handleClickDelete = (idMovie) => {
    props.deleteMovie(idMovie);
    setBool(!bool);
  }

  const handleClickMoreLike = (idMovie) => {
    props.moreLike(idMovie);
  }

  const handleClickLessLike = (idMovie) => {
    props.lessLike(idMovie);
  }

  const onChangeSelect = (catego) => {
    props.filterCatego(catego, arrayMovies)
  }

  const tabMovies = movies.map((movie) => {
    return (
      <div key={movie.id} className="movie">
        <p className="movie__title">{movie.title}</p>
        <p>{movie.category}</p>
        <div className="is-flex">
          <button type='button' onClick={() => handleClickMoreLike(movie.id)} className="button"><LikeOutlined /> {movie.likes}</button>
          <button type='button' onClick={() => handleClickLessLike(movie.id)} className="button is-ml15"><DislikeOutlined /> {movie.dislikes}</button>
        </div>
        <CloseOutlined className="crossClose" onClick={() => handleClickDelete(movie.id, movie.category)} />
      </div>
    )
  });

  const displayOptionCategory = category.map((category, i) => <option key={i} value={category}>{category}</option>);

  return (
    <div className="containerFull">
      <select name="selectCatego" className="selectCatego" onChange={ (e) => onChangeSelect(e.target.value) }>
        <option value="Category">Category</option>
        {displayOptionCategory}
      </select>
      <div className="container">
          {tabMovies}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return { movies: state.movies, category: state.category}
}

function mapDispatchToProps(dispatch) {
  return {
    addMovies: function (movies) {
      dispatch({ type: "addMovies", movies: movies });
    },
    addCategory: function (category) {
      dispatch({ type: "addCategory", category: category });
    },
    deleteMovie: function (idMovie) {
      dispatch({ type: "deleteMovie", idMovie: idMovie });
    },
    moreLike: function (idMovie) {
      dispatch({ type: "moreLike", idMovie: idMovie });
    },
    lessLike: function (idMovie) {
      dispatch({ type: "lessLike", idMovie: idMovie });
    },
    filterCatego: function (catego, arrayMovies) {
      dispatch({ type: "filterCatego", catego: catego, arrayMovies: arrayMovies });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);