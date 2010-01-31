
var DriveCSS;
DriveCSS = DriveCSS || {};
DriveCSS.token = {};
DriveCSS.token.YYERRTOK = 256;
DriveCSS.token.UNIMPORTANT_TOK = 257;
DriveCSS.token.CDO = 258;
DriveCSS.token.CDC = 259;
DriveCSS.token.INCLUDES = 260;
DriveCSS.token.DASHMATCH = 261;
DriveCSS.token.BEGINSWITH = 262;
DriveCSS.token.ENDSWITH = 263;
DriveCSS.token.CONTAINS = 264;
DriveCSS.token.QUERY_NOT = 265;
DriveCSS.token.QUERY_ONLY = 266;
DriveCSS.token.QUERY_AND = 267;
DriveCSS.token.STRING = 268;
DriveCSS.token.INVALID = 269;
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
	    0,   44,   44,   44,   44,   44,   44,   44,   44,   44,
	   44,   44,   44,   44,   44,   44,   44,   44,   44,   44,
	   44,   44,   44,   44,   44,   44,   44,   44,   44,   44,
	   44,   44,   44,   44,   44,   44,   44,   44,   44,   44,
	   44,   41,   29,   27,   38,   28,   33,   30,   44,   44,
	   44,   44,   44,   44,   44,   44,   44,   44,   32,   35,
	   44,   40,   43,   44,   44,   44,   44,   44,   44,   44,
	   44,   44,   44,   44,   44,   44,   44,   44,   44,   44,
	   44,   44,   44,   44,   44,   44,   44,   44,   44,   44,
	   44,   34,   44,   39,   44,   44,   44,   44,   44,   44,
	   44,   44,   44,   44,   44,   44,   44,   44,   44,   44,
	   44,   44,   44,   44,   44,   44,   44,   44,   44,   44,
	   44,   44,   44,   36,   31,   37,   42,   44,   44,   44,
	   44,   44,   44,   44,   44,   44,   44,   44,   44,   44,
	   44,   44,   44,   44,   44,   44,   44,   44,   44,   44,
	   44,   44,   44,   44,   44,   44,   44,   44,   44,   44,
	   44,   44,   44,   44,   44,   44,   44,   44,   44,   44,
	   44,   44,   44,   44,   44,   44,   44,   44,   44,   44,
	   44,   44,   44,   44,   44,   44,   44,   44,   44,   44,
	   44,   44,   44,   44,   44,   44,   44,   44,   44,   44,
	   44,   44,   44,   44,   44,   44,   44,   44,   44,   44,
	   44,   44,   44,   44,   44,   44,   44,   44,   44,   44,
	   44,   44,   44,   44,   44,   44,   44,   44,   44,   44,
	   44,   44,   44,   44,   44,   44,   44,   44,   44,   44,
	   44,   44,   44,   44,   44,   44,   44,   44,   44,   44,
	   44,   44,   44,   44,   44,   44,    1,   44,    2,    3,
	    4,    5,    6,    7,    8,   44,   44,   44,    9,   44,
	   10,   44,   11,   12,   13,   14,   15,   16,   17,   18,
	   19,   20,   44,   21,   22,   23,   24,   25,   26,   44,
	   44,   44
    ];
    
    var YYBADCH = 44;
    var YYMAXLEX = 292;
    var YYTERMS = 44;
    var YYNONTERMS = 38;
    
    var yyaction = [
	  146,   40,   86,   33,  152,  154,  156,  158,  160,  162,
	  164,  148,  150,   85,  168,    2,  140,  139,  153,  155,
	  157,  159,  161,  163,  165,  149,  151,   44,  106,  105,
	  117,  118,  119,  120,  121,  134,   47,   48,  124,  135,
	   39,    0,   10,    1,    1,-32766,   45,  136,   51,   22,
	   46,   24,    3,  101,    4,  125,  -68,  138,  -68,  141,
	   50,   98,   98,   38,-32766,    8,  116,   52,  111,   98,
	   71,   72,  102,  110,  142,  143,  166,  167,  123,  122,
	   99,  100,   98,  130,    5,  113,    0,    0,   75,  131,
	    0,  -14,  -15,   63,    0,    0,   82,   77,   76,   87,
	    0,    0,    0,  112,  114,  115,    0,    0,    0,    0,
	    0,  126,  147,  127
    ];
    
    var YYLAST = 114;
    
    var yycheck = [
	   11,   36,   10,   38,   15,   16,   17,   18,   19,   20,
	   21,   22,   23,   21,   25,   26,   27,   28,   15,   16,
	   17,   18,   19,   20,   21,   22,   23,   10,   11,   12,
	    4,    5,    6,    7,    8,   14,    9,   10,   10,   30,
	   36,    0,   38,   13,   13,   10,   29,   38,   10,   32,
	   33,   34,   24,   10,   26,   10,   35,   10,   37,   27,
	   32,   31,   31,   36,   29,   35,   40,   29,   10,   31,
	    2,    3,   29,   10,   42,   43,    9,   10,    9,   10,
	   31,   31,   31,   35,   32,   39,   -1,   -1,   35,   35,
	   -1,   36,   36,   36,   -1,   -1,   37,   37,   37,   37,
	   -1,   -1,   -1,   39,   39,   39,   -1,   -1,   -1,   -1,
	   -1,   41,   41,   41
    ];
    
    var yybase = [
	    0,   27,   67,   67,   67,   67,   67,   30,   31,    3,
	   51,   51,   43,   64,   65,   35,   35,   35,   35,   35,
	   35,   21,   28,   60,   38,   32,   53,   71,   72,   70,
	   32,   69,   69,   -8,    4,   68,   68,  -35,   47,   47,
	   47,   47,   58,   41,   50,   49,   63,   56,   55,   57,
	   45,   50,   49,   61,   48,   52,   62,   54,   46,   66,
	   59,    0,    0,    0,    0,  -11,  -11,  -11,  -11,  -11,
	  -11,   17,   17,    0,   17,   17,   17,   26,   26,   17,
	   17,   17,   17,   17,   17,    9,    0,   -8,    0,    0,
	    9,    9,    9,    9
    ];
    
    var YY2TBLSTATE = 30;
    
    var yydefault = [
	    3,32767,32767,32767,32767,32767,32767,    2,32767,32767,
	32767,32767,32767,32767,32767,   28,   31,   30,   29,   33,
	   32,   73,32767,32767,32767,   24,   73,   73,   73,   73,
	   25,32767,32767,32767,32767,    4,    5,32767,32767,32767,
	32767,   65,32767,32767,   37,   38,32767,  102,  103,32767,
	32767,   47,32767,32767,   64,32767,32767,32767,32767,32767,
	32767,    6,    6,   16
    ];
    
    var yygoto = [
	   27,   28,   29,   21,  104,  104,  104,  104,   19,   56,
	   60,   18,   20,  145,   62,   30,   16,   32,   42,   91,
	   59,   57,   84,   14,   36
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
	    0,    0,    0,    0,    0,    7,    0,    0
    ];
    
    var yygdefault = [
	-32768,   43,   65,    7,   61,   35,   73,   74,   26,   53,
	   49,   23,   81,   37,   83,   34,   25,   90,   11,   15,
	   17,   12,  103,  107,  108,  109,   13,   31,   58,   54,
	   41,   55,  133,    6,    9,  144,  169,  170
    ];
    
    var yylhs = [
	    0,    1,    2,    3,    3,    3,    5,    5,    5,    4,
	    4,    7,    7,    7,   10,   10,   11,   11,   12,   13,
	   13,   14,   14,    6,   15,   15,   16,   16,   17,   17,
	   17,   17,   17,   17,   21,   21,   21,   19,   19,   20,
	   20,   22,   22,   22,   22,   22,   23,   26,   24,   24,
	   24,   24,   27,   27,   27,   27,   27,   27,   28,   28,
	   25,   25,   25,   25,    9,    9,   30,   30,   29,   29,
	   32,   33,   33,   33,   31,   34,   34,   18,   18,   18,
	    8,    8,   36,   37,   35,   35,   35,   35,   35,   35,
	   35,   35,   35,   35,   35,   35,   35,   35,   35,   35,
	   35,   35,   35,   35,   35,   35,   35
    ];

    var yylen = [
	    1,    1,    1,    0,    3,    4,    0,    2,    2,    1,
	    1,    3,    4,    5,    1,    1,    0,    2,    4,    1,
	    3,    1,    1,    4,    1,    3,    1,    3,    1,    2,
	    1,    2,    3,    2,    1,    2,    2,    1,    1,    1,
	    2,    1,    1,    1,    1,    1,    2,    1,    3,    5,
	    4,    6,    1,    1,    1,    1,    1,    1,    1,    1,
	    2,    3,    4,    4,    1,    1,    2,    3,    3,    4,
	    1,    1,    1,    0,    1,    1,    1,    1,    1,    1,
	    1,    3,    1,    3,    1,    2,    1,    2,    1,    2,
	    1,    2,    1,    2,    1,    2,    1,    2,    1,    2,
	    1,    2,    1,    1,    1,    1,    1
    ];
    
    var YYSTATES = 150;
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
			case 16:
			    { yyval = new DriveCSS.Node("keyframes_rule"); } break;
			case 17:
			    { yyval = yyastk[yysp-(2-1)].add(yyastk[yysp-(2-2)]); } break;
			case 18:
			    { yyval = new DriveCSS.Node("keyframe_rule", yyastk[yysp-(4-1)], yyastk[yysp-(4-3)]); } break;
			case 19:
			    { yyval = new DriveCSS.Node("key_list", yyastk[yysp-(1-1)]); } break;
			case 20:
			    { yyval = yyastk[yysp-(3-1)].add(yyastk[yysp-(3-3)]); } break;
			case 23:
			    { yyval = new DriveCSS.Node('selector', yyastk[yysp-(4-1)], yyastk[yysp-(4-3)]); } break;
			case 24:
			    { yyval = new DriveCSS.Node("selector_list", yyastk[yysp-(1-1)]); } break;
			case 25:
			    { yyval = yyastk[yysp-(3-1)].add(yyastk[yysp-(3-3)]); } break;
			case 26:
			    { yyval = yyastk[yysp-(1-1)]; } break;
			case 27:
			    { yyval = yyastk[yysp-(3-1)] + " " + yyastk[yysp-(3-2)] + " " + yyastk[yysp-(3-3)]; } break;
			case 64:
			    { yyval = new DriveCSS.Node("declaration_list", yyastk[yysp-(1-1)]); } break;
			case 66:
			    { yyval = new DriveCSS.Node("declaration_list", yyastk[yysp-(2-1)]); } break;
			case 67:
			    { yyval = yyastk[yysp-(3-1)].add(yyastk[yysp-(3-2)]); } break;
			case 68:
			    { yyval =  new DriveCSS.Node(yyastk[yysp-(3-2)], yyastk[yysp-(3-1)], yyastk[yysp-(3-3)]); } break;
			case 69:
			    { yyval =  new DriveCSS.Node(yyastk[yysp-(4-2)], yyastk[yysp-(4-1)], yyastk[yysp-(4-3)]+" "+yyastk[yysp-(4-4)]); } break;
			case 80:
			    { yyval = new DriveCSS.Node('expr', yyastk[yysp-(1-1)]); } break;
			case 81:
			    { yyval = yyastk[yysp-(3-2)] ? new DriveCSS.Node(yyastk[yysp-(3-2)], yyastk[yysp-(3-1)], yyastk[yysp-(3-3)]) : yyastk[yysp-(3-1)].add(yyastk[yysp-(3-3)]); } break;
			case 83:
			    { yyval = new DriveCSS.Node("function", yyastk[yysp-(3-1)], yyastk[yysp-(3-2)]); } break;
			case 84:
			    { yyval = new DriveCSS.Node("number", parseInt(yyastk[yysp-(1-1)])); } break;
			case 85:
			    { yyval = new DriveCSS.Node("number", parseInt(yyastk[yysp-(2-1)]+yyastk[yysp-(2-2)])); } break;
			case 86:
			    { yyval = new DriveCSS.Node("number", parseFloat(yyastk[yysp-(1-1)])); } break;
			case 87:
			    { yyval = new DriveCSS.Node("number", parseFlaot(yyastk[yysp-(2-1)]+yyastk[yysp-(2-2)])); } break;
			case 88:
			    { yyval = new DriveCSS.Node("ems", yyastk[yysp-(1-1)]); } break;
			case 89:
			    { yyval = new DriveCSS.Node("ems", yyastk[yysp-(2-1)]+yyastk[yysp-(2-2)]); } break;
			case 90:
			    { yyval = new DriveCSS.Node("exs", yyastk[yysp-(1-1)]); } break;
			case 91:
			    { yyval = new DriveCSS.Node("exs", yyastk[yysp-(2-1)]+yyastk[yysp-(2-2)]); } break;
			case 92:
			    { yyval = new DriveCSS.Node("length", yyastk[yysp-(1-1)]); } break;
			case 93:
			    { yyval = new DriveCSS.Node("length", yyastk[yysp-(2-1)]+yyastk[yysp-(2-2)]); } break;
			case 94:
			    { yyval = new DriveCSS.Node("angle", yyastk[yysp-(1-1)]); } break;
			case 95:
			    { yyval = new DriveCSS.Node("angle", yyastk[yysp-(2-1)]+yyastk[yysp-(2-2)]); } break;
			case 96:
			    { yyval = new DriveCSS.Node("time", yyastk[yysp-(1-1)]); } break;
			case 97:
			    { yyval = new DriveCSS.Node("time", yyastk[yysp-(2-1)]+yyastk[yysp-(2-2)]); } break;
			case 98:
			    { yyval = new DriveCSS.Node("freq", yyastk[yysp-(1-1)]); } break;
			case 99:
			    { yyval = new DriveCSS.Node("freq", yyastk[yysp-(2-1)]+yyastk[yysp-(2-2)]); } break;
			case 100:
			    { yyval = new DriveCSS.Node("percentage", yyastk[yysp-(1-1)]); } break;
			case 101:
			    { yyval = new DriveCSS.Node("percentage", yyastk[yysp-(2-1)]+yyastk[yysp-(2-2)]); } break;
			case 102:
			    { yyval = new DriveCSS.Node("string", yyastk[yysp-(1-1)]); } break;
			case 103:
			    { yyval = new DriveCSS.Node("ident", yyastk[yysp-(1-1)]); } break;
			case 104:
			    { yyval = new DriveCSS.Node("uri", yyastk[yysp-(1-1)]); } break;
			case 105:
			    { yyval = new DriveCSS.Node("hexcolor", yyastk[yysp-(1-1)]); } break;
			case 106:
			    { yyval = yyastk[yysp-(1-1)].replace(/\(/,""); } break;
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
