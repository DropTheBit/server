/**
 * Created by swpark on 2016. 5. 3..
 */
// binding modules
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// declare task schema
var taskSchema = new Schema({
    status: {type: String, default: 'TO-DO'},
    contents: String,
    createDate: {type: Date, default: Date.now},
    author: {type: String, default: 'SWPark'},
});

//exports model for task-controller
module.exports = mongoose.model('Task', taskSchema);