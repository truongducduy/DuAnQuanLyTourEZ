const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user_id: String,
    tours: [
        {
            tour_id: String,
            timeStarts: [
                {
                    timeDepart: Date,
                    stock: Number,
                }
            ]
        }
    ]
}, {
    timestamps: true
});
const Cart = mongoose.model("Cart", cartSchema, "carts");

module.exports = Cart;