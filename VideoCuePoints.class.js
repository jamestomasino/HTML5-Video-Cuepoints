;(function(window) {

    function VideoCuePoints ( video )
    {
		VideoCuePoints.CUE_POINT_EVENT = 'VideoCuePoints_CUE_POINT_EVENT';

		var self           = this;
		var _video         = null; // Video Object
		var _time          = 0; // Number
		var _firstCuePoint = null; // CuePointVO
		var _isSeeking     = false; // boolean

		self.addCuePoint = function ( time, label )
		{
			var prevCuePoint = _firstCuePoint;

			if ( prevCuePoint != null && prevCuePoint.time > time )
			{
				prevCuePoint = null;
			}
			else
			{
				while (prevCuePoint != null && prevCuePoint.time <= time && prevCuePoint.next != null && prevCuePoint.next.time <= time)
				{
					prevCuePoint = prevCuePoint.next;
				}
			}

			var cuePoint = new CuePointVO ( time, label, 'javascript', prevCuePoint );

			if ( prevCuePoint == null )
			{
				if ( _firstCuePoint != null )
				{
					_firstCuePoint.prev = cuePoint;
					cuePoint.next = _firstCuePoint;
				}

				_firstCuePoint = cuePoint;
			}
		}

		self.removeCuePoint = function ( timeNameOrCuePoint )
		{
			var cuePoint = _firstCuePoint;

			while (cuePoint != null)
			{
				if (cuePoint == timeNameOrCuePoint || cuePoint.time == timeNameOrCuePoint || cuePoint.name == timeNameOrCuePoint)
				{
					if (cuePoint.next != null)
					{
						cuePoint.next.prev = cuePoint.prev;
					}

					if (cuePoint.prev != null)
					{
						cuePoint.prev.next = cuePoint.next;
					}
					else if (cuePoint == _firstCuePoint)
					{
						_firstCuePoint = cuePoint.next;
					}

					cuePoint.next = cuePoint.prev = null;

					return;
				}

				cuePoint = cuePoint.next;
			}

			return;
		}


		function onTimeUpdate (e)
		{
			//console.log ('onTimeUpdate: ', _video.currentTime );
			if ( _firstCuePoint != null )
			{
				if ( _time != _video.currentTime )
				{
					if (!_isSeeking)
					{
						var nextCuePoint = null;
						var cuePoint = _firstCuePoint;

						while (cuePoint)
						{
							nextCuePoint = cuePoint.next;

							if ( _time < cuePoint.time && cuePoint.time <= _video.currentTime )
							{
								//console.log ( cuePoint.name, ' - ', cuePoint.time );
								self.emit ( VideoCuePoints.CUE_POINT_EVENT, cuePoint.name, cuePoint.time, cuePoint.type );
							}

							cuePoint = nextCuePoint;
						}
					}

					_time = _video.currentTime;
				}
			}
		}

		self.onCuePoint = function ( callback ) { self.on ( VideoCuePoints.CUE_POINT_EVENT, callback ); }

		function onSeeking (e)
		{
			_isSeeking = true;

		}

		function onSeeked (e)
		{
			_time = _video.currentTime;
			_isSeeking = false;

		}

        function __construct(video)
        {
			_video = video;
			_video.addEventListener ( "timeupdate", onTimeUpdate );
			_video.addEventListener ( "seeking", onSeeking );
			_video.addEventListener ( "seeked", onSeeked );
			smokesignals.convert(self);

        } __construct(video);
    }

window.VideoCuePoints = VideoCuePoints;
}(window));

;(function(window) {

    function CuePointVO (time, name, type, prev)
    {
        var self = this;

		// Faux-Statics
        CuePointVO.TYPE_CUEPOINT = 'cuepoint';

		// Parameters
		time       = setDefault ( time, 0 );
		name       = setDefault ( name, '' );
		type       = setDefault ( type, CuePointVO.TYPE_CUEPOINT );
		prev       = setDefault ( prev, null );

		// members
		self.next       = null; //CuePointVO
		self.prev       = null; //CuePointVO
		self.name       = '';   //String
		self.time       = 0;    //Number
		self.type       = '';   //String

		self.toString = function ()
		{
			var returnstr = '[CuePointVo time: ' + time + ' name: ' + name + ' type: ' + type + ']';
			return returnstr;
		}

		function setDefault ( p, d ) { return (p === undefined) ? d : p; }

        function __construct (time, name, type, prev)
        {
			self.time = time;
			self.name = name;
			self.type = type;
			if (prev != null)
			{
				self.prev = prev;

				if (prev.next != null)
				{
					prev.next.prev = self;
					self.next = prev.next;
				}

				prev.next = self;
			}
        } __construct(time, name, type, prev);
    }

window.CuePointVO = CuePointVO;
}(window));

smokesignals={convert:function(c,e){e={};c.on=function(d,a){(e[d]=e[d]||[]).push(a);return c};c.once=function(d,a){function b(){a.apply(c.off(d,b),arguments)}b.h=a;return c.on(d,b)};c.off=function(d,a){for(var b=e[d],f=0;a&&b&&b[f];f++)b[f]!=a&&b[f].h!=a||b.splice(f--,1);f||delete e[d];return c};c.emit=function(d){for(var a=e[d],b=0;a&&a[b];)a[b++].apply(c,a.slice.call(arguments,1));return c};return c}};
