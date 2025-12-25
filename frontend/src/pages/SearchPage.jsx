import React, { useEffect, useState } from "react"; 
import { useSearchParams, Link } from "react-router-dom";
import { searchTours } from "../api/searchApi";

const SearchPage = () => {
  const [params] = useSearchParams();
  const keyword = params.get("keyword") || "";
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Nếu không có keyword thì không gọi API
    if (!keyword) return;

    const fetchSearch = async () => {
      setLoading(true);
      try {
        // Gọi hàm từ searchApi.js
        const res = await searchTours(keyword);
        

        setTours(res.tours || []);
        
      } catch (error) {
        console.error("Lỗi khi tìm kiếm:", error);
        setTours([]); // Nếu lỗi thì set về rỗng
      } finally {
        setLoading(false);
      }
    };

    fetchSearch();
  }, [keyword]); // Chạy lại khi keyword thay đổi

  return (
    <div className="max-w-7xl mx-auto mt-32 mb-20 px-4 min-h-[50vh]">
      <h2 className="text-xl font-bold text-white mb-8">
        Kết quả tìm kiếm cho: <span className="text-green-400">"{keyword}"</span>
      </h2>

      {loading ? (
        <div className="text-center">
             <p className="text-green-400 text-lg">Đang tìm kiếm...</p>
        </div>
      ) : tours.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours.map((tour) => (
            <Link
              to={`/tour/${tour.slug}`}
              key={tour._id}
              className="bg-[#121212] rounded-xl overflow-hidden border border-gray-700 hover:border-green-500 transition group"
            >
              {/* Ảnh Tour */}
              <div className="h-48 w-full overflow-hidden">
                <img
                  src={tour.avatar || tour.images?.[0] || "/no-image.jpg"}
                  alt={tour.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition duration-500"
                  onError={(e) => {e.target.src = "https://via.placeholder.com/300"}}
                />
              </div>

              {/* Thông tin */}
              <div className="p-4 text-white">
                <h3 className="font-semibold text-lg line-clamp-2 min-h-[56px]">
                  {tour.title}
                </h3>
                <p className="text-sm text-gray-400 mt-2">
                  Đã bán: <span className="text-white font-semibold">{tour.sold || 0}</span>
                </p>
                
                <button className="mt-4 w-full py-2 border border-green-500 text-green-400 rounded-lg hover:bg-green-500 hover:text-black transition font-bold">
                  Xem chi tiết
                </button>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
            <p className="text-gray-400 text-lg">Không tìm thấy tour nào phù hợp với từ khóa này.</p>
            <p className="text-gray-500 text-sm mt-2">Hãy thử tìm với từ khóa khác (ví dụ: Đà Nẵng, Hà Nội...)</p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;