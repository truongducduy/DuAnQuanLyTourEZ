import axios from "axios";

const API = "http://localhost:8080/api/v1/admin/tours";

export const getTours = async (params) => {
    const token = localStorage.getItem("token");

    const res = await axios.get("http://localhost:8080/api/v1/admin/tours", {
        params,
        headers: { Authorization: `Bearer ${token}` }
    });

    return res.data;  // ⚠️ TRẢ VỀ DẠNG GIỐNG LOG
};


export const deleteTour = async (id) => {
    const token = localStorage.getItem("token");

    return await axios.delete(`${API}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const changeStatus = async (id, status) => {
    const token = localStorage.getItem("token");

    return await axios.patch(`${API}/change-status/${id}`, 
        { status },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};
