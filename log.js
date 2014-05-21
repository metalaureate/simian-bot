var nconf = require('nconf');
nconf.argv().env().file({
    file: "./config.json"
});
var fs=require('fs');
/*
# log - log information to the console 
#   params:
#     code - DEBUG, ERROR, WARNING, INFO
#     message - the log message to display
#     data - optional data info
#   returns: nothing
*/
exports.log = function (code, message, data) {
    if (nconf.get('DEBUG_MODE') == 'true' || nconf.get('DEBUG_MODE') == true) {
        if (data) {
            // if the data is an object, stringify it for output
            if (typeof data == 'object') {
                //data = JSON.stringify(data);
            }
            console.log(code.toUpperCase() + ': ' + message);
            console.log(code.toUpperCase() + ': ' + '(continued) ', data);
        }
        else {
           if (data) { console.log(code.toUpperCase() + ': ' + message,data);} else {
			    console.log(code.toUpperCase() + ': ' + message);
		   }
        }
    }
}

/*
//save in-memory config to disk
nconf.set('DEBUG_MODE', true);
nconf.set('database:port', 5984);
  nconf.save(function (err) {
    fs.readFile('./config.json', function (err, data) {
      console.dir(JSON.parse(data.toString()))
    });
  });
*/