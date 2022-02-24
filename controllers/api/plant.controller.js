const mongoose = require('mongoose');
const Plant = mongoose.model('Plant');
var ObjectId = mongoose.Types.ObjectId;


module.exports.getPlants = (req, res) => {
  Plant.find((err, data)=>{
    if(!err)
      res.send(data);
    else
      console.log('Error in retrieving zones : ' + JSON.stringify(err, undefined, 2));
  });
}

module.exports.addPlant = (req, res) => {
  var plant = new Plant(req.body);
  plant.save((err, data)=>{
    if(!err) { res.send(data); }
    else
      console.log('Error in saving Plant : ' + JSON.stringify(err, undefined, 2));
  });
}

module.exports.editPlant = (req, res) => {
  if(!ObjectId.isValid(req.params.id))
    return res.status(400).send('No record with given id : ${req.params.id}');

  Plant.findByIdAndUpdate(req.params.id, req.body, {new : true}, (err, data)=>{
    if(!err)
      res.send(data);
    else
      console.log('Error in updating Plant : ' + JSON.stringify(err, undefined, 2));
  });
}

module.exports.deletePlant = (req, res) => {
  if(!ObjectId.isValid(req.params.id))
    return res.status(400).send('No record with given id : ${req.params.id}');

  Plant.findByIdAndRemove(req.params.id, (err, data)=>{
    if(!err)
      res.send(data);
    else
      console.log('Error in deleting Plant : ' + JSON.stringify(err, undefined, 2));
  });
}
