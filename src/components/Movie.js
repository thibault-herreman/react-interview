import { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { 
  CloseOutlined,
  LikeOutlined,
  DislikeOutlined
} from '@ant-design/icons';

function Movie(props) {

  const handleClickDelete = (idMovie) => {
    props.deleteMovie(idMovie);
    props.setBool(!props.bool);
    props.setCounterFilter(0);
  }

  const handleClickMoreLike = (idMovie) => {
    props.moreLike(idMovie);
  }

  const handleClickLessLike = (idMovie) => {
    props.lessLike(idMovie);
  }

  return (
    <div className="movie">
        <p className="movie__title">{props.title}</p>
        <p>{props.category}</p>
        <div className="is-flex">
            <button type='button' onClick={() => handleClickMoreLike(props.id)} className="button"><LikeOutlined /> {props.likes}</button>
            <button type='button' onClick={() => handleClickLessLike(props.id)} className="button is-ml15"><DislikeOutlined /> {props.dislikes}</button>
        </div>
        <CloseOutlined className="crossClose" onClick={() => handleClickDelete(props.id, props.category)} />
    </div>
  );
}

function mapStateToProps(state) {
  return { movies: state.movies, categoryReduc: state.categoryReduc}
}

function mapDispatchToProps(dispatch) {
  return {
    deleteMovie: function (idMovie) {
      dispatch({ type: "deleteMovie", idMovie: idMovie });
    },
    moreLike: function (idMovie) {
      dispatch({ type: "moreLike", idMovie: idMovie });
    },
    lessLike: function (idMovie) {
      dispatch({ type: "lessLike", idMovie: idMovie });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Movie);