(function () {
  const BASE_URL = 'https://movie-list.alphacamp.io'
  const INDEX_URL = BASE_URL + '/api/v1/movies'
  const POSTER_URL = BASE_URL + '/posters/'
  const data = []

  const dataGenre = document.getElementById('data-genre')
  const dataMovie = document.getElementById('data-movie')

  const others = {
    "1": "Action",
    "2": "Adventure",
    "3": "Animation",
    "4": "Comedy",
    "5": "Crime",
    "6": "Documentary",
    "7": "Drama",
    "8": "Family",
    "9": "Fantasy",
    "10": "History",
    "11": "Horror",
    "12": "Music",
    "13": "Mystery",
    "14": "Romance",
    "15": "Science Fiction",
    "16": "TV Movie",
    "17": "Thriller",
    "18": "War",
    "19": "Western"
  }

  const reverseOthers = {
    "Action": "1",
    "Adventure": "2",
    "Animation": "3",
    "Comedy": "4",
    "Crime": "5",
    "Documentary": "6",
    "Drama": "7",
    "Family": "8",
    "Fantasy": "9",
    "History": "10",
    "Horror": "11",
    "Music": "12",
    "Mystery": "13",
    "Romance": "14",
    "Science Fiction": "15",
    "TV Movie": "16",
    "Thriller": "17",
    "War": "18",
    "Western": "19"
  }


  //get data
  axios.get(INDEX_URL)
    .then((response) => {
      data.push(...response.data.results)
      displayMovieList(data)
    })
    .catch()


  //display movie list
  function displayMovieList(data) {
    let htmlContent = ``
    data.forEach(function (item, index) {
      htmlContent += `
        <div class="col-sm-3 mt-5">
          <div class="card mb-2">
            <img class="card-img-top" src="${POSTER_URL}${item.image}" alt="Card image cap">
            <div class="card-body movie-item-body">
              <h6>${item.title}</h6>
            </div>

            <div class="card-footer " id="each-genres">
              ${displayEachMovieGenres(item.genres)}
            </div>
          </div>
        </div>
        `

    })

    dataMovie.innerHTML = htmlContent

  }


  //display genre list
  for (x in others) {
    dataGenre.innerHTML = dataGenre.innerHTML + `<li><a class='nav-link border border-light' data-toggle="pill" href="#">${others[x]}</a><li>`
  }

  //display each movie's genres
  function displayEachMovieGenres(genres) {
    let eachGenre = ``
    for (let i = 0; i < genres.length; i++) {
      eachGenre += `<p>${others[genres[i]]}</p>`
    }
    return eachGenre

  }

  //check movies by click the genre list
  dataGenre.addEventListener('click', event => {
    let genreName = event.target.textContent
    let results = []

    results = data.filter(function (item, index) {
      return (item.genres).includes(Number(reverseOthers[genreName]))
    })

    displayMovieList(results)
  })

})()


