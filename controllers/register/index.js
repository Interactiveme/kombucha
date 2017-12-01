'use strict';


var RegisterModel = require('../../models/register'),
 passport = require('passport');


module.exports = function (router) {

    var model = new RegisterModel();

    router.get('/', function (req, res) {

        //Include any error messages that come from the login process.
        model.messages = req.flash('error');
        res.render('register', model);
    });
     
    router.post('/', function (req, res) {
        
        passport.authenticate('local-register', {
            successRedirect: req.session.goingTo || '/profile',
            failureRedirect: '/register',
            failureFlash: true
        })(req, res);
    });
};
