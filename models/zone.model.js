const mongoose = require ('mongoose');

var zoneSchema = new mongoose.Schema ({
  designation: {
    type: String,
    required: 'Please enter zone designation'
  },
  description : String,
  Created_date: {
    type: Date,
    default: Date.now
  },
  etatIrrigation: {
    type: [{
      type: String,
      enum: ['open', 'close']
    }],
    default: ['close']
  },
  modeIrrigation: {
    type: [{
      type: String,
      enum: ['automatic', 'manual','programmable']
    }],
    default: ['manual']
  },
  image: {
    type: String,
    default: 'image.jpg'
  },
  flux: Number,
  gouvernorat: String,
  emplacement: {
    latitude: Number,
    longitude: Number
  },
  user : {
    user_id: String,
    username: String
  },
  sensors : [{
    sensor_id : String,
    sensorType : String,
    sensorValue : Number
  }],
  field_id: String,

  plantes : [{
    id_plante : String,
    etat_plante : String
  }]

});

mongoose.model('Zone', zoneSchema);
