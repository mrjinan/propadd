 var 	express =  require('express'),
		path = require('path'),
		consolidate = require('consolidate');
		bodyParser = require('body-parser');
		methodOverride = require('method-override');


var app = express();
app.use(bodyParser.urlencoded({
		extended: true
	}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(function(req, res, next) {
		res.locals.url = req.protocol + '://' + req.headers.host + req.url;
		next();
	});

app.engine('server.view.html', consolidate['swig']);
app.set('view engine', 'server.view.html');
console.log(path.resolve('app'))
app.use(express.static(path.resolve('app')));

app.set('views', 'server/views');

var index = function(req, res) {
		res.render('index', {
			request: req
		});
	}

app.route('/').get(index);

//set routes

//end routes


app.listen(9000,function(){
	console.log('Started in 9000')
})

