// return plain text for the given markdown

var os = require('os'),
yaml = require('js-yaml'),
marked = require('marked'),
removeMd = require('remove-markdown'),
mkdirp = require('mkdirp'),

// patterns
headPat = /---[\s|\S]*---/,
mdPat = /.md$/,
lineBr = /[\n\r]/g,

// custom marked renderer for text only
// custom renderer for text
renderer = new marked.Renderer();

renderer.image = function (href, title, text) {

    // render nothing for any images
    return '';

}

renderer.code = function (code, lang) {

    return code.replace(lineBr, os.EOL) + os.EOL + os.EOL;

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

renderer.html = function (str) {

    return '';
};

// the toText method
exports.toText = function (md) {

    var text = '',
    header = md.match(headPat);

    if (header) {

        // parse yaml into js object
        header = yaml.safeLoad(header[0].replace(/---/g, ''));

    }

    text += (header.title || 'untitled') + os.EOL + os.EOL;

    // use marked with the custom renderer
    text += marked(md.replace(headPat, ''), {
        renderer: renderer
    });

    return text;

};

/*
exports.toText = function (fn, md) {

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
