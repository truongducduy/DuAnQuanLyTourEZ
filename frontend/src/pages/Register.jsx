import React, { useState } from "react";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { userApi } from "../api/userApi"; // đường dẫn đúng tới userApi.js
import { useNavigate } from "react-router-dom";


const Register = () => {
  const [fullName, setFullName] = useState("");           
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      setMessage("Mật khẩu không khớp!");
      return;
    }
  
    try {
      const res = await userApi.register({ fullName, email, password, confirmPassword });
    
      if (res.data.code === 200) {
        setMessage("Đăng ký thành công! Đang chuyển sang đăng nhập...");
    
        // Chờ 1 chút cho user đọc message
        setTimeout(() => {
          navigate("/login");
        }, 800);
      } else {
        setMessage(res.data.message || "Đăng ký thất bại!");
      }
    
      console.log(res.data);
    } catch (err) {
      if (err.response?.data?.errors) {
        setMessage(err.response.data.errors.join(" | "));
      } else if (err.response?.data?.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage("Đăng ký thất bại!");
      }
      console.error(err);
    }
    
  };
  

  return (
    <div className="w-full bg-mainbg flex justify-center px-4 pt-32 pb-22">
      <div className="max-w-5xl w-full flex flex-col md:flex-row items-center gap-10">
        <div className="w-full md:w-1/2 flex justify-center -mt-16 pt-10">
          <img
            src="/images/login.jpg"
            alt="register"
            className="w-[350px] md:w-[380px] lg:w-[420px] object-contain"
          />
        </div>

        <div className="w-full md:w-1/3 text-white mt-16">
          <h2 className="text-3xl font-bold text-center -mt-20 tracking-wide -translate-y-36">
            ĐĂNG KÝ
          </h2>

          <form className="space-y-6 -mt-28" onSubmit={handleRegister}>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-black opacity-60" />
              <input
                type="text"
                placeholder="Tên hiển thị"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white text-black rounded-md border-b-4 border-borderInt focus:outline-none"
              />
            </div>

            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-black opacity-60" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white text-black rounded-md border-b-4 border-borderInt focus:outline-none"
              />
            </div>

            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-black opacity-60" />
              <input
                type="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white text-black rounded-md border-b-4 border-borderInt focus:outline-none"
              />
            </div>

            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-black opacity-60" />
              <input
                type="password"
                placeholder="Nhập lại mật khẩu"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white text-black rounded-md border-b-4 border-borderInt focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-between">
              <button
              
                type="submit"
                className="px-6 py-2 bg-btnColor text-white font-bold rounded-md hover:bg-btnHover transition" 
              >
                ĐĂNG KÝ
              </button>
            </div>

            {message && (
              <p className="text-center mt-2 text-yellow-400">{message}</p>
            )}
          </form>

          <div className="mt-10 flex items-center justify-between text-sm opacity-90 mt-8 ">
            <p>Bạn đã có tài khoản?</p>
            <a href="/login" className="hover:underline">
              Đăng nhập
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
