import api from "./api";

// devuelve todos los contenidos de manera paginada
export const getContenidos = async (page = 1, limit = 10) => {
    const res = await api.get(`/contenidos?page=${page}&limit=${limit}`);
    return res.data
}
// devuelve el contenido relacionado al libro
export const getContenidoPorLibro = async (libroId) => {
    try {
        const res = await api.get(`/contenidos/libro/${libroId}`);
        return res.data;
    } catch (error) {
        console.error("Error al obtener el contenido del libro:", error);
        throw error;
    }
}
// creacion de contenido por medio de un formulario
export const createContenido = async (contenidoData) => {
    try {
        const res = await api.post('/contenidos', contenidoData);
        return res.data;
    } catch (error) {
        console.error("Error al crear el contenido:", error.response?.data || error.message);
        throw error;
    }
}
// actualizacion de contenido usando el id para buscar el contenido y cambiarlo por medio de un formulario
export const updateContenido = async (id, contenidoData) => {
    try {
        const res = await api.put(`/contenidos/${id}`, contenidoData);
        return res.data;
    } catch (error) {
        console.error("Error al actualizar el contenido:", error.response?.data || error.message);
        throw error;
    }
}
// borrado de contenido usando el id para buscarlo
export const deleteContenido = async (id) => {
    try {
        const res = await api.delete(`/contenidos/${id}`);
        return res.data;
    } catch (error) {
        console.error("Error al eliminar el contenido:", error.response?.data || error.message);
        throw error;
    }
}