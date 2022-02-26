const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const User = mongoose.model('User');

module.exports.register = (req, res, next) => {
    var user = new User();
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }

    });
}

module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) return res.status(200).json({ "token": user.generateJwt(), user : _.pick(user,['_id','fullName','email', 'role', 'services']) });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

module.exports.userProfile = (req, res, next) =>{
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user : _.pick(user,['fullName','email', 'role']) });
        }
    );
}

module.exports.clients = (req, res, next) => {
  User.find({role : ["client"]}, (err, users) => {
      if (!users)
          return res.status(404).json({ status: false, message: 'Users record not found.' });
      else
          return res.status(200).send(users);
  });
}

module.exports.users = (req, res, next) => {

  var allUsers = [];
  User.find((err, users) => {
      if (!users)
          return res.status(404).json({ status: false, message: 'Users record not found.' });
      else
      {
        users.forEach(function(user){
          allUsers.push({user : _.pick(user,['fullName','email', 'role'])});
        });
        return res.status(200).send(allUsers);
      }


  });
}

module.exports.editUser = (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, req.body , {new : true}, (err, data) => {
    if(!err)
      res.send(data);
    else
      console.log('Error in editing user : ' + JSON.stringify(err, undefined, 2));
  });
}

module.exports.deleteUser = (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, data)=>{
    if(!err)
      res.send(data);
    else
      console.log('Error in deleting User : ' + JSON.stringify(err, undefined, 2));
  });
}
