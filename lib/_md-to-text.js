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

// &#63; to ? helper
htmlEscapeToText = function(text) {

  return text.replace(/\&\#[0-9]*;/g, function(escapeCode) {

    return String.fromCharCode(escapeCode.match(/[0-9]+/));

  });

},

// default options
defaults = {

    headerTitle: true,
    headerInfo: true,
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

        if (options.renderCode) {

            return code.replace(lineBr, options.EOL) + options.EOL + options.EOL;

        }

        return '';
    }

    renderer.heading = options.renderer.heading || function (text, level) {

        return text + options.EOL + options.EOL;

    }

    renderer.paragraph = options.renderer.paragraph || function (text) {

        return htmlEscapeToText(text) + options.EOL + options.EOL;

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

    if (header) {

        // parse yaml into js object
        header = yaml.safeLoad(header[0].replace(/---/g, ''));

    }

    if (options.headerTitle) {

        text += (header.title || 'untitled') + options.EOL + options.EOL;

    }

    if (options.headerInfo && header) {

        _.each(header, function (val, key) {

            if (key != 'title') {

                text += key + ' : ' + val + options.EOL;

            }

        });
        text += options.EOL;

        //text += 'no header info' + options.EOL + options.EOL;

    }

    // use marked with the custom renderer
    text += marked(md.replace(headPat, ''), {
        renderer: mkTextRenderer(options)
    });

    return text;

};
