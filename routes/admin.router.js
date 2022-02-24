const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const ctrlSensor = require('../controllers/admin/sensor.controller');
const ctrlZone = require('../controllers/admin/zone.controller');
const ctrlUser = require('../controllers/admin/user.controller');
const ctrlLogin = require('../controllers/admin/authentication.controller');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/sensors', ctrlSensor.getSensors);


//Zones Routes
router.get('/zones', ctrlZone.getZones);
router.post('/zones/add', urlencodedParser, ctrlZone.addZone);
router.get('/zone/delete/:id', ctrlZone.deleteZone);
router.post('/zone/edit', urlencodedParser, ctrlZone.editZone);

router.get('/users', ctrlUser.getUsers);
router.post('/users/add', urlencodedParser, ctrlUser.addUser);
router.get('/user/delete/:id', ctrlUser.deleteUser);
router.post('/user/edit', urlencodedParser, ctrlUser.editUser);

router.post('/authentication', urlencodedParser, ctrlLogin.authenticate);

router.get('/login', (req, res) => {
  res.render('admin/login.ejs');
});
router.get('/w', (req, res) => {
  res.render('admin/welcome.ejs');
});

module.exports = router;
