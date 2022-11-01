/* ==[ Utils.js ]=============================================================================================
                                                    UTILS
=========================================================================================================== */

// DOM SEARCH

const $Q = (path, root = docBody) => root.querySelectorAll(path);

const $q = (path, root = docBody) => root.querySelector(path);

const $id = id => doc.getElementById(id);

function $parent(el, tagName) {
	do {
		el = el.parentElement;
	} while(el && el.tagName !== tagName);
	return el;
}

function $qParent(el, path) {
	do {
		el = el.parentElement;
	} while(el && !nav.matchesSelector(el, path));
	return el;
}

// DOM MODIFIERS

function $before(el, node) {
	el.parentNode.insertBefore(node, el);
}

function $after(el, node) {
	const nextEl = el.nextSibling;
	if(nextEl) {
		el.parentNode.insertBefore(node, nextEl);
	} else {
		el.parentNode.appendChild(node);
	}
}

function $bBegin(sibling, html) {
	sibling.insertAdjacentHTML('beforebegin', html);
	return sibling.previousSibling;
}

function $aBegin(parent, html) {
	parent.insertAdjacentHTML('afterbegin', html);
	return parent.firstChild;
}

function $bEnd(parent, html) {
	parent.insertAdjacentHTML('beforeend', html);
	return parent.lastChild;
}

function $aEnd(sibling, html) {
	sibling.insertAdjacentHTML('afterend', html);
	return sibling.nextSibling;
}

function $replace(origEl, newEl) {
	if(typeof newEl === 'string') {
		origEl.insertAdjacentHTML('afterend', newEl);
		origEl.remove();
	} else {
		origEl.parentNode.replaceChild(newEl, origEl);
	}
}

function $del(el) {
	if(el) {
		el.remove();
	}
}

function $delAll(path, root = docBody) {
	$each(root.querySelectorAll(path, root), el => el.remove());
}

function $add(html) {
	dummy.innerHTML = html;
	return dummy.firstElementChild;
}

function $btn(value, title, fn, className = 'de-button') {
	const el = $add(`<input type="button" class="${ className }" value="${ value }" title="${ title }">`);
	el.addEventListener('click', fn);
	return el;
}

function $script(text) {
	const el = doc.createElement('script'); // We can't insert scripts directly as html
	el.type = 'text/javascript';
	el.textContent = text;
	doc.head.appendChild(el).remove();
}

function $css(text) {
	if(nav.isSafari && !('flex' in docBody.style)) {
		text = text.replace(/(transform|transition|flex|align-items)/g, ' -webkit-$1');
	}
	return $bEnd(doc.head, `<style type="text/css">${ text }</style>`);
}

function $DOM(html) {
	const myDoc = doc.implementation.createHTMLDocument('');
	myDoc.documentElement.innerHTML = html;
	return myDoc;
}

// CSS UTILS

function $toggle(el, needToShow = el.style.display) {
	if(needToShow) {
		el.style.removeProperty('display');
	} else {
		el.style.display = 'none';
	}
}

function $show(el) {
	el.style.removeProperty('display');
}

function $hide(el) {
	el.style.display = 'none';
}

function $animate(el, cName, isRemove = false) {
	el.addEventListener('animationend', function aEvent() {
		el.removeEventListener('animationend', aEvent);
		if(isRemove) {
			el.remove();
		} else {
			el.classList.remove(cName);
		}
	});
	el.classList.add(cName);
}

// Checks the validity of the user inputted color
function checkCSSColor(color) {
	if(!color || color === 'inherit' || color === 'currentColor') {
		return false;
	}
	if(color === 'transparent') {
		return true;
	}
	const image = doc.createElement('img');
	image.style.color = 'rgb(0, 0, 0)';
	image.style.color = color;
	if(image.style.color !== 'rgb(0, 0, 0)') {
		return true;
	}
	image.style.color = 'rgb(255, 255, 255)';
	image.style.color = color;
	return image.style.color !== 'rgb(255, 255, 255)';
}

const cssMatches = (leftSel, ...rules) => leftSel.split(', ').map(
	val => val + rules.join(', ' + val)
).join(', ');

// OTHER UTILS

const $hasProp = (obj, i) => Object.prototype.hasOwnProperty.call(obj, i);

const pad2 = i => (i < 10 ? '0' : '') + i;

const arrTags = (arr, start, end) => start + arr.join(end + start) + end;

const fixBrd = b => `/${ b }${ b ? '/' : '' }`;

