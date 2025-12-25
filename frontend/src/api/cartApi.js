import axiosClient from "./axiosClient";

export const addToCart = (tourId, body) => {
    return axiosClient.post(`/carts/add/${tourId}`, body);
};