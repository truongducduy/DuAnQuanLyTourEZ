import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import TourCard from "./TourCard";
import { getToursByCategory, getAllCategories } from "../api/tourApi"; 

export default function TourList() {
  const { slugCategory } = useParams();
  const [tours, setTours] = useState([]);
  const [categoryTitle, setCategoryTitle] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setTours([]); // Reset trước khi load mới
      try {
        // 1. Lấy tên danh mục để hiển thị
        const categories = await getAllCategories();
        if (Array.isArray(categories)) {
            const cat = categories.find((c) => c.slug === slugCategory);
            setCategoryTitle(cat?.title || "Danh mục");
        }

        // 2. Lấy danh sách tour
        const res = await getToursByCategory(slugCategory);
        console.log("Dữ liệu TourList:", res);

        // API trả về { tours: [...] }
        if (res.tours) {
            setTours(res.tours);
        } else if (Array.isArray(res)) { // Trường hợp backend cũ trả về mảng
            setTours(res);
        } else {
            setTours([]);
        }

      } catch (err) {
        console.error("Lỗi tải danh sách tour:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slugCategory]);

  return (
    <section className="py-12 bg-[#0e1217] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white text-center mb-10 uppercase">
          Tour du lịch: <span className="text-green-400">{categoryTitle}</span>
        </h2>

        {loading ? (
          <p className="text-center text-gray-400 text-xl">Đang tải dữ liệu...</p>
        ) : tours.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.map((tour) => (
              <TourCard key={tour._id} tour={tour} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 mt-10">
            <p className="text-xl mb-4">Chưa có tour nào trong danh mục này.</p>
            <Link to="/" className="text-green-400 underline">Quay về trang chủ</Link>
          </div>
        )}
      </div>
    </section>
  );
}