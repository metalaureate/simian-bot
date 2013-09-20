module.exports = function(robot) {
    return robot.respond(/(.*)/i, function(msg) {
       console.log(msg.match) ;
        console.log(msg.input) ;

       return msg.send('you talking to me?')
    });
};
