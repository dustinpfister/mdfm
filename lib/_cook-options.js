var _ = require('lodash'),
fs = require('fs'),
yaml = require('js-yaml'),
mkdirp = require('mkdirp'),
nopt = require('nopt');

// hard coded default options
var defaults = {

    mode: 'help',
    source: './', // the source dir where the *.md files are

    // options for rendering text
    // for use in _md-to-text.js helper
    text: {

        headerTitle: true,
        headerInfo: true,
        renderCode: true,
        EOL: '\r\n'

    }
};

// cook options
exports.cook = function () {

    var argv = nopt(

            // options
        {
            mode: ['help', 'init', 'gen-reports', 'gen-html', 'gen-text'],
            source: String

        },

            // shorthands
        {

            i: ['--mode', 'init'],
            h: ['--mode', 'help'],
            r: ['--mode', 'gen-reports'],
            m: ['--mode', 'gen-html'],
            t: ['--mode', 'gen-text'],
            s: ['--source']

        },

            process.argv, 2);

    // return a promise
    return new Promise(function (resolve, reject) {

        // always make the .mdfm folder if not there
        mkdirp('.mdfm', function (e) {

            if (e) {

                reject(e);

            }

            fs.readFile('.mdfm/config.yaml', 'utf-8', function (e, data) {

                if (e) {

                    //reject(e);

                }

                if (data) {

                    data = yaml.safeLoad(data);
                    console.log('config.yaml options found :');
                    //console.log(data);

                } else {

                    console.log('no config.yaml file found.');
                    data = {};

                }

                resolve(_.merge(defaults, data, argv));

            });

        });

    });

    //return _.merge(defaults, argv);

};
