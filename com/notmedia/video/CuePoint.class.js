(function() {

	var CuePoint = my.Class({

		STATIC: {
			TYPE_CUEPOINT: 'cuepoint'
		},

		constructor: function(time, name, type, prev) {
			this.next = null;
			this.prev = prev || null;
			this.name = name || '';
			this.time = time || 0;
			this.type = type || CuePoint.TYPE_CUEPOINT;

			if (prev != null) {
				this.prev = prev;

				if (prev.next != null) {
					prev.next.prev = this;
					this.next = prev.next;
				}

				prev.next = this;
			}

		},

		destroy: function () {
			this.next = null;
			this.prev = null;
			this.name = null;
			this.time = null;
			this.type = null;
			this = null;
		},

		toString: function () {
			var returnstr = '[CuePointVo time: ' + time + ' name: ' + name + ' type: ' + type + ']';
			return returnstr;
		}

	});

	var namespace = new Namespace ( 'com.notmedia.video' );
	namespace.CuePoint = CuePoint;

})();

