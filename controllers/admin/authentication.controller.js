const mongoose = require('mongoose');
const User = mongoose.model('User');
const passport = require('passport');
const _ = require('lodash');
var ObjectId = mongoose.Types.ObjectId;

module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) {
          if(user.role == "admin")
            return res.status(200).json({ "token": user.generateJwt(), user : _.pick(user,['fullName','email', 'role']) });
          else
            res.render('admin/login.ejs');
        }
         // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}
