import { getAllFetch } from './fetch.js';
const URL = 'http://localhost:3000/superheroes';

export const crearTabla = (data, colorHeader, identidicador, atributos) => {
    const tabla = document.createElement('table');
    tabla.classList.add('table');
    tabla.classList.add("table-dark");
    tabla.classList.add('table-hover');
    tabla.setAttribute('id', 'tablita');
    if (!Array.isArray(data) || data.length < 1) return tabla;
    tabla.appendChild(crearCabecera(data[0], colorHeader, identidicador, atributos));
    tabla.appendChild(crearCuerpo(data, identidicador, atributos));
    return tabla;
};

const crearCabecera = (elemento, color, identidicador, atributos) => {
    const tHead = document.createElement('thead');
    const headRow = document.createElement('tr');
    headRow.style.setProperty("background-color", color);
    for (const propiedad in elemento) {
        if (propiedad === identidicador || !(atributos.includes(propiedad))) continue;
        const th = document.createElement('th');
        th.setAttribute('scope', "col");
        th.textContent = propiedad.toLocaleUpperCase();
        headRow.appendChild(th);
    }
    tHead.appendChild(headRow);
    return tHead;
};

const crearCuerpo = (data, identidicador, atributos) => {
    const tBody = document.createElement('tbody');
    data.forEach((elemento, index) => {
        const tr = document.createElement('tr');
        if (index % 2 == 0) tr.classList.add('filaPar');
        for (const propiedad in elemento) {
            if (propiedad === identidicador) {
                tr.setAttribute(`data-id`, elemento[propiedad]);
            } else {
                if (!(atributos.includes(propiedad))) continue;
                const td = document.createElement('td');
                td.textContent = elemento[propiedad];
                tr.appendChild(td);
            }
        }
        tBody.appendChild(tr);
    });
    return tBody;
};

export const actualizarTabla = (contenedor, data, colorHeader, identidicador, titulo, selectedOption = "Todos", atributos = ["nombre", "alias", "editorial", "fuerza", "arma"]) => {
    // if (!Array.isArray(data) || data.length < 1) return null;
    while (contenedor.hasChildNodes()) {
        contenedor.removeChild(contenedor.firstChild);
    }
    const divTabla = crearHeaderSeccionTabla(contenedor, data, colorHeader, identidicador, titulo, selectedOption, atributos)
    divTabla.appendChild(crearTabla(data, colorHeader, identidicador, atributos));
};

function crearHeaderSeccionTabla(contenedor, data, colorHeader, identidicador, titulo, selectedOption, atributos) {
    const h2 = document.createElement('h2');
    const divFiltros = document.createElement('div');
    const divMaxMin = document.createElement('div');
    const divTabla = document.createElement('div');
    const divCol1 = document.createElement('div');
    const divCol2 = document.createElement('div');
    const divCol3 = document.createElement('div');
    const divCol4 = document.createElement('div');
    const divCol5 = document.createElement('div');
    const divCol6 = document.createElement('div');
    const divCol7 = document.createElement('div');
    const divCol8 = document.createElement('div');
    divCol1.classList.add('col-lg-3');
    divCol2.classList.add('col-sm-3');
    divCol3.classList.add('col-lg-3');
    divCol4.classList.add('col-sm-3');
    divCol5.classList.add('col-lg-3');
    divCol6.classList.add('col-sm-3');
    divCol7.classList.add('col-lg-3');
    divCol8.classList.add('col-sm-3');
    divTabla.setAttribute('id', 'divTabla');
    divFiltros.setAttribute('id', 'divFiltros');
    divMaxMin.setAttribute('id', 'divMaxMin');
    divFiltros.classList.add("row");
    divMaxMin.classList.add("row");
    h2.setAttribute('id', 'titulo-tabla');
    const filtro = document.createElement('label');
    const promedioTitulo = document.createElement('label');
    const maxTitulo = document.createElement('label');
    const minTitulo = document.createElement('label');
    const prom = document.createElement('input');
    const max = document.createElement('input');
    const min = document.createElement('input');
    prom.setAttribute('type', 'text');
    max.setAttribute('type', 'text');
    min.setAttribute('type', 'text');
    prom.setAttribute('id', 'promedio');
    max.setAttribute('id', 'max');
    min.setAttribute('id', 'min');
    prom.setAttribute('value', PromediarTabla(data).toFixed(2));
    max.setAttribute('value', EncontrarMasFuerte(data));
    min.setAttribute('value', EncontrarMenosFuerte(data));
    prom.setAttribute('readonly', true);
    max.setAttribute('readonly', true);
    min.setAttribute('readonly', true);
    prom.setAttribute('readonly', 'promedioFuerza');
    const fieldset = crearFieldSetCheckboxs(divTabla, atributos, colorHeader, identidicador, titulo);
    const select = CrearSelector(selectedOption, divTabla, prom, max, min, colorHeader, identidicador, titulo);
    h2.textContent = titulo;
    filtro.textContent = "Filtrar por Editorial:";
    promedioTitulo.textContent = "Promedio Fuerzas:";
    maxTitulo.textContent = "Maxima Fuerza:";
    minTitulo.textContent = "Minima Fuerza:";
    divCol1.appendChild(filtro);
    divCol2.appendChild(select);
    divCol3.appendChild(promedioTitulo);
    divCol4.appendChild(prom);
    divCol5.appendChild(minTitulo);
    divCol6.appendChild(min);
    divCol7.appendChild(maxTitulo);
    divCol8.appendChild(max);
    divFiltros.appendChild(divCol1);
    divFiltros.appendChild(divCol2);
    divFiltros.appendChild(divCol3);
    divFiltros.appendChild(divCol4);
    divMaxMin.appendChild(divCol5);
    divMaxMin.appendChild(divCol6);
    divMaxMin.appendChild(divCol7);
    divMaxMin.appendChild(divCol8);
    divTabla.appendChild(h2);
    divTabla.appendChild(divFiltros);
    divTabla.appendChild(divMaxMin);
    divTabla.appendChild(fieldset);
    contenedor.appendChild(divTabla);
    return divTabla;
}

