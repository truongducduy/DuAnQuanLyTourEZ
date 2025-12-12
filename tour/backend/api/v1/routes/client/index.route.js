const homeRoute = require("./home.route");
const userRoute = require("./user.route");
const categoryRoute = require("./category.route");
const tourRoute = require("./tour.route");
const cartRoute = require("./cart.route");
const searchRoute = require("./search.route");
const settingRoute = require("./setting.route");

const settingGeneralMiddleware = require("../../middlewares/client/setting.middleware");

module.exports = (app) => {

    const version = "/api/v1";

    app.use(settingGeneralMiddleware.settingGeneral)

    app.use(version + '/', homeRoute);
    app.use(version + '/users', userRoute);
    app.use(version + '/categories', categoryRoute);
    app.use(version + '/tours', tourRoute);
    app.use(version + '/carts', cartRoute);
    app.use(version + '/search', searchRoute);
    app.use(version + '/setting', settingRoute);
}