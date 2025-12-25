import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import TourCard from "./TourCard";
import { getToursByCategory } from "../api/tourApi";

export default function TourList() {
  const { slugCategory } = useParams();
  const [tours, setTours] = useState([]);
  const [categoryTitle, setCategoryTitle] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getToursByCategory(slugCategory);
        setTours(data.tours || []);
        setCategoryTitle(data.categoryTitle || slugCategory);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slugCategory]);

  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold text-center text-white">
        Danh sách tour: <span className="text-green-400">{categoryTitle}</span>
      </h2>

      {loading ? (
        <p className="text-center text-gray-400">Đang tải...</p>
      ) : (
        <div className="grid grid-cols-3 gap-6 mt-10">
          {tours.map((tour) => (
            <TourCard key={tour._id} tour={tour} />
          ))}
        </div>
      )}
    </section>
  );
}
