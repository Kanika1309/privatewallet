const express = require('express');
const router = express.Router({ mergeParams: true });
const { isLoggedIn, validateDaily } = require('../middleware');
const { dailySchema } = require('../schemas.js');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const data = require('../controllers/data');

router.route('/')
    .get(isLoggedIn, catchAsync(data.renderDataForm))
    .post(isLoggedIn, validateDaily, catchAsync(data.createDaily));

//router.delete('/', isLoggedIn, isDailyAuthor, catchAsync(reviews.deleteReview));

module.exports = router;