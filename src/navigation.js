window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator() {
    console.log({location});

    if (location.hash.startsWith('#trends')) {
        trendsPage();
    } else if (location.hash.startsWith('#search=')) {
        searchPage();
    } else if (location.hash.startsWith('#movie=')) {
        movieDetailPage();
    } else if (location.hash.startsWith('#category=')) {
        categoriesPage();
    } else {
        homePage();
    }
};

function homePage() {
    console.log('HOME!!!');
    getTrendingMoviesPreview();
    getGenresPreview();
};

function categoriesPage() {
    console.log('CATEGORIES!!!');
};

function movieDetailPage() {
    console.log('MOVIE!!!');
};

function searchPage() {
    console.log('SEARCH!!!');
};

function trendsPage() {
    console.log('TRENDS!!!');
};