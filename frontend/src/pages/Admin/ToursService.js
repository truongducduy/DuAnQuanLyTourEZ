import axios from "axios";

const API = "http://localhost:8080/api/v1/admin";
const getToken = () => localStorage.getItem("token");

// thêm tour mới
export const createTour = (data) => {
    return axios.post(`${API}/tours/create`, data, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "application/json"
        }
    });
};


// lấy danh sách tour
export const getTours = async (params) => {
    const res = await axios.get(`${API}/tours`, {
        params,
        headers: { Authorization: `Bearer ${getToken()}` }
    });
    return res.data;
};

// lấy chi tiết tour
export const getTourDetail = (id) => {
    return axios.get(`${API}/tours/detail/${id}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};


// cập nhật tour
export const updateTour = (id, data) => {
    return axios.patch(`${API}/tours/edit/${id}`, data, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

// đổi trạng thái
export const changeStatus = (id, status) => {
    return axios.patch(
        `${API}/tours/change-status/${status}/${id}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    );
};

// xóa tour
export const deleteTour = (id) => {
    return axios.delete(
        `http://localhost:8080/api/v1/admin/tours/delete/${id}`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }
    );
};





