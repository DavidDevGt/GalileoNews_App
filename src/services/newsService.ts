import axios from "axios";
import storage from "./storageService";

const API_URL = import.meta.env.VITE_API_URL
const token = import.meta.env.VITE_TOKEN

export default {
    async getNews() {
        console.log(storage);
        
        const response = await axios.get(`${API_URL}/noticias-eventos`,{
            headers: {
            // Authorization: `Bearer ${token}`
            Authorization: `Bearer defaultSecret`
        }
    })
    return response.data;

        // .then(response => {
        // console.log(response.data)
        // })
        // .catch(error => console.error('Error al obtener información: ', error));
        // return response.data;
    },

    async register(username: string, titulo: string, descripcion: string) {
        const response = await axios.post(`${API_URL}/auth/register`, {
            username,
            titulo,
            descripcion,
        });
        return response.data;
    },
};
