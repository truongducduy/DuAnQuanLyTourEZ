import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const res = await axios.post("http://localhost:8080/api/v1/admin/accounts/login", {
            email,
            password
        });

        if (res.data.code === 200) {

            // ⭐ In ra thông tin nhận từ API khi đăng nhập đúng
            console.log("Đăng nhập thành công:", res.data);

            localStorage.setItem("token", res.data.token);

            navigate("/admin");
        } else {
            setError(res.data.message);
        }
    } catch (err) {
        console.log("Lỗi API:", err.response?.data);
        setError(err.response?.data?.message || "Lỗi server");
    }
};


    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Đăng nhập</h2>

                {error && <p className="error-msg">{error}</p>}

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit">Đăng nhập</button>
                </form>

                <p className="auth-switch">
                    Chưa có tài khoản? <Link to="/admin/register">Đăng ký</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
