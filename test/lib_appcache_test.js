/*
 * grunt-appcache
 * http://canvace.com/
 *
 * Copyright (c) 2013 Canvace Srl
 * Licensed under the MIT license.
 */

'use strict';

var grunt = require('grunt');
var appcache = require('../tasks/lib/appcache').init(grunt);

exports.libAppCache = {
  setUp: function (done) {
    done();
  },

  parseVersionLine: function (test) {
    test.expect(2);
    test.deepEqual(
      appcache.parseVersionLine('# rev 1 - 2015-04-07T23:16:51.444Z'), {
        revision: 1,
        date: '2015-04-07T23:16:51.444Z',
      },
      'should correctly parse a well-formed version line');
    test.deepEqual(
      appcache.parseVersionLine('not a valid version line'), undefined,
      'should not pick up an ill-formed version line');
    test.done();
  },

  readManifest: {
    revisionNumber: function (test) {
      test.expect(1);

      var actual = appcache.readManifest('test/fixtures/read/revision.manifest');
      var expected = grunt.file.readJSON('test/expected/read/revision.json');
      test.deepEqual(actual, expected,
        'should correctly parse the manifest and save its revision number.');

      test.done();
    }
  },
};
