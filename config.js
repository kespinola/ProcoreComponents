var _ = require('underscore');
var argv = require('minimist')(process.argv.slice(2));



module.exports= _.extend(argv, {
    hostname:argv.procore ? 'ude' : 'localhost',
    port: argv.procore ? '5051' : '8080'
});