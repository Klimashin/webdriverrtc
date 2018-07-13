'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _webdriverio = require('webdriverio');

var _calcResult = require('./helpers/calcResult');

var _calcResult2 = _interopRequireDefault(_calcResult);

var _getStats = require('./browser/getStats');

var _getStats2 = _interopRequireDefault(_getStats);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * get latest stat
 */
exports.default = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(duration) {
        var now, rawData, from, to, stats, mean, median, max, min;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        now = new Date().getTime();
                        rawData = [];
                        from = now;
                        to = now;


                        if (typeof duration === 'number') {
                            from = now - duration;
                            to = now;
                        } else if ((typeof duration === 'undefined' ? 'undefined' : (0, _typeof3.default)(duration)) === 'object' && typeof duration.from === 'number' && duration.to === 'number') {
                            from = duration.from;
                            to = duration.to;
                        }

                        _context.next = 7;
                        return this.browser.execute(_getStats2.default, from, to, this.interval);

                    case 7:
                        stats = _context.sent.value;

                        if (stats) {
                            _context.next = 10;
                            break;
                        }

                        throw new _webdriverio.ErrorHandler('CommandError', 'There was a problem receiving the results');

                    case 10:

                        stats.forEach(function (result, i) {
                            rawData.push(result.results);
                            delete stats[i].results;
                        });

                        if (!(stats.length === 1)) {
                            _context.next = 13;
                            break;
                        }

                        return _context.abrupt('return', stats[0]);

                    case 13:
                        mean = _calcResult2.default['+'](stats);

                        mean = _calcResult2.default['/'](mean, stats.length);

                        median = _calcResult2.default['[]'](stats);

                        median = _calcResult2.default['-|-'](median);

                        max = _calcResult2.default['max'](stats);
                        min = _calcResult2.default['min'](stats);
                        return _context.abrupt('return', { mean: mean, median: median, max: max, min: min, rawData: rawData });

                    case 20:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    function getStats(_x) {
        return _ref.apply(this, arguments);
    }

    return getStats;
}();

module.exports = exports['default'];
