const mongoose = require('mongoose');
const User = mongoose.model('User');
const passport = require('passport');
const _ = require('lodash');
var ObjectId = mongoose.Types.ObjectId;
const nodemailer = require('nodemailer');
var generator = require('generate-password');
const flash = require('connect-flash');


function clean(obj) {
  for (var propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName];
    }
  }
}

module.exports.getUsers = (req, res) => {
  var allUsers = [];
  User.find((err, users) => {
      if (!users)
          return res.status(404).json({ status: false, message: 'Users record not found.' });
      else
      {
        for(var i=0; i<users.length; i++){
          /*if(users[i].phones == undefined || users[i].phones == null){
            users[i].assign("phones",[{
                phone : 0
              }]
            );
            users[i].phones[0].phone = 0;
          }*/
          if(users[i].address.gouvernorat == undefined || users[i].address.gouvernorat == null)
            users[i].address.gouvernorat = "";
          if(users[i].address.city == undefined || users[i].address.city == null)
            users[i].address.city = "";
          if(users[i].address.address == undefined || users[i].address.address == null)
            users[i].address.address = "";
          if(users[i].address.code == undefined || users[i].address.code == null)
            users[i].address.code = 0;
          if(users[i].phones[0] == undefined || users[i].phones[0] == null){
            let phonesVal = {
              phones : [{phone: 0}]
            }
            Object.assign(users[i], phonesVal);
          }
        }
        res.render('admin/users.ejs',{data: users});
      }
  });
}

module.exports.addUser = (req, res) => {
  var state = 'Disabled';

  if (req.body.state == 'on')
    state = 'Enabled';
  else
    state = 'Disabled';

  var passgen = generator.generate({
    length: 15,
    numbers: true
  });

  var user = new User({
    fullName : req.body.prenom + ' ' + req.body.nom,
    gender : req.body.gender,
    email : req.body.email,
    password : passgen,
    phones : [{
        phone : req.body.phone
    }],
    address : {
      address : req.body.address,
      city : req.body.city,
      gouvernorat : req.body.gouvernorat,
      code : req.body.code,
      country : 'Tunisie'
    },
    role : req.body.role,
    state : state

  });


  let transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "8ec1f80fe71a70",
      pass: "b83c6992cd8a5e"
    }
  });

  // send mail with defined transport object
  transporter.sendMail({
      from: 'admin@vidasmart.tn', // sender address
      to: req.body.email,
      subject: 'VidaSmart Account Password', // Subject line
      text: 'Welcome '+req.body.nom + ' ' + req.body.prenom, // plain text body
      html: '<b>Welcome '+req.body.nom + ' ' + req.body.prenom +'</b><br><p> Your password is ' + passgen + '</p>' // html body
  });

  user.save((err, data)=>{
    if(!err) {
      req.flash('success', 'Registration successfully');
      res.locals.message = req.flash();
      res.redirect('/a/users');
    }
    else
      console.log('Error in saving User : ' + JSON.stringify(err, undefined, 2));
  });

}

module.exports.deleteUser = (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, user)=>{
    if (err) throw err;

  });

  res.redirect('/a/users');
}

module.exports.editUser = (req, res) => {
  var state = 'Disabled';
  if (req.body.state == 'on')
    state = 'Enabled';
  else
    state = 'Disabled';
  User.findByIdAndUpdate(req.body.idUser, {
      gender : req.body.gender,
      fullName : req.body.fullName,
      email : req.body.email,
      phones : [{
          phone : req.body.phone
      }],
      address : {
        address : req.body.address,
        city : req.body.city,
        gouvernorat : req.body.gouvernorat,
        code : req.body.code,
        country : 'Tunisie'
      },
      role : req.body.role,
      state : state
    },
  (err, data) =>{
    if(!err)
      res.redirect('/a/users');
    else
      console.log('Error in eiting User : ' + JSON.stringify(err, undefined, 2));
  });
}
