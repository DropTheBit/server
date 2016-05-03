/**
 * Created by swpark on 2016. 5. 3..
 */
var express = require('express');
var router = express.Router();

var task = require('./task-controller');

router.get('/', task.list);
router.post('/createTask', task.create);
router.post('/updateTask', task.update);
router.post('/removeTask', task.remove);

module.exports = router;