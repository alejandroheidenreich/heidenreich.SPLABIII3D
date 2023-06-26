import { getAll } from './ajax.js';

export async function leerLista(URL) {
    try {
        let listaSuperheroe = await getAll(URL);
        return listaSuperheroe;
    } catch (err) {
        console.log(err);
    }
}