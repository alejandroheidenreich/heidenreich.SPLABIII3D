export function crearListaSuperHeroes(contenedor, superheroes, principal, campoOculto, imgPropiedades) {

    superheroes.forEach((element) => {
        contenedor.appendChild(crearSuperHeroes(element, principal, campoOculto, imgPropiedades));

    });

}
function crearSuperHeroes(superheroes, principal, campoOculto, imgPropiedades) {

    const fieldset = document.createElement('fieldset');

    if (principal in superheroes) {
        const h2 = document.createElement('h2');
        const img = document.createElement('img');
        const div = document.createElement('div');
        img.setAttribute('src', imgPropiedades[principal]);
        img.setAttribute('alt', principal);
        img.classList.add('imgCards');

        h2.textContent = superheroes[principal];
        div.appendChild(img);
        div.appendChild(h2);
        div.classList.add('divAnuncio');
        fieldset.appendChild(div);
    }
    else {
        return null;
    }

    for (const propiedad in superheroes) {
        if (propiedad === principal || propiedad === campoOculto) continue;
        const div = document.createElement('div');
        const p = document.createElement('p');
        const img = document.createElement('img');

        img.setAttribute('src', imgPropiedades[propiedad]);
        img.setAttribute('alt', propiedad);
        img.classList.add('img-fluid');
        //fieldset.appendChild(img);
        div.appendChild(img);
        p.textContent = capitalizeString(propiedad) + ": " + superheroes[propiedad];
        //fieldset.appendChild(p);
        div.appendChild(p);
        div.classList.add('divAnuncio');
        fieldset.appendChild(div);
    }


    return fieldset;
}

function capitalizeString(string) {
    let stringCapitalized = string.toLowerCase();

    stringCapitalized = stringCapitalized.charAt(0).toUpperCase() + stringCapitalized.slice(1);;

    return stringCapitalized;
}