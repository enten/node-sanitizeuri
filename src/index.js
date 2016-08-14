'use strict';

const {format, parse} = require('url');
const {isArray} = Array;
const isBoolean  = obj => typeof obj === 'boolean';
const isString = obj => typeof obj === 'string';
const isUndefined = obj => typeof obj === 'undefined';

const DEFAULT_OPTIONS = {
  starts: true,
  ends: false
};

module.exports = function sanitizeUri(uri, options) {
  uri = (isArray(uri) ? uri.join('/') : (uri || '')).trim();
  options = options || {};

  if (isBoolean(arguments[1])) options = {starts: arguments[1]};
  if (isBoolean(arguments[2])) options.ends = arguments[2];

  let {starts, ends} = Object.assign({}, DEFAULT_OPTIONS, options);
  let urlObject = parse(uri);

  if (isString(urlObject.protocol)) {
    uri = uri.substring(urlObject.protocol.length);
  }

  if (urlObject.slashes) {
    uri = uri.substring(2);
  }

  uri = uri.split('/')
    .map(x => x.trim())
    .filter(x => !!x);

  if (urlObject.protocol && !!!urlObject.host) {
    urlObject.host = uri.shift();
  }

  uri = uri.join('/');

  if (starts === true && !uri.startsWith('/')) {
    uri = '/' + uri;
  }

  if (ends === true && uri !== '/' && !uri.endsWith('/')) {
    uri = uri + '/';
  }

  urlObject.pathname = uri;

  return format(urlObject);
};
