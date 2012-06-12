function Namespace (namespaceString) {
	var parts = namespaceString.split('.');
	var parent = (function(){ return this || (1,eval)('this') })();
	var currentPart = '';

	for(var i = 0, length = parts.length; i < length; i++) {
		currentPart = parts[i];
		parent[currentPart] = parent[currentPart] || {};
		parent = parent[currentPart];
	}

	return parent;
}

Namespace.import = function ( scope, namespaceString ) {
	var parts = namespaceString.split('.'),
	parent = window,
	currentPart = '';

	for(var i = 0, length = parts.length; i < length; i++) {
		currentPart = parts[i];
		if (currentPart != '*') {
			// if it doesn't exist, just ignore
			if ( typeof parent[currentPart] == 'undefined')
				return;
			parent = parent[currentPart];
		} else if (i != length -1) {
			// badly formatted. * is not last object: ignore
			return;
		}
	}

	if (currentPart == '*') {
		for ( id in parent )
		{
			if ( typeof scope[id] != 'undefined') {
				throw ('ERROR::[ Namespace collision: ' + namespaceString + ' ]' );
			} else {
				scope[id] = parent[id];
			}
		}
	} else {
		if ( typeof scope[currentPart] != 'undefined') {
			throw ('ERROR::[ Namespace collision: ' + namespaceString + ' ]' );
		} else {
			scope[currentPart] = parent;
		}
	}

}

