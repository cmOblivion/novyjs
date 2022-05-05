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
	 * @param {function} ...callbacks 回调函数
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
	 * @param {string} tag 事件名
	 * @param ...args 其余参数
	 */
	$emit(tag,...data){
		if (this.$heard(tag)) {
			for (let cb of this.$look(tag)) {
				cb(...data);
			}
		}

		// 这里可以让继承与此的类用$on...方法快捷绑定事件
		let $onTag = `$on${tag}`;
		if (Reflect.has(this,$onTag)) {
			this[$onTag](...data);
		}

		return this;
	}

	/**
	 * 返回某个事件的所有监听者
	 */
	$look(tag){
		return this.$heard(tag) ? this.$events[tag] : [];
	}

	/**
	 * 取消监听（绑定、注册）
	 * 传参方式：
	 * 一个事件名（删除所有这个事件的绑定）
	 * 一个函数（删除所有这个函数的绑定）
	 * 事件名加函数（推荐）（删除事件下函数的绑定）
	 * @param {string} tag 事件名
	 * @param {function} [callback] 回调函数
	 */
	$cancel(tag,func){
	if(type.isFunction(tag) && func.uuid){
		for(let i in this.$events){
			for(let j in this.$events[i]){
				if(this.$events[i][j].uuid === func.uuid){
					delete this.$events[i][j];
				}
			}
		}
	} else if(type.isString(tag)) {
		if(type.isFunction(func) && func.uuid){
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

export { NovyEvent };