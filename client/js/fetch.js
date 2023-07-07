const URL = 'http://localhost:3000/superheroes'


export const getAllinTableFetch = async (URL, callback, contenedor, colorHeader, identidicador, titulo, spinner, columnasSeleccionadas) => {
    try {
        let res = await fetch(URL);
        if (!res.ok) throw Error(`Error: ${res.status} - ${res.statusText}`);

        let data = await res.json();
        if (data.length != 0) callback(contenedor, data, colorHeader, identidicador, titulo, "Todos", columnasSeleccionadas);
        console.log(data);

    } catch (err) {
        console.error(`Error: ${err.message}`);
    }
    finally {
        spinner.style.setProperty("display", "none");
    }
};
export const getAllFetch = async (URL) => {
    try {
        let res = await fetch(URL);
        if (!res.ok) throw Error(`Error: ${res.status} - ${res.statusText}`);

        let data = await res.json();
        console.log(data);
        return data;

    } catch (err) {
        console.error(`Error: ${err.message}`);
    }
};


export const getOneFetch = async (URL, id, callback, contenedor) => {
    try {
        let res = await fetch(URL + '/' + id);
        if (!res.ok) throw Error(`Error: ${res.status} - ${res.statusText}`);

        let data = await res.json();
        console.log(data);
        callback(contenedor, data);

    } catch (err) {
        console.error(`Error: ${err.message}`);
    }
};

export const createSuperHeroeFetch = async (URL, data) => {
    const $formulario = document.querySelector('form');
    const $spinnerForm = document.getElementById('spinnerForm');
    const $tituloForm = document.getElementById('titulo-form');
    const $formFielset = document.querySelector('fieldset');
    $spinnerForm.style.setProperty("display", "block");
    $formulario.style.setProperty("display", "none");
    $tituloForm.style.setProperty("display", "none");
    $formFielset.style.setProperty("display", "none");
    fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(data)
    })
        .then((response) => {
            return response.ok ? response.json() : Promise.reject(response);
        })
        .then((responseData) => {
            console.log(responseData);
        })
        .catch((error) => {
            console.error(`Error: ${error.status} - ${error.statusText}`);
        })
        .finally(() => {
            $spinnerForm.style.setProperty("display", "none");
            $formulario.style.setProperty("display", "block");
            $tituloForm.style.setProperty("display", "block");
            $formFielset.style.setProperty("display", "block");
        });
};

export const updateSuperHeroeFetch = async (URL, data) => {
    const $formulario = document.querySelector('form');
    const $spinnerForm = document.getElementById('spinnerForm');
    const $tituloForm = document.getElementById('titulo-form');
    const $formFielset = document.querySelector('fieldset');
    $spinnerForm.style.setProperty("display", "block");
    $formulario.style.setProperty("display", "none");
    $tituloForm.style.setProperty("display", "none");
    $formFielset.style.setProperty("display", "none");
    fetch(URL + '/' + data.id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(data)
    })
        .then((response) => {
            return response.ok ? response.json() : Promise.reject(response);
        })
        .then((responseData) => {
            console.log(responseData);
        })
        .catch((error) => {
            console.error(`Error: ${error.status} - ${error.statusText}`);
        })
        .finally(() => {
            $spinnerForm.style.setProperty("display", "none");
            $formulario.style.setProperty("display", "block");
            $tituloForm.style.setProperty("display", "block");
            $formFielset.style.setProperty("display", "block");
        });
};


export const deleteSuperHeroeFetch = async (URL, id) => {
    const $formulario = document.querySelector('form');
    const $spinnerForm = document.getElementById('spinnerForm');
    const $tituloForm = document.getElementById('titulo-form');
    const $formFielset = document.querySelector('fieldset');
    $spinnerForm.style.setProperty("display", "block");
    $formulario.style.setProperty("display", "none");
    $tituloForm.style.setProperty("display", "none");
    $formFielset.style.setProperty("display", "none");
    fetch(URL + '/' + id, {
        method: "DELETE",
    })
        .then((response) => {
            if (!response.ok) return Promise.reject(response);
        })
        .catch((error) => {
            console.error(`Error:${error.status} - ${error.statusText}`);
        })
        .finally(() => {
            $spinnerForm.style.setProperty("display", "none");
            $formulario.style.setProperty("display", "block");
            $tituloForm.style.setProperty("display", "block");
            $formFielset.style.setProperty("display", "block");
        });
};