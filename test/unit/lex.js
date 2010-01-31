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

test("function()", function(){
    assertTokens("foo()", [[DriveCSS.token.FUNCTION, "foo("],")"]);
    assertTokens("foo ()", [[DriveCSS.token.FUNCTION, "foo ("],")"]);
    assertTokens("foo_1()", [[DriveCSS.token.FUNCTION, "foo_1("],")"]);
    assertTokens("foo-1()", [[DriveCSS.token.FUNCTION, "foo-1("],")"]);
    assertTokens("foo_1()", [[DriveCSS.token.FUNCTION, "foo_1("],")"]);
    assertTokens("-foo()", [[DriveCSS.token.FUNCTION, "-foo("],")"]);
});

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
    assertTokens("@media not; not", [DriveCSS.token.SYM, DriveCSS.token.QUERY_NOT, ';', [DriveCSS.token.IDENT, "not"]]);
    assertTokens("@media not { not", [DriveCSS.token.SYM, DriveCSS.token.QUERY_NOT, '{', [DriveCSS.token.IDENT, "not"]]);
    assertTokens("not", [DriveCSS.token.IDENT]);
    assertTokens("a { not }", [[DriveCSS.token.IDENT, 'a'], '{', [DriveCSS.token.IDENT, 'not'], '}']);
});

test("@sym query", function(){
    assertTokens("}", ['}']);
    assertTokens("{ }", ['{', '}']);
    assertTokens("token { }", [[DriveCSS.token.IDENT,'token'], '{', '}']);
    assertTokens("@media screen {", [DriveCSS.token.SYM, [DriveCSS.token.IDENT, 'screen'],'{']);
    assertTokens("@media not { not", [DriveCSS.token.SYM, DriveCSS.token.QUERY_NOT, '{', [DriveCSS.token.IDENT, 'not']]);
    assertTokens("@media only { only", [DriveCSS.token.SYM, DriveCSS.token.QUERY_ONLY, '{', [DriveCSS.token.IDENT, 'only']]);
    assertTokens("@media and { and", [DriveCSS.token.SYM, DriveCSS.token.QUERY_AND, '{', [DriveCSS.token.IDENT, 'and']]);
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

test("!important", function(){
    assertTokens("!important", [DriveCSS.token.IMPORTANT_SYM]);
    assertTokens("!  important", [DriveCSS.token.IMPORTANT_SYM]);
    assertTokens("!\timportant", [DriveCSS.token.IMPORTANT_SYM]);
    assertTokens("!\nimportant", [DriveCSS.token.IMPORTANT_SYM]);
});

test("UNICODE range", function(){
    assertTokens("U+20A7", [[DriveCSS.token.UNICODERANGE, 'U+20A7']]);
    assertTokens("U+215?", [[DriveCSS.token.UNICODERANGE, 'U+215?']]);
    assertTokens("U+00??", [[DriveCSS.token.UNICODERANGE, 'U+00??']]);
    assertTokens("U+E??", [[DriveCSS.token.UNICODERANGE, 'U+E??']]);
    assertTokens("U+0020-007E", [[DriveCSS.token.UNICODERANGE, 'U+0020-007E']]);
});

test("@sym", function(){
    assertTokens("@sym", [[DriveCSS.token.SYM, '@sym']]);
    assertTokens("@sym-a", [[DriveCSS.token.SYM, '@sym-a']]);
    assertTokens("@sym_b", [[DriveCSS.token.SYM, '@sym_b']]);
});

test("nth", function(){
    assertTokens("0n+5", [[DriveCSS.token.NTH, '0n+5']]);
    assertTokens("2n+1", [[DriveCSS.token.NTH, '2n+1']]);
    assertTokens("2n+0", [[DriveCSS.token.NTH, '2n+0']]);
    assertTokens("10n-1", [[DriveCSS.token.NTH, '10n-1']]);
    assertTokens("10n+9", [[DriveCSS.token.NTH, '10n+9']]);
    assertTokens("10n+-1", [[DriveCSS.token.NTH, '10n+-1']]);
});

test("attr maniplate", function(){
    assertTokens('E[foo="bar"]', [[DriveCSS.token.IDENT, "E"], '[', [DriveCSS.token.IDENT, "foo"], '=', [DriveCSS.token.STRING, '"bar"'], ']']);
    assertTokens('E[foo~="bar"]', [[DriveCSS.token.IDENT, "E"], '[', [DriveCSS.token.IDENT, "foo"], DriveCSS.token.INCLUDES, [DriveCSS.token.STRING, '"bar"'], ']']);
    assertTokens('E[foo!="bar"]', [[DriveCSS.token.IDENT, "E"], '[', [DriveCSS.token.IDENT, "foo"], DriveCSS.token.DASHMATCH, [DriveCSS.token.STRING, '"bar"'], ']']);
    assertTokens('E[foo^="bar"]', [[DriveCSS.token.IDENT, "E"], '[', [DriveCSS.token.IDENT, "foo"], DriveCSS.token.BEGINSWITH, [DriveCSS.token.STRING, '"bar"'], ']']);
    assertTokens('E[foo$="bar"]', [[DriveCSS.token.IDENT, "E"], '[', [DriveCSS.token.IDENT, "foo"], DriveCSS.token.ENDSWITH, [DriveCSS.token.STRING, '"bar"'], ']']);
    assertTokens('E[foo*="bar"]', [[DriveCSS.token.IDENT, "E"], '[', [DriveCSS.token.IDENT, "foo"], DriveCSS.token.CONTAINS, [DriveCSS.token.STRING, '"bar"'], ']']);
});
