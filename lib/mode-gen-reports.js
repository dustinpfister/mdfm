
var mkdirp = require('mkdirp'),
fs = require('fs'),
path = require('path'),
marked = require('marked'),
dir = require('node-dir'),

// patterns
mdPat = /.md$/;

// called from main index.js
exports.run = function (options) {

    // always make the .mdfm/reports folder if not there
    mkdirp('.mdfm/reports', function (e) {

        //console.log(options.source);

        // use node-dir to loop over markdown files
        dir.readFiles(

            // find markdown files at options.source
            options.source,

            // options for node-dir
        {
            match: mdPat
        },

            // for each *.md file
            function (err, content, fn, next) {

            var report = require('./_mk-md-report').mkReport(content, options),
            fn_json = '.mdfm/reports/' + path.basename(fn).replace(mdPat, '.json');

            // write the json report
            fs.writeFile(fn_json,
                JSON.stringify(report), 'utf-8', function () {

                console.log(fn_json);
                next();

            });

            /*
            require('./_mk-html-file.js').mkFile(fn,content).then(function (fn_html,html) {

            console.log(fn_html);
            next();

            }).catch (function (e) {

            console.log(e);
            next();

            });
             */

        });

    });

};
