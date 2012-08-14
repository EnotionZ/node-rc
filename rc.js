var gpio = require("gpio");

var _open = function(pin, fn) { return gpio.export(pin, {ready: fn}); };

var _close = function(pin, fn) {
	if(typeof pin === "number") {
		gpio.unexport(pin, fn);
	} else if(typeof pin === "object") {
		pin.unexport(fn);
	}
};

var RC = function(opts) {

	opts = opts || {};
	if(typeof opts.pinRight !== "number") opts.pinRight = 17;
	if(typeof opts.pinLeft !== "number") opts.pinLeft = 18;
	if(typeof opts.pinBackward !== "number") opts.pinBackward = 22;
	if(typeof opts.pinForward !== "number") opts.pinForward = 23;

	this.pinRight = _open(opts.pinRight);
	this.pinLeft = _open(opts.pinLeft);
	this.pinBackward = _open(opts.pinBackward);
	this.pinForward = _open(opts.pinForward, opts.ready);
};

RC.prototype.turn = function(side) {
	if(side === "left" || side === "l") {
		this.pinLeft.set();
		this.pinRight.reset();
	} else if (side === "right" || side === "r") {
		this.pinLeft.reset();
		this.pinRight.set();
	} else {
		this.straight();
	}
};

RC.prototype.straight = function() {
	this.pinLeft.reset();
	this.pinRight.reset();
};

RC.prototype.drive = function(direction) {
	if(direction === "forward" || direction === "f") {
		this.pinForward.set();
		this.pinBackward.reset();
	} else if (direction === "backward" || direction === "b") {
		this.pinForward.reset();
		this.pinBackward.set();
	} else {
		this.stop();
	}
};

RC.prototype.stop = function() {
	this.pinForward.reset();
	this.pinBackward.reset();
};

RC.prototype.end = function(fn) {
	_close(this.pinRight);
	_close(this.pinLeft);
	_close(this.pinBackward);
	_close(this.pinForward, fn);
};


exports.init = function(opts){ return new RC(opts); };
