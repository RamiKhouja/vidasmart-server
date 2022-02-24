const mongoose = require('mongoose');
const Sensor = mongoose.model('Sensor');
var ObjectId = mongoose.Types.ObjectId;

module.exports.getSensors = (req, res) => {
  Sensor.find((err, data) => {
    if(!err)
      res.send(data);
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

module.exports.addSensorValue = (req, res) => {
  if(!ObjectId.isValid(req.params.id))
    return res.status(400).send('No record with given id : ${req.params.id}');
  Sensor.findById(req.params.id, function(err, sensor){
    if(!err) {
      let val = {
        value : req.params.value
      }
      sensor.values.push(val);
      sensor.save();
      res.send(sensor);
    }
    else
      console.log('Error in adding value for sensor : ' + JSON.stringify(err, undefined, 2));
  });
}

module.exports.getSensorValuesByDate = (req, res) => {
  /*if(!ObjectId.isValid(req.params.date_from) || !ObjectId.isValid(req.params.date_to))
    return res.status(400).send('No record with given date ${req.params.date_from} or ${req.params.date_to}');*/
  dateFrom = new Date(req.params.date_from).getTime();
  dateTo = new Date(req.params.date_to).getTime();
  
  Sensor.find({
    values:
    [ 
      { Created_date: 
        {
          $gte: new Date(2020, 7, 14), 
          $lt: new Date(2021, 7, 15)
        }
      }
    ]
  }, (err, data)=>{
    if(!err)
      res.send(data);
    else
      console.log('Error in retrieving Sensors : ' + JSON.stringify(err, undefined, 2));
  });
}