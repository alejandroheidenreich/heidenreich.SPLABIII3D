import { actualizarTabla,crearSpinner,clearTablaSeccion} from './tabla.js';
import { SuperHeroe, ordenarListaPorCriterio, obtenerUltimoID } from './superheroe.js';
import { crearFormulario } from './formulario.js';
import { getAllinTableAjax, getAllAjax, getOneAjax, createSuperHeroeAjax, updateSuperHeroeAjax, deleteSuperHeroeAjax } from './ajax.js';
import { getAllinTableAxios, getAllAxios, getOneAxios, createSuperHeroeAxios, updateSuperHeroeAxios, deleteSuperHeroeAxios } from './axios.js';
import { getAllinTableFetch, getAllFetch, getOneFetch, createSuperHeroeFetch, updateSuperHeroeFetch, deleteSuperHeroeFetch } from './fetch.js';


//actualizarStorage('armas', listaArmas);

const URL = 'http://localhost:3000/superheroes';
const URLARMAS = 'http://localhost:3000/armas';
const $seccionTabla = document.getElementById('tabla');
const $seccionFormulario = document.getElementById('formulario');
const colorHeader = "darkorange";
const identificador = "id";
const titulo = "Lista de Super Heroes";
const spinnerTabla = crearSpinner($seccionTabla);
let ordenActivo;


//getAllinTableAjax(URL, actualizarTabla, $seccionTabla, colorHeader, identificador, titulo, spinnerTabla);
//getAllinTableAxios(URL, actualizarTabla, $seccionTabla, colorHeader, identificador, titulo, spinnerTabla);
getAllinTableFetch(URL, actualizarTabla, $seccionTabla, colorHeader, identificador, titulo, spinnerTabla);



const formatoSuperHeroe = { id: '', nombre: 'asd', alias: 'asd', editorial: 'asd', fuerza: '100', arma: 'Armadura' }
const spinnerForm = document.createElement('span');
spinnerForm.classList.add('loader');
spinnerForm.id = "spinnerForm";
spinnerForm.style.setProperty("display", "none");
$seccionFormulario.appendChild(spinnerForm);

async function prepararForm() {
    const armas = await getAllFetch(URLARMAS);
    $seccionFormulario.appendChild(crearFormulario("Informacion del SuperHeroe", formatoSuperHeroe, identificador, "arma", armas, "editorial", ["Marvel", "DC"], ["./img/marvel.png", "./img/dc.png"]));
    const $formulario = document.querySelector('form');
    const $tituloForm = document.getElementById('titulo-form');
    const $formFielset = document.querySelector('fieldset');
    resetFormulario($formulario);

}
prepararForm();

window.addEventListener('submit', (e) => {
    e.preventDefault();
});

window.addEventListener('click', (e) => {
    if (e.target.matches('td')) {
        handlerSelectedTD(e);
    }
    else if (e.target.matches('th')) {
        handlerSelectedTH(e);
    }
    else if (e.target.matches("input[type='submit']")) {
        handlerSubmit();
    }
    else if (e.target.matches("input[type='button']")) {
        handlerButton();
    }
    else if (e.target.matches("input[type='reset']")) {
        console.log("Cancelando");
        const $formulario = document.querySelector('form');
        resetFormulario($formulario);
    }
});

async function handlerSelectedTD(e) {
    const $formulario = document.querySelector('form');
    const $tituloForm = document.getElementById('titulo-form');
    const $formFielset = document.querySelector('fieldset');
    const selector = e.target.parentElement.dataset.id;
    console.log(selector);
    spinnerForm.style.setProperty("display", "block");
    $formulario.style.setProperty("display", "none");
    $tituloForm.style.setProperty("display", "none");
    $formFielset.style.setProperty("display", "none");

    //getOneAjax(URL, selector, cargarFormulario, $formulario);
    //getOneAxios(URL, selector, cargarFormulario, $formulario);
    getOneFetch(URL, selector, cargarFormulario, $formulario);
    //cargarFormulario($formulario, selectedSuperHeroe);

}

async function handlerSelectedTH(e) {
    const selector = e.target.textContent;
    console.log(selector);
    const tabla = clearTablaSeccion($seccionTabla);
    crearSpinner($seccionTabla);
    const superheroes = await getAllFetch(URL);
    ordenarListaPorCriterio(superheroes, selector, selector == ordenActivo);
    if (selector == ordenActivo) {
        ordenActivo = null;
    } else {
        ordenActivo = selector;
    }
    actualizarTabla($seccionTabla, superheroes, colorHeader, identificador, titulo);
    spinnerTabla.style.setProperty("display", "none");
}

function handlerButton() {
    console.log("Eliminando...");
    const $formulario = document.querySelector('form');
    if ($formulario.txtId.value != "") {
        console.log($formulario.txtId.value);
        if (confirm("¿Desea eliminar este SuperHeroe?")) {
            handlerDelete(parseInt($formulario.txtId.value));
            resetFormulario($formulario);
        }
    } else {
        alert("Debe seleccionar para eliminar");
    }
}

