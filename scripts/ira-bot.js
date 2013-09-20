var ira=require('../ira.js') ;
var eliza = new ira();

module.exports = function(robot) {

    return robot.respond(/(.*)/i, function(msg) {
       console.log(msg.match) ;

       var user_input=msg.match[1];
       var bot_output=eliza.transform(user_input) ;
        console.log(bot_output) ;
       return msg.send(bot_output)
    });
};

