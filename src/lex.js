/* Lexical analyzer

   Originai is below address
   http://translate.google.com/translate?u=http%3A%2F%2Fd.hatena.ne.jp%2Famachang%2F20080502%2F1209732467&sl=ja
*/
var YAECSS;
YAECSS = YAECSS || {};

YAECSS.CSSLexer = function(source) {
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
            'range',      /\?{1,6}|{h}(\?{0,5}|{h}(\?{0,4}|{h}(\?{0,3}|{h}(\?{0,2}|{h}(\??|{h})))))/,
            'nth',        /(-?[0-9]*n[\+-][0-9]+)|(-?[0-9]*n)/
	],
	rules: [
	    YAECSS.token.CDO, ["<!--"],
	    YAECSS.token.CDC, ["-->"],
	    YAECSS.token.INCLUDES, ["~="],
	    YAECSS.token.DASHMATCH, ["!="],
            YAECSS.token.BEGINSWITH, ["^="],
            YAECSS.token.ENDSWITH, ["$="],
            YAECSS.token.CONTAINS, ["*="],
            YAECSS.token.MEDIA_NOT, ["not", 'mediaquery'],
            YAECSS.token.MEDIA_ONLY, ["only", 'mediaquery'],
            YAECSS.token.MEDIA_AND, ["and", 'mediaquery'],
	    
	    YAECSS.token.STRING, [/{string}/],
	    YAECSS.token.INVALID, [/{invalid}/],
	    
	    YAECSS.token.IDENT, [/{ident}/],
            YAECSS.token.NTH, [/{nth}/],
            YAECSS.token.HEX, [/#{hexcolor}/],
            YAECSS.token.IDSEL, [/#{ident}/],
	    
	    YAECSS.token.HASH, [/#{hash}/],
	    
	    YAECSS.token.SYM, [/@{ident}/, undefined, 'mediaquery'],
	    
	    YAECSS.token.IMPORTANT_SYM, [/!({w})*important/],
	    
            YAECSS.token.EMS, [/{num}{w}em/],
            YAECSS.token.EXS, [/{num}{w}ex/],
            YAECSS.token.LENGTH, [/{num}{w}(px|cm|mm|pt|pc)/],
            YAECSS.token.ANGLE, [/{num}{w}(deg|rad|grad)/],
            YAECSS.token.TIME, [/{num}{w}(ms|s)/],
            YAECSS.token.FREQ, [/{num}{w}(hz|khz)/],
            YAECSS.token.DIMENSION, [/{num}{w}{ident}/],
	    YAECSS.token.PERCENTAGE, [/{num}{w}%+/],
            YAECSS.token.INTEGER, [/{intnum}/],
            YAECSS.token.FLOATTOKEN, [/{num}/],

            YAECSS.token.NOTFUNCTION, ["not("],
	    YAECSS.token.URI, [/(?:url\({w}{string}{w}\))|(?:url\({w}{url}{w}\))/],
            YAECSS.token.FUNCTION, [/{ident}{w}\(/],
            YAECSS.token.UNICODERANGE, [/(?:U\+{range})|(?:U\+{h}{1,6}-{h}{1,6})/],
	    
            YAECSS.token.MEDIAQUERY_END, [/{|;/, 'mediaquery', 'INITIAL', true],
            
            YAECSS.token.ALSO, [/./, undefined, undefined, true]
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

    YAECSS.CSSLexer.rules = rules;
})();


YAECSS.CSSLexer.prototype = {
    state: 'INITIAL',
    source: null,
    cur: null,
    next: function() {
	this.cur = this.cur.replace(/^[ \t\r\n\f]+/, '');
	if(!this.cur) return 0;
	
        var rules = YAECSS.CSSLexer.rules;
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
    constructor: YAECSS.CSSLexer
};

