var nconf = require('nconf').argv().env().file({
    file: "./config.json"
});

// Module dependencies.
var logger = require('./log');
var async = require('async');
var _ = require('underscore');
var moment = require('moment');
//var request = require('request');
var request = require('google-oauth-jwt').requestWithJWT();
//https://developers.google.com/prediction/docs/reference/v1.6/

module.exports.predict = getModelPrediction;

function getModelPrediction(model,csv, callback) {
    var restURL = "https://www.googleapis.com/prediction/v1.6/projects/" + nconf.get('goauth:project_id') + "/trainedmodels/"+model+"/predict";
    console.log(restURL);
    request({uri: restURL,
        method: 'post',
        json: true,
        body: {
            "input": {
                "csvInstance": csv
            }
        },
        jwt: {
            // use the email address of the service account, as seen in the API console
            email: nconf.get('goauth:gservice_email'),
            // use the PEM file we generated from the downloaded key
            keyFile: nconf.get('goauth:key_file'),
            // specify the scopes you wish to access - each application has different scopes
            scopes: nconf.get('goauth:scopes')
        }
    }, function (err, res, body) {
        callack(body);
    });

}
