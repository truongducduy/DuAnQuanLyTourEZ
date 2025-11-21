const Cart = require("../../models/cart.model");
const Tour = require("../../models/tour.model");
const tourHelper = require("../../helper/tours");

// [POST] /api/v1/carts/add/:tour_id
module.exports.addPost = async (req, res) => {
    const tourId = req.params.tour_id;
    const { timeDepart, quantity } = req.body;
    const cartId = req.cart.id;

    if (!quantity || quantity <= 0 || new Date(timeDepart) < Date.now()) {
        return res.status(400).json({
            code: 400,
            message: "Số lượng hoặc thời gian khởi hành không hợp lệ"
        });
    }

    const cart = await Cart.findOne({
        _id: cartId
    });
    const tour = await Tour.findOne({ _id: tourId });

    if (!tour) {
        return res.json({
            code: 404,
            message: "Không tìm thấy tour"
        });
    }

    const tourTime = tour.timeStarts.find(item =>
        new Date(item.timeDepart).getTime() === new Date(timeDepart).getTime() &&
        new Date(item.timeDepart) >= Date.now()
    );

    if (!tourTime) {
        return res.json({
            code: 400,
            message: "Thời gian khởi hành không hợp lệ"
        });
    }
    if (quantity > tourTime.stock) {
        return res.json({
            code: 400,
            message: "Số lượng tour vượt quá số lượng còn lại"
        });
    }

    const existTourInCart = cart.tours.find(item => {
        const matchingTime = item.timeStarts.find(t =>
            new Date(t.timeDepart).getTime() === new Date(timeDepart).getTime()
        );
        return item.tour_id.toString() === tourId && matchingTime;
    });

    let updatedCart;

    if (existTourInCart) {
        const existTime = existTourInCart.timeStarts.find(item =>
            new Date(item.timeDepart).getTime() === new Date(timeDepart).getTime());
        const quantityNew = existTime.stock + quantity;

        if (quantityNew > tourTime.stock) {
            return res.json({
                code: 400,
                message: "Số lượng tour trong giỏ hàng vượt quá số lượng tour đang có"
            });
        }

        updatedCart = await Cart.findOneAndUpdate(
            {
                _id: cartId,
                "tours.tour_id": tourId,
                "tours.timeStarts.timeDepart": new Date(timeDepart)
            },
            {
                $set: {
                    "tours.$[tour].timeStarts.$[time].stock": quantityNew
                }
            },
            {
                arrayFilters: [
                    { "tour.tour_id": tourId },
                    { "time.timeDepart": new Date(timeDepart) }
                ],
                new: true
            }
        );

        return res.json({
            code: 200,
            message: "Thêm tour vào giỏ hàng thành công",
            data: updatedCart
        });
    } else {
        const newTourInCart = {
            tour_id: tourId,
            timeStarts: [{ timeDepart: new Date(timeDepart), stock: quantity }]
        };

        updatedCart = await Cart.findOneAndUpdate(
            { _id: cartId },
            { $push: { tours: newTourInCart } },
            { new: true }
        );

        return res.json({
            code: 200,
            message: "Thêm tour vào giỏ hàng thành công",
            data: updatedCart
        });
    }
}


// [GET] /api/v1/carts/
module.exports.index = async (req, res) => {
    const userId = req.user._id;

    const cart = await Cart.findOne({ user_id: userId });

    if (!cart) {
        return res.json({
            code: 400,
            message: "Giỏ hàng không tồn tại"
        });
    }

    const processedCart = {
        _id: cart._id,
        user_id: cart.user_id,
        tours: [],
        totalPrice: 0
    };

    // Xử lý tours
    for (const item of cart.tours) {
        const tourInfo = await Tour.findById(item.tour_id).select("-timeStarts");
        if (!tourInfo) continue;

        const priceNew = tourHelper.priceNewTour(tourInfo);
        const tourProcessed = {
            tour_id: item.tour_id,
            tourInfo,
            priceNew,
            timeStarts: []
        };

        for (const timeStart of item.timeStarts) {
            const totalPrice = timeStart.stock * parseInt(priceNew);

            tourProcessed.timeStarts.push({
                timeDepart: timeStart.timeDepart,
                quantity: timeStart.stock,
                totalPrice
            });

            processedCart.totalPrice += totalPrice;
        }

        if (tourProcessed.timeStarts.length > 0) {
            processedCart.tours.push(tourProcessed);
        }
    }

}

// [PATCH] /api/v1/carts/delete/:tour_id
module.exports.delete = async (req, res) => {
    const cartId = req.cart.id;
    const tourId = req.params.tour_id;

    const data = await Cart.findOneAndUpdate({
        _id: cartId
    }, {
        "$pull": { tours: { "tour_id": tourId } }
    }, { new: true });

    res.json({
        code: 200,
        message: "Xóa tour khỏi giỏ hàng thành công",
        data: data
    });

}


// [PATCH] /api/v1/carts/update/:tour_id/:timeDepart?quantity=
module.exports.update = async (req, res) => {
    const tourId = req.params.tour_id;
    const quantity = req.query.quantity;
    const cartId = req.cart.id;
    const timeDepart = new Date(req.params.timeDepart);


    if (!quantity || quantity <= 0 || new Date(timeDepart) < Date.now()) {
        return res.status(400).json({
            code: 400,
            message: "Số lượng hoặc thời gian khởi hành không hợp lệ"
        });
    }

    const cart = await Cart.findOne({
        _id: cartId
    });
    const tour = await Tour.findOne({ _id: tourId });

    if (!tour) {
        return res.json({
            code: 404,
            message: "Không tìm thấy tour"
        });
    }

    const tourTime = tour.timeStarts.find(item =>
        new Date(item.timeDepart).getTime() === new Date(timeDepart).getTime() &&
        new Date(item.timeDepart) >= Date.now()
    );

    if (!tourTime) {
        return res.json({
            code: 400,
            message: "Thời gian khởi hành không hợp lệ"
        });
    }
    if (quantity > tourTime.stock) {
        return res.json({
            code: 400,
            message: "Số lượng tour vượt quá số lượng còn lại"
        });
    }

    const existTourInCart = cart.tours.find(item => {
        const matchingTime = item.timeStarts.find(t =>
            new Date(t.timeDepart).getTime() === new Date(timeDepart).getTime()
        );
        return item.tour_id.toString() === tourId && matchingTime;
    });

    let updatedCart;

    if (existTourInCart) {
        updatedCart = await Cart.findOneAndUpdate(
            {
                _id: cartId,
                "tours.tour_id": tourId,
                "tours.timeStarts.timeDepart": new Date(timeDepart)
            },
            {
                $set: {
                    "tours.$[tour].timeStarts.$[time].stock": quantity
                }
            },
            {
                arrayFilters: [
                    { "tour.tour_id": tourId },
                    { "time.timeDepart": new Date(timeDepart) }
                ],
                new: true
            }
        );

        return res.json({
            code: 200,
            message: "Thêm tour vào giỏ hàng thành công",
            data: updatedCart
        });
    }
}