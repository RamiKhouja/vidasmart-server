const mongoose = require('mongoose');
const Field = mongoose.model('Field');
var ObjectId = mongoose.Types.ObjectId;


module.exports.getFields = (req, res) => {
  Field.find((err, data)=>{
    if(!err)
      res.send(data);
    else
      console.log('Error in retrieving fields : ' + JSON.stringify(err, undefined, 2));
  });
}

module.exports.getNearFields = (req, res, next) => {
  Field.aggregate().near({
    near : {
      'type' : 'Point',
      'coordinates' : [parseFloat(req.query.lng), parseFloat(req.query.lat)]
    },
    maxDistance : 100000,
    spherical : true,
    distanceField : "dis"
  }).then(function(fields){
    res.send(fields);
  }).catch(next);
}

module.exports.getFieldByUserId = (req, res) => {

  if(!ObjectId.isValid(req.params.user_id))
    return res.status(400).send('No record with given id : ${req.params.user_id}');

  Field.find({user_id : req.params.user_id}, (err, data)=>{
    if(!err)
      res.send(data);
    else
      console.log('Error in retrieving Field : ' + JSON.stringify(err, undefined, 2));
  });
}


module.exports.addField = (req, res) => {
  var field = new Field(req.body);
  field.save((err, data)=>{
    if(!err) { res.send(data); }
    else
      console.log('Error in saving Field : ' + JSON.stringify(err, undefined, 2));
  });
}

module.exports.editField = (req, res) => {
  if(!ObjectId.isValid(req.params.id))
    return res.status(400).send('No record with given id : ${req.params.id}');

  Field.findByIdAndUpdate(req.params.id, req.body, {new : true}, (err, data)=>{
    if(!err)
      res.send(data);
    else
      console.log('Error in updating Field : ' + JSON.stringify(err, undefined, 2));
  });
}

module.exports.deleteField = (req, res) => {
  if(!ObjectId.isValid(req.params.id))
    return res.status(400).send('No record with given id : ${req.params.id}');

  Field.findByIdAndRemove(req.params.id, (err, data)=>{
    if(!err)
      res.send(data);
    else
      console.log('Error in deleting Field : ' + JSON.stringify(err, undefined, 2));
  });
}
