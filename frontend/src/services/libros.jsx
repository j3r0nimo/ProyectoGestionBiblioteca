import api from "./api";

// devuelve todos los libros de manera paginada
export const getLibros = async (page = 1, limit = 10, keyword = '') => {
    const res = await api.get(`/libros?page=${page}&limit=${limit}&keyword=${keyword}`);
    return res.data
}

// devuelve un libro dependiendo de su id
export const getLibroById = async (id) => {
    try {
        const res = await api.get(`/libros/${id}`);
        return res.data;
    } catch (error) {
        console.error("Error al obtener el libro por ID:", error);
        throw error;
    }
}

//crea libro pasandole informacion desde un formulario
export const createLibro = async (formData) => {
    try {
        const res = await api.post('/libros', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return res.data;
    } catch (error) {
        console.error("Error al crear:", error.response?.data || error.message);
        throw error;
    }
}

//borra libro pasandole la id del libro a borrar
export const deleteLibro = async (id) => {
    try {
        const res = await api.delete(`/libros/${id}`);
        return res.data;
    } catch (error) {
        console.error("Error al borrar el libro:", error);
        throw error;
    }
}

//actualiza usando el id para encontrar el libro y el formData para agregar los datos
export const updateLibro = async (id, formData) => {
    try {
        const res = await api.put(`/libros/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return res.data
    } catch (error) {
        console.error("Error al actualizar el libro:", error);
        throw error;
    }
}