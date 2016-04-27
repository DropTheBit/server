
/*
 * GET home page.
 */

exports.index = function(req, res){
	fs.readdir(__dirname + '/../public/musics', function(error, data){
		console.log(data);
		res.render('index', { 
			title: 'Dropthebit !',
			list: data
		});
	});
};

exports.time = function(req, res){
	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.end('<h1>Park\'s Time Table</h1><img src="/images/TimeTable.png" width="100%" />');
};

exports.note = function(req, res){
	res.render('note',{
		title: 'Notes'
	});
};

exports.product = function(req, res){
	res.render('product', {
		title: 'Product Page'
	});
};

exports.product_insert = function(req, res){
	res.render('product/insert', {
		title: 'Insert Pages'
	});
};

exports.product_edit = function(req, res){
	res.render('product/edit', {
		title: 'Edit Page'
	});
};

var fs = require('fs');
exports.musicsIndex = function(req, res){
	fs.readdir(__dirname + '/../public/musics', function(error, data){
		console.log(data);
		res.render('musicsIndex', {
				list: data
		});
	});
};