function CrearSelector(selectedOption, divTabla, prom, max, min, colorHeader, identidicador, titulo) {
    // const select = document.createElement('select');
    //<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
    // Dropdown button
    // </button>
    const dropdown = document.createElement('div');
    const select = document.createElement('ul');
    const button = document.createElement('a');
    dropdown.appendChild(button);
    dropdown.appendChild(select);
    dropdown.classList.add('dropdown');
    select.classList.add('dropdown-menu');
    button.classList.add('btn');
    button.classList.add('btn-warning');
    button.classList.add('dropdown-toggle');
    button.setAttribute('type', 'button');
    button.setAttribute('id', 'dropdownMenuButton1');
    button.setAttribute('data-bs-toggle', 'dropdown');
    button.setAttribute('aria-expanded', 'false');
    button.textContent = "Editoriales";
    select.setAttribute('aria-labelledby', `dropdownMenuButton1`);
    const editoriales = ["Todos", "Marvel", "DC"];
    editoriales.forEach(element => {
        const li= document.createElement('li');
        const option = document.createElement('option');
        option.textContent = element;
        // option.href = "#"
        option.classList.add("dropdown-item");
        //if (element == selectedOption) option.selected = true;
        li.appendChild(option);
        select.appendChild(li);
        li.addEventListener('click', async (e) => {
            const $seccionTabla = document.getElementById('tabla');
            console.log(e);
            const $tabla = document.getElementById('tablita');
            $tabla.style.setProperty("display", "none");
            divTabla.style.setProperty("display", "none");
            crearSpinner($seccionTabla);
            const superheroes = await getAllFetch(URL);
            const seleccion = e.target.value;
            const listaFiltrada = actualizarPorEditorial(superheroes, seleccion);
            actualizarTabla($seccionTabla, listaFiltrada, colorHeader, identidicador, titulo, seleccion, mappearSuperheroes());
            prom.textContent = PromediarTabla(listaFiltrada);
            max.textContent = EncontrarMasFuerte(listaFiltrada);
            min.textContent = EncontrarMenosFuerte(listaFiltrada);
            divTabla.style.setProperty("display", "block");
        });
    });
    // select.addEventListener('change', async (e) => {
    //     const $seccionTabla = document.getElementById('tabla');
    //     console.log(e);
    //     const $tabla = document.getElementById('tablita');
    //     $tabla.style.setProperty("display", "none");
    //     divTabla.style.setProperty("display", "none");
    //     crearSpinner($seccionTabla);
    //     const superheroes = await getAllFetch(URL);
    //     const seleccion = e.target.value;
    //     const listaFiltrada = actualizarPorEditorial(superheroes, seleccion);
    //     actualizarTabla($seccionTabla, listaFiltrada, colorHeader, identidicador, titulo, seleccion, mappearSuperheroes());
    //     prom.textContent = PromediarTabla(listaFiltrada);
    //     max.textContent = EncontrarMasFuerte(listaFiltrada);
    //     min.textContent = EncontrarMenosFuerte(listaFiltrada);
    //     divTabla.style.setProperty("display", "block");
    // });
    return dropdown;
}

