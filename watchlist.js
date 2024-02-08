const watchlistMoviesEl = document.getElementById('watchlist-listed-movies')

function renderWatchlist(){
    const data = JSON.parse(localStorage.getItem('watchlist'))
    console.log(data)
    for (let movie of data) {
        watchlistMoviesEl.innerHTML += `
        <div class="movie">
        
            <img class="poster" src="${movie.Poster}">
            <span class="title">${data.Title}</span>
            <span class="rating">
                <span>⭐</span>${data.imdbRating}
            </span>

            <span class="runtime">
                ${data.Runtime}
            </span>
            <span class="genre">
                ${data.Genre}
            </span>
            <span class="plot">${data.Plot}</span>
        </div>
        `
    }
}
window.onload = function () {
    renderWatchlist();
};
