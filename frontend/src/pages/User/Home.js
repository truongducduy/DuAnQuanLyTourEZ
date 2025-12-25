import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaMapMarkerAlt, FaCalendarAlt, FaSearch, FaClock } from 'react-icons/fa';

const TourCard = ({ tour }) => {
    const {
        title,
        schedule,
        gathering,
        price,
        discount,
        sold,
        images
    } = tour;

    const finalPrice = discount ? price - (price * discount) / 100 : price;

    return (
        <div className="tour-card col-4">
            <div className="card-image-wrapper">
                <img src={images?.[0] || "/placeholder.jpg"} alt={title} className="card-image" /> 
            </div>
            <div className="card-content">
                <h3 className="card-title">{title}</h3>
                <p className="card-info"><FaClock /> {schedule || "Không rõ"}</p>
                <p className="card-info"><FaMapMarkerAlt /> {gathering || "Chưa có thông tin"}</p>
                <p className="card-sold">Đã có <strong>{sold}</strong> lượt đặt</p>
                <div className="card-footer">
                    <div className="price-group">
                        {discount > 0 && <span>{price.toLocaleString()}₫</span>}
                        {/* <span className="card-price">{finalPrice.toLocaleString()}₫</span> */}
                    </div>
                    <button className="btn card-detail-btn">XEM NGAY</button>
                </div>
            </div>
        </div>
    );
};


const Home = () => {
    const heroImage = "/Frontend/Images/Home/hero.jpg";
    const [newTours, setNewTours] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/v1/")

            .then(res => {
                console.log("API DATA:", res.data);
                setNewTours(res.data.newTours || []);
            })
            .catch(err => console.log("API ERROR:", err));
    }, []);

    return (
        <>
            <section className="hero-section" style={{ backgroundImage: `url(${heroImage})` }}>
                <div className="container">                   
                    <h1 className="hero-title">TOURS DU LỊCH</h1>
                </div>
            </section>

            <div className="search-bar">
                <div className="search-input-group">
                    <span><FaMapMarkerAlt /></span>
                    <div><small>Địa điểm</small><strong>Chọn địa điểm</strong></div>
                </div>
                <div className="search-input-group">
                    <span><FaCalendarAlt /></span>
                    <div><small>Ngày khởi hành</small><strong>Chọn ngày</strong></div>
                </div>
                <div className="search-input-group">
                    <span><FaCalendarAlt /></span>
                    <div><small>Ngày kết thúc</small><strong>Chọn ngày</strong></div>
                </div>
                <button className="btn search-btn">TÌM KIẾM <FaSearch /></button>
            </div>

            <section className="tour-section">
                <div className="container">
                    <h2 className="section-title">Khám phá kho báu Việt Nam bằng **EZTRIP**</h2>

                    <div className="row tour-card-list">
                        {newTours.length > 0 ? (
                            newTours.map((tour) => (
                                <TourCard key={tour._id} tour={tour} />
                            ))
                        ) : (
                            <p>Đang tải dữ liệu...</p>
                        )}
                    </div>


                </div>
            </section>
        </>
    );
};

export default Home;
