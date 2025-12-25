import { FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const TourCard = ({ tour }) => {
  if (!tour) return null;

  const {
    slug,
    title,
    price = 0,
    discount = 0,
    image,
    images,
    schedule,
    gathering,
    sold = 0,
  } = tour;
  

  const safePrice = Number(price || 0);
  const safeDiscount = Number(discount || 0);
  const finalPrice =
    safeDiscount > 0
      ? safePrice - (safePrice * safeDiscount) / 100
      : safePrice;

  const firstImage =
    Array.isArray(image) ? image[0] : image || "/no-image.jpg";

  return (
    <Link
      to={`/tour/${slug}`}
      className="flex flex-col h-full max-w-sm w-full rounded-xl overflow-hidden bg-[#121212] border border-white/10 hover:border-green-500 transition"
    >
      {/* IMAGE */}
      <div className="h-48 w-full overflow-hidden">
        <img
          src={firstImage}
          alt={title}
          className="h-full w-full object-cover hover:scale-105 transition duration-300"
        />
      </div>

      {/* CONTENT */}
      <div className="flex flex-col flex-1 p-4 text-white">
        <h3 className="text-lg font-semibold leading-tight line-clamp-2">
          {title}
        </h3>

        <p className="mt-2 text-sm text-gray-300 line-clamp-3 flex items-start gap-2">
          <FaClock className="mt-1 text-green-400" />
          <span>{schedule || "Không rõ lịch trình"}</span>
        </p>

        <p className="mt-2 text-sm text-gray-300 flex items-center gap-2">
          <FaMapMarkerAlt className="text-green-400" />
          <span>{gathering || "Chưa có điểm tập trung"}</span>
        </p>

        <p className="mt-2 text-sm text-gray-400">
          Đã có <span className="font-semibold text-white">{sold}</span> lượt đặt
        </p>

        {/* FOOTER */}
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/10">
          <div className="flex flex-col">
            {safeDiscount > 0 && (
              <span className="text-sm line-through text-gray-500">
                {safePrice.toLocaleString()}₫
              </span>
            )}
            <span className="text-lg font-bold text-green-400">
              {finalPrice.toLocaleString()}₫
            </span>
          </div>

          <button className="px-4 py-2 text-sm font-semibold text-green-400 border border-green-400 rounded-lg hover:bg-green-400 hover:text-black transition">
            XEM NGAY
          </button>
        </div>
      </div>
    </Link>
  );
};

export default TourCard;
