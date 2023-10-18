/**
 * Copy
 */
const toString = Object.prototype.toString;

function is(val, type) {
  return toString.call(val) === `[object ${type}]`;
}

function isDef(val) {
  return typeof val !== "undefined";
}

function isUndef(val) {
  return typeof val === "undefined";
}

function isNull(val) {
  return val === null;
}

function isWhitespace(val) {
  return val === "";
}

function isObject(val) {
  return !isNull(val) && is(val, "Object");
}

function isArray(val) {
  return val && Array.isArray(val);
}

function isString(val) {
  return is(val, "String");
}

function isNumber(val) {
  return is(val, "Number");
}

function isBoolean(val) {
  return is(val, "Boolean");
}

function isDate(val) {
  return is(val, "Date");
}

function isRegExp(val) {
  return is(val, "RegExp");
}

function isFunction(val) {
  return typeof val === "function";
}

function isPromise(val) {
  return (
    is(val, "Promise") &&
    isObject(val) &&
    isFunction(val.then) &&
    isFunction(val.catch)
  );
}

function isElement(val) {
  return isObject(val) && !!val.tagName;
}

function isWindow(val) {
  return typeof window !== "undefined" && isDef(window) && is(val, "Window");
}

function isNullOrUndef(val) {
  return isNull(val) || isUndef(val);
}

function isNullOrWhitespace(val) {
  return isNullOrUndef(val) || isWhitespace(val);
}

function isEmpty(val) {
  if (isArray(val) || isString(val)) {
    return val.length === 0;
  }

  if (val instanceof Map || val instanceof Set) {
    return val.size === 0;
  }

  if (isObject(val)) {
    return Object.keys(val).length === 0;
  }

  return false;
}

/**
 * * 类似mysql的IFNULL函数
 * * 第一个参数为null/undefined/'' 则返回第二个参数作为备用值，否则返回第一个参数
 * @param {Number|Boolean|String} val
 * @param {Number|Boolean|String} def
 * @returns
 */
function ifNull(val, def = "") {
  return isNullOrWhitespace(val) ? def : val;
}

function isUrl(path) {
  const reg =
    /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
  return reg.test(path);
}

/**
 * @param {string} path
 * @returns {Boolean}
 */
function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

module.exports = {
  is,
  isDef,
  isUndef,
  isNull,
  isWhitespace,
  isObject,
  isArray,
  isString,
  isNumber,
  isBoolean,
  isDate,
  isRegExp,
  isFunction,
  isPromise,
  isElement,
  isWindow,
  isNullOrUndef,
  isNullOrWhitespace,
  isEmpty,
  ifNull,
  isUrl,
  isExternal,
};
