import { Navigate, Outlet } from "react-router-dom";

const AdminPrivateRoute = () => {
        const token = localStorage.getItem("token");


    if (!token) {
        return <Navigate to="/admin/login" replace />;
    }

    return <Outlet />;
};

export default AdminPrivateRoute;
