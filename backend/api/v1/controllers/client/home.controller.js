const Tour = require("../../models/tour.model");
// const Order = require("../../models/order.model");

// [GET]/api/v1/
module.exports.index = async (req, res) => {
    // top tours
    const topSallers = await Tour.find({
        status: "active",
        deleted: false
    }).sort({ sold: "desc" }).limit(6);

    // new tours
    const newTours = await Tour.find({
        status: "active",
        deleted: false
    }).sort({ createdAt: -1 }).limit(6);

   
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    await Tour.updateMany(
        {},
        {
            $pull: {
                timeStarts: {
                    timeDepart: { $lt: today }
                }
            }
        }
    );

    res.json({
        newTours: newTours,
    });
};