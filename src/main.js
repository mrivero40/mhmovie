const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key': API_KEY,
    },
});
const ENDPOINT_TRENDING = `trending/movie/day`;
const URL_IMG = 'https://image.tmdb.org/t/p/w300';
const ENDPOINT_GENRES = `genre/movie/list`;
const ENDPOINT_GENRES_LIST = `discover/movie`;
const ENDPOINT_SEARCH = 'search/movie';

// utils

async function createMovies(endpoint, container, config={}) {
    const { data } = await api(endpoint, config);
    const movies = data.results;
    container.innerText = '';
    movies.forEach(movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');
        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', `${URL_IMG}${movie.poster_path}`);
        movieContainer.appendChild(movieImg);
        container.appendChild(movieContainer);
    });
};

async function createCategories(endpoint, container) {
    const { data } = await api(endpoint);
    const categories = data.genres;
    container.innerText = '';
    categories.forEach(category => {
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');

        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id', `id${category.id}`);
        categoryTitle.addEventListener('click', () => {
            location.hash = `#category=${category.id}-${category.name}`;
        });
        const categoryTitleText = document.createTextNode(category.name);

        categoryTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categoryTitle);
        container.appendChild(categoryContainer);
    });
};

// llamados API

function getTrendingMoviesPreview() {
    createMovies(ENDPOINT_TRENDING, trendingMoviesPreviewList);
    /*const { data } = await api(ENDPOINT_TRENDING);
    const movies = data.results;
    trendingMoviesPreviewList.innerText = '';
    movies.forEach(movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', `${URL_IMG}${movie.poster_path}`);

        movieContainer.appendChild(movieImg);
        trendingMoviesPreviewList.appendChild(movieContainer);
    });*/
};

function getGenresPreview() {
    createCategories(ENDPOINT_GENRES, categoriesPreviewList);
    /*const { data } = await api(ENDPOINT_GENRES);
    const categories = data.genres;
    categoriesPreviewList.innerText = '';
    categories.forEach(category => {
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');
        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id', `id${category.id}`);
        categoryTitle.addEventListener('click', () => {
            location.hash = `#category=${category.id}-${category.name}`;
        });
        const categoryTitleText = document.createTextNode(category.name);
        categoryTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categoryTitle);
        categoriesPreviewList.appendChild(categoryContainer);
    });*/
};

function getMoviesByCategory(id) {
    createMovies(ENDPOINT_GENRES_LIST, genericSection, {
        params: {
            with_genres: id,
        },
    });
    /*const { data } = await api(ENDPOINT_GENRES_LIST, {
        params: {
            with_genres: id,
        },
    });
    const movies = data.results;
    genericSection.innerText = '';    
    movies.forEach(movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', `${URL_IMG}${movie.poster_path}`);

        movieContainer.appendChild(movieImg);
        genericSection.appendChild(movieContainer);
    });*/
};

function getMoviesBySearch(query) {
    createMovies(ENDPOINT_SEARCH, genericSection, {
        params: {query},
    });
};
