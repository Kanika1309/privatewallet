const AccountUser = require('../models/user');
const Daily = require('../models/daily');

module.exports.renderDataForm = async (req, res) => {
    const account = await AccountUser.findById(req.params.id.valueOf());
    if (!account) {
        req.flash('error', 'CANNOT FIND THAT ACCOUNT!!!');
        return res.redirect('/login');
    }
    res.render('accounts/new', { account });
}

module.exports.createDaily = async (req, res, next) => {
    console.log("daily");
    console.log(req.body);
    const account = await AccountUser.findById(req.params.id.valueOf());
    const daily = new Daily(req.body.daily);
    daily.author = req.params.id.valueOf();
    account.data.push(daily);
    await account.save();
    await daily.save();
    req.flash('success', 'TODAY INFORMATION UPDATED!!!');
    res.redirect(`/${req.params.id.valueOf()}`);
}