const getAbsLink = url => (
	url[1] === '/' ? aib.prot :
	url[0] === '/' ? aib.prot + '//' + aib.host : '') + url;

const getFileName = url => url.substring(url.lastIndexOf('/') + 1);

const getFileExt = url => url.substring(url.lastIndexOf('.') + 1);

const cutFileExt = fileName => fileName.substring(0, fileName.lastIndexOf('.'));

const prettifySize = val =>
	val > 512 * 1024 * 1024 ? (val / (1024 ** 3)).toFixed(2) + Lng.sizeGByte[lang] :
	val > 512 * 1024 ? (val / (1024 ** 2)).toFixed(2) + Lng.sizeMByte[lang] :
	val > 512 ? (val / 1024).toFixed(2) + Lng.sizeKByte[lang] :
	val.toFixed(2) + Lng.sizeByte[lang];

// Prepares a string to be used as a new RegExp argument
const quoteReg = str => (str + '').replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');

// Converts a string to a regular expression
function toRegExp(str, noG) {
	const l = str.lastIndexOf('/');
	const flags = str.substr(l + 1);
	return new RegExp(str.substr(1, l - 1), noG ? flags.replace('g', '') : flags);
}

function toggleAttr(el, name, value, isAdd) {
	if(isAdd) {
		el.setAttribute(name, value);
	} else {
		el.removeAttribute(name);
	}
}

function $pd(e) {
	e.preventDefault();
}

function $isEmpty(obj) {
	for(const i in obj) {
		if($hasProp(obj, i)) {
			return false;
		}
	}
	return true;
}

function insertText(el, txt) {
	const scrtop = el.scrollTop;
	const start = el.selectionStart;
	el.value = el.value.substr(0, start) + txt + el.value.substr(el.selectionEnd);
	el.setSelectionRange(start + txt.length, start + txt.length);
	el.focus();
	el.scrollTop = scrtop;
}

// XXX: SVG events hack for Opera Presto
function fixEventEl(el) {
	if(el && nav.isPresto) {
		const svg = el.correspondingUseElement;
		if(svg) {
			el = svg.ownerSVGElement;
		}
	}
	return el;
}

// Allows to record the duration of code execution
const Logger = {
	finish() {
		this._finished = true;
		this._marks.push(['LoggerFinish', Date.now()]);
	},
	getLogData(isFull) {
		const marks = this._marks;
		const timeLog = [];
		let duration, i = 1;
		let lastExtra = 0;
		for(let len = marks.length - 1; i < len; ++i) {
			duration = marks[i][1] - marks[i - 1][1] + lastExtra;
			if(isFull || duration > 1) {
				lastExtra = 0;
				timeLog.push([marks[i][0], duration]);
			} else { // Ignore logs equal to 0ms
				lastExtra = duration;
			}
		}
		timeLog.push([Lng.total[lang], marks[i][1] - marks[0][1]]);
		return timeLog;
	},
	initLogger() {
		this._marks.push(['LoggerInit', Date.now()]);
	},
	log(text) {
		if(!this._finished) {
			this._marks.push([text, Date.now()]);
		}
	},

	_finished : false,
	_marks    : []
};

// Some async operations should be cancelable, to ignore all the chaining callbacks of promises.
// Cancellation is supposed to flow through a graph of promise dependencies. When a promise is cancelled, it
// will propagate to the farthest pending promises and reject them with the cancel reason CancelError.
function CancelError() {}
class CancelablePromise {
	constructor(resolver, cancelFn) {
		this._promise = new Promise((resolve, reject) => {
			this._reject = reject;
			resolver(value => {
				resolve(value);
				this._isResolved = true;
			}, reason => {
				reject(reason);
				this._isResolved = true;
			});
		});
		this._cancelFn = cancelFn;
		this._isResolved = false;
	}
	static reject(val) {
		return new CancelablePromise((res, rej) => rej(val));
	}
	static resolve(val) {
		return new CancelablePromise(res => res(val));
	}
	cancelPromise() {
		this._reject(new CancelError());
		if(!this._isResolved && this._cancelFn) {
			this._cancelFn();
		}
	}
	catch(eb) {
		return this.then(undefined, eb);
	}
	then(cb, eb) {
		const children = [];
		const wrap = fn => (...args) => {
			const child = fn(...args);
			if(child instanceof CancelablePromise) {
				children.push(child);
			}
			return child;
		};
		return new CancelablePromise(
			resolve => resolve(this._promise.then(cb && wrap(cb), eb && wrap(eb))), () => {
				for(const child of children) {
					child.cancelPromise();
				}
				this.cancelPromise();
			});
	}
}

