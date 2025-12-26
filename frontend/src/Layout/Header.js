import React from 'react';
import { FaSearch, FaUser, FaUserCircle } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";



const Header = () => {

    const navigate = useNavigate();

    const { user, token, logout } = useAuth();
  
    const [open, setOpen] = React.useState(false);

      
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
                            style={{ position: "relative" }}
                        >

                    {/* ICON TRÒN */}
                        <FaUserCircle 
                        size={36} 
                        style={{ cursor: "pointer" }}
                        title={user?.email}
                        onClick={() => setOpen(!open)}
                        />

                        {open && (
                            <div className="user-dropdown">
                            <p>
                            {user?.fullName || user?.email}
                                </p>
                            <button onClick={logout}>Logout</button>
                            </div>
                        )}

                    </div>
                )}
            </div>

                </div>
            </header>
        </>
    );
};

export default Header;