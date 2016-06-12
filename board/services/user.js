/**
 * Created by swpark on 2016. 5. 7..
 */
var Task = require('../models/task');
var fs = require('fs');

var userJson = {pTime: '0900'};  // for ptime  ... later construct USER db

exports.createJson = function (req, res) {
    Task.find = ({status: 'Printing'}, function (err, tasks) {
        //console.log('Succeed to get all tasks {' + tasks + '}');
        var content = [];

        // make task list for each status
        for (var key in tasks) {
            var task = tasks[key];
            if (task.get('status') == 'Printing') {
                var info = {};
                info.content = task.get('contents');
                info.json = task.get('json');
                content.push(info);
            }
            else {
                console.error('Task status is not valid' + task);
            }
        }

        userJson.userId = 'myID';
        userJson.status = 'USER DATA';
        userJson.contents = content;

        if (req)
            userJson.pTime = req.body.pTime;

        fs.writeFile('./public/serviceData/user.json', JSON.stringify(userJson), 'utf8', function (err) {
            console.log(err);
        });
    });
    if (req) {
        res.redirect('/');
        res.end();
    }
};