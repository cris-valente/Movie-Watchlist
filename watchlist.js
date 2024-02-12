const watchlistMoviesEl = document.getElementById('watchlist-listed-movies')
const search = document.getElementsByClassName('internal-link')
const msg = document.getElementById('msg')

let watchlist = []

document.addEventListener('click', e => {
    if(e.target.dataset.movie === "movie") {
        localStorage.removeItem(e.target.dataset.id)
        watchlist.splice(e.target.dataset.id, 1)
        renderWatchlist()
        msg.classList.remove('fade')
        setTimeout(() => {
            msg.classList.add('fade')
        }, 1000);
    }    
})

function renderWatchlist(){

    watchlistMoviesEl.innerHTML = ""


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
                        id="delete-from-watchlist-${id}"
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
        watchlist.push(JSON.parse(localStorage.getItem(key)))
      });
}
watchlistToLS()
renderWatchlist()
// function lastSearchToSessionStorage(){
//     sessionStorage.setItem('lastSearch', renderMovies())
// }
