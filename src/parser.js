/***
   CSS parser
   Yuichiro MASUI a.k.a. masuidrive <masui@masuidrive.jp>
   http://github.com/masuidrive/drivecss/
*/

var DriveCSS;
DriveCSS = DriveCSS || {};
DriveCSS.token = {};
DriveCSS.token.YYERRTOK = 256;
DriveCSS.token.UNIMPORTANT_TOK = 257;
DriveCSS.token.WHITESPACE = 258;
DriveCSS.token.CDO = 259;
DriveCSS.token.CDC = 260;
DriveCSS.token.INCLUDES = 261;
DriveCSS.token.DASHMATCH = 262;
DriveCSS.token.BEGINSWITH = 263;
DriveCSS.token.ENDSWITH = 264;
DriveCSS.token.CONTAINS = 265;
DriveCSS.token.QUERY_NOT = 266;
DriveCSS.token.QUERY_ONLY = 267;
DriveCSS.token.QUERY_AND = 268;
DriveCSS.token.STRING = 269;
DriveCSS.token.IDENT = 270;
DriveCSS.token.NTH = 271;
DriveCSS.token.HEX = 272;
DriveCSS.token.IDSEL = 273;
DriveCSS.token.SYM = 274;
DriveCSS.token.IMPORTANT_SYM = 275;
DriveCSS.token.EMS = 276;
DriveCSS.token.EXS = 277;
DriveCSS.token.LENGTH = 278;
DriveCSS.token.ANGLE = 279;
DriveCSS.token.TIME = 280;
DriveCSS.token.FREQ = 281;
DriveCSS.token.DIMENSION = 282;
DriveCSS.token.PERCENTAGE = 283;
DriveCSS.token.INTEGER = 284;
DriveCSS.token.FLOATTOKEN = 285;
DriveCSS.token.NOTFUNCTION = 286;
DriveCSS.token.URI = 287;
DriveCSS.token.FUNCTION = 288;
DriveCSS.token.UNICODERANGE = 289;
DriveCSS.token.QUERY_END = 290;
DriveCSS.token.ALSO = 291;

DriveCSS.CSSParser = function(lexer) {
    this.lexer = lexer;
};

