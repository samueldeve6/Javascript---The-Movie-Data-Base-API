let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click', () => {
    if(pagina < 500) {  
        pagina += 1;
        cargarPeliculas();
    }
})

const cargarPeliculas = async() => {

    //traer datos de TMDB API y guardarlos en una variable
    try {
    const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=6ebdcf690a20cabc09fca783fad292f4&language=es-ES');
 
    console.log(response);

    //Verificar que la respuesta sea correcta
    if(response.status === 200) {
        const data = await response.json();

        let peliculas = '';
        data.results.forEach(pelicula => {
            peliculas += `
            <div class="pelicula">
                <img class="poster" src="https://image.tmdb.org/t/p/w500${pelicula.poster_path}" alt="Poster de la película ${pelicula.title}">
                <h1 class="titulo">${pelicula.title}</h1>
                <p class="fecha">Fecha de estreno: ${pelicula.release_date}</p>
            </div>
            `;
        });

        document.getElementById('contenedor').innerHTML = peliculas;

        console.log('La solicitud fue exitosa');

    }else if(response.status === 401) {
        console.log('La película no fue encontrada');
    } else if(response.status === 404){
        console.log('Error en la solicitud');
    }else {
        
    }
    }catch(error) {
        console.log('Error al cargar las películas:', error);
    }
}
cargarPeliculas();