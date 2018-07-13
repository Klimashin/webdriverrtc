'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

exports.init = init;

var _startAnalyzing = require('./startAnalyzing');

var _startAnalyzing2 = _interopRequireDefault(_startAnalyzing);

var _stopAnalyzing = require('./stopAnalyzing');

var _stopAnalyzing2 = _interopRequireDefault(_stopAnalyzing);

var _getStats = require('./getStats');

var _getStats2 = _interopRequireDefault(_getStats);

var _url = require('webdriverio/build/lib/protocol/url');

var _url2 = _interopRequireDefault(_url);

var _getConnectionInformation = require('./getConnectionInformation');

var _getConnectionInformation2 = _interopRequireDefault(_getConnectionInformation);

var _url3 = require('./browser/url');

var _url4 = _interopRequireDefault(_url3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * WebdriverRTC
 */
var WebdriverRTC = function WebdriverRTC(webdriverInstance) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck3.default)(this, WebdriverRTC);

  /**
   * browser that measures connection required
   */
  if (typeof options.browser !== 'string') {
    throw new Error('Please specify the browser to measure connection data with!');
  }

  /**
   * check if browser name exists in matrix
   */
  if (webdriverInstance.getInstances().indexOf(options.browser) === -1) {
    throw new Error('Specified browser was not found in browser matrix!');
  }

  this.interval = 1000;
  this.browser = webdriverInstance.select(options.browser);
  this.analyzingScriptIsInjected = false;

  /**
   * add WebdriverRTC commands to choosen matrix browser
   */
  this.browser.addCommand('startAnalyzing', _startAnalyzing2.default.bind(this));
  this.browser.addCommand('stopAnalyzing', _stopAnalyzing2.default.bind(this));
  this.browser.addCommand('getStats', _getStats2.default.bind(this));
  this.browser.addCommand('getConnectionInformation', _getConnectionInformation2.default.bind(this));

  /**
   * overwrite url command in order to masquarade RTCPeerConnection objects
   */
  this.browser.addCommand('_url', _url2.default);
  this.browser.addCommand('url', function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var res;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this._url.apply(this, args);

            case 2:
              res = _context.sent;
              _context.next = 5;
              return this.execute(_url4.default);

            case 5:
              return _context.abrupt('return', res);

            case 6:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function () {
      return _ref.apply(this, arguments);
    };
  }(), true);
};

/**
 * expose WebdriverRTC
 */


function init(webdriverInstance, options) {
  return new WebdriverRTC(webdriverInstance, options);
}
