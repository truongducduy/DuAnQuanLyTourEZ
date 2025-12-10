const express = require('express');
const router = express.Router();

const controller = require("../../controllers/client/tour.controller");

router.get('/detail/:slugTour', controller.detail);
router.get('/:slugCategory', controller.index);

module.exports = router;