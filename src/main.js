const URL_TRENDING = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`;
const URL_IMG = 'https://image.tmdb.org/t/p/w300';

async function getTrendingMoviesPreview() {
    const res = await fetch(URL_TRENDING);
    const data = await res.json();
    const movies = data.results;
    console.log(movies);

    movies.forEach(movie => {
        const trendingPreviewMoviesContainer = document.querySelector('#trendingPreview .trendingPreview-movieList');

        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', `${URL_IMG}${movie.poster_path}`);

        movieContainer.appendChild(movieImg);
        trendingPreviewMoviesContainer.appendChild(movieContainer);
    });
};
getTrendingMoviesPreview();