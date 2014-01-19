
/**
 * Module dependencies.
 */

	var express = require('express'),
		routes = require('./routes'),
		user = require('./routes/user'),
		http = require('http'),
		path = require('path'),
		app = express(),
		server = http.createServer(app),
		M = require('./mongodb'),
		db = M.db(),
		mongodb = M.mongodb;

	// all environments
	app.set('port', process.env.PORT || 3000);
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.compress({level:6}));
	app.use(express.json());
	app.use(express.cookieParser());
	app.use(express.urlencoded());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));

	app.use(express.static(path.join(__dirname, 'public/vendor/bower_components')));

	// development only
	if ('development' == app.get('env')) {
	  app.use(express.errorHandler());
	}

    db.open(function (err, client) {
		if(err) return ;

	    app.users = new mongodb.Collection(client, 'users');
		console.log('-----------connected to mongodb!-----------');
    })


	app.get('/', routes.index);
	app.get('/users', user.list);


	app.get('/login/:search', function (q, s, n) {

		var login = require('./routes/login');

		if(q.params.search){
			console.log(q.params.search)
			login(q, s, {title: q.params.search});
		}else{
			login(q, s, {authenticated: false});
		}

	})
	app.get('/register*', function (q, s, n) {

		var register = require('./routes/register');
		register(q, s);

	})

	app.post('/register', function (q, s, n) {
		app.users.insert(q.body.user, function (err, doc) {
			if(err) return n(err)
			console.log(app.users.find());
			s.redirect('/login/' + doc[0].email);

		})

	})

	server.listen(app.get('port'), function(){
	  console.log('Express server listening on port ' + app.get('port'));
	});


