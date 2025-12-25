import React, { useState } from "react";
import { FaUser, FaLock, FaFacebookF, FaGoogle } from "react-icons/fa";
import { userApi } from "../api/userApi";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setMessage("Vui lòng nhập đầy đủ email và mật khẩu");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      // 1. Gọi API Login
      const res = await userApi.login({ email, password });
      
      // LƯU Ý QUAN TRỌNG: 
      // Vì axiosClient đã có interceptor trả về response.data,
      // nên biến 'res' ở đây CHÍNH LÀ data từ backend (code, token, message...)
      // gán data = res để dễ hiểu logic.
      const data = res; 

      console.log("Login Data:", data); // Check console xem có token không

      if (data.code === 200) {
        // Lấy token và cartId trực tiếp từ data
        const { token, cartId } = data; 

        // 2. Lưu Token
        if (token) localStorage.setItem("token", token);
        if (cartId) localStorage.setItem("cartId", cartId);

        // 3. Lấy thông tin User chi tiết để lưu tên/avatar
        try {
            const userRes = await userApi.getDetail(token);
            // userRes cũng đã được axiosClient xử lý, nó chính là data
            const userData = userRes.infor || userRes.data?.infor; 
            
            if (userData) {
                localStorage.setItem("user", JSON.stringify(userData));
            }
        } catch (error) {
            console.error("Lỗi lấy thông tin user:", error);
            // Fallback: Tạo user tạm để Header không lỗi nếu API detail hỏng
            localStorage.setItem("user", JSON.stringify({ email: email, fullName: "User" }));
        }

        setMessage("Đăng nhập thành công!");

        // 4. Chuyển hướng & Reload trang chủ
        setTimeout(() => {
           window.location.href = "/"; 
        }, 500);

      } else {
        setMessage(data.message || "Đăng nhập thất bại");
      }

    } catch (err) {
      console.error(err);
      setMessage(
        err.response?.data?.message || "Email hoặc mật khẩu không đúng!"
      );
    } finally {
        setLoading(false);
    }
  };
  
  return (
    <div className="w-full min-h-screen bg-[#0e1217] flex justify-center items-center px-4 py-10">
      <div className="max-w-4xl w-full flex bg-[#1a1f25] rounded-2xl overflow-hidden shadow-2xl border border-gray-700">
        
        {/* Ảnh bên trái */}
        <div className="hidden md:block w-1/2 bg-cover bg-center relative" style={{backgroundImage: "url('/Frontend/Images/Home/hero.jpg')"}}>
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <h2 className="text-4xl text-white font-bold tracking-widest drop-shadow-md">EZTRIP</h2>
            </div>
        </div>

        {/* Form bên phải */}
        <div className="w-full md:w-1/2 p-8 md:p-12 text-white">
          <h2 className="text-3xl font-bold text-center mb-8 text-green-400 uppercase">Đăng Nhập</h2>

          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="relative">
              <FaUser className="absolute left-3 top-4 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#121212] text-white rounded-lg border border-gray-600 focus:border-green-500 focus:outline-none transition placeholder-gray-500"
              />
            </div>

            <div className="relative">
              <FaLock className="absolute left-3 top-4 text-gray-400" />
              <input
                type="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#121212] text-white rounded-lg border border-gray-600 focus:border-green-500 focus:outline-none transition placeholder-gray-500"
              />
            </div>

            <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 font-bold rounded-lg transition transform active:scale-95 text-white
                    ${loading ? "bg-gray-600 cursor-not-allowed" : "bg-green-600 hover:bg-green-500"}`}
            >
                {loading ? "ĐANG XỬ LÝ..." : "ĐĂNG NHẬP"}
            </button>

            {message && (
              <div className={`text-center text-sm p-2 rounded ${message.includes("thành công") ? "bg-green-900/30 text-green-400" : "bg-red-900/30 text-red-400"}`}>
                {message}
              </div>
            )}
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm mb-4">Hoặc đăng nhập bằng</p>
            <div className="flex justify-center gap-4">
              <button className="bg-[#1877F2] p-3 rounded-full hover:opacity-90 transition text-white"><FaFacebookF /></button>
              <button className="bg-white text-red-600 p-3 rounded-full hover:opacity-90 transition"><FaGoogle /></button>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-gray-400">
            Bạn chưa có tài khoản? <Link to="/register" className="text-green-400 hover:underline font-semibold ml-1">Đăng ký ngay</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;