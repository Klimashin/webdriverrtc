'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _webdriverio = require('webdriverio');

var _startAnalyzing = require('./browser/startAnalyzing');

var _startAnalyzing2 = _interopRequireDefault(_startAnalyzing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * initiate WebRTC analyzing
 */
exports.default = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var selectorMethod = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {
            return false;
        };
        var res;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        if (!this.analyzingScriptIsInjected) {
                            _context.next = 2;
                            break;
                        }

                        throw new _webdriverio.ErrorHandler('CommandError', 'analyzing already started');

                    case 2:
                        _context.next = 4;
                        return this.browser.timeouts('script', 1000);

                    case 4:
                        _context.next = 6;
                        return this.browser.selectorExecuteAsync('body', _startAnalyzing2.default, selectorMethod, this.interval);

                    case 6:
                        res = _context.sent;

                        if (!(!res || (0, _keys2.default)(res).length === 0)) {
                            _context.next = 9;
                            break;
                        }

                        throw new _webdriverio.ErrorHandler('CommandError', 'WebRTC connection didn\'t get established');

                    case 9:

                        this.connection = res;
                        this.analyzingScriptIsInjected = true;
                        return _context.abrupt('return', this.connection);

                    case 12:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    function startAnalyzing() {
        return _ref.apply(this, arguments);
    }

    return startAnalyzing;
}();

module.exports = exports['default'];
