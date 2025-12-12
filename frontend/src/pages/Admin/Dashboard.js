import React from "react";


const Dashboard = () => {
    return (
        <div className="dashboard-wrapper">

            {/* --- 4 khối thống kê --- */}
            <div className="stats-grid">
                <div className="stat-box green">
                    <h3>Tổng số tours đang hoạt động</h3>
                    <p>1</p>
                </div>

                <div className="stat-box blue">
                    <h3>Tổng số lượt booking</h3>
                    <p>0</p>
                </div>

                <div className="stat-box teal">
                    <h3>Số người dùng đăng ký</h3>
                    <p>2,500</p>
                </div>

                <div className="stat-box red">
                    <h3>Tổng doanh thu</h3>
                    <p>1.450.000 vnđ</p>
                </div>
            </div>

            {/* --- 2 biểu đồ --- */}
            <div className="chart-grid">
                <div className="chart-box">Biểu đồ 1</div>
                <div className="chart-box">Biểu đồ 2</div>
            </div>

            {/* --- Bảng thống kê --- */}
            <div className="table-box">
                <h3>Tours được đặt nhiều nhất</h3>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tên</th>
                            <th>Số chỗ đã đặt</th>
                            <th>Số chỗ còn trống</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>10</td>
                            <td>Đà Nẵng</td>
                            <td>2</td>
                            <td>8</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default Dashboard;
