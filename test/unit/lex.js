module("lex");

test('CSSLexer', function() {
    equals(typeof(YAECSS), "object", "Exists YAECSS namescape");
    equals(typeof(YAECSS.CSSLexer), "function", "Exists YAECSS.CSSLexer class");
});

function parse(str) {
    lexer = new YAECSS.CSSLexer(str);
    tokens = [];
    while(token = lexer.next()) {
	tokens.push(token);
    }
    return tokens;
}

function testTokens(str, tokens, values) {
    test('Parse "'+str+'"', function() {
	assertTokens(str, tokens, values);
    });
}

function assertTokens(str, tokens, values) {
    prefix = '"'+str+'"';
    parsed_tokens = parse(str);
    equals(parsed_tokens.length, tokens.length, prefix+' length');
    matched = true;
    label = [];
    for(var i=0; i<tokens.length; ++i) {
	if(typeof(tokens[i])=="object") {
	    equals(parsed_tokens[i].id, tokens[i][0]);
	    equals(parsed_tokens[i].value, tokens[i][1]);
	}
	else {
	    tid = tokens[i];
	    if(typeof(tid)=="string") tid = tid.charCodeAt(0);
	    equals(parsed_tokens[i].id, tid);
	}
    }
}

test("blanks", function(){
    assertTokens("", []);
    assertTokens(" ", []);
    assertTokens("\n", []);
});

test("xml comment", function(){
    assertTokens("<!-- -->", [YAECSS.token.CDO, YAECSS.token.CDC]);
    assertTokens(" <!-- -->  ", [YAECSS.token.CDO, YAECSS.token.CDC]);
});

test("number", function(){
    assertTokens("1234", [[YAECSS.token.INTEGER, "1234"]]);
    assertTokens("-1234", ['-', [YAECSS.token.INTEGER, "1234"]]);
    assertTokens("+1234", ['+', [YAECSS.token.INTEGER, "1234"]]);
    assertTokens("1234.55", [[YAECSS.token.FLOATTOKEN, "1234.55"]]);
    assertTokens("-1234.55", ['-', [YAECSS.token.FLOATTOKEN, "1234.55"]]);
    assertTokens("+1234.55", ['+', [YAECSS.token.FLOATTOKEN, "1234.55"]]);
});

var units = {
    'EMS': ['em'],
    'EXS': ['ex'],
    'LENGTH': ['    px', "\t\tpx", " \n px", 'px', 'cm', 'mm', 'pt', 'pc'],
    'ANGLE': ['deg', 'rad', 'grad'],
    'TIME': ['ms', 's'],
    'FREQ': ['hz', 'khz'],
    'DIMENSION': ['ident', 'f00', 'bar'],
    'PERCENTAGE': ['%'],
};
for(var key in units) {
    for(var i in units[key]) {
	var unit = units[key][i];
	test('number + "'+unit+'"', (function(key, unit){return(function() {
	    assertTokens("1234"+unit, [[YAECSS.token[key], "1234"+unit]]);
	    assertTokens("-1234"+unit, ['-', [YAECSS.token[key], "1234"+unit]]);
	    assertTokens("+1234"+unit, ['+', [YAECSS.token[key], "1234"+unit]]);
	    assertTokens("1234.55"+unit, [[YAECSS.token[key], "1234.55"+unit]]);
	    assertTokens("-1234.55"+unit, ['-', [YAECSS.token[key], "1234.55"+unit]]);
	    assertTokens("+1234.55"+unit, ['+', [YAECSS.token[key], "1234.55"+unit]]);
	})})(key, unit));
    }
}

test("url()", function(){
    assertTokens("url(http://example.com)", [[YAECSS.token.URI, "url(http://example.com)"]]);
    assertTokens("url('http://example.com')", [[YAECSS.token.URI, "url('http://example.com')"]]);
    assertTokens('url("http://example.com")', [[YAECSS.token.URI, 'url("http://example.com")']]);
});

test("string", function(){
    assertTokens("'test test'", [[YAECSS.token.STRING, "'test test'"]]);
    assertTokens("\"test test\"", [[YAECSS.token.STRING, "\"test test\""]]);
    assertTokens("\"test ' test\"", [[YAECSS.token.STRING, "\"test ' test\""]]);
    assertTokens("'test \" test'", [[YAECSS.token.STRING, "'test \" test'"]]);
    assertTokens("'test \\\n test'", [[YAECSS.token.STRING, "'test \\\n test'"]]);
    assertTokens("'ユニコード'", [[YAECSS.token.STRING, "'ユニコード'"]]);
});

test("not() or not", function(){
    assertTokens("not()", [YAECSS.token.NOTFUNCTION, ')']);
    assertTokens("not(ident)", [YAECSS.token.NOTFUNCTION, [YAECSS.token.IDENT, "ident"], ')']);
    assertTokens("@media not;", [YAECSS.token.SYM, YAECSS.token.MEDIA_NOT, ';']);
    assertTokens("not", [YAECSS.token.IDENT]);
    assertTokens("a { not }", [[YAECSS.token.IDENT, 'a'], '{', [YAECSS.token.IDENT, 'not'], '}']);
});

test("id and hex", function(){
    assertTokens("#aaa", [[YAECSS.token.HEX, '#aaa']]);
    assertTokens("#aaaa", [[YAECSS.token.IDSEL, '#aaaa']]);
    assertTokens("#aaaaaa", [[YAECSS.token.HEX, '#aaaaaa']]);
    assertTokens("#BBBBBB", [[YAECSS.token.HEX, '#BBBBBB']]);
    assertTokens("#zzz", [[YAECSS.token.IDSEL, '#zzz']]);
    assertTokens("#test", [[YAECSS.token.IDSEL, '#test']]);
    assertTokens("#foo-bar", [[YAECSS.token.IDSEL, '#foo-bar']]);
    assertTokens("#-foo-bar", [[YAECSS.token.IDSEL, '#-foo-bar']]);
});