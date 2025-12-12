
import React from "react";

import { FaBars, FaEnvelope, FaUserCircle, FaAngleDown } from 'react-icons/fa';

const Header = ({ toggleSidebar }) => { 
    return (
        <header className="admin-main-header">
            <div className="header-left">
                <button className="menu-toggle-btn" onClick={toggleSidebar}>
                    <FaBars />
                </button>
            </div>

            <div className="header-right">
                <div className="icon-item message-icon">
                    <FaEnvelope />
                </div>
                
                <div className="user-dropdown">
                    <div className="user-info-display">
                        <img 
                            src="/path/to/user-avatar.jpg" 
                            alt="User" 
                            className="user-avatar-header"
                        />
                        <span className="user-name">Admin</span>
                        <FaAngleDown className="dropdown-arrow" />
                    </div>

                </div>
            </div>
        </header>
    );
};

export default Header;