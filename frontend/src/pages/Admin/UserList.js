import React, { useEffect, useState } from "react";
import { getUsers, changeStatusUser, deleteUser } from "./UserService";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [sortValue, setSortValue] = useState("");

 const fetchData = async () => {
  try {
    const res = await getUsers({ page, search, sortKey, sortValue });
    console.log("API users:", res.data);

    const usersData = res.data.users || res.data.data?.users || [];
    const total = res.data.totalPage || res.data.data?.totalPage || 1;

    setUsers(usersData);
    setTotalPage(total);
  } catch (error) {
    console.log("Lỗi gọi API:", error);
    setUsers([]); 
  }
};


  useEffect(() => {
    fetchData();
  }, [page, search, sortKey, sortValue]);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn xóa người dùng này không?")) {
      await deleteUser(id);
      fetchData();
    }
  };

  const handleChangeStatus = async (id, status) => {
    const newStatus = status === "active" ? "inactive" : "active";
    await changeStatusUser(id, newStatus);
    fetchData();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Quản lý người dùng</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Tìm theo tên..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: "8px", width: "200px" }}
      />

      {/* Sort */}
      <select
        onChange={(e) => setSortKey(e.target.value)}
        style={{ marginLeft: "10px", padding: "8px" }}
      >
        <option value="">Sắp xếp theo</option>
        <option value="fullName">Tên</option>
        <option value="email">Email</option>
      </select>

      <select
        onChange={(e) => setSortValue(e.target.value)}
        style={{ marginLeft: "10px", padding: "8px" }}
      >
        <option value="">Thứ tự</option>
        <option value="asc">Tăng dần</option>
        <option value="desc">Giảm dần</option>
      </select>

      {/* Table */}
      <table
        style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse" }}
      >
        <thead>
          <tr style={{ background: "#eee" }}>
            <th>Họ tên</th>
            <th>Email</th>
            <th>SĐT</th>
            <th>Avatar</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>

        <tbody>
          {users.map((item) => (
            <tr key={item._id}>
              <td>{item.fullName}</td>
              <td>{item.email}</td>
              <td>{item.phone || "—"}</td>

              <td>
                {item.avatar ? (
                  <img
                    src={item.avatar}
                    alt=""
                    width="40"
                    style={{ borderRadius: "50%" }}
                  />
                ) : (
                  "—"
                )}
              </td>

              <td>
                <button onClick={() => handleChangeStatus(item._id, item.status)}>
                  {item.status === "active" ? "Đang hoạt động" : "Đã khóa"}
                </button>
              </td>

              <td>
                <button
                  style={{
                    background: "red",
                    color: "white",
                    padding: "5px 10px",
                    marginLeft: "10px",
                  }}
                  onClick={() => handleDelete(item._id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div style={{ marginTop: "20px" }}>
        {Array.from({ length: totalPage }, (_, i) => (
          <button
            key={i}
            style={{
              padding: "8px 14px",
              margin: "4px",
              background: page === i + 1 ? "#007bff" : "#ccc",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
            }}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UserList;
