'use strict';


var MessagesModel = require('../../models/messages'),
 passport = require('passport');

module.exports = function (router) {

    var model = new MessagesModel("Settings");

    router.get('/', function (req, res) {
        model.messages = req.flash('error');
        res.render('profilesettings', model);
    });
     
    router.post('/', function (req, res) {
        
    
    });
};
