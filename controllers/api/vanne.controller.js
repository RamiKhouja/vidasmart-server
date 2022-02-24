const mongoose = require('mongoose');
const Vanne = mongoose.model('Vanne');
var ObjectId = mongoose.Types.ObjectId;

module.exports.getVannes = (req, res) => {
  Vanne.find((err, data) => {
    if(!err)
      res.send(data);
    else
      console.log('Error in retrieving vannes : ' + JSON.stringify(err, undefined, 2));
  });
}

module.exports.getVannesByZoneId = (req, res) => {
  if(!ObjectId.isValid(req.params.zone_id))
    return res.status(400).send('No record with given id : ${req.params.zone_id}');

  Vanne.find({zone_id : req.params.zone_id}, (err, data)=>{
    if(!err)
      res.send(data);
    else
      console.log('Error in retrieving Vanne : ' + JSON.stringify(err, undefined, 2));
  });
}

module.exports.getVannesByUserId = (req, res) => {
  if(!ObjectId.isValid(req.params.user_id))
    return res.status(400).send('No record with given id : ${req.params.zone_id}');

  Vanne.find({user_id : req.params.user_id}, (err, data)=>{
    if(!err)
      res.send(data);
    else
      console.log('Error in retrieving Vanne : ' + JSON.stringify(err, undefined, 2));
  });
}

module.exports.addVanne = (req, res) => {
  var vanne = new Vanne(req.body);
  vanne.save((err, data)=>{
    if(!err) { res.send(data); }
    else
      console.log('Error in saving Vanne : ' + JSON.stringify(err, undefined, 2));
  });
}

module.exports.editVanne = (req, res) => {
  if(!ObjectId.isValid(req.params.id))
    return res.status(400).send('No record with given id : ${req.params.id}');

  Vanne.findByIdAndUpdate(req.params.id, req.body, {new : true}, (err, data)=>{
    if(!err)
      res.send(data);
    else
      console.log('Error in updating Vanne : ' + JSON.stringify(err, undefined, 2));
  });
}

module.exports.toggleVanne = (req, res) => {
  if(!ObjectId.isValid(req.params.id))
    return res.status(400).send('No record with given id : ${req.params.id}');

  Vanne.findByIdAndUpdate(req.params.id, {"etatIrrigation" : req.params.state}, {new : true}, (err, data)=>{
    if(!err)
      res.send(data);
    else
      console.log('Error in updating Vanne : ' + JSON.stringify(err, undefined, 2));
  });
}

module.exports.deleteVanne = (req, res) => {
  if(!ObjectId.isValid(req.params.id))
    return res.status(400).send('No record with given id : ${req.params.id}');

  Vanne.findByIdAndRemove(req.params.id, (err, data)=>{
    if(!err)
      res.send(data);
    else
      console.log('Error in deleting Vanne : ' + JSON.stringify(err, undefined, 2));
  });
}
