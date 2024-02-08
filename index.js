const movieTitleSearch = document.getElementById('search-movie-title-input')
const searchBtn = document.getElementById('search-btn')
const moviesList = document.getElementById('listed-movies')
const addToWatchlistBtn = document.querySelectorAll('.add-to-watchlist')
const watchlistMoviesEl = document.getElementById('watchlist-listed-movies')

let moviesArr = []

let watchlist = []

if (searchBtn) {searchBtn.addEventListener('click', searchMovies)}

document.addEventListener('click', e => {
    
    if (e.target.dataset.id) {
    // if (!watchlist.includes(localStorage.getItem(e.target.dataset.id))) {
    console.log(e.target.dataset.id)
    watchlist.push(localStorage.getItem(e.target.dataset.id))
    // }
    localStorage.setItem('watchlist', watchlist)
    console.log(localStorage.getItem('watchlist'))
    console.log(watchlist)
    }
    
})


function searchMovies() {
    fetch(`http://www.omdbapi.com/?apikey=a2116ba9&s=${movieTitleSearch.value}`)
        .then(res => res.json())
        .then(data => {

            moviesArr = data.Search.map(movie => movie.imdbID)
            renderMovies()
        })
}

function renderMovies(){
    moviesList.innerHTML = ''
    localStorage.removeItem('lastSearch')
    moviesArr.forEach(id => {
    
        fetch(`http://www.omdbapi.com/?apikey=a2116ba9&i=${id}`)
            .then(res => res.json())
            .then(data => {
                moviesList.innerHTML += `
                <div class="movie">
                
                    <img class="poster" src="${data.Poster}">
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
                    <span class="add">
                        <button 
                        class="add-to-watchlist"
                        data-id="${id}">+Watchlist
                        </button>
                    </span>

                    <span class="plot">${data.Plot}</span>
                </div>
                `
                
                localStorage.setItem(`${id}`, JSON.stringify(data))
            }
        )
        
    }) 
}


