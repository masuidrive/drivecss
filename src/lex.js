/* Lexical analyzer

   Originai is 
   http://translate.google.com/translate?u=http%3A%2F%2Fd.hatena.ne.jp%2Famachang%2F20080502%2F1209732467&sl=ja
*/
var DriveCSS;
DriveCSS = DriveCSS || {};

DriveCSS.CSSLexer = function(source) {
    this.source = source;
    this.reset();
};

(function() {
    var lex = {
        defs: [
            'h',          /[0-9a-fA-F]/,
            'nonascii',   /[^\0-\177]/,
            'unicode',    /\\{h}{1,6}[ \t\r\n\f]?/,
            'escape',     /{unicode}|\\[ -~]|\\[^\0-\177]/,
            'nmstart',    /[_a-zA-Z]|{nonascii}|{escape}/,
            'nmchar',     /[_a-zA-Z0-9-]|{nonascii}|{escape}/,
            'hexcolor',   /{h}{6}|{h}{3}/,
            'ident',      /-?{nmstart}{nmchar}*/,
            'name',       /{nmchar}+/,
            'intnum',     /[0-9]+/,
	    'num',        /[0-9]*\.[0-9]+|[0-9]+/,
            'url',        /([!#$%&*-~]|{nonascii}|{escape})*/,
            'w',          /[ \t\r\n\f]*/,
            's',          /[ \t\r\n\f]+/,
            'nl',         /\n|\r\n|\r|\f/,
            'string1',    /\"([\t !#$%&(-~]|\\{nl}|\'|{nonascii}|{escape})*\"/,
            'string2',    /\'([\t !#$%&(-~]|\\{nl}|\"|{nonascii}|{escape})*\'/,
            'string',     /{string1}|{string2}/,
            'range',      /[0-9a-fA-F\?]{1,6}/,
            'nth',        /(-?[0-9]*n[\+-]+[0-9]+)|(-?[0-9]*n)/
	],
	rules: [
	    DriveCSS.token.CDO, ["<!--"],
	    DriveCSS.token.CDC, ["-->"],
	    DriveCSS.token.INCLUDES, ["~="],
	    DriveCSS.token.DASHMATCH, ["!="],
            DriveCSS.token.BEGINSWITH, ["^="],
            DriveCSS.token.ENDSWITH, ["$="],
            DriveCSS.token.CONTAINS, ["*="],
            DriveCSS.token.QUERY_NOT, ["not", 'query'],
            DriveCSS.token.QUERY_ONLY, ["only", 'query'],
            DriveCSS.token.QUERY_AND, ["and", 'query'],
            DriveCSS.token.QUERY_END, [/({|;)/, 'query', 'INITIAL', true],
            
	    DriveCSS.token.STRING, [/{string}/],
	    
	    DriveCSS.token.IDENT, [/{ident}/],
            DriveCSS.token.NTH, [/{nth}/],
            DriveCSS.token.HEX, [/#{hexcolor}/],
            DriveCSS.token.IDSEL, [/#{ident}/],
	    
	    DriveCSS.token.HASH, [/#{hash}/],
	    
	    DriveCSS.token.IMPORTANT_SYM, [/!({w})*important/],
	    
	    DriveCSS.token.SYM, [/@{ident}/, undefined, 'query'],
            DriveCSS.token.EMS, [/{num}{w}em/],
            DriveCSS.token.EXS, [/{num}{w}ex/],
            DriveCSS.token.LENGTH, [/{num}{w}(px|cm|mm|pt|pc)/],
            DriveCSS.token.ANGLE, [/{num}{w}(deg|rad|grad)/],
            DriveCSS.token.TIME, [/{num}{w}(ms|s)/],
            DriveCSS.token.FREQ, [/{num}{w}(hz|khz)/],
            DriveCSS.token.DIMENSION, [/{num}{w}{ident}/],
	    DriveCSS.token.PERCENTAGE, [/{num}{w}%+/],
            DriveCSS.token.INTEGER, [/{intnum}/],
            DriveCSS.token.FLOATTOKEN, [/{num}/],
            
            DriveCSS.token.NOTFUNCTION, ["not("],
	    DriveCSS.token.URI, [/(?:url\({w}{string}{w}\))|(?:url\({w}{url}{w}\))/],
            DriveCSS.token.FUNCTION, [/{ident}{w}\(/],
            DriveCSS.token.UNICODERANGE, [/(?:U\+{h}{1,6}-{h}{1,6})|(?:U\+{range})/],
	    
            DriveCSS.token.ALSO, [/./, undefined, undefined, true]
	]
    };
    
    var defs = {};
    for (var i = 0; i < lex.defs.length; i += 2) {
        var n = lex.defs[i];
        var def = lex.defs[i + 1] + '';
        def = def.substring(1, def.length - 1);
        for (var o in defs) {
            def = def.replace(new RegExp('{' + o + '}', 'g'), defs[o]);
        }
        defs[n] = '(?:' + def + ')'; 
    }
    
    var rules = lex.rules;
    for (var i = 0; i < rules.length; i += 2) {
        var n = rules[i];
        var rule = rules[i + 1];
        var reg = rule[0];
        if (reg instanceof RegExp) {
            reg += '';
            reg = reg.substring(1, reg.length - 1);
            for (var n in defs) {
                reg = reg.replace(new RegExp('{' + n + '}', 'g'), defs[n]);
            }
            rule[0] = new RegExp('^(?:' + reg + ')');
        }
    }

    DriveCSS.CSSLexer.rules = rules;
})();


DriveCSS.CSSLexer.prototype = {
    state: 'INITIAL',
    source: null,
    cur: "",
    next: function() {
	this.cur = this.cur.replace(/^[ \t\r\n\f]+/, '');
	if(!this.cur) return 0;
	
        var rules = DriveCSS.CSSLexer.rules;
        var m, matches = [];
        for (var i = 0; i < rules.length; i += 2) {
            var n = rules[i];
            var rule = rules[i + 1];
            var reg = rule[0];
            if (rule[1] == undefined || rule[1] == this.state) {
                if (reg instanceof RegExp) {
                    if (m = reg.exec(this.cur)) {
                        matches.push([m[0].length, n, m[0], rule[2], rule[3]])
                    }
                }
                else {
                    if (this.cur.indexOf(reg) == 0) {
                        matches.push([reg.length, n, reg, rule[2], rule[3]]);
                    }
                }
            }
        }
        var length = 0;
        var token = 0;
        var tokenBody = null;
        var state = undefined;
        var literal = false;
        for (var i = 0, l = matches.length; i < l; i++) {
            var match = matches[i];
            if (length < match[0]) {
                length = match[0];
                token = match[1];
                tokenBody = match[2];
                state = match[3];
                literal = match[4];
            }
        }

        if (state != undefined) {
            this.state = state;
        }
        this.cur = this.cur.substring(length);
        if (token == 0) {
            return false;
        }

        return({ id:(literal ? tokenBody.charCodeAt(0) : token), value:tokenBody });
    },
    reset: function() {
        this.cur = this.source;
    },
    constructor: DriveCSS.CSSLexer
};

