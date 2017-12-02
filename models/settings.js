/**
 * A model for our user
 */
'use strict';
var mongoose = require('mongoose');

var settingsModel = function () {

        var settingsSchema = mongoose.Schema({
            api_key: String,
            api_secter:String
        });

        return mongoose.model('Settings', settingsSchema);
    };

module.exports = new settingsModel();
