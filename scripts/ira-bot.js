var ira=require('../ira.js') ;
var eliza = new ira();
var spam=require('../spam.js')
module.exports = function(robot) {

    return robot.respond(/(.*)/i, function(msg) {
       console.log(msg.match) ;

       var user_input=msg.match[1];
       var bot_output=eliza.transform(user_input) ;
        var isspam=spam.predict('demo1',user_input);
        bot_output+=JSON.stringify(isspam);

        console.log(bot_output) ;
       return msg.send(bot_output)
    });
};

