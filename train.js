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

module.exports.train = initTrainModel;

function initTrainModel(model, data) {
    trainModel(model, data, function() {
        var interval=setInterval(function () {
            getModelStatus(model, function(status) {
                status=JSON.parse(status);
                logger.log('STATUS',status.trainingStatus);
                if ((status.trainingStatus=='DONE')) {
                    clearInterval(interval);
                    logger.log('STATUS',util.inspect(status, { showHidden: true, depth: null }));
                }

            });
        }, 5000);
    });
    //setTimeout((function(t) { t=null;})(training),1000*360); //cancel after 360 minutes

}

function trainModel(model, data, callback) {
//"aisha/lang.txt"
    var restURL = "https://www.googleapis.com/prediction/v1.6/projects/" + nconf.get('goauth:project_id') + "/trainedmodels/";
    console.log(restURL);
    request({uri: restURL,
        method: 'post',
        json: true,
        body: {"id": model, "storageDataLocation": data},
        jwt: {
            // use the email address of the service account, as seen in the API console
            email: nconf.get('goauth:gservice_email'),
            // use the PEM file we generated from the downloaded key
            keyFile: nconf.get('goauth:key_file'),
            // specify the scopes you wish to access - each application has different scopes
            scopes: nconf.get('goauth:scopes')
        }
    }, function (err, res, body) {
        console.log(body);
        callback();
    });
}

function getModelStatus(model, callback) {
    var modelGet = "get?id=" + model;
    var restURL = "https://www.googleapis.com/prediction/v1.6/projects/" + nconf.get('goauth:project_id') + "/trainedmodels/";

    console.log(restURL + modelGet);
    request.get(restURL + modelGet,
        {
            jwt: {
                // use the email address of the service account, as seen in the API console
                email: nconf.get('goauth:gservice_email'),
                // use the PEM file we generated from the downloaded key
                keyFile: nconf.get('goauth:key_file'),
                // specify the scopes you wish to access - each application has different scopes
                scopes: nconf.get('goauth:scopes')
            }
        }, function (err, res, body) {
            callback(body);
        });

}

initTrainModel(nconf.get('model_id'),'aisha/msg_training.csv');
