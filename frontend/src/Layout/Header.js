import React, { useEffect, useState} from 'react';
import { FaSearch, FaUser, FaCaretDown } from 'react-icons/fa';
import { Link } from 'react-router';
import Home from '../pages/Home';

const Header = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/v1/categories")
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setCategories(data);
            })
            .catch(err => console.error(err));
    }, []);
    return (
        <>
            
            <header className="header sticky top-0 z-50 ">
                <div className="container header-content">
                   <Link to="/">
                        <div className="logo">
                            
                            <a href="#">
                                <img src="/Frontend/Images/Home/logo.jpg" alt="EZTRIP Logo" className="logo-image" />
                                <span className="logo-text">EZTRIP</span>
                            </a>
                        </div>
                   </Link>
                    <ul className="nav-links">
                        <li className="active"><a href="/">TRANG CHỦ</a></li>
                        <li><a href="#">GIỚI THIỆU</a></li>
                        <li className="relative group">
                        <span className="cursor-pointer hover:text-yl-hover pt-1 inline-block">TOUR</span>

                        {/* MENU */}
                        <ul className="absolute left-0 mt-2 hidden group-hover:block bg-black shadow-lg rounded-lg w-48 py-2">
                            {categories.map(cat => (
                                <li key={cat._id}>
                                    <Link
                                        to={`/tours/${cat.slug}`}
                                        className="block px-4 py-2 hover:bg-gray-100"
                                    >
                                        {cat.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
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