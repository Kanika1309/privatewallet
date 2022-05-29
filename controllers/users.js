const tensor = require("@tensorflow/tfjs-node");;
const path = require("path");
const fetch = require("node-fetch");
const faceapi = require("@vladmandic/face-api");
const AccountUser = require('../models/user');
const canvas = require("canvas");
const passport = require('passport');

const { Canvas, Image, ImageData } = canvas;
faceapi.env.monkeyPatch({ Canvas, Image, fetch: fetch });

const MODEL_URL = path.join(__dirname, '/../public/models');

module.exports.loadModels = async (req, res) => {
    try {

        // console.log(MODEL_URL);
        console.log("LOADING FACE DETECTOR");
        await faceapi.nets.ssdMobilenetv1.loadFromDisk(MODEL_URL);

        console.log("LOADING 68 FACIAL LANDMARK DETECTOR");
        await faceapi.nets.faceLandmark68Net.loadFromDisk(MODEL_URL);

        console.log("LOADING FEATURE EXTRACTOR");
        await faceapi.nets.faceRecognitionNet.loadFromDisk(MODEL_URL);

    } catch (err) {
        console.log(err);
    }
}

module.exports.matchFaceWithDataSet = async (req, res, next) => {
    await module.exports.loadModels();
    console.log("SUCESSFULLY LOADED ALL MODLES");

    const srcImg = await canvas.loadImage("./images/" + req.body.image);
    // console.log(srcImg);
    const srcDetections = await faceapi.detectSingleFace(srcImg)
        .withFaceLandmarks().withFaceDescriptor();

    const refImg = await canvas.loadImage("./images/1.jpg");
    // console.log(refImg);
    const refDetections = await faceapi.detectSingleFace(refImg)
        .withFaceLandmarks().withFaceDescriptor();

    console.log(srcDetections);
    console.log(refDetections);
    const dist = faceapi.euclideanDistance(srcDetections.descriptor, refDetections.descriptor);
    console.log(dist);
    if (dist != 0) {
        req.flash('error', 'INCORRECT USER!');
        res.redirect('/register');
    } else {
        next();
    }
}

module.exports.renderAbout = (req, res) => {
    res.render('about');
}

module.exports.renderRegister = (req, res) => {
    res.render('users/register');
}

module.exports.register = async (req, res, next) => {
    console.log(req.body);
    console.log(req.body.image);
    try {
        const { email, username, income, saving, password } = req.body;
        const user = new AccountUser({ email, username, income, saving });
        const registeredUser = await AccountUser.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'WELCOME!');
            console.log(`${registeredUser._id}`.valueOf());
            res.redirect(`/${registeredUser._id}`.valueOf());
        })
    }
    catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
}

module.exports.renderLogin = (req, res) => {
    res.render('users/login');
}

module.exports.login = async (req, res) => {
    // console.log(req.body);
    // const matched = await module.exports.matchFaceWithDataSet(req, res);
    // console.log(matched);
    // if (matched) {
    //     passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' });
    req.flash('success', 'WELCOME BACK!');
    res.redirect('/');
    // } else {
    //     req.flash('error', 'INCORRECT USER!');
    //     res.redirect('/register');
    // }
}

module.exports.logout = (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        req.flash('success', "GOODBYE!")
        res.redirect('/');
    });
    // req.logout();
    // req.flash('success', "GOODBYE!")
    // res.redirect('/');
}

module.exports.showAccount = async (req, res) => {
    const account = await AccountUser.findById(req.params.id.valueOf());
    if (!account) {
        req.flash('error', 'CANNOT FIND THAT ACCOUNT!!!');
        return res.redirect('/login');
    }
    res.render('accounts/show', { account });
}

module.exports.updateAccount = async (req, res) => {
    const { id } = req.params;
    console.log("update");
    console.log(req.body);
    const account = await AccountUser.findByIdAndUpdate(id, { ...req.body.updateAccount });
    console.log(account);
    await account.save();
    req.flash('success', 'Successfully updated the account!');
    res.redirect(`/${account._id}`)
}

module.exports.deleteAccount = async (req, res) => {
    const { id } = req.params;
    await AccountUser.findByIdAndDelete(id);
    req.flash('success', 'ACCOUNT DELETED SUCCESSFULLY!!!');
    res.redirect('/register');
}

module.exports.renderEditForm = async (req, res) => {
    const account = await AccountUser.findById(req.params.id.valueOf());
    if (!account) {
        req.flash('error', 'CANNOT FIND THAT ACCOUNT!!!');
        return res.redirect('/login');
    }
    res.render('accounts/edit', { account });
}