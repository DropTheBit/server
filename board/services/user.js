/**
 * Created by swpark on 2016. 5. 7..
 */
var Task = require('../models/task');
var fs = require('fs');

exports.createJson = function () {
    Task.find({status: 'Printing'}, function (err, tasks) {
        //console.log('Succeed to get all tasks {' + tasks + '}');

        var content = [];

        // make task list for each status
        for (var key in tasks) {
            var task = tasks[key];
            if (task.get('status') == 'Printing') {
                content.push(task.get('contents'));
            }
            else {
                console.error('Task status is not valid' + task);
            }
        }
        var userJson = {
            status: 'USER DATA',
            contents: content
        };

        fs.writeFile('./public/serviceData/user.json', JSON.stringify(userJson), 'utf8', function(err){
            console.log(err);
        });
    });
};