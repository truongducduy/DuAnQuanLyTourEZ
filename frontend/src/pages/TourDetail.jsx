import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTourBySlug } from "../api/tourApi";
import { addToCart } from "../api/cartApi"; // Import API thêm giỏ hàng

export const TourDetail = () => {
  const { slugTour } = useParams();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const data = await getTourBySlug(slugTour);
        setTour(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTour();
  }, [slugTour]);

  // --- HÀM XỬ LÝ: THÊM VÀO GIỎ & ĐI ĐẾN THANH TOÁN ---
  const handleBookNow = async () => {
    // 1. Kiểm tra User đã đăng nhập chưa (check client sơ bộ)
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Bạn cần đăng nhập để đặt tour!");
        navigate("/login");
        return;
    }

    if (!tour) return;

    // 2. Tìm ngày khởi hành hợp lệ (tương lai)
    const futureTimes = tour.timeStarts?.filter(item => new Date(item.timeDepart) > new Date()) || [];
    
    if (futureTimes.length === 0) {
      alert("Tour này hiện chưa có lịch khởi hành hoặc đã hết chỗ!");
      return;
    }

    // Mặc định lấy ngày gần nhất (hoặc bạn có thể làm UI select option)
    const selectedTime = futureTimes[0].timeDepart;

    setProcessing(true);

    try {
      // 3. GỌI API BACKEND: Thêm vào giỏ hàng
      const res = await addToCart(tour._id, {
        timeDepart: selectedTime,
        quantity: 1 // Mặc định 1 vé
      });

      console.log("Add Cart Res:", res);

      // 4. Xử lý kết quả
      if (res.code === 200) {
        // Thành công: Chuyển sang trang thanh toán
        navigate("/checkout");
      } else if (res.code === 400 && res.message === "Vui lòng gửi kèm token") {
         // Token hết hạn hoặc lỗi header -> Logout bắt đăng nhập lại
         localStorage.removeItem("token");
         localStorage.removeItem("user");
         alert("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại!");
         navigate("/login");
      } else {
        alert("Lỗi: " + res.message);
      }

    } catch (error) {
      console.error("Lỗi đặt tour:", error);
      alert("Có lỗi xảy ra. Vui lòng thử lại!");
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return <div className="text-white text-center mt-20">Đang tải...</div>;
  if (!tour) return <div className="text-red-500 text-center mt-20">Không tìm thấy tour!</div>;

  return (
    <div className="min-h-screen bg-[#0e1217] text-white pb-20 pt-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold mb-8 text-green-400">{tour.title}</h1>
        
        {/* ... (Phần Gallery ảnh giữ nguyên) ... */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10 h-auto md:h-[400px]">
             {/* Code hiển thị ảnh của bạn */}
             <div className="md:col-span-2 md:row-span-2 h-64 md:h-full rounded-xl overflow-hidden border border-gray-700">
                <img src={tour.images?.[0] || "/no-image.jpg"} className="w-full h-full object-cover" alt="Main" />
             </div>
             {/* ... */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-6">
                {/* ... (Phần thông tin chi tiết giữ nguyên) ... */}
                <div className="bg-[#1a1f25] p-6 rounded-xl">
                    <h2 className="text-2xl font-bold mb-4">Thông tin chi tiết</h2>
                    <p className="text-gray-300 whitespace-pre-line">{tour.information}</p>
                </div>
            </div>

            {/* SIDEBAR ĐẶT TOUR */}
            <div className="lg:col-span-1">
                <div className="bg-[#1a1f25] p-6 rounded-xl sticky top-24 border border-green-500/30">
                    <p className="text-gray-400 mb-2">Giá tốt nhất</p>
                    <div className="flex items-end gap-3 mb-6">
                        <span className="text-3xl font-bold text-green-400">
                            {tour.price_special ? tour.price_special.toLocaleString() : tour.price?.toLocaleString()}₫
                        </span>
                    </div>
                    
                    {/* NÚT BẤM GỌI HÀM HANDLEBOOKNOW */}
                    <button 
                        onClick={handleBookNow}
                        disabled={processing}
                        className={`w-full text-white font-bold py-4 rounded-lg transition transform hover:-translate-y-1 shadow-lg shadow-green-900/50 
                            ${processing ? "bg-gray-600 cursor-not-allowed" : "bg-green-600 hover:bg-green-500"}`}
                    >
                        {processing ? "ĐANG XỬ LÝ..." : "ĐẶT TOUR NGAY"}
                    </button>

                    <ul className="mt-6 space-y-3 text-sm text-gray-300">
                        <li className="flex justify-between">
                            <span>Mã tour:</span> <span className="text-white font-mono">{tour.code}</span>
                        </li>
                        <li className="flex justify-between">
                            <span>Khởi hành:</span> <span className="text-white">{tour.gathering || "Liên hệ"}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};