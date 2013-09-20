module.exports = function(robot) {
    return robot.respond(/(.*)/i, function(msg) {
       console.log(msg.match[1]) ;

       return msg.send(msg.match[1])
    });
};
