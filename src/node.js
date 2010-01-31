var DriveCSS;
DriveCSS = DriveCSS || {};

(function(){

var h = (function(){
  var map = {"<":"&lt;", ">":"&gt;", "&":"&amp;", "'":"&#39;", "\"":"&quot;", " ":"&nbsp;"};
  var replaceStr = function(s){ return map[s]; };
    return function(str) { return (str+"").replace(/<|>|&|\'|\"| /g, replaceStr); };
})();

var array_flatten = function() {
    var element = (arguments.length == 0) ? this : arguments[0];
    return (element instanceof Array)
        ? Array.prototype.concat.apply([],
				       Array.map(element, arguments.callee))
        : element;
};

DriveCSS.Node = function(op) {
    this.op = op;
    this.values = array_flatten(Array.prototype.slice.call(arguments).slice(1));
};

DriveCSS.Node.prototype.add = function(value) {
    this.values = array_flatten(this.values.concat(value));
    return this;
};

DriveCSS.Node.prototype.toHTML = function() {
    if(this.values.length==0) {
	return "<li class=\"leaf\">"+h(this.op)+"</li>";
    }
    var html = "<li class=\"node\">"+h(this.op)+"<ul>";
    for(var i=0; i<this.values.length; ++i) {
	if(this.values[i].toHTML) {
	    html += this.values[i].toHTML();
	}
	else {
	    html += "<li class=\"leaf\">"+this.values[i]+" <span class=\"type\">("+typeof(this.values[i])+")</span></li>";
	}
    }
    return html+"</ul></li>";
};

//DriveCSS.Node.prototype.toString = function(value) {
//    return "Str";
//};
})();
