import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTours, deleteTour, changeStatus } from "./ToursService";
const TourList = () => {
    const navigate = useNavigate();
    const [tours, setTours] = useState([]);
    const [totalPage, setTotalPage] = useState(1);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sortKey, setSortKey] = useState("");
    const [sortValue, setSortValue] = useState("");

const fetchData = async () => {
    const res = await getTours({ page, search, sortKey, sortValue });

    console.log("RES:", res);

    setTours(res.toursObject || []); 

    setTotalPage(res.totalPage || 1);
};



    useEffect(() => {
        fetchData();
    }, [page, search, sortKey, sortValue]);

    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa tour này?")) {
            await deleteTour(id);
            fetchData();
        }
    };

    const handleChangeStatus = async (id, status) => {
        const newStatus = status === "active" ? "inactive" : "active";
        await changeStatus(id, newStatus);
        fetchData();
    };

    return (
        <div className="tour-container">

            <h2 className="page-title">Quản lý Tour</h2>

            <div className="top-controls">

                {/* NÚT THÊM MỚI TOUR */}
                <button
                    className="add-btn"
                    onClick={() => navigate("/admin/tours/create")}
                >
                    ➕ Thêm mới tour
                </button>

                <div className="show-entries">
                    <span>Hiển thị:</span>
                    <select>
                        <option>10</option>
                        <option>20</option>
                        <option>50</option>
                    </select>
                </div>

                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Tìm tour..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {/* Sort */}
                <select
                    className="select-sort"
                    onChange={(e) => setSortKey(e.target.value)}
                >
                    <option value="">Sắp xếp theo</option>
                    <option value="title">Tên Tour</option>
                    <option value="price">Giá</option>
                </select>

                <select
                    className="select-sort"
                    onChange={(e) => setSortValue(e.target.value)}
                >
                    <option value="">Thứ tự</option>
                    <option value="asc">Tăng dần</option>
                    <option value="desc">Giảm dần</option>
                </select>
            </div>


            {/* Bảng Tour */}
            <table className="tour-table">
                <thead>
                    <tr>
                        <th>Tên Tour</th>
                        <th>Giá</th>
                        <th>Số ngày</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                </thead>

                <tbody>
                    {tours.map((tour) => (
                        <tr key={tour._id}>
                            <td>{tour.title}</td>
                            <td>{tour.price.toLocaleString()} đ</td>
                            <td>{tour.schedule} ngày</td>

                            <td>
                                <span
                                    className={
                                        tour.status === "active"
                                            ? "badge-active"
                                            : "badge-pending"
                                    }
                                    onClick={() =>
                                        handleChangeStatus(tour._id, tour.status)
                                    }
                                    style={{ cursor: "pointer" }}
                                >
                                    {tour.status === "active"
                                        ? "Đang hoạt động"
                                        : "Tạm khóa"}
                                </span>
                            </td>

                            <td style={{ display: "flex", gap: "8px" }}>
                                <button
                                    className="edit-btn"
                                    onClick={() => navigate(`/admin/tours/edit/${tour._id}`)}
                                    title="Sửa tour"
                                >
                                    ✏️
                                </button>

                                <button
                                    className="delete-btn"
                                    onClick={() => handleDelete(tour._id)}
                                    title="Xóa tour"
                                >
                                    🗑
                                </button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination-footer">
                {Array.from({ length: totalPage }, (_, i) => (
                    <button
                        key={i}
                        className={page === i + 1 ? "active" : ""}
                        onClick={() => setPage(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>

        </div>
    );
};

export default TourList;
