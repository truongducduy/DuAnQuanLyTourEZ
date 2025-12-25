import React, { useState } from "react";
import { FaUser, FaLock, FaEnvelope, FaPhone } from "react-icons/fa"; // Thêm icon phone
import { userApi } from "../api/userApi";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [fullName, setFullName] = useState("");          
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState(""); // Thêm trường phone khớp với backend
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      setMessage("Mật khẩu nhập lại không khớp!");
      return;
    }
    
    setLoading(true);
    setMessage("");

    try {
      // Backend cần: fullName, email, password, phone, avatar (optional)
      const res = await userApi.register({ 
          fullName, 
          email, 
          password, 
          phone 
      }); 
    
      // Backend trả về code: 200
      if (res.data.code === 200) {
        setMessage("Đăng ký thành công! Đang chuyển hướng...");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        setMessage(res.data.message || "Đăng ký thất bại!");
      }
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Đăng ký thất bại, vui lòng thử lại!");
    } finally {
        setLoading(false);
    }
  };
  
  return (
    <div className="w-full min-h-screen bg-[#0e1217] flex justify-center items-center px-4 py-10">
      <div className="max-w-4xl w-full flex bg-[#1a1f25] rounded-2xl overflow-hidden shadow-2xl border border-gray-700">
        
        {/* Ảnh bên trái */}
        <div className="hidden md:block w-1/2 bg-cover bg-center" style={{backgroundImage: "url('/Frontend/Images/Home/hero.jpg')"}}>
            <div className="h-full w-full bg-black/50 flex items-center justify-center">
                <div className="text-center p-6">
                    <h2 className="text-3xl text-white font-bold tracking-widest mb-2">EZTRIP</h2>
                    <p className="text-gray-300">Khám phá Việt Nam theo cách riêng của bạn</p>
                </div>
            </div>
        </div>

        {/* Form bên phải */}
        <div className="w-full md:w-1/2 p-8 md:p-12 text-white">
          <h2 className="text-3xl font-bold text-center mb-6 text-green-400">ĐĂNG KÝ</h2>

          <form className="space-y-4" onSubmit={handleRegister}>
            <div className="relative">
              <FaUser className="absolute left-3 top-4 text-gray-400" />
              <input
                type="text"
                placeholder="Họ và tên"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 bg-[#121212] text-white rounded-lg border border-gray-600 focus:border-green-500 focus:outline-none transition"
              />
            </div>

            <div className="relative">
              <FaEnvelope className="absolute left-3 top-4 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 bg-[#121212] text-white rounded-lg border border-gray-600 focus:border-green-500 focus:outline-none transition"
              />
            </div>

            <div className="relative">
              <FaPhone className="absolute left-3 top-4 text-gray-400" />
              <input
                type="text"
                placeholder="Số điện thoại"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 bg-[#121212] text-white rounded-lg border border-gray-600 focus:border-green-500 focus:outline-none transition"
              />
            </div>

            <div className="relative">
              <FaLock className="absolute left-3 top-4 text-gray-400" />
              <input
                type="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 bg-[#121212] text-white rounded-lg border border-gray-600 focus:border-green-500 focus:outline-none transition"
              />
            </div>

            <div className="relative">
              <FaLock className="absolute left-3 top-4 text-gray-400" />
              <input
                type="password"
                placeholder="Nhập lại mật khẩu"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 bg-[#121212] text-white rounded-lg border border-gray-600 focus:border-green-500 focus:outline-none transition"
              />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg transition transform active:scale-95 mt-4"
            >
                {loading ? "Đang xử lý..." : "ĐĂNG KÝ"}
            </button>

            {message && (
              <p className={`text-center text-sm ${message.includes("thành công") ? "text-green-400" : "text-red-400"}`}>
                {message}
              </p>
            )}
          </form>

          <div className="mt-6 text-center text-sm text-gray-400">
            Bạn đã có tài khoản? <Link to="/login" className="text-green-400 hover:underline">Đăng nhập ngay</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;