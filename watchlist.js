const watchlistMoviesEl = document.getElementById('watchlist-listed-movies')
const search = document.getElementsByClassName('internal-link')
const msg = document.getElementById('msg')

let watchlist = []

document.addEventListener('click', e => {
    if(e.target.id.includes('movie-')) {

        localStorage.removeItem(e.target.id)
        watchlist.splice(e.target.id, 1)

        renderWatchlist()
        showMsg()
       
    }    
})

function renderWatchlist(){

    if (watchlist.length > 0) {watchlistMoviesEl.innerHTML = ""}
    if (watchlist.length === 0) {watchlistMoviesEl.innerHTML = `
    <div class="watchlist-container" id="movies-container">
                <p class="wl-placeholder">
                    Your watchlist is looking a little empty...
                </p>
                <p class="wl-placeholder">
                <a href="./index.html">
                    Let’s add some movies!
                </a>
                </p>
            </div>`}

    watchlist.forEach((id, index) => {

        fetch(`https://www.omdbapi.com/?apikey=a2116ba9&i=${id}`)
        
            .then(res => res.json())
            .then(data => {
                if (data.Response == "True"){
                watchlistMoviesEl.innerHTML += `
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
                        data-movie="movie"
                        data-id="${index}">Remove</button>
                    </span>

                    <span class="plot">${data.Plot}</span>
                </div>
                `
            }})
    })
}


function watchlistToLS() {
    Object.keys(localStorage).forEach(key => {
            if (key.includes('movie-')) {
                watchlist.push(JSON.parse(localStorage.getItem(key)))
        } 
       
      });
}

function showMsg() {
    msg.classList.remove('fade')
    setTimeout(() => {
        msg.classList.add('fade')
    }, 1000);
}
watchlistToLS()
renderWatchlist()
