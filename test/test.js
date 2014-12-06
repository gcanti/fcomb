'use strict';

var test = require('tape');
var f = require('../index');

function gt10(n) {
  return n > 10;
}

function gt0(n) {
  return n > 0;
}

function lt5(n) {
  return n < 5;
}

test('and', function (tape) {
  tape.plan(3);
  var fn = f.and(gt0, lt5);
  tape.deepEqual(false, fn(-1));
  tape.deepEqual(true, fn(3));
  tape.deepEqual(false, fn(6));
});

test('or', function (tape) {
  tape.plan(3);
  var fn = f.or(lt5, gt10);
  tape.deepEqual(true, fn(4));
  tape.deepEqual(false, fn(8));
  tape.deepEqual(true, fn(11));
});

test('or', function (tape) {
  tape.plan(3);
  var fn = f.not(gt0);
  tape.deepEqual(true, fn(-1));
  tape.deepEqual(true, fn(0));
  tape.deepEqual(false, fn(1));
});

test('lt', function (tape) {
  tape.plan(3);
  var fn = f.lt(10);
  tape.deepEqual(true, fn(0));
  tape.deepEqual(false, fn(10));
  tape.deepEqual(false, fn(11));
});

test('lte', function (tape) {
  tape.plan(3);
  var fn = f.lte(10);
  tape.deepEqual(true, fn(0));
  tape.deepEqual(true, fn(10));
  tape.deepEqual(false, fn(11));
});

test('gt', function (tape) {
  tape.plan(3);
  var fn = f.gt(10);
  tape.deepEqual(false, fn(0));
  tape.deepEqual(false, fn(10));
  tape.deepEqual(true, fn(11));
});

test('gte', function (tape) {
  tape.plan(3);
  var fn = f.gte(10);
  tape.deepEqual(false, fn(0));
  tape.deepEqual(true, fn(10));
  tape.deepEqual(true, fn(11));
});

test('maxLength', function (tape) {
  tape.plan(2);
  var fn = f.maxLength(3);
  tape.deepEqual(true, fn('aaa'));
  tape.deepEqual(false, fn('aaaa'));
});

test('minLength', function (tape) {
  tape.plan(2);
  var fn = f.minLength(3);
  tape.deepEqual(false, fn('aa'));
  tape.deepEqual(true, fn('aaa'));
});

test('regexp', function (tape) {
  tape.plan(2);
  var fn = f.regexp(/^a/);
  tape.deepEqual(true, fn('a'));
  tape.deepEqual(false, fn('b'));
});
