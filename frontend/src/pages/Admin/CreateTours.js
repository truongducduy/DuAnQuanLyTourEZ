import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTour } from "./ToursService";

const CreateTours = () => {
    const navigate = useNavigate();

    // ✅ Khai báo state (sửa toàn bộ lỗi no-undef)
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [discount, setDiscount] = useState("");
    const [stock, setStock] = useState("");
    const [category_id, setCategoryId] = useState("");
    const [gathering, setGathering] = useState("");
    const [status, setStatus] = useState("active");
    const [images, setImages] = useState([]);
    const [information, setInformation] = useState("");
    const [schedule, setSchedule] = useState("");

    const [timeStarts, setTimeStarts] = useState([
        { timeDepart: "", stock: "" }
    ]);

    // ✅ Submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            title,
            price,
            discount,
            stock,
            category_id,
            gathering,
            status,
            images,
            information,
            schedule,
            timeStarts
        };

        try {
            await createTour(data);
            alert("Thêm tour thành công");
            navigate("/admin/tours");
        } catch (error) {
            console.error(error);
            alert("Thêm tour thất bại");
        }
    };

    return (
        <div className="tour-create">
            <h2>Thêm mới Tour</h2>

            <form onSubmit={handleSubmit}>
                <input placeholder="Tên tour" value={title} onChange={e => setTitle(e.target.value)} />
                <input placeholder="Giá" value={price} onChange={e => setPrice(e.target.value)} />
                <input placeholder="Giảm giá" value={discount} onChange={e => setDiscount(e.target.value)} />
                <input placeholder="Số chỗ" value={stock} onChange={e => setStock(e.target.value)} />
                <input placeholder="Danh mục ID" value={category_id} onChange={e => setCategoryId(e.target.value)} />
                <input placeholder="Điểm tập trung" value={gathering} onChange={e => setGathering(e.target.value)} />

                <select value={status} onChange={e => setStatus(e.target.value)}>
                    <option value="active">Hoạt động</option>
                    <option value="inactive">Tạm khóa</option>
                </select>

                <textarea placeholder="Thông tin tour" value={information} onChange={e => setInformation(e.target.value)} />
                <textarea placeholder="Lịch trình" value={schedule} onChange={e => setSchedule(e.target.value)} />

                <button type="submit">➕ Thêm tour</button>
            </form>
        </div>
    );
};

export default CreateTours;
