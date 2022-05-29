const express = require('express');
const multer = require('multer');
const router = express.Router();
const passport = require('passport');
const { isLoggedIn, validateAccount } = require('../middleware');
const catchAsync = require('../utils/catchAsync');
const users = require('../controllers/users');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });


router.route('/')
    .get(users.renderAbout)

router.route('/register')
    .get(users.renderRegister)
    .post(upload.single('image'), catchAsync(users.register));

router.route('/login')
    .get(users.renderLogin)
    .post(users.matchFaceWithDataSet, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login);

router.get('/logout', users.logout);

router.route('/:id')
    .get(catchAsync(users.showAccount))
    .post(isLoggedIn, validateAccount, catchAsync(users.updateAccount))
    .delete(isLoggedIn, catchAsync(users.deleteAccount));

router.route('/:id/edit')
    .get(catchAsync(users.renderEditForm))

module.exports = router;