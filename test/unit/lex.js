module("lex");

test('CSSLexer', function() {
    equals(typeof(DriveCSS), "object", "Exists DriveCSS namescape");
    equals(typeof(DriveCSS.CSSLexer), "function", "Exists DriveCSS.CSSLexer class");
});

function parse(str) {
    lexer = new DriveCSS.CSSLexer(str);
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
    assertTokens("<!-- -->", [DriveCSS.token.CDO, DriveCSS.token.CDC]);
    assertTokens(" <!-- -->  ", [DriveCSS.token.CDO, DriveCSS.token.CDC]);
});

test("number", function(){
    assertTokens("1234", [[DriveCSS.token.INTEGER, "1234"]]);
    assertTokens("-1234", ['-', [DriveCSS.token.INTEGER, "1234"]]);
    assertTokens("+1234", ['+', [DriveCSS.token.INTEGER, "1234"]]);
    assertTokens("1234.55", [[DriveCSS.token.FLOATTOKEN, "1234.55"]]);
    assertTokens("-1234.55", ['-', [DriveCSS.token.FLOATTOKEN, "1234.55"]]);
    assertTokens("+1234.55", ['+', [DriveCSS.token.FLOATTOKEN, "1234.55"]]);
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
	    assertTokens("1234"+unit, [[DriveCSS.token[key], "1234"+unit]]);
	    assertTokens("-1234"+unit, ['-', [DriveCSS.token[key], "1234"+unit]]);
	    assertTokens("+1234"+unit, ['+', [DriveCSS.token[key], "1234"+unit]]);
	    assertTokens("1234.55"+unit, [[DriveCSS.token[key], "1234.55"+unit]]);
	    assertTokens("-1234.55"+unit, ['-', [DriveCSS.token[key], "1234.55"+unit]]);
	    assertTokens("+1234.55"+unit, ['+', [DriveCSS.token[key], "1234.55"+unit]]);
	})})(key, unit));
    }
}

test("url()", function(){
    assertTokens("url(http://example.com)", [[DriveCSS.token.URI, "url(http://example.com)"]]);
    assertTokens("url('http://example.com')", [[DriveCSS.token.URI, "url('http://example.com')"]]);
    assertTokens('url("http://example.com")', [[DriveCSS.token.URI, 'url("http://example.com")']]);
});

test("string", function(){
    assertTokens("'test test'", [[DriveCSS.token.STRING, "'test test'"]]);
    assertTokens("\"test test\"", [[DriveCSS.token.STRING, "\"test test\""]]);
    assertTokens("\"test ' test\"", [[DriveCSS.token.STRING, "\"test ' test\""]]);
    assertTokens("'test \" test'", [[DriveCSS.token.STRING, "'test \" test'"]]);
    assertTokens("'test \\\n test'", [[DriveCSS.token.STRING, "'test \\\n test'"]]);
    assertTokens("'ユニコード'", [[DriveCSS.token.STRING, "'ユニコード'"]]);
});

test("not() or not", function(){
    assertTokens("not()", [DriveCSS.token.NOTFUNCTION, ')']);
    assertTokens("not(ident)", [DriveCSS.token.NOTFUNCTION, [DriveCSS.token.IDENT, "ident"], ')']);
    assertTokens("@media not;", [DriveCSS.token.SYM, DriveCSS.token.MEDIA_NOT, ';']);
    assertTokens("not", [DriveCSS.token.IDENT]);
    assertTokens("a { not }", [[DriveCSS.token.IDENT, 'a'], '{', [DriveCSS.token.IDENT, 'not'], '}']);
});

test("}", function(){
    assertTokens("}", ['}']);
    assertTokens("{ }", ['{', '}']);
    assertTokens("{ } }", ['{', '}', '}']);
    assertTokens("@media { }", [DriveCSS.token.SYM, '{', DriveCSS.token.MEDIAQUERY_END]);
});

test("id and hex", function(){
    assertTokens("#aaa", [[DriveCSS.token.HEX, '#aaa']]);
    assertTokens("#aaaa", [[DriveCSS.token.IDSEL, '#aaaa']]);
    assertTokens("#aaaaaa", [[DriveCSS.token.HEX, '#aaaaaa']]);
    assertTokens("#BBBBBB", [[DriveCSS.token.HEX, '#BBBBBB']]);
    assertTokens("#zzz", [[DriveCSS.token.IDSEL, '#zzz']]);
    assertTokens("#test", [[DriveCSS.token.IDSEL, '#test']]);
    assertTokens("#foo-bar", [[DriveCSS.token.IDSEL, '#foo-bar']]);
    assertTokens("#-foo-bar", [[DriveCSS.token.IDSEL, '#-foo-bar']]);
});

