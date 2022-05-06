import { NovyEvent } from './NovyEvent.js';

class NovyNode extends NovyEvent {
	$children;
	$parent;

	constructor(parent,...children){
		super();
		this.$children = children;
		this.$parent = $parent;
	}

	/**
	 * 添加子节点的方法
	 */
	appendChild(...children){
		for (let child of children) {
			this.$children.push(child);
		}

		this.$emit('append-chlid',...chlidren);
	}
}

export { NovyNode };