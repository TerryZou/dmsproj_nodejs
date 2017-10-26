var WHITESPACE_CHARS = " \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004" +
    "\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000";

/**
 * Strip whitespace or other characters.
 * 
 * @param {String} str The string that will be trimmed.
 * @param {String} [chars] What kind of chars that needs to be stripped.
 * 
 * @return {String} The trimmed string.g.
 */
function StringTrimmer(str, chars) {
    return StringTrimmer.trim(str, chars || WHITESPACE_CHARS);
}

/**
 * Strip whitespace or other characters from the beginning and end of a 
 * string.
 * 
 * @param {String} str The string that will be trimmed.
 * @param {String} [chars] What kind of chars that needs to be stripped.
 * 
 * @return {String} The trimmed string.
 */
StringTrimmer.trim = function trim(str, chars) {
    chars = chars || WHITESPACE_CHARS;
    return this.trimLeft(this.trimRight(str, chars), chars);
}

/**
 * Strip whitespace or other characters from the beginning of a string.
 * 
 * @param {String} str The string that will be trimmed.
 * @param {String} [chars] What kind of chars that needs to be stripped.
 * 
 * @return {String} The trimmed string.
 */
StringTrimmer.trimLeft = function trim(str, chars) {
    chars = (chars || WHITESPACE_CHARS).split("");
    for (var i = 0; i < str.length; i++) {
        if (chars.indexOf(str[i]) === -1) break;
    }
    return str.substring(i);
}

/**
 * Strip whitespace or other characters from the end of a string.
 * 
 * @param {String} str The string that will be trimmed.
 * @param {String} [chars] What kind of chars that needs to be stripped.
 * 
 * @return {String} The trimmed string.
 */
StringTrimmer.trimRight = function trimRight(str, chars) {
    chars = (chars || WHITESPACE_CHARS).split("");
    for (var i = str.length - 1; i >= 0; i--) {
        if (chars.indexOf(str[i]) === -1) break;
    }
    return str.substring(0, i + 1);
}

/**
 * Apply to an object's prototype, e.g. `String.prototype`.
 * 
 * @param {Object} proto Normally, this should be `String.prototype`.
 */
StringTrimmer.applyTo = function applyTo(proto) {
    proto.trim = function(chars) {
        return StringTrimmer.trim(this, chars);
    };
    proto.trimLeft = function(chars) {
        return StringTrimmer.trimLeft(this, chars);
    };
    proto.trimRight = function(chars) {
        return StringTrimmer.trimRight(this, chars);
    };
}

if (typeof window == "object") {
    window.StringTrimmer = StringTrimmer;
    if (typeof define === "function") {
        //AMD
        define((require, exports, module) => {
            module.exports = StringTrimmer;
        });
    }
} else if (typeof module === "object" && module.exports) {
    //CommonJS
    module.exports = StringTrimmer;
}