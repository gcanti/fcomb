var t = require('tcomb');

var format = t.util.format;

function getDoc(f) {
  return f.__doc__ || f.meta.doc;
}

function addDoc(f, doc) {
  f.__doc__ = doc;
  if (f.meta) {
    f.meta.doc = doc;
  } else {
    f.meta = {
      kind: 'irriducible',
      doc: doc
    };
  }
  return f;
}

function and(f, g, doc) {
  doc = doc || format('%s and %s', getDoc(f), getDoc(g));
  function and(x) {
    return f(x) && g(x);
  }
  and.meta = {
    kind: 'and',
    f: f,
    g: g,
    doc: doc
  };
  and.__doc__ = doc;
  return and;
}

function or(f, g, doc) {
  doc = doc || format('%s or %s', getDoc(f), getDoc(g));
  function or(x) {
    return f(x) || g(x);
  }
  or.meta = {
    kind: 'or',
    f: f,
    g: g,
    doc: doc
  };
  or.__doc__ = doc;
  return or;
}

function not(f, doc) {
  doc = doc || format('not %s', getDoc(f));
  function not(x) {
    return !f(x);
  }
  not.meta = {
    kind: 'not',
    f: f,
    doc: doc
  };
  not.__doc__ = doc;
  return not;
}

function lt(sup, doc) {
  doc = doc || format('less than %s', sup);
  function lt(x) {
    return x < sup;
  }
  lt.meta = {
    kind: 'lt',
    sup: sup,
    doc: doc
  };
  lt.__doc__ = doc;
  return lt;
}

function lte(max, doc) {
  doc = doc || format('less or equal to %s', max);
  function lte(x) {
    return x <= max;
  }
  lte.meta = {
    kind: 'lte',
    max: max,
    doc: doc
  };
  lte.__doc__ = doc;
  return lte;
}

function gt(inf, doc) {
  doc = doc || format('greater than %s', inf);
  function gt(x) {
    return x > inf;
  }
  gt.meta = {
    kind: 'gt',
    inf: inf,
    doc: doc
  };
  gt.__doc__ = doc;
  return gt;
}

function gte(min, doc) {
  doc = doc || format('greater or equal to %s', min);
  function gte(x) {
    return x >= min;
  }
  gte.meta = {
    kind: 'gte',
    min: min,
    doc: doc
  };
  gte.__doc__ = doc;
  return gte;
}

function maxLength(max, doc) {
  doc = doc || format('length less or equal to %s', max);
  function maxLength(x) {
    return x.length <= max;
  }
  maxLength.meta = {
    kind: 'maxLength',
    maxLength: max,
    doc: doc
  };
  maxLength.__doc__ = doc;
  return maxLength;
}

function minLength(min, doc) {
  doc = doc || format('length greater or equal to %s', min);
  function minLength(x) {
    return x.length >= min;
  }
  minLength.meta = {
    kind: 'minLength',
    minLength: min,
    doc: doc
  };
  minLength.__doc__ = doc;
  return minLength;
}

function regexp(re, doc) {
  doc = doc || format('pattern %s', re.toString());
  function regexp(x) {
    return re.test(x);
  }
  regexp.meta = {
    kind: 'regexp',
    re: re,
    doc: doc
  };
  regexp.__doc__ = doc;
  return regexp;
}

module.exports = {
  util: {
    addDoc: addDoc,
    getDoc: getDoc
  },
  and: and,
  or: or,
  not: not,
  lt: lt,
  lte: lte,
  gt: gt,
  gte: gte,
  maxLength: maxLength,
  minLength: minLength,
  regexp: regexp
};