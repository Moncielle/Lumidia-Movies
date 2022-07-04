const containerCards = document.getElementById('containerMovies');
const form = document.getElementById('form');
const search = document.getElementById('search');
const menu = document.getElementById('btnMenu');
const btnclose = document.getElementById('btnClose');
const btnPreviuos = document.getElementById('btnPrevious');
const btnNext = document.getElementById('btnNext');

//constantes para almacenar las diferentes URL de la api 
const apiURL = 'https://api.themoviedb.org/3/movie/popular?api_key=1271682cfb8fb295ba15c7bdb1488526&language=es-MX';
const searchURL = 'https://api.themoviedb.org/3/search/movie?api_key=1271682cfb8fb295ba15c7bdb1488526&language=es-MX';
const genres = 'genres.json';
let nav = 1;

//funcion para cargar las tarjetas al html (los elementos de la api)
const getMovie = async (url) =>{
    const response = await fetch(url);
    if(response.status === 200){
        const data = await response.json();
        showMovies(data.results); 
    }else if (response.status === 404){
        console.log('error');
    }else{
        console.log('error');
    }
}

//función para construir los elementos de las tarjetas en el html
const showMovies = (data) => {
    containerCards.innerHTML = '';
    data.forEach(movie => {
        const {title, poster_path, vote_average, overview, release_date} = movie;
        const movieList = document.createElement('div');
        movieList.classList.add('cards-movies');
        movieList.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>${title}</h3>
                <p>${overview}</p>
                <span>${getYear(release_date)}</span>
            </div>
        `;
        containerCards.appendChild(movieList);
    });
};

//funcion para obtener el color de la calificación de la pelicula 
const getColor = (vote) => {
    if(vote >= 8){
        return 'green';
    }else if(vote >= 6){
        return 'orange';
    }else{
        return 'red';
    }
}

//funcion para obtener solo el año de la publicación de la pelicula 
const getYear = (year) => {
    const date = new Date(year);
    return date.getFullYear();
}

//evento para hacer la busquedad de peliculas mediante el form e input 
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const searchTerm = search.value;
    if(searchTerm){
        getMovie(searchURL + '&query='+ searchTerm);
    }else{
        getMovie(apiURL);
    }
}); 

//evento para abrir el contenedor de categorias cuando se da clic en el boton de menu
menu.addEventListener('click', () => {
    document.getElementById("menuContainer").style.display = '';
});

//funcion para cerrar el contenedor de categorias
btnclose.addEventListener('click', () => {
    document.getElementById("menuContainer").style.display = 'none';
});

/*btnNext.addEventListener('click', () => {
    if (nav < 1000) {
        nav += 1;
        getMovie(apiURL);
    }
});

btnPreviuos.addEventListener('click', () => {
    if (nav > 1) {
        nav -= 1;
        getMovie(apiURL);
    }
});*/

getMovie(apiURL);