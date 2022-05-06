class NovyNode {
	$children;
	$parent;

	constructor(parent,...children){
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
	}
}