function handlerSubmit() {
    console.log("Enviando");
    const $formulario = document.querySelector('form');
    const { txtId, txtNombre, txtAlias, radioEditorial, txtFuerza, selectArma } = $formulario;
    try {
        if (txtId.value == '') {
            const data = {
                "nombre": txtNombre.value,
                "alias": txtAlias.value,
                "editorial": radioEditorial.value,
                "fuerza": parseInt(txtFuerza.value),
                "arma": selectArma.value
            };
            if (confirm("¿Desea cargar el SuperHeroe?")) handlerCreate(data/*newSuper*/);
        } else {
            const updatedSuper = new SuperHeroe(parseInt(txtId.value), txtNombre.value, txtAlias.value, radioEditorial.value, parseInt(txtFuerza.value), selectArma.value);
            if (confirm("¿Desea realizar la modificación?")) handlerUpdate(updatedSuper);
        }
        resetFormulario($formulario);
    } catch (error) {
        alert(error.message);
    }
}

async function handlerCreate(nuevoSuper) {
    console.log("Creando");
    //createSuperHeroeAjax(URL, nuevoSuper);
    ///createSuperHeroeAxios(URL, nuevoSuper)
    createSuperHeroeFetch(URL, nuevoSuper);
    //getAllinTableAjax(URL, actualizarTabla, $seccionTabla, colorHeader, identificador, titulo, spinnerTabla);
    //getAllinTableAxios(URL, actualizarTabla, $seccionTabla, colorHeader, identificador, titulo, spinnerTabla);
    //getAllinTableFetch(URL, actualizarTabla, $seccionTabla, colorHeader, identificador, titulo, spinnerTabla);
}

function handlerUpdate(editSuper) {
    console.log("Actualizando");
    //updateSuperHeroeAjax(URL, editSuper);
    //updateSuperHeroeFetch(URL, editSuper);
    updateSuperHeroeAxios(URL, editSuper);
    //getAllinTableAjax(URL, actualizarTabla, $seccionTabla, colorHeader, identificador, titulo, spinnerTabla);
    //getAllinTableAxios(URL, actualizarTabla, $seccionTabla, colorHeader, identificador, titulo, spinnerTabla);
    //getAllinTableFetch(URL, actualizarTabla, $seccionTabla, colorHeader, identificador, titulo, spinnerTabla);

}

function handlerDelete(id) {
    console.log("Eliminado");
    //deleteSuperHeroeAjax(URL, id);
    deleteSuperHeroeAxios(URL, id);
    //deleteSuperHeroeFetch(URL, id);
    //getAllinTableAjax(URL, actualizarTabla, $seccionTabla, colorHeader, identificador, titulo, spinnerTabla);
    //getAllinTableAxios(URL, actualizarTabla, $seccionTabla, colorHeader, identificador, titulo, spinnerTabla);
    //getAllinTableFetch(URL, actualizarTabla, $seccionTabla, colorHeader, identificador, titulo, spinnerTabla);
}

// function actualizarStorage(clave, data) {
//     localStorage.setItem(clave, JSON.stringify(data));
// }

function cargarFormulario(formulario, superheroe) {
    //const $formulario = document.querySelector('form');
    const $tituloForm = document.getElementById('titulo-form');
    const $formFielset = document.querySelector('fieldset');
    spinnerForm.style.setProperty("display", "none");
    formulario.style.setProperty("display", "block");
    $tituloForm.style.setProperty("display", "block");
    $formFielset.style.setProperty("display", "block");
    if (!document.getElementById('boton-cancelar')) {
        const $botonera = document.getElementById('botonera');
        const botonCancelar = document.createElement('input');
        botonCancelar.type = 'reset';
        botonCancelar.value = 'Cancelar';
        botonCancelar.id = 'boton-cancelar';
        botonCancelar.classList.add('cancelar');
        $botonera.appendChild(botonCancelar);
    }
    const $titulo = document.getElementById("titulo-form");
    const $boton = document.getElementById("boton-accion");
    const $botonEliminar = document.getElementById("eliminar");
    $botonEliminar.style.display = "block";
    $titulo.textContent = "Modifcacion del SuperHeroe";
    $boton.value = "Modificar";
    formulario.txtId.value = superheroe.id;
    formulario.txtNombre.value = superheroe.nombre;
    formulario.txtAlias.value = superheroe.alias;
    formulario.radioEditorial.value = superheroe.editorial;
    formulario.txtFuerza.value = superheroe.fuerza;
    formulario.selectArma.value = superheroe.arma;
}

function resetFormulario(formulario) {
    const $titulo = document.getElementById("titulo-form");
    const $boton = document.getElementById("boton-accion");
    const $botonEliminar = document.getElementById("eliminar");
    $botonEliminar.style.display = "none";
    $titulo.textContent = "Informacion del SuperHeroe";
    $boton.value = "Cargar";
    formulario.txtId.value = '';
    const $botonera = document.getElementById('botonera');
    if (document.getElementById('boton-cancelar')) $botonera.removeChild(document.getElementById('boton-cancelar'));
    formulario.reset();
}


// chrome.runtime.addListener((request, sender, sendResponse) => {
//     // Verificar si la conexión del canal de mensajes está abierta
//     if (chrome.runtime.lastError) {
//       //console.error(chrome.runtime.lastError.message);
//       return;
//     }
  
//     // Procesar el mensaje y enviar una respuesta asincrónica
//     // ...
  
//     // Enviar la respuesta asincrónica
//     sendResponse(response);
//   });

