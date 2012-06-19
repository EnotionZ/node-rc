var gpio = require("gpio");

var RC = function(opts) {

	opts = opts || {};
	if(typeof opts.pinRight !== "number") opts.pinRight = 17;
	if(typeof opts.pinLeft !== "number") opts.pinLeft = 18;
	if(typeof opts.pinBackward !== "number") opts.pinBackward = 22;
	if(typeof opts.pinForward !== "number") opts.pinForward = 23;

	this.pinRight = this._open(opts.pinRight);
	this.pinLeft = this._open(opts.pinLeft);
	this.pinBackward = this._open(opts.pinBackward);
	this.pinForward = this._open(opts.pinForward);
};

RC.prototype._open = function(pin) {
	var p = gpio.export(pin);
	setTimeout(function() { p.setDirection("out"); }, 100);
	return p;
};

RC.prototype._close = function(pin) {
	if(typeof pin === "number") {
		gpio.unexport(pin);
	} else if(typeof pin === "object") {
		pin.unexport();
	}
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

RC.prototype.end = function() {
	this._close(this.pinRight);
	this._close(this.pinLeft);
	this._close(this.pinBackward);
	this._close(this.pinForward);
};


exports.init = function(){ return new RC(); };
