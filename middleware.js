// const { updateSchema } = require('./schemas.js');
// const { AccountUserSchema } = require('./schemas.js');
const ExpressError = require('./utils/ExpressError');
// const Account = require('./models/account');
const Daily = require('./models/daily');
const AccountUser = require('./models/user');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'YOU MUST BE SIGNED IN FIRST!');
        return res.redirect('/login');
    }
    next();
}

module.exports.validateAccount = (req, res, next) => {
    const { error } = AccountUser.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.validateDaily = (req, res, next) => {
    const { error } = Daily.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

// module.exports.isAuthor = async (req, res, next) => {
//     const { id } = req.params;
//     const account = await Account.findById(id);
//     if (!account.author.equals(req.user._id)) {
//         req.flash('error', 'YOU DO NOT HAVE ACCESS TO DO THAT!');
//         return res.redirect(`/accounts/${id}`);
//     }
//     next();
// }

// module.exports.isDailyAuthor = async (req, res, next) => {
//     const { id, dailyId } = req.params;
//     const daily = await Daily.findById(dailyId);
//     if (!daily.author.equals(req.user._id)) {
//         req.flash('error', 'YOU DO NOT HAVE ACCESS TO DO THAT!');
//         return res.redirect(`/accounts/${id}`);
//     }
//     next();
// }