function actualizarPorEditorial(data, seleccion) {
    let listaFiltrada = data;
    if (seleccion !== "Todos") {
        listaFiltrada = data.filter((element) => element.editorial === seleccion);
    }
    return listaFiltrada;
}

function crearFieldSetCheckboxs(divTabla, atributos, colorHeader, identidicador, titulo) {
    const columnasSeleccionadas = JSON.parse(localStorage.getItem('columnas')) || ['nombre', 'alias', 'editorial', 'fuerza', 'arma'];
    console.log(columnasSeleccionadas);
    const fieldset = document.createElement('fieldset');
    const divCheck = document.createElement('div');
    const divCheckRow = document.createElement('div');
    divCheck.classList.add('container');
    divCheckRow.classList.add('row');
    fieldset.id = 'fieldset-tabla';
    const columns = ["Nombre", "Alias", "Editorial", "Fuerza", "Arma"];
    columns.forEach(element => {
        const div = document.createElement('div');
        const divCol = document.createElement('div');
        const checkbox = document.createElement('input');
        const label = document.createElement('label');
        div.setAttribute('id', 'divCheckbox');
        divCol.classList.add('col');
        div.classList.add('form-check');
        div.classList.add('form-switch');
        checkbox.setAttribute('type', "checkbox");
        checkbox.setAttribute('value', element);
        checkbox.setAttribute('id', element);
        checkbox.classList.add('form-check-input');
        label.setAttribute('for', element);
        if (!columnasSeleccionadas.includes(element.toLocaleLowerCase())) {
            checkbox.checked = false;
        }
        if ((atributos.includes(element.toLocaleLowerCase()))) checkbox.setAttribute('checked', true);
        checkbox.addEventListener('change', async (e) => {
            const $seccionTabla = document.getElementById('tabla');
            const $tabla = document.getElementById('tablita');
            $tabla.style.setProperty("display", "none");
            crearSpinner($seccionTabla);
            const select = document.getElementById('selectEditorial');
            divTabla.style.setProperty("display", "none");
            const superheroes = await getAllFetch(URL);
            const mapeados = mappearSuperheroes();
            actualizarStorage('columnas', mapeados)
            let seleccion =  "Todos";
            const listaFiltrada = actualizarPorEditorial(superheroes, seleccion);
            actualizarTabla($seccionTabla, listaFiltrada, colorHeader, identidicador, titulo, seleccion, mapeados);
            divTabla.style.setProperty("display", "block");
            $tabla.style.setProperty("display", "block");
        });
        label.textContent = element;
        div.appendChild(label);
        div.appendChild(checkbox);
        divCol.appendChild(div);
        divCheckRow.appendChild(divCol);
    });
    divCheck.appendChild(divCheckRow);
    fieldset.appendChild(divCheck);
    return fieldset;
}

function mappearSuperheroes() {
    const fieldset = document.getElementById('fieldset-tabla');
    const checkboxes = fieldset.querySelectorAll('input[type="checkbox"]:checked');
    const atributos = Array.from(checkboxes).map(checkbox => checkbox.value.toLowerCase());
    return Object.values(atributos);
}


function PromediarTabla(data) {
    const sum = data.reduce((acc, element) => {
        return acc + element.fuerza;
    }, 0);
    return sum / data.length || 0;
}

function EncontrarMasFuerte(data) {
    if (data.length === 0) {
        return null;
    }

    const masFuerte = data.reduce((a, b) => {
        return (a.fuerza < b.fuerza) ? b : a;
    });

    return masFuerte.fuerza;
}

function EncontrarMenosFuerte(data) {
    if (data.length === 0) {
        return null;
    }

    const masFuerte = data.reduce((a, b) => {
        return (a.fuerza > b.fuerza) ? b : a;
    });

    return masFuerte.fuerza;
}

export function crearSpinner($seccionTabla) {
    const spinnerTabla = document.createElement('span');
    spinnerTabla.classList.add('loader');
    spinnerTabla.id = "spinnerTabla";
    spinnerTabla.style.setProperty("display", "block");
    $seccionTabla.appendChild(spinnerTabla);
    return spinnerTabla;
}


export function clearTablaSeccion(contenedor) {
    while (contenedor.hasChildNodes()) {
        contenedor.removeChild(contenedor.firstChild);
    }
}

function actualizarStorage(clave, data) {
    localStorage.setItem(clave, JSON.stringify(data));
}
