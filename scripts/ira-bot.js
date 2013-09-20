module.exports = function(robot) {
    return robot.respond(/(.*)/i, function(msg) {
        console.log(msg);
       return msg.send(msg)
    });
};
