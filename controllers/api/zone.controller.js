const mongoose = require('mongoose');
const Zone = mongoose.model('Zone');
var ObjectId = mongoose.Types.ObjectId;

module.exports.getZones = (req, res) => {
  Zone.find((err, data)=>{
    if(!err)
      res.send(data);
    else
      console.log('Error in retrieving zones : ' + JSON.stringify(err, undefined, 2));
  });
}

module.exports.getZoneById = (req, res) => {

  if(!ObjectId.isValid(req.params.id))
    return res.status(400).send('No record with given id : ${req.params.id}');

  Zone.findById(req.params.id, (err, data)=>{
    if(!err)
      res.send(data);
    else
      console.log('Error in retrieving Zone : ' + JSON.stringify(err, undefined, 2));
  });
}

module.exports.getZoneByUserId = (req, res) => {

  if(!ObjectId.isValid(req.params.user_id))
    return res.status(400).send('No record with given id : ${req.params.user_id}');

  Zone.find({"user.user_id" : req.params.user_id}, (err, data)=>{
    if(!err)
      res.send(data);
    else
      console.log('Error in retrieving Zone : ' + JSON.stringify(err, undefined, 2));
  });
}

module.exports.getZoneByFieldId = (req, res) => {

  if(!ObjectId.isValid(req.params.field_id))
    return res.status(400).send('No record with given id : ${req.params.field_id}');

  Zone.find({field_id : req.params.field_id}, (err, data)=>{
    if(!err)
      res.send(data);
    else
      console.log('Error in retrieving Zone : ' + JSON.stringify(err, undefined, 2));
  });
}

module.exports.addZone = (req, res) => {
  var zone = new Zone(req.body);
  zone.save((err, data)=>{
    if(!err) { res.send(data); }
    else
      console.log('Error in saving Zone : ' + JSON.stringify(err, undefined, 2));
  });
}

module.exports.editZone = (req, res) => {
  if(!ObjectId.isValid(req.params.id))
    return res.status(400).send('No record with given id : ${req.params.id}');

  Zone.findByIdAndUpdate(req.params.id, req.body, {new : true}, (err, data)=>{
    if(!err)
      res.send(data);
    else
      console.log('Error in updating Zone : ' + JSON.stringify(err, undefined, 2));
  });
}

module.exports.deleteZone = (req, res) => {
  if(!ObjectId.isValid(req.params.id))
    return res.status(400).send('No record with given id : ${req.params.id}');

  Zone.findByIdAndRemove(req.params.id, (err, data)=>{
    if(!err)
      res.send(data);
    else
      console.log('Error in deleting Zone : ' + JSON.stringify(err, undefined, 2));
  });
}
