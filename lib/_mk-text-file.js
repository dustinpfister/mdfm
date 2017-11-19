// make a plain text file with the given markdown

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

/*
exports.mkFile = function (fn, md) {

return new Promise(function (resolve, reject) {

var header = md.match(headPat),
fn_text = '.mdfm/text/' + path.basename(fn).replace(mdPat, '.txt'),
text = '',

// custom renderer for text
renderer = new marked.Renderer();

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

if (header) {

// parse yaml into js object
header = yaml.safeLoad(header[0].replace(/---/g, ''));

}

text += (header.title || 'untitled') + os.EOL + os.EOL;

text += marked(md.replace(headPat, ''), {
renderer: renderer
});

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
*/
