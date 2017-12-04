'use strict';

var MessagesModel = require('../../models/messages');
var Cryptopia = require('../../lib/cryptopia/cryptopia');
var Settings = require('../../models/settings');

module.exports = function (router) {
    var model = new MessagesModel("Balance");
    
    router.get('/', function (req, res) {

        Settings.findOne({
            user_id: req.user._id
        }, function (err, settings) {
            //If something weird happens, abort.
            if (err) {
                console.log(err);
                
            }
            try {
                if (settings) {
                    var api = new Cryptopia(settings.api_key, settings.api_secret);
                    var balanceObject = api.getBalance(function (error, data) {
                        console.log(data);
                    }, "BTC");

                    console.log("balanceObject", balanceObject);
                    model.balanceObject = balanceObject;
                    res.render('balance', model);
                
                } else {
                    console.log("no settings found");
                
                }
            }
            catch (ex) { }
        });
     });
     
};
