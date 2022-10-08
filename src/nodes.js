const $ = (id) => 
    document.querySelector(id);

const headerSection = $('#header');
const arrowBtn = $('.header-arrow');
const headerTitle = $('.header-title');
const headerCategoryTitle = $('.header-title--categoryView');
const searchForm = $('#searchForm');
const searchFormInput = $('#searchForm input');
const searchFormBtn = $('#searchBtn');

const trendingPreviewSection = $('#trendingPreview');
const trendingBtn = $('.trendingPreview-btn');
const trendingMoviesPreviewList = $('.trendingPreview-movieList');

const categoriesPreviewSection = $('#categoriesPreview');
const categoriesPreviewList = $('.categoriesPreview-list');

const genericSection = $('#genericList');

const movieDetailSection = $('#movieDetail');
const movieDetailTitle = $('.movieDetail-title');
const movieDetailScore = $('.movieDetail-score');
const movieDetailDescription = $('.movieDetail-description');
const movieDetailCategoriesList = $('#movieDetail .categories-list');

const relatedMoviesContainer = $('.relatedMovies-scrollContainer');
const likedMoviesListArticle = $('.liked-movieList');
const likedMoviesSection = $('#liked');
const selectLanguageSection = $('#selectLanguage');