/**
 * Created by swpark on 2016. 5. 7..
 */
var http = require('http');
var parser = require('xml2json');
var fs = require('fs');

Date.prototype.yyyymmdd = function () {
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth() + 1).toString();
    var dd = this.getDate().toString();
    return yyyy + (mm[1] ? mm : '0' + mm[0]) + (dd[1] ? dd : '0' + dd[0]);
}

var privateKey = 'mwzQCewNmEj6er4caoetT%2FpIV%2BgYiRS%2F5kbZIsWm0l1Eni7DArFHnUdYKPrcVyc6WjLKF9%2FAOZGeMwuHwjZ9yg%3D%3D';
var base_date = (new Date()).yyyymmdd();  // 20160507
var base_time = (new Date().getHours() < 12) ? '0500' : '1700'; // 0200, 0500, 0800, 1100, 1400, 1700, 2000, 2300
var nx = '63';  // Jeonju
var ny = '89';

var url = 'http://newsky2.kma.go.kr/service/SecndSrtpdFrcstInfoService2/ForecastSpaceData?ServiceKey=' + privateKey
    + '&base_date=' + base_date
    + '&base_time=' + base_time
    + '&nx=' + nx
    + '&ny=' + ny
    + '&numOfRows=5';

http.get(url, function (res) {
    var data = '';
    res.on('data', function (chunk) {
        data += chunk;
    });
    res.on('end', function () {
        var weather = JSON.parse(parser.toJson(data)).response.body.items;

        /*1. 강수확률  %
         2. 강수형태  PTY[없음(0), 비(1), 비/눈(2), 눈(3)]
         3. 습도  %
         4. 하늘상태  SKY[맑음(1), 구름조금(2), 구름많음(3), 흐림(4)]
         5. 3시간기온  'C
         */
        var ptyOption = {'0': 'Nothing', '1': 'Raining', '2': 'Raining/Snowing', '3': 'Snowing'};
        var skyOption = {'0': 'Sunny', '1': 'Partly Cloudy', '2': 'Mostly Cloudy', '3': 'Cloudy'};

        var content = ['Precipitation probability is ' + weather.item[0].fcstValue + '%',
            'Precipitation Type is ' + ptyOption[weather.item[1].fcstValue],
            'Humidity is ' + weather.item[2].fcstValue + '%',
            'Sky condition is ' + skyOption[weather.item[3].fcstValue],
            'Present temperature is ' + weather.item[4].fcstValue + '\'C'];

        var weatherJson = {
            status: 'Today\'s Weather:',
            contents: content
        };
        fs.writeFile('../public/serviceData/weather.json', JSON.stringify(weatherJson), 'utf8', function (err) {
            if (err)
                console.log(err);
        });
    });
});