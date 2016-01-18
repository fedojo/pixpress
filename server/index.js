var express = require('express'),
    app = express(),
    gpio = gpio = require('./lib/animate-gpio'),

    routesApi = require('./routes/api'),
    routesUser = require('./routes/user'),
    routesViews = require('./routes/views');


gpio.readAll();

app.use('/', routesViews);
app.use('/user', routesUser);
app.use('/api', routesApi);

app.listen(3000, function () {
    console.log('Start server');
});

app.set('view engine', 'jade');

app.use(express.static('public'));
