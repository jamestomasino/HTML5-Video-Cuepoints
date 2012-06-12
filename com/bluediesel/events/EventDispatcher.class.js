(function() {

	var EventDispatcher = my.Class({

		STATIC: {},

		constructor: function( ) {},

		addEventListener: function(eventName, callback) {
			var events = this._events,
			callbacks = events[eventName] = events[eventName] || [];
			callbacks.push(callback);
		},

		removeEventListener: function(eventName, callback) {
			var events = this._events,
			callbacks = events[eventName] = events[eventName] || null;
			if (callbacks) {
				if ( callback ) {
					var i = callbacks.length - 1;
					while (i >= 0) { if (callbacks[i] == callback) callbacks.splice (i, 1); i--; }
				} else {
					events[eventName] = [];
				}
			}
		},

		dispatchEvent: function(eventName) {
			var callbacks = this._events[eventName];
			for (var i = 0, l = callbacks.length; i < l; i++) {
				callbacks[i].apply(this, Array.prototype.slice.call(arguments, 1));
			}
		},

		_delegate: function (object, method)
		{
			var shim = function() { return method.apply(object, arguments); }
			return shim;
		},

	});

	var namespace = new Namespace ( 'com.bluediesel.events' );
	namespace.EventDispatcher = EventDispatcher;

})();

