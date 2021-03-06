'use strict';

var TwitterStrategy = require('passport-twitter').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GitHubStrategy = require('passport-github').Strategy;
var User = require('../models/users');
var configAuth = require('./auth');

module.exports = function (passport) {
	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function (id, done) {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});

	passport.use(new GitHubStrategy({
		clientID: configAuth.githubAuth.clientID,
		clientSecret: configAuth.githubAuth.clientSecret,
		callbackURL: configAuth.githubAuth.callbackURL
	},
	function (token, refreshToken, profile, done) {
		process.nextTick(function () {
			User.findOne({ 'github.id': profile.id }, function (err, user) {
				if (err) {
					return done(err);
				}

				if (user) {
					return done(null, user);
				} else {
					var newUser = new User();

					newUser.github.id = profile.id;
					newUser.github.username = profile.username;
					newUser.github.displayName = profile.displayName;
					newUser.github.publicRepos = profile._json.public_repos;
					newUser.nbrClicks.clicks = 0;

					newUser.save(function (err) {
						if (err) {
							throw err;
						}

						return done(null, newUser);
					});
				}
			});
		});
	}));

	passport.use(new FacebookStrategy({
	    clientID: configAuth.facebookAuth.clientID,
	    clientSecret: configAuth.facebookAuth.clientSecret,
	    callbackURL: configAuth.facebookAuth.callbackURL
  },
  function(accessToken, refreshToken, profile, cb) {
  	process.nextTick(function () {
			User.findOne({ 'facebook.id': profile.id }, function (err, user) {
				if (err) {
					return cb(err);
				}

				if (user) {
					return cb(null, user);
				} else {
					var newUser = new User();

					newUser.facebook.id = profile.id;
					newUser.facebook.username = profile.username;
					newUser.facebook.displayName = profile.displayName;
					newUser.nbrClicks.clicks = 0;

					newUser.save(function (err) {
						if (err) {
							throw err;
						}

						return cb(null, newUser);
					});
				}
			});
		});
  }));



	passport.use(new TwitterStrategy({
		    consumerKey: configAuth.twitterAuth.consumerKey,
		    consumerSecret: configAuth.twitterAuth.consumerSecret,
		    callbackURL: configAuth.twitterAuth.callbackURL
  },
  function(token, tokenSecret, profile, cb) {
    process.nextTick(function () {
			User.findOne({ 'twitter.id': profile.id }, function (err, user) {
				if (err) {
					return cb(err);
				}

				if (user) {
					return cb(null, user);
				} else {
					var newUser = new User();

					newUser.twitter.id = profile.id;
					newUser.twitter.username = profile.username;
					newUser.twitter.displayName = profile.displayName;
					newUser.nbrClicks.clicks = 0;

					newUser.save(function (err) {
						if (err) {
							throw err;
						}

						return cb(null, newUser);
					});
				}
			});
		});
	}));
};
