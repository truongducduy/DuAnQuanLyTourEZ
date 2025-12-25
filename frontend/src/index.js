import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// --- IMPORT CÁC TRANG (PAGES) ---
import Home from './pages/Home';
import { TourDetail } from './pages/TourDetail';
import TourList from './Layout/TourList'; 
import SearchPage from './pages/SearchPage';
import Login from './pages/Login';           
import Register from './pages/Register';     
import CheckoutPage from './pages/CheckoutPage'; 

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          {/* 1. Trang chủ */}
          <Route index element={<Home />} />
          
          {/* 2. Các trang Tour */}
          <Route path="tour/:slugTour" element={<TourDetail />} />
          <Route path="tours/:slugCategory" element={<TourList />} />
          <Route path="search" element={<SearchPage />} />

          {}
          {}
          <Route path="login" element={<Login />} />
          
          {}
          <Route path="register" element={<Register />} />
          
          {}
          <Route path="checkout" element={<CheckoutPage />} />
          
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();