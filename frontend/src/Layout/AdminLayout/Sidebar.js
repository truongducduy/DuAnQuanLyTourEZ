import React from "react";
import { FaHome, FaUserShield, FaUsers, FaRoute, FaBook, FaEnvelope } from "react-icons/fa";

const Sidebar = () => {
    return (
        <aside className="admin-sidebar">
            <div className="admin-profile">
                <img 
                    src="/avatar.jpg" 
                    width="60" 
                    alt="avatar"
                />
                <p>Xin chào, <strong>Admin</strong></p>
            </div>

            <ul className="sidebar-menu">

                <li>
                    <a href="/admin/dashboard">
                        <FaHome className="menu-icon" /> Dashboard
                    </a>
                </li>

                <li>
                    <a href="/admin/accounts">
                        <FaUserShield className="menu-icon" /> Quản lý tài khoản
                    </a>
                </li>

                <li>
                    <a href="/admin/users-list">
                        <FaUsers className="menu-icon" /> Quản lý người dùng
                    </a>
                </li>

                <li>
                    <a href="/admin/tours">
                        <FaRoute className="menu-icon" /> Quản lý Tours
                    </a>
                </li>

                <li>
                    <a href="/admin/quan-ly-booking">
                        <FaBook className="menu-icon" /> Quản lý Booking
                    </a>
                </li>

                <li>
                    <a href="/admin/lien-he">
                        <FaEnvelope className="menu-icon" /> Liên hệ
                    </a>
                </li>

            </ul>
        </aside>
    );
};

export default Sidebar;
