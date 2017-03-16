/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _app = __webpack_require__(1);

	var _app2 = _interopRequireDefault(_app);

	var _state = __webpack_require__(2);

	var _Section = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var PAGES = (0, _Section.Section)({
		container: '#appContainer',
		sticky: true
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"page":"app__page___18AQu"};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.state = undefined;

	var _content = __webpack_require__(3);

	var state = exports.state = {
		content: _content.content,
		config: {}
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var content = exports.content = {
		sections: [{
			title: 'First Card'
		}, {
			title: 'Second Card'
		}, {
			title: 'Third Card'
		}, {
			title: 'Fourth Card'
		}, {
			title: 'Fifth Card'
		}]

	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Section = undefined;

	var _app = __webpack_require__(1);

	var _app2 = _interopRequireDefault(_app);

	var _state = __webpack_require__(2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var windowHeight = window.innerHeight;
	var colors = ['darkred', 'lightblue', 'goldenrod', 'lightgrey', 'green', 'lightgreen', 'salmon'];
	var random = function random() {
		return Math.ceil(Math.random() * colors.length) - 1;
	};
	var template = function template(props) {
		var styles = Object.keys(props.styles).map(function (style) {
			return style + ':' + props.styles[style];
		}).join(';');

		return '<section id="section__' + props.index + '" class=' + _app2.default.page + ' \n\t\tstyle="\n\t\t\tbackground-color:' + colors[random()] + ';\n\t\t\t' + styles + '\n\t\t">\n\t\t\t<h1>' + props.content + '</h1>\n\t</section>';
	};

	var Section = exports.Section = function Section(props) {
		var container = document.querySelector(props.container);
		var localState = {
			cardPositions: {},
			containerHeight: 0
		};
		var getCardPosition = function getCardPosition(index) {
			return localState.cardPositions['section__' + index];
		};
		var getContainerHeight = function getContainerHeight() {
			return localState.containerHeight;
		};

		var setCardPosition = function setCardPosition(update) {
			return localState.cardPositions['section__' + update.index] = {
				x: update.x || 0, y: update.y || 0, z: update.z || 0
			};
		};
		var setContainerHeight = function setContainerHeight(update) {
			return localState.containerHeight = update;
		};

		var getActiveSection = function getActiveSection(props) {
			Object.keys(localState.cardPositions).filter(function (id) {
				return localState.cardPositions[id].y;
			});
		};

		var content = _state.state.content.sections.map(function (section, index) {
			var posY = '' + windowHeight * index;
			setCardPosition({
				index: index,
				y: parseInt(posY)
			});

			return template({
				index: index,
				content: section.title,
				styles: {
					transform: 'translate3d(0,' + posY + 'px,0)'
				}
			});
		}).join('');

		container.innerHTML = content;
		setContainerHeight('' + windowHeight * _state.state.content.sections.length);
		//window.innerHeight * state.content.section.length


		function animateScrollTo(props) {
			var duration = props.duration || 100;
			var animStart = null;
			var startPosition = document.body.scrollTop;
			var distance = props.target - startPosition;
			//console.log('starting animated scroll to', props.target)
			var direction = distance < 0 ? 'max' : 'min';
			/*make change for each animation frame*/
			function animateFrame(timestamp) {
				if (!animStart) animStart = timestamp;
				var progress = timestamp - animStart;
				var newIncrement = progress / duration;
				/*calculate increment of the distance to scroll and update*/
				var position = Math[direction](props.target, startPosition + newIncrement * distance);
				/*console.info('scrolling to: ',position)*/
				/* check position value hasn't exceeded target and apply */
				document.body.scrollTop = position;

				/* check if animation has reached duration. If not request animation frame and call again */
				if (progress < duration) {
					/*progress has not yet reached the duration, call animation frame again*/
					window.requestAnimationFrame(animateFrame);
				} else {
					/*animation has completed*/
					return !!props.callback ? setTimeout(function () {
						return props.callback;
					}, 1000) : false;
				}
			}
			window.requestAnimationFrame(animateFrame); /* request animation frame and call function */
		}

		var addEvent = function addEvent(object, type, callback) {
			if (object == null || typeof object == 'undefined') {
				console.error('Cannot add ' + type + ' to ' + object + '. Object not recognised');
				return;
			}
			if (object.addEventListener) {
				object.addEventListener(type, callback, false);
			} else if (object.attachEvent) {
				object.attachEvent("on" + type, callback);
			} else {
				object["on" + type] = callback;
			}
		};

		var scrollAfterDelay = void 0;
		var snapToPosition = function snapToPosition() {
			clearTimeout(scrollAfterDelay);
			scrollAfterDelay = window.setTimeout(function () {
				window.removeEventListener('scroll', snapToPosition);
				var scrollPos = document.body.scrollTop;
				var activeSection = Math.round(scrollPos / window.innerHeight);
				animateScrollTo({
					target: getCardPosition(activeSection).y,
					callback: window.addEventListener('scroll', snapToPosition, false)
				});
			}, 80);
		};

		window.addEventListener('scroll', snapToPosition, false);

		return {
			getCardPosition: getCardPosition,
			getContainerHeight: getContainerHeight,
			setCardPosition: setCardPosition,
			setContainerHeight: setContainerHeight
		};
	};

/***/ }
/******/ ]);