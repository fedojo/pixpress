var express = require('express'),
    router = express.Router(),
    gpio = gpio = require('../lib/animate-gpio');

function printRequestInfo(name, req) {
    console.log('Req IP: ' + req.connection.remoteAddress + ' | ' + new Date() + ' | request name: ' + name);
}

router.get('/on', function (req, res) {
    gpio.enableAll();
    printRequestInfo('/on', req);

    res.json({message: 'led is on'});
});

router.get('/off', function (req, res) {
    gpio.disableAll();
    printRequestInfo('/off', req);

    res.json({message: 'led is off'});
});

router.get('/enable/:led', function (req, res) {
    var ledNum = req.params.led;

    var gpioReturn = gpio.enable(ledNum);
    printRequestInfo('/enable/' + req.params.led, req);

    if (gpioReturn == 1) {
        res.json({message: ledNum + ' led is on'});
    }
    else {
        res.json({message: ledNum + ' led is on (was on)'});
    }
});

router.get('/disable/:led', function (req, res) {
    var ledNum = req.params.led;

    var gpioReturn = gpio.disable(ledNum);
    printRequestInfo('/disable/' + ledNum, req);


    if (gpioReturn = 1) {
        res.json({message: ledNum + ' led is off'});
    }
    else {
        res.json({message: ledNum + ' led is off (was off)'});
    }
});

router.get('/animate-on', function (req, res) {
    console.log('animation');

    var enabled = 0;

    animation = setInterval(function () {
        if (enabled) {
            led04.writeSync(0);
            enabled = 0;
        }
        else {
            led04.writeSync(1);
            enabled = 1;
        }
    }, 500);

    res.json({message: 'animation is started'});
});

router.get('/animate-off', function (req, res) {
    console.log('animation');

    animation = clearInterval(animation);

    res.json({message: 'animation is ended'});
});

module.exports = router;