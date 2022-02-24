const mongoose = require('mongoose');
const Sensor = mongoose.model('Sensor');
var ObjectId = mongoose.Types.ObjectId;

module.exports.getSensors = (req, res) => {
  Sensor.find((err, data) => {
    if(!err)
      res.render('admin/sensors.ejs',{data: data});
    else
      console.log('Error in retrieving sensors : ' + JSON.stringify(err, undefined, 2));
  });
}

module.exports.getSensorsByZoneId = (req, res) => {
  if(!ObjectId.isValid(req.params.zone_id))
    return res.status(400).send('No record with given id : ${req.params.zone_id}');

  Sensor.find({zone_id : req.params.zone_id}, (err, data)=>{
    if(!err)
      res.send(data);
    else
      console.log('Error in retrieving Sensors : ' + JSON.stringify(err, undefined, 2));
  });
}

module.exports.getSensorsByUserId = (req, res) => {
  if(!ObjectId.isValid(req.params.user_id))
    return res.status(400).send('No record with given id : ${req.params.user_id}');

  Sensor.find({user_id : req.params.user_id}, (err, data)=>{
    if(!err)
      res.send(data);
    else
      console.log('Error in retrieving Sensors : ' + JSON.stringify(err, undefined, 2));
  });
}


module.exports.addSensor = (req, res) => {
  var sensor = new Sensor(req.body);
  sensor.save((err, data)=>{
    if(!err) { res.send(data); }
    else
      console.log('Error in saving Sensor : ' + JSON.stringify(err, undefined, 2));
  });
}

module.exports.editSensor = (req, res) => {
  if(!ObjectId.isValid(req.params.id))
    return res.status(400).send('No record with given id : ${req.params.id}');

  Sensor.findByIdAndUpdate(req.params.id, req.body , {new : true}, (err, data) => {
    if(!err)
      res.send(data);
    else
      console.log('Error in adding value for sensor : ' + JSON.stringify(err, undefined, 2));
  });
}

module.exports.addSensorValue = (req, res, next) => {
  sen=Sensor.findById(req.params.id, (err, data) => {
    //console.log(data.values);
    data.values.push({
       value_id : {$inc:{sequence_value:1}},
       value : req.params.value,
       Created_date : Date.now()
     });
  });
  console.log(sen);

  /*sensor.values.push({
     value_id : {$inc:{sequence_value:1}},
     value : req.params.value,
     Created_date : Date.now()
   });

  Sensor.update(sensor, (err, data)=>{
    if(!err)
      res.send(data);
    else
      console.log('Error in adding value for sensor : ' + JSON.stringify(err, undefined, 2));
  });*/
}
