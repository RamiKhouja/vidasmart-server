const mongoose = require('mongoose');
const Zone = mongoose.model('Zone');
  const User = mongoose.model('User');
  var ObjectId = mongoose.Types.ObjectId;


/*module.exports.getZones = (req, res) => {
  Zone.find((err, data)=>{
    if(!err) {
      User.find((err2, data2)=>{
        if(!err2){
          for(var i=0; i<data.length; i++) {
            for(var j=0; j<data2.length; j++) {
              if(data[i].user_id == data2[j]._id)
                Object.assign(data[i], {username:data2[j].fullName});
            }
          }
          res.render('admin/zones.ejs',{data: data, datajs: JSON.stringify(data)});
        }
        else {
          console.log('Error in retrieving users : ' + JSON.stringify(err, undefined, 2));
          return null;
        }
      });
    }
    else
      console.log('Error in retrieving zones : ' + JSON.stringify(err, undefined, 2));
  });
}*/

module.exports.getZones = (req, res) => {
  Zone.find((err, data)=>{
    if(!err) {
      User.find((err2, data2)=>{
        if(!err2)
          res.render('admin/zones.ejs',{data: data, datajs: JSON.stringify(data), users_data: data2});
        else
          console.log('Error in retrieving users : ' + JSON.stringify(err, undefined, 2));
      });
    }
    else
      console.log('Error in retrieving zones : ' + JSON.stringify(err, undefined, 2));
  });
}


module.exports.addZone = (req, res) => {
  var u_id = User.find({fullName : req.body.username}, (err2, d2)=> {
    var zone = new Zone({
        designation : req.body.designation,
        description : req.body.description,
        modeIrrigation : req.body.modeIrrigation,
        flux : req.body.flux,
        user : {
          user_id : d2[0]._id,
          username : req.body.username
        },
        gouvernorat: req.body.gouvernorat,
        emplacement : {
          latitude: req.body.latitude,
          longitude: req.body.longitude
        }
      });
      zone.save((err, data)=>{
        if(!err)
          res.redirect('/a/zones');
        else
          console.log('Error in saving Zone : ' + JSON.stringify(err, undefined, 2));
      });
  });
}



module.exports.deleteZone = (req, res) => {
  Zone.findByIdAndRemove(req.params.id, (err, zone)=>{
    if (err) throw err;
    console.log("success");

  });

  res.redirect('/a/zones');
}


module.exports.editZone = (req, res) => {
  Zone.findByIdAndUpdate(req.body.idZone, {
      designation : req.body.designation,
      description : req.body.description,
      modeIrrigation : req.body.modeIrrigation,
      flux : req.body.flux,
      gouvernorat: req.body.gouvernorat
    },
  (err, data) =>{
    if(!err)
      res.redirect('/a/zones');
    else
      console.log('Error in eiting Zone : ' + JSON.stringify(err, undefined, 2));
  });
}
