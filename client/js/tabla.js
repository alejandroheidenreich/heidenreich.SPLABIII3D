import { getAllFetch } from './fetch.js';
const URL = 'http://localhost:3000/superheroes';

export const crearTabla = (data, colorHeader, identidicador) => {
    const tabla = document.createElement('table');
    tabla.setAttribute('id', 'tablita');

    if (!Array.isArray(data) || data.length < 1) return null;
    tabla.appendChild(crearCabecera(data[0], colorHeader, identidicador));
    tabla.appendChild(crearCuerpo(data, identidicador));
    return tabla;
};

const crearCabecera = (elemento, color, identidicador) => {
    console.log(elemento);
    const tHead = document.createElement('thead');
    const headRow = document.createElement('tr');
    headRow.style.setProperty("background-color", color);

    for (const propiedad in elemento) {
        if (propiedad === identidicador) continue;
        const th = document.createElement('th');
        th.textContent = propiedad;
        headRow.appendChild(th);
    }

    tHead.appendChild(headRow);

    return tHead;
};

const crearCuerpo = (data, identidicador) => {
    const tBody = document.createElement('tbody');

    data.forEach((elemento, index) => {
        const tr = document.createElement('tr');

        if (index % 2 == 0) tr.classList.add('filaPar');
        for (const propiedad in elemento) {
            if (propiedad === identidicador) {
                tr.setAttribute(`data-id`, elemento[propiedad]);
            } else {
                const td = document.createElement('td');
                td.textContent = elemento[propiedad];
                tr.appendChild(td);
            }
        }
        tBody.appendChild(tr);
    });

    return tBody;
};

export const actualizarTabla = (contenedor, data, colorHeader, identidicador, titulo) => {
    if (!Array.isArray(data) || data.length < 1) return null;
    while (contenedor.hasChildNodes()) {
        // if (contenedor.firstChild.id == "selectEditorial") continue;
        contenedor.removeChild(contenedor.firstChild);
    }

    // const select = document.createElement('select');

    // select.setAttribute('name', `selectEditorial`);
    // select.setAttribute('id', `selectEditorial`);

    // const editoriales = ["Todos", "Marvel", "DC"];
    // editoriales.forEach(element => {
    //     const option = document.createElement('option');
    //     option.setAttribute('value', element);
    //     option.textContent = element;
    //     select.appendChild(option);
    // });
    // select.classList.add('selectEditoriales');

    // // select.addEventListener('change', async (e) => {
    // //     console.log("hola");
    // //     const tabla = document.getElementById('tablita');
    // //     const $seccionTabla = document.getElementById('tabla');
    // //     tabla.style.setProperty("display", "none");
    // //     select.style.setProperty("display", "none");
    // //     const superheroes = await getAllFetch(URL);
    // //     console.log(superheroes);
    // //     const seleccion = e.target.value;
    // //     let listaFiltrada = superheroes;
    // //     if (seleccion != "Todos") {
    // //         listaFiltrada = superheroes.filter((element) => element.editorial === seleccion);
    // //         console.log(listaFiltrada);
    // //     }
    // //     actualizarTabla($seccionTabla, listaFiltrada, "darkorange", "id", "Lista de Super Heroes");
    // //     tabla.style.setProperty("display", "block");
    // //     select.style.setProperty("display", "block");
    // // });

    const h2 = document.createElement('h2');
    h2.textContent = titulo;
    contenedor.appendChild(h2);
    //contenedor.appendChild(select);

    contenedor.appendChild(crearTabla(data, colorHeader, identidicador));

};

