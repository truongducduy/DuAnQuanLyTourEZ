import './App.css';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

import AdminDashboard from './pages/AdminDashboard';
import AdminLayout from './Layout/AdminLayout';
import MainLayout from './Layout/MainLayout';

function App() {
  return (
    <div className="App">
      <Routes>

        {/* ===== USER + PUBLIC (CÓ HEADER & FOOTER) ===== */}
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />

        {/* ===== AUTH (KHÔNG HEADER) ===== */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/admindashboard"
          element={
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          }
        />

      </Routes>
    </div>
  );
}

export default App;
