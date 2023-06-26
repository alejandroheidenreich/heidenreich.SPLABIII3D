//const URL = 'http://localhost:3000/superheroes'

export const getAllinTableAxios = async (URL, callback, contenedor, colorHeader, identidicador, titulo, spinner) => {
    try {
        let { data } = await axios.get(URL);
        console.log(data);
        if (data.length != 0) callback(contenedor, data, colorHeader, identidicador, titulo);
    } catch (error) {
        console.error(error.message);
    }
    finally {
        spinner.style.setProperty("display", "none");
    }
};
export const getAllAxios = async (URL) => {
    try {
        let { data } = await axios.get(URL);
        console.log(data);
    } catch (error) {
        console.error(error.message);
    }
    return data;
};

export const getOneAxios = async (URL, id, callback, contenedor) => {
    try {
        let { data } = await axios.get(URL + '/' + id);
        console.log(data);
        callback(contenedor, data);

    } catch (error) {
        console.error(error.message);
    }


};

export const createSuperHeroeAxios = async (URL, data) => {
    const $formulario = document.querySelector('form');
    const $spinnerForm = document.getElementById('spinnerForm');
    const $tituloForm = document.getElementById('titulo-form');
    const $formFielset = document.querySelector('fieldset');
    $spinnerForm.style.setProperty("display", "block");
    $formulario.style.setProperty("display", "none");
    $tituloForm.style.setProperty("display", "none");
    $formFielset.style.setProperty("display", "none");

    axios.post(URL, data, {
        "Content-Type": "application/json;charset=utf-8"
    })
        .then((response) => {
            const { res } = response;
            console.log(res);
        })
        .catch((error) => {
            console.error(error.message);
        })
        .finally(() => {
            $spinnerForm.style.setProperty("display", "none");
            $formulario.style.setProperty("display", "block");
            $tituloForm.style.setProperty("display", "block");
            $formFielset.style.setProperty("display", "block");
        });
};

export const updateSuperHeroeAxios = async (URL, data) => {
    const $formulario = document.querySelector('form');
    const $spinnerForm = document.getElementById('spinnerForm');
    const $tituloForm = document.getElementById('titulo-form');
    const $formFielset = document.querySelector('fieldset');
    $spinnerForm.style.setProperty("display", "block");
    $formulario.style.setProperty("display", "none");
    $tituloForm.style.setProperty("display", "none");
    $formFielset.style.setProperty("display", "none");
    try {
        let { datas } = await axios.put(URL + '/' + data.id, data, {
            "Content-Type": "application/json;charset=utf-8"
        });
        console.log(datas);

    } catch (error) {
        console.error(error.message);
    }
    finally {
        $spinnerForm.style.setProperty("display", "none");
        $formulario.style.setProperty("display", "block");
        $tituloForm.style.setProperty("display", "block");
        $formFielset.style.setProperty("display", "block");
    }
};

export const deleteSuperHeroeAxios = async (URL, id) => {
    const $formulario = document.querySelector('form');
    const $spinnerForm = document.getElementById('spinnerForm');
    const $tituloForm = document.getElementById('titulo-form');
    const $formFielset = document.querySelector('fieldset');
    $spinnerForm.style.setProperty("display", "block");
    $formulario.style.setProperty("display", "none");
    $tituloForm.style.setProperty("display", "none");
    $formFielset.style.setProperty("display", "none");
    try {
        let { datas } = await axios.delete(URL + '/' + id, {
            "Content-Type": "application/json;charset=utf-8"
        });
        console.log(datas);

    } catch (error) {
        console.error(error.message);
    }
    finally {
        $spinnerForm.style.setProperty("display", "none");
        $formulario.style.setProperty("display", "block");
        $tituloForm.style.setProperty("display", "block");
        $formFielset.style.setProperty("display", "block");
    }
};

// const $loader = document.getElementById('loader');

// $loader.classList.add("oculto");

// const $botonObtener = document.getElementById('botonObtenerPersonas');

// $botonObtener.addEventListener("click", async () => {

//     // axios();// GET
//     try {
//         $loader.classList.remove("oculto");
//         let { data } = await axios.get(URL);
//         console.log(data);

//     } catch (error) {
//         console.error(error.message);
//     }
//     finally {
//         $loader.classList.add("oculto");
//     }
//     // axios.get(URL)
//     //     .then((response) => {
//     //         const { data } = response;
//     //     })
//     //     .catch((error) => {
//     //         console.error(error.message);
//     //     })
//     //     .finally(() => {

//     //     });

// });

// const $botonCrearPersona = document.getElementById('botonCrearPersona');

// // $botonCrearPersona.addEventListener("click", () => {

// //     // axios();// GET
// //     const data = {
// //         "nombre": "Roberto",
// //         "apellido": "Carlos"
// //     }

// //     $loader.classList.remove("oculto");
// //     axios.post(URL, data, {
// //         "Content-Type": "application/json;charset=utf-8"
// //     })
// //         .then((response) => {
// //             const { data } = response;
// //         })
// //         .catch((error) => {
// //             console.error(error.message);
// //         })
// //         .finally(() => {
// //             $loader.classList.add("oculto");
// //         });

// // });

// const $botonBorrarPersona = document.getElementById('botonBorrarPersona');

// $botonBorrarrPersona.addEventListener("click", async () => {

//     // axios();// GET

//     const data = {
//         "nombre": "Roberto",
//         "apellido": "Carlos"
//     }

//     $loader.classList.remove("oculto");
//     try {
//         $loader.classList.remove("oculto");
//         let { datas } = await axios.post(URL, data, {
//             "Content-Type": "application/json;charset=utf-8"
//         });
//         console.log(datas);

//     } catch (error) {
//         console.error(error.message);
//     }
//     finally {
//         $loader.classList.add("oculto");
//     }


// });


// $botonCrearPersona.addEventListener("click", async () => {

//     // axios();// GET

//     const data = {
//         "nombre": "Roberto",
//         "apellido": "Carlos"
//     }

//     $loader.classList.remove("oculto");
//     try {
//         $loader.classList.remove("oculto");
//         let { datas } = await axios.post(URL, data, {
//             "Content-Type": "application/json;charset=utf-8"
//         });
//         console.log(datas);

//     } catch (error) {
//         console.error(error.message);
//     }
//     finally {
//         $loader.classList.add("oculto");
//     }


// });

