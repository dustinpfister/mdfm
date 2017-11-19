// make an html file with the given markdown file

var fs = require('fs'),
path = require('path'),
yaml = require('js-yaml'),
marked = require('marked'),
mkdirp = require('mkdirp'),

// patterns
headPat = /---[\s|\S]*---/,
mdPat = /.md$/;

exports.mkFile = function (fn, md) {

    return new Promise(function (resolve, reject) {

        var header = md.match(headPat)[0],
        html = '';

        if (header) {

            // parse yaml into js object
            header = yaml.safeLoad(header.replace(/---/g, ''));

        }

        // html
        html += '<!doctype html>';
        html += '<html>';

        // head
        html += '<head>';
        html += '<title>' + (header.title || 'untitled') + '<\/title>';
        html += '<\/head>';

        // body text parsed from markdown
        html += '<body>'
        html += '<h1>' + (header.title || 'untitled') + '<\/h1>';
        html += marked(md.replace(headPat, ''));
        html += '<\/body>';

        // end
        html += '<\/html>';

        mkdirp('.mdfm/html', function (e) {

            if (e) {

                reject(e);

            }

            fs.writeFile(

                '.mdfm/html/' + path.basename(fn).replace(mdPat, '.html'),

                html,

                function (e) {

                if (e) {

                    reject(e);

                }

                resolve(html);

            });

        });

    });

}
