var weather = require('weather-js');
var scratch = require('scratch-api');

scratch.UserSession.create('BGMead', '', function (err, user) {
    user.cloudSession('424990547', function (err, cloud) {
        console.log('Connected');
        cloud.on('set', function(name, value) {
            if (name === '☁ city' && value != 0) {
                weather.find({search: decode(value), degreeType: 'F'}, function(err, result) {
                    if(err) console.log(err);
                    if (result !== undefined) {
						console.log('Got data for ' + decode(value));
						cloud.set('☁ time', new Date().addHours(result[0].location.timezone).getHours() + 4);
						cloud.set('☁ temp', result[0].current.temperature + '00' + result[0].current.skycode + '00' + result[0].current.feelslike + '00');
						cloud.set('☁ city', 0);
						cloud.set('☁ status', encode(result[0].current.skytext));
						cloud.set('☁ forecast1', encode(result[0].forecast[0].shortday) + '00' + result[0].forecast[0].low + '00' + result[0].forecast[0].high + '00' + result[0].forecast[0].skycodeday + '00');
						cloud.set('☁ forecast2', encode(result[0].forecast[1].shortday) + '00' + result[0].forecast[1].low + '00' + result[0].forecast[1].high + '00' + result[0].forecast[1].skycodeday + '00');
						cloud.set('☁ forecast3', encode(result[0].forecast[2].shortday) + '00' + result[0].forecast[2].low + '00' + result[0].forecast[2].high + '00' + result[0].forecast[2].skycodeday + '00');
						cloud.set('☁ forecast4', encode(result[0].forecast[3].shortday) + '00' + result[0].forecast[3].low + '00' + result[0].forecast[3].high + '00' + result[0].forecast[3].skycodeday + '00');
						cloud.set('☁ wind', encode(result[0].current.winddisplay));
						cloud.set('☁ humidity', result[0].current.humidity);
					} else {
						cloud.set('☁ city', -1);
					}
                });
            }
        });
    });
});

function decode(text) {
    let char = 'abcdefghijklmnopqrstuvwxyz0123456789;*-_,./~ñ ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let pos = text.match(/.{1,2}/g);
    let decoded = '';
    for (i = 0; i < (text.length / 2); i++) {
        decoded = decoded + char.charAt(parseInt(pos[i]) - 10);
    }
    return decoded;
}

function encode(text) {
    let char = 'abcdefghijklmnopqrstuvwxyz0123456789;*-_,./~ñ ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let encoded = '';
    for (i = 0; i < text.length; i++) {
        encoded = encoded + parseInt(char.indexOf(text.charAt(i)) + 10).toString();
    }
    return encoded;
}

Date.prototype.addHours = function(h) {
    this.setTime(this.getTime() + (h*60*60*1000));
    return this;
}
