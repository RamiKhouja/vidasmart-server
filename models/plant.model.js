const mongoose = require ('mongoose');

var PlantSchema = new mongoose.Schema({
  designation : {
    type : String,
    required : "please enter plant name"
  },
  description : String,
  croissance : {
    type : String,
    required : "please enter plant phase"
  },
  humidite : {
    humidite_min : Number,
    max : Number
  },
  temperature : {
    temperature_min : Number,
    temperature_max : Number
  },
  date_plantation : Date,
  irrigation : [{
      mois_irrigation : String,
      nb_jours_mois : {
        type : Number,
        default : 30
      },
      qte_eau_mois : Number,
      nb_fois_jour : Number,
      qte_eau_jour : Number
  }],
  image: {
    type: String,
    default: 'image.jpg'
  }

});

mongoose.model('Plant', PlantSchema);
