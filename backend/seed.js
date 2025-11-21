// seed.js
const mongoose = require('mongoose');
require('dotenv').config();

const Account = require('./api/v1/models/account.model');
const User = require('./api/v1/models/user.model');
const Role = require('./api/v1/models/role.model');
const Category = require('./api/v1/models/category.model');
const Tour = require('./api/v1/models/tour.model');
const Cart = require('./api/v1/models/cart.model');
const SettingGeneral = require('./api/v1/models/settings-general.model');
const ForgotPassword = require('./api/v1/models/forgot-password.model');

async function seed() {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");

    // 1. Roles
    const roles = [
        { title: "Admin", description: "Quyền quản trị toàn bộ hệ thống", permissions: ["tour_view","tour_create","tour_edit","tour_delete"] },
        { title: "User", description: "Người dùng bình thường", permissions: [] }
    ];
    await Role.deleteMany({});
    const insertedRoles = await Role.insertMany(roles);
    console.log("Roles seeded");

    // 2. Accounts (Admin)
    await Account.deleteMany({});
    await Account.create({
        fullName: "Admin Test",
        email: "admin@example.com",
        password: "admin123", // hash nếu cần
        phone: "0123456789",
        role_id: insertedRoles[0]._id.toString(),
        status: "active",
        avatar: "",
    });
    console.log("Admin account seeded");

    // 3. Users
    await User.deleteMany({});
    await User.create([
        { fullName: "Nguyen Van A", email: "a@example.com", password: "user123", phone: "0987654321" },
        { fullName: "Tran Thi B", email: "b@example.com", password: "user123", phone: "0987654322" },
    ]);
    console.log("Users seeded");

    // 4. Categories
   await Category.deleteMany({});

const cat1 = await Category.create({
    title: "Du lịch biển",
    image: "",
    description: "Tour biển tuyệt vời"
});

const cat2 = await Category.create({
    title: "Du lịch núi",
    image: "",
    description: "Tour leo núi và trekking"
});

    // 5. Tours
    await Tour.deleteMany({});
    await Tour.insertMany([
        {
            title: "Tour Hà Nội – Hạ Long 3 ngày",
            code: "T001",
            price: 2000000,
            discount: 200000,
            stock: 10,
            category_id: Category[0]._id.toString(),
            timeStarts: [
                { timeDepart: new Date("2025-12-25"), stock: 10 },
                { timeDepart: new Date("2026-01-05"), stock: 15 }
            ],
            gathering: "Hà Nội",
            status: "active",
            images: [],
            information: "Tour khám phá Hạ Long 3 ngày 2 đêm",
            schedule: "Ngày 1: Hà Nội – Hạ Long\nNgày 2: Hạ Long – Vịnh Lan Hạ\nNgày 3: Hạ Long – Hà Nội"
        },
        {
            title: "Tour Đà Nẵng – Hội An 4 ngày",
            code: "T002",
            price: 3000000,
            discount: 300000,
            stock: 20,
            category_id: categories[1]._id.toString(),
            timeStarts: [
                { timeDepart: new Date("2025-12-30"), stock: 20 }
            ],
            gathering: "Hà Nội",
            status: "active",
            images: [],
            information: "Tour Đà Nẵng – Hội An 4 ngày 3 đêm",
            schedule: "Ngày 1: Hà Nội – Đà Nẵng\nNgày 2: Đà Nẵng – Hội An\nNgày 3: Bà Nà Hills\nNgày 4: Đà Nẵng – Hà Nội"
        }
    ]);
    console.log("Tours seeded");

    // 6. Carts (trống)
    await Cart.deleteMany({});
    console.log("Carts cleared");

    // 7. Settings
    await SettingGeneral.deleteMany({});
    await SettingGeneral.create({
        websiteName: "QLTour",
        logo: "",
        phone: "0123456789",
        email: "info@qltour.com",
        address: "Hà Nội",
        imageSliders: [],
        slogan: "Khám phá thế giới",
        copyright: "QLTour © 2025"
    });
    console.log("Settings seeded");

    // 8. ForgotPasswords (trống)
    await ForgotPassword.deleteMany({});
    console.log("ForgotPassword cleared");

    console.log("✅ Seeding completed");
    process.exit();
}

seed().catch(err => {
    console.error(err);
    process.exit(1);
});
