import { FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const TourCard = ({ tour }) => {
  if (!tour) return null;

  const {
    slug,
    title,
    price = 0,
    discount = 0,
    images,
    schedule,
    gathering,
    sold = 0,
  } = tour;

 
  const safePrice = Number(price) || 0;
  let safeDiscount = Number(discount) || 0;

 
  if (safeDiscount > 100 || safeDiscount < 0) {
    safeDiscount = 0;
  }


  const finalPrice = safeDiscount > 0
    ? safePrice - (safePrice * safeDiscount) / 100
    : safePrice;

 
  const defaultImage = "https://placehold.co/600x400?text=No+Image"; 
  
  
  const poster = (Array.isArray(images) && images.length > 0)
    ? images[0]
    : defaultImage;

  return (
    <Link
      to={`/tour/${slug}`}
      className="flex flex-col h-full max-w-sm w-full rounded-xl overflow-hidden bg-[#121212] border border-white/10 hover:border-green-500 transition group"
    >
      {/* KHUNG ẢNH */}
      <div className="h-48 w-full overflow-hidden relative bg-gray-800">
        <img
          src={poster}
          alt={title}
          className="h-full w-full object-cover group-hover:scale-105 transition duration-500"
          onError={(e) => {
    
            if (e.target.src !== defaultImage) {
              e.target.src = defaultImage;
            }
          }}
        />
        
    
        {safeDiscount > 0 && (
          <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
            Giảm {safeDiscount}%
          </span>
        )}
      </div>

      {/* NỘI DUNG */}
      <div className="flex flex-col flex-1 p-4 text-white">
        <h3 className="text-lg font-semibold leading-tight line-clamp-2 min-h-[50px]">
          {title}
        </h3>

        <div className="mt-3 space-y-2">
          <p className="text-sm text-gray-300 flex items-center gap-2">
            <FaClock className="text-green-400" />
            <span>{schedule || "Liên hệ lịch trình"}</span>
          </p>
          <p className="text-sm text-gray-300 flex items-center gap-2">
            <FaMapMarkerAlt className="text-green-400" />
            <span className="line-clamp-1">{gathering || "Toàn quốc"}</span>
          </p>
        </div>

        <p className="mt-2 text-sm text-gray-400">
          Đã bán: <span className="font-semibold text-white">{sold}</span>
        </p>

        {/* FOOTER GIÁ */}
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/10">
          <div className="flex flex-col">
            {safeDiscount > 0 && (
              <span className="text-sm line-through text-gray-500">
                {safePrice.toLocaleString('vi-VN')}₫
              </span>
            )}
            <span className="text-lg font-bold text-green-400">
              {finalPrice.toLocaleString('vi-VN')}₫
            </span>
          </div>
          <button className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-green-400 border border-green-400 rounded hover:bg-green-400 hover:text-black transition">
            Xem ngay
          </button>
        </div>
      </div>
    </Link>
  );
};

export default TourCard;