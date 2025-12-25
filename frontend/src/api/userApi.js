import axiosClient from "./axiosClient"; 

export const userApi = {
   
    register: (data) => axiosClient.post('/users/register', data),
    
    login: (data) => axiosClient.post('/users/login', data),
    
    logout: () => axiosClient.get('/users/logout'),

    getDetail: (token) =>
        axiosClient.get('/users/detail', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
};