import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import TourCard from "./TourCard";

export default function TourList() {
  const { slugCategory } = useParams();
  const [tours, setTours] = useState([]);
  const [categoryTitle, setCategoryTitle] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    // Fetch category title
    fetch("http://localhost:8080/api/v1/categories")
      .then((res) => res.json())
      .then((data) => {
        const cat = data.find((c) => c.slug === slugCategory);
        setCategoryTitle(cat?.title || "Không tìm thấy");
      })
      .catch(console.error);

    // Fetch tours by category
    fetch(`http://localhost:8080/api/v1/tours/${slugCategory}`)
      .then((res) => res.json())
      .then((data) => setTours(data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slugCategory]);

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* TITLE */}
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-10">
          Danh sách tour:{" "}
          <span className="text-green-400">
            {categoryTitle || "Đang tải..."}
          </span>
        </h2>

        {/* LIST */}
        {loading ? (
          <p className="text-center text-gray-400">Đang tải dữ liệu...</p>
        ) : tours.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
            {tours.map((tour) => (
              <TourCard key={tour._id} tour={tour} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400">
            Không có tour nào trong danh mục này
          </p>
        )}
      </div>
    </section>
  );
}
