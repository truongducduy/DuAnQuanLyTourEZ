import axios from "axios";

const API = "http://localhost:8080/api/v1/admin/accounts";

export const getAccounts = async (params = {}) => {
    const token = localStorage.getItem("token");

    return axios.get(API, {
        params,
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
};

export const changeStatus = (id, status) => {
    const token = localStorage.getItem("token");

    return axios.patch(
        `${API}/changeStatus/${status}/${id}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
    );
};

export const deleteAccount = (id) => {
    const token = localStorage.getItem("token");

    return axios.delete(`${API}/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
};
