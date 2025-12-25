import axios from "axios";

const API = "http://localhost:8080/api/v1/admin/accounts";

const getToken = () => localStorage.getItem("token");

export const getAccounts = (params = {}) => {
    return axios.get(API, {
        params,
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

export const getAccountDetail = (id) => {
    return axios.get(`${API}/detail/${id}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

export const updateAccount = (id, data) => {
    return axios.patch(`${API}/edit/${id}`, data, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};


export const changeStatus = (id, status) => {
    return axios.patch(
        `${API}/changeStatus/${status}/${id}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    );
};

export const deleteAccount = (id) => {
    return axios.delete(`${API}/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};
