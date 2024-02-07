const movieTitleSearch = document.getElementById('search-movie-title-input')
const searchBtn = document.getElementById('search-btn')
const moviesList = document.getElementById('listed-movies')
const addToWatchlistBtn = document.getElementById('add-to-watchlist')

searchBtn.addEventListener('click',  searchMovies)
let moviesArr = []

function searchMovies() {
    fetch(`http://www.omdbapi.com/?apikey=a2116ba9&s=${movieTitleSearch.value}`)
        .then(res => res.json())
        .then(data => {
            // const movies = `
            // <div class="movie">
            //     <img class="poster" src="${data.Poster}">
            //     <span class="title">${data.Title}</span>
                
            //     <span class="rating"><span>*</span>${data.imdbRating}</span>
            //     <span class="runtime">${data.Runtime}</span>
            //     <span class="genre">${data.Genre}</span>
            //     <span class="add"><button id="add-to-watchlist">+Watchlist</button></span>
            //     <span class="plot">${data.Plot}</span>
            // </div>
            // `
            moviesArr = data.Search.map(movie => movie.imdbID)

            
            // moviesList.innerHTML = movies
            renderMovies()
        })

}

function renderMovies(){
    moviesList.innerHTML = ''
    moviesArr.forEach(id => {
    
        fetch(`http://www.omdbapi.com/?apikey=a2116ba9&i=${id}`)
            .then(res => res.json())
            .then(data => {
                moviesList.innerHTML += `
                <div class="movie">
                
                    <img class="poster" src="${data.Poster}">
                    <span class="title">${data.Title}</span>
                    <span class="rating">
                        <span>*</span>${data.imdbRating}
                    </span>

                    <span class="runtime">
                        ${data.Runtime}
                    </span>
                    <span class="genre">
                        ${data.Genre}
                    </span>
                    <span class="add">
                        <button id="add-to-watchlist">+Watchlist</button>
                    </span>

                    <span class="plot">${data.Plot}</span>
                </div>
                `
            }
        )
    }) 
}