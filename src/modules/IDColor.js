/* ==[ IDColor.js ]=======================================================================================
                                                    IDColor
=========================================================================================================== */

class IDColor {
	constructor() {
		// super();
		this.css = 'padding: 0 5px; border-radius: 6px; font-size: 0.8em; cursor: pointer;';
		this.ids = {};
		this.init();
	}
	init() {
		let e;
		(e = document.createElement('style')).setAttribute('type', 'text/css');
		e.textContent = `${ aib.qPosterId } {${ this.css }}`;
		e.id = 'de-id-style';
		document.head.appendChild(e);
	}
	hash(e) {
		let t, a, i = 0;
		for(t = 0,
		a = e.length; t < a; ++t) {
			i = (i << 5) - i + e.charCodeAt(t);
		}
		return i;
	}
	compute(e) {
		let t, a;
		return t = [],
		a = this.hash(e),
		t[0] = a >> 24 & 255,
		t[1] = a >> 16 & 255,
		t[2] = a >> 8 & 255,
		t[3] = 0.299 * t[0] + 0.587 * t[1] + 0.114 * t[2] > 125,
		this.ids[e] = t,
		t;
	}
	apply(e) {
		let t;
		t = this.ids[e.textContent] || this.compute(e.textContent.replace(/id:*/i, '')),
		e.style.cssText = '    background-color: rgb(' + t[0] + ',' + t[1] + ',' + t[2] + ');    color: ' + (t[3] ? 'black;' : 'white;');
	}
	applyRemote(e) {
		this.apply(e),
		e.style.cssText += this.css;
	}
}
