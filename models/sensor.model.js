const mongoose = require('mongoose');
var sensorSchema = new mongoose.Schema({
  designation: {
    type: String,
    required: 'Entrez la désignation du capteur...'
  },

  type: String,

  description : String,

  values: [
    {
      value_id : Number,
      value : Number,
      Created_date: {
        type: Date,
        default: Date.now()
      }
    }
  ],

  unity: String,

  user_id: String,
  zone_id: String
});

mongoose.model('Sensor', sensorSchema);
