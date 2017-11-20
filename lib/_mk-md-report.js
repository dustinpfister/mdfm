// make and return json report file for the given markdown

var _ = require('lodash'),
fs = require('fs'),
path = require('path'),
os = require('os'),
yaml = require('js-yaml'),
marked = require('marked'),
mkdirp = require('mkdirp'),

// patterns
pat_head = /---[\s|\S]*---/,
//spaceOrEOLPat = / |\r\n/,
pat_stripdash = /---/g,
pat_return = /\r\n/g,
pat_removesp = /[\.,:]/g;

exports.mkReport = function (md, options) {

    var report = {};

    // raw text
    var text = require('./_md-to-text').toText(md, options.text).
        toLowerCase().
        replace(pat_return, ' ').replace(pat_removesp, ' ');

    // report header
    var header = md.match(pat_head);

    report.header = header ? yaml.safeLoad(header[0].replace(pat_stripdash, '')) : {};

    // tokens
    report.tokens = text.split(' ');

    // filter out empty strings
    report.tokens = report.tokens.filter(function (token) {

            return token != '';

        });

    // total word count
    report.word_ct = report.tokens.length;

    // word db
    report.word_db = [];

    // make a count for each one
    report.tokens.forEach(function (token) {

        var i = _.findIndex(report.word_db, function (obj) {

                return obj.token === token;

            });

        if (i === -1) {

            report.word_db.push({

                token: token,
                count: 1

            });

        } else {

            report.word_db[i].count += 1;

        }

    });

    report.word_db.sort(function (a, b) {

        return b.count - a.count;

    });

    return report;

};
