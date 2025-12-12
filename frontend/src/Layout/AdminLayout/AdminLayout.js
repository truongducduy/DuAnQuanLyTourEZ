import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

function AdminLayout() {
  return (
    <div className="admin-container">
      <Sidebar />

      <div className="admin-content">
        <Header />

        <main className="admin-main">
          <Outlet />   
        </main>
        
      </div>
    </div>
  );
}

export default AdminLayout;
