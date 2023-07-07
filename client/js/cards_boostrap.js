export function crearListaSuperHeroes(contenedor, superheroes, principal, campoOculto, imgPropiedades) {
    let contador = 0;
    const container = document.createElement('div');
    container.classList.add('container');

    superheroes.forEach((element) => {
        container.appendChild(crearSuperHeroes(element, principal, campoOculto, imgPropiedades));

    });

    contenedor.appendChild(container);
}
function crearSuperHeroes(superheroes, principal, campoOculto, imgPropiedades) {

    const row = document.createElement('div');
    const col = document.createElement('div');
    const card = document.createElement('div');
    col.appendChild(card);
    row.classList.add('row');
    row.classList.add('mt-5');
    col.classList.add('col-md-6');
    col.classList.add('offset-md-3');
    card.classList.add('card');
    row.appendChild(col);
    card.classList.add('bg-warning');

    if (principal in superheroes) {
        const h2 = document.createElement('h2');
        const img = document.createElement('img');
        const cardHeader = document.createElement('div');
        const rowHeader = document.createElement('div');
        const colImg = document.createElement('div');
        const colH2 = document.createElement('div');
        rowHeader.classList.add('row');
        rowHeader.classList.add('justify-content-between');
        colImg.classList.add('col-md-2');
        colH2.classList.add('col-md-9');

        img.style.width = '50px'
        img.style.height = '50px'
        cardHeader.classList.add('card-header');

        img.setAttribute('src', imgPropiedades[principal]);
        img.setAttribute('alt', principal);
        img.classList.add('imgCards');

        h2.textContent = superheroes[principal];

        colImg.appendChild(img);
        colH2.appendChild(h2);
        rowHeader.appendChild(colImg);
        rowHeader.appendChild(colH2);
        cardHeader.appendChild(rowHeader);
        card.appendChild(cardHeader);
    }
    else {
        return null;
    }

    for (const propiedad in superheroes) {
        if (propiedad === principal || propiedad === campoOculto) continue;
        const cardBody = document.createElement('div');
        const rowBody = document.createElement('div');
        const colImg = document.createElement('div');
        const colP = document.createElement('div');
        rowBody.classList.add('row');
        rowBody.classList.add('align-items-center');
        colImg.classList.add('col-md-2');
        colP.classList.add('col-md-10');
        rowBody.appendChild(colImg);
        rowBody.appendChild(colP);
        const p = document.createElement('p');
        const img = document.createElement('img');
        cardBody.classList.add('card-body');
        img.style.width = '50px'
        img.style.height = '50px'
        img.setAttribute('src', imgPropiedades[propiedad]);
        img.setAttribute('alt', propiedad);
        p.textContent = capitalizeString(propiedad) + ": " + superheroes[propiedad];

        colImg.appendChild(img);
        colP.appendChild(p);
        // cardBody.classList.add('divAnuncio');
        cardBody.appendChild(rowBody);
        card.appendChild(cardBody);
    }

    return row;
}

function capitalizeString(string) {
    let stringCapitalized = string.toLowerCase();

    stringCapitalized = stringCapitalized.charAt(0).toUpperCase() + stringCapitalized.slice(1);;

    return stringCapitalized;
}