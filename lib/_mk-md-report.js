// make and return json report file for the given markdown

var fs = require('fs'),
path = require('path'),
os = require('os'),
yaml = require('js-yaml'),
marked = require('marked'),
mkdirp = require('mkdirp'),

// patterns
headPat = /---[\s|\S]*---/,
spaceOrEOLPat = / |\r\n/;

exports.mkReport = function (md, options) {

    var report = {};

    // raw text
    report.text = require('./_md-to-text').toText(md, options.text);

    // tokens
    report.tokens = report.text.split(spaceOrEOLPat);

    return report;

};
