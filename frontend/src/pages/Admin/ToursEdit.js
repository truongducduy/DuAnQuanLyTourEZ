import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTourDetail, updateTour } from "./ToursService";

const TourEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [tour, setTour] = useState({
        title: "",
        price: "",
        duration: "",
        image: "",
        description: "",
        status: "active"
    });

    useEffect(() => {
    const fetchTour = async () => {
        try {
            const res = await getTourDetail(id);

            if (!res.data.tour) {
                alert("Không tìm thấy tour");
                navigate("/admin/tours");
                return;
            }

            setTour(res.data.tour);
        } catch (error) {
            console.error(error);
            alert("Lỗi khi tải dữ liệu tour");
            navigate("/admin/tours");
        } finally {
            setLoading(false); // 🔥 LUÔN TẮT LOADING
        }
    };

    fetchTour();
}, [id, navigate]);



    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await updateTour(id, tour);
            alert("Cập nhật tour thành công");
            navigate("/admin/tours");
        } catch (error) {
            alert("Cập nhật thất bại");
        }
    };

    if (loading) return <p style={{ textAlign: "center" }}>Đang tải...</p>;

    return (
    <div className="edit-container">
        <form className="edit-form" onSubmit={handleSubmit}>
            <h2 className="edit-title">Sửa Tour</h2>

            <div className="form-group">
                <label>Tiêu đề</label>
                <input
                    type="text"
                    value={tour.title}
                    onChange={(e) => setTour({ ...tour, title: e.target.value })}
                    required
                />
            </div>

            <div className="form-group">
                <label>Giá</label>
                <input
                    type="number"
                    value={tour.price}
                    onChange={(e) => setTour({ ...tour, price: e.target.value })}
                    required
                />
            </div>

            <div className="form-group">
                <label>Thời gian</label>
                <input
                    type="text"
                    value={tour.duration}
                    onChange={(e) =>
                        setTour({ ...tour, duration: e.target.value })
                    }
                />
            </div>

            <div className="form-group">
                <label>Ảnh (URL)</label>
                <input
                    type="text"
                    value={tour.image}
                    onChange={(e) =>
                        setTour({ ...tour, image: e.target.value })
                    }
                />
            </div>

            <div className="form-group">
                <label>Mô tả</label>
                <textarea
                    rows="4"
                    value={tour.description}
                    onChange={(e) =>
                        setTour({ ...tour, description: e.target.value })
                    }
                />
            </div>

            <div className="form-group">
                <label>Trạng thái</label>
                <select
                    value={tour.status}
                    onChange={(e) =>
                        setTour({ ...tour, status: e.target.value })
                    }
                >
                    <option value="active">Hoạt động</option>
                    <option value="inactive">Ẩn</option>
                </select>
            </div>

            <div className="form-actions">
                <button type="submit" className="btn-save">
                    Lưu
                </button>
                <button
                    type="button"
                    className="btn-cancel"
                    onClick={() => navigate("/admin/tours")}
                >
                    Hủy
                </button>
            </div>
        </form>
    </div>
);
};

const styles = {
    container: {
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f3f6f9"
    },
    form: {
        width: "500px",
        background: "#fff",
        padding: "25px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        gap: "10px"
    },
    title: {
        textAlign: "center",
        marginBottom: "10px"
    },
    actions: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: "15px"
    },
    save: {
        background: "green",
        color: "#fff",
        border: "none",
        padding: "10px 20px",
        borderRadius: "6px",
        cursor: "pointer"
    },
    cancel: {
        background: "#ccc",
        border: "none",
        padding: "10px 20px",
        borderRadius: "6px",
        cursor: "pointer"
    }
};

export default TourEdit;
