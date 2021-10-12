export default function(movies = [], action) {
    if (action.type === 'addMovies') {
        return action.movies;
    } else if(action.type === 'deleteMovie') {
        const moviesCopy = movies.filter(movie => movie.id !== action.idMovie);
        return moviesCopy;
    } else if(action.type === 'moreLike') {
        const moviesCopy = [...movies];
        moviesCopy.find(movie => movie.id === action.idMovie).likes++;
        return moviesCopy;
    } else if(action.type === 'lessLike') {
        if (movies.find(movie => movie.id === action.idMovie).dislikes > 0) {
            const moviesCopy = [...movies];
            moviesCopy.find(movie => movie.id === action.idMovie).dislikes--;
            return moviesCopy;
        } else {
            return movies;    
        }
    } else if(action.type === 'filterCatego') {
        if (action.counterFilter > 1) {
            movies = action.arrayMovies;
        }
        if (action.catego.length === 0) {
            return movies;
        } else {
            const catFilter = action.catego.map(cat => cat.value);
            const moviesCopy = movies.filter(movie => catFilter.includes(movie.category));
            return moviesCopy;
        }
    } else {
        return movies;
    }
}