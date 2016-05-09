/**
 * Created by swpark on 2016. 5. 3..
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'S/W Park Dash Board',
    });
});


module.exports = router;
