const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, (err) => {
    if (!err) { console.log('MongoDB connection succeeded.'); }
    else { console.log('Error in MongoDB connection : ' + JSON.stringify(err, undefined, 2)); }
});
mongoose.Promise = global.Promise;

require('./user.model');
require('./zone.model');
require('./vanne.model');
require('./sensor.model');
require('./field.model');
require('./service.model');
require('./plant.model');
