/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NovyEvent": () => (/* binding */ NovyEvent)
/* harmony export */ });
/* harmony import */ var _util_uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _util_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);



/**
 * 事件基类
 * 灵感来自node的EventEmitter
 * Novy大多数类都继承自此
 */
class NovyEvent {
	#uuid = (0,_util_uuid__WEBPACK_IMPORTED_MODULE_0__.uuid)();

	constructor(){
	this.#uuid = (0,_util_uuid__WEBPACK_IMPORTED_MODULE_0__.uuid)();
	this.$events = {};
	}
	
	// 判断有没有绑定过事件
	$heard(tag){
	return Reflect.has(this.$events,tag);
	}
	
	/**
	 * 注册事件（也叫绑定）
	 * 绑定时会触发bind事件，传入事件名和回调函数
	 */
	$on(tag,...callback){

	// 如果没有分配uuid，就分配一个唯一的新的id
	if(Reflect.has(callback,'#uuid')){
		callback.uuid = this.#uuid();
	}

	// 判断是否绑定过
	if(this.$heard(tag)){
		this.$events[tag] = this.$events[tag].c$oncat(callback);
	} else {
		this.$events[tag] = callback;
	}

	// 触发绑定事件
	if(tag!=='bind'){
		this.$emit('bind',tag,callback);
	}

	return this;
	}

	/**
	 * 触发某个事件
	 * 可以传参（没有参数数量限制）
	 */
	$emit(tag,...data){
	if(this.$heard(tag)){
		for(let cb of this.$look(tag)){
		cb(...data);
		}
	}

	// 这里可以让继承与此的类用$on...方法快捷绑定事件
	let $onTag = `$on${tag}`;
	if(Reflect.has(this,$onTag)){
		this[$onTag](...data);
	}

	return this;
	}

	// 返回某个事件的所有监听者
	$look(tag){
	return this.$heard(tag) ? this.$events[tag] : [];
	}

	/**
	 * 取消监听（绑定、注册）
	 * 传参方式：
	 * 一个事件名（删除所有这个事件的绑定）
	 * 一个函数（删除所有这个函数的绑定）
	 * 事件名加函数（推荐）（删除事件下函数的绑定）
	 */
	$cancel(tag,func){
	if(_util_type__WEBPACK_IMPORTED_MODULE_1__.isFunction(tag) && func.uuid){
		for(let i in this.$events){
		for(let j in this.$events[i]){
			if(this.$events[i][j].uuid === func.uuid){
			delete this.$events[i][j];
			}
		}
		}
	} else if(_util_type__WEBPACK_IMPORTED_MODULE_1__.isString(tag)) {
		if(_util_type__WEBPACK_IMPORTED_MODULE_1__.isFunction(func) && func.uuid){
		for(let i in this.$events[tag]){
			if(this.$events[tag][i].uuid === func.uuid){
			delete this.$events[tag][i];
			}
		}
		} else {
		if(this.$heard(tag)){
			delete this.$events[tag];
		}
		}
	}

	return this;
	}
}



/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "uuid": () => (/* binding */ uuid)
/* harmony export */ });
/**
 * uuid创建器模块
 * @module util/uuid
 */

/**
 * 一个uuid创建器
 * @func uuid
 * @returns {Function} 一个获取uuid的函数
 * @example
 * let uuidMaker = uuid();
 * let concreteUuid = uuidMaker();
 */
function uuid(){
  let tid = 0;
  return () => {
    return tid++;
  }
}



/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "is": () => (/* binding */ is),
/* harmony export */   "isArray": () => (/* binding */ isArray),
/* harmony export */   "isDate": () => (/* binding */ isDate),
/* harmony export */   "isFunction": () => (/* binding */ isFunction),
/* harmony export */   "isNull": () => (/* binding */ isNull),
/* harmony export */   "isObject": () => (/* binding */ isObject),
/* harmony export */   "isRegExp": () => (/* binding */ isRegExp),
/* harmony export */   "isString": () => (/* binding */ isString),
/* harmony export */   "isUndefined": () => (/* binding */ isUndefined),
/* harmony export */   "type": () => (/* binding */ type)
/* harmony export */ });
/**
 * 获取对象类型的函数
 * 注意用户自定义类会返回自定义类的名字！
 * 若要判断是否是对象，请用object！
 * 内置对象返回值为全小写
 * 自定义类返回自定义类的名字！(大小写不做处理)
 */
function type(obj){
  
  // 如果对象为空，直接返回null或undefined
  if(obj == null){
    return String(obj);
  }

  return obj.constructor.name;
}

// 判断类型函数集
let is = (val,tp) => type(val) === tp,
  isUndefined = val => is(val,'undefined'),
  isNull = val => is(val,'null'),
  isObject = val => val == null ? false : _toString.call(val) === '[object Object]',  // isObject实现方法不同，自定义类也记作object！
  isString = val => is(val,'String'),
  isArray = val => is(val,'Array'),
  isBoolean = val => is(val,'Boolean'),
  isFunction = val => is(val,'Function'),
  isRegExp = val => is(val,'RegExp'),
  isDate = val => is(val,'Date');



/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _event_NovyEvent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


((global) => {
	/**
	 * @namespace Novy
	 */
	const Novy = {
		NovyEvent: _event_NovyEvent__WEBPACK_IMPORTED_MODULE_0__.NovyEvent,
	};

	if (global.$) {
		global.$ = Novy;
	}
	global.Novy = Novy;
})(globalThis)
})();

/******/ })()
;