class Maybe {
	constructor(Ctor/* , ...args */) {
		this._ctor = Ctor;
		// this._args = args;
		this.hasValue = false;
	}
	get value() {
		const Ctor = this._ctor;
		this.hasValue = !!Ctor;
		const value = Ctor ? new Ctor(/* ...this._args */) : null;
		Object.defineProperty(this, 'value', { value });
		return value;
	}
}

class TemporaryContent {
	constructor(key) {
		const oClass = /* new.target */this.constructor; // https://github.com/babel/babel/issues/1088
		if(oClass.purgeTO) {
			clearTimeout(oClass.purgeTO);
		}
		oClass.purgeTO = setTimeout(() => oClass.purge(), oClass.purgeSecs);
		if(oClass.data) {
			const rv = oClass.data.get(key);
			if(rv) {
				return rv;
			}
		} else {
			oClass.data = new Map();
		}
		oClass.data.set(key, this);
	}
	static get(key) {
		return this.data ? this.data.get(key) : null;
	}
	static has(key) {
		return this.data ? this.data.has(key) : false;
	}
	static purge() {
		if(this.purgeTO) {
			clearTimeout(this.purgeTO);
			this.purgeTO = null;
		}
		this.data = null;
	}
	static removeTempData(key) {
		if(this.data) {
			this.data.delete(key);
		}
	}
}
TemporaryContent.purgeSecs = 6e4;

class TasksPool {
	constructor(tasksCount, taskFunc, endFn) {
		this.array = [];
		this.running = 0;
		this.num = 1;
		this.func = taskFunc;
		this.endFn = endFn;
		this.max = tasksCount;
		this.completed = this.paused = this.stopped = false;
	}
	completeTasks() {
		if(!this.stopped) {
			if(this.array.length === 0 && this.running === 0) {
				this.endFn();
			} else {
				this.completed = true;
			}
		}
	}
	pauseTasks() {
		this.paused = true;
	}
	runTask(data) {
		if(!this.stopped) {
			if(this.paused || this.running === this.max) {
				this.array.push(data);
			} else {
				this._runTask(data);
				this.running++;
			}
		}
	}
	stopTasks() {
		this.stopped = true;
		this.endFn();
	}

	_continueTasks() {
		if(!this.stopped) {
			this.paused = false;
			if(this.array.length === 0) {
				if(this.completed) {
					this.endFn();
				}
				return;
			}
			while(this.array.length !== 0 && this.running !== this.max) {
				this._runTask(this.array.shift());
				this.running++;
			}
		}
	}
	_endTask() {
		if(!this.stopped) {
			if(!this.paused && this.array.length !== 0) {
				this._runTask(this.array.shift());
				return;
			}
			this.running--;
			if(!this.paused && this.completed && this.running === 0) {
				this.endFn();
			}
		}
	}
	_runTask(data) {
		this.func(this.num++, data).then(() => this._endTask(), err => {
			if(err instanceof TasksPool.PauseError) {
				this.pauseTasks();
				if(err.duration !== -1) {
					setTimeout(() => this._continueTasks(), err.duration);
				}
			} else {
				this._endTask();
				throw err;
			}
		});
	}
}
TasksPool.PauseError = function(duration) {
	this.name = 'TasksPool.PauseError';
	this.duration = duration;
};

class WorkerPool {
	constructor(mReqs, wrkFn, errFn) {
		if(!nav.hasWorker) {
			this.runWorker = (data, transferObjs, fn) => fn(wrkFn(data));
			return;
		}
		const url = deWindow.URL.createObjectURL(new Blob([`self.onmessage = function(e) {
			var info = (${ String(wrkFn) })(e.data);
			if(info.data) {
				self.postMessage(info, [info.data]);
			} else {
				self.postMessage(info);
			}
		}`], { type: 'text/javascript' }));
		this._pool = new TasksPool(mReqs, (num, data) => this._createWorker(num, data), null);
		this._freeWorkers = [];
		this._url = url;
		this._errFn = errFn;
		while(mReqs--) {
			this._freeWorkers.push(new Worker(url));
		}
	}
	clearWorkers() {
		deWindow.URL.revokeObjectURL(this._url);
		this._freeWorkers.forEach(w => w.terminate());
		this._freeWorkers = [];
	}
	runWorker(data, transferObjs, fn) {
		this._pool.runTask([data, transferObjs, fn]);
	}

