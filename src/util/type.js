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
	isUndefined = val => is(val,'undefined'),
	isNull = val => is(val,'null'),
	isObject = val => val == null ? false : _toString.call(val) === '[object Object]',  // isObject实现方法不同，自定义类也记作object！
	isString = val => is(val,'String'),
	isArray = val => is(val,'Array'),
	isBoolean = val => is(val,'Boolean'),
	isFunction = val => is(val,'Function'),
	isRegExp = val => is(val,'RegExp'),
	isDate = val => is(val,'Date');

export {
	type,
	is,
	isUndefined,
	isNull,
	isDate,
	isRegExp,
	isFunction,
	isString,
	isObject,
	isArray,
};