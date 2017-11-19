// make a plain text file with the given markdown

var fs = require('fs'),
path = require('path'),
os = require('os'),
yaml = require('js-yaml'),
marked = require('marked'),
removeMd = require('remove-markdown'),
mkdirp = require('mkdirp'),

// patterns
headPat = /---[\s|\S]*---/,
mdPat = /.md$/;

exports.mkFile = function (fn, md) {

    return new Promise(function (resolve, reject) {

        var header = md.match(headPat),
        fn_text = '.mdfm/text/' + path.basename(fn).replace(mdPat, '.txt'),
        text = '';

        if (header) {

            // parse yaml into js object
            header = yaml.safeLoad(header[0].replace(/---/g, ''));

        }

        text += header.title + os.EOL + os.EOL;

        //var tokens = marked.lexer(md.replace(headPat,''));
        var renderer = new marked.Renderer();

        //console.log(renderer);

        renderer.image = function (href, title, text) {

            // render nothing for any images
            return '';

        }

        renderer.code = function (code, lang) {

            return code + os.EOL + os.EOL;

        }

        renderer.heading = function (text, level) {

            return text + os.EOL + os.EOL;

        }

        renderer.paragraph = function (text) {

            return text + os.EOL + os.EOL;

        };

        renderer.link = function (stringHref, stringTitle, stringText) {

            return stringText;

        };

        text += marked(md.replace(headPat, ''), {
            renderer: renderer
        });

        /*
        tokens.forEach(function (token) {

        if (token.text) {

        text += marked(token.text, {renderer:renderer}) + os.EOL + os.EOL;

        }
        });
         */

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

}
