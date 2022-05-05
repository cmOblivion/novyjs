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

export { uuid };