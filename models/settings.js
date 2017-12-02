/**
 * A model for our user
 */
'use strict';
var mongoose = require('mongoose');

var settingsModel = function () {

        var settingsSchema = mongoose.Schema({
            api_key: {required: true,type: String},
            api_secret:{required: true,type: String},
            user_id:{required: true,type: String},
        });

        return mongoose.model('Settings', settingsSchema);
    };

module.exports = new settingsModel();
