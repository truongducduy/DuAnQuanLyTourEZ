import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { FiSearch } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import TourCard from '../Layout/TourCard';
import { getHomeData } from '../api/tourApi'; 

const Home = () => {
  const [newTours, setNewTours] = useState([]);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  
  const heroImage = "/Frontend/Images/Home/hero.jpg"; 

  const handleSearch = (e) => {
    if (e.key === "Enter") goSearch();
  };

  const goSearch = () => {
    if (!keyword.trim()) return;
    navigate(`/search?keyword=${keyword}`);
    setKeyword("");
  };


  useEffect(() => {
    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await getHomeData();
            console.log("Dữ liệu Home:", res); 
           
            if (res.newTours) {
                setNewTours(res.newTours);
            } else if (res.data && res.data.newTours) {
                setNewTours(res.data.newTours); 
            } else {
                setNewTours([]);
            }
        } catch (error) {
            console.error("Lỗi tải trang chủ:", error);
        } finally {
            setLoading(false);
        }
    };
    fetchData();
  }, []);
  // --------------------

  return (
    <>
      <section className="relative h-[500px] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-extrabold text-white mb-4">KHÁM PHÁ VIỆT NAM</h1>
          <p className="text-xl text-gray-200">Cùng EZTRIP trải nghiệm những hành trình tuyệt vời</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto -mt-10 relative z-20 bg-[#1a1a22] p-4 rounded-xl shadow-2xl flex flex-wrap gap-4 items-center justify-between">
         <div className="flex-1 flex items-center bg-[#121212] px-4 py-3 rounded-lg border border-gray-700">
            <FiSearch className="text-gray-400 mr-2" />
            <input 
                type="text" 
                placeholder="Bạn muốn đi đâu?" 
                className="bg-transparent outline-none text-white w-full"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={handleSearch}
            />
         </div>
         <button onClick={goSearch} className="bg-green-500 text-black font-bold px-8 py-3 rounded-lg hover:bg-green-400 transition">
            TÌM KIẾM
         </button>
      </div>

      <section className="py-16 bg-[#0e1217]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-10">
             Tour Mới Nhất từ <span className="text-green-400">EZTRIP</span>
          </h2>
          
          {loading ? (
             <p className="text-center text-white">Đang tải dữ liệu...</p>
          ) : newTours.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {newTours.map((tour) => (
                <TourCard key={tour._id} tour={tour} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">
                Không có tour nào (Hãy kiểm tra Database xem có tour "active" không)
            </p>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;