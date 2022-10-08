// data
let lang = navigator.language;

selectLanguageSection.addEventListener('change', () => {
    lang = selectLanguageSection.value;
    homePage();
});

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key': API_KEY,
        'language': lang,
    },
});
const ENDPOINT_TRENDING = `trending/movie/day`;
const URL_IMG = 'https://image.tmdb.org/t/p/w300';
const ENDPOINT_GENRES = `genre/movie/list`;
const ENDPOINT_GENRES_LIST = `discover/movie`;
const ENDPOINT_SEARCH = 'search/movie';

function likedMoviesList() {
    const item = JSON.parse(localStorage.getItem('liked_movies'));
    let movies;
    if (item) {
        movies = item;
    } else {
        movies = {};
    }
    return movies;
};

function likeMovie(movie) {
    const likedMovies = likedMoviesList();
    console.log(likedMovies);

    if (likedMovies[movie.id]) {
        likedMovies[movie.id] = undefined;
    } else {
        likedMovies[movie.id] = movie;
    };
    localStorage.setItem('liked_movies', JSON.stringify(likedMovies));
};

// utils

const lazyLoader = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting) {
            const url = entry.target.getAttribute('data-img');
            entry.target.setAttribute('src', url);
        };
    });
});

async function createMovies(
    endpoint,
    container,
    config = {},
    { 
        lazyLoad = false,
        clean = true,
    } = {},
) {
    const { data } = await api(endpoint, config);
    const movies = data.results;
    maxPage = data.total_pages;
    console.log(maxPage);
    if (clean) {
        container.innerText = '';
    }

    movies.forEach(movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');
        
        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute(
            lazyLoad ? 'data-img' : 'src',
            `${URL_IMG}${movie.poster_path}`
        );
        movieImg.addEventListener('error', () => {
            movieImg.setAttribute('src', `https://via.placeholder.com/300x450/5c218a/fff?text=${movie.title}`);
        });
        movieImg.addEventListener('click', () => {
            location.hash = `movie=${movie.id}`;
        });

        const movieBtn = document.createElement('button');
        movieBtn.classList.add('movie-btn');
        likedMoviesList()[movie.id] && movieBtn.classList.add('movie-btn--liked');
        movieBtn.addEventListener('click', () => {
            movieBtn.classList.toggle('movie-btn--liked');
            likeMovie(movie);
            getLikedMovies();
        });

        movieContainer.appendChild(movieImg);
        movieContainer.appendChild(movieBtn);
        container.appendChild(movieContainer);        
        
        if(lazyLoad) {
            lazyLoader.observe(movieImg);
        };
    });    
};

async function createCategories(endpoint, container, config = {}) {
    const { data } = await api(endpoint, config);
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
    createMovies(
        ENDPOINT_TRENDING,
        trendingMoviesPreviewList,
        {
            params: {
                'language': lang,
            },
        },
        {
            lazyLoad: true,
            clean: true,
        },
    );
};

function getGenresPreview() {
    createCategories(
        ENDPOINT_GENRES,
        categoriesPreviewList,
        {
            params: {
                'language': lang,
            },
        },
    );    
};

function getMoviesByCategory(id) {
    createMovies(
        ENDPOINT_GENRES_LIST,
        genericSection,
        {
            params: {
                with_genres: id,
                'language': lang,
            },
        },    
        {
            lazyLoad: true,
            clean: true,
        },
    );
};

function getPaginatedMoviesByCategory(id) {
    return async () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        const scrollIsBottom = ( scrollTop + clientHeight) >= ( scrollHeight - 5 );
        const pageIsNotMax = page < maxPage;
        if (scrollIsBottom && pageIsNotMax) {
            createMovies(
                ENDPOINT_GENRES_LIST,
                genericSection,
                {
                    params: {
                        page: page++,
                        with_genres: id,
                        'language': lang,
                    },
                },
                {
                    lazyLoad: true,
                    clean: false,
                },
            );
        };
    };
};


