const mongoose = require('mongoose');

var serviceSchema = new mongoose.Schema({
  designation: {
    type: String,
    required: 'Please enter service designation'
  },
  description: String,
  users : [{
    user_id : String,
    state : {
      type: [{
        type: String,
        enum: ['enabled', 'disabled']
      }],
      default: ['disabled']
    }
  }]
});

mongoose.model('Service', serviceSchema);
