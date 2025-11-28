import React from 'react';
import { FaSearch, FaUser, FaCaretDown } from 'react-icons/fa';

const Header = () => {
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
                        <button className="btn book-now-btn">BOOK NOW <FaUser className="user-icon-small" /></button>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;