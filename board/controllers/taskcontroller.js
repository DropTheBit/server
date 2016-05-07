/**
 * Created by swpark on 2016. 5. 3..
 */
var Task = require('../models/task');
var todo = require('../services/todo');

// define list() to get all tasks and display
exports.list = function (req, res) {
    // find tasks
    Task.find(function (err, tasks) {

//        console.log('Succeed to get all tasks {' + tasks + '}');

        var todoTasks = [];
        var ServicesTasks = [];
        var PrintingTasks = [];

        // make task list for each status
        for (var key in tasks) {
            var task = tasks[key];
            if (task.get('status') == 'TO-DO') {
                todoTasks.push(task.get('contents'));
            } else if (task.get('status') == 'Services') {  // In-Progress -> Service
                ServicesTasks.push(task.get('contents'));
            } else if (task.get('status') == 'Printing') {  // done -> Printing
                PrintingTasks.push(task.get('contents'));
            }
            else {
                console.error('Task status is not valid' + task);
            }
        }

        // rendering to main page with each task list
        res.render('board', {
            title: 'My Kanban Board',
            todoTasks: todoTasks,
            ServicesTasks: ServicesTasks,  // inprogressTasks
            PrintingTasks: PrintingTasks // doneTasks
        });
    });
};

exports.create = function (req, res) {
    // check same task is exist or not, if exist, just skip..
    Task.find({contents: req.body.contents, status: 'TO-DO'}, function (err, tasks) {
        if (err)
            throw err;

        var newTask = true;

        // check same task is exist
        if (tasks.length > 0) {
            console.error('There are same contents already, skip to create this task. Contents : '
                + req.body.contents);
            newTask = false;
        }

        // if this task is new, save it!!
        if (newTask) {
            new Task({
                contents: req.body.contents,
                author: req.body.author
            }).save();
            console.log('Succeed to create new task {' + req.body.contents + '}');
        }
        todo.createJson();
    });
    // display all tasks
    res.redirect('/board');
    res.end();
};

exports.update = function (req, res) {
    if (Task.findOne({contents: req.body.contents, stuats: req.body.status})) {
        //if (req.body.status == 'Printing' || req.body.status == 'Services') {
        // update tasks with new status
        Task.update({
            contents: req.body.contents
        }, {
            status: req.body.status
        }, function (err, numberAffected, raw) {
            if (err)
                throw err;
            console.log('The number of updated documents was %d', numberAffected);
            console.log('The raw response from MongoDB was ', raw);
        });
    }
    // display all tasks
    res.redirect('/board');
    res.end();
};

exports.remove = function (req, res) {
    Task.findOne({contents: req.body.contents, status: 'TO-DO'}, function (err, tasks) {
        if (err)
            throw err;

        if (tasks.get('status') == 'Services' || tasks.get('status') == 'Printing') {
            console.log('Do Not Do that!');
            return 'Detected hacking';
        }
        // remove tasks
        Task.remove({
            contents: req.body.contents
        }, function (err) {
            if (err)
                throw err;
            console.log('Succeed to remove task. contents is {' + req.body.contents + '}');
        });
        todo.createJson();
    });
    // display all tasks
    res.redirect('/board');
    res.end();
};