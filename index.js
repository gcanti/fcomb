//     fcomb 0.1.0
//     https://github.com/gcanti/fcomb
//     (c) 2014 Giulio Canti <giulio.canti@gmail.com>
//     fcomb may be freely distributed under the MIT license.

'use strict';

module.exports = {
  and: and,
  or: or,
  not: not,
  lt: lt,
  lte: lte,
  gt: gt,
  gte: gte,
  minLength: minLength,
  maxLength: maxLength,
  regexp: regexp
};

function and(f, g) {
  var ret = function and(x) {
    return f(x) && g(x);
  };
  ret.fmeta = {
    kind: 'and',
    f: f,
    g: g
  };
  return ret;
}

function or(f, g) {
  var ret = function or(x) {
    return f(x) || g(x);
  };
  ret.fmeta = {
    kind: 'or',
    f: f,
    g: g
  };
  return ret;
}

function not(f) {
  var ret = function not(x) {
    return !f(x);
  };
  ret.fmeta = {
    kind: 'not',
    f: f
  };
  return ret;
}

function lt(sup) {
  var ret = function lt(x) {
    return x < sup;
  };
  ret.fmeta = {
    kind: 'lt',
    sup: sup
  };
  return ret;
}

function lte(max) {
  var ret = function lte(x) {
    return x <= max;
  };
  ret.fmeta = {
    kind: 'lte',
    max: max
  };
  return ret;
}

function gt(inf) {
  var ret = function gt(x) {
    return x > inf;
  };
  ret.fmeta = {
    kind: 'gt',
    inf: inf
  };
  return ret;
}

function gte(min) {
  var ret = function gte(x) {
    return x >= min;
  };
  ret.fmeta = {
    kind: 'gte',
    min: min
  };
  return ret;
}

function maxLength(max) {
  var ret = function maxLength(x) {
    return x.length <= max;
  }
  ret.fmeta = {
    kind: 'maxLength',
    max: max
  };
  return ret;
}

function minLength(min) {
  var ret = function minLength(x) {
    return x.length >= min;
  }
  ret.fmeta = {
    kind: 'minLength',
    min: min
  };
  return ret;
}

function regexp(re, doc) {
  var ret = function regexp(x) {
    return re.test(x);
  }
  ret.fmeta = {
    kind: 'regexp',
    re: re
  };
  return ret;
}

