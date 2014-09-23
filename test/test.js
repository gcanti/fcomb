"use strict";
var assert = require('assert');
var f = require('../index');

var addDoc = f.util.addDoc;
var getDoc = f.util.getDoc;

//
// setup
//

var ok = function (x) { assert.strictEqual(true, x); };
var ko = function (x) { assert.strictEqual(false, x); };
var eq = assert.strictEqual;

var gt10 = addDoc(function gt10(n) {
  return n > 10;
}, 'greater then 10');

var gt0 = addDoc(function gt0(n) {
  return n > 0;
}, 'greater then 0');

var lt5 = addDoc(function lt5(n) {
  return n < 5;
}, 'less then 5');


describe('and', function () {

    it('should combine functions', function () {
      var fn = f.and(gt0, lt5);
      ko(fn(-1));
      ok(fn(3));
      ko(fn(6));
      eq(getDoc(fn), 'greater then 0 and less then 5');
    });

});

describe('or', function () {

    it('should combine functions', function () {
      var fn = f.or(lt5, gt10);
      ok(fn(4));
      ko(fn(8));
      ok(fn(11));
      eq(getDoc(fn), 'less then 5 or greater then 10');
    });

});

describe('not', function () {

    it('should combine functions', function () {
      var fn = f.not(gt0);
      ok(fn(-1));
      ok(fn(0));
      ko(fn(1));
      eq(getDoc(fn), 'not greater then 0');
    });

});

describe('lt', function () {

    it('should return a function', function () {
      var fn = f.lt(10);
      ok(fn(0));
      ko(fn(10));
      ko(fn(11));
      eq(getDoc(fn), 'less then 10');
    });

});

describe('lte', function () {

    it('should return a function', function () {
      var fn = f.lte(10);
      ok(fn(0));
      ok(fn(10));
      ko(fn(11));
      eq(getDoc(fn), 'less or equal to 10');
    });

});

describe('gt', function () {

    it('should return a function', function () {
      var fn = f.gt(10);
      ko(fn(0));
      ko(fn(10));
      ok(fn(11));
      eq(getDoc(fn), 'greater then 10');
    });

});

describe('gte', function () {

    it('should return a function', function () {
      var fn = f.gte(10);
      ko(fn(0));
      ok(fn(10));
      ok(fn(11));
      eq(getDoc(fn), 'greater or equal to 10');
    });

});

describe('maxLength', function () {

    it('should return a function', function () {
      var fn = f.maxLength(3);
      ok(fn('aaa'));
      ko(fn('aaaa'));
      eq(getDoc(fn), 'length less or equal to 3');
    });

});

describe('minLength', function () {

    it('should return a function', function () {
      var fn = f.minLength(3);
      ko(fn('aa'));
      ok(fn('aaa'));
      eq(getDoc(fn), 'length greater or equal to 3');
    });

});
