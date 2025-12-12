import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/admin/users";

const getToken = () => localStorage.getItem("token");

// Lấy danh sách Users
export const getUsers = (params) => {
  return axios.get(API_URL, {
    params,
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
};

// Xóa User
export const deleteUser = (id) => {
  return axios.delete(`${API_URL}/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
};

// Đổi trạng thái User
export const changeStatusUser = (id, status) => {
  return axios.patch(
    `${API_URL}/changeStatus/${status}/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );
};
