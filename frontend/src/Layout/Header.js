import React from 'react';
import { FaSearch, FaUser, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";


const Header = () => {

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    let user = null;
    try {
        const storedUser = localStorage.getItem("user");
        user = storedUser ? JSON.parse(storedUser) : null;
    } catch {
        user = null;
  }
      
    return (
        <>
            
            <header className="header">
                <div className="container header-content">
                    <div className="logo">
                        
                        <a href="#">
                            <img src="/Frontend/Images/Home/logo.jpg" alt="EZTRIP Logo" className="logo-image" />
                            <span className="logo-text">EZTRIP</span>
                        </a>
                    </div>
                    <ul className="nav-links">
                        <li className="active"><a href="#">TRANG CHỦ</a></li>
                        <li><a href="#">GIỚI THIỆU</a></li>
                        <li className="dropdown">
                            <a href="#">TOUR </a>
                        </li>
                        <li><a href="#">ĐIỂM ĐẾN</a></li>
                        <li><a href="#">LIÊN HỆ</a></li>
                    </ul>
                    <div className="nav-icons">
  <FaSearch className="search-icon" />

                {!token ? (
                    // CHƯA LOGIN
                        <button
                            className="btn book-now-btn"
                            onClick={() => navigate("/login")}
                        >
                        BOOK NOW <FaUser className="user-icon-small" />
                        </button>
                    ) : (
                    // ĐÃ LOGIN
                        <div
                            className="user-avatar"
                            title={user?.name || user?.email}
                        >
                    {/* ICON TRÒN */}
                        <FaUserCircle size={36} />

                    </div>
                )}
            </div>

                </div>
            </header>
        </>
    );
};

export default Header;