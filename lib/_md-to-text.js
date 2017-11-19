// return plain text for the given markdown

var _ = require('lodash'),
os = require('os'),
yaml = require('js-yaml'),
marked = require('marked'),
removeMd = require('remove-markdown'),
mkdirp = require('mkdirp'),

// patterns
headPat = /---[\s|\S]*---/,
mdPat = /.md$/,
lineBr = /[\n\r]/g,

// default options
defaults = {

    renderCode: true,
    EOL: '\r\n',
    renderer: {}

},

// make a custom marked renderer for text only
// custom renderer for text

mkTextRenderer = function (options) {

    var renderer = new marked.Renderer();

    renderer.image = options.renderer.image || function (href, title, text) {

        // render nothing for any images
        return '';

    }

    renderer.code = options.renderer.code || function (code, lang) {

        return code.replace(lineBr, options.EOL) + options.EOL + options.EOL;

    }

    renderer.heading = options.renderer.heading || function (text, level) {

        return text + options.EOL + options.EOL;

    }

    renderer.paragraph = options.renderer.paragraph || function (text) {

        return text + options.EOL + options.EOL;

    };

    renderer.link = options.renderer.link || function (stringHref, stringTitle, stringText) {

        return stringText;

    };

    renderer.html = options.renderer.html || function (str) {

        return '';
    };

    return renderer;

};

// the toText method
exports.toText = function (md, options) {

    var text = '',
    header = md.match(headPat);

    options = options || {};

    options = _.merge(defaults, options);

    console.log(options);

    if (header) {

        // parse yaml into js object
        header = yaml.safeLoad(header[0].replace(/---/g, ''));

    }

    text += (header.title || 'untitled') + os.EOL + os.EOL;

    // use marked with the custom renderer
    text += marked(md.replace(headPat, ''), {
        renderer: mkTextRenderer(options)
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
