import './App.css';
import { Routes, Route } from 'react-router-dom';

import Header from './Layout/Header';
import Footer from './Layout/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

import AdminDashboard from './pages/AdminDashboard';
import AdminLayout from './Layout/AdminLayout';

function App() {
  return (
    <div className="App">

      <Header />

      <section style={{ minHeight: "80vh" }}>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ADMIN LAYOUT KHÔNG DÙNG HEADER FOOTER */}
          <Route 
            path="/admindashboard" 
            element={
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            } 
          />
        </Routes>
      </section>

      <Footer />

    </div>
  );
}

export default App;
