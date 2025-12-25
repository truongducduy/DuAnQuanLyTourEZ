import React, { useEffect, useState } from 'react';
import { FaSearch, FaUser, FaUserCircle, FaSignOutAlt, FaHistory } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { getAllCategories } from '../api/tourApi'; 
import { userApi } from '../api/userApi';
const Header = () => {
  const navigate = useNavigate();
  
  // --- STATE ---
  // 1. State cho Danh mục Tour
  const [categories, setCategories] = useState([]);
  const [openMenu, setOpenMenu] = useState(false); 

  // 2. State cho User
  const [user, setUser] = useState(null);
  const [openUserMenu, setOpenUserMenu] = useState(false); 

  // --- EFFECT ---
  // 1. Lấy danh mục Tour từ API
  useEffect(() => {
    const fetchCats = async () => {
      try {
        const data = await getAllCategories();
        setCategories(Array.isArray(data) ? data : []); 
      } catch (error) {
        console.error("Lỗi tải danh mục:", error);
      }
    };
    fetchCats();
  }, []);

  // 2. Kiểm tra đăng nhập từ LocalStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    
    if (token && storedUser) {
        try {
            setUser(JSON.parse(storedUser));
        } catch (error) {
            setUser(null);
        }
    }
  }, []);

  // --- HANDLERS ---
  const handleLogout = async () => {
    try {
        await userApi.logout(); 
    } catch (error) {
        console.log("Logout error ignored");
    }
    // Xóa data client
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cartId");
    
    setUser(null);
    setOpenUserMenu(false);
    window.location.href = "/login";
  };

  return (
    <header className="header sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
      <div className="container header-content flex justify-between items-center py-4">
        {/* LOGO */}
        <Link to="/">
          <div className="logo flex items-center gap-2">
             <img src="/Frontend/Images/Home/logo.jpg" alt="EZTRIP" className="h-10 w-10 rounded-full object-cover" />
             <span className="text-xl font-bold text-white tracking-widest">EZTRIP</span>
          </div>
        </Link>

        {/* MENU GIỮA */}
        <ul className="nav-links flex gap-6 text-white text-sm font-semibold">
          <li><Link to="/" className="hover:text-green-400 transition">TRANG CHỦ</Link></li>
          
          {/* Dropdown Menu Tour */}
          <li className="relative group">
            <span 
                className="cursor-pointer hover:text-green-400 flex items-center gap-1"
                onClick={() => setOpenMenu(!openMenu)}
            >
                TOUR
            </span>
            {/* Logic hiển thị menu dropdown */}
            <ul className={`absolute top-full left-0 mt-2 w-56 bg-[#1a1a22] shadow-xl rounded-lg py-2 transition-all duration-200 ${openMenu ? "block" : "hidden group-hover:block"}`}>
                {categories.map(cat => (
                    <li key={cat._id}>
                        <Link 
                            to={`/tours/${cat.slug}`} 
                            className="block px-4 py-2 hover:bg-green-500 hover:text-black transition text-white"
                            onClick={() => setOpenMenu(false)}
                        >
                            {cat.title}
                        </Link>
                    </li>
                ))}
            </ul>
          </li>

          <li><Link to="/contact" className="hover:text-green-400 transition">LIÊN HỆ</Link></li>
        </ul>

        {/* ICON BÊN PHẢI */}
        <div className="nav-icons flex gap-4 items-center">
          <Link to="/search"><FaSearch className="text-white hover:text-green-400 cursor-pointer" /></Link>
          
          {!user ? (
            // Chưa đăng nhập
            <button 
                onClick={() => navigate("/login")}
                className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-full font-bold text-xs flex items-center gap-2 transition"
            >
                BOOK NOW <FaUser />
            </button>
          ) : (
            // Đã đăng nhập
            <div className="relative">
                <div 
                    className="flex items-center gap-2 cursor-pointer text-white hover:text-green-400 transition select-none"
                    onClick={() => setOpenUserMenu(!openUserMenu)}
                >
                    <span className="font-bold hidden md:block max-w-[100px] truncate text-sm">
                        {user.fullName || "User"}
                    </span>
                    {user.avatar ? (
                        <img src={user.avatar} alt="Avatar" className="w-9 h-9 rounded-full border border-gray-500 object-cover" />
                    ) : (
                        <FaUserCircle size={32} />
                    )}
                </div>

                {/* User Dropdown */}
                {openUserMenu && (
                    <div className="absolute right-0 mt-3 w-48 bg-[#1a1a22] border border-gray-700 rounded-lg shadow-xl overflow-hidden z-50">
                        <ul className="text-sm text-gray-200">
                            <li className="border-b border-gray-700">
                                <div className="px-4 py-3">
                                    <p className="text-xs text-gray-400">Xin chào,</p>
                                    <p className="font-bold truncate">{user.fullName}</p>
                                </div>
                            </li>
                            <li>
                                <Link to="/orders" className="block px-4 py-2 hover:bg-gray-700 flex items-center gap-2">
                                    <FaHistory className="text-yellow-400"/> Đơn hàng
                                </Link>
                            </li>
                            <li className="border-t border-gray-700">
                                <button 
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 hover:bg-red-900/30 text-red-400 flex items-center gap-2 transition"
                                >
                                    <FaSignOutAlt /> Đăng xuất
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;