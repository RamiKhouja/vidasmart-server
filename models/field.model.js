const mongoose = require ('mongoose');

//create geolocation Schema using GeoJSON
const GeoSchema = new mongoose.Schema({
  type: {
    type: String,
    default: 'Point'
  },
  coordinates: {
    type: [Number],
    index: '2dsphere'
  }
});

var fieldSchema = new mongoose.Schema ({
  designation: {
    type: String,
    required: 'Please enter zone designation'
  },
  description : String,
  Created_date: {
    type: Date,
    default: Date.now
  },
  user_id: String,

  //add geo location
  geometry : GeoSchema

});

mongoose.model('Field', fieldSchema);
