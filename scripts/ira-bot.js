var ira = require('../ira.js');
var eliza = new ira();
var spam = require('../spam.js');
var util = require('util');

module.exports = function (robot) {

    return robot.respond(/(.*)/i, function (msg) {


        //console.log(msg.match);

        var user_input = msg.match[1];
        console.log(user_input);
        var bot_output = eliza.transform(user_input);
        spam.predict('demo1', [user_input], function (spam_prediction) {
            console.log(util.inspect(spam_prediction, { showHidden: true, depth: null }));

            msg.send(bot_output)
        });


        return msg.send(bot_output)
    });
};

