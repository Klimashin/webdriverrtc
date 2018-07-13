"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * stop tracing webrtc stats
 */
exports.default = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var clearStats = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        this.connection = undefined;
                        this.analyzingScriptIsInjected = false;

                        _context.next = 4;
                        return this.browser.execute(function (clearStats) {
                            if (clearStats) {
                                window._webdriverrtc = undefined;
                            }

                            return window.clearTimeout(window._webdriverrtcTimeout);
                        }, clearStats);

                    case 4:
                        return _context.abrupt("return", _context.sent);

                    case 5:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function () {
        return _ref.apply(this, arguments);
    };
}();

module.exports = exports["default"];
