
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Dropthebit !' })
};

exports.time = function(req, res){
	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.end('<h1>Park\'s Time Table</h1><img src="/images/TimeTable.png" width="100%" />');
};

exports.product = function(req, res){
	res.render('product', {
		title: 'Product Page'
	});
};

exports.product_insert = function(req, res){
	res.render('product/insert', {
		title: 'Insert Page'
	});
};

exports.product_edit = function(req, res){
	res.render('product/edit', {
		title: 'Edit Page'
	});
};
