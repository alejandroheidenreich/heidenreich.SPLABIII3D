//const URL = 'http://localhost:3000/superheroes'



export const getAllinTableAjax = (URL, callback, contenedor, colorHeader, identidicador, titulo, spinner) => {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', () => {

        if (xhr.readyState === 4) {

            if (xhr.status >= 200 && xhr.status < 300) {

                const data = JSON.parse(xhr.responseText);
                console.log(data);
                if (data.length != 0) callback(contenedor, data, colorHeader, identidicador, titulo);
            } else {
                console.error(`Error: ${xhr.status} - ${xhr.statusText}`);
            }
            spinner.style.setProperty("display", "none");
        }
    });

    xhr.open('GET', URL);

    xhr.send();
}

export const getAllAjax = (URL) => {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', () => {

        if (xhr.readyState === 4) {

            if (xhr.status >= 200 && xhr.status < 300) {

                const data = JSON.parse(xhr.responseText);
                console.log(data);
                return data;
            } else {
                console.error(`Error: ${xhr.status} - ${xhr.statusText}`);
            }

        }
    });

    xhr.open('GET', URL);
    xhr.send();
}

export const getOneAjax = (URL, id, callback, contenedor) => {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', () => {

        if (xhr.readyState === 4) {

            if (xhr.status >= 200 && xhr.status < 300) {

                const data = JSON.parse(xhr.responseText);
                console.log(data);
                callback(contenedor, data);

            } else {
                console.error(`Error: ${xhr.status} - ${xhr.statusText}`);
            }

        }
    });

    xhr.open('GET', URL + '/' + id);

    xhr.send();
}


export const createSuperHeroeAjax = (URL, data) => {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', () => {

        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                const sh = JSON.parse(xhr.responseText);
                console.log(sh);
            }
            else {
                console.error(`Error: ${xhr.status} - ${xhr.statusText}`);
            }
        }
    });

    xhr.open("POST", URL);
    xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
    xhr.send(JSON.stringify(data));
};

export const updateSuperHeroeAjax = (URL, data) => {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', () => {

        if (xhr.readyState === 4) {

            if (xhr.status >= 200 && xhr.status < 300) {

                const data = JSON.parse(xhr.responseText);
                console.log(data);

            } else {
                console.error(`Error: ${xhr.status} - ${xhr.statusText}`);
            }
        }
    });

    xhr.open('PUT', URL + '/' + data.id);
    xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
    xhr.send(JSON.stringify(data));
};

export const deleteSuperHeroeAjax = (URL, id) => {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', () => {

        if (xhr.readyState === 4) {

            if (xhr.status >= 200 && xhr.status < 300) {
                const data = JSON.parse(xhr.responseText);
                console.log(data);

            } else {
                console.error(`Error: ${xhr.status} - ${xhr.statusText}`);
            }
        }
    });

    xhr.open('DELETE', URL + '/' + id);
    xhr.send();
};

// const $loader = document.getElementById('loader');

// $loader.classList.add("oculto");

// const $botonObtenerTodos = document.getElementById('botonObtenerPersonas');

// const $botonObtenerUna = document.getElementById('botonObtenerUna');

// const $botonCrearPersona = document.getElementById('botonCrearPersona');

// $botonObtenerTodos.addEventListener("click", () => {
//     $loader.classList.remove("oculto");

//     const xhr = new XMLHttpRequest();

//     xhr.addEventListener('readystatechange', () => {

//         if (xhr.readyState === 4) {

//             if (xhr.status >= 200 && xhr.status < 300) {

//                 const data = JSON.parse(xhr.responseText);
//                 console.log(data);

//             } else {
//                 console.error(`Error: ${xhr.status} - ${xhr.statusText}`);
//             }
//             $loader.classList.add("oculto");
//         }
//     });

//     xhr.open('GET', URL);

//     xhr.send();
// })



// $botonObtenerUna.addEventListener("click", (id) => {
//     $loader.classList.remove("oculto");

//     const xhr = new XMLHttpRequest();

//     xhr.addEventListener('readystatechange', () => {

//         if (xhr.readyState === 4) {

//             if (xhr.status >= 200 && xhr.status < 300) {

//                 const data = JSON.parse(xhr.responseText);
//                 console.log(data);

//             } else {
//                 console.error(`Error: ${xhr.status} - ${xhr.statusText}`);
//             }
//             $loader.classList.add("oculto");
//         }
//     });

//     xhr.open('GET', URL + '/' + id);

//     xhr.send();
// })


// const $botonObtener = document.getElementById('botonObtenerPersonas');

// $botonCrearPersona.addEventListener("click", () => {

//     const data = {
//         "nombre": "Juan",
//         "apellido": "Perez"
//     }


//     $loader.classList.remove("oculto");

//     const xhr = new XMLHttpRequest();

//     xhr.addEventListener('readystatechange', () => {

//         if (xhr.readyState === 4) {

//             if (xhr.status >= 200 && xhr.status < 300) {

//                 const data = JSON.parse(xhr.responseText);
//                 console.log(data);

//             } else {
//                 console.error(`Error: ${xhr.status} - ${xhr.statusText}`);
//             }
//             $loader.classList.add("oculto");
//         }
//     });

//     xhr.open('POST', URL);
//     xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");

//     xhr.send(JSON.stringify(data));
// })


// const $botonBorrar = document.getElementById('botonBorrarPersona');

// $botonDelete.addEventListener("click", (id) => {

//     const data = {
//         "nombre": "Juan",
//         "apellido": "Perez"
//     }


//     $loader.classList.remove("oculto");

//     const xhr = new XMLHttpRequest();

//     xhr.addEventListener('readystatechange', () => {

//         if (xhr.readyState === 4) {

//             if (xhr.status >= 200 && xhr.status < 300) {

//                 const data = JSON.parse(xhr.responseText);
//                 console.log(data);

//             } else {
//                 console.error(`Error: ${xhr.status} - ${xhr.statusText}`);
//             }
//             $loader.classList.add("oculto");
//         }
//     });

//     xhr.open('DELETE', URL + '/' + id);
//     xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");

//     xhr.send(JSON.stringify(data));
// })


// $botonModificarPersona.addEventListener("click", () => {

//     const data = {
//         "id": 1,
//         "nombre": "Juan",
//         "apellido": "Martinez"
//     }
//     $loader.classList.remove("oculto");

//     const xhr = new XMLHttpRequest();

//     xhr.addEventListener('readystatechange', () => {

//         if (xhr.readyState === 4) {

//             if (xhr.status >= 200 && xhr.status < 300) {

//                 const data = JSON.parse(xhr.responseText);
//                 console.log(data);

//             } else {
//                 console.error(`Error: ${xhr.status} - ${xhr.statusText}`);
//             }
//             $loader.classList.add("oculto");
//         }
//     });

//     xhr.open('PUT', URL + '/' + data.id);//put cambio todo patch cambio un valor
//     xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
//     xhr.send(JSON.stringify(data));
// })
