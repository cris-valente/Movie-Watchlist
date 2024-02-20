
function renderMovie(){
    
    moviesList.innerHTML = ''

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
                // `
                // sessionStorage.setItem(id, JSON.stringify(`
                // <div class="movie">
                
                //     <img class="poster" src="${data.Poster}">
                //     <span class="title">${data.Title}
                //         <span class="rating">
                //             <img src="./images/star.svg"> ${data.imdbRating}
                //         </span>
                //     </span>
                    

                //     <span class="runtime">
                //         ${data.Runtime}
                //     </span>
                //     <span class="genre">
                //         ${data.Genre}
                //     </span>
                //     <span class="add">
                //         <button 
                //         id="add-to-watchlist-${id}"
                //         class="add-to-watchlist"
                //         data-movie="movie"
                //         data-id="${id}">Watchlist</button>
                //     </span>

                //     <span class="plot">${data.Plot}</span>
                // </div>
                // `))
            })
    })
}

