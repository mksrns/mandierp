const config = require('../config/database');
const Student = require('../models/student');
const Admin = require('../models/admin');

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

passport.use('local', new LocalStrategy({
    usernameField:'email',
    passwordField:'password'
},
  function(username, password, done) {
    Student.findOne({ email: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.isValid(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

passport.use('local', new LocalStrategy({
    usernameField:'email',
    passwordField:'password'
},
  function(username, password, done) {
    Admin.findOne({ email: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.isValid(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
    done(null, user._id);
  });
  
  passport.deserializeUser(function(id, done) {
    Student.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.deserializeUser(function(id, done) {
    Admin.findById(id, function(err, user) {
      done(err, user);
    });
  });