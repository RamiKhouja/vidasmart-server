const mongoose = require('mongoose');

var vanneSchema = new mongoose.Schema({
  designation: { type: String, required: 'Please enter vanne designation'},
  etatIrrigation: { type: [{type: String, enum: ['open', 'close']}], default: ['close'] },
  modeIrrigation: { type: [{type: String, enum: ['automatic', 'manual','programmable']}], default: ['manual'] },
  flux: Number,
  user_id: String,
  zone_id: String
});

mongoose.model('Vanne', vanneSchema);
