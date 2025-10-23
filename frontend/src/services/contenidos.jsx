import api from "./api";

export const getContenidos = async (page = 1, limit = 10) =>{
    const res = await api.get(`/contenidos?page=${page}&limit=${limit}`);
    return res.data
}