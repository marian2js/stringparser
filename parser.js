
var NOT_FOUND_STR = '<nothing>';

/**
 * Returns a String with handlebars like variables parsed
 *
 * @param {String} str
 * @param {Object} [obj]
 * @returns {String}
 */
var parser = function (str, obj) {
  var templateRegex = /{{([^}]+)}}/g;
  var result = str;
  var matches;
  var replace;
  var splitObj;
  var replaceTxt;

  while (matches = templateRegex.exec(str)) {
    splitObj = obj;
    replace = matches[1].trim().split('.');
    for (var i = 0; i < replace.length; i++) {
      if (!splitObj[replace[i]]) {
        replaceTxt = NOT_FOUND_STR;
        break;
      }
      splitObj = splitObj[replace[i]];
      replaceTxt = splitObj;
    }
    result = result.replace(matches[0], replaceTxt);
  }

  return result;
};

module.exports = parser;
