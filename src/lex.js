/* Lexical analyzer */
JSCSS = {};

JSCSS.CSSLexer = function(source) {
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
            'hexcolor',   /{h}{3}|{h}{6}/,
            'ident',      /-?{nmstart}{nmchar}*/,
            'name',       /{nmchar}+/,
	    'num',        /[0-9]+|[0-9]*\.[0-9]+/,
            'intnum',     /[0-9]+/,
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
	    S, [/{s}/],
	    CDO, ["<!--"],
	    CDC, ["-->"],
	    INCLUDES, ["~="],
	    DASHMATCH, ["!="],
            BEGINSWITH, ["^="],
            ENDSWITH, ["$="],
            CONTAINS, ["*="],
            MEDIA_NOT, ["not", 'mediaquery'],
            MEDIA_ONLY, ["only", 'mediaquery'],
            MEDIA_AND, ["and", 'mediaquery'],
	    
	    STRING, [/{string}/],
	    INVALID, [/{invalid}/],
	    
	    IDENT, [/{ident}/],
            NTH, [/{nth}/],
            HEX, [/#{hexcolor}/],
            IDSEL, [/#{ident}/],
	    
	    HASH, [/#{hash}/],
	    
	    SYM, [/@{h}/],
	    
	    IMPORTANT_SYM, [/!({w})*important/],
	    
            EMS, [/{num}{w}em/],
            EXS, [/{num}{w}ex/],
            LENGTH, [/{num}{w}(px|cm|mm|pt|pc)/],
            ANGLE, [/{num}{w}(deg|rad|grad)/],
            TIME, [/{num}{w}(ms|s)/],
            FREQ, [/{num}{w}(hz|khz)/],
            DIMENSION, [/{num}{w}{ident}/],
	    PERCENTAGE, [/{num}{w}%+/],
            INTEGER, [/{intnum}/],
            FLOATTOKEN, [/{num}/],

            NOTFUNCTION, ["not("],
	    URI, [/(?:url\({w}{string}{w}\))|(?:url\({w}{url}{w}\))/],
            FUNCTION, [/{ident}{w}\(/],
            UNICODERANGE, [/(?:U\+{range})|(?:U\+{h}{1,6}-{h}{1,6})/],
	    
            MEDIAQUERY_END, [/{|;/, 'mediaquery', 'INITIAL', true],
            
            ALSO, [/./, undefined, undefined, true]
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

    JSCSS.CSSLexer.rules = rules;
})();


JSCSS.CSSLexer.prototype = {
    state: 'INITIAL',
    source: null,
    cur: null,
    tokneBody: null,
    next: function() {
	this.cur = this.cur.replace(/[ \t\r\n\f]+/, '');
	if(!this.cur) return 0;
	
        var rules = JSCSS.CSSLexer.rules;
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
        this.tokenBody = tokenBody;
        this.cur = this.cur.substring(length);
        if (token == 0) {
            return 0;
        }
        return literal ? tokenBody.charCodeAt(0) : token;
    },
    reset: function() {
        this.cur = this.source;
    },
    constructor: JSCSS.CSSLexer
};

