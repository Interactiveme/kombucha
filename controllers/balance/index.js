'use strict';

var MessagesModel = require('../../models/messages');
var CryptopiaApi = require('../../lib/cryptopia/api');
var Settings = require('../../models/settings');

module.exports = function (router) {
    var model = new MessagesModel("Balance");
    
    router.get('/', function (req, res) {

        Settings.findOne({
            user_id : req.user._id
        }, function(err, settings) {
            //If something weird happens, abort.
            if (err) {
                console.log(err);
                
            }

            if (settings) {
                var api = new CryptopiaApi(settings);
                var balanceObject = api.getBalance();
                console.log(balanceObject);
                model.balanceObject = balanceObject;
                res.render('balance', model);
                
            } else {
                console.log("no settings found");
                
            }
        });

     });
     
};
