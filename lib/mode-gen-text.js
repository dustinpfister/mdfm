
var mkdirp = require('mkdirp'),
fs = require('fs'),
path = require('path'),
marked = require('marked'),
dir = require('node-dir');

// patterns
//var headPat = /---[\s|\S]*---/;
var mdPat = /.md$/;

// called from main index.js
exports.run = function (options) {

    // always make the .mdfm/reports folder if not there
    mkdirp('.mdfm/text', function (e) {

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

            require('./_mk-text-file.js').mkFile(fn,content,options).then(function (fn_html,html) {

                console.log(fn_html);
                next();

            }).catch (function (e) {

                console.log(e);
                next();

            });

        });

    });

};
