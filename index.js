const movieTitleSearch = document.getElementById('search-movie-title-input')
const searchBtn = document.getElementById('search-btn')
const moviesList = document.getElementById('listed-movies')
const addToWatchlistBtn = document.querySelectorAll('.add-to-watchlist')
const watchlistMoviesEl = document.getElementById('watchlist-listed-movies')
const msg = document.getElementById('msg')

let moviesArr = [] 
let watchlist =[];

if (searchBtn) {searchBtn.addEventListener('click', searchMovies)}

document.addEventListener('click', e => {
    if(e.target.dataset.movie === "movie" && !watchlist.includes(e.target.dataset.id)) {
        watchlist.push(e.target.dataset.id)
        watchlistArrToLS()
        msg.classList.remove('fade')
        setTimeout(() => {
            msg.classList.add('fade')
        }, 1000);
    }
    else if (e.target.dataset.movie === "movie" && watchlist.includes(e.target.dataset.id)) {
        msg.textContent = "Already added to Watchlist"
        msg.classList.remove('fade')
        setTimeout(() => {
            msg.classList.add('fade')
        }, 1000);
    }
})

function watchlistArrToLS() {
    watchlist.forEach( (movie, index) => {
        movie = JSON.stringify(movie)
        localStorage.setItem(index, movie)
    })
    
}

function searchMovies() {
    fetch(`https://www.omdbapi.com/?apikey=a2116ba9&s=${movieTitleSearch.value}`)
        .then(res => res.json())
        .then(data => {

            moviesArr = data.Search.map(movie => movie.imdbID)
            renderWatchlist()
        })
}

function renderWatchlist(){
    
    moviesList.innerHTML = ''
    // lastSearch = ''
    // localStorage.removeItem('lastSearch')
    moviesArr.forEach(id => {
    
        fetch(`https://www.omdbapi.com/?apikey=a2116ba9&i=${id}`)
            .then(res => res.json())
            .then(data => {
                moviesList.innerHTML += `
                <div class="movie">
                
                    <img class="poster" src="${data.Poster}">
                    <span class="title">${data.Title}
                        <span class="rating">
                            <img src="./images/star.svg"> ${data.imdbRating}
                        </span>
                    </span>
                    

                    <span class="runtime">
                        ${data.Runtime}
                    </span>
                    <span class="genre">
                        ${data.Genre}
                    </span>
                    <span class="add">
                        <button 
                        id="add-to-watchlist-${id}"
                        class="add-to-watchlist"
                        data-movie="movie"
                        data-id="${id}">Watchlist</button>
                    </span>

                    <span class="plot">${data.Plot}</span>
                </div>
                `
                // <img src="images/add.svg">
                // lastSearch += JSON.stringify(data)
                // localStorage.setItem(`${id}`, JSON.stringify(data))
            //    return data
            })
    })
}

// function lastSearchToSessionStorage(){
//     sessionStorage.setItem('lastSearch', renderMovies())
// }


// function renderSessionSearch(){
//     moviesList.innerHTML = sessionStorage.getItem()
// }

