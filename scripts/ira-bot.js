var ira = require('../ira.js');
var eliza = new ira();
var spam = require('../spam.js');
var util = require('util');
var _ = require('underscore');
var nconf = require('nconf').argv().env().file({
    file: "./config.json"
});

module.exports = function (robot) {

    return robot.respond(/(.*)/i, function (msg) {


        //console.log(msg.match);

        var user_input = msg.match[1];
        console.log(user_input);
        var bot_output = eliza.transform(user_input);
        spam.predict(nconf.get("model_id"), [user_input], function (spam_prediction) {
            console.log(util.inspect(spam_prediction, { showHidden: true, depth: null }));
            var scores=spam_prediction.outputMulti;
            var spam_report='';
            _.each(scores, function(s) {
                if (s.label=='spam') {
                    spam_report+="SPAM " + s.score*100+'   ';
                }
                if (s.label=='ham') {
                    spam_report+="HAM " + s.score*100;
                }
            });
            msg.send('['+spam_report+'] \n\n'+bot_output);
        });


        //return msg.send(bot_output)
    });
};

