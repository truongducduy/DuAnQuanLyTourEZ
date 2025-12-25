import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import TourCard from "../Layout/TourCard";

const SearchPage = () => {
  const [params] = useSearchParams();
  const keyword = params.get("keyword") || "";
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
    <div className="max-w-[1200px] mx-auto mt-32 mb-20 px-4">
      <h2 className="text-xl font-bold text-white mb-6">
        Kết quả tìm kiếm cho: <span className="text-yellow-400">{keyword}</span>
      </h2>

      {newTours.length > 0 ? (
        <div className="px-4 sm:px-6 lg:px-8">
        <div className="items-center justify-items-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {newTours.length > 0 ? (
                newTours.map((tour) => (
                    <div className='flex-1 min-w-[250px] max-w-[300px] h-full border border-gray-700 rounded-xl overflow-hidden bg-tour-card' 
                        key={tour._id}>
                        <TourCard
                            key={tour._id}
                            slug={tour.slug} 
                            title={tour.title}
                            time={tour.duration || "Không rõ"}
                            price={
                                Number(tour.price || tour.priceAdult || 0)
                            }
                            image={
                                tour.images ||
                                "https://picsum.photos/350/200?random=99"
                            }
                        />
                    </div>
                ))
            ) : (
                <p>Đang tải dữ liệu...</p>
            )}
        </div>
    </div>
      ) : (
        <p className="text-gray-400 mt-10">Không tìm thấy tour nào.</p>
      )}
    </div>
  );
};

export default SearchPage;
