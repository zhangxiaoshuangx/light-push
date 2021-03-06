const crypto = require('crypto');
const objProToString = Object.prototype.toString;

exports.pick = pickFn;

exports.random = randomFn;

exports.isDate = function (value) { return objProToString.call(value) == '[object Date]' }

exports.isRegExp = function (value) { return objProToString.call(value) == '[object RegExp]' }

exports.isNumber = function (value) { return objProToString.call(value) == '[object Number]' }

exports.isString = function (value) { return objProToString.call(value) == '[object String]' }

exports.isBoolean = function (value) { return objProToString.call(value) == '[object Boolean]' }

exports.isObject = function (value) { return objProToString.call(value) == '[object Object]' }


/*------------------------------------分割线 -----------------------------*/

function pickFn(data, keys) {
  let newData = {};

  Object.keys(data).forEach(function (key) {
    if (keys.includes('**') || keys.includes(key)) {
      newData[key] = data[key];
    }
    if (keys.includes('-' + key)) {
      delete newData[key];
    }
  })

  return newData;
}


function randomFn(size = 10) {
  return new Promise(function (resolve, reject) {
    crypto.randomBytes(size, function (err, buf) {
      if (err) {
        reject(err);
      } else {
        resolve(buf.toString('hex'));
      }
    });
  });
}

