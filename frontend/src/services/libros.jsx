import api from "./api";

export const getLibros = async (page = 1, limit = 10) =>{
    const res = await api.get(`/libros?page=${page}&limit=${limit}`);
    return res.data
}