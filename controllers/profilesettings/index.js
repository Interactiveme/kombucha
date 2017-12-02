'use strict';


var MessagesModel = require('../../models/messages');
var Settings = require('../../models/settings');


module.exports = function (router) {

    var model = new MessagesModel("Settings");

    router.get('/', function (req, res) {
        model.messages = req.flash('error');
        res.render('profilesettings', model);
    });
     
    router.post('/', function (req, res) {
    
        var error = [];
        if(!req.body.api_key){
            error.push("Api Key is required");
        }
        if(!req.body.api_secret){
            error.push("Api Secret is required");
        }

        console.log(error);
        if(error.length == 0){
    
            req.body.user_id = req.user._id;
            Settings.create(
                req.body,
                function (err, settings) {
                    if (err) {
                        console.log(err);
                        model.messages = req.flash('error');
                        res.render('profilesettings', model);
                        
                    }

                    res.render('profilesettings', model);
                }
            );
        }else{
            model.messages = error;
            res.render('profilesettings', model);

        }
    });
};
