const movieTitleSearch = document.getElementById('search-movie-title-input')
const searchBtn = document.getElementById('search-btn')
const moviesList = document.getElementById('listed-movies')
const watchlistMoviesEl = document.getElementById('watchlist-listed-movies')
const msg = document.getElementById('msg')

let moviesArr = [] 
let watchlist = []

if (searchBtn) {searchBtn.addEventListener('click', searchMovies)}

//This function searches for movies by movie title

function searchMovies() {
    fetch(`https://www.omdbapi.com/?apikey=a2116ba9&s=${movieTitleSearch.value}`)
        .then(res => res.json())
        .then(data => {
            if (data.Response == "False") {
                moviesList.innerHTML = `
                <div class="movies-container transform-left">
                    <p>Unable to find what you’re looking for.<br> Please try another search.</p>
                </div>`
            }
            //if the response from serve is True then it maps the found movies id to a movies array
            // And calls renderMovies function
            else {
                
                moviesArr = data.Search.map(movie => movie.imdbID)
                renderMovies(moviesArr, element="search")
            }
        })
}

// array => moviesArr | watchlist 
// element => search | watchlist
function renderMovies(array, element="search|watchlist"){

    if (element === "search"){
        moviesList.innerHTML = ''
        // the movies fetch
        array.map(id => {

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
                            data-movie="add-movie"
                            data-id="${id}">Watchlist</button>
                        </span>
    
                        <span class="plot">${data.Plot}</span>
                    </div>
                    `
                    
                })
        }).join('')
    }

    else if(element === "watchlist"){

    // If the watchlist is empty: show empty msg
    if (watchlist.length === 0) {
        watchlistMoviesEl.innerHTML = `
            <div class="watchlist-container" id="movies-container">
                <p class="wl-placeholder">
                    Your watchlist is looking a little empty...
                </p>
                <p class="wl-placeholder">
                <a href="./index.html">
                    Let’s add some movies!
                </a>
                </p>
            </div>`
        localStorage.clear()
        }

    else if (watchlist.length > 0) {
        // the watchlist fetch
        html = ''   
        array.forEach( id => {

            fetch(`https://www.omdbapi.com/?apikey=a2116ba9&i=${id}`)
            
                .then(res => res.json())
                .then(data => {
                    if (data.Response == "True"){
                    html += `
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
                        <span class="delete">
                            <button 
                            id="movie-${id}"
                            class="delete-from-watchlist"
                            data-movie="delete-movie"
                            data-id="${id}">Remove</button>
                        </span>

                        <span class="plot">${data.Plot}</span>
                    </div>
                    `
                }

                watchlistMoviesEl.innerHTML = html
            })
                
            })
        }
    
    }
    
}

document.addEventListener('click', e => {

    //Event listener on 'add to watchlist' button click
    if (e.target.dataset.movie === "add-movie" ){
        //If the movie has not been added yet to the watchlist
        if(!watchlist.includes(e.target.dataset.id)){

            watchlist.push(e.target.dataset.id)
            localStorage.setItem(`movie-${e.target.dataset.id}`, e.target.dataset.id)
        }
        else{
            msg.textContent = "Already added to Watchlist"
        }

        showMsg()
    }

    //Deleting movies from watchlist
    else if(e.target.dataset.movie === "delete-movie") {

        const index = watchlist.indexOf(e.target.dataset.id) ;
        localStorage.removeItem(e.target.id)

        if (index > -1) { // only splice array when item is found
            watchlist.splice(index, 1); // 2nd parameter means remove one item only
          }
        
        showMsg()
        renderMovies(watchlist, element="watchlist") 
    }
})

function watchlistArrToLS() {

    watchlist.forEach( (movie) => {
        stringifiedMovie = JSON.stringify(movie)
        localStorage.setItem(`movie-${movie}`, stringifiedMovie)
    })
}
// need to figure out inner html to local storage
function watchlistToLS() {
    Object.keys(localStorage).forEach(key => {

            if (key.includes('movie-')) {
                watchlist.push((localStorage.getItem(key)))   
            } 
    });
}

watchlistToLS()
console.log(watchlist)

function showMsg() {
    msg.classList.remove('fade')
    msg.classList.remove('hide-behind')
    setTimeout(() => {
        msg.classList.add('fade')
    }, 800);
    setTimeout(() => {
        msg.classList.add('hide-behind')
    }, 1100);
}

// Next steps:

//Session storage to store last search?
//Use firebase to store data