'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function calculateArray(operation, results) {
    var ret = {};
    results.forEach(function (result) {
        calcResult[operation](result, ret);
    });
    return ret;
}

/**
 * calculate result
 */
var calcResult = {
    /**
     * adds all consecutive result values
     */
    '+': function _(results, result) {
        if (Array.isArray(results)) {
            var ret = {};
            results.forEach(function (result) {
                return calcResult['+'](result, ret);
            });
            return ret;
        }

        (0, _keys2.default)(results).forEach(function (attr) {
            if ((0, _typeof3.default)(results[attr]) === 'object') {
                if (!result[attr]) {
                    result[attr] = {};
                }

                return calcResult['+'](results[attr] || {}, result[attr]);
            } else if (typeof results[attr] !== 'number') {
                return false;
            }

            result[attr] = (result[attr] || 0) + results[attr];
        });
    },
    /**
     * devides each object value by divisor
     */
    '/': function _(divident, divisor) {
        var toFixed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;

        var result = JSON.parse((0, _stringify2.default)(divident));
        (0, _keys2.default)(result).forEach(function (attr) {
            if ((0, _typeof3.default)(result[attr]) === 'object') {
                result[attr] = calcResult['/'](result[attr] || {}, divisor, toFixed);
                return result[attr];
            }

            result[attr] /= divisor;
            result[attr] = result[attr].toFixed(toFixed) / 1;
        });

        return result;
    },
    /**
     * keeps the max value
     */
    'max': function max() {
        var results = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var result = arguments[1];

        if (Array.isArray(results)) {
            var ret = {};
            results.forEach(function (result) {
                return calcResult['max'](result, ret);
            });
            return ret;
        }

        (0, _keys2.default)(results).forEach(function (attr) {
            if ((0, _typeof3.default)(results[attr]) === 'object') {
                if (!result[attr]) {
                    result[attr] = {};
                }

                return calcResult['max'](results[attr] || {}, result[attr] || {});
            } else if (typeof results[attr] !== 'number') {
                return false;
            }

            if (!result[attr]) {
                result[attr] = results[attr];
            } else if (results[attr] > result[attr]) {
                result[attr] = results[attr];
            }
        });
    },
    /**
     * keeps the min value
     */
    'min': function min(results, result) {
        if (Array.isArray(results)) {
            return calculateArray('min', results);
        }

        (0, _keys2.default)(results).forEach(function (attr) {
            if ((0, _typeof3.default)(results[attr]) === 'object') {
                if (!result[attr]) {
                    result[attr] = {};
                }

                return calcResult['min'](results[attr] || {}, result[attr] || {});
            }

            if (typeof results[attr] !== 'number') {
                return false;
            }

            if (!result[attr]) {
                result[attr] = results[attr];
            } else if (results[attr] < result[attr]) {
                result[attr] = results[attr];
            }
        });
    },
    /**
     * puts all consecutive results in one array
     */
    '[]': function _(results, result) {
        if (Array.isArray(results)) {
            return calculateArray('[]', results);
        }

        /**
         * first sum up each result
         */
        (0, _keys2.default)(results).forEach(function (attr) {
            if ((0, _typeof3.default)(results[attr]) === 'object') {
                if (!result[attr]) {
                    result[attr] = {};
                }

                return calcResult['[]'](results[attr] || {}, result[attr]);
            }

            /**
             * `!result[attr].push` to ensure that result[attr] is an array. Sometimes it results into an
             * empty object (`{}`)
             */
            if (!result[attr] || !result[attr].push) {
                result[attr] = [];
            }

            result[attr].push(results[attr]);
        });
    },
    /**
     * if results are listed in an array this method takes
     * the middle value of that array
     */
    '-|-': function _(result, toFixed) {
        var ret = {};
        toFixed = toFixed || 2;

        (0, _keys2.default)(result).forEach(function (attr) {
            if ((0, _typeof3.default)(result[attr]) === 'object' && !(result[attr] instanceof Array)) {
                ret[attr] = calcResult['-|-'](result[attr] || {}, toFixed);
                return ret[attr];
            }

            /**
             * first sort list
             */
            result[attr].sort(function (a, b) {
                return a - b;
            });

            /**
             * if array length is even take the middle value
             */
            var resultLength = result[attr].length;
            if (resultLength % 2 === 0) {
                ret[attr] = (result[attr][resultLength / 2 - 1] + result[attr][resultLength / 2]) / 2;
            } else {
                ret[attr] = result[attr][Math.floor(resultLength / 2)];
            }
        });

        return ret;
    }
};

exports.default = calcResult;
module.exports = exports['default'];
