
var YAECSS;
YAECSS = YAECSS || {};
YAECSS.token = {};
YAECSS.token.YYERRTOK = 256;
YAECSS.token.UNIMPORTANT_TOK = 257;
YAECSS.token.CDO = 258;
YAECSS.token.CDC = 259;
YAECSS.token.INCLUDES = 260;
YAECSS.token.DASHMATCH = 261;
YAECSS.token.BEGINSWITH = 262;
YAECSS.token.ENDSWITH = 263;
YAECSS.token.CONTAINS = 264;
YAECSS.token.MEDIA_NOT = 265;
YAECSS.token.MEDIA_ONLY = 266;
YAECSS.token.MEDIA_AND = 267;
YAECSS.token.STRING = 268;
YAECSS.token.INVALID = 269;
YAECSS.token.IDENT = 270;
YAECSS.token.NTH = 271;
YAECSS.token.HEX = 272;
YAECSS.token.IDSEL = 273;
YAECSS.token.HASH = 274;
YAECSS.token.SYM = 275;
YAECSS.token.IMPORTANT_SYM = 276;
YAECSS.token.EMS = 277;
YAECSS.token.EXS = 278;
YAECSS.token.LENGTH = 279;
YAECSS.token.ANGLE = 280;
YAECSS.token.TIME = 281;
YAECSS.token.FREQ = 282;
YAECSS.token.DIMENSION = 283;
YAECSS.token.PERCENTAGE = 284;
YAECSS.token.INTEGER = 285;
YAECSS.token.FLOATTOKEN = 286;
YAECSS.token.NOTFUNCTION = 287;
YAECSS.token.URI = 288;
YAECSS.token.FUNCTION = 289;
YAECSS.token.UNICODERANGE = 290;
YAECSS.token.MEDIAQUERY_END = 291;
YAECSS.token.ALSO = 292;

