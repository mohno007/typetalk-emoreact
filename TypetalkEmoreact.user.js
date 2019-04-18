// ==UserScript==
// @name         Typetalk emoreact
// @namespace    https://github.com/mohno007/typetalk-emoreact
// @homepage     https://github.com/mohno007/typetalk-emoreact
// @downloadURL  https://mohno007.github.io/typetalk-emoreact/TypetalkEmoreact.user.js
// @updateURL    https://mohno007.github.io/typetalk-emoreact/TypetalkEmoreact.user.js
// @supportURL   https://github.com/mohno007/typetalk-emoreact/issues/new
// @version      0.1.12
// @description  Emoji Reaction
// @author       m-ohno
// @match        https://typetalk.com/*
// @grant        none
// ==/UserScript==
//
// Copyright (c) 2018 Motohiro OHNO
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

(function () {
  'use strict';

  var emojiRegex = function () {
    // https://mths.be/emoji
    return /\uD83C\uDFF4(?:\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74)\uDB40\uDC7F|\u200D\u2620\uFE0F)|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC68(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3])|(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3]))|\uD83D\uDC69\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3])|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\uD83D\uDC68(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|(?:(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)\uFE0F|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDD6-\uDDDD])(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\u200D[\u2640\u2642])|\uD83D\uDC69\u200D[\u2695\u2696\u2708])\uFE0F|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC68(?:\u200D(?:(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D[\uDC66\uDC67])|\uD83C[\uDFFB-\uDFFF])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3])|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF4\uD83C\uDDF2|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDB5\uDDB6\uDDD1-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDEEB\uDEEC\uDEF4-\uDEF9]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD70\uDD73-\uDD76\uDD7A\uDD7C-\uDDA2\uDDB0-\uDDB9\uDDC0-\uDDC2\uDDD0-\uDDFF])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEF9]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD70\uDD73-\uDD76\uDD7A\uDD7C-\uDDA2\uDDB0-\uDDB9\uDDC0-\uDDC2\uDDD0-\uDDFF])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC69\uDC6E\uDC70-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD26\uDD30-\uDD39\uDD3D\uDD3E\uDDB5\uDDB6\uDDB8\uDDB9\uDDD1-\uDDDD])/g;
  };

  var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function getCjsExportFromNamespace (n) {
  	return n && n.default || n;
  }

  /**
   * lodash (Custom Build) <https://lodash.com/>
   * Build: `lodash modularize exports="npm" -o ./`
   * Copyright jQuery Foundation and other contributors <https://jquery.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   */

  /** Used as references for various `Number` constants. */
  var MAX_SAFE_INTEGER = 9007199254740991;

  /** `Object#toString` result references. */
  var argsTag = '[object Arguments]',
      funcTag = '[object Function]',
      genTag = '[object GeneratorFunction]',
      mapTag = '[object Map]',
      objectTag = '[object Object]',
      promiseTag = '[object Promise]',
      setTag = '[object Set]',
      stringTag = '[object String]',
      weakMapTag = '[object WeakMap]';

  var dataViewTag = '[object DataView]';

  /**
   * Used to match `RegExp`
   * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
   */
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

  /** Used to detect host constructors (Safari). */
  var reIsHostCtor = /^\[object .+?Constructor\]$/;

  /** Used to detect unsigned integer values. */
  var reIsUint = /^(?:0|[1-9]\d*)$/;

  /** Used to compose unicode character classes. */
  var rsAstralRange = '\\ud800-\\udfff',
      rsComboMarksRange = '\\u0300-\\u036f\\ufe20-\\ufe23',
      rsComboSymbolsRange = '\\u20d0-\\u20f0',
      rsVarRange = '\\ufe0e\\ufe0f';

  /** Used to compose unicode capture groups. */
  var rsAstral = '[' + rsAstralRange + ']',
      rsCombo = '[' + rsComboMarksRange + rsComboSymbolsRange + ']',
      rsFitz = '\\ud83c[\\udffb-\\udfff]',
      rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
      rsNonAstral = '[^' + rsAstralRange + ']',
      rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
      rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
      rsZWJ = '\\u200d';

  /** Used to compose unicode regexes. */
  var reOptMod = rsModifier + '?',
      rsOptVar = '[' + rsVarRange + ']?',
      rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
      rsSeq = rsOptVar + reOptMod + rsOptJoin,
      rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

  /** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
  var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

  /** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
  var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange  + rsComboMarksRange + rsComboSymbolsRange + rsVarRange + ']');

  /** Detect free variable `global` from Node.js. */
  var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

  /** Detect free variable `self`. */
  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

  /** Used as a reference to the global object. */
  var root = freeGlobal || freeSelf || Function('return this')();

  /**
   * A specialized version of `_.map` for arrays without support for iteratee
   * shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the new mapped array.
   */
  function arrayMap(array, iteratee) {
    var index = -1,
        length = array ? array.length : 0,
        result = Array(length);

    while (++index < length) {
      result[index] = iteratee(array[index], index, array);
    }
    return result;
  }

  /**
   * Converts an ASCII `string` to an array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the converted array.
   */
  function asciiToArray(string) {
    return string.split('');
  }

  /**
   * The base implementation of `_.times` without support for iteratee shorthands
   * or max array length checks.
   *
   * @private
   * @param {number} n The number of times to invoke `iteratee`.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the array of results.
   */
  function baseTimes(n, iteratee) {
    var index = -1,
        result = Array(n);

    while (++index < n) {
      result[index] = iteratee(index);
    }
    return result;
  }

  /**
   * The base implementation of `_.values` and `_.valuesIn` which creates an
   * array of `object` property values corresponding to the property names
   * of `props`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array} props The property names to get values for.
   * @returns {Object} Returns the array of property values.
   */
  function baseValues(object, props) {
    return arrayMap(props, function(key) {
      return object[key];
    });
  }

  /**
   * Gets the value at `key` of `object`.
   *
   * @private
   * @param {Object} [object] The object to query.
   * @param {string} key The key of the property to get.
   * @returns {*} Returns the property value.
   */
  function getValue(object, key) {
    return object == null ? undefined : object[key];
  }

  /**
   * Checks if `string` contains Unicode symbols.
   *
   * @private
   * @param {string} string The string to inspect.
   * @returns {boolean} Returns `true` if a symbol is found, else `false`.
   */
  function hasUnicode(string) {
    return reHasUnicode.test(string);
  }

  /**
   * Checks if `value` is a host object in IE < 9.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
   */
  function isHostObject(value) {
    // Many host objects are `Object` objects that can coerce to strings
    // despite having improperly defined `toString` methods.
    var result = false;
    if (value != null && typeof value.toString != 'function') {
      try {
        result = !!(value + '');
      } catch (e) {}
    }
    return result;
  }

  /**
   * Converts `iterator` to an array.
   *
   * @private
   * @param {Object} iterator The iterator to convert.
   * @returns {Array} Returns the converted array.
   */
  function iteratorToArray(iterator) {
    var data,
        result = [];

    while (!(data = iterator.next()).done) {
      result.push(data.value);
    }
    return result;
  }

  /**
   * Converts `map` to its key-value pairs.
   *
   * @private
   * @param {Object} map The map to convert.
   * @returns {Array} Returns the key-value pairs.
   */
  function mapToArray(map) {
    var index = -1,
        result = Array(map.size);

    map.forEach(function(value, key) {
      result[++index] = [key, value];
    });
    return result;
  }

  /**
   * Creates a unary function that invokes `func` with its argument transformed.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {Function} transform The argument transform.
   * @returns {Function} Returns the new function.
   */
  function overArg(func, transform) {
    return function(arg) {
      return func(transform(arg));
    };
  }

  /**
   * Converts `set` to an array of its values.
   *
   * @private
   * @param {Object} set The set to convert.
   * @returns {Array} Returns the values.
   */
  function setToArray(set) {
    var index = -1,
        result = Array(set.size);

    set.forEach(function(value) {
      result[++index] = value;
    });
    return result;
  }

  /**
   * Converts `string` to an array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the converted array.
   */
  function stringToArray(string) {
    return hasUnicode(string)
      ? unicodeToArray(string)
      : asciiToArray(string);
  }

  /**
   * Converts a Unicode `string` to an array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the converted array.
   */
  function unicodeToArray(string) {
    return string.match(reUnicode) || [];
  }

  /** Used for built-in method references. */
  var funcProto = Function.prototype,
      objectProto = Object.prototype;

  /** Used to detect overreaching core-js shims. */
  var coreJsData = root['__core-js_shared__'];

  /** Used to detect methods masquerading as native. */
  var maskSrcKey = (function() {
    var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
    return uid ? ('Symbol(src)_1.' + uid) : '';
  }());

  /** Used to resolve the decompiled source of functions. */
  var funcToString = funcProto.toString;

  /** Used to check objects for own properties. */
  var hasOwnProperty = objectProto.hasOwnProperty;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var objectToString = objectProto.toString;

  /** Used to detect if a method is native. */
  var reIsNative = RegExp('^' +
    funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
    .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
  );

  /** Built-in value references. */
  var Symbol$1 = root.Symbol,
      iteratorSymbol = Symbol$1 ? Symbol$1.iterator : undefined,
      propertyIsEnumerable = objectProto.propertyIsEnumerable;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeKeys = overArg(Object.keys, Object);

  /* Built-in method references that are verified to be native. */
  var DataView = getNative(root, 'DataView'),
      Map$1 = getNative(root, 'Map'),
      Promise$1 = getNative(root, 'Promise'),
      Set = getNative(root, 'Set'),
      WeakMap = getNative(root, 'WeakMap');

  /** Used to detect maps, sets, and weakmaps. */
  var dataViewCtorString = toSource(DataView),
      mapCtorString = toSource(Map$1),
      promiseCtorString = toSource(Promise$1),
      setCtorString = toSource(Set),
      weakMapCtorString = toSource(WeakMap);

  /**
   * Creates an array of the enumerable property names of the array-like `value`.
   *
   * @private
   * @param {*} value The value to query.
   * @param {boolean} inherited Specify returning inherited property names.
   * @returns {Array} Returns the array of property names.
   */
  function arrayLikeKeys(value, inherited) {
    // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
    // Safari 9 makes `arguments.length` enumerable in strict mode.
    var result = (isArray(value) || isArguments(value))
      ? baseTimes(value.length, String)
      : [];

    var length = result.length,
        skipIndexes = !!length;

    for (var key in value) {
      if ((inherited || hasOwnProperty.call(value, key)) &&
          !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
        result.push(key);
      }
    }
    return result;
  }

  /**
   * The base implementation of `getTag`.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */
  function baseGetTag(value) {
    return objectToString.call(value);
  }

  /**
   * The base implementation of `_.isNative` without bad shim checks.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a native function,
   *  else `false`.
   */
  function baseIsNative(value) {
    if (!isObject(value) || isMasked(value)) {
      return false;
    }
    var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
    return pattern.test(toSource(value));
  }

  /**
   * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */
  function baseKeys(object) {
    if (!isPrototype(object)) {
      return nativeKeys(object);
    }
    var result = [];
    for (var key in Object(object)) {
      if (hasOwnProperty.call(object, key) && key != 'constructor') {
        result.push(key);
      }
    }
    return result;
  }

  /**
   * Copies the values of `source` to `array`.
   *
   * @private
   * @param {Array} source The array to copy values from.
   * @param {Array} [array=[]] The array to copy values to.
   * @returns {Array} Returns `array`.
   */
  function copyArray(source, array) {
    var index = -1,
        length = source.length;

    array || (array = Array(length));
    while (++index < length) {
      array[index] = source[index];
    }
    return array;
  }

  /**
   * Gets the native function at `key` of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {string} key The key of the method to get.
   * @returns {*} Returns the function if it's native, else `undefined`.
   */
  function getNative(object, key) {
    var value = getValue(object, key);
    return baseIsNative(value) ? value : undefined;
  }

  /**
   * Gets the `toStringTag` of `value`.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */
  var getTag = baseGetTag;

  // Fallback for data views, maps, sets, and weak maps in IE 11,
  // for data views in Edge < 14, and promises in Node.js.
  if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
      (Map$1 && getTag(new Map$1) != mapTag) ||
      (Promise$1 && getTag(Promise$1.resolve()) != promiseTag) ||
      (Set && getTag(new Set) != setTag) ||
      (WeakMap && getTag(new WeakMap) != weakMapTag)) {
    getTag = function(value) {
      var result = objectToString.call(value),
          Ctor = result == objectTag ? value.constructor : undefined,
          ctorString = Ctor ? toSource(Ctor) : undefined;

      if (ctorString) {
        switch (ctorString) {
          case dataViewCtorString: return dataViewTag;
          case mapCtorString: return mapTag;
          case promiseCtorString: return promiseTag;
          case setCtorString: return setTag;
          case weakMapCtorString: return weakMapTag;
        }
      }
      return result;
    };
  }

  /**
   * Checks if `value` is a valid array-like index.
   *
   * @private
   * @param {*} value The value to check.
   * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
   * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
   */
  function isIndex(value, length) {
    length = length == null ? MAX_SAFE_INTEGER : length;
    return !!length &&
      (typeof value == 'number' || reIsUint.test(value)) &&
      (value > -1 && value % 1 == 0 && value < length);
  }

  /**
   * Checks if `func` has its source masked.
   *
   * @private
   * @param {Function} func The function to check.
   * @returns {boolean} Returns `true` if `func` is masked, else `false`.
   */
  function isMasked(func) {
    return !!maskSrcKey && (maskSrcKey in func);
  }

  /**
   * Checks if `value` is likely a prototype object.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
   */
  function isPrototype(value) {
    var Ctor = value && value.constructor,
        proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

    return value === proto;
  }

  /**
   * Converts `func` to its source code.
   *
   * @private
   * @param {Function} func The function to process.
   * @returns {string} Returns the source code.
   */
  function toSource(func) {
    if (func != null) {
      try {
        return funcToString.call(func);
      } catch (e) {}
      try {
        return (func + '');
      } catch (e) {}
    }
    return '';
  }

  /**
   * Checks if `value` is likely an `arguments` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
   *  else `false`.
   * @example
   *
   * _.isArguments(function() { return arguments; }());
   * // => true
   *
   * _.isArguments([1, 2, 3]);
   * // => false
   */
  function isArguments(value) {
    // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
    return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
      (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
  }

  /**
   * Checks if `value` is classified as an `Array` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an array, else `false`.
   * @example
   *
   * _.isArray([1, 2, 3]);
   * // => true
   *
   * _.isArray(document.body.children);
   * // => false
   *
   * _.isArray('abc');
   * // => false
   *
   * _.isArray(_.noop);
   * // => false
   */
  var isArray = Array.isArray;

  /**
   * Checks if `value` is array-like. A value is considered array-like if it's
   * not a function and has a `value.length` that's an integer greater than or
   * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
   * @example
   *
   * _.isArrayLike([1, 2, 3]);
   * // => true
   *
   * _.isArrayLike(document.body.children);
   * // => true
   *
   * _.isArrayLike('abc');
   * // => true
   *
   * _.isArrayLike(_.noop);
   * // => false
   */
  function isArrayLike(value) {
    return value != null && isLength(value.length) && !isFunction(value);
  }

  /**
   * This method is like `_.isArrayLike` except that it also checks if `value`
   * is an object.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an array-like object,
   *  else `false`.
   * @example
   *
   * _.isArrayLikeObject([1, 2, 3]);
   * // => true
   *
   * _.isArrayLikeObject(document.body.children);
   * // => true
   *
   * _.isArrayLikeObject('abc');
   * // => false
   *
   * _.isArrayLikeObject(_.noop);
   * // => false
   */
  function isArrayLikeObject(value) {
    return isObjectLike(value) && isArrayLike(value);
  }

  /**
   * Checks if `value` is classified as a `Function` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a function, else `false`.
   * @example
   *
   * _.isFunction(_);
   * // => true
   *
   * _.isFunction(/abc/);
   * // => false
   */
  function isFunction(value) {
    // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 8-9 which returns 'object' for typed array and other constructors.
    var tag = isObject(value) ? objectToString.call(value) : '';
    return tag == funcTag || tag == genTag;
  }

  /**
   * Checks if `value` is a valid array-like length.
   *
   * **Note:** This method is loosely based on
   * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
   * @example
   *
   * _.isLength(3);
   * // => true
   *
   * _.isLength(Number.MIN_VALUE);
   * // => false
   *
   * _.isLength(Infinity);
   * // => false
   *
   * _.isLength('3');
   * // => false
   */
  function isLength(value) {
    return typeof value == 'number' &&
      value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
  }

  /**
   * Checks if `value` is the
   * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
   * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an object, else `false`.
   * @example
   *
   * _.isObject({});
   * // => true
   *
   * _.isObject([1, 2, 3]);
   * // => true
   *
   * _.isObject(_.noop);
   * // => true
   *
   * _.isObject(null);
   * // => false
   */
  function isObject(value) {
    var type = typeof value;
    return !!value && (type == 'object' || type == 'function');
  }

  /**
   * Checks if `value` is object-like. A value is object-like if it's not `null`
   * and has a `typeof` result of "object".
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
   * @example
   *
   * _.isObjectLike({});
   * // => true
   *
   * _.isObjectLike([1, 2, 3]);
   * // => true
   *
   * _.isObjectLike(_.noop);
   * // => false
   *
   * _.isObjectLike(null);
   * // => false
   */
  function isObjectLike(value) {
    return !!value && typeof value == 'object';
  }

  /**
   * Checks if `value` is classified as a `String` primitive or object.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a string, else `false`.
   * @example
   *
   * _.isString('abc');
   * // => true
   *
   * _.isString(1);
   * // => false
   */
  function isString(value) {
    return typeof value == 'string' ||
      (!isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag);
  }

  /**
   * Converts `value` to an array.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {Array} Returns the converted array.
   * @example
   *
   * _.toArray({ 'a': 1, 'b': 2 });
   * // => [1, 2]
   *
   * _.toArray('abc');
   * // => ['a', 'b', 'c']
   *
   * _.toArray(1);
   * // => []
   *
   * _.toArray(null);
   * // => []
   */
  function toArray(value) {
    if (!value) {
      return [];
    }
    if (isArrayLike(value)) {
      return isString(value) ? stringToArray(value) : copyArray(value);
    }
    if (iteratorSymbol && value[iteratorSymbol]) {
      return iteratorToArray(value[iteratorSymbol]());
    }
    var tag = getTag(value),
        func = tag == mapTag ? mapToArray : (tag == setTag ? setToArray : values);

    return func(value);
  }

  /**
   * Creates an array of the own enumerable property names of `object`.
   *
   * **Note:** Non-object values are coerced to objects. See the
   * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
   * for more details.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Object
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.keys(new Foo);
   * // => ['a', 'b'] (iteration order is not guaranteed)
   *
   * _.keys('hi');
   * // => ['0', '1']
   */
  function keys(object) {
    return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
  }

  /**
   * Creates an array of the own enumerable string keyed property values of `object`.
   *
   * **Note:** Non-object values are coerced to objects.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Object
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property values.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.values(new Foo);
   * // => [1, 2] (iteration order is not guaranteed)
   *
   * _.values('hi');
   * // => ['h', 'i']
   */
  function values(object) {
    return object ? baseValues(object, keys(object)) : [];
  }

  var lodash_toarray = toArray;

  var interrobang = "⁉️";
  var tm = "™️";
  var information_source = "ℹ️";
  var left_right_arrow = "↔️";
  var arrow_up_down = "↕️";
  var arrow_upper_left = "↖️";
  var arrow_upper_right = "↗️";
  var arrow_lower_right = "↘️";
  var arrow_lower_left = "↙️";
  var keyboard = "⌨";
  var sunny = "☀️";
  var cloud = "☁️";
  var umbrella = "☔️";
  var showman = "☃";
  var comet = "☄";
  var ballot_box_with_check = "☑️";
  var coffee = "☕️";
  var shamrock = "☘";
  var skull_and_crossbones = "☠";
  var radioactive_sign = "☢";
  var biohazard_sign = "☣";
  var orthodox_cross = "☦";
  var wheel_of_dharma = "☸";
  var white_frowning_face = "☹";
  var aries = "♈️";
  var taurus = "♉️";
  var sagittarius = "♐️";
  var capricorn = "♑️";
  var aquarius = "♒️";
  var pisces = "♓️";
  var spades = "♠️";
  var clubs = "♣️";
  var hearts = "♥️";
  var diamonds = "♦️";
  var hotsprings = "♨️";
  var hammer_and_pick = "⚒";
  var anchor = "⚓️";
  var crossed_swords = "⚔";
  var scales = "⚖";
  var alembic = "⚗";
  var gear = "⚙";
  var scissors = "✂️";
  var white_check_mark = "✅";
  var airplane = "✈️";
  var email = "✉️";
  var envelope = "✉️";
  var black_nib = "✒️";
  var heavy_check_mark = "✔️";
  var heavy_multiplication_x = "✖️";
  var star_of_david = "✡";
  var sparkles = "✨";
  var eight_spoked_asterisk = "✳️";
  var eight_pointed_black_star = "✴️";
  var snowflake = "❄️";
  var sparkle = "❇️";
  var question = "❓";
  var grey_question = "❔";
  var grey_exclamation = "❕";
  var exclamation = "❗️";
  var heavy_exclamation_mark = "❗️";
  var heavy_heart_exclamation_mark_ornament = "❣";
  var heart = "❤️";
  var heavy_plus_sign = "➕";
  var heavy_minus_sign = "➖";
  var heavy_division_sign = "➗";
  var arrow_heading_up = "⤴️";
  var arrow_heading_down = "⤵️";
  var wavy_dash = "〰️";
  var congratulations = "㊗️";
  var secret = "㊙️";
  var copyright = "©️";
  var registered = "®️";
  var bangbang = "‼️";
  var leftwards_arrow_with_hook = "↩️";
  var arrow_right_hook = "↪️";
  var watch = "⌚️";
  var hourglass = "⌛️";
  var fast_forward = "⏩";
  var rewind = "⏪";
  var arrow_double_up = "⏫";
  var arrow_double_down = "⏬";
  var black_right_pointing_double_triangle_with_vertical_bar = "⏭";
  var black_left_pointing_double_triangle_with_vertical_bar = "⏮";
  var black_right_pointing_triangle_with_double_vertical_bar = "⏯";
  var alarm_clock = "⏰";
  var stopwatch = "⏱";
  var timer_clock = "⏲";
  var hourglass_flowing_sand = "⏳";
  var double_vertical_bar = "⏸";
  var black_square_for_stop = "⏹";
  var black_circle_for_record = "⏺";
  var m = "Ⓜ️";
  var black_small_square = "▪️";
  var white_small_square = "▫️";
  var arrow_forward = "▶️";
  var arrow_backward = "◀️";
  var white_medium_square = "◻️";
  var black_medium_square = "◼️";
  var white_medium_small_square = "◽️";
  var black_medium_small_square = "◾️";
  var phone = "☎️";
  var telephone = "☎️";
  var point_up = "☝️";
  var star_and_crescent = "☪";
  var peace_symbol = "☮";
  var yin_yang = "☯";
  var relaxed = "☺️";
  var gemini = "♊️";
  var cancer = "♋️";
  var leo = "♌️";
  var virgo = "♍️";
  var libra = "♎️";
  var scorpius = "♏️";
  var recycle = "♻️";
  var wheelchair = "♿️";
  var atom_symbol = "⚛";
  var fleur_de_lis = "⚜";
  var warning = "⚠️";
  var zap = "⚡️";
  var white_circle = "⚪️";
  var black_circle = "⚫️";
  var coffin = "⚰";
  var funeral_urn = "⚱";
  var soccer = "⚽️";
  var baseball = "⚾️";
  var snowman = "⛄️";
  var partly_sunny = "⛅️";
  var thunder_cloud_and_rain = "⛈";
  var ophiuchus = "⛎";
  var pick = "⛏";
  var helmet_with_white_cross = "⛑";
  var chains = "⛓";
  var no_entry = "⛔️";
  var shinto_shrine = "⛩";
  var church = "⛪️";
  var mountain = "⛰";
  var umbrella_on_ground = "⛱";
  var fountain = "⛲️";
  var golf = "⛳️";
  var ferry = "⛴";
  var boat = "⛵️";
  var sailboat = "⛵️";
  var skier = "⛷";
  var ice_skate = "⛸";
  var person_with_ball = "⛹";
  var tent = "⛺️";
  var fuelpump = "⛽️";
  var fist = "✊";
  var hand = "✋";
  var raised_hand = "✋";
  var v = "✌️";
  var writing_hand = "✍";
  var pencil2 = "✏️";
  var latin_cross = "✝";
  var x = "❌";
  var negative_squared_cross_mark = "❎";
  var arrow_right = "➡️";
  var curly_loop = "➰";
  var loop = "➿";
  var arrow_left = "⬅️";
  var arrow_up = "⬆️";
  var arrow_down = "⬇️";
  var black_large_square = "⬛️";
  var white_large_square = "⬜️";
  var star = "⭐️";
  var o = "⭕️";
  var part_alternation_mark = "〽️";
  var mahjong = "🀄️";
  var black_joker = "🃏";
  var a = "🅰️";
  var b = "🅱️";
  var o2 = "🅾️";
  var parking = "🅿️";
  var ab = "🆎";
  var cl = "🆑";
  var cool = "🆒";
  var free = "🆓";
  var id = "🆔";
  var ng = "🆖";
  var ok = "🆗";
  var sos = "🆘";
  var up = "🆙";
  var vs = "🆚";
  var koko = "🈁";
  var sa = "🈂️";
  var u7121 = "🈚️";
  var u6307 = "🈯️";
  var u7981 = "🈲";
  var u7a7a = "🈳";
  var u5408 = "🈴";
  var u6e80 = "🈵";
  var u6709 = "🈶";
  var u6708 = "🈷️";
  var u7533 = "🈸";
  var u5272 = "🈹";
  var u55b6 = "🈺";
  var ideograph_advantage = "🉐";
  var accept = "🉑";
  var cyclone = "🌀";
  var foggy = "🌁";
  var closed_umbrella = "🌂";
  var night_with_stars = "🌃";
  var sunrise_over_mountains = "🌄";
  var sunrise = "🌅";
  var city_sunset = "🌆";
  var city_sunrise = "🌇";
  var rainbow = "🌈";
  var bridge_at_night = "🌉";
  var ocean = "🌊";
  var volcano = "🌋";
  var milky_way = "🌌";
  var earth_africa = "🌍";
  var earth_americas = "🌎";
  var earth_asia = "🌏";
  var globe_with_meridians = "🌐";
  var new_moon = "🌑";
  var waxing_crescent_moon = "🌒";
  var first_quarter_moon = "🌓";
  var moon = "🌔";
  var waxing_gibbous_moon = "🌔";
  var full_moon = "🌕";
  var waning_gibbous_moon = "🌖";
  var last_quarter_moon = "🌗";
  var waning_crescent_moon = "🌘";
  var crescent_moon = "🌙";
  var new_moon_with_face = "🌚";
  var first_quarter_moon_with_face = "🌛";
  var last_quarter_moon_with_face = "🌜";
  var full_moon_with_face = "🌝";
  var sun_with_face = "🌞";
  var star2 = "🌟";
  var stars = "🌠";
  var thermometer = "🌡";
  var mostly_sunny = "🌤";
  var sun_small_cloud = "🌤";
  var barely_sunny = "🌥";
  var sun_behind_cloud = "🌥";
  var partly_sunny_rain = "🌦";
  var sun_behind_rain_cloud = "🌦";
  var rain_cloud = "🌧";
  var snow_cloud = "🌨";
  var lightning = "🌩";
  var lightning_cloud = "🌩";
  var tornado = "🌪";
  var tornado_cloud = "🌪";
  var fog = "🌫";
  var wind_blowing_face = "🌬";
  var hotdog = "🌭";
  var taco = "🌮";
  var burrito = "🌯";
  var chestnut = "🌰";
  var seedling = "🌱";
  var evergreen_tree = "🌲";
  var deciduous_tree = "🌳";
  var palm_tree = "🌴";
  var cactus = "🌵";
  var hot_pepper = "🌶";
  var tulip = "🌷";
  var cherry_blossom = "🌸";
  var rose = "🌹";
  var hibiscus = "🌺";
  var sunflower = "🌻";
  var blossom = "🌼";
  var corn = "🌽";
  var ear_of_rice = "🌾";
  var herb = "🌿";
  var four_leaf_clover = "🍀";
  var maple_leaf = "🍁";
  var fallen_leaf = "🍂";
  var leaves = "🍃";
  var mushroom = "🍄";
  var tomato = "🍅";
  var eggplant = "🍆";
  var grapes = "🍇";
  var melon = "🍈";
  var watermelon = "🍉";
  var tangerine = "🍊";
  var lemon = "🍋";
  var banana = "🍌";
  var pineapple = "🍍";
  var apple = "🍎";
  var green_apple = "🍏";
  var pear = "🍐";
  var peach = "🍑";
  var cherries = "🍒";
  var strawberry = "🍓";
  var hamburger = "🍔";
  var pizza = "🍕";
  var meat_on_bone = "🍖";
  var poultry_leg = "🍗";
  var rice_cracker = "🍘";
  var rice_ball = "🍙";
  var rice = "🍚";
  var curry = "🍛";
  var ramen = "🍜";
  var spaghetti = "🍝";
  var bread = "🍞";
  var fries = "🍟";
  var sweet_potato = "🍠";
  var dango = "🍡";
  var oden = "🍢";
  var sushi = "🍣";
  var fried_shrimp = "🍤";
  var fish_cake = "🍥";
  var icecream = "🍦";
  var shaved_ice = "🍧";
  var ice_cream = "🍨";
  var doughnut = "🍩";
  var cookie = "🍪";
  var chocolate_bar = "🍫";
  var candy = "🍬";
  var lollipop = "🍭";
  var custard = "🍮";
  var honey_pot = "🍯";
  var cake = "🍰";
  var bento = "🍱";
  var stew = "🍲";
  var egg = "🍳";
  var fork_and_knife = "🍴";
  var tea = "🍵";
  var sake = "🍶";
  var wine_glass = "🍷";
  var cocktail = "🍸";
  var tropical_drink = "🍹";
  var beer = "🍺";
  var beers = "🍻";
  var baby_bottle = "🍼";
  var knife_fork_plate = "🍽";
  var champagne = "🍾";
  var popcorn = "🍿";
  var ribbon = "🎀";
  var gift = "🎁";
  var birthday = "🎂";
  var jack_o_lantern = "🎃";
  var christmas_tree = "🎄";
  var santa = "🎅";
  var fireworks = "🎆";
  var sparkler = "🎇";
  var balloon = "🎈";
  var tada = "🎉";
  var confetti_ball = "🎊";
  var tanabata_tree = "🎋";
  var crossed_flags = "🎌";
  var bamboo = "🎍";
  var dolls = "🎎";
  var flags = "🎏";
  var wind_chime = "🎐";
  var rice_scene = "🎑";
  var school_satchel = "🎒";
  var mortar_board = "🎓";
  var medal = "🎖";
  var reminder_ribbon = "🎗";
  var studio_microphone = "🎙";
  var level_slider = "🎚";
  var control_knobs = "🎛";
  var film_frames = "🎞";
  var admission_tickets = "🎟";
  var carousel_horse = "🎠";
  var ferris_wheel = "🎡";
  var roller_coaster = "🎢";
  var fishing_pole_and_fish = "🎣";
  var microphone = "🎤";
  var movie_camera = "🎥";
  var cinema = "🎦";
  var headphones = "🎧";
  var art = "🎨";
  var tophat = "🎩";
  var circus_tent = "🎪";
  var ticket = "🎫";
  var clapper = "🎬";
  var performing_arts = "🎭";
  var video_game = "🎮";
  var dart = "🎯";
  var slot_machine = "🎰";
  var game_die = "🎲";
  var bowling = "🎳";
  var flower_playing_cards = "🎴";
  var musical_note = "🎵";
  var notes = "🎶";
  var saxophone = "🎷";
  var guitar = "🎸";
  var musical_keyboard = "🎹";
  var trumpet = "🎺";
  var violin = "🎻";
  var musical_score = "🎼";
  var running_shirt_with_sash = "🎽";
  var tennis = "🎾";
  var ski = "🎿";
  var basketball = "🏀";
  var checkered_flag = "🏁";
  var snowboarder = "🏂";
  var runner = "🏃";
  var running = "🏃";
  var surfer = "🏄";
  var sports_medal = "🏅";
  var trophy = "🏆";
  var horse_racing = "🏇";
  var football = "🏈";
  var rugby_football = "🏉";
  var swimmer = "🏊";
  var weight_lifter = "🏋";
  var golfer = "🏌";
  var racing_motorcycle = "🏍";
  var racing_car = "🏎";
  var cricket_bat_and_ball = "🏏";
  var volleyball = "🏐";
  var field_hockey_stick_and_ball = "🏑";
  var ice_hockey_stick_and_puck = "🏒";
  var table_tennis_paddle_and_ball = "🏓";
  var snow_capped_mountain = "🏔";
  var camping = "🏕";
  var beach_with_umbrella = "🏖";
  var building_construction = "🏗";
  var house_buildings = "🏘";
  var cityscape = "🏙";
  var derelict_house_building = "🏚";
  var classical_building = "🏛";
  var desert = "🏜";
  var desert_island = "🏝";
  var national_park = "🏞";
  var stadium = "🏟";
  var house = "🏠";
  var house_with_garden = "🏡";
  var office = "🏢";
  var post_office = "🏣";
  var european_post_office = "🏤";
  var hospital = "🏥";
  var bank = "🏦";
  var atm = "🏧";
  var hotel = "🏨";
  var love_hotel = "🏩";
  var convenience_store = "🏪";
  var school = "🏫";
  var department_store = "🏬";
  var factory = "🏭";
  var izakaya_lantern = "🏮";
  var lantern = "🏮";
  var japanese_castle = "🏯";
  var european_castle = "🏰";
  var waving_white_flag = "🏳";
  var waving_black_flag = "🏴";
  var rosette = "🏵";
  var label = "🏷";
  var badminton_racquet_and_shuttlecock = "🏸";
  var bow_and_arrow = "🏹";
  var amphora = "🏺";
  var rat = "🐀";
  var mouse2 = "🐁";
  var ox = "🐂";
  var water_buffalo = "🐃";
  var cow2 = "🐄";
  var tiger2 = "🐅";
  var leopard = "🐆";
  var rabbit2 = "🐇";
  var cat2 = "🐈";
  var dragon = "🐉";
  var crocodile = "🐊";
  var whale2 = "🐋";
  var snail = "🐌";
  var snake = "🐍";
  var racehorse = "🐎";
  var ram = "🐏";
  var goat = "🐐";
  var sheep = "🐑";
  var monkey = "🐒";
  var rooster = "🐓";
  var chicken = "🐔";
  var dog2 = "🐕";
  var pig2 = "🐖";
  var boar = "🐗";
  var elephant = "🐘";
  var octopus = "🐙";
  var shell = "🐚";
  var bug = "🐛";
  var ant = "🐜";
  var bee = "🐝";
  var honeybee = "🐝";
  var beetle = "🐞";
  var fish = "🐟";
  var tropical_fish = "🐠";
  var blowfish = "🐡";
  var turtle = "🐢";
  var hatching_chick = "🐣";
  var baby_chick = "🐤";
  var hatched_chick = "🐥";
  var bird = "🐦";
  var penguin = "🐧";
  var koala = "🐨";
  var poodle = "🐩";
  var dromedary_camel = "🐪";
  var camel = "🐫";
  var dolphin = "🐬";
  var flipper = "🐬";
  var mouse = "🐭";
  var cow = "🐮";
  var tiger = "🐯";
  var rabbit = "🐰";
  var cat = "🐱";
  var dragon_face = "🐲";
  var whale = "🐳";
  var horse = "🐴";
  var monkey_face = "🐵";
  var dog = "🐶";
  var pig = "🐷";
  var frog = "🐸";
  var hamster = "🐹";
  var wolf = "🐺";
  var bear = "🐻";
  var panda_face = "🐼";
  var pig_nose = "🐽";
  var feet = "🐾";
  var paw_prints = "🐾";
  var chipmunk = "🐿";
  var eyes = "👀";
  var eye = "👁";
  var ear = "👂";
  var nose = "👃";
  var lips = "👄";
  var tongue = "👅";
  var point_up_2 = "👆";
  var point_down = "👇";
  var point_left = "👈";
  var point_right = "👉";
  var facepunch = "👊";
  var punch = "👊";
  var wave = "👋";
  var ok_hand = "👌";
  var thumbsup = "👍";
  var thumbsdown = "👎";
  var clap = "👏";
  var open_hands = "👐";
  var crown = "👑";
  var womans_hat = "👒";
  var eyeglasses = "👓";
  var necktie = "👔";
  var shirt = "👕";
  var tshirt = "👕";
  var jeans = "👖";
  var dress = "👗";
  var kimono = "👘";
  var bikini = "👙";
  var womans_clothes = "👚";
  var purse = "👛";
  var handbag = "👜";
  var pouch = "👝";
  var mans_shoe = "👞";
  var shoe = "👞";
  var athletic_shoe = "👟";
  var high_heel = "👠";
  var sandal = "👡";
  var boot = "👢";
  var footprints = "👣";
  var bust_in_silhouette = "👤";
  var busts_in_silhouette = "👥";
  var boy = "👦";
  var girl = "👧";
  var man = "👨";
  var woman = "👩";
  var family = "👨‍👩‍👦";
  var couple = "👫";
  var man_and_woman_holding_hands = "👫";
  var two_men_holding_hands = "👬";
  var two_women_holding_hands = "👭";
  var cop = "👮";
  var dancers = "👯";
  var bride_with_veil = "👰";
  var person_with_blond_hair = "👱";
  var man_with_gua_pi_mao = "👲";
  var man_with_turban = "👳";
  var older_man = "👴";
  var older_woman = "👵";
  var baby = "👶";
  var construction_worker = "👷";
  var princess = "👸";
  var japanese_ogre = "👹";
  var japanese_goblin = "👺";
  var ghost = "👻";
  var angel = "👼";
  var alien = "👽";
  var space_invader = "👾";
  var imp = "👿";
  var skull = "💀";
  var information_desk_person = "💁";
  var guardsman = "💂";
  var dancer = "💃";
  var lipstick = "💄";
  var nail_care = "💅";
  var massage = "💆";
  var haircut = "💇";
  var barber = "💈";
  var syringe = "💉";
  var pill = "💊";
  var kiss = "💋";
  var love_letter = "💌";
  var ring = "💍";
  var gem = "💎";
  var couplekiss = "💏";
  var bouquet = "💐";
  var couple_with_heart = "💑";
  var wedding = "💒";
  var heartbeat = "💓";
  var broken_heart = "💔";
  var two_hearts = "💕";
  var sparkling_heart = "💖";
  var heartpulse = "💗";
  var cupid = "💘";
  var blue_heart = "💙";
  var green_heart = "💚";
  var yellow_heart = "💛";
  var purple_heart = "💜";
  var gift_heart = "💝";
  var revolving_hearts = "💞";
  var heart_decoration = "💟";
  var diamond_shape_with_a_dot_inside = "💠";
  var bulb = "💡";
  var anger = "💢";
  var bomb = "💣";
  var zzz = "💤";
  var boom = "💥";
  var collision = "💥";
  var sweat_drops = "💦";
  var droplet = "💧";
  var dash = "💨";
  var hankey = "💩";
  var poop = "💩";
  var shit = "💩";
  var muscle = "💪";
  var dizzy = "💫";
  var speech_balloon = "💬";
  var thought_balloon = "💭";
  var white_flower = "💮";
  var moneybag = "💰";
  var currency_exchange = "💱";
  var heavy_dollar_sign = "💲";
  var credit_card = "💳";
  var yen = "💴";
  var dollar = "💵";
  var euro = "💶";
  var pound = "💷";
  var money_with_wings = "💸";
  var chart = "💹";
  var seat = "💺";
  var computer = "💻";
  var briefcase = "💼";
  var minidisc = "💽";
  var floppy_disk = "💾";
  var cd = "💿";
  var dvd = "📀";
  var file_folder = "📁";
  var open_file_folder = "📂";
  var page_with_curl = "📃";
  var page_facing_up = "📄";
  var date = "📅";
  var calendar = "📆";
  var card_index = "📇";
  var chart_with_upwards_trend = "📈";
  var chart_with_downwards_trend = "📉";
  var bar_chart = "📊";
  var clipboard = "📋";
  var pushpin = "📌";
  var round_pushpin = "📍";
  var paperclip = "📎";
  var straight_ruler = "📏";
  var triangular_ruler = "📐";
  var bookmark_tabs = "📑";
  var ledger = "📒";
  var notebook = "📓";
  var notebook_with_decorative_cover = "📔";
  var closed_book = "📕";
  var book = "📖";
  var open_book = "📖";
  var green_book = "📗";
  var blue_book = "📘";
  var orange_book = "📙";
  var books = "📚";
  var name_badge = "📛";
  var scroll = "📜";
  var memo = "📝";
  var pencil = "📝";
  var telephone_receiver = "📞";
  var pager = "📟";
  var fax = "📠";
  var satellite = "🛰";
  var loudspeaker = "📢";
  var mega = "📣";
  var outbox_tray = "📤";
  var inbox_tray = "📥";
  var incoming_envelope = "📨";
  var envelope_with_arrow = "📩";
  var mailbox_closed = "📪";
  var mailbox = "📫";
  var mailbox_with_mail = "📬";
  var mailbox_with_no_mail = "📭";
  var postbox = "📮";
  var postal_horn = "📯";
  var newspaper = "📰";
  var iphone = "📱";
  var calling = "📲";
  var vibration_mode = "📳";
  var mobile_phone_off = "📴";
  var no_mobile_phones = "📵";
  var signal_strength = "📶";
  var camera = "📷";
  var camera_with_flash = "📸";
  var video_camera = "📹";
  var tv = "📺";
  var radio = "📻";
  var vhs = "📼";
  var film_projector = "📽";
  var prayer_beads = "📿";
  var twisted_rightwards_arrows = "🔀";
  var repeat = "🔁";
  var repeat_one = "🔂";
  var arrows_clockwise = "🔃";
  var arrows_counterclockwise = "🔄";
  var low_brightness = "🔅";
  var high_brightness = "🔆";
  var mute = "🔇";
  var speaker = "🔈";
  var sound = "🔉";
  var loud_sound = "🔊";
  var battery = "🔋";
  var electric_plug = "🔌";
  var mag = "🔍";
  var mag_right = "🔎";
  var lock_with_ink_pen = "🔏";
  var closed_lock_with_key = "🔐";
  var key = "🔑";
  var lock = "🔒";
  var unlock = "🔓";
  var bell = "🔔";
  var no_bell = "🔕";
  var bookmark = "🔖";
  var link = "🔗";
  var radio_button = "🔘";
  var back = "🔙";
  var end = "🔚";
  var on = "🔛";
  var soon = "🔜";
  var top = "🔝";
  var underage = "🔞";
  var keycap_ten = "🔟";
  var capital_abcd = "🔠";
  var abcd = "🔡";
  var symbols = "🔣";
  var abc = "🔤";
  var fire = "🔥";
  var flashlight = "🔦";
  var wrench = "🔧";
  var hammer = "🔨";
  var nut_and_bolt = "🔩";
  var hocho = "🔪";
  var knife = "🔪";
  var gun = "🔫";
  var microscope = "🔬";
  var telescope = "🔭";
  var crystal_ball = "🔮";
  var six_pointed_star = "🔯";
  var beginner = "🔰";
  var trident = "🔱";
  var black_square_button = "🔲";
  var white_square_button = "🔳";
  var red_circle = "🔴";
  var large_blue_circle = "🔵";
  var large_orange_diamond = "🔶";
  var large_blue_diamond = "🔷";
  var small_orange_diamond = "🔸";
  var small_blue_diamond = "🔹";
  var small_red_triangle = "🔺";
  var small_red_triangle_down = "🔻";
  var arrow_up_small = "🔼";
  var arrow_down_small = "🔽";
  var om_symbol = "🕉";
  var dove_of_peace = "🕊";
  var kaaba = "🕋";
  var mosque = "🕌";
  var synagogue = "🕍";
  var menorah_with_nine_branches = "🕎";
  var clock1 = "🕐";
  var clock2 = "🕑";
  var clock3 = "🕒";
  var clock4 = "🕓";
  var clock5 = "🕔";
  var clock6 = "🕕";
  var clock7 = "🕖";
  var clock8 = "🕗";
  var clock9 = "🕘";
  var clock10 = "🕙";
  var clock11 = "🕚";
  var clock12 = "🕛";
  var clock130 = "🕜";
  var clock230 = "🕝";
  var clock330 = "🕞";
  var clock430 = "🕟";
  var clock530 = "🕠";
  var clock630 = "🕡";
  var clock730 = "🕢";
  var clock830 = "🕣";
  var clock930 = "🕤";
  var clock1030 = "🕥";
  var clock1130 = "🕦";
  var clock1230 = "🕧";
  var candle = "🕯";
  var mantelpiece_clock = "🕰";
  var hole = "🕳";
  var man_in_business_suit_levitating = "🕴";
  var sleuth_or_spy = "🕵";
  var dark_sunglasses = "🕶";
  var spider = "🕷";
  var spider_web = "🕸";
  var joystick = "🕹";
  var linked_paperclips = "🖇";
  var lower_left_ballpoint_pen = "🖊";
  var lower_left_fountain_pen = "🖋";
  var lower_left_paintbrush = "🖌";
  var lower_left_crayon = "🖍";
  var raised_hand_with_fingers_splayed = "🖐";
  var middle_finger = "🖕";
  var reversed_hand_with_middle_finger_extended = "🖕";
  var desktop_computer = "🖥";
  var printer = "🖨";
  var three_button_mouse = "🖱";
  var trackball = "🖲";
  var frame_with_picture = "🖼";
  var card_index_dividers = "🗂";
  var card_file_box = "🗃";
  var file_cabinet = "🗄";
  var wastebasket = "🗑";
  var spiral_note_pad = "🗒";
  var spiral_calendar_pad = "🗓";
  var compression = "🗜";
  var old_key = "🗝";
  var rolled_up_newspaper = "🗞";
  var dagger_knife = "🗡";
  var speaking_head_in_silhouette = "🗣";
  var left_speech_bubble = "🗨";
  var right_anger_bubble = "🗯";
  var ballot_box_with_ballot = "🗳";
  var world_map = "🗺";
  var mount_fuji = "🗻";
  var tokyo_tower = "🗼";
  var statue_of_liberty = "🗽";
  var japan = "🗾";
  var moyai = "🗿";
  var grinning = "😀";
  var grin = "😁";
  var joy = "😂";
  var smiley = "😃";
  var smile = "😄";
  var sweat_smile = "😅";
  var laughing = "😆";
  var satisfied = "😆";
  var innocent = "😇";
  var smiling_imp = "😈";
  var wink = "😉";
  var blush = "😊";
  var yum = "😋";
  var relieved = "😌";
  var heart_eyes = "😍";
  var sunglasses = "😎";
  var smirk = "😏";
  var neutral_face = "😐";
  var expressionless = "😑";
  var unamused = "😒";
  var sweat = "😓";
  var pensive = "😔";
  var confused = "😕";
  var confounded = "😖";
  var kissing = "😗";
  var kissing_heart = "😘";
  var kissing_smiling_eyes = "😙";
  var kissing_closed_eyes = "😚";
  var stuck_out_tongue = "😛";
  var stuck_out_tongue_winking_eye = "😜";
  var stuck_out_tongue_closed_eyes = "😝";
  var disappointed = "😞";
  var worried = "😟";
  var angry = "😠";
  var rage = "😡";
  var cry = "😢";
  var persevere = "😣";
  var triumph = "😤";
  var disappointed_relieved = "😥";
  var frowning = "😦";
  var anguished = "😧";
  var fearful = "😨";
  var weary = "😩";
  var sleepy = "😪";
  var tired_face = "😫";
  var grimacing = "😬";
  var sob = "😭";
  var open_mouth = "😮";
  var hushed = "😯";
  var cold_sweat = "😰";
  var scream = "😱";
  var astonished = "😲";
  var flushed = "😳";
  var sleeping = "😴";
  var dizzy_face = "😵";
  var no_mouth = "😶";
  var mask = "😷";
  var smile_cat = "😸";
  var joy_cat = "😹";
  var smiley_cat = "😺";
  var heart_eyes_cat = "😻";
  var smirk_cat = "😼";
  var kissing_cat = "😽";
  var pouting_cat = "😾";
  var crying_cat_face = "😿";
  var scream_cat = "🙀";
  var slightly_frowning_face = "🙁";
  var slightly_smiling_face = "🙂";
  var upside_down_face = "🙃";
  var face_with_rolling_eyes = "🙄";
  var no_good = "🙅";
  var ok_woman = "🙆";
  var bow = "🙇";
  var see_no_evil = "🙈";
  var hear_no_evil = "🙉";
  var speak_no_evil = "🙊";
  var raising_hand = "🙋";
  var raised_hands = "🙌";
  var person_frowning = "🙍";
  var person_with_pouting_face = "🙎";
  var pray = "🙏";
  var rocket = "🚀";
  var helicopter = "🚁";
  var steam_locomotive = "🚂";
  var railway_car = "🚃";
  var bullettrain_side = "🚄";
  var bullettrain_front = "🚅";
  var train2 = "🚆";
  var metro = "🚇";
  var light_rail = "🚈";
  var station = "🚉";
  var tram = "🚊";
  var train = "🚋";
  var bus = "🚌";
  var oncoming_bus = "🚍";
  var trolleybus = "🚎";
  var busstop = "🚏";
  var minibus = "🚐";
  var ambulance = "🚑";
  var fire_engine = "🚒";
  var police_car = "🚓";
  var oncoming_police_car = "🚔";
  var taxi = "🚕";
  var oncoming_taxi = "🚖";
  var car = "🚗";
  var red_car = "🚗";
  var oncoming_automobile = "🚘";
  var blue_car = "🚙";
  var truck = "🚚";
  var articulated_lorry = "🚛";
  var tractor = "🚜";
  var monorail = "🚝";
  var mountain_railway = "🚞";
  var suspension_railway = "🚟";
  var mountain_cableway = "🚠";
  var aerial_tramway = "🚡";
  var ship = "🚢";
  var rowboat = "🚣";
  var speedboat = "🚤";
  var traffic_light = "🚥";
  var vertical_traffic_light = "🚦";
  var construction = "🚧";
  var rotating_light = "🚨";
  var triangular_flag_on_post = "🚩";
  var door = "🚪";
  var no_entry_sign = "🚫";
  var smoking = "🚬";
  var no_smoking = "🚭";
  var put_litter_in_its_place = "🚮";
  var do_not_litter = "🚯";
  var potable_water = "🚰";
  var bike = "🚲";
  var no_bicycles = "🚳";
  var bicyclist = "🚴";
  var mountain_bicyclist = "🚵";
  var walking = "🚶";
  var no_pedestrians = "🚷";
  var children_crossing = "🚸";
  var mens = "🚹";
  var womens = "🚺";
  var restroom = "🚻";
  var baby_symbol = "🚼";
  var toilet = "🚽";
  var wc = "🚾";
  var shower = "🚿";
  var bath = "🛀";
  var bathtub = "🛁";
  var passport_control = "🛂";
  var customs = "🛃";
  var baggage_claim = "🛄";
  var left_luggage = "🛅";
  var couch_and_lamp = "🛋";
  var sleeping_accommodation = "🛌";
  var shopping_bags = "🛍";
  var bellhop_bell = "🛎";
  var bed = "🛏";
  var place_of_worship = "🛐";
  var hammer_and_wrench = "🛠";
  var shield = "🛡";
  var oil_drum = "🛢";
  var motorway = "🛣";
  var railway_track = "🛤";
  var motor_boat = "🛥";
  var small_airplane = "🛩";
  var airplane_departure = "🛫";
  var airplane_arriving = "🛬";
  var passenger_ship = "🛳";
  var zipper_mouth_face = "🤐";
  var money_mouth_face = "🤑";
  var face_with_thermometer = "🤒";
  var nerd_face = "🤓";
  var thinking_face = "🤔";
  var face_with_head_bandage = "🤕";
  var robot_face = "🤖";
  var hugging_face = "🤗";
  var the_horns = "🤘";
  var sign_of_the_horns = "🤘";
  var crab = "🦀";
  var lion_face = "🦁";
  var scorpion = "🦂";
  var turkey = "🦃";
  var unicorn_face = "🦄";
  var cheese_wedge = "🧀";
  var hash = "#️⃣";
  var keycap_star = "*⃣";
  var zero = "0️⃣";
  var one = "1️⃣";
  var two = "2️⃣";
  var three = "3️⃣";
  var four = "4️⃣";
  var five = "5️⃣";
  var six = "6️⃣";
  var seven = "7️⃣";
  var eight = "8️⃣";
  var nine = "9️⃣";
  var cn = "🇨🇳";
  var de = "🇩🇪";
  var es = "🇪🇸";
  var fr = "🇫🇷";
  var gb = "🇬🇧";
  var uk = "🇬🇧";
  var it = "🇮🇹";
  var jp = "🇯🇵";
  var kr = "🇰🇷";
  var ru = "🇷🇺";
  var us = "🇺🇸";
  var emoji = {
  	"100": "💯",
  	"1234": "🔢",
  	interrobang: interrobang,
  	tm: tm,
  	information_source: information_source,
  	left_right_arrow: left_right_arrow,
  	arrow_up_down: arrow_up_down,
  	arrow_upper_left: arrow_upper_left,
  	arrow_upper_right: arrow_upper_right,
  	arrow_lower_right: arrow_lower_right,
  	arrow_lower_left: arrow_lower_left,
  	keyboard: keyboard,
  	sunny: sunny,
  	cloud: cloud,
  	umbrella: umbrella,
  	showman: showman,
  	comet: comet,
  	ballot_box_with_check: ballot_box_with_check,
  	coffee: coffee,
  	shamrock: shamrock,
  	skull_and_crossbones: skull_and_crossbones,
  	radioactive_sign: radioactive_sign,
  	biohazard_sign: biohazard_sign,
  	orthodox_cross: orthodox_cross,
  	wheel_of_dharma: wheel_of_dharma,
  	white_frowning_face: white_frowning_face,
  	aries: aries,
  	taurus: taurus,
  	sagittarius: sagittarius,
  	capricorn: capricorn,
  	aquarius: aquarius,
  	pisces: pisces,
  	spades: spades,
  	clubs: clubs,
  	hearts: hearts,
  	diamonds: diamonds,
  	hotsprings: hotsprings,
  	hammer_and_pick: hammer_and_pick,
  	anchor: anchor,
  	crossed_swords: crossed_swords,
  	scales: scales,
  	alembic: alembic,
  	gear: gear,
  	scissors: scissors,
  	white_check_mark: white_check_mark,
  	airplane: airplane,
  	email: email,
  	envelope: envelope,
  	black_nib: black_nib,
  	heavy_check_mark: heavy_check_mark,
  	heavy_multiplication_x: heavy_multiplication_x,
  	star_of_david: star_of_david,
  	sparkles: sparkles,
  	eight_spoked_asterisk: eight_spoked_asterisk,
  	eight_pointed_black_star: eight_pointed_black_star,
  	snowflake: snowflake,
  	sparkle: sparkle,
  	question: question,
  	grey_question: grey_question,
  	grey_exclamation: grey_exclamation,
  	exclamation: exclamation,
  	heavy_exclamation_mark: heavy_exclamation_mark,
  	heavy_heart_exclamation_mark_ornament: heavy_heart_exclamation_mark_ornament,
  	heart: heart,
  	heavy_plus_sign: heavy_plus_sign,
  	heavy_minus_sign: heavy_minus_sign,
  	heavy_division_sign: heavy_division_sign,
  	arrow_heading_up: arrow_heading_up,
  	arrow_heading_down: arrow_heading_down,
  	wavy_dash: wavy_dash,
  	congratulations: congratulations,
  	secret: secret,
  	copyright: copyright,
  	registered: registered,
  	bangbang: bangbang,
  	leftwards_arrow_with_hook: leftwards_arrow_with_hook,
  	arrow_right_hook: arrow_right_hook,
  	watch: watch,
  	hourglass: hourglass,
  	fast_forward: fast_forward,
  	rewind: rewind,
  	arrow_double_up: arrow_double_up,
  	arrow_double_down: arrow_double_down,
  	black_right_pointing_double_triangle_with_vertical_bar: black_right_pointing_double_triangle_with_vertical_bar,
  	black_left_pointing_double_triangle_with_vertical_bar: black_left_pointing_double_triangle_with_vertical_bar,
  	black_right_pointing_triangle_with_double_vertical_bar: black_right_pointing_triangle_with_double_vertical_bar,
  	alarm_clock: alarm_clock,
  	stopwatch: stopwatch,
  	timer_clock: timer_clock,
  	hourglass_flowing_sand: hourglass_flowing_sand,
  	double_vertical_bar: double_vertical_bar,
  	black_square_for_stop: black_square_for_stop,
  	black_circle_for_record: black_circle_for_record,
  	m: m,
  	black_small_square: black_small_square,
  	white_small_square: white_small_square,
  	arrow_forward: arrow_forward,
  	arrow_backward: arrow_backward,
  	white_medium_square: white_medium_square,
  	black_medium_square: black_medium_square,
  	white_medium_small_square: white_medium_small_square,
  	black_medium_small_square: black_medium_small_square,
  	phone: phone,
  	telephone: telephone,
  	point_up: point_up,
  	star_and_crescent: star_and_crescent,
  	peace_symbol: peace_symbol,
  	yin_yang: yin_yang,
  	relaxed: relaxed,
  	gemini: gemini,
  	cancer: cancer,
  	leo: leo,
  	virgo: virgo,
  	libra: libra,
  	scorpius: scorpius,
  	recycle: recycle,
  	wheelchair: wheelchair,
  	atom_symbol: atom_symbol,
  	fleur_de_lis: fleur_de_lis,
  	warning: warning,
  	zap: zap,
  	white_circle: white_circle,
  	black_circle: black_circle,
  	coffin: coffin,
  	funeral_urn: funeral_urn,
  	soccer: soccer,
  	baseball: baseball,
  	snowman: snowman,
  	partly_sunny: partly_sunny,
  	thunder_cloud_and_rain: thunder_cloud_and_rain,
  	ophiuchus: ophiuchus,
  	pick: pick,
  	helmet_with_white_cross: helmet_with_white_cross,
  	chains: chains,
  	no_entry: no_entry,
  	shinto_shrine: shinto_shrine,
  	church: church,
  	mountain: mountain,
  	umbrella_on_ground: umbrella_on_ground,
  	fountain: fountain,
  	golf: golf,
  	ferry: ferry,
  	boat: boat,
  	sailboat: sailboat,
  	skier: skier,
  	ice_skate: ice_skate,
  	person_with_ball: person_with_ball,
  	tent: tent,
  	fuelpump: fuelpump,
  	fist: fist,
  	hand: hand,
  	raised_hand: raised_hand,
  	v: v,
  	writing_hand: writing_hand,
  	pencil2: pencil2,
  	latin_cross: latin_cross,
  	x: x,
  	negative_squared_cross_mark: negative_squared_cross_mark,
  	arrow_right: arrow_right,
  	curly_loop: curly_loop,
  	loop: loop,
  	arrow_left: arrow_left,
  	arrow_up: arrow_up,
  	arrow_down: arrow_down,
  	black_large_square: black_large_square,
  	white_large_square: white_large_square,
  	star: star,
  	o: o,
  	part_alternation_mark: part_alternation_mark,
  	mahjong: mahjong,
  	black_joker: black_joker,
  	a: a,
  	b: b,
  	o2: o2,
  	parking: parking,
  	ab: ab,
  	cl: cl,
  	cool: cool,
  	free: free,
  	id: id,
  	"new": "🆕",
  	ng: ng,
  	ok: ok,
  	sos: sos,
  	up: up,
  	vs: vs,
  	koko: koko,
  	sa: sa,
  	u7121: u7121,
  	u6307: u6307,
  	u7981: u7981,
  	u7a7a: u7a7a,
  	u5408: u5408,
  	u6e80: u6e80,
  	u6709: u6709,
  	u6708: u6708,
  	u7533: u7533,
  	u5272: u5272,
  	u55b6: u55b6,
  	ideograph_advantage: ideograph_advantage,
  	accept: accept,
  	cyclone: cyclone,
  	foggy: foggy,
  	closed_umbrella: closed_umbrella,
  	night_with_stars: night_with_stars,
  	sunrise_over_mountains: sunrise_over_mountains,
  	sunrise: sunrise,
  	city_sunset: city_sunset,
  	city_sunrise: city_sunrise,
  	rainbow: rainbow,
  	bridge_at_night: bridge_at_night,
  	ocean: ocean,
  	volcano: volcano,
  	milky_way: milky_way,
  	earth_africa: earth_africa,
  	earth_americas: earth_americas,
  	earth_asia: earth_asia,
  	globe_with_meridians: globe_with_meridians,
  	new_moon: new_moon,
  	waxing_crescent_moon: waxing_crescent_moon,
  	first_quarter_moon: first_quarter_moon,
  	moon: moon,
  	waxing_gibbous_moon: waxing_gibbous_moon,
  	full_moon: full_moon,
  	waning_gibbous_moon: waning_gibbous_moon,
  	last_quarter_moon: last_quarter_moon,
  	waning_crescent_moon: waning_crescent_moon,
  	crescent_moon: crescent_moon,
  	new_moon_with_face: new_moon_with_face,
  	first_quarter_moon_with_face: first_quarter_moon_with_face,
  	last_quarter_moon_with_face: last_quarter_moon_with_face,
  	full_moon_with_face: full_moon_with_face,
  	sun_with_face: sun_with_face,
  	star2: star2,
  	stars: stars,
  	thermometer: thermometer,
  	mostly_sunny: mostly_sunny,
  	sun_small_cloud: sun_small_cloud,
  	barely_sunny: barely_sunny,
  	sun_behind_cloud: sun_behind_cloud,
  	partly_sunny_rain: partly_sunny_rain,
  	sun_behind_rain_cloud: sun_behind_rain_cloud,
  	rain_cloud: rain_cloud,
  	snow_cloud: snow_cloud,
  	lightning: lightning,
  	lightning_cloud: lightning_cloud,
  	tornado: tornado,
  	tornado_cloud: tornado_cloud,
  	fog: fog,
  	wind_blowing_face: wind_blowing_face,
  	hotdog: hotdog,
  	taco: taco,
  	burrito: burrito,
  	chestnut: chestnut,
  	seedling: seedling,
  	evergreen_tree: evergreen_tree,
  	deciduous_tree: deciduous_tree,
  	palm_tree: palm_tree,
  	cactus: cactus,
  	hot_pepper: hot_pepper,
  	tulip: tulip,
  	cherry_blossom: cherry_blossom,
  	rose: rose,
  	hibiscus: hibiscus,
  	sunflower: sunflower,
  	blossom: blossom,
  	corn: corn,
  	ear_of_rice: ear_of_rice,
  	herb: herb,
  	four_leaf_clover: four_leaf_clover,
  	maple_leaf: maple_leaf,
  	fallen_leaf: fallen_leaf,
  	leaves: leaves,
  	mushroom: mushroom,
  	tomato: tomato,
  	eggplant: eggplant,
  	grapes: grapes,
  	melon: melon,
  	watermelon: watermelon,
  	tangerine: tangerine,
  	lemon: lemon,
  	banana: banana,
  	pineapple: pineapple,
  	apple: apple,
  	green_apple: green_apple,
  	pear: pear,
  	peach: peach,
  	cherries: cherries,
  	strawberry: strawberry,
  	hamburger: hamburger,
  	pizza: pizza,
  	meat_on_bone: meat_on_bone,
  	poultry_leg: poultry_leg,
  	rice_cracker: rice_cracker,
  	rice_ball: rice_ball,
  	rice: rice,
  	curry: curry,
  	ramen: ramen,
  	spaghetti: spaghetti,
  	bread: bread,
  	fries: fries,
  	sweet_potato: sweet_potato,
  	dango: dango,
  	oden: oden,
  	sushi: sushi,
  	fried_shrimp: fried_shrimp,
  	fish_cake: fish_cake,
  	icecream: icecream,
  	shaved_ice: shaved_ice,
  	ice_cream: ice_cream,
  	doughnut: doughnut,
  	cookie: cookie,
  	chocolate_bar: chocolate_bar,
  	candy: candy,
  	lollipop: lollipop,
  	custard: custard,
  	honey_pot: honey_pot,
  	cake: cake,
  	bento: bento,
  	stew: stew,
  	egg: egg,
  	fork_and_knife: fork_and_knife,
  	tea: tea,
  	sake: sake,
  	wine_glass: wine_glass,
  	cocktail: cocktail,
  	tropical_drink: tropical_drink,
  	beer: beer,
  	beers: beers,
  	baby_bottle: baby_bottle,
  	knife_fork_plate: knife_fork_plate,
  	champagne: champagne,
  	popcorn: popcorn,
  	ribbon: ribbon,
  	gift: gift,
  	birthday: birthday,
  	jack_o_lantern: jack_o_lantern,
  	christmas_tree: christmas_tree,
  	santa: santa,
  	fireworks: fireworks,
  	sparkler: sparkler,
  	balloon: balloon,
  	tada: tada,
  	confetti_ball: confetti_ball,
  	tanabata_tree: tanabata_tree,
  	crossed_flags: crossed_flags,
  	bamboo: bamboo,
  	dolls: dolls,
  	flags: flags,
  	wind_chime: wind_chime,
  	rice_scene: rice_scene,
  	school_satchel: school_satchel,
  	mortar_board: mortar_board,
  	medal: medal,
  	reminder_ribbon: reminder_ribbon,
  	studio_microphone: studio_microphone,
  	level_slider: level_slider,
  	control_knobs: control_knobs,
  	film_frames: film_frames,
  	admission_tickets: admission_tickets,
  	carousel_horse: carousel_horse,
  	ferris_wheel: ferris_wheel,
  	roller_coaster: roller_coaster,
  	fishing_pole_and_fish: fishing_pole_and_fish,
  	microphone: microphone,
  	movie_camera: movie_camera,
  	cinema: cinema,
  	headphones: headphones,
  	art: art,
  	tophat: tophat,
  	circus_tent: circus_tent,
  	ticket: ticket,
  	clapper: clapper,
  	performing_arts: performing_arts,
  	video_game: video_game,
  	dart: dart,
  	slot_machine: slot_machine,
  	"8ball": "🎱",
  	game_die: game_die,
  	bowling: bowling,
  	flower_playing_cards: flower_playing_cards,
  	musical_note: musical_note,
  	notes: notes,
  	saxophone: saxophone,
  	guitar: guitar,
  	musical_keyboard: musical_keyboard,
  	trumpet: trumpet,
  	violin: violin,
  	musical_score: musical_score,
  	running_shirt_with_sash: running_shirt_with_sash,
  	tennis: tennis,
  	ski: ski,
  	basketball: basketball,
  	checkered_flag: checkered_flag,
  	snowboarder: snowboarder,
  	runner: runner,
  	running: running,
  	surfer: surfer,
  	sports_medal: sports_medal,
  	trophy: trophy,
  	horse_racing: horse_racing,
  	football: football,
  	rugby_football: rugby_football,
  	swimmer: swimmer,
  	weight_lifter: weight_lifter,
  	golfer: golfer,
  	racing_motorcycle: racing_motorcycle,
  	racing_car: racing_car,
  	cricket_bat_and_ball: cricket_bat_and_ball,
  	volleyball: volleyball,
  	field_hockey_stick_and_ball: field_hockey_stick_and_ball,
  	ice_hockey_stick_and_puck: ice_hockey_stick_and_puck,
  	table_tennis_paddle_and_ball: table_tennis_paddle_and_ball,
  	snow_capped_mountain: snow_capped_mountain,
  	camping: camping,
  	beach_with_umbrella: beach_with_umbrella,
  	building_construction: building_construction,
  	house_buildings: house_buildings,
  	cityscape: cityscape,
  	derelict_house_building: derelict_house_building,
  	classical_building: classical_building,
  	desert: desert,
  	desert_island: desert_island,
  	national_park: national_park,
  	stadium: stadium,
  	house: house,
  	house_with_garden: house_with_garden,
  	office: office,
  	post_office: post_office,
  	european_post_office: european_post_office,
  	hospital: hospital,
  	bank: bank,
  	atm: atm,
  	hotel: hotel,
  	love_hotel: love_hotel,
  	convenience_store: convenience_store,
  	school: school,
  	department_store: department_store,
  	factory: factory,
  	izakaya_lantern: izakaya_lantern,
  	lantern: lantern,
  	japanese_castle: japanese_castle,
  	european_castle: european_castle,
  	waving_white_flag: waving_white_flag,
  	waving_black_flag: waving_black_flag,
  	rosette: rosette,
  	label: label,
  	badminton_racquet_and_shuttlecock: badminton_racquet_and_shuttlecock,
  	bow_and_arrow: bow_and_arrow,
  	amphora: amphora,
  	"skin-tone-2": "🏻",
  	"skin-tone-3": "🏼",
  	"skin-tone-4": "🏽",
  	"skin-tone-5": "🏾",
  	"skin-tone-6": "🏿",
  	rat: rat,
  	mouse2: mouse2,
  	ox: ox,
  	water_buffalo: water_buffalo,
  	cow2: cow2,
  	tiger2: tiger2,
  	leopard: leopard,
  	rabbit2: rabbit2,
  	cat2: cat2,
  	dragon: dragon,
  	crocodile: crocodile,
  	whale2: whale2,
  	snail: snail,
  	snake: snake,
  	racehorse: racehorse,
  	ram: ram,
  	goat: goat,
  	sheep: sheep,
  	monkey: monkey,
  	rooster: rooster,
  	chicken: chicken,
  	dog2: dog2,
  	pig2: pig2,
  	boar: boar,
  	elephant: elephant,
  	octopus: octopus,
  	shell: shell,
  	bug: bug,
  	ant: ant,
  	bee: bee,
  	honeybee: honeybee,
  	beetle: beetle,
  	fish: fish,
  	tropical_fish: tropical_fish,
  	blowfish: blowfish,
  	turtle: turtle,
  	hatching_chick: hatching_chick,
  	baby_chick: baby_chick,
  	hatched_chick: hatched_chick,
  	bird: bird,
  	penguin: penguin,
  	koala: koala,
  	poodle: poodle,
  	dromedary_camel: dromedary_camel,
  	camel: camel,
  	dolphin: dolphin,
  	flipper: flipper,
  	mouse: mouse,
  	cow: cow,
  	tiger: tiger,
  	rabbit: rabbit,
  	cat: cat,
  	dragon_face: dragon_face,
  	whale: whale,
  	horse: horse,
  	monkey_face: monkey_face,
  	dog: dog,
  	pig: pig,
  	frog: frog,
  	hamster: hamster,
  	wolf: wolf,
  	bear: bear,
  	panda_face: panda_face,
  	pig_nose: pig_nose,
  	feet: feet,
  	paw_prints: paw_prints,
  	chipmunk: chipmunk,
  	eyes: eyes,
  	eye: eye,
  	ear: ear,
  	nose: nose,
  	lips: lips,
  	tongue: tongue,
  	point_up_2: point_up_2,
  	point_down: point_down,
  	point_left: point_left,
  	point_right: point_right,
  	facepunch: facepunch,
  	punch: punch,
  	wave: wave,
  	ok_hand: ok_hand,
  	"+1": "👍",
  	thumbsup: thumbsup,
  	"-1": "👎",
  	thumbsdown: thumbsdown,
  	clap: clap,
  	open_hands: open_hands,
  	crown: crown,
  	womans_hat: womans_hat,
  	eyeglasses: eyeglasses,
  	necktie: necktie,
  	shirt: shirt,
  	tshirt: tshirt,
  	jeans: jeans,
  	dress: dress,
  	kimono: kimono,
  	bikini: bikini,
  	womans_clothes: womans_clothes,
  	purse: purse,
  	handbag: handbag,
  	pouch: pouch,
  	mans_shoe: mans_shoe,
  	shoe: shoe,
  	athletic_shoe: athletic_shoe,
  	high_heel: high_heel,
  	sandal: sandal,
  	boot: boot,
  	footprints: footprints,
  	bust_in_silhouette: bust_in_silhouette,
  	busts_in_silhouette: busts_in_silhouette,
  	boy: boy,
  	girl: girl,
  	man: man,
  	woman: woman,
  	family: family,
  	"man-woman-boy": "👨‍👩‍👦",
  	couple: couple,
  	man_and_woman_holding_hands: man_and_woman_holding_hands,
  	two_men_holding_hands: two_men_holding_hands,
  	two_women_holding_hands: two_women_holding_hands,
  	cop: cop,
  	dancers: dancers,
  	bride_with_veil: bride_with_veil,
  	person_with_blond_hair: person_with_blond_hair,
  	man_with_gua_pi_mao: man_with_gua_pi_mao,
  	man_with_turban: man_with_turban,
  	older_man: older_man,
  	older_woman: older_woman,
  	baby: baby,
  	construction_worker: construction_worker,
  	princess: princess,
  	japanese_ogre: japanese_ogre,
  	japanese_goblin: japanese_goblin,
  	ghost: ghost,
  	angel: angel,
  	alien: alien,
  	space_invader: space_invader,
  	imp: imp,
  	skull: skull,
  	information_desk_person: information_desk_person,
  	guardsman: guardsman,
  	dancer: dancer,
  	lipstick: lipstick,
  	nail_care: nail_care,
  	massage: massage,
  	haircut: haircut,
  	barber: barber,
  	syringe: syringe,
  	pill: pill,
  	kiss: kiss,
  	love_letter: love_letter,
  	ring: ring,
  	gem: gem,
  	couplekiss: couplekiss,
  	bouquet: bouquet,
  	couple_with_heart: couple_with_heart,
  	wedding: wedding,
  	heartbeat: heartbeat,
  	broken_heart: broken_heart,
  	two_hearts: two_hearts,
  	sparkling_heart: sparkling_heart,
  	heartpulse: heartpulse,
  	cupid: cupid,
  	blue_heart: blue_heart,
  	green_heart: green_heart,
  	yellow_heart: yellow_heart,
  	purple_heart: purple_heart,
  	gift_heart: gift_heart,
  	revolving_hearts: revolving_hearts,
  	heart_decoration: heart_decoration,
  	diamond_shape_with_a_dot_inside: diamond_shape_with_a_dot_inside,
  	bulb: bulb,
  	anger: anger,
  	bomb: bomb,
  	zzz: zzz,
  	boom: boom,
  	collision: collision,
  	sweat_drops: sweat_drops,
  	droplet: droplet,
  	dash: dash,
  	hankey: hankey,
  	poop: poop,
  	shit: shit,
  	muscle: muscle,
  	dizzy: dizzy,
  	speech_balloon: speech_balloon,
  	thought_balloon: thought_balloon,
  	white_flower: white_flower,
  	moneybag: moneybag,
  	currency_exchange: currency_exchange,
  	heavy_dollar_sign: heavy_dollar_sign,
  	credit_card: credit_card,
  	yen: yen,
  	dollar: dollar,
  	euro: euro,
  	pound: pound,
  	money_with_wings: money_with_wings,
  	chart: chart,
  	seat: seat,
  	computer: computer,
  	briefcase: briefcase,
  	minidisc: minidisc,
  	floppy_disk: floppy_disk,
  	cd: cd,
  	dvd: dvd,
  	file_folder: file_folder,
  	open_file_folder: open_file_folder,
  	page_with_curl: page_with_curl,
  	page_facing_up: page_facing_up,
  	date: date,
  	calendar: calendar,
  	card_index: card_index,
  	chart_with_upwards_trend: chart_with_upwards_trend,
  	chart_with_downwards_trend: chart_with_downwards_trend,
  	bar_chart: bar_chart,
  	clipboard: clipboard,
  	pushpin: pushpin,
  	round_pushpin: round_pushpin,
  	paperclip: paperclip,
  	straight_ruler: straight_ruler,
  	triangular_ruler: triangular_ruler,
  	bookmark_tabs: bookmark_tabs,
  	ledger: ledger,
  	notebook: notebook,
  	notebook_with_decorative_cover: notebook_with_decorative_cover,
  	closed_book: closed_book,
  	book: book,
  	open_book: open_book,
  	green_book: green_book,
  	blue_book: blue_book,
  	orange_book: orange_book,
  	books: books,
  	name_badge: name_badge,
  	scroll: scroll,
  	memo: memo,
  	pencil: pencil,
  	telephone_receiver: telephone_receiver,
  	pager: pager,
  	fax: fax,
  	satellite: satellite,
  	loudspeaker: loudspeaker,
  	mega: mega,
  	outbox_tray: outbox_tray,
  	inbox_tray: inbox_tray,
  	"package": "📦",
  	"e-mail": "📧",
  	incoming_envelope: incoming_envelope,
  	envelope_with_arrow: envelope_with_arrow,
  	mailbox_closed: mailbox_closed,
  	mailbox: mailbox,
  	mailbox_with_mail: mailbox_with_mail,
  	mailbox_with_no_mail: mailbox_with_no_mail,
  	postbox: postbox,
  	postal_horn: postal_horn,
  	newspaper: newspaper,
  	iphone: iphone,
  	calling: calling,
  	vibration_mode: vibration_mode,
  	mobile_phone_off: mobile_phone_off,
  	no_mobile_phones: no_mobile_phones,
  	signal_strength: signal_strength,
  	camera: camera,
  	camera_with_flash: camera_with_flash,
  	video_camera: video_camera,
  	tv: tv,
  	radio: radio,
  	vhs: vhs,
  	film_projector: film_projector,
  	prayer_beads: prayer_beads,
  	twisted_rightwards_arrows: twisted_rightwards_arrows,
  	repeat: repeat,
  	repeat_one: repeat_one,
  	arrows_clockwise: arrows_clockwise,
  	arrows_counterclockwise: arrows_counterclockwise,
  	low_brightness: low_brightness,
  	high_brightness: high_brightness,
  	mute: mute,
  	speaker: speaker,
  	sound: sound,
  	loud_sound: loud_sound,
  	battery: battery,
  	electric_plug: electric_plug,
  	mag: mag,
  	mag_right: mag_right,
  	lock_with_ink_pen: lock_with_ink_pen,
  	closed_lock_with_key: closed_lock_with_key,
  	key: key,
  	lock: lock,
  	unlock: unlock,
  	bell: bell,
  	no_bell: no_bell,
  	bookmark: bookmark,
  	link: link,
  	radio_button: radio_button,
  	back: back,
  	end: end,
  	on: on,
  	soon: soon,
  	top: top,
  	underage: underage,
  	keycap_ten: keycap_ten,
  	capital_abcd: capital_abcd,
  	abcd: abcd,
  	symbols: symbols,
  	abc: abc,
  	fire: fire,
  	flashlight: flashlight,
  	wrench: wrench,
  	hammer: hammer,
  	nut_and_bolt: nut_and_bolt,
  	hocho: hocho,
  	knife: knife,
  	gun: gun,
  	microscope: microscope,
  	telescope: telescope,
  	crystal_ball: crystal_ball,
  	six_pointed_star: six_pointed_star,
  	beginner: beginner,
  	trident: trident,
  	black_square_button: black_square_button,
  	white_square_button: white_square_button,
  	red_circle: red_circle,
  	large_blue_circle: large_blue_circle,
  	large_orange_diamond: large_orange_diamond,
  	large_blue_diamond: large_blue_diamond,
  	small_orange_diamond: small_orange_diamond,
  	small_blue_diamond: small_blue_diamond,
  	small_red_triangle: small_red_triangle,
  	small_red_triangle_down: small_red_triangle_down,
  	arrow_up_small: arrow_up_small,
  	arrow_down_small: arrow_down_small,
  	om_symbol: om_symbol,
  	dove_of_peace: dove_of_peace,
  	kaaba: kaaba,
  	mosque: mosque,
  	synagogue: synagogue,
  	menorah_with_nine_branches: menorah_with_nine_branches,
  	clock1: clock1,
  	clock2: clock2,
  	clock3: clock3,
  	clock4: clock4,
  	clock5: clock5,
  	clock6: clock6,
  	clock7: clock7,
  	clock8: clock8,
  	clock9: clock9,
  	clock10: clock10,
  	clock11: clock11,
  	clock12: clock12,
  	clock130: clock130,
  	clock230: clock230,
  	clock330: clock330,
  	clock430: clock430,
  	clock530: clock530,
  	clock630: clock630,
  	clock730: clock730,
  	clock830: clock830,
  	clock930: clock930,
  	clock1030: clock1030,
  	clock1130: clock1130,
  	clock1230: clock1230,
  	candle: candle,
  	mantelpiece_clock: mantelpiece_clock,
  	hole: hole,
  	man_in_business_suit_levitating: man_in_business_suit_levitating,
  	sleuth_or_spy: sleuth_or_spy,
  	dark_sunglasses: dark_sunglasses,
  	spider: spider,
  	spider_web: spider_web,
  	joystick: joystick,
  	linked_paperclips: linked_paperclips,
  	lower_left_ballpoint_pen: lower_left_ballpoint_pen,
  	lower_left_fountain_pen: lower_left_fountain_pen,
  	lower_left_paintbrush: lower_left_paintbrush,
  	lower_left_crayon: lower_left_crayon,
  	raised_hand_with_fingers_splayed: raised_hand_with_fingers_splayed,
  	middle_finger: middle_finger,
  	reversed_hand_with_middle_finger_extended: reversed_hand_with_middle_finger_extended,
  	"spock-hand": "🖖",
  	desktop_computer: desktop_computer,
  	printer: printer,
  	three_button_mouse: three_button_mouse,
  	trackball: trackball,
  	frame_with_picture: frame_with_picture,
  	card_index_dividers: card_index_dividers,
  	card_file_box: card_file_box,
  	file_cabinet: file_cabinet,
  	wastebasket: wastebasket,
  	spiral_note_pad: spiral_note_pad,
  	spiral_calendar_pad: spiral_calendar_pad,
  	compression: compression,
  	old_key: old_key,
  	rolled_up_newspaper: rolled_up_newspaper,
  	dagger_knife: dagger_knife,
  	speaking_head_in_silhouette: speaking_head_in_silhouette,
  	left_speech_bubble: left_speech_bubble,
  	right_anger_bubble: right_anger_bubble,
  	ballot_box_with_ballot: ballot_box_with_ballot,
  	world_map: world_map,
  	mount_fuji: mount_fuji,
  	tokyo_tower: tokyo_tower,
  	statue_of_liberty: statue_of_liberty,
  	japan: japan,
  	moyai: moyai,
  	grinning: grinning,
  	grin: grin,
  	joy: joy,
  	smiley: smiley,
  	smile: smile,
  	sweat_smile: sweat_smile,
  	laughing: laughing,
  	satisfied: satisfied,
  	innocent: innocent,
  	smiling_imp: smiling_imp,
  	wink: wink,
  	blush: blush,
  	yum: yum,
  	relieved: relieved,
  	heart_eyes: heart_eyes,
  	sunglasses: sunglasses,
  	smirk: smirk,
  	neutral_face: neutral_face,
  	expressionless: expressionless,
  	unamused: unamused,
  	sweat: sweat,
  	pensive: pensive,
  	confused: confused,
  	confounded: confounded,
  	kissing: kissing,
  	kissing_heart: kissing_heart,
  	kissing_smiling_eyes: kissing_smiling_eyes,
  	kissing_closed_eyes: kissing_closed_eyes,
  	stuck_out_tongue: stuck_out_tongue,
  	stuck_out_tongue_winking_eye: stuck_out_tongue_winking_eye,
  	stuck_out_tongue_closed_eyes: stuck_out_tongue_closed_eyes,
  	disappointed: disappointed,
  	worried: worried,
  	angry: angry,
  	rage: rage,
  	cry: cry,
  	persevere: persevere,
  	triumph: triumph,
  	disappointed_relieved: disappointed_relieved,
  	frowning: frowning,
  	anguished: anguished,
  	fearful: fearful,
  	weary: weary,
  	sleepy: sleepy,
  	tired_face: tired_face,
  	grimacing: grimacing,
  	sob: sob,
  	open_mouth: open_mouth,
  	hushed: hushed,
  	cold_sweat: cold_sweat,
  	scream: scream,
  	astonished: astonished,
  	flushed: flushed,
  	sleeping: sleeping,
  	dizzy_face: dizzy_face,
  	no_mouth: no_mouth,
  	mask: mask,
  	smile_cat: smile_cat,
  	joy_cat: joy_cat,
  	smiley_cat: smiley_cat,
  	heart_eyes_cat: heart_eyes_cat,
  	smirk_cat: smirk_cat,
  	kissing_cat: kissing_cat,
  	pouting_cat: pouting_cat,
  	crying_cat_face: crying_cat_face,
  	scream_cat: scream_cat,
  	slightly_frowning_face: slightly_frowning_face,
  	slightly_smiling_face: slightly_smiling_face,
  	upside_down_face: upside_down_face,
  	face_with_rolling_eyes: face_with_rolling_eyes,
  	no_good: no_good,
  	ok_woman: ok_woman,
  	bow: bow,
  	see_no_evil: see_no_evil,
  	hear_no_evil: hear_no_evil,
  	speak_no_evil: speak_no_evil,
  	raising_hand: raising_hand,
  	raised_hands: raised_hands,
  	person_frowning: person_frowning,
  	person_with_pouting_face: person_with_pouting_face,
  	pray: pray,
  	rocket: rocket,
  	helicopter: helicopter,
  	steam_locomotive: steam_locomotive,
  	railway_car: railway_car,
  	bullettrain_side: bullettrain_side,
  	bullettrain_front: bullettrain_front,
  	train2: train2,
  	metro: metro,
  	light_rail: light_rail,
  	station: station,
  	tram: tram,
  	train: train,
  	bus: bus,
  	oncoming_bus: oncoming_bus,
  	trolleybus: trolleybus,
  	busstop: busstop,
  	minibus: minibus,
  	ambulance: ambulance,
  	fire_engine: fire_engine,
  	police_car: police_car,
  	oncoming_police_car: oncoming_police_car,
  	taxi: taxi,
  	oncoming_taxi: oncoming_taxi,
  	car: car,
  	red_car: red_car,
  	oncoming_automobile: oncoming_automobile,
  	blue_car: blue_car,
  	truck: truck,
  	articulated_lorry: articulated_lorry,
  	tractor: tractor,
  	monorail: monorail,
  	mountain_railway: mountain_railway,
  	suspension_railway: suspension_railway,
  	mountain_cableway: mountain_cableway,
  	aerial_tramway: aerial_tramway,
  	ship: ship,
  	rowboat: rowboat,
  	speedboat: speedboat,
  	traffic_light: traffic_light,
  	vertical_traffic_light: vertical_traffic_light,
  	construction: construction,
  	rotating_light: rotating_light,
  	triangular_flag_on_post: triangular_flag_on_post,
  	door: door,
  	no_entry_sign: no_entry_sign,
  	smoking: smoking,
  	no_smoking: no_smoking,
  	put_litter_in_its_place: put_litter_in_its_place,
  	do_not_litter: do_not_litter,
  	potable_water: potable_water,
  	"non-potable_water": "🚱",
  	bike: bike,
  	no_bicycles: no_bicycles,
  	bicyclist: bicyclist,
  	mountain_bicyclist: mountain_bicyclist,
  	walking: walking,
  	no_pedestrians: no_pedestrians,
  	children_crossing: children_crossing,
  	mens: mens,
  	womens: womens,
  	restroom: restroom,
  	baby_symbol: baby_symbol,
  	toilet: toilet,
  	wc: wc,
  	shower: shower,
  	bath: bath,
  	bathtub: bathtub,
  	passport_control: passport_control,
  	customs: customs,
  	baggage_claim: baggage_claim,
  	left_luggage: left_luggage,
  	couch_and_lamp: couch_and_lamp,
  	sleeping_accommodation: sleeping_accommodation,
  	shopping_bags: shopping_bags,
  	bellhop_bell: bellhop_bell,
  	bed: bed,
  	place_of_worship: place_of_worship,
  	hammer_and_wrench: hammer_and_wrench,
  	shield: shield,
  	oil_drum: oil_drum,
  	motorway: motorway,
  	railway_track: railway_track,
  	motor_boat: motor_boat,
  	small_airplane: small_airplane,
  	airplane_departure: airplane_departure,
  	airplane_arriving: airplane_arriving,
  	passenger_ship: passenger_ship,
  	zipper_mouth_face: zipper_mouth_face,
  	money_mouth_face: money_mouth_face,
  	face_with_thermometer: face_with_thermometer,
  	nerd_face: nerd_face,
  	thinking_face: thinking_face,
  	face_with_head_bandage: face_with_head_bandage,
  	robot_face: robot_face,
  	hugging_face: hugging_face,
  	the_horns: the_horns,
  	sign_of_the_horns: sign_of_the_horns,
  	crab: crab,
  	lion_face: lion_face,
  	scorpion: scorpion,
  	turkey: turkey,
  	unicorn_face: unicorn_face,
  	cheese_wedge: cheese_wedge,
  	hash: hash,
  	keycap_star: keycap_star,
  	zero: zero,
  	one: one,
  	two: two,
  	three: three,
  	four: four,
  	five: five,
  	six: six,
  	seven: seven,
  	eight: eight,
  	nine: nine,
  	"flag-ac": "🇦🇨",
  	"flag-ad": "🇦🇩",
  	"flag-ae": "🇦🇪",
  	"flag-af": "🇦🇫",
  	"flag-ag": "🇦🇬",
  	"flag-ai": "🇦🇮",
  	"flag-al": "🇦🇱",
  	"flag-am": "🇦🇲",
  	"flag-ao": "🇦🇴",
  	"flag-aq": "🇦🇶",
  	"flag-ar": "🇦🇷",
  	"flag-as": "🇦🇸",
  	"flag-at": "🇦🇹",
  	"flag-au": "🇦🇺",
  	"flag-aw": "🇦🇼",
  	"flag-ax": "🇦🇽",
  	"flag-az": "🇦🇿",
  	"flag-ba": "🇧🇦",
  	"flag-bb": "🇧🇧",
  	"flag-bd": "🇧🇩",
  	"flag-be": "🇧🇪",
  	"flag-bf": "🇧🇫",
  	"flag-bg": "🇧🇬",
  	"flag-bh": "🇧🇭",
  	"flag-bi": "🇧🇮",
  	"flag-bj": "🇧🇯",
  	"flag-bl": "🇧🇱",
  	"flag-bm": "🇧🇲",
  	"flag-bn": "🇧🇳",
  	"flag-bo": "🇧🇴",
  	"flag-bq": "🇧🇶",
  	"flag-br": "🇧🇷",
  	"flag-bs": "🇧🇸",
  	"flag-bt": "🇧🇹",
  	"flag-bv": "🇧🇻",
  	"flag-bw": "🇧🇼",
  	"flag-by": "🇧🇾",
  	"flag-bz": "🇧🇿",
  	"flag-ca": "🇨🇦",
  	"flag-cc": "🇨🇨",
  	"flag-cd": "🇨🇩",
  	"flag-cf": "🇨🇫",
  	"flag-cg": "🇨🇬",
  	"flag-ch": "🇨🇭",
  	"flag-ci": "🇨🇮",
  	"flag-ck": "🇨🇰",
  	"flag-cl": "🇨🇱",
  	"flag-cm": "🇨🇲",
  	"flag-cn": "🇨🇳",
  	cn: cn,
  	"flag-co": "🇨🇴",
  	"flag-cp": "🇨🇵",
  	"flag-cr": "🇨🇷",
  	"flag-cu": "🇨🇺",
  	"flag-cv": "🇨🇻",
  	"flag-cw": "🇨🇼",
  	"flag-cx": "🇨🇽",
  	"flag-cy": "🇨🇾",
  	"flag-cz": "🇨🇿",
  	"flag-de": "🇩🇪",
  	de: de,
  	"flag-dg": "🇩🇬",
  	"flag-dj": "🇩🇯",
  	"flag-dk": "🇩🇰",
  	"flag-dm": "🇩🇲",
  	"flag-do": "🇩🇴",
  	"flag-dz": "🇩🇿",
  	"flag-ea": "🇪🇦",
  	"flag-ec": "🇪🇨",
  	"flag-ee": "🇪🇪",
  	"flag-eg": "🇪🇬",
  	"flag-eh": "🇪🇭",
  	"flag-er": "🇪🇷",
  	"flag-es": "🇪🇸",
  	es: es,
  	"flag-et": "🇪🇹",
  	"flag-eu": "🇪🇺",
  	"flag-fi": "🇫🇮",
  	"flag-fj": "🇫🇯",
  	"flag-fk": "🇫🇰",
  	"flag-fm": "🇫🇲",
  	"flag-fo": "🇫🇴",
  	"flag-fr": "🇫🇷",
  	fr: fr,
  	"flag-ga": "🇬🇦",
  	"flag-gb": "🇬🇧",
  	gb: gb,
  	uk: uk,
  	"flag-gd": "🇬🇩",
  	"flag-ge": "🇬🇪",
  	"flag-gf": "🇬🇫",
  	"flag-gg": "🇬🇬",
  	"flag-gh": "🇬🇭",
  	"flag-gi": "🇬🇮",
  	"flag-gl": "🇬🇱",
  	"flag-gm": "🇬🇲",
  	"flag-gn": "🇬🇳",
  	"flag-gp": "🇬🇵",
  	"flag-gq": "🇬🇶",
  	"flag-gr": "🇬🇷",
  	"flag-gs": "🇬🇸",
  	"flag-gt": "🇬🇹",
  	"flag-gu": "🇬🇺",
  	"flag-gw": "🇬🇼",
  	"flag-gy": "🇬🇾",
  	"flag-hk": "🇭🇰",
  	"flag-hm": "🇭🇲",
  	"flag-hn": "🇭🇳",
  	"flag-hr": "🇭🇷",
  	"flag-ht": "🇭🇹",
  	"flag-hu": "🇭🇺",
  	"flag-ic": "🇮🇨",
  	"flag-id": "🇮🇩",
  	"flag-ie": "🇮🇪",
  	"flag-il": "🇮🇱",
  	"flag-im": "🇮🇲",
  	"flag-in": "🇮🇳",
  	"flag-io": "🇮🇴",
  	"flag-iq": "🇮🇶",
  	"flag-ir": "🇮🇷",
  	"flag-is": "🇮🇸",
  	"flag-it": "🇮🇹",
  	it: it,
  	"flag-je": "🇯🇪",
  	"flag-jm": "🇯🇲",
  	"flag-jo": "🇯🇴",
  	"flag-jp": "🇯🇵",
  	jp: jp,
  	"flag-ke": "🇰🇪",
  	"flag-kg": "🇰🇬",
  	"flag-kh": "🇰🇭",
  	"flag-ki": "🇰🇮",
  	"flag-km": "🇰🇲",
  	"flag-kn": "🇰🇳",
  	"flag-kp": "🇰🇵",
  	"flag-kr": "🇰🇷",
  	kr: kr,
  	"flag-kw": "🇰🇼",
  	"flag-ky": "🇰🇾",
  	"flag-kz": "🇰🇿",
  	"flag-la": "🇱🇦",
  	"flag-lb": "🇱🇧",
  	"flag-lc": "🇱🇨",
  	"flag-li": "🇱🇮",
  	"flag-lk": "🇱🇰",
  	"flag-lr": "🇱🇷",
  	"flag-ls": "🇱🇸",
  	"flag-lt": "🇱🇹",
  	"flag-lu": "🇱🇺",
  	"flag-lv": "🇱🇻",
  	"flag-ly": "🇱🇾",
  	"flag-ma": "🇲🇦",
  	"flag-mc": "🇲🇨",
  	"flag-md": "🇲🇩",
  	"flag-me": "🇲🇪",
  	"flag-mf": "🇲🇫",
  	"flag-mg": "🇲🇬",
  	"flag-mh": "🇲🇭",
  	"flag-mk": "🇲🇰",
  	"flag-ml": "🇲🇱",
  	"flag-mm": "🇲🇲",
  	"flag-mn": "🇲🇳",
  	"flag-mo": "🇲🇴",
  	"flag-mp": "🇲🇵",
  	"flag-mq": "🇲🇶",
  	"flag-mr": "🇲🇷",
  	"flag-ms": "🇲🇸",
  	"flag-mt": "🇲🇹",
  	"flag-mu": "🇲🇺",
  	"flag-mv": "🇲🇻",
  	"flag-mw": "🇲🇼",
  	"flag-mx": "🇲🇽",
  	"flag-my": "🇲🇾",
  	"flag-mz": "🇲🇿",
  	"flag-na": "🇳🇦",
  	"flag-nc": "🇳🇨",
  	"flag-ne": "🇳🇪",
  	"flag-nf": "🇳🇫",
  	"flag-ng": "🇳🇬",
  	"flag-ni": "🇳🇮",
  	"flag-nl": "🇳🇱",
  	"flag-no": "🇳🇴",
  	"flag-np": "🇳🇵",
  	"flag-nr": "🇳🇷",
  	"flag-nu": "🇳🇺",
  	"flag-nz": "🇳🇿",
  	"flag-om": "🇴🇲",
  	"flag-pa": "🇵🇦",
  	"flag-pe": "🇵🇪",
  	"flag-pf": "🇵🇫",
  	"flag-pg": "🇵🇬",
  	"flag-ph": "🇵🇭",
  	"flag-pk": "🇵🇰",
  	"flag-pl": "🇵🇱",
  	"flag-pm": "🇵🇲",
  	"flag-pn": "🇵🇳",
  	"flag-pr": "🇵🇷",
  	"flag-ps": "🇵🇸",
  	"flag-pt": "🇵🇹",
  	"flag-pw": "🇵🇼",
  	"flag-py": "🇵🇾",
  	"flag-qa": "🇶🇦",
  	"flag-re": "🇷🇪",
  	"flag-ro": "🇷🇴",
  	"flag-rs": "🇷🇸",
  	"flag-ru": "🇷🇺",
  	ru: ru,
  	"flag-rw": "🇷🇼",
  	"flag-sa": "🇸🇦",
  	"flag-sb": "🇸🇧",
  	"flag-sc": "🇸🇨",
  	"flag-sd": "🇸🇩",
  	"flag-se": "🇸🇪",
  	"flag-sg": "🇸🇬",
  	"flag-sh": "🇸🇭",
  	"flag-si": "🇸🇮",
  	"flag-sj": "🇸🇯",
  	"flag-sk": "🇸🇰",
  	"flag-sl": "🇸🇱",
  	"flag-sm": "🇸🇲",
  	"flag-sn": "🇸🇳",
  	"flag-so": "🇸🇴",
  	"flag-sr": "🇸🇷",
  	"flag-ss": "🇸🇸",
  	"flag-st": "🇸🇹",
  	"flag-sv": "🇸🇻",
  	"flag-sx": "🇸🇽",
  	"flag-sy": "🇸🇾",
  	"flag-sz": "🇸🇿",
  	"flag-ta": "🇹🇦",
  	"flag-tc": "🇹🇨",
  	"flag-td": "🇹🇩",
  	"flag-tf": "🇹🇫",
  	"flag-tg": "🇹🇬",
  	"flag-th": "🇹🇭",
  	"flag-tj": "🇹🇯",
  	"flag-tk": "🇹🇰",
  	"flag-tl": "🇹🇱",
  	"flag-tm": "🇹🇲",
  	"flag-tn": "🇹🇳",
  	"flag-to": "🇹🇴",
  	"flag-tr": "🇹🇷",
  	"flag-tt": "🇹🇹",
  	"flag-tv": "🇹🇻",
  	"flag-tw": "🇹🇼",
  	"flag-tz": "🇹🇿",
  	"flag-ua": "🇺🇦",
  	"flag-ug": "🇺🇬",
  	"flag-um": "🇺🇲",
  	"flag-us": "🇺🇸",
  	us: us,
  	"flag-uy": "🇺🇾",
  	"flag-uz": "🇺🇿",
  	"flag-va": "🇻🇦",
  	"flag-vc": "🇻🇨",
  	"flag-ve": "🇻🇪",
  	"flag-vg": "🇻🇬",
  	"flag-vi": "🇻🇮",
  	"flag-vn": "🇻🇳",
  	"flag-vu": "🇻🇺",
  	"flag-wf": "🇼🇫",
  	"flag-ws": "🇼🇸",
  	"flag-xk": "🇽🇰",
  	"flag-ye": "🇾🇪",
  	"flag-yt": "🇾🇹",
  	"flag-za": "🇿🇦",
  	"flag-zm": "🇿🇲",
  	"flag-zw": "🇿🇼",
  	"man-man-boy": "👨‍👨‍👦",
  	"man-man-boy-boy": "👨‍👨‍👦‍👦",
  	"man-man-girl": "👨‍👨‍👧",
  	"man-man-girl-boy": "👨‍👨‍👧‍👦",
  	"man-man-girl-girl": "👨‍👨‍👧‍👧",
  	"man-woman-boy-boy": "👨‍👩‍👦‍👦",
  	"man-woman-girl": "👨‍👩‍👧",
  	"man-woman-girl-boy": "👨‍👩‍👧‍👦",
  	"man-woman-girl-girl": "👨‍👩‍👧‍👧",
  	"man-heart-man": "👨‍❤️‍👨",
  	"man-kiss-man": "👨‍❤️‍💋‍👨",
  	"woman-woman-boy": "👩‍👩‍👦",
  	"woman-woman-boy-boy": "👩‍👩‍👦‍👦",
  	"woman-woman-girl": "👩‍👩‍👧",
  	"woman-woman-girl-boy": "👩‍👩‍👧‍👦",
  	"woman-woman-girl-girl": "👩‍👩‍👧‍👧",
  	"woman-heart-woman": "👩‍❤️‍👩",
  	"woman-kiss-woman": "👩‍❤️‍💋‍👩"
  };

  var emoji$1 = /*#__PURE__*/Object.freeze({
    interrobang: interrobang,
    tm: tm,
    information_source: information_source,
    left_right_arrow: left_right_arrow,
    arrow_up_down: arrow_up_down,
    arrow_upper_left: arrow_upper_left,
    arrow_upper_right: arrow_upper_right,
    arrow_lower_right: arrow_lower_right,
    arrow_lower_left: arrow_lower_left,
    keyboard: keyboard,
    sunny: sunny,
    cloud: cloud,
    umbrella: umbrella,
    showman: showman,
    comet: comet,
    ballot_box_with_check: ballot_box_with_check,
    coffee: coffee,
    shamrock: shamrock,
    skull_and_crossbones: skull_and_crossbones,
    radioactive_sign: radioactive_sign,
    biohazard_sign: biohazard_sign,
    orthodox_cross: orthodox_cross,
    wheel_of_dharma: wheel_of_dharma,
    white_frowning_face: white_frowning_face,
    aries: aries,
    taurus: taurus,
    sagittarius: sagittarius,
    capricorn: capricorn,
    aquarius: aquarius,
    pisces: pisces,
    spades: spades,
    clubs: clubs,
    hearts: hearts,
    diamonds: diamonds,
    hotsprings: hotsprings,
    hammer_and_pick: hammer_and_pick,
    anchor: anchor,
    crossed_swords: crossed_swords,
    scales: scales,
    alembic: alembic,
    gear: gear,
    scissors: scissors,
    white_check_mark: white_check_mark,
    airplane: airplane,
    email: email,
    envelope: envelope,
    black_nib: black_nib,
    heavy_check_mark: heavy_check_mark,
    heavy_multiplication_x: heavy_multiplication_x,
    star_of_david: star_of_david,
    sparkles: sparkles,
    eight_spoked_asterisk: eight_spoked_asterisk,
    eight_pointed_black_star: eight_pointed_black_star,
    snowflake: snowflake,
    sparkle: sparkle,
    question: question,
    grey_question: grey_question,
    grey_exclamation: grey_exclamation,
    exclamation: exclamation,
    heavy_exclamation_mark: heavy_exclamation_mark,
    heavy_heart_exclamation_mark_ornament: heavy_heart_exclamation_mark_ornament,
    heart: heart,
    heavy_plus_sign: heavy_plus_sign,
    heavy_minus_sign: heavy_minus_sign,
    heavy_division_sign: heavy_division_sign,
    arrow_heading_up: arrow_heading_up,
    arrow_heading_down: arrow_heading_down,
    wavy_dash: wavy_dash,
    congratulations: congratulations,
    secret: secret,
    copyright: copyright,
    registered: registered,
    bangbang: bangbang,
    leftwards_arrow_with_hook: leftwards_arrow_with_hook,
    arrow_right_hook: arrow_right_hook,
    watch: watch,
    hourglass: hourglass,
    fast_forward: fast_forward,
    rewind: rewind,
    arrow_double_up: arrow_double_up,
    arrow_double_down: arrow_double_down,
    black_right_pointing_double_triangle_with_vertical_bar: black_right_pointing_double_triangle_with_vertical_bar,
    black_left_pointing_double_triangle_with_vertical_bar: black_left_pointing_double_triangle_with_vertical_bar,
    black_right_pointing_triangle_with_double_vertical_bar: black_right_pointing_triangle_with_double_vertical_bar,
    alarm_clock: alarm_clock,
    stopwatch: stopwatch,
    timer_clock: timer_clock,
    hourglass_flowing_sand: hourglass_flowing_sand,
    double_vertical_bar: double_vertical_bar,
    black_square_for_stop: black_square_for_stop,
    black_circle_for_record: black_circle_for_record,
    m: m,
    black_small_square: black_small_square,
    white_small_square: white_small_square,
    arrow_forward: arrow_forward,
    arrow_backward: arrow_backward,
    white_medium_square: white_medium_square,
    black_medium_square: black_medium_square,
    white_medium_small_square: white_medium_small_square,
    black_medium_small_square: black_medium_small_square,
    phone: phone,
    telephone: telephone,
    point_up: point_up,
    star_and_crescent: star_and_crescent,
    peace_symbol: peace_symbol,
    yin_yang: yin_yang,
    relaxed: relaxed,
    gemini: gemini,
    cancer: cancer,
    leo: leo,
    virgo: virgo,
    libra: libra,
    scorpius: scorpius,
    recycle: recycle,
    wheelchair: wheelchair,
    atom_symbol: atom_symbol,
    fleur_de_lis: fleur_de_lis,
    warning: warning,
    zap: zap,
    white_circle: white_circle,
    black_circle: black_circle,
    coffin: coffin,
    funeral_urn: funeral_urn,
    soccer: soccer,
    baseball: baseball,
    snowman: snowman,
    partly_sunny: partly_sunny,
    thunder_cloud_and_rain: thunder_cloud_and_rain,
    ophiuchus: ophiuchus,
    pick: pick,
    helmet_with_white_cross: helmet_with_white_cross,
    chains: chains,
    no_entry: no_entry,
    shinto_shrine: shinto_shrine,
    church: church,
    mountain: mountain,
    umbrella_on_ground: umbrella_on_ground,
    fountain: fountain,
    golf: golf,
    ferry: ferry,
    boat: boat,
    sailboat: sailboat,
    skier: skier,
    ice_skate: ice_skate,
    person_with_ball: person_with_ball,
    tent: tent,
    fuelpump: fuelpump,
    fist: fist,
    hand: hand,
    raised_hand: raised_hand,
    v: v,
    writing_hand: writing_hand,
    pencil2: pencil2,
    latin_cross: latin_cross,
    x: x,
    negative_squared_cross_mark: negative_squared_cross_mark,
    arrow_right: arrow_right,
    curly_loop: curly_loop,
    loop: loop,
    arrow_left: arrow_left,
    arrow_up: arrow_up,
    arrow_down: arrow_down,
    black_large_square: black_large_square,
    white_large_square: white_large_square,
    star: star,
    o: o,
    part_alternation_mark: part_alternation_mark,
    mahjong: mahjong,
    black_joker: black_joker,
    a: a,
    b: b,
    o2: o2,
    parking: parking,
    ab: ab,
    cl: cl,
    cool: cool,
    free: free,
    id: id,
    ng: ng,
    ok: ok,
    sos: sos,
    up: up,
    vs: vs,
    koko: koko,
    sa: sa,
    u7121: u7121,
    u6307: u6307,
    u7981: u7981,
    u7a7a: u7a7a,
    u5408: u5408,
    u6e80: u6e80,
    u6709: u6709,
    u6708: u6708,
    u7533: u7533,
    u5272: u5272,
    u55b6: u55b6,
    ideograph_advantage: ideograph_advantage,
    accept: accept,
    cyclone: cyclone,
    foggy: foggy,
    closed_umbrella: closed_umbrella,
    night_with_stars: night_with_stars,
    sunrise_over_mountains: sunrise_over_mountains,
    sunrise: sunrise,
    city_sunset: city_sunset,
    city_sunrise: city_sunrise,
    rainbow: rainbow,
    bridge_at_night: bridge_at_night,
    ocean: ocean,
    volcano: volcano,
    milky_way: milky_way,
    earth_africa: earth_africa,
    earth_americas: earth_americas,
    earth_asia: earth_asia,
    globe_with_meridians: globe_with_meridians,
    new_moon: new_moon,
    waxing_crescent_moon: waxing_crescent_moon,
    first_quarter_moon: first_quarter_moon,
    moon: moon,
    waxing_gibbous_moon: waxing_gibbous_moon,
    full_moon: full_moon,
    waning_gibbous_moon: waning_gibbous_moon,
    last_quarter_moon: last_quarter_moon,
    waning_crescent_moon: waning_crescent_moon,
    crescent_moon: crescent_moon,
    new_moon_with_face: new_moon_with_face,
    first_quarter_moon_with_face: first_quarter_moon_with_face,
    last_quarter_moon_with_face: last_quarter_moon_with_face,
    full_moon_with_face: full_moon_with_face,
    sun_with_face: sun_with_face,
    star2: star2,
    stars: stars,
    thermometer: thermometer,
    mostly_sunny: mostly_sunny,
    sun_small_cloud: sun_small_cloud,
    barely_sunny: barely_sunny,
    sun_behind_cloud: sun_behind_cloud,
    partly_sunny_rain: partly_sunny_rain,
    sun_behind_rain_cloud: sun_behind_rain_cloud,
    rain_cloud: rain_cloud,
    snow_cloud: snow_cloud,
    lightning: lightning,
    lightning_cloud: lightning_cloud,
    tornado: tornado,
    tornado_cloud: tornado_cloud,
    fog: fog,
    wind_blowing_face: wind_blowing_face,
    hotdog: hotdog,
    taco: taco,
    burrito: burrito,
    chestnut: chestnut,
    seedling: seedling,
    evergreen_tree: evergreen_tree,
    deciduous_tree: deciduous_tree,
    palm_tree: palm_tree,
    cactus: cactus,
    hot_pepper: hot_pepper,
    tulip: tulip,
    cherry_blossom: cherry_blossom,
    rose: rose,
    hibiscus: hibiscus,
    sunflower: sunflower,
    blossom: blossom,
    corn: corn,
    ear_of_rice: ear_of_rice,
    herb: herb,
    four_leaf_clover: four_leaf_clover,
    maple_leaf: maple_leaf,
    fallen_leaf: fallen_leaf,
    leaves: leaves,
    mushroom: mushroom,
    tomato: tomato,
    eggplant: eggplant,
    grapes: grapes,
    melon: melon,
    watermelon: watermelon,
    tangerine: tangerine,
    lemon: lemon,
    banana: banana,
    pineapple: pineapple,
    apple: apple,
    green_apple: green_apple,
    pear: pear,
    peach: peach,
    cherries: cherries,
    strawberry: strawberry,
    hamburger: hamburger,
    pizza: pizza,
    meat_on_bone: meat_on_bone,
    poultry_leg: poultry_leg,
    rice_cracker: rice_cracker,
    rice_ball: rice_ball,
    rice: rice,
    curry: curry,
    ramen: ramen,
    spaghetti: spaghetti,
    bread: bread,
    fries: fries,
    sweet_potato: sweet_potato,
    dango: dango,
    oden: oden,
    sushi: sushi,
    fried_shrimp: fried_shrimp,
    fish_cake: fish_cake,
    icecream: icecream,
    shaved_ice: shaved_ice,
    ice_cream: ice_cream,
    doughnut: doughnut,
    cookie: cookie,
    chocolate_bar: chocolate_bar,
    candy: candy,
    lollipop: lollipop,
    custard: custard,
    honey_pot: honey_pot,
    cake: cake,
    bento: bento,
    stew: stew,
    egg: egg,
    fork_and_knife: fork_and_knife,
    tea: tea,
    sake: sake,
    wine_glass: wine_glass,
    cocktail: cocktail,
    tropical_drink: tropical_drink,
    beer: beer,
    beers: beers,
    baby_bottle: baby_bottle,
    knife_fork_plate: knife_fork_plate,
    champagne: champagne,
    popcorn: popcorn,
    ribbon: ribbon,
    gift: gift,
    birthday: birthday,
    jack_o_lantern: jack_o_lantern,
    christmas_tree: christmas_tree,
    santa: santa,
    fireworks: fireworks,
    sparkler: sparkler,
    balloon: balloon,
    tada: tada,
    confetti_ball: confetti_ball,
    tanabata_tree: tanabata_tree,
    crossed_flags: crossed_flags,
    bamboo: bamboo,
    dolls: dolls,
    flags: flags,
    wind_chime: wind_chime,
    rice_scene: rice_scene,
    school_satchel: school_satchel,
    mortar_board: mortar_board,
    medal: medal,
    reminder_ribbon: reminder_ribbon,
    studio_microphone: studio_microphone,
    level_slider: level_slider,
    control_knobs: control_knobs,
    film_frames: film_frames,
    admission_tickets: admission_tickets,
    carousel_horse: carousel_horse,
    ferris_wheel: ferris_wheel,
    roller_coaster: roller_coaster,
    fishing_pole_and_fish: fishing_pole_and_fish,
    microphone: microphone,
    movie_camera: movie_camera,
    cinema: cinema,
    headphones: headphones,
    art: art,
    tophat: tophat,
    circus_tent: circus_tent,
    ticket: ticket,
    clapper: clapper,
    performing_arts: performing_arts,
    video_game: video_game,
    dart: dart,
    slot_machine: slot_machine,
    game_die: game_die,
    bowling: bowling,
    flower_playing_cards: flower_playing_cards,
    musical_note: musical_note,
    notes: notes,
    saxophone: saxophone,
    guitar: guitar,
    musical_keyboard: musical_keyboard,
    trumpet: trumpet,
    violin: violin,
    musical_score: musical_score,
    running_shirt_with_sash: running_shirt_with_sash,
    tennis: tennis,
    ski: ski,
    basketball: basketball,
    checkered_flag: checkered_flag,
    snowboarder: snowboarder,
    runner: runner,
    running: running,
    surfer: surfer,
    sports_medal: sports_medal,
    trophy: trophy,
    horse_racing: horse_racing,
    football: football,
    rugby_football: rugby_football,
    swimmer: swimmer,
    weight_lifter: weight_lifter,
    golfer: golfer,
    racing_motorcycle: racing_motorcycle,
    racing_car: racing_car,
    cricket_bat_and_ball: cricket_bat_and_ball,
    volleyball: volleyball,
    field_hockey_stick_and_ball: field_hockey_stick_and_ball,
    ice_hockey_stick_and_puck: ice_hockey_stick_and_puck,
    table_tennis_paddle_and_ball: table_tennis_paddle_and_ball,
    snow_capped_mountain: snow_capped_mountain,
    camping: camping,
    beach_with_umbrella: beach_with_umbrella,
    building_construction: building_construction,
    house_buildings: house_buildings,
    cityscape: cityscape,
    derelict_house_building: derelict_house_building,
    classical_building: classical_building,
    desert: desert,
    desert_island: desert_island,
    national_park: national_park,
    stadium: stadium,
    house: house,
    house_with_garden: house_with_garden,
    office: office,
    post_office: post_office,
    european_post_office: european_post_office,
    hospital: hospital,
    bank: bank,
    atm: atm,
    hotel: hotel,
    love_hotel: love_hotel,
    convenience_store: convenience_store,
    school: school,
    department_store: department_store,
    factory: factory,
    izakaya_lantern: izakaya_lantern,
    lantern: lantern,
    japanese_castle: japanese_castle,
    european_castle: european_castle,
    waving_white_flag: waving_white_flag,
    waving_black_flag: waving_black_flag,
    rosette: rosette,
    label: label,
    badminton_racquet_and_shuttlecock: badminton_racquet_and_shuttlecock,
    bow_and_arrow: bow_and_arrow,
    amphora: amphora,
    rat: rat,
    mouse2: mouse2,
    ox: ox,
    water_buffalo: water_buffalo,
    cow2: cow2,
    tiger2: tiger2,
    leopard: leopard,
    rabbit2: rabbit2,
    cat2: cat2,
    dragon: dragon,
    crocodile: crocodile,
    whale2: whale2,
    snail: snail,
    snake: snake,
    racehorse: racehorse,
    ram: ram,
    goat: goat,
    sheep: sheep,
    monkey: monkey,
    rooster: rooster,
    chicken: chicken,
    dog2: dog2,
    pig2: pig2,
    boar: boar,
    elephant: elephant,
    octopus: octopus,
    shell: shell,
    bug: bug,
    ant: ant,
    bee: bee,
    honeybee: honeybee,
    beetle: beetle,
    fish: fish,
    tropical_fish: tropical_fish,
    blowfish: blowfish,
    turtle: turtle,
    hatching_chick: hatching_chick,
    baby_chick: baby_chick,
    hatched_chick: hatched_chick,
    bird: bird,
    penguin: penguin,
    koala: koala,
    poodle: poodle,
    dromedary_camel: dromedary_camel,
    camel: camel,
    dolphin: dolphin,
    flipper: flipper,
    mouse: mouse,
    cow: cow,
    tiger: tiger,
    rabbit: rabbit,
    cat: cat,
    dragon_face: dragon_face,
    whale: whale,
    horse: horse,
    monkey_face: monkey_face,
    dog: dog,
    pig: pig,
    frog: frog,
    hamster: hamster,
    wolf: wolf,
    bear: bear,
    panda_face: panda_face,
    pig_nose: pig_nose,
    feet: feet,
    paw_prints: paw_prints,
    chipmunk: chipmunk,
    eyes: eyes,
    eye: eye,
    ear: ear,
    nose: nose,
    lips: lips,
    tongue: tongue,
    point_up_2: point_up_2,
    point_down: point_down,
    point_left: point_left,
    point_right: point_right,
    facepunch: facepunch,
    punch: punch,
    wave: wave,
    ok_hand: ok_hand,
    thumbsup: thumbsup,
    thumbsdown: thumbsdown,
    clap: clap,
    open_hands: open_hands,
    crown: crown,
    womans_hat: womans_hat,
    eyeglasses: eyeglasses,
    necktie: necktie,
    shirt: shirt,
    tshirt: tshirt,
    jeans: jeans,
    dress: dress,
    kimono: kimono,
    bikini: bikini,
    womans_clothes: womans_clothes,
    purse: purse,
    handbag: handbag,
    pouch: pouch,
    mans_shoe: mans_shoe,
    shoe: shoe,
    athletic_shoe: athletic_shoe,
    high_heel: high_heel,
    sandal: sandal,
    boot: boot,
    footprints: footprints,
    bust_in_silhouette: bust_in_silhouette,
    busts_in_silhouette: busts_in_silhouette,
    boy: boy,
    girl: girl,
    man: man,
    woman: woman,
    family: family,
    couple: couple,
    man_and_woman_holding_hands: man_and_woman_holding_hands,
    two_men_holding_hands: two_men_holding_hands,
    two_women_holding_hands: two_women_holding_hands,
    cop: cop,
    dancers: dancers,
    bride_with_veil: bride_with_veil,
    person_with_blond_hair: person_with_blond_hair,
    man_with_gua_pi_mao: man_with_gua_pi_mao,
    man_with_turban: man_with_turban,
    older_man: older_man,
    older_woman: older_woman,
    baby: baby,
    construction_worker: construction_worker,
    princess: princess,
    japanese_ogre: japanese_ogre,
    japanese_goblin: japanese_goblin,
    ghost: ghost,
    angel: angel,
    alien: alien,
    space_invader: space_invader,
    imp: imp,
    skull: skull,
    information_desk_person: information_desk_person,
    guardsman: guardsman,
    dancer: dancer,
    lipstick: lipstick,
    nail_care: nail_care,
    massage: massage,
    haircut: haircut,
    barber: barber,
    syringe: syringe,
    pill: pill,
    kiss: kiss,
    love_letter: love_letter,
    ring: ring,
    gem: gem,
    couplekiss: couplekiss,
    bouquet: bouquet,
    couple_with_heart: couple_with_heart,
    wedding: wedding,
    heartbeat: heartbeat,
    broken_heart: broken_heart,
    two_hearts: two_hearts,
    sparkling_heart: sparkling_heart,
    heartpulse: heartpulse,
    cupid: cupid,
    blue_heart: blue_heart,
    green_heart: green_heart,
    yellow_heart: yellow_heart,
    purple_heart: purple_heart,
    gift_heart: gift_heart,
    revolving_hearts: revolving_hearts,
    heart_decoration: heart_decoration,
    diamond_shape_with_a_dot_inside: diamond_shape_with_a_dot_inside,
    bulb: bulb,
    anger: anger,
    bomb: bomb,
    zzz: zzz,
    boom: boom,
    collision: collision,
    sweat_drops: sweat_drops,
    droplet: droplet,
    dash: dash,
    hankey: hankey,
    poop: poop,
    shit: shit,
    muscle: muscle,
    dizzy: dizzy,
    speech_balloon: speech_balloon,
    thought_balloon: thought_balloon,
    white_flower: white_flower,
    moneybag: moneybag,
    currency_exchange: currency_exchange,
    heavy_dollar_sign: heavy_dollar_sign,
    credit_card: credit_card,
    yen: yen,
    dollar: dollar,
    euro: euro,
    pound: pound,
    money_with_wings: money_with_wings,
    chart: chart,
    seat: seat,
    computer: computer,
    briefcase: briefcase,
    minidisc: minidisc,
    floppy_disk: floppy_disk,
    cd: cd,
    dvd: dvd,
    file_folder: file_folder,
    open_file_folder: open_file_folder,
    page_with_curl: page_with_curl,
    page_facing_up: page_facing_up,
    date: date,
    calendar: calendar,
    card_index: card_index,
    chart_with_upwards_trend: chart_with_upwards_trend,
    chart_with_downwards_trend: chart_with_downwards_trend,
    bar_chart: bar_chart,
    clipboard: clipboard,
    pushpin: pushpin,
    round_pushpin: round_pushpin,
    paperclip: paperclip,
    straight_ruler: straight_ruler,
    triangular_ruler: triangular_ruler,
    bookmark_tabs: bookmark_tabs,
    ledger: ledger,
    notebook: notebook,
    notebook_with_decorative_cover: notebook_with_decorative_cover,
    closed_book: closed_book,
    book: book,
    open_book: open_book,
    green_book: green_book,
    blue_book: blue_book,
    orange_book: orange_book,
    books: books,
    name_badge: name_badge,
    scroll: scroll,
    memo: memo,
    pencil: pencil,
    telephone_receiver: telephone_receiver,
    pager: pager,
    fax: fax,
    satellite: satellite,
    loudspeaker: loudspeaker,
    mega: mega,
    outbox_tray: outbox_tray,
    inbox_tray: inbox_tray,
    incoming_envelope: incoming_envelope,
    envelope_with_arrow: envelope_with_arrow,
    mailbox_closed: mailbox_closed,
    mailbox: mailbox,
    mailbox_with_mail: mailbox_with_mail,
    mailbox_with_no_mail: mailbox_with_no_mail,
    postbox: postbox,
    postal_horn: postal_horn,
    newspaper: newspaper,
    iphone: iphone,
    calling: calling,
    vibration_mode: vibration_mode,
    mobile_phone_off: mobile_phone_off,
    no_mobile_phones: no_mobile_phones,
    signal_strength: signal_strength,
    camera: camera,
    camera_with_flash: camera_with_flash,
    video_camera: video_camera,
    tv: tv,
    radio: radio,
    vhs: vhs,
    film_projector: film_projector,
    prayer_beads: prayer_beads,
    twisted_rightwards_arrows: twisted_rightwards_arrows,
    repeat: repeat,
    repeat_one: repeat_one,
    arrows_clockwise: arrows_clockwise,
    arrows_counterclockwise: arrows_counterclockwise,
    low_brightness: low_brightness,
    high_brightness: high_brightness,
    mute: mute,
    speaker: speaker,
    sound: sound,
    loud_sound: loud_sound,
    battery: battery,
    electric_plug: electric_plug,
    mag: mag,
    mag_right: mag_right,
    lock_with_ink_pen: lock_with_ink_pen,
    closed_lock_with_key: closed_lock_with_key,
    key: key,
    lock: lock,
    unlock: unlock,
    bell: bell,
    no_bell: no_bell,
    bookmark: bookmark,
    link: link,
    radio_button: radio_button,
    back: back,
    end: end,
    on: on,
    soon: soon,
    top: top,
    underage: underage,
    keycap_ten: keycap_ten,
    capital_abcd: capital_abcd,
    abcd: abcd,
    symbols: symbols,
    abc: abc,
    fire: fire,
    flashlight: flashlight,
    wrench: wrench,
    hammer: hammer,
    nut_and_bolt: nut_and_bolt,
    hocho: hocho,
    knife: knife,
    gun: gun,
    microscope: microscope,
    telescope: telescope,
    crystal_ball: crystal_ball,
    six_pointed_star: six_pointed_star,
    beginner: beginner,
    trident: trident,
    black_square_button: black_square_button,
    white_square_button: white_square_button,
    red_circle: red_circle,
    large_blue_circle: large_blue_circle,
    large_orange_diamond: large_orange_diamond,
    large_blue_diamond: large_blue_diamond,
    small_orange_diamond: small_orange_diamond,
    small_blue_diamond: small_blue_diamond,
    small_red_triangle: small_red_triangle,
    small_red_triangle_down: small_red_triangle_down,
    arrow_up_small: arrow_up_small,
    arrow_down_small: arrow_down_small,
    om_symbol: om_symbol,
    dove_of_peace: dove_of_peace,
    kaaba: kaaba,
    mosque: mosque,
    synagogue: synagogue,
    menorah_with_nine_branches: menorah_with_nine_branches,
    clock1: clock1,
    clock2: clock2,
    clock3: clock3,
    clock4: clock4,
    clock5: clock5,
    clock6: clock6,
    clock7: clock7,
    clock8: clock8,
    clock9: clock9,
    clock10: clock10,
    clock11: clock11,
    clock12: clock12,
    clock130: clock130,
    clock230: clock230,
    clock330: clock330,
    clock430: clock430,
    clock530: clock530,
    clock630: clock630,
    clock730: clock730,
    clock830: clock830,
    clock930: clock930,
    clock1030: clock1030,
    clock1130: clock1130,
    clock1230: clock1230,
    candle: candle,
    mantelpiece_clock: mantelpiece_clock,
    hole: hole,
    man_in_business_suit_levitating: man_in_business_suit_levitating,
    sleuth_or_spy: sleuth_or_spy,
    dark_sunglasses: dark_sunglasses,
    spider: spider,
    spider_web: spider_web,
    joystick: joystick,
    linked_paperclips: linked_paperclips,
    lower_left_ballpoint_pen: lower_left_ballpoint_pen,
    lower_left_fountain_pen: lower_left_fountain_pen,
    lower_left_paintbrush: lower_left_paintbrush,
    lower_left_crayon: lower_left_crayon,
    raised_hand_with_fingers_splayed: raised_hand_with_fingers_splayed,
    middle_finger: middle_finger,
    reversed_hand_with_middle_finger_extended: reversed_hand_with_middle_finger_extended,
    desktop_computer: desktop_computer,
    printer: printer,
    three_button_mouse: three_button_mouse,
    trackball: trackball,
    frame_with_picture: frame_with_picture,
    card_index_dividers: card_index_dividers,
    card_file_box: card_file_box,
    file_cabinet: file_cabinet,
    wastebasket: wastebasket,
    spiral_note_pad: spiral_note_pad,
    spiral_calendar_pad: spiral_calendar_pad,
    compression: compression,
    old_key: old_key,
    rolled_up_newspaper: rolled_up_newspaper,
    dagger_knife: dagger_knife,
    speaking_head_in_silhouette: speaking_head_in_silhouette,
    left_speech_bubble: left_speech_bubble,
    right_anger_bubble: right_anger_bubble,
    ballot_box_with_ballot: ballot_box_with_ballot,
    world_map: world_map,
    mount_fuji: mount_fuji,
    tokyo_tower: tokyo_tower,
    statue_of_liberty: statue_of_liberty,
    japan: japan,
    moyai: moyai,
    grinning: grinning,
    grin: grin,
    joy: joy,
    smiley: smiley,
    smile: smile,
    sweat_smile: sweat_smile,
    laughing: laughing,
    satisfied: satisfied,
    innocent: innocent,
    smiling_imp: smiling_imp,
    wink: wink,
    blush: blush,
    yum: yum,
    relieved: relieved,
    heart_eyes: heart_eyes,
    sunglasses: sunglasses,
    smirk: smirk,
    neutral_face: neutral_face,
    expressionless: expressionless,
    unamused: unamused,
    sweat: sweat,
    pensive: pensive,
    confused: confused,
    confounded: confounded,
    kissing: kissing,
    kissing_heart: kissing_heart,
    kissing_smiling_eyes: kissing_smiling_eyes,
    kissing_closed_eyes: kissing_closed_eyes,
    stuck_out_tongue: stuck_out_tongue,
    stuck_out_tongue_winking_eye: stuck_out_tongue_winking_eye,
    stuck_out_tongue_closed_eyes: stuck_out_tongue_closed_eyes,
    disappointed: disappointed,
    worried: worried,
    angry: angry,
    rage: rage,
    cry: cry,
    persevere: persevere,
    triumph: triumph,
    disappointed_relieved: disappointed_relieved,
    frowning: frowning,
    anguished: anguished,
    fearful: fearful,
    weary: weary,
    sleepy: sleepy,
    tired_face: tired_face,
    grimacing: grimacing,
    sob: sob,
    open_mouth: open_mouth,
    hushed: hushed,
    cold_sweat: cold_sweat,
    scream: scream,
    astonished: astonished,
    flushed: flushed,
    sleeping: sleeping,
    dizzy_face: dizzy_face,
    no_mouth: no_mouth,
    mask: mask,
    smile_cat: smile_cat,
    joy_cat: joy_cat,
    smiley_cat: smiley_cat,
    heart_eyes_cat: heart_eyes_cat,
    smirk_cat: smirk_cat,
    kissing_cat: kissing_cat,
    pouting_cat: pouting_cat,
    crying_cat_face: crying_cat_face,
    scream_cat: scream_cat,
    slightly_frowning_face: slightly_frowning_face,
    slightly_smiling_face: slightly_smiling_face,
    upside_down_face: upside_down_face,
    face_with_rolling_eyes: face_with_rolling_eyes,
    no_good: no_good,
    ok_woman: ok_woman,
    bow: bow,
    see_no_evil: see_no_evil,
    hear_no_evil: hear_no_evil,
    speak_no_evil: speak_no_evil,
    raising_hand: raising_hand,
    raised_hands: raised_hands,
    person_frowning: person_frowning,
    person_with_pouting_face: person_with_pouting_face,
    pray: pray,
    rocket: rocket,
    helicopter: helicopter,
    steam_locomotive: steam_locomotive,
    railway_car: railway_car,
    bullettrain_side: bullettrain_side,
    bullettrain_front: bullettrain_front,
    train2: train2,
    metro: metro,
    light_rail: light_rail,
    station: station,
    tram: tram,
    train: train,
    bus: bus,
    oncoming_bus: oncoming_bus,
    trolleybus: trolleybus,
    busstop: busstop,
    minibus: minibus,
    ambulance: ambulance,
    fire_engine: fire_engine,
    police_car: police_car,
    oncoming_police_car: oncoming_police_car,
    taxi: taxi,
    oncoming_taxi: oncoming_taxi,
    car: car,
    red_car: red_car,
    oncoming_automobile: oncoming_automobile,
    blue_car: blue_car,
    truck: truck,
    articulated_lorry: articulated_lorry,
    tractor: tractor,
    monorail: monorail,
    mountain_railway: mountain_railway,
    suspension_railway: suspension_railway,
    mountain_cableway: mountain_cableway,
    aerial_tramway: aerial_tramway,
    ship: ship,
    rowboat: rowboat,
    speedboat: speedboat,
    traffic_light: traffic_light,
    vertical_traffic_light: vertical_traffic_light,
    construction: construction,
    rotating_light: rotating_light,
    triangular_flag_on_post: triangular_flag_on_post,
    door: door,
    no_entry_sign: no_entry_sign,
    smoking: smoking,
    no_smoking: no_smoking,
    put_litter_in_its_place: put_litter_in_its_place,
    do_not_litter: do_not_litter,
    potable_water: potable_water,
    bike: bike,
    no_bicycles: no_bicycles,
    bicyclist: bicyclist,
    mountain_bicyclist: mountain_bicyclist,
    walking: walking,
    no_pedestrians: no_pedestrians,
    children_crossing: children_crossing,
    mens: mens,
    womens: womens,
    restroom: restroom,
    baby_symbol: baby_symbol,
    toilet: toilet,
    wc: wc,
    shower: shower,
    bath: bath,
    bathtub: bathtub,
    passport_control: passport_control,
    customs: customs,
    baggage_claim: baggage_claim,
    left_luggage: left_luggage,
    couch_and_lamp: couch_and_lamp,
    sleeping_accommodation: sleeping_accommodation,
    shopping_bags: shopping_bags,
    bellhop_bell: bellhop_bell,
    bed: bed,
    place_of_worship: place_of_worship,
    hammer_and_wrench: hammer_and_wrench,
    shield: shield,
    oil_drum: oil_drum,
    motorway: motorway,
    railway_track: railway_track,
    motor_boat: motor_boat,
    small_airplane: small_airplane,
    airplane_departure: airplane_departure,
    airplane_arriving: airplane_arriving,
    passenger_ship: passenger_ship,
    zipper_mouth_face: zipper_mouth_face,
    money_mouth_face: money_mouth_face,
    face_with_thermometer: face_with_thermometer,
    nerd_face: nerd_face,
    thinking_face: thinking_face,
    face_with_head_bandage: face_with_head_bandage,
    robot_face: robot_face,
    hugging_face: hugging_face,
    the_horns: the_horns,
    sign_of_the_horns: sign_of_the_horns,
    crab: crab,
    lion_face: lion_face,
    scorpion: scorpion,
    turkey: turkey,
    unicorn_face: unicorn_face,
    cheese_wedge: cheese_wedge,
    hash: hash,
    keycap_star: keycap_star,
    zero: zero,
    one: one,
    two: two,
    three: three,
    four: four,
    five: five,
    six: six,
    seven: seven,
    eight: eight,
    nine: nine,
    cn: cn,
    de: de,
    es: es,
    fr: fr,
    gb: gb,
    uk: uk,
    it: it,
    jp: jp,
    kr: kr,
    ru: ru,
    us: us,
    default: emoji
  });

  var emojiByName = getCjsExportFromNamespace(emoji$1);

  /**
   * regex to parse emoji in a string - finds emoji, e.g. :coffee:
   */
  var emojiNameRegex = /:([a-zA-Z0-9_\-\+]+):/g;

  /**
   * regex to trim whitespace
   * use instead of String.prototype.trim() for IE8 supprt
   */
  var trimSpaceRegex = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

  /**
   * Removes colons on either side
   * of the string if present
   * @param  {string} str
   * @return {string}
   */
  function stripColons (str) {
    var colonIndex = str.indexOf(':');
    if (colonIndex > -1) {
      // :emoji: (http://www.emoji-cheat-sheet.com/)
      if (colonIndex === str.length - 1) {
        str = str.substring(0, colonIndex);
        return stripColons(str);
      } else {
        str = str.substr(colonIndex + 1);
        return stripColons(str);
      }
    }

    return str;
  }

  /**
   * Adds colons to either side
   * of the string
   * @param {string} str
   * @return {string}
   */
  function wrapColons (str) {
    return (typeof str === 'string' && str.length > 0) ? ':' + str + ':' : str;
  }

  /**
   * Ensure that the word is wrapped in colons
   * by only adding them, if they are not there.
   * @param {string} str
   * @return {string}
   */
  function ensureColons (str) {
    return (typeof str === 'string' && str[0] !== ':') ? wrapColons(str) : str;
  }

  // Non spacing mark, some emoticons have them. It's the 'Variant Form',
  // which provides more information so that emoticons can be rendered as
  // more colorful graphics. FE0E is a unicode text version, where as FE0F
  // should be rendered as a graphical version. The code gracefully degrades.
  var NON_SPACING_MARK = String.fromCharCode(65039); // 65039 - '️' - 0xFE0F;
  var nonSpacingRegex = new RegExp(NON_SPACING_MARK, 'g');

  // Remove the non-spacing-mark from the code, never send a stripped version
  // to the client, as it kills graphical emoticons.
  function stripNSB (code) {
    return code.replace(nonSpacingRegex, '');
  }
  // Reversed hash table, where as emojiByName contains a { heart: '❤' }
  // dictionary emojiByCode contains { ❤: 'heart' }. The codes are normalized
  // to the text version.
  var emojiByCode = Object.keys(emojiByName).reduce(function(h,k) {
    h[stripNSB(emojiByName[k])] = k;
    return h;
  }, {});

  /**
   * Emoji namespace
   */
  var Emoji = {
    emoji: emojiByName,
  };

  /**
   * get emoji code from name
   * @param  {string} emoji
   * @return {string}
   */
  Emoji._get = function _get (emoji) {
    if (emojiByName.hasOwnProperty(emoji)) {
      return emojiByName[emoji];
    }

    return ensureColons(emoji);
  };

  /**
   * get emoji code from :emoji: string or name
   * @param  {string} emoji
   * @return {string}
   */
  Emoji.get = function get (emoji) {
    emoji = stripColons(emoji);

    return Emoji._get(emoji);
  };

  /**
   * find the emoji by either code or name
   * @param {string} nameOrCode The emoji to find, either `coffee`, `:coffee:` or `☕`;
   * @return {object}
   */
  Emoji.find = function find (nameOrCode) {
    return Emoji.findByName(nameOrCode) || Emoji.findByCode(nameOrCode);
  };

  /**
   * find the emoji by name
   * @param {string} name The emoji to find either `coffee` or `:coffee:`;
   * @return {object}
   */
  Emoji.findByName = function findByName (name) {
    var stripped = stripColons(name);
    var emoji = emojiByName[stripped];

    return emoji ? ({ emoji: emoji, key: stripped }) : undefined;
  };

  /**
   * find the emoji by code (emoji)
   * @param {string} code The emoji to find; for example `☕` or `☔`
   * @return {object}
   */
  Emoji.findByCode = function findByCode (code) {
    var stripped = stripNSB(code);
    var name = emojiByCode[stripped];

    // lookup emoji to ensure the Variant Form is returned
    return name ? ({ emoji: emojiByName[name], key: name }) : undefined;
  };


  /**
   * Check if an emoji is known by this library
   * @param {string} nameOrCode The emoji to validate, either `coffee`, `:coffee:` or `☕`;
   * @return {object}
   */
  Emoji.hasEmoji = function hasEmoji (nameOrCode) {
    return Emoji.hasEmojiByName(nameOrCode) || Emoji.hasEmojiByCode(nameOrCode);
  };

  /**
   * Check if an emoji with given name is known by this library
   * @param {string} name The emoji to validate either `coffee` or `:coffee:`;
   * @return {object}
   */
  Emoji.hasEmojiByName = function hasEmojiByName (name) {
    var result = Emoji.findByName(name);
    return !!result && result.key === stripColons(name);
  };

  /**
   * Check if a given emoji is known by this library
   * @param {string} code The emoji to validate; for example `☕` or `☔`
   * @return {object}
   */
  Emoji.hasEmojiByCode = function hasEmojiByCode (code) {
    var result = Emoji.findByCode(code);
    return !!result && stripNSB(result.emoji) === stripNSB(code);
  };

  /**
   * get emoji name from code
   * @param  {string} emoji
   * @param  {boolean} includeColons should the result include the ::
   * @return {string}
   */
  Emoji.which = function which (emoji_code, includeColons) {
    var code = stripNSB(emoji_code);
    var word = emojiByCode[code];

    return includeColons ? wrapColons(word) : word;
  };

  /**
   * emojify a string (replace :emoji: with an emoji)
   * @param  {string} str
   * @param  {function} on_missing (gets emoji name without :: and returns a proper emoji if no emoji was found)
   * @param  {function} format (wrap the returned emoji in a custom element)
   * @return {string}
   */
  Emoji.emojify = function emojify (str, on_missing, format) {
    if (!str) return '';

    return str.split(emojiNameRegex) // parse emoji via regex
              .map(function parseEmoji(s, i) {
                // every second element is an emoji, e.g. "test :fast_forward:" -> [ "test ", "fast_forward" ]
                if (i % 2 === 0) return s;
                var emoji = Emoji._get(s);
                var isMissing = emoji.indexOf(':') > -1;

                if (isMissing && typeof on_missing === 'function') {
                  return on_missing(s);
                }

                if (!isMissing && typeof format === 'function') {
                  return format(emoji, s);
                }

                return emoji;
              })
              .join('') // convert back to string
    ;
  };

  /**
   * return a random emoji
   * @return {string}
   */
  Emoji.random = function random () {
    var emojiKeys = Object.keys(emojiByName);
    var randomIndex = Math.floor(Math.random() * emojiKeys.length);
    var key = emojiKeys[randomIndex];
    var emoji = Emoji._get(key);
    return { key: key, emoji: emoji };
  };

  /**
   *  return an collection of potential emoji matches
   *  @param {string} str
   *  @return {Array.<Object>}
   */
  Emoji.search = function search (str) {
    var emojiKeys = Object.keys(emojiByName);
    var matcher = stripColons(str);
    var matchingKeys = emojiKeys.filter(function(key) {
      return key.toString().indexOf(matcher) === 0;
    });
    return matchingKeys.map(function(key) {
      return {
        key: key,
        emoji: Emoji._get(key),
      };
    });
  };

  /**
   * unemojify a string (replace emoji with :emoji:)
   * @param  {string} str
   * @return {string}
   */
  Emoji.unemojify = function unemojify (str) {
    if (!str) return '';
    var words = lodash_toarray(str);

    return words.map(function(word) {
      return Emoji.which(word, true) || word;
    }).join('');
  };

  /**
   * replace emojis with replacement value
   * @param {string} str
   * @param {function|string} the string or callback function to replace the emoji with
   * @param {boolean} should trailing whitespaces be cleaned? Defaults false
   * @return {string}
   */
  Emoji.replace = function replace (str, replacement, cleanSpaces) {
    if (!str) return '';

    var replace = typeof replacement === 'function' ? replacement : function() { return replacement; };
    var words = lodash_toarray(str);

    var replaced = words.map(function(word, idx) {
      var emoji = Emoji.findByCode(word);
      
      if (emoji && cleanSpaces && words[idx + 1] === ' ') {
        words[idx + 1] = '';
      }

      return emoji ? replace(emoji) : word;
    }).join('');

    return cleanSpaces ? replaced.replace(trimSpaceRegex, '') : replaced;
  };


  /**
   * remove all emojis from a string
   * @param {string} str
   * @return {string}
   */
  Emoji.strip = function strip (str) {
    return Emoji.replace(str, '', true);
  };

  var emoji$2 = Emoji;

  var nodeEmoji = emoji$2;

  /**
   * ユーザ
   */
  class User {
    constructor(name) {
      Object.assign(this, { name });
    }

    equals(other) {
      return this.name === other.name;
    }
  }

  /**
   * ユーザの集合
   */
  class Users {
    static of(...users) {
      return new this(users);
    }
    /**
     * @param {Array<User>}
     */
    constructor(users) {
      Object.assign(this, { users });
    }

    length() {
      return this.users.length;
    }

    append(user) {
      return new this.constructor([...this.users, user]);
    }

    merge(other) {
      return new this.constructor([...this.users, ...other.users]);
    }

    includes(user) {
      return !!this.users.find(u => u.equals(user));
    }

    notIncludes(user) {
      return !this.includes(user);
    }

    [Symbol.iterator]() {
      let self = this;
      return (function*() {
        for (const user of self.users) {
          yield user;
        }
      })();
    }
  }

  /**
   * Map同士のmergeを行う
   *
   * Mapのオブジェクトにアドホックに直接設定して使う想定。
   *
   * @this Map
   * @param {Map<K, V>} other 他のMap
   * @param {(key: K, selfValue: V, otherValue: V) => V} onConflict 衝突時の処理
   * @return {Map<K, V>} 自分自身を返す
   */
  function mergeMap(other, onConflict) {
    const result = this;

    for (const [key, otherValue] of other) {
      if (result.has(key)) {
        const selfValue = result.get(key);
        const newValue = onConflict(key, selfValue, otherValue);
        result.set(key, newValue);
      } else {
        result.set(key, otherValue);
      }
    }

    return result;
  }

  /**
   * リアクション
   * 絵文字とそれをつけたユーザから成る。
   */
  class Reaction {
    /**
     * @param {String} emoji 絵文字
     * @param {Users}  users ユーザの集合
     */
    constructor(emoji, users) {
      Object.assign(this, { emoji, users });
    }

    // リアクションをつけたユーザの数
    count() {
      return this.users.length();
    }
  }

  /**
   * 単一のメッセージに対するリアクションの集合
   */
  class Reactions {
    /**
     * @return {Reactions} 空のリアクション
     */
    static empty() {
      return new this(new Map());
    }

    /**
     * @param {Like} like いいね
     * @return {Reactions} リアクションの集合
     */
    static fromLike(like) {
      // リアクションを抽出する責務はReaction側
      const regex = emojiRegex();

      const reactions = new Map();

      if (like.noComment()) {
        reactions.set('❤️', Users.of(like.user));
        return new Reactions(reactions);
      }

      let commentEmojified = nodeEmoji.emojify(like.comment);

      let match;
      while ((match = regex.exec(commentEmojified))) {
        const emoji = match[0];

        if (reactions.has(emoji)) {
          const users = reactions.get(emoji);
          if (users.notIncludes(like.user)) {
            reactions.set(emoji, users.append(like.user));
          }
        } else {
          reactions.set(emoji, Users.of(like.user));
        }
      }

      const hasNormalText = nodeEmoji.strip(commentEmojified).length > 0;
      if (hasNormalText) {
        reactions.set('💬', Users.of(like.user));
        return new Reactions(reactions);
      }

      return new this(reactions);
    }

    /**
     * @param likes {Array<Like>} いいねの配列
     * @return {Reactions} リアクションの集合
     */
    static fromLikes(likes) {
      const reactions = likes.reduce(
        (reactions, like) => reactions.merge(this.fromLike(like)),
        this.empty()
      );

      return reactions;
    }

    /**
     * @param {Map<String, Array<User>>} reactions リアクションのMap
     */
    constructor(reactions) {
      Object.assign(this, { reactions });
    }

    merge(other) {
      const result = new Map();
      result.merge = mergeMap;

      console.log(this);
      console.log(other);

      const onConflict = (_, lhsUsers, rhsUsers) => lhsUsers.merge(rhsUsers);

      result.merge(this.reactions, onConflict);
      result.merge(other.reactions, onConflict);

      return new this.constructor(result);
    }

    [Symbol.iterator]() {
      let self = this;
      return (function*() {
        for (const [emoji, users] of self.reactions) {
          yield new Reaction(emoji, users);
        }
      })();
    }
  }

  /**
   * メッセージ
   */
  class Message {
    constructor(postUrl, user, likes, reactions = undefined) {
      Object.assign(this, { postUrl, user, likes, reactions });
    }

    withReactions(reactions) {
      return new Message(this.postUrl, this.user, this.likes, reactions);
    }
  }

  /**
   * あるメッセージに対するいいねの集合
   */
  class Like {
    static noComment(user) {
      return new this(user, undefined);
    }

    static withComment(user, comment) {
      return new this(user, comment);
    }

    constructor(user, comment) {
      if (!(user instanceof User))
        throw new Error('`user` は User でなければなりません。');

      Object.assign(this, { user, comment });
    }

    noComment() {
      return this.comment === undefined;
    }

    hasComment() {
      return !this.noComment();
    }
  }

  const emojis = [
    '👍',
    '✅',
    '❤️',
    '😀',
    '😁',
    '😂',
    '🤣',
    '😃',
    '😄',
    '😅',
    '😆',
    '😉',
    '😊',
    '😋',
    '😎',
    '😍',
    '😘',
    '🥰',
    '😗',
    '😙',
    '😚',
    '🤗',
    '🤩',
    '🤔',
    '😑',
    '😶',
    '🙄',
    '😏',
    '😣',
    '😥',
    '😮',
    '🤐',
    '😯',
    '😪',
    '😫',
    '😴',
    '😌',
    '😛',
    '😜',
    '😝',
    '🤤',
    '😒',
    '😓',
    '😔',
    '😕',
    '🙃',
    '🤑',
    '😲',
    '🙁',
    '😖',
    '😞',
    '😟',
    '😤',
    '😢',
    '😭',
    '😦',
    '😧',
    '😨',
    '😩',
    '😬',
    '😰',
    '😱',
    '🤭',
    '😈',
    '👿',
    '👹',
    '👺',
    '💀',
    '👻',
    '👽',
    '🤖',
    '😺',
    '😸',
    '😹',
    '😻',
    '😼',
  ];

  //import nodeEmoji from 'node-emoji';

  const sanitizeMap = {
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    "'": '&#x27;',
    '`': '&#x60;',
    '"': '&quot;',
  };

  const html = (callSites, ...substitutions) => {
    const escapedSubstitutions = substitutions.map(value =>
      value.toString().replace(/[<>&\\`'"]/g, match => sanitizeMap[match])
    );

    const htmlString = String.raw(callSites, ...escapedSubstitutions);

    const template = document.createElement('template');
    template.innerHTML = htmlString;

    return template.content;
  };

  const style = html`
  <style>
    .typetalk_emoreact_reactions {
      position: absolute;
      bottom: 8px;
      right: 90px;
      border: 1px solid #eee;
      border-radius: 5px;
      padding: 5px;
      display: flex;
      flex-direction: row;
    }

    .typetalk_emoreact_reactions--add_button {
      width: 2em;
      color: #aaa;
      border: 1px solid #ddd;
      border-radius: 1em;
      font-weight: bold;
      cursor: pointer;

      transition: box-shadow, color 0.2s linear 0s;
    }

    .typetalk_emoreact_reactions--add_button:focus {
      outline: 0;
    }

    .typetalk_emoreact_reactions--add_button:hover {
      color: #777;
      box-shadow: 0 0 2px #bbb;
    }

    .typetalk_emoreact_reactions--add_button:active {
      box-shadow: 0 0 1px #333;
    }

    .typetalk_emoreact_reaction--emoji_list {
      position: absolute;
      bottom: 2em;
      width: 10em;
      height: 8em;
      overflow-y: scroll;

      padding: 0.25em 0.75em;
      border: 1px solid #ddd;
      border-radius: 10px;

      background: #fff;

      transition: opacity 0.2s linear 0s;
    }

    .typetalk_emoreact_reaction--emoji_list--button {
      width: 1em;

      outline: 0;

      cursor: pointer;
    }

    .typetalk_emoreact_reaction--emoji {
      border: 1px solid #ddd;
      border-radius: 5px;
      margin-left: 5px;
      cursor: pointer;

      display: flex;
      flex-direction: row;
      align-items: center;

      transition: box-shadow 0.2s linear 0s;
    }

    .typetalk_emoreact_reaction--emoji__me {
      background: #fee;
    }

    .typetalk_emoreact_reaction--emoji:focus {
      outline: 0;
    }

    .typetalk_emoreact_reaction--emoji:hover {
      box-shadow: 0 0 2px #bbb;
    }

    .typetalk_emoreact_reaction--emoji:active {
      box-shadow: 0 0 1px #555;
    }

    .typetalk_emoreact_reaction--emoji__emoji {
      margin-left: 0.125em;
    }

    .typetalk_emoreact_reaction--emoji__count {
      margin-right: 0.125em;
      font-size: 0.9em;
      color: #777;
    }

    .typetalk_emoreact_reaction--users {
      visibility: hidden;
      position: absolute;
      bottom: 2.6em;
      opacity: 0;
      transition: opacity 0.2s linear 0s;

      width: max-content;
      max-width: 10vw;

      background: rgba(80, 80, 80, 0.8);
      padding: 0.5em 1em;
      border-radius: 10px;
      color: white;
      font-size: 0.8em;

      word-break: break-all;
    }

    :hover > .typetalk_emoreact_reaction--users {
      visibility: visible;
      opacity: 1;
    }
  </style>
`;

  const emojiList = ({ message, me }, actions, reduce) => {
    const h = html``;

    emojis.forEach(emoji => {
      const emojiButton = html`
      <button class="typetalk_emoreact_reaction--emoji_list--button">
        ${emoji}
      </button>
    `;
      emojiButton.firstElementChild.addEventListener('click', () => {
        // TODO ビューの責務ではないので必ず直す
        const like = message.likes.find(like => like.user.equals(me));
        const newComment = ((like && like.comment) || '') + emoji;
        reduce(
          actions.updateLike(message.postUrl.match(/(\d+)$/)[1], newComment)
        );
      });
      h.appendChild(emojiButton);
    });

    return h;
  };

  // リアクションの一覧を出す
  const reactions = ({ me, message, showEmojiList }, actions, reduce) => {
    const h = html`
    <div class="typetalk_emoreact_reactions">
      <button class="typetalk_emoreact_reactions--add_button">＋</button>
      <div
        class="typetalk_emoreact_reaction--emoji_list"
        style="visibility: ${showEmojiList ? 'visible' : 'hidden'}"
      ></div>
    </div>
  `;

    const addButton = h.querySelector('.typetalk_emoreact_reactions--add_button');
    addButton.addEventListener('click', () => {
      !showEmojiList
        ? reduce(actions.showEmojiList())
        : reduce(actions.hideEmojiList());
    });

    const container = h.firstElementChild;
    for (const r of message.reactions) {
      container.appendChild(
        reaction({ message, me, reaction: r }, actions, reduce)
      );
    }

    if (showEmojiList) {
      h.querySelector('.typetalk_emoreact_reaction--emoji_list').appendChild(
        emojiList({ me, message }, actions, reduce)
      );

      h.querySelector('.typetalk_emoreact_reactions').addEventListener(
        'mouseleave',
        () => reduce(actions.hideEmojiList())
      );
    }

    return h;
  };

  // 単一のリアクションを出す
  const reaction = ({ me, message, reaction }, actions, reduce) => {
    const h = html`
    <div class="typetalk_emoreact_reaction">
      <button class="typetalk_emoreact_reaction--emoji">
        <span class="typetalk_emoreact_reaction--emoji__emoji">
          ${reaction.emoji}
        </span>
        <span class="typetalk_emoreact_reaction--emoji__count">
          ${reaction.count()}
        </span>
      </button>
      <div class="typetalk_emoreact_reaction--users">
        ${
          Array.from(reaction.users)
            .map(u => u.name)
            .join(', ')
        }
      </div>
    </div>
  `;

    const query = '.typetalk_emoreact_reaction--emoji';
    h.querySelector(query).addEventListener('click', ev => {
      ev.preventDefault();
      // TODO ビューの責務ではないので必ず直す
      const like = message.likes.find(like => like.user.equals(me));
      const newComment = ((like && like.comment) || '') + reaction.emoji;
      reduce(actions.updateLike(message.postUrl.match(/(\d+)$/)[1], newComment));
    });

    return h;
  };

  const notNull = e => e !== null;

  // いいね を作る
  const buildLike = likeNode => {
    const node = likeNode.querySelector('img[tt-effect-like=""]');

    if (node === null) {
      return null;
    }

    const tooltip = node.getAttribute('tt-tooltip');

    if (tooltip) {
      // いったん名前に" by "が含まれている場合を考慮しない
      const match = tooltip.match(/(.*) by (.*)/);

      console.log(match);

      // マッチしない場合は名前のみで、コメントがないものとみなす
      if (match === null) {
        const username = tooltip;
        const user = new User(username);
        return Like.noComment(user);
      }

      const comment = match[1];
      const username = match[2];
      const user = new User(username);

      return Like.withComment(user, comment);
    }

    const c = node.getAttribute('c');

    if (c) {
      const user = new User(c);
      return Like.noComment(user);
    }

    throw new Error(
      'いいねの抽出に必要な含まれていません。破壊的変更が行われたと考えられるため、作者に連絡してください。'
    );
  };

  // いいねのリストを作る
  const buildLikes = messageNode =>
    Array.from(
      messageNode.querySelectorAll(
        '.message-like__users > .message-like__users-inner > .message-like__users-img'
      )
    )
      .map(buildLike)
      .filter(notNull);

  // メッセージを構築する
  const buildMessage = messageNode => {
    const postUrlOpt = messageNode.querySelector('a[ng-href]');
    const postUrl =
      postUrlOpt === null ? null : postUrlOpt.getAttribute('ng-href');
    const user = new User('');
    const likes = buildLikes(messageNode);

    const msg = new Message(postUrl, user, likes);
    msg.raw = messageNode;

    return msg;
  };

  const buildMessages = () =>
    Array.from(document.querySelectorAll('.message > .message__post')).map(
      buildMessage
    );

  // TODO もっといい感じに抽象化できるのでは
  const createSideEffect = sideEffect => actions =>
    new Proxy(actions, {
      get(target, propertyName /*, receiver*/) {
        const effect = sideEffect(target);
        if (propertyName in effect) {
          return (...args) => effect[propertyName](...args);
        } else {
          return target[propertyName];
        }
      },
    });

  // prettier-ignore
  const buildRequest = bodyObject => ({
    method: 'POST',
    headers: new Headers({
      'Accept': 'application/json, text/plain, */*',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'ja,en-US;q=0.8,en;q=0.6',
      'Content-Type': 'application/json;charset=UTF-8',
      'Origin': 'https://typetalk.in',
      'X-Requested-With': 'XMLHttpRequest',
    }),
    body: JSON.stringify(bodyObject),
    credentials: 'include',
  });

  class Typetalk {
    async like(topicId, messageId, comment = undefined) {
      const requestBody = {};

      if (comment !== undefined) {
        requestBody.comment = comment;
      }

      const request = buildRequest(requestBody);

      return await fetch(
        `/topics/${topicId}/posts/${messageId}/like.json`,
        request
      ).then(res =>
        res.status === 200
          ? res.json()
          : Promise.reject(new Error('リクエストに失敗しました'))
      );
    }

    async unlike(topicId, messageId) {
      const request = buildRequest({});

      return await fetch(
        `/topics/${topicId}/posts/${messageId}/unlike.json`,
        request
      ).then(res =>
        res.status === 200
          ? res.json()
          : Promise.reject(new Error('リクエストに失敗しました'))
      );
    }
  }

  // const sleep = x => new Promise(res => setTimeout(res, x));

  const mount = (root, view, actions, initialState) => {
    const reduce = state => async reducer => {
      const _reducer = await reducer;
      const newState = _reducer(state);
      const newView = view(newState, actions, reduce(newState));

      Array.from(root.childNodes).forEach(node => root.removeChild(node));
      root.appendChild(newView);
    };

    reduce(initialState)(e => e);
  };

  const actions = {
    // TODO もうちょっとマシなアクション名考えたい
    updateLikeOk: newComment => state => {
      // TODO ここの責務じゃないし危ないし、何やってるか分かりづらい
      const newMessage = new Message();
      Object.assign(newMessage, state.message);
      newMessage.likes = [...state.message.likes];
      const index = newMessage.likes.findIndex(l => l.user.equals(state.me));

      if (index < 0) {
        newMessage.likes.push(Like.withComment(state.me, newComment));
      } else {
        newMessage.likes.splice(index, 1, Like.withComment(state.me, newComment));
      }

      newMessage.reactions = Reactions.fromLikes(newMessage.likes);

      return {
        ...state,
        message: newMessage,
      };
    },

    showEmojiList: () => state => ({
      ...state,
      showEmojiList: true,
    }),

    hideEmojiList: () => state => ({
      ...state,
      showEmojiList: false,
    }),
  };

  const typetalkSideEffect = typetalk =>
    createSideEffect(actions => ({
      async updateLike(messageId, newComment) {
        // TODO ここでtopicId引いてきてるのダサいので直したい
        const topicId = location.href.match(/topics\/(\d+)/)[1];

        try {
          await typetalk.unlike(topicId, messageId);
        } catch (e) {
          console.log(e);
        }

        try {
          await typetalk.like(topicId, messageId, newComment);

          // state.reactions.reactions.delete('😣'); みたいな

          return actions.updateLikeOk(newComment);
        } catch (e) {
          window.alert(`失敗: ${e}`);
          return actions.updateLikeFailed();
        }
      },
    }));

  const createState = (message, me) => ({
    state: 'INITIAL',
    message,
    me,
    showEmojiList: false,
  });

  const mountEmoreact = messages => {
    const typetalk = new Typetalk();
    const actions_ = typetalkSideEffect(typetalk)(actions);

    // TODO ここの取得もいい感じにしたい
    let myNameOpt = document.querySelector('.profile-content__name');
    myNameOpt =
      myNameOpt &&
      (myNameOpt.textContent.match(/(.*) さん/) ||
        myNameOpt.textContent.match(/Hi, (.*)/));
    myNameOpt = myNameOpt && myNameOpt[1];

    if (!myNameOpt) return;

    const myName = myNameOpt;

    messages.forEach(message => {
      const found = document.querySelector(`a[ng-href="${message.postUrl}"]`);

      if (!found) return;

      const root = document.createElement('div');
      const messageContainer = found.parentNode.parentNode.parentNode;
      const messageOptions = messageContainer.querySelector(
        '.message__option-wrap'
      );

      messageContainer.insertBefore(root, messageOptions.nextSibilings);

      mount(
        root,
        reactions,
        actions_,
        createState(message, new User(myName))
      );
    });
  };

  const renderMessages = () => {
    const messages = buildMessages();

    const messagesWithReactions = messages.map(message => {
      const reactions$$1 = Reactions.fromLikes(message.likes);
      return message.withReactions(reactions$$1);
    });

    console.log(messagesWithReactions);

    mountEmoreact(messagesWithReactions);
  };

  /*
  const removeMessages = () => {
    Array.from(document.querySelectorAll('.typetalk_emoreact_reaction')).forEach(
      e => e.remove()
    );
  };
  */

  const loadEmoreact = () => {
    setTimeout(function() {
      document.head.appendChild(style);
      renderMessages();

      /*
      const messagesContainer = document.querySelector('.js_message');
      const observer = new MutationObserver(() => {
        observer.disconnect();
        observer.takeRecords();
        removeMessages();
        renderMessages();
        observe();
      });
      const observe = () =>
        observer.observe(messagesContainer, { childList: true, subtree: true });

      observe();
      */
    }, 1000);
  };

  // メインの処理
  window.addEventListener('load', function() {
    loadEmoreact();

    let url = location.href;
    setInterval(() => {
      if (url === location.href) return;

      url = location.href;
      setTimeout(renderMessages, 500);
    }, 1000);
  });

}());
