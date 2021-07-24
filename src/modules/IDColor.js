/* ==[ IDColor.js ]=======================================================================================
                                                    IDColor
=========================================================================================================== */

class IDColor {
	constructor() {
		// super();
		this.css = 'padding: 0 5px; border-radius: 6px; font-size: 0.8em;';
		this.ids = {};
		this.init();
	}
	init() {
		let e;
		(e = document.createElement('style')).setAttribute('type', 'text/css');
		e.textContent = '.posteruid span {' + this.css + '}';
		e.id = 'id-style';
		document.head.appendChild(e);
	}
	compute(e) {
		let t, a;
		return t = [],
		a = $.hash(e),
		t[0] = a >> 24 & 255,
		t[1] = a >> 16 & 255,
		t[2] = a >> 8 & 255,
		t[3] = 0.299 * t[0] + 0.587 * t[1] + 0.114 * t[2] > 125,
		this.ids[e] = t,
		t;
	}
	apply(e) {
		let t;
		t = this.ids[e.textContent] || this.compute(e.textContent),
		e.style.cssText = '    background-color: rgb(' + t[0] + ',' + t[1] + ',' + t[2] + ');    color: ' + (t[3] ? 'black;' : 'white;');
	}
	applyRemote(e) {
		this.apply(e),
		e.style.cssText += this.css;
	}
}
