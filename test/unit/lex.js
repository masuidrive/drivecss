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
	    if(parsed_tokens[i].id!==tokens[i][0] || parsed_tokens[i].value!==tokens[i][1]) matched = false;
	    label.push(tokens[i][0]+"("+tokens[i][1]+")");
	}
	else {
	    tid = tokens[i];
	    if(typeof(tid)=="string") tid = tid.charCodeAt(0);
	    if(parsed_tokens[i].id!==tid) matched = false;
	    label.push(tokens[i]);
	}
    }
    ok( matched, prefix+" tokens "+label );
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
	    var unit2 = unit.replace(/[ \t\r\n]+/, '');
	    assertTokens("1234"+unit, [[YAECSS.token[key], "1234"+unit2]]);
	    assertTokens("-1234"+unit, ['-', [YAECSS.token[key], "1234"+unit2]]);
	    assertTokens("+1234"+unit, ['+', [YAECSS.token[key], "1234"+unit2]]);
	    assertTokens("1234.55"+unit, [[YAECSS.token[key], "1234.55"+unit2]]);
	    assertTokens("-1234.55"+unit, ['-', [YAECSS.token[key], "1234.55"+unit2]]);
	    assertTokens("+1234.55"+unit, ['+', [YAECSS.token[key], "1234.55"+unit2]]);
	})})(key, unit));
    }
}

test("url()", function(){
    assertTokens("url(http://example.com)", [[YAECSS.token.URI, "url(http://example.com)"]]);
    assertTokens("url('http://example.com')", [[YAECSS.token.URI, "url('http://example.com')"]]);
    assertTokens('url("http://example.com")', [[YAECSS.token.URI, 'url("http://example.com")']]);
});
