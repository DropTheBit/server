/**
 * Created by swpark on 2016. 5. 3..
 */
var express = require('express');
var router = express.Router();

var task = require('./../controllers/taskcontroller');
var user = require('./../services/user');

router.get('/', task.list);
router.post('/createTask', task.create);
router.post('/updateTask', task.update);
router.post('/removeTask', task.remove);
router.post('/setTime', user.createJson);

module.exports = router;