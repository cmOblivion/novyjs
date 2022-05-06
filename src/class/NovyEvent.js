import { uuid } from '../util/uuid.js';
import * as type from '../util/type.js';

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

	#runCallback(ev,...args){
		for (let i in ev) {
			if (i==='$cb') {
				for (let cb of ev.$cb) {
					cb(...args);
				}
			} else {
				this.#runCallback(ev[i]);
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

		this.#runCallback(cache,...args);

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

		if (type.isFunction(func)) {
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

export { NovyEvent };