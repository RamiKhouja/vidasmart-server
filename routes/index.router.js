const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/api/user.controller');
const ctrlZone = require('../controllers/api/zone.controller');
const ctrlVanne = require('../controllers/api/vanne.controller');
const ctrlSensor = require('../controllers/api/sensor.controller');
const ctrlField = require('../controllers/api/field.controller');
const ctrlPlant = require('../controllers/api/plant.controller');

const jwtHelper = require('../config/jwtHelper');

router.get('/', function (req, res) {
    res.send('Ssup APIs')
});

router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/userProfile',jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.put('/editUser/:id', jwtHelper.verifyJwtToken, ctrlUser.editUser);
router.get('/clients', jwtHelper.verifyJwtToken, ctrlUser.clients);
router.get('/users',  ctrlUser.users);
router.delete('/user/:id', jwtHelper.verifyJwtToken, ctrlUser.deleteUser);

router.get('/zones', ctrlZone.getZones);
router.get('/zones/field/:field_id', ctrlZone.getZoneByFieldId);
//router.get('/zonesnear', ctrlZone.getNearZones);
router.get('/zone/:id', ctrlZone.getZoneById);
router.get('/zones/user/:user_id', ctrlZone.getZoneByUserId);
router.post('/zones', ctrlZone.addZone);
router.put('/zone/:id', ctrlZone.editZone);
router.delete('/zone/:id', ctrlZone.deleteZone);

router.get('/fields', ctrlField.getFields);
router.get('/fields/:user_id', ctrlField.getFieldByUserId);
router.get('/fieldsnear', ctrlField.getNearFields);
router.post('/fields', ctrlField.addField);
router.put('/field/:id', ctrlField.editField);
router.delete('/field/:id', ctrlField.deleteField);

router.get('/vannes', ctrlVanne.getVannes);
router.get('/vannes/zone/:zone_id', ctrlVanne.getVannesByZoneId);
router.get('/vannes/user/:user_id', ctrlVanne.getVannesByUserId);
router.post('/vannes', ctrlVanne.addVanne);
router.put('/vanne/:id', ctrlVanne.editVanne);
router.delete('/vanne/:id', ctrlVanne.deleteVanne);
router.put('/vanne/toggle/:id/:state', ctrlVanne.toggleVanne);

router.get('/sensors', ctrlSensor.getSensors);
router.get('/sensors/:zone_id', ctrlSensor.getSensorsByZoneId);
router.post('/sensors', ctrlSensor.addSensor);
router.put('/sensor/:id', ctrlSensor.editSensor);
router.put('/sensorval/:id/:value', ctrlSensor.addSensorValue);
router.get('/sensors/dates/:date_from/:date_to', ctrlSensor.getSensorValuesByDate);

router.get('/plants', ctrlPlant.getPlants);
router.post('/plants', ctrlPlant.addPlant);
router.put('/plant/:id', ctrlPlant.editPlant);
router.delete('/plant/:id', ctrlPlant.deletePlant);

module.exports = router;
