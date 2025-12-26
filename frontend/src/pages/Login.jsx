import React, { useState } from "react";
import { FaUser, FaLock, FaFacebookF, FaGoogle } from "react-icons/fa";
import { userApi } from "../api/userApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const Login = () => {

  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
  e.preventDefault();

  if (!email || !password) {
    setMessage("Vui lòng nhập đầy đủ email và mật khẩu");
    return;
  }

  try {
    const res = await userApi.login({ email, password });
    console.log("LOGIN RESPONSE:", res.data);

    // ✅ Chuẩn hoá data backend
    const data = res.data.data || res.data;

    if (!data.token) {
      throw new Error("Backend không trả token");
    }

    // ✅ DÙNG AUTH CONTEXT
    login(data.user, data.token);

    setMessage("Đăng nhập thành công!");

    // 👉 Điều hướng NGAY
    navigate("/");
  } catch (err) {
    console.error(err);

    setMessage(
      err.response?.data?.message ||
      err.message ||
      "Email hoặc mật khẩu không đúng"
    );
  }
};

  
  return (
    <div className="w-full bg-mainbg flex justify-center px-4 pt-32 pb-22">
      <div className="max-w-5xl w-full flex flex-col md:flex-row items-center gap-10">

        <div className="w-full md:w-1/2 flex justify-center -mt-16 pt-10">
          <img
            src="/images/login.jpg"
            alt="login"
            className="w-[350px] md:w-[380px] lg:w-[420px] object-contain"
          />
        </div>

        <div className="w-full md:w-1/3 text-white -mt-20">
          <h2 className="text-3xl font-bold text-center -mt-10 mb-20 tracking-wide">
            ĐĂNG NHẬP
          </h2>

          <form className="space-y-6 -mt-10" onSubmit={handleLogin}>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-black opacity-60" />
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

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="px-6 py-2 bg-btnColor text-white font-bold rounded-md hover:bg-btnHover transition"
              >
                ĐĂNG NHẬP
              </button>
              <a href="#" className="text-sm text-white hover:underline">
                Quên mật khẩu
              </a>
            </div>

            {message && (
              <p className="text-center mt-2 text-yellow-400">
                {message}
              </p>
            )}
          </form>

          <div className="mt-6 text-center">
            <p className="mb-3 text-sm opacity-90">Đăng nhập bằng</p>
            <div className="flex items-center justify-center gap-4">
              <button className="bg-[#1877F2] text-white p-2 rounded-full hover:opacity-90">
                <FaFacebookF size={18} />
              </button>
              <button className="bg-white text-red-600 p-2 rounded-full hover:opacity-90">
                <FaGoogle size={20} />
              </button>
            </div>
          </div>

          <div className="mt-10 flex items-center justify-between text-sm opacity-90">
            <p>Bạn chưa có tài khoản?</p>
            <a href="/register" className="hover:underline">
              Tạo tài khoản
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
