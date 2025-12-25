import axios from "axios";

const API = "http://localhost:8080/api/v1/users";

export const userApi = {
    register: (data) => axios.post(`${API}/register`, data),
    login: (data) => axios.post(`${API}/login`, data),
    getDetail: (token) =>
        axios.get(`${API}/detail`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
};