	_createWorker(num, data) {
		return new Promise(resolve => {
			const worker = this._freeWorkers.pop();
			const [sendData, transferObjs, fn] = data;
			worker.onmessage = e => {
				fn(e.data);
				this._freeWorkers.push(worker);
				resolve();
			};
			worker.onerror = err => {
				resolve();
				this._freeWorkers.push(worker);
				this._errFn(err);
			};
			worker.postMessage(sendData, transferObjs);
		});
	}
}

class TarBuilder {
	constructor() {
		this._data = [];
	}
	addFile(filepath, input) {
		let i, checksum = 0;
		const fileSize = input.length;
		const header = new Uint8Array(512);
		const nameLen = Math.min(filepath.length, 100);
		for(i = 0; i < nameLen; ++i) {
			header[i] = filepath.charCodeAt(i) & 0xFF;
		}
		TarBuilder._padSet(header, 100, '100777', 8); // fileMode
		TarBuilder._padSet(header, 108, '0', 8); // uid
		TarBuilder._padSet(header, 116, '0', 8); // gid
		TarBuilder._padSet(header, 124, fileSize.toString(8), 13); // fileSize
		TarBuilder._padSet(header, 136, Math.floor(Date.now() / 1e3).toString(8), 12); // mtime
		TarBuilder._padSet(header, 148, '        ', 8); // checksum
		// type ('0')
		header[156] = 0x30;
		for(i = 0; i < 157; ++i) {
			checksum += header[i];
		}
		// checksum
		TarBuilder._padSet(header, 148, checksum.toString(8), 8);
		this._data.push(header, input);
		if((i = Math.ceil(fileSize / 512) * 512 - fileSize) !== 0) {
			this._data.push(new Uint8Array(i));
		}
	}
	addString(filepath, str) {
		const sDat = unescape(encodeURIComponent(str));
		this.addFile(filepath, new Uint8Array(sDat.length).map((val, i) => sDat.charCodeAt(i) & 0xFF));
	}
	get() {
		this._data.push(new Uint8Array(1024));
		return new Blob(this._data, { type: 'application/x-tar' });
	}

	static _padSet(data, offset, num, len) {
		let i = 0;
		const nLen = num.length;
		len -= 2;
		while(nLen < len) {
			data[offset++] = 0x20; // ' '
			len--;
		}
		while(i < nLen) {
			data[offset++] = num.charCodeAt(i++);
		}
		data[offset] = 0x20; // ' '
	}
}

class WebmParser {
	constructor(data) {
		let offset = 0;
		const dv = nav.getUnsafeDataView(data);
		const len = dv.byteLength;
		const el = new WebmParser.Element(dv, len, 0);
		const voids = [];
		const EBMLId = 0x1A45DFA3;
		const segmentId = 0x18538067;
		const voidId = 0xEC;
		this.voidId = voidId;
		error: do {
			if(el.error || el.id !== EBMLId) {
				break;
			}
			this.EBML = el;
			offset += el.headSize + el.size;
			while(true) {
				const el = new WebmParser.Element(dv, len, offset);
				if(el.error) {
					break error;
				}
				if(el.id === segmentId) {
					this.segment = el;
					break; // Ignore everything after first segment
				} else if(el.id === voidId) {
					voids.push(el);
				} else {
					break error;
				}
				offset += el.headSize + el.size;
			}
			this.voids = voids;
			this.data = data;
			this.length = len;
			this.rv = [null];
			this.error = false;
			return;
		} while(false);
		this.error = true;
	}
	addWebmData(data) {
		if(this.error || !data) {
			return this;
		}
		const size = typeof data === 'string' ? data.length : data.byteLength;
		if(size > 127) {
			this.error = true;
			return;
		}
		this.rv.push(new Uint8Array([this.voidId, 0x80 | size]), data);
		return this;
	}
	getWebmData() {
		if(this.error) {
			return null;
		}
		this.rv[0] = nav.getUnsafeUint8Array(this.data, 0, this.segment.endOffset);
		return this.rv;
	}
}
WebmParser.Element = function(elData, dataLength, offset) {
	this.error = false;
	this.id = 0;
	if(offset + 4 >= dataLength) {
		return;
	}
	let num = elData.getUint32(offset);
	let leadZeroes = Math.clz32(num);
	if(leadZeroes > 3) {
		this.error = true;
		return;
	}
	offset += leadZeroes + 1;
	if(offset >= dataLength) {
		this.error = true;
		return;
	}
	this.id = num >>> (8 * (3 - leadZeroes));
	this.headSize = leadZeroes + 1;
	num = elData.getUint32(offset);
	leadZeroes = Math.clz32(num);
	let size = num & (0xFFFFFFFF >>> (leadZeroes + 1));
	if(leadZeroes > 3) {
		const shift = 8 * (7 - leadZeroes);
		if(size >>> shift !== 0 || offset + 4 > dataLength) {
			this.error = true;
			return; // We cannot handle webm-files with size greater than 4Gb :(
		}
		size = (size << (32 - shift)) | (elData.getUint32(offset + 4) >>> shift);
	} else {
		size >>>= 8 * (3 - leadZeroes);
	}
	this.headSize += leadZeroes + 1;
	offset += leadZeroes + 1;
	if(offset + size > dataLength) {
		this.error = true;
		return;
	}
	this.data = elData;
	this.offset = offset;
	this.endOffset = offset + size;
	this.size = size;
};

