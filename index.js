#!/usr/bin/env node

var cOpt = require('./lib/_cook-options.js');

/*
// get the options object that will be used
var options = cOpt.cook();

console.log(options);

//  Run the script for the current mode, and pass the options
require('./lib/_mode-' + options.mode + '.js').run(options);

 */

cOpt.cook().then(function (options) {

    require('./lib/_mode-' + options.mode + '.js').run(options);

}).catch (function (e) {

    console.log(e);

});
