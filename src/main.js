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

async function getTrendingMoviesPreview() {
    const { data } = await api(ENDPOINT_TRENDING);
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
    });
};

async function getGenresPreview() {
    const { data } = await api(ENDPOINT_GENRES);
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
    });
};

async function getMoviesByCategory(id) {
    const { data } = await api(ENDPOINT_GENRES_LIST, {
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
    });
};