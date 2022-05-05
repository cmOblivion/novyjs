import {NovyEvent} from './class/NovyEvent.js';

((global) => {
	/**
	 * @namespace Novy
	 */
	const Novy = {
		NovyEvent,
	};

	if (global.$) {
		global.$ = Novy;
	}
	global.Novy = Novy;
})(globalThis)