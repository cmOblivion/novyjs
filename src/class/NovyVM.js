import { NovyEvent } from './NovyEvent.js';

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

export { NovyVM };