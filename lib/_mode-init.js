
var mkdirp = require('mkdirp'),
fs = require('fs'),
yaml = require('js-yaml');

// called from main index.js
exports.run = function (options) {

    console.log('MDFM: init...');

    // always make the .mdfm folder if not there
    mkdirp('.mdfm', function (e) {

        // just write hard coded options for now
        fs.writeFile('.mdfm/config.yaml', yaml.safeDump(options), 'utf-8', function () {

            console.log('new config.yaml file written');

        });

    });

};