(function() {
    var yytranslate = [
	    0,   47,   47,   47,   47,   47,   47,   47,   47,   47,
	   47,   47,   47,   47,   47,   47,   47,   47,   47,   47,
	   47,   47,   47,   47,   47,   47,   47,   47,   47,   47,
	   47,   47,   47,   47,   47,   47,   47,   47,   47,   47,
	   47,   46,   32,   30,   41,   31,   36,   33,   47,   47,
	   47,   47,   47,   47,   47,   47,   47,   47,   35,   38,
	   47,   45,   43,   47,   47,   47,   47,   47,   47,   47,
	   47,   47,   47,   47,   47,   47,   47,   47,   47,   47,
	   47,   47,   47,   47,   47,   47,   47,   47,   47,   47,
	   47,   37,   47,   44,   47,   47,   47,   47,   47,   47,
	   47,   47,   47,   47,   47,   47,   47,   47,   47,   47,
	   47,   47,   47,   47,   47,   47,   47,   47,   47,   47,
	   47,   47,   47,   39,   34,   40,   42,   47,   47,   47,
	   47,   47,   47,   47,   47,   47,   47,   47,   47,   47,
	   47,   47,   47,   47,   47,   47,   47,   47,   47,   47,
	   47,   47,   47,   47,   47,   47,   47,   47,   47,   47,
	   47,   47,   47,   47,   47,   47,   47,   47,   47,   47,
	   47,   47,   47,   47,   47,   47,   47,   47,   47,   47,
	   47,   47,   47,   47,   47,   47,   47,   47,   47,   47,
	   47,   47,   47,   47,   47,   47,   47,   47,   47,   47,
	   47,   47,   47,   47,   47,   47,   47,   47,   47,   47,
	   47,   47,   47,   47,   47,   47,   47,   47,   47,   47,
	   47,   47,   47,   47,   47,   47,   47,   47,   47,   47,
	   47,   47,   47,   47,   47,   47,   47,   47,   47,   47,
	   47,   47,   47,   47,   47,   47,   47,   47,   47,   47,
	   47,   47,   47,   47,   47,   47,    1,   47,   47,    2,
	    3,    4,    5,    6,    7,    8,    9,   10,   11,   12,
	   13,   47,   14,   15,   16,   17,   18,   19,   20,   21,
	   22,   23,   47,   24,   25,   26,   27,   28,   29,   47,
	   47,   47
    ];
    
    var YYBADCH = 47;
    var YYMAXLEX = 292;
    var YYTERMS = 47;
    var YYNONTERMS = 39;
    
    var yyaction = [
	  149,   40,   89,   33,  155,  157,  159,  161,  163,  165,
	  167,  151,  153,   88,  171,    2,  146,  145,    0,  156,
	  158,  160,  162,  164,  166,  168,  152,  154,   44,  112,
	  111,  123,  124,  125,  126,  127,  140,   79,   80,   81,
	   47,   48,  130,  107,   51,   71,   72,   45,    1,    5,
	   22,   46,   24,    1,-32766,  131,    3,  -74,    4,  -74,
	  169,  170,  108,   52,   50,  104,  104,   38,   95,  141,
	    8,  104,  122,-32766,   39,  117,   10,  142,  129,  128,
	   96,   97,  116,  144,  105,  106,  104,   75,  119,  118,
	  120,  137,  136,  150,   63,  -14,  -18,    0,   77,   90,
	   76,   85,    0,    0,    0,    0,    0,  121,    0,    0,
	  133,  132
    ];
    
    var YYLAST = 112;
    
    var yycheck = [
	   14,   39,   13,   41,   18,   19,   20,   21,   22,   23,
	   24,   25,   26,   24,   28,   29,   30,   31,    0,   18,
	   19,   20,   21,   22,   23,   24,   25,   26,   13,   14,
	   15,    4,    5,    6,    7,    8,   17,    9,   10,   11,
	   12,   13,   13,   13,   13,    2,    3,   32,   16,   35,
	   35,   36,   37,   16,   13,   13,   27,   38,   29,   40,
	   12,   13,   32,   32,   35,   34,   34,   39,   30,   33,
	   38,   34,   45,   32,   39,   13,   41,   41,   12,   13,
	   42,   43,   13,   13,   34,   34,   34,   38,   44,   44,
	   44,   38,   38,   46,   39,   39,   39,   -1,   40,   40,
	   40,   40,   -1,   -1,   -1,   -1,   -1,   44,   -1,   -1,
	   46,   46
    ];
    
    var yybase = [
	    0,   28,   48,   48,   48,   48,   48,   32,   37,    1,
	   52,   52,   30,   45,   46,   41,   41,   41,   41,   41,
	   41,   19,   29,   58,   31,   38,   49,   47,   64,   65,
	   38,   66,   66,  -11,   35,   43,   43,  -38,   70,   70,
	   70,   70,   62,   18,   51,   50,   69,   57,   56,   55,
	   42,   51,   50,   60,   54,   14,   59,   53,   44,   63,
	   61,    0,    0,    0,    0,  -14,  -14,  -14,  -14,  -14,
	  -14,   15,   15,    0,   15,   15,   15,   27,   27,   15,
	   15,   15,   15,   15,   15,   36,    0,  -11,    0,    0,
	   36,   36,   36,   36
    ];
    
    var YY2TBLSTATE = 30;
    
    var yydefault = [
	    3,32767,32767,32767,32767,32767,32767,    2,32767,32767,
	32767,32767,32767,32767,32767,   34,   37,   36,   35,   39,
	   38,   79,32767,32767,32767,   27,   79,   79,   79,   79,
	   28,32767,32767,32767,32767,    4,    5,32767,32767,32767,
	32767,   71,32767,32767,   43,   44,32767,  105,  106,32767,
	32767,   53,32767,32767,   70,32767,32767,32767,32767,32767,
	32767,    6,    6,   19
    ];
    
    var yygoto = [
	   27,   28,   29,   21,  110,  110,  110,  110,   19,   56,
	   60,   18,   20,  148,   62,   30,   16,   32,   42,   94,
	   59,   57,   87,   14,   36
    ];
    
    var YYGLAST = 25;
    
    var yygcheck = [
	    8,    8,    8,    8,   22,   22,   22,   22,   20,    9,
	    9,   20,   20,   35,    4,   16,   19,   27,   21,   17,
	   28,   29,   14,   26,    5
    ];
    
    var yygbase = [
	    0,    0,    0,    0,    6,  -38,    0,    0,   -2,  -30,
	    0,    0,    0,    0,  -11,    0,    5,    8,    0,    4,
	   -4,   -6,  -13,    0,    0,    0,  -19,    3,  -12,  -20,
	    0,    0,    0,    0,    0,    7,    0,    0,    0
    ];
    
    var yygdefault = [
	-32768,   43,   65,    7,   61,   35,   73,   74,   26,   53,
	   49,   23,   84,   37,   86,   34,   25,   93,   11,   15,
	   17,   12,  109,  113,  114,  115,   13,   31,   58,   54,
	   41,   55,  139,    6,    9,  147,  172,  173,-32768
    ];
    
    var yylhs = [
	    0,    1,    2,    3,    3,    3,    5,    5,    5,    4,
	    4,    7,    7,    7,   10,   10,   10,   10,   10,   11,
	   11,   12,   13,   13,   14,   14,    6,   15,   15,   16,
	   16,   18,   18,   18,   17,   17,   17,   17,   17,   17,
	   21,   21,   21,   19,   19,   20,   20,   22,   22,   22,
	   22,   22,   23,   26,   24,   24,   24,   24,   27,   27,
	   27,   27,   27,   27,   28,   28,   25,   25,   25,   25,
	    9,    9,   30,   30,   29,   29,   32,   33,   33,   33,
	   31,   34,   34,    8,    8,   36,   37,   35,   35,   35,
	   35,   35,   35,   35,   35,   35,   35,   35,   35,   35,
	   35,   35,   35,   35,   35,   35,   35,   35,   35,   35,
	   38,   38
    ];

    var yylen = [
	    1,    1,    1,    0,    3,    4,    0,    2,    2,    1,
	    1,    3,    4,    5,    1,    1,    1,    1,    1,    0,
	    2,    4,    1,    3,    1,    1,    4,    1,    3,    1,
	    3,    1,    1,    1,    1,    2,    1,    2,    3,    2,
	    1,    2,    2,    1,    1,    1,    2,    1,    1,    1,
	    1,    1,    2,    1,    3,    5,    4,    6,    1,    1,
	    1,    1,    1,    1,    1,    1,    2,    3,    4,    4,
	    1,    1,    2,    3,    3,    4,    1,    1,    1,    0,
	    1,    1,    1,    1,    3,    1,    3,    1,    2,    1,
	    2,    1,    2,    1,    2,    1,    2,    1,    2,    1,
	    2,    1,    2,    1,    2,    1,    1,    1,    1,    1,
	    0,    1
    ];
    
    var YYSTATES = 153;
    var YYNLSTATES = 64;
    var YYINTERRTOK = 1;
    var YYUNEXPECTED = 32767;
    var YYDEFAULT = -32766;
    
    DriveCSS.CSSParser.prototype = {
	/** lexical element object **/
	token: null,
	lexer: null,

	parse: function() {
	    var yyastk = new Array();
	    var yysstk = new Array();
	    
	    yystate = 0;
	    yychar = -1;
	    
	    yysp = 0;
	    yysstk[yysp] = 0;
	    yyerrflag = 0;
	    for (;;) {
		if (yybase[yystate] == 0)
		    yyn = yydefault[yystate];
		else {
		    if (yychar < 0) {
		        this.token = this.lexer.next();
			if (this.token) {
			    yychar = this.token.id < YYMAXLEX ? yytranslate[this.token.id] : YYBADCH;
			}
			else {
			    yychar = 0;
			}
			// if ((yychar = this.lexer.next()) <= 0) yychar = 0;
			// yychar = yychar < YYMAXLEX ? yytranslate[yychar] : YYBADCH;
		    }
		    
		    if (((yyn = yybase[yystate] + yychar) >= 0
			 && yyn < YYLAST && yycheck[yyn] == yychar
			 || (yystate < YY2TBLSTATE
			     && (yyn = yybase[yystate + YYNLSTATES] + yychar) >= 0
			     && yyn < YYLAST && yycheck[yyn] == yychar))
			&& (yyn = yyaction[yyn]) != YYDEFAULT) {
			/*
                         * >= YYNLSTATE: shift and reduce
                         * > 0: shift
                         * = 0: accept
                         * < 0: reduce
                         * = -YYUNEXPECTED: error
                         */
			if (yyn > 0) {
			    /* shift */
			    yysp++;
			    
			    yysstk[yysp] = yystate = yyn;
			    yyastk[yysp] = this.token.value;
			    yychar = -1;
			    
			    if (yyerrflag > 0)
				yyerrflag--;
			    if (yyn < YYNLSTATES)
				continue;
			    
			    /* yyn >= YYNLSTATES means shift-and-reduce */
			    yyn -= YYNLSTATES;
			} else
			    yyn = -yyn;
		    } else
			yyn = yydefault[yystate];
		}
		
		for (;;) {
		    /* reduce/error */
		    if (yyn == 0) {
			/* accept */
			return 0;
		    }
		    else if (yyn != YYUNEXPECTED) {
			/* reduce */
			yyl = yylen[yyn];
			yyval = yyastk[yysp-yyl+1];
			/* Following line will be replaced by reduce actions */
			switch(yyn) {
			case 1:
			    { this.tree = yyastk[yysp-(1-1)]; } break;
			case 3:
			    { yyval = []; } break;
			case 4:
			    { yyastk[yysp-(3-1)].push(yyastk[yysp-(3-2)]); yyval = yyastk[yysp-(3-1)]; } break;
			case 5:
			    { yyastk[yysp-(4-1)].push(yyastk[yysp-(4-3)]); yyval = yyastk[yysp-(4-1)]; } break;
			case 11:
			    { yyval = new DriveCSS.Node("symbol", yyastk[yysp-(3-1)], yyastk[yysp-(3-2)]); } break;
			case 12:
			    { yyval = new DriveCSS.Node("symbol", yyastk[yysp-(4-1)], yyastk[yysp-(4-2)]); } break;
			case 13:
			    { yyval = new DriveCSS.Node("symbol", yyastk[yysp-(5-1)], yyastk[yysp-(5-2)], yyastk[yysp-(5-3)]); } break;
			case 19:
			    { yyval = new DriveCSS.Node("keyframes_rule"); } break;
			case 20:
			    { yyval = yyastk[yysp-(2-1)].add(yyastk[yysp-(2-2)]); } break;
			case 21:
			    { yyval = new DriveCSS.Node("keyframe_rule", yyastk[yysp-(4-1)], yyastk[yysp-(4-3)]); } break;
			case 22:
			    { yyval = new DriveCSS.Node("key_list", yyastk[yysp-(1-1)]); } break;
			case 23:
			    { yyval = yyastk[yysp-(3-1)].add(yyastk[yysp-(3-3)]); } break;
			case 26:
			    { yyval = new DriveCSS.Node('ruleset', yyastk[yysp-(4-1)], yyastk[yysp-(4-3)]); } break;
			case 27:
			    { yyval = new DriveCSS.Node("selector_list", yyastk[yysp-(1-1)]); } break;
			case 28:
			    { yyval = yyastk[yysp-(3-1)].add(yyastk[yysp-(3-3)]); } break;
			case 29:
			    { yyval = yyastk[yysp-(1-1)]; } break;
			case 30:
			    { yyval = yyastk[yysp-(3-1)] + " " + yyastk[yysp-(3-2)] + " " + yyastk[yysp-(3-3)]; } break;
			case 70:
			    { yyval = new DriveCSS.Node("declaration_list", yyastk[yysp-(1-1)]); } break;
			case 72:
			    { yyval = new DriveCSS.Node("declaration_list", yyastk[yysp-(2-1)]); } break;
			case 73:
			    { yyval = yyastk[yysp-(3-1)].add(yyastk[yysp-(3-2)]); } break;
			case 74:
			    { yyval =  new DriveCSS.Node(yyastk[yysp-(3-2)], yyastk[yysp-(3-1)], yyastk[yysp-(3-3)]); } break;
			case 75:
			    { yyval =  new DriveCSS.Node(yyastk[yysp-(4-2)], yyastk[yysp-(4-1)], yyastk[yysp-(4-3)]+" "+yyastk[yysp-(4-4)]); } break;
			case 83:
			    { yyval = new DriveCSS.Node('expr', yyastk[yysp-(1-1)]); } break;
			case 84:
			    { yyval = yyastk[yysp-(3-2)] ? new DriveCSS.Node(yyastk[yysp-(3-2)], yyastk[yysp-(3-1)], yyastk[yysp-(3-3)]) : yyastk[yysp-(3-1)].add(yyastk[yysp-(3-3)]); } break;
			case 86:
			    { yyval = new DriveCSS.Node("function", yyastk[yysp-(3-1)], yyastk[yysp-(3-2)]); } break;
			case 87:
			    { yyval = new DriveCSS.Node("number", parseInt(yyastk[yysp-(1-1)])); } break;
			case 88:
			    { yyval = new DriveCSS.Node("number", parseInt(yyastk[yysp-(2-1)]+yyastk[yysp-(2-2)])); } break;
			case 89:
			    { yyval = new DriveCSS.Node("number", parseFloat(yyastk[yysp-(1-1)])); } break;
			case 90:
			    { yyval = new DriveCSS.Node("number", parseFlaot(yyastk[yysp-(2-1)]+yyastk[yysp-(2-2)])); } break;
			case 91:
			    { yyval = new DriveCSS.Node("ems", yyastk[yysp-(1-1)]); } break;
			case 92:
			    { yyval = new DriveCSS.Node("ems", yyastk[yysp-(2-1)]+yyastk[yysp-(2-2)]); } break;
			case 93:
			    { yyval = new DriveCSS.Node("exs", yyastk[yysp-(1-1)]); } break;
			case 94:
			    { yyval = new DriveCSS.Node("exs", yyastk[yysp-(2-1)]+yyastk[yysp-(2-2)]); } break;
			case 95:
			    { yyval = new DriveCSS.Node("length", yyastk[yysp-(1-1)]); } break;
			case 96:
			    { yyval = new DriveCSS.Node("length", yyastk[yysp-(2-1)]+yyastk[yysp-(2-2)]); } break;
			case 97:
			    { yyval = new DriveCSS.Node("angle", yyastk[yysp-(1-1)]); } break;
			case 98:
			    { yyval = new DriveCSS.Node("angle", yyastk[yysp-(2-1)]+yyastk[yysp-(2-2)]); } break;
			case 99:
			    { yyval = new DriveCSS.Node("time", yyastk[yysp-(1-1)]); } break;
			case 100:
			    { yyval = new DriveCSS.Node("time", yyastk[yysp-(2-1)]+yyastk[yysp-(2-2)]); } break;
			case 101:
			    { yyval = new DriveCSS.Node("freq", yyastk[yysp-(1-1)]); } break;
			case 102:
			    { yyval = new DriveCSS.Node("freq", yyastk[yysp-(2-1)]+yyastk[yysp-(2-2)]); } break;
			case 103:
			    { yyval = new DriveCSS.Node("percentage", yyastk[yysp-(1-1)]); } break;
			case 104:
			    { yyval = new DriveCSS.Node("percentage", yyastk[yysp-(2-1)]+yyastk[yysp-(2-2)]); } break;
			case 105:
			    { yyval = new DriveCSS.Node("string", yyastk[yysp-(1-1)]); } break;
			case 106:
			    { yyval = new DriveCSS.Node("ident", yyastk[yysp-(1-1)]); } break;
			case 107:
			    { yyval = new DriveCSS.Node("uri", yyastk[yysp-(1-1)]); } break;
			case 108:
			    { yyval = new DriveCSS.Node("hexcolor", yyastk[yysp-(1-1)]); } break;
			case 109:
			    { yyval = new DriveCSS.Node("function", yyastk[yysp-(1-1)]); } break;
			}
			/* Goto - shift nonterminal */
			yysp -= yyl;
			yyn = yylhs[yyn];
			if ((yyp = yygbase[yyn] + yysstk[yysp]) >= 0 && yyp < YYGLAST
			    && yygcheck[yyp] == yyn)
			    yystate = yygoto[yyp];
			else
			    yystate = yygdefault[yyn];
			
			yysp++;
			
			yysstk[yysp] = yystate;
			yyastk[yysp] = yyval;
		    }
		    else {
			/* error */
			switch (yyerrflag) {
			case 0:
			    yyerror("syntax error");
			case 1:
			case 2:
			    yyerrflag = 3;
			    /* Pop until error-expecting state uncovered */
			    
			    while (!((yyn = yybase[yystate] + YYINTERRTOK) >= 0
				     && yyn < YYLAST && yycheck[yyn] == YYINTERRTOK
				     || (yystate < YY2TBLSTATE
					 && (yyn = yybase[yystate + YYNLSTATES] + YYINTERRTOK) >= 0
					 && yyn < YYLAST && yycheck[yyn] == YYINTERRTOK))) {
				if (yysp <= 0) {
				    return 1;
				}
				yystate = yysstk[--yysp];
			    }
			    yyn = yyaction[yyn];
			    yysstk[++yysp] = yystate = yyn;
			    break;
			    
			case 3:
			    if (yychar == 0) {
				return 1;
			    }
			    yychar = -1;
			    break;
			}
		    }
		    
		    if (yystate < YYNLSTATES)
			break;
		    /* >= YYNLSTATES means shift-and-reduce */
		    yyn = yystate - YYNLSTATES;
		}
	    }
	}
    }
})();

/* End of parser */
