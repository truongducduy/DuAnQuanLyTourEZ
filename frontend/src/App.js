import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import UserLayout from "./Layout/UserLayout/UserLayout";
import AdminLayout from "./Layout/AdminLayout/AdminLayout";

import Home from "./pages/User/Home";
import Dashboard from "./pages/Admin/Dashboard";
import Tours from "./pages/Admin/Tours";
import Accounts from "./pages/Admin/Accounts";
import UserList from "./pages/Admin/UserList";
import Login from "./pages/Admin/Login";
import Register from "./pages/Admin/Register";

import AdminPrivateRoute from "./Layout/AdminLayout/AdminPrivateRouter";

function App() {
  return (
    <Router>
      <Routes>

        {/* USER */}
        <Route element={<UserLayout />}>
          <Route path="/home" element={<Home />} />
        </Route>

        {/* AUTH */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/register" element={<Register />} />

        {/* ADMIN PRIVATE */}
       <Route element={<AdminPrivateRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="tours" element={<Tours />} />
          <Route path="accounts" element={<Accounts />} />
          <Route path="users-list" element={<UserList />} />
        </Route>
    </Route>


      </Routes>
    </Router>
  );
}

export default App;
