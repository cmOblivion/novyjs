(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Novy = {}));
})(this, (function (exports) { 'use strict';

	/**
	 * @func uuid
	 * @returns {function} 一个获取uuid的函数
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

	/**
	 * 获取对象类型的函数
	 * 注意用户自定义类会返回自定义类的名字！
	 * 自定义类返回自定义类的名字！(大小写不做处理)
	 * @func type
	 * @param {anything} obj 任意对象
	 * @returns {string} 这个对象的类型
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
		isFunction = val => is(val,'Function');

	/**
	 * @class NovyEvent
	 * 事件基类
	 * 支持链式操作
	 */
	class NovyEvent {
		#uuid = uuid();

		constructor(){
			this.#uuid = uuid();
			this.$events = {};
		}
		
		/**
		 * 判断有没有绑定过事件
		 * @param {string} tag 事件名
		 * @return {boolean} 是否含有
		 */
		$heard(tag){
			return Reflect.has(this.$events,tag);
		}
		
		/**
		 * 注册事件（也叫绑定）
		 * 绑定时会触发bind事件，传入事件名和回调函数
		 * @param {string} tag 事件名
		 * @param {function} callbacks 回调函数
		 */
		$on(tag,callback){

			// 如果没有分配uuid，就分配一个唯一的新的id
			if (Reflect.has(callback,'#uuid')) {
				callback.$uuid = this.#uuid();
			}

			let tagList = tag.split('.');
			let cache = this.$events;
			for (let t of tagList) {
				if (!Reflect.has(cache,t)) {
					cache[t] = {
						$cb:[],
					};
				}

				cache = cache[t];
			}

			cache.$cb.push(callback);

			return this;
		}

		$$runCallback(ev,...args){
			for (let i in ev) {
				if (i==='$cb') {
					for (let cb of ev.$cb) {
						cb(...args);
					}
				} else {
					this.$$runCallback(ev[i]);
				}
			}
		}

		/**
		 * 触发某个事件
		 * @param {string} tag 事件名
		 * @param ...args 其余参数
		 */
		$emit(tag,...args){
			var tagList = tag.split('.');
			let cache = this.$events;
			for (let t of tagList) {
				if (cache[t]) {
					cache = cache[t];
				}
			}

			this.$$runCallback(cache,...args);

			return this;
		}

		/**
		 * 取消监听（绑定、注册）
		 * @param {string} tag 事件名
		 * @param {function} [callback] 回调函数
		 */
		$off(tag,func){
			var tagList = tag.split('.');
			let cache = this.$events;
			for (let t of tagList) {
				if (cache[t]) {
					cache = cache[t];
				}
			}

			if (isFunction(func)) {
				if (Reflect.has(cache,'$cb')) {
					for (let i in cache.$cb) {
						if (cache.$cb[i].$uuid === func.uuid) {
							delete cache.$cb[i];
						}
					}
				}
			} else {
				cache.$cb = [];
			}

			return this;
		}
	}

	class VM extends NovyEvent {
		constructor(){
			super();

			this.$lockFunc = null;
		}

		lock(func){
			this.$lockFunc = func;
		}

		unlock(func){
			this.$lockFunc = null;
		}
	}

	function NovyVM(...data){
		var ev = new VM();
		Object.assign(ev,...data);

		var proxy = new Proxy(ev,{
			get(target,prop,receiver){
				if (Reflect.get(target,'$lockFunc')) {
					target.$on(`change.${prop}`,Reflect.get(target,'$lockFunc'));
				}

				return Reflect.get(target,prop,receiver);
			},
			set(target){

			}
		});

		return proxy;
	}

	exports.NovyEvent = NovyEvent;
	exports.NovyVM = NovyVM;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
