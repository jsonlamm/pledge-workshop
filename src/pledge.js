'use strict';
/*----------------------------------------------------------------
Promises Workshop: build the pledge.js deferral-style promise library
----------------------------------------------------------------*/
// YOUR CODE HERE:

let $Promise = function () {
	this._state = "pending";
	this._handlerGroups = [];
}

$Promise.prototype.then = function( s1, e1 ) {
	if (typeof s1 !== 'function') {
		s1 = undefined;
	}
	if (typeof e1 !== 'function') {
		e1 = undefined;
	}

	this._handlerGroups.push({ 
		successCb: s1,
		errorCb: e1
	})
	this.callHandlers();
}

$Promise.prototype.callHandlers = function() {
	// if (this._state === "fulfilled") {
if(this._state === "pending") {return}
	for (var i = 0; i < this._handlerGroups.length; i++) {
		if (this._state === "fulfilled") {
			var result = this._handlerGroups[i].successCb(this._value);
			this._handlerGroups.shift()
			return result;
		}
	}

	// this._handlerGroups = []


// 		var result = this._handlerGroups[0].successCb(this._value);
// 		// this._handlerGroups.shift()
// 		return result;
// 	}
}

// $Promise = Deferral = defer()
let Deferral = function () {
	this.$promise = new $Promise;	

}

Deferral.prototype.resolve = function (data) {
	// this._state = 'fufilled'
	if (this.$promise._state === "pending" && this.$promise._state !== "rejected") {
		this.$promise._value = data
		this.$promise._state = 'fulfilled'
	}
	
this.$promise.callHandlers()	
}

Deferral.prototype.reject = function (data) {
	// this._state = 'fufilled'
	
	if (this.$promise._state !== 'rejected' && this.$promise._state !== 'fulfilled') {
		this.$promise._value = data
		this.$promise._state = 'rejected'
	}

this.$promise.callHandlers()		
}

let defer = function() {
	return new Deferral;

}



/*-------------------------------------------------------
The spec was designed to work with Test'Em, so we don't
actually use module.exports. But here it is for reference:

module.exports = {
  defer: defer,
};

So in a Node-based project we could write things like this:

var pledge = require('pledge');
…
var myDeferral = pledge.defer();
var myPromise1 = myDeferral.$promise;
--------------------------------------------------------*/
