import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAccountDetail, updateAccount } from "./AccountService";

const AccountEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [account, setAccount] = useState({
        fullName: "",
        email: "",
        phone: "",
        avatar: "",
        status: "active",
        role: ""
    });

    useEffect(() => {
        const fetchAccount = async () => {
            try {
                const res = await getAccountDetail(id);
                setAccount(res.data.account || res.data);
            } catch (err) {
                alert("Không tìm thấy tài khoản");
                navigate("/admin/accounts");
            } finally {
                setLoading(false);
            }
        };

        fetchAccount();
    }, [id, navigate]);

    if (loading) return <p>Đang tải dữ liệu...</p>;

    const handleSubmit = async (e) => {
        e.preventDefault();

        await updateAccount(id, {
            fullName: account.fullName,
            phone: account.phone,
            avatar: account.avatar,
            status: account.status,
            role: account.role
        });

        alert("Cập nhật thành công");
        navigate("/admin/accounts");
    };

    return (
        <div className="admin-main">
    <div className="form-center-wrapper">
        <div className="tour-card form-card">
            <h2 className="card-title" style={{ textAlign: "center" }}>
                Sửa tài khoản
            </h2>

            <p className="card-desc" style={{ textAlign: "center" }}>
                Cập nhật thông tin người dùng trong hệ thống
            </p>

            <form onSubmit={handleSubmit} className="account-form">
                {/* Họ tên */}
                <div className="form-row">
                    <label>Họ tên</label>
                    <input
                        className="dark-input"
                        type="text"
                        value={account.fullName}
                        onChange={(e) =>
                            setAccount({ ...account, fullName: e.target.value })
                        }
                        required
                    />
                </div>

                {/* Email */}
                <div className="form-row">
                    <label>Email</label>
                    <input
                        className="dark-input"
                        type="email"
                        value={account.email}
                        disabled
                    />
                </div>

                {/* Phone */}
                <div className="form-row">
                    <label>Số điện thoại</label>
                    <input
                        className="dark-input"
                        type="text"
                        value={account.phone}
                        onChange={(e) =>
                            setAccount({ ...account, phone: e.target.value })
                        }
                    />
                </div>

                {/* Avatar */}
                <div className="form-row">
                    <label>Avatar (URL)</label>
                    <input
                        className="dark-input"
                        type="text"
                        value={account.avatar}
                        onChange={(e) =>
                            setAccount({ ...account, avatar: e.target.value })
                        }
                    />
                </div>

                {/* Status */}
                <div className="form-row">
                    <label>Trạng thái</label>
                    <select
                        className="dark-input"
                        value={account.status}
                        onChange={(e) =>
                            setAccount({ ...account, status: e.target.value })
                        }
                    >
                        <option value="active">Hoạt động</option>
                        <option value="inactive">Khóa</option>
                    </select>
                </div>

                {/* Role */}
                <div className="form-row">
                    <label>Quyền</label>
                    <select
                        className="dark-input"
                        value={account.role}
                        onChange={(e) =>
                            setAccount({ ...account, role: e.target.value })
                        }
                    >
                        <option value="">-- Chọn quyền --</option>
                        <option value="admin">Admin</option>
                        <option value="staff">Nhân viên</option>
                        <option value="user">Người dùng</option>
                    </select>
                </div>

                {/* Buttons */}
                <div className="form-actions">
                    <button type="submit" className="btn-primary">
                        Lưu
                    </button>
                    <button
                        type="button"
                        className="btn-secondary"
                        onClick={() => navigate("/admin/accounts")}
                    >
                        Hủy
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>

    );
};

export default AccountEdit;