YAECSS.CSSParser = function(lexer) {
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
	   19,   20,   21,   44,   22,   23,   44,   24,   25,   26,
	   44,   44,   44
    ];
    
    var YYBADCH = 44;
    var YYMAXLEX = 293;
    var YYTERMS = 44;
    var YYNONTERMS = 38;
    
    var yyaction = [
	  146,  135,    0,  150,  152,  154,  156,  158,  160,  136,
	  148,  125,  164,    2,  140,  139,   44,  106,  105,  151,
	  153,  155,  157,  159,  161,  134,  149,  117,  118,  119,
	  120,  121,  124,   47,   48,   45,   51,    5,   22,   46,
	   24,    1,-32766,  138,   86,  -68,    3,  -68,    4,    1,
	  101,   40,  141,   33,   50,   52,   85,   98,   98,  111,
	   38,-32766,    8,  116,   71,   72,   98,  142,  143,  102,
	  162,  163,   39,  110,    9,  123,  122,   99,  100,   98,
	  130,   82,  113,  126,    0,   75,  131,    0,  -14,  -15,
	   63,    0,   77,   76,   87,    0,    0,  112,  114,  115,
	    0,    0,    0,    0,    0,  147,  127
    ];
    
    var YYLAST = 107;
    
    var yycheck = [
	   13,   30,    0,   16,   17,   18,   19,   20,   21,   38,
	   23,   10,   25,   26,   27,   28,   10,   11,   12,   16,
	   17,   18,   19,   20,   21,   15,   23,    4,    5,    6,
	    7,    8,   10,    9,   10,   29,   10,   32,   32,   33,
	   34,   14,   10,   10,   10,   35,   24,   37,   26,   14,
	   10,   36,   27,   38,   32,   29,   22,   31,   31,   10,
	   36,   29,   35,   40,    2,    3,   31,   42,   43,   29,
	    9,   10,   36,   10,   38,    9,   10,   31,   31,   31,
	   35,   37,   39,   41,   -1,   35,   35,   -1,   36,   36,
	   36,   -1,   37,   37,   37,   -1,   -1,   39,   39,   39,
	   -1,   -1,   -1,   -1,   -1,   41,   41
    ];
    
    var yybase = [
	    0,   24,   61,   61,   61,   61,   61,   27,   35,   48,
	   48,   40,   58,   59,    3,   32,   32,   32,   32,   32,
	   32,   10,   22,   55,   26,   25,   50,   64,   65,   42,
	   25,   66,   66,   34,   36,   62,   62,   15,   33,   33,
	   33,   33,   49,    2,   47,   46,   63,   53,   52,   54,
	    1,   47,   46,   56,   45,    5,   57,   51,   43,   60,
	   44,    0,    0,    0,    0,  -13,  -13,  -13,  -13,  -13,
	  -13,    6,    6,    6,    6,    6,   23,   23,    0,    6,
	    6,    6,    6,    6,    6,  -29,    0,   34,    0,    0,
	  -29,  -29,  -29,  -29
    ];
    
    var YY2TBLSTATE = 30;
    
    var yydefault = [
	    3,32767,32767,32767,32767,32767,32767,    2,32767,32767,
	32767,32767,32767,32767,32767,   28,   31,   30,   29,   33,
	   32,   73,32767,32767,32767,   24,   73,   73,   73,   73,
	   25,32767,32767,32767,32767,    4,    5,32767,32767,32767,
	32767,   65,32767,32767,   37,   38,32767,   98,   99,32767,
	32767,   47,32767,32767,   64,32767,32767,32767,32767,32767,
	32767,    6,    6,   16
    ];
    
    var yygoto = [
	   27,   28,   29,   21,  104,  104,  104,  104,   19,   56,
	   60,  145,   18,   20,   62,   16,   30,   42,   91,   84,
	   59,   57,   32,   13,   36
    ];
    
    var YYGLAST = 25;
    
    var yygcheck = [
	    8,    8,    8,    8,   22,   22,   22,   22,   20,    9,
	    9,   35,   20,   20,    4,   19,   16,   21,   17,   14,
	   28,   29,   27,   26,    5
    ];
    
    var yygbase = [
	    0,    0,    0,    0,    6,  -38,    0,    0,   -2,  -30,
	    0,    0,    0,    0,  -14,    0,    7,    8,    0,    4,
	   -3,   -7,  -13,    0,    0,    0,  -19,    9,  -12,  -20,
	    0,    0,    0,    0,    0,    5,    0,    0
    ];
    
    var yygdefault = [
	-32768,   43,   65,    7,   61,   35,   73,   74,   26,   53,
	   49,   23,   81,   37,   83,   34,   25,   90,   10,   15,
	   17,   11,  103,  107,  108,  109,   12,   31,   58,   54,
	   41,   55,  133,    6,   14,  144,  165,  166
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
	   35,   35,   35
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
	    1,    2,    1,    2,    1,    2,    1,    2,    1,    1,
	    1,    1,    1
    ];
    
    var YYSTATES = 146;
    var YYNLSTATES = 64;
    var YYINTERRTOK = 1;
    var YYUNEXPECTED = 32767;
    var YYDEFAULT = -32766;
    
    YAECSS.CSSParser.prototype = {
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
			case 23:
			    { console.log("S> "+yyastk[yysp-(4-1)]+">>"+yyastk[yysp-(4-3)]); } break;
			case 24:
			    { yyval = yyastk[yysp-(1-1)]; } break;
			case 25:
			    { yyval = yyastk[yysp-(3-1)]+yyastk[yysp-(3-2)]+yyastk[yysp-(3-3)]; } break;
			case 26:
			    { yyval = yyastk[yysp-(1-1)]; } break;
			case 27:
			    { yyval = yyastk[yysp-(3-1)] + " " + yyastk[yysp-(3-2)]; } break;
			case 34:
			    { yyval = ''; } break;
			case 35:
			    { yyval = yyastk[yysp-(2-1)]; } break;
			case 36:
			    { yyval = yyastk[yysp-(2-1)]; } break;
			case 46:
			    { yyval = yyastk[yysp-(2-1)]+yyastk[yysp-(2-2)]; } break;
			case 64:
			    { console.log("b1>" + yyastk[yysp-(1-1)]); } break;
			case 65:
			    { console.log("b2>" + yyastk[yysp-(1-1)]); } break;
			case 66:
			    { yyval = yyastk[yysp-(2-1)]; console.log("a1>" + yyastk[yysp-(2-1)]); } break;
			case 67:
			    { yyval = yyastk[yysp-(3-2)]; console.log("a2>" + yyastk[yysp-(3-2)]); } break;
			case 68:
			    { yyval = (yyastk[yysp-(3-1)] + ">"+yyastk[yysp-(3-3)]); } break;
			case 69:
			    { yyval = (yyastk[yysp-(4-1)] + ">"+yyastk[yysp-(4-3)]+" "+yyastk[yysp-(4-4)]); } break;
			case 80:
			    { yyval = yyastk[yysp-(1-1)] } break;
			case 81:
			    { yyval = yyastk[yysp-(3-1)] + " " + yyastk[yysp-(3-2)] + " " + yyastk[yysp-(3-3)]; } break;
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
