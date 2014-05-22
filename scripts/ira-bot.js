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
            var ham_score=0,spam_score= 0,meter=0;
            _.each(scores, function(s) {
                if (s.label=='ham') {
                    ham_score=s.score;
                }
                if (s.label=='spam') {
                    spam_score= s.score;
                }
            });
            if (spam_score>.6) {bot_output="I'm not answering that, you creep!";}
            meter=Math.round(((((1-spam_score)-0.5)*2)-1),2);
            msg.send('METER READING '+meter+' (-1 to +1) \n\n'+bot_output);
        });


        //return msg.send(bot_output)
    });
};

