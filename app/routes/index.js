'use strict';

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');
var PollHandler = require(path + '/app/controllers/crudPoll.server.js');

module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/signin');
		}
	}

	var clickHandler = new ClickHandler();
    var pollHandler = new PollHandler();

	app.route('/')
		.get(function (req, res) {
			res.redirect('/polls');
		});	

	app.route('/polls')
		.get(function (req, res) {
			res.sendFile(path + '/public/polls.html');
		});

	app.route('/signin')
		.get(function (req, res) {
			res.sendFile(path + '/public/signin.html');
		});

	app.route('/mypolls')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/mypolls.html');
		});
	app.route('/newpoll')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/newpoll.html');
		});

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/signin');
		});

	app.route('/profile')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/profile.html');
		});

	

	app.route('/auth/github')
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/mypolls',
			failureRedirect: '/signin'
		}));

	app.route('/auth/facebook')
		.get(passport.authenticate('facebook'));

	app.route('/auth/facebook/callback')
		.get(passport.authenticate('facebook', {
			successRedirect: '/mypolls',
			failureRedirect: '/signin'
		}));

	app.route('/auth/twitter')
		.get(passport.authenticate('twitter'));

	app.route('/auth/twitter/callback')
		.get(passport.authenticate('twitter', {
			successRedirect: '/mypolls',
			failureRedirect: '/signin'
		}));


	app.route('/api/poll')
			.get(isLoggedIn, pollHandler.getAllPolls)
			.post(isLoggedIn, pollHandler.makePoll);

	app.route('/api/:id')
		.get(isLoggedIn, function (req, res) {
			res.json(req.user.getObj());
	});

	app.route('/api/:id/mypolls').get(isLoggedIn, pollHandler.getMyPolls);


	app.route('/poll/:id')
			.get(isLoggedIn,function (req, res) {
			res.sendFile(path + '/public/poll.html');
		});

	app.route('/api/item/:id')
			.get(pollHandler.getPoll);
			//.delete(isLoggenIn, pollHandler.deletePoll);


	app.route('/api/:id/clicks')
		.get(isLoggedIn, clickHandler.getClicks)
		.post(isLoggedIn, clickHandler.addClick)
		.delete(isLoggedIn, clickHandler.resetClicks);
};