function getMoviesBySearch(query) {
    createMovies(
        ENDPOINT_SEARCH,
        genericSection,
        {
            params: {query},
            'language': lang,
        },
        {
            lazyLoad: true,
            clean: true,
        },
    );
};

function getPaginatedMoviesBySearch(query) {
    return async () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        const scrollIsBottom = ( scrollTop + clientHeight) >= ( scrollHeight - 5 );
        const pageIsNotMax = page < maxPage;
        if (scrollIsBottom && pageIsNotMax) {
            createMovies(
                ENDPOINT_SEARCH,
                genericSection,
                {
                    params: {
                        page: page++,
                        query,
                        'language': lang,
                    },
                }, {
                    lazyLoad: true,
                    clean: false,
                },
            );
        };
    };
};

function getTrendingMovies() {    
    createMovies(
        ENDPOINT_TRENDING,
        genericSection,
        {
            params: {
                'language': lang,
            },
        },
        {
            lazyLoad: true,
            clean: true,
        },
    );    
};

function getPaginatedTrendingMovies() {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const scrollIsBottom = ( scrollTop + clientHeight) >= ( scrollHeight - 5 );
    const pageIsNotMax = page < maxPage;
    if (scrollIsBottom && pageIsNotMax) {
        createMovies(
            ENDPOINT_TRENDING,
            genericSection,
            {
                params: {
                    page: page++,
                    'language': lang,
                },
            }, {
            lazyLoad: true,
            clean: false,
            },
        );
    };
};

async function getMovieById(id) {
    const { data: movie } = await api(
        `movie/${id}`,
        {
            params: {
                'language': lang,
            },
        },
    );

    const movieImgUrl = `${URL_IMG}${movie.poster_path}`;
    console.log(movieImgUrl);
    headerSection.style.background = `
        linear-gradient(180deg, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%),
        url(${movieImgUrl})
    `;

    movieDetailTitle.textContent = movie.title;
    movieDetailScore.textContent = movie.vote_average;
    movieDetailDescription.textContent = movie.overview;

    createCategories(
        `movie/${id}`,
        movieDetailCategoriesList,
        {
            params: {
                'language': lang,
            },
        },
    );
    getRelatedMoviesId(id)
};

async function getRelatedMoviesId(id) {
    createMovies(
        `movie/${id}/similar`,
        relatedMoviesContainer,
        {
            params: {
                'language': lang,
            },
        },
        {
            lazyLoad: true,
            clean: true
        },
    );
    relatedMoviesContainer.scrollTo(0,0);
};

function getLikedMovies() {
    const likedMovies = likedMoviesList();
    const moviesArray = Object.values(likedMovies);
    lazyLoad = true;        
    const movies = moviesArray;
    likedMoviesListArticle.innerText = '';
    
    movies.forEach(movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');            
        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute(
            lazyLoad ? 'data-img' : 'src',
            `${URL_IMG}${movie.poster_path}`);
        movieImg.addEventListener('error', () => {
            movieImg.setAttribute('src', `https://via.placeholder.com/300x450/5c218a/fff?text=${movie.title}`);
        });
        movieImg.addEventListener('click', () => {
            location.hash = `movie=${movie.id}`;
        });    
        const movieBtn = document.createElement('button');
        movieBtn.classList.add('movie-btn');
        likedMoviesList()[movie.id] && movieBtn.classList.add('movie-btn--liked');
        movieBtn.addEventListener('click', () => {
            movieBtn.classList.toggle('movie-btn--liked');
            likeMovie(movie);
            getLikedMovies();
        });    
        movieContainer.appendChild(movieImg);
        movieContainer.appendChild(movieBtn);
        likedMoviesListArticle.appendChild(movieContainer);            
        lazyLoader.observe(movieImg);
    });
    console.log(likedMovies);
};