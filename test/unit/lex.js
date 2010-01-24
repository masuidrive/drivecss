module("lex");

test('CSSLexer', function() {
    equals(typeof(YAECSS), "object", "Exists YAECSS namescape");
    equals(typeof(YAECSS.CSSLexer), "function", "Exists YAECSS.CSSLexer class");
});

function parse(str){
    lexer = new YAECSS.CSSLexer(str);
    tokens = [];
    while(token = lexer.next()) {
	tokens.push(token);
    }
    return tokens;
}

function testTokens(str, tokens, values){
    test('Parse "'+str+'"', function() {
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
    });
}

testTokens("", []);
testTokens(" ", []);
testTokens("\n", []);
testTokens("<!-- -->", [YAECSS.token.CDO, YAECSS.token.CDC]);
testTokens(" <!-- -->  ", [YAECSS.token.CDO, YAECSS.token.CDC]);
testTokens("1234", [[YAECSS.token.INTEGER, "1234"]]);
testTokens("-1234", ['-', [YAECSS.token.INTEGER, "1234"]]);
testTokens("+1234", ['+', [YAECSS.token.INTEGER, "1234"]]);
testTokens("1234.55", [[YAECSS.token.FLOATTOKEN, "1234.55"]]);
testTokens("-1234.55", ['-', [YAECSS.token.FLOATTOKEN, "1234.55"]]);
testTokens("+1234.55", ['+', [YAECSS.token.FLOATTOKEN, "1234.55"]]);