function getErrorMessage(err) {
	if(err instanceof AjaxError) {
		return err.toString();
	}
	if(typeof err === 'string') {
		return err;
	}
	const { stack, name, message } = err;
	return Lng.internalError[lang] + (
		!stack ? `${ name }: ${ message }` :
		nav.isWebkit ? stack : `${ name }: ${ message }\n${ !nav.isFirefox ? stack : stack.replace(
			/^([^@]*).*\/(.+)$/gm,
			(str, fName, line) => `    at ${ fName ? `${ fName } (${ line })` : line }`
		) }`
	);
}

async function readFile(file, asText = false) {
	return new Promise(resolve => {
		const fr = new FileReader();
		// XXX: firefox hack to prevent 'XrayWrapper denied access to property "then"' errors
		fr.onload = e => resolve({ data: e.target.result });
		if(asText) {
			fr.readAsText(file);
		} else {
			fr.readAsArrayBuffer(file);
		}
	});
}

function getFileType(url) {
	const dotIdx = url.lastIndexOf('.') + 1;
	switch(dotIdx && url.substr(dotIdx).toLowerCase()) {
	case 'gif': return 'image/gif';
	case 'jpeg':
	case 'jpg': return 'image/jpeg';
	case 'mp4':
	case 'm4v': return 'video/mp4';
	case 'ogv': return 'video/ogv';
	case 'png': return 'image/png';
	case 'web':
	case 'webm': return 'video/webm';
	case 'webp': return 'image/webp';
	default: return '';
	}
}

function downloadBlob(blob, name) {
	const url = nav.isMsEdge ? navigator.msSaveOrOpenBlob(blob, name) : deWindow.URL.createObjectURL(blob);
	const link = $bEnd(docBody, `<a href="${ url }" download="${ name }"></a>`);
	link.click();
	setTimeout(() => {
		deWindow.URL.revokeObjectURL(url);
		link.remove();
	}, 2e5);
}

function showDonateMsg() {
	const font = ' style="font: 13px monospace; color: green;"';
	$popup('donate', Lng.donateMsg[lang] + ':<br style="margin-bottom: 8px;">' +
		'<div class="de-logo"><svg><use xlink:href="#de-symbol-panel-logo"/></svg></div>' +
		'<div style="display: inline-block;"><b><i>Yandex.Money</i></b><br>' +
		`<span class="de-list de-depend"><i${
			font }>410012122418236</i></span><br><b><i>WebMoney</i></b><br>` +
		`<span class="de-list de-depend">WMZ &ndash; <i${ font }>Z100197626370</i></span><br>` +
		`<span class="de-list de-depend">WMR &ndash; <i${ font }>R266614957054</i></span><br>` +
		`<span class="de-list de-depend">WMU &ndash; <i${ font }>U142375546253</i></span><br>` +
		`<b><i>Bitcoin</i></b><br><span class="de-list de-depend">P2PKH &ndash; <i${
			font }>15xEo7BVQ3zjztJqKSRVhTq3tt3rNSHFpC</i></span><br>` +
		`<span class="de-list de-depend">P2SH &ndash; <i${
			font }>3AhNPPpvtxQoFCLXk5e9Hzh6Ex9h7EoNzq</i></span></div>` +
		(nav.firefoxVer >= 56 && nav.scriptHandler !== 'WebExtension' ?
			`<br><br>New: <a href="https://addons.mozilla.org/${ lang === 1 ? 'en-US' : 'ru' }` +
			'/firefox/addon/dollchan-extension/" target="_blank">' + Lng.firefoxAddon[lang] : ''));
}
