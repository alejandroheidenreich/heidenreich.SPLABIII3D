export const crearFormulario = (titulo, elemento, ocultar = "id", propiedadSelect = false, arraySelect = null, propiedadRadio = false, arrayRadio = null, imgRadio = null, propiedadImagenes = false) => {
    const fieldset = document.createElement('fieldset');
    fieldset.classList.add('group-form');
    fieldset.appendChild(crearLeyenda(titulo));
    fieldset.appendChild(crearForm(elemento, ocultar, propiedadSelect, arraySelect, propiedadRadio, arrayRadio, imgRadio, propiedadImagenes));
    return fieldset;
};

const crearLeyenda = (titulo) => {
    const legend = document.createElement('legend');
    const h2 = document.createElement('h2');
    h2.setAttribute('id', 'titulo-form');
    h2.textContent = titulo;
    legend.appendChild(h2);
    return legend;
};

const crearForm = (elemento, ocultar, propiedadSelect = false, arraySelect = null, propiedadRadio = false, arrayRadio = null, imgRadio, propiedadImagenes) => {
    const form = document.createElement('form');
    const divCampos = document.createElement('div');
    divCampos.classList.add('datos-form');
    for (const propiedad in elemento) {
        if (propiedad == ocultar) {
            const input = document.createElement('input');
            input.setAttribute('type', 'hidden');
            input.setAttribute('name', `txt${capitalizeString(propiedad)}`);
            divCampos.appendChild(input);
            continue;
        }
        const p = document.createElement('p');
        if (propiedadImagenes && propiedad in propiedadImagenes) {
            const img = document.createElement('img');
            img.src = propiedadImagenes[propiedad];
            img.setAttribute('src', propiedadImagenes[propiedad]);
            img.setAttribute('alt', propiedad);
            p.appendChild(img);
            p.classList.add('input-img');
        } else {
            const h3 = document.createElement('h3');
            h3.textContent = propiedad.toUpperCase() + ":";
            p.appendChild(h3);
        }
        if (propiedad == propiedadSelect) {
            p.appendChild(crearSelect(propiedad, arraySelect));
        } else if (propiedad == propiedadRadio) {
            p.appendChild(crearInputRadio(propiedad, arrayRadio, imgRadio));
        } else {
            if (isNaN(parseInt(elemento[propiedad]))) {
                p.appendChild(crearInputText(propiedad));
            } else {
                p.appendChild(crearInputRange(propiedad));
            }
        }
        divCampos.appendChild(p);
    }
    form.appendChild(divCampos);
    form.appendChild(crearBotonera());
    form.classList.add("form-floating");
    form.classList.add("mb-3");
    return form;
}

function crearInputText(propiedad) {
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('name', `txt${capitalizeString(propiedad)}`);
    input.setAttribute('placeholder', `Ingrese ${capitalizeString(propiedad)}`);
    input.setAttribute('autocomplete', 'off');
    input.classList.add('form-control');
    return input;
}

function crearInputRange(propiedad) {
    const input = document.createElement('input');
    input.classList.add('form-range');
    input.setAttribute('type', 'range');
    input.setAttribute('name', `txt${capitalizeString(propiedad)}`);
    input.setAttribute('min', "0");
    input.setAttribute('max', "1000");
    input.setAttribute('value', "0");
    return input;
}

function crearInputRadio(propiedad, arrayRadio, imgRadio) {
    const fieldset = document.createElement('fieldset');
    
    for (let index = 0; index < arrayRadio.length; index++) {
        const div = document.createElement('div');
        div.classList.add('form-check')
        div.classList.add('form-check-inline')
        const radio = document.createElement('input');
        const label = document.createElement('label');
        const img = document.createElement('img');
        radio.classList.add('form-check-input');
        label.classList.add('form-check-label');
        radio.setAttribute('name', `radio${capitalizeString(propiedad)}`);
        radio.setAttribute('type', 'radio');
        radio.setAttribute('id', arrayRadio[index]);
        radio.setAttribute('value', arrayRadio[index])
        img.setAttribute('src', imgRadio[index]);
        img.setAttribute('alt', arrayRadio[index]);
        img.classList.add('imgForm');
        label.setAttribute('for', arrayRadio[index]);
        label.appendChild(img);
        div.appendChild(radio);
        div.appendChild(label);
        fieldset.appendChild(div)
    }
    fieldset.setAttribute('id', 'radioEditorial');
    fieldset.classList.add('radioEditorial');

    return fieldset;
}

function crearSelect(propiedad, arraySelect) {
    const select = document.createElement('select');
    select.setAttribute('name', `select${capitalizeString(propiedad)}`);
    select.classList.add('form-select');
    for (let index = 0; index < arraySelect.length; index++) {
        const option = document.createElement('option');
        option.setAttribute('value', arraySelect[index]);
        option.textContent = arraySelect[index];
        select.appendChild(option);
    }
    return select;
}


function crearBotonera() {
    const p = document.createElement('p');
    const button = document.createElement('input');
    const submit = document.createElement('input');
    submit.setAttribute('id', "boton-accion");
    submit.setAttribute('type', 'submit');
    submit.setAttribute('value', 'Cargar');
    submit.classList.add('btn');
    submit.classList.add('btn-success');
    button.setAttribute('id', "eliminar");
    button.setAttribute('type', 'button');
    button.setAttribute('value', 'Eliminar');
    button.classList.add('btn');
    button.classList.add('btn-danger');
    p.appendChild(submit);
    p.appendChild(button);
    p.setAttribute('id', "botonera");
    return p;
}

function capitalizeString(string) {
    let stringCapitalized = string.toLowerCase();
    stringCapitalized = stringCapitalized.charAt(0).toUpperCase() + stringCapitalized.slice(1);;
    return stringCapitalized;
}
