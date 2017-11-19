// make and return json report file for the given markdown

var fs = require('fs'),
path = require('path'),
os = require('os'),
yaml = require('js-yaml'),
marked = require('marked'),
removeMd = require('remove-markdown'),
mkdirp = require('mkdirp'),

// patterns
//headPat = /---[\s|\S]*---/,
mdPat = /.md$/;

exports.mkFile = function (fn, md,options) {

    options = options || {};

    return new Promise(function (resolve, reject) {

        var fn_text = '.mdfm/text/' + path.basename(fn).replace(mdPat, '.txt'),

        text = require('./_md-to-text.js').toText(md,options.text);

        mkdirp('.mdfm/text', function (e) {

            if (e) {

                reject(e);

            }

            fs.writeFile(

                fn_text,

                text,

                function (e) {

                if (e) {

                    reject(e);

                }

                resolve(fn_text, text);

            });

        });

    });

};
