require('./config/config');
require('./models/db');
require('./config/passportConfig');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const PORT = process.env.PORT || 5000;
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const rtsIndex = require('./routes/index.router');
const adminIndex = require('./routes/admin.router');

var app = express();
app.use(cookieParser('secret'));
app.use(session({cookie: { maxAge: 60000 }}));
app.use(flash());

// middleware
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.get('/', function (req, res) {
    res.send('Ssup guys!')
});
app.use('/api', rtsIndex);
app.use('/a', adminIndex);

app.use(express.static(__dirname + '/public'));

//app.use(express.static(path.join(__dirname, 'public')));
//app.get('/', (req, res) => res.render('pages/index'));

// error handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
    else{
        console.log(err);
    }
});
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
