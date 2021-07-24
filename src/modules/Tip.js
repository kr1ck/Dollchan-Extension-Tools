/* ==[ Tip.js ]=======================================================================================
                                                    TIP
=========================================================================================================== */

class Tip {
	construcor() {
		this.node = null;
		this.timeout = null;
		this.delay = 300;
		this.init();
	}
	init() {
		document.addEventListener('mouseover', this.onMouseOver, !1),
		document.addEventListener('mouseout', this.onMouseOut, !1);
	}
	onMouseOver(e) {
		let t, n, o;
		o = e.target,
		this.timeout && (clearTimeout(this.timeout),
		this.timeout = null),
		o.hasAttribute('data-tip') && (n = null,
		o.hasAttribute('data-tip-cb') && (t = o.getAttribute('data-tip-cb'),
		window[t] && (n = window[t](o))),
		this.timeout = setTimeout(this.show, this.delay, e.target, n));
	}
	onMouseOut() {
		this.timeout && (clearTimeout(this.timeout),
		this.timeout = null),
		this.hide();
	}
	show(e, t, n) {
		let o, a, i, l, r;
		a = e.getBoundingClientRect(),
		(o = document.createElement('div')).id = 'tooltip',
		t ? o.innerHTML = t : o.textContent = e.getAttribute('data-tip'),
		n || (n = 'top'),
		o.className = 'tip-' + n,
		document.body.appendChild(o),
		(l = a.left - (o.offsetWidth - e.offsetWidth) / 2) < 0 ? (l = a.left + 2,
		o.className += '-right') : l + o.offsetWidth > document.documentElement.clientWidth && (l = a.left - o.offsetWidth + e.offsetWidth + 2,
		o.className += '-left'),
		r = a.top - o.offsetHeight - 5,
		(i = o.style).top = r + window.pageYOffset + 'px',
		i.left = l + window.pageXOffset + 'px',
		this.node = o;
	}
	hide() {
		this.node && (document.body.removeChild(this.node),
		this.node = null);
	}
}
