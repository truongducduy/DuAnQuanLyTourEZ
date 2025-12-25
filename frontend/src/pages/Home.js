import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaMapMarkerAlt, FaCalendarAlt, FaSearch, FaClock } from 'react-icons/fa';
import TourCard from '../Layout/TourCard';
import { FiSearch } from "react-icons/fi";
import { useNavigate } from 'react-router';


const Home = () => {
    const heroImage = "/Frontend/Images/Home/hero.jpg";
    const [newTours, setNewTours] = useState([]);
    const navigate = useNavigate();

    const [keyword, setKeyword] = useState("");
    const handleSearch = (e) => {
        if (e.key === "Enter") goSearch();
      };

    const goSearch = () => {
    if (!keyword.trim()) return;
    navigate(`/search?keyword=${keyword}`);
    setKeyword("");
    };
    useEffect(() => {
        axios.get("http://localhost:8080/api/v1/")

            .then(res => {
                console.log("API DATA HOME:", res.data.newTours);   
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

            <div className="search-bar ">
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
                 {/* Search Bar */}
                <div className="flex-1 hidden md:flex justify-center">
                    <div className="w-[450px] bg-[#1a1a22] flex items-center gap-3 px-4 py-2 rounded-xl">
                    <FiSearch size={20} className="opacity-80" />

                    <input
                        type="text"
                        placeholder="Tìm kiếm tour..."
                        className="bg-transparent outline-none w-full"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        onKeyDown={handleSearch}
                    />

                    <button
                        onClick={goSearch}
                        className="text-white opacity-80 hover:opacity-100"
                    >
                        Tìm
                    </button>
                    </div>
                </div>
            </div>

            <section className="tour-section">
                <div className="container">
                    <h2 className="section-title">
                    Khám phá kho báu Việt Nam bằng <span className="highlight">EZTRIP</span>
                    </h2>

                    <div className="px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
                        
                        {newTours && newTours.length > 0 ? (
                        newTours
                            .slice(0, 6) // ✅ chỉ hiển thị 6 tour nổi bật
                            .map((tour) =>
                            tour?.price ? ( // ✅ đảm bảo tour hợp lệ
                                <TourCard key={tour._id} tour={tour} />
                            ) : null
                            )
                        ) : (
                        <p className="col-span-full text-center text-gray-500">
                            Đang tải dữ liệu tour...
                        </p>
                        )}

                    </div>
                    </div>
                </div>
                </section>

        </>
    );
};

export default Home;
