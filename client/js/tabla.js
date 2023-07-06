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
    const divTabla = document.createElement('div');
    const divCol1 = document.createElement('div');
    const divCol2 = document.createElement('div');
    const divCol3 = document.createElement('div');
    const divCol4 = document.createElement('div');
    divCol1.classList.add('col-lg-3');
    divCol2.classList.add('col-sm-3');
    divCol3.classList.add('col-lg-3');
    divCol4.classList.add('col-sm-3');
    divTabla.setAttribute('id', 'divTabla');
    divFiltros.setAttribute('id', 'divFiltros');
    divFiltros.classList.add("row");
    h2.setAttribute('id', 'titulo-tabla');
    const filtro = document.createElement('label');
    const promedioTitulo = document.createElement('label');
    const prom = document.createElement('input');
    prom.setAttribute('type', 'text');
    prom.setAttribute('id', 'promedio');
    prom.setAttribute('value', PromediarTabla(data).toFixed(2));
    prom.setAttribute('readonly', true);
    prom.setAttribute('readonly', 'promedioFuerza');
    const fieldset = crearFieldSetCheckboxs(divTabla, atributos, colorHeader, identidicador, titulo);
    const select = CrearSelector(selectedOption, divTabla, prom, colorHeader, identidicador, titulo);
    h2.textContent = titulo;
    filtro.textContent = "Filtrar por Editorial:";
    promedioTitulo.textContent = "Promedio Fuerzas:";
    divCol1.appendChild(filtro);
    divCol2.appendChild(select);
    divCol3.appendChild(promedioTitulo);
    divCol4.appendChild(prom);
    divFiltros.appendChild(divCol1);
    divFiltros.appendChild(divCol2);
    divFiltros.appendChild(divCol3);
    divFiltros.appendChild(divCol4);
    divTabla.appendChild(h2);
    divTabla.appendChild(divFiltros);
    divTabla.appendChild(divFiltros);
    divTabla.appendChild(fieldset);
    contenedor.appendChild(divTabla);
    return divTabla;
}

function CrearSelector(selectedOption, divTabla, prom, colorHeader, identidicador, titulo) {
    const select = document.createElement('select');
    select.setAttribute('name', `selectEditorial`);
    select.setAttribute('id', `selectEditorial`);
    const editoriales = ["Todos", "Marvel", "DC"];
    editoriales.forEach(element => {
        const option = document.createElement('option');
        option.setAttribute('value', element);
        option.textContent = element;
        if (element == selectedOption) option.selected = true;
        select.appendChild(option);
    });
    select.classList.add('form-select');
    select.addEventListener('change', async (e) => {
        const $seccionTabla = document.getElementById('tabla');
        const $tabla = document.getElementById('tablita');
        $tabla.style.setProperty("display", "none");
        divTabla.style.setProperty("display", "none");
        crearSpinner($seccionTabla);
        const superheroes = await getAllFetch(URL);
        const seleccion = e.target.value;
        const listaFiltrada = actualizarPorEditorial(superheroes, seleccion);
        actualizarTabla($seccionTabla, listaFiltrada, colorHeader, identidicador, titulo, seleccion, mappearSuperheroes());
        prom.textContent = PromediarTabla(listaFiltrada);
        divTabla.style.setProperty("display", "block");
    });
    return select;
}

function actualizarPorEditorial(data, seleccion) {
    let listaFiltrada = data;
    if (seleccion !== "Todos") {
        listaFiltrada = data.filter((element) => element.editorial === seleccion);
    }
    return listaFiltrada;
}

function crearFieldSetCheckboxs(divTabla, atributos, colorHeader, identidicador, titulo) {
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
            const seleccion = (select.options[select.selectedIndex]).value;
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
