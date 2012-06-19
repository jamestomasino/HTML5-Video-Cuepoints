(function(){
    function Delegate() {}

	Delegate.getInst = function()
	{
		if(Delegate._inst === undefined)
		{
			Delegate._inst = new Delegate();
		}
		return Delegate._inst;
	};

	var p = Delegate.prototype;

	p.createDelegate = function (object, method)
	{
		var shim =  function()
		{
			return method.apply(object, arguments);
		}
		return shim;
	}
	var namespace = new Namespace ( 'org.tomasino.utils' );

	namespace.Delegate = Delegate.getInst();

})();
