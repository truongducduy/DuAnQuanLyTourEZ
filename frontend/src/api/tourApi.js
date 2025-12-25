
import axiosClient from "./axiosClient"; 

export const getAllCategories = () => {
    return axiosClient.get('/categories');
};

export const getHomeData = () => {
    return axiosClient.get('/');
};

export const getToursByCategory = (slugCategory) => {
    return axiosClient.get(`/tours/${slugCategory}`);
};

export const getTourBySlug = (slugTour) => {
    return axiosClient.get(`/tours/detail/${slugTour}`);
};