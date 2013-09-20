module.exports = function(robot) {
    return robot.respond(/(.*)/i, function(msg) {
       return msg.send(msg)
    });
};
