// import { Anuncio } from './js/anuncio.js';
import { crearListaSuperHeroes } from './cards_boostrap.js';
import { getAllAjax } from './ajax.js';
import { getAllAxios } from './axios.js';
import { getAllFetch } from './fetch.js';



const URL = 'http://localhost:3000/superheroes'
const $seccionPersonajes = document.getElementById('seccion-personajes');
const campoPrincipal = "alias";
const campoOculto = "id";
const imgPropiedades = {
    "alias": "./img/alias.png",
    "nombre": "./img/nombre.png",
    "editorial": "./img/editorial.png",
    "fuerza": "./img/fuerza.png",
    "arma": "./img/arma.png"
};
const spinner = document.createElement('span');
spinner.classList.add('loader');
spinner.id = "spinner";
spinner.style.setProperty("display", "block");
$seccionPersonajes.appendChild(spinner);

async function setCards() {
    const superheroes = await getAllFetch(URL);
    crearListaSuperHeroes($seccionPersonajes, superheroes, campoPrincipal, campoOculto, imgPropiedades);
    spinner.style.setProperty("display", "none");
}
setCards();