import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Họ tên:", name);
        console.log("Email:", email);
        console.log("Password:", password);

        navigate("/admin/login");
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Đăng ký tài khoản</h2>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Họ tên"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit">Đăng ký</button>
                </form>

                <p className="auth-switch">
                    Đã có tài khoản? <Link to="/admin/login">Đăng nhập</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
