import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaMapMarkerAlt, FaCalendarAlt, FaSearch, FaClock } from 'react-icons/fa';

const TourCard = ({ title, time, price, image }) => {
    return (
        <div className="tour-card col-4">
            <div className="card-image-wrapper">
                <img src={image} alt={title} className="card-image" />
            </div>
            <div className="card-content">
                <h3 className="card-title">{title}</h3>
                <p className="card-duration">
                    <FaClock style={{ marginRight: '5px' }} />
                    {time}
                </p>
                <div className="card-footer">
                    <p className="card-price">{price.toLocaleString()}₫</p>
                    <button className="btn card-detail-btn">NGAY</button>
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
                                <TourCard
                                    key={tour._id}
                                    title={tour.title}
                                    time={tour.duration || "Không rõ"}
                                    price={
                                        Number(tour.price || tour.priceAdult || 0)
                                    }
                                    image={
                                        tour.image ||
                                        "https://picsum.photos/350/200?random=99"
                                    }
                                />
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
