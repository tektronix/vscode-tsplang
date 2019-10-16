// Generated from C:\Source\vscode-tsplang\server\antlr4-tsplang\scripts\..\Tsp.g4 by ANTLR 4.7.1
// jshint ignore: start
var antlr4 = require('antlr4/index');
var TspListener = require('./TspListener').TspListener;
var grammarFileName = "Tsp.g4";

var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0003A\u01fd\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004\t",
    "\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007\u0004",
    "\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004\f\t\f\u0004",
    "\r\t\r\u0004\u000e\t\u000e\u0004\u000f\t\u000f\u0004\u0010\t\u0010\u0004",
    "\u0011\t\u0011\u0004\u0012\t\u0012\u0004\u0013\t\u0013\u0004\u0014\t",
    "\u0014\u0004\u0015\t\u0015\u0004\u0016\t\u0016\u0004\u0017\t\u0017\u0004",
    "\u0018\t\u0018\u0004\u0019\t\u0019\u0004\u001a\t\u001a\u0004\u001b\t",
    "\u001b\u0004\u001c\t\u001c\u0004\u001d\t\u001d\u0003\u0002\u0003\u0002",
    "\u0005\u0002=\n\u0002\u0007\u0002?\n\u0002\f\u0002\u000e\u0002B\u000b",
    "\u0002\u0003\u0002\u0003\u0002\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0005\u0003K\n\u0003\u0007\u0003M\n\u0003\f\u0003",
    "\u000e\u0003P\u000b\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0005\u0003X\n\u0003\u0007\u0003Z\n\u0003",
    "\f\u0003\u000e\u0003]\u000b\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0005\u0003d\n\u0003\u0007\u0003f\n\u0003\f",
    "\u0003\u000e\u0003i\u000b\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0005\u0003r\n\u0003",
    "\u0007\u0003t\n\u0003\f\u0003\u000e\u0003w\u000b\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0005\u0003~\n\u0003\u0007",
    "\u0003\u0080\n\u0003\f\u0003\u000e\u0003\u0083\u000b\u0003\u0007\u0003",
    "\u0085\n\u0003\f\u0003\u000e\u0003\u0088\u000b\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0005\u0003\u008d\n\u0003\u0007\u0003\u008f\n\u0003",
    "\f\u0003\u000e\u0003\u0092\u000b\u0003\u0005\u0003\u0094\n\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0007",
    "\u0003\u009c\n\u0003\f\u0003\u000e\u0003\u009f\u000b\u0003\u0005\u0003",
    "\u00a1\n\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0005\u0003\u00ac",
    "\n\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0005\u0003\u00b1\n\u0003",
    "\u0007\u0003\u00b3\n\u0003\f\u0003\u000e\u0003\u00b6\u000b\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0007",
    "\u0003\u00be\n\u0003\f\u0003\u000e\u0003\u00c1\u000b\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0007\u0003\u00c7\n\u0003\f\u0003",
    "\u000e\u0003\u00ca\u000b\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0005",
    "\u0003\u00cf\n\u0003\u0007\u0003\u00d1\n\u0003\f\u0003\u000e\u0003\u00d4",
    "\u000b\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0007\u0003\u00dc\n\u0003\f\u0003\u000e\u0003\u00df\u000b",
    "\u0003\u0003\u0003\u0003\u0003\u0005\u0003\u00e3\n\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0007\u0003\u00e9\n\u0003\f\u0003",
    "\u000e\u0003\u00ec\u000b\u0003\u0003\u0003\u0003\u0003\u0005\u0003\u00f0",
    "\n\u0003\u0003\u0003\u0005\u0003\u00f3\n\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0005\u0003\u00f8\n\u0003\u0007\u0003\u00fa\n\u0003\f\u0003",
    "\u000e\u0003\u00fd\u000b\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0007\u0003\u0107",
    "\n\u0003\f\u0003\u000e\u0003\u010a\u000b\u0003\u0003\u0003\u0003\u0003",
    "\u0005\u0003\u010e\n\u0003\u0003\u0003\u0005\u0003\u0111\n\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0005\u0003\u0116\n\u0003\u0007\u0003",
    "\u0118\n\u0003\f\u0003\u000e\u0003\u011b\u000b\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0007\u0003\u0122\n\u0003",
    "\f\u0003\u000e\u0003\u0125\u000b\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0007\u0003\u012b\n\u0003\f\u0003\u000e\u0003\u012e",
    "\u000b\u0003\u0005\u0003\u0130\n\u0003\u0005\u0003\u0132\n\u0003\u0003",
    "\u0004\u0003\u0004\u0003\u0004\u0007\u0004\u0137\n\u0004\f\u0004\u000e",
    "\u0004\u013a\u000b\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004",
    "\u0007\u0004\u0140\n\u0004\f\u0004\u000e\u0004\u0143\u000b\u0004\u0003",
    "\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003",
    "\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0005\u0005\u0150",
    "\n\u0005\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006",
    "\u0003\u0006\u0007\u0006\u0158\n\u0006\f\u0006\u000e\u0006\u015b\u000b",
    "\u0006\u0003\u0006\u0003\u0006\u0005\u0006\u015f\n\u0006\u0003\u0006",
    "\u0005\u0006\u0162\n\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0005",
    "\u0006\u0167\n\u0006\u0007\u0006\u0169\n\u0006\f\u0006\u000e\u0006\u016c",
    "\u000b\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006",
    "\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006",
    "\u0003\u0006\u0003\u0006\u0005\u0006\u017b\n\u0006\u0003\u0006\u0003",
    "\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0005\u0006\u0182\n\u0006",
    "\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0005\u0007",
    "\u0189\n\u0007\u0003\b\u0003\b\u0005\b\u018d\n\b\u0003\b\u0003\b\u0005",
    "\b\u0191\n\b\u0003\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003\t\u0005\t",
    "\u0199\n\t\u0003\n\u0003\n\u0007\n\u019d\n\n\f\n\u000e\n\u01a0\u000b",
    "\n\u0003\n\u0003\n\u0003\n\u0005\n\u01a5\n\n\u0003\u000b\u0003\u000b",
    "\u0007\u000b\u01a9\n\u000b\f\u000b\u000e\u000b\u01ac\u000b\u000b\u0003",
    "\u000b\u0003\u000b\u0005\u000b\u01b0\n\u000b\u0003\u000b\u0003\u000b",
    "\u0003\f\u0003\f\u0003\f\u0003\f\u0007\f\u01b8\n\f\f\f\u000e\f\u01bb",
    "\u000b\f\u0005\f\u01bd\n\f\u0003\f\u0003\f\u0003\f\u0005\f\u01c2\n\f",
    "\u0003\r\u0003\r\u0005\r\u01c6\n\r\u0003\r\u0003\r\u0003\u000e\u0003",
    "\u000e\u0003\u000e\u0007\u000e\u01cd\n\u000e\f\u000e\u000e\u000e\u01d0",
    "\u000b\u000e\u0003\u000e\u0005\u000e\u01d3\n\u000e\u0003\u000f\u0003",
    "\u000f\u0003\u000f\u0003\u000f\u0003\u000f\u0003\u000f\u0003\u000f\u0003",
    "\u000f\u0003\u000f\u0003\u000f\u0005\u000f\u01df\n\u000f\u0003\u0010",
    "\u0003\u0010\u0003\u0011\u0003\u0011\u0003\u0012\u0003\u0012\u0003\u0013",
    "\u0003\u0013\u0003\u0014\u0003\u0014\u0003\u0015\u0003\u0015\u0003\u0016",
    "\u0003\u0016\u0003\u0017\u0003\u0017\u0003\u0018\u0003\u0018\u0003\u0019",
    "\u0003\u0019\u0003\u001a\u0003\u001a\u0003\u001b\u0003\u001b\u0003\u001c",
    "\u0003\u001c\u0003\u001d\u0003\u001d\u0003\u001d\u0002\u0002\u001e\u0002",
    "\u0004\u0006\b\n\f\u000e\u0010\u0012\u0014\u0016\u0018\u001a\u001c\u001e",
    " \"$&(*,.02468\u0002\n\u0004\u0002\u0003\u0003\u000e\u000e\u0003\u0002",
    "\u001e$\u0003\u0002&\'\u0003\u0002()\u0003\u0002-.\u0004\u0002\'\'/",
    "0\u0003\u0002:<\u0003\u000279\u0002\u0243\u0002@\u0003\u0002\u0002\u0002",
    "\u0004\u0131\u0003\u0002\u0002\u0002\u0006\u0133\u0003\u0002\u0002\u0002",
    "\b\u014f\u0003\u0002\u0002\u0002\n\u0181\u0003\u0002\u0002\u0002\f\u0188",
    "\u0003\u0002\u0002\u0002\u000e\u0190\u0003\u0002\u0002\u0002\u0010\u0198",
    "\u0003\u0002\u0002\u0002\u0012\u01a4\u0003\u0002\u0002\u0002\u0014\u01a6",
    "\u0003\u0002\u0002\u0002\u0016\u01c1\u0003\u0002\u0002\u0002\u0018\u01c3",
    "\u0003\u0002\u0002\u0002\u001a\u01c9\u0003\u0002\u0002\u0002\u001c\u01de",
    "\u0003\u0002\u0002\u0002\u001e\u01e0\u0003\u0002\u0002\u0002 \u01e2",
    "\u0003\u0002\u0002\u0002\"\u01e4\u0003\u0002\u0002\u0002$\u01e6\u0003",
    "\u0002\u0002\u0002&\u01e8\u0003\u0002\u0002\u0002(\u01ea\u0003\u0002",
    "\u0002\u0002*\u01ec\u0003\u0002\u0002\u0002,\u01ee\u0003\u0002\u0002",
    "\u0002.\u01f0\u0003\u0002\u0002\u00020\u01f2\u0003\u0002\u0002\u0002",
    "2\u01f4\u0003\u0002\u0002\u00024\u01f6\u0003\u0002\u0002\u00026\u01f8",
    "\u0003\u0002\u0002\u00028\u01fa\u0003\u0002\u0002\u0002:<\u0005\u0004",
    "\u0003\u0002;=\u0007\u0003\u0002\u0002<;\u0003\u0002\u0002\u0002<=\u0003",
    "\u0002\u0002\u0002=?\u0003\u0002\u0002\u0002>:\u0003\u0002\u0002\u0002",
    "?B\u0003\u0002\u0002\u0002@>\u0003\u0002\u0002\u0002@A\u0003\u0002\u0002",
    "\u0002AC\u0003\u0002\u0002\u0002B@\u0003\u0002\u0002\u0002CD\u0007\u0002",
    "\u0002\u0003D\u0003\u0003\u0002\u0002\u0002E\u0132\u0005\u0006\u0004",
    "\u0002F\u0132\u0005\u0014\u000b\u0002GN\u0007\u0004\u0002\u0002HJ\u0005",
    "\u0004\u0003\u0002IK\u0007\u0003\u0002\u0002JI\u0003\u0002\u0002\u0002",
    "JK\u0003\u0002\u0002\u0002KM\u0003\u0002\u0002\u0002LH\u0003\u0002\u0002",
    "\u0002MP\u0003\u0002\u0002\u0002NL\u0003\u0002\u0002\u0002NO\u0003\u0002",
    "\u0002\u0002OQ\u0003\u0002\u0002\u0002PN\u0003\u0002\u0002\u0002Q\u0132",
    "\u0007\u0005\u0002\u0002RS\u0007\u0006\u0002\u0002ST\u0005\n\u0006\u0002",
    "T[\u0007\u0004\u0002\u0002UW\u0005\u0004\u0003\u0002VX\u0007\u0003\u0002",
    "\u0002WV\u0003\u0002\u0002\u0002WX\u0003\u0002\u0002\u0002XZ\u0003\u0002",
    "\u0002\u0002YU\u0003\u0002\u0002\u0002Z]\u0003\u0002\u0002\u0002[Y\u0003",
    "\u0002\u0002\u0002[\\\u0003\u0002\u0002\u0002\\^\u0003\u0002\u0002\u0002",
    "][\u0003\u0002\u0002\u0002^_\u0007\u0005\u0002\u0002_\u0132\u0003\u0002",
    "\u0002\u0002`g\u0007\u0007\u0002\u0002ac\u0005\u0004\u0003\u0002bd\u0007",
    "\u0003\u0002\u0002cb\u0003\u0002\u0002\u0002cd\u0003\u0002\u0002\u0002",
    "df\u0003\u0002\u0002\u0002ea\u0003\u0002\u0002\u0002fi\u0003\u0002\u0002",
    "\u0002ge\u0003\u0002\u0002\u0002gh\u0003\u0002\u0002\u0002hj\u0003\u0002",
    "\u0002\u0002ig\u0003\u0002\u0002\u0002jk\u0007\b\u0002\u0002k\u0132",
    "\u0005\n\u0006\u0002lm\u0007\t\u0002\u0002mn\u0005\n\u0006\u0002nu\u0007",
    "\n\u0002\u0002oq\u0005\u0004\u0003\u0002pr\u0007\u0003\u0002\u0002q",
    "p\u0003\u0002\u0002\u0002qr\u0003\u0002\u0002\u0002rt\u0003\u0002\u0002",
    "\u0002so\u0003\u0002\u0002\u0002tw\u0003\u0002\u0002\u0002us\u0003\u0002",
    "\u0002\u0002uv\u0003\u0002\u0002\u0002v\u0086\u0003\u0002\u0002\u0002",
    "wu\u0003\u0002\u0002\u0002xy\u0007\u000b\u0002\u0002yz\u0005\n\u0006",
    "\u0002z\u0081\u0007\n\u0002\u0002{}\u0005\u0004\u0003\u0002|~\u0007",
    "\u0003\u0002\u0002}|\u0003\u0002\u0002\u0002}~\u0003\u0002\u0002\u0002",
    "~\u0080\u0003\u0002\u0002\u0002\u007f{\u0003\u0002\u0002\u0002\u0080",
    "\u0083\u0003\u0002\u0002\u0002\u0081\u007f\u0003\u0002\u0002\u0002\u0081",
    "\u0082\u0003\u0002\u0002\u0002\u0082\u0085\u0003\u0002\u0002\u0002\u0083",
    "\u0081\u0003\u0002\u0002\u0002\u0084x\u0003\u0002\u0002\u0002\u0085",
    "\u0088\u0003\u0002\u0002\u0002\u0086\u0084\u0003\u0002\u0002\u0002\u0086",
    "\u0087\u0003\u0002\u0002\u0002\u0087\u0093\u0003\u0002\u0002\u0002\u0088",
    "\u0086\u0003\u0002\u0002\u0002\u0089\u0090\u0007\f\u0002\u0002\u008a",
    "\u008c\u0005\u0004\u0003\u0002\u008b\u008d\u0007\u0003\u0002\u0002\u008c",
    "\u008b\u0003\u0002\u0002\u0002\u008c\u008d\u0003\u0002\u0002\u0002\u008d",
    "\u008f\u0003\u0002\u0002\u0002\u008e\u008a\u0003\u0002\u0002\u0002\u008f",
    "\u0092\u0003\u0002\u0002\u0002\u0090\u008e\u0003\u0002\u0002\u0002\u0090",
    "\u0091\u0003\u0002\u0002\u0002\u0091\u0094\u0003\u0002\u0002\u0002\u0092",
    "\u0090\u0003\u0002\u0002\u0002\u0093\u0089\u0003\u0002\u0002\u0002\u0093",
    "\u0094\u0003\u0002\u0002\u0002\u0094\u0095\u0003\u0002\u0002\u0002\u0095",
    "\u0096\u0007\u0005\u0002\u0002\u0096\u0132\u0003\u0002\u0002\u0002\u0097",
    "\u00a0\u0007\r\u0002\u0002\u0098\u009d\u0005\n\u0006\u0002\u0099\u009a",
    "\u0007\u000e\u0002\u0002\u009a\u009c\u0005\n\u0006\u0002\u009b\u0099",
    "\u0003\u0002\u0002\u0002\u009c\u009f\u0003\u0002\u0002\u0002\u009d\u009b",
    "\u0003\u0002\u0002\u0002\u009d\u009e\u0003\u0002\u0002\u0002\u009e\u00a1",
    "\u0003\u0002\u0002\u0002\u009f\u009d\u0003\u0002\u0002\u0002\u00a0\u0098",
    "\u0003\u0002\u0002\u0002\u00a0\u00a1\u0003\u0002\u0002\u0002\u00a1\u0132",
    "\u0003\u0002\u0002\u0002\u00a2\u0132\u0007\u000f\u0002\u0002\u00a3\u00a4",
    "\u0007\u0010\u0002\u0002\u00a4\u00a5\u00076\u0002\u0002\u00a5\u00a6",
    "\u0007\u0011\u0002\u0002\u00a6\u00a7\u0005\n\u0006\u0002\u00a7\u00a8",
    "\u0007\u000e\u0002\u0002\u00a8\u00ab\u0005\n\u0006\u0002\u00a9\u00aa",
    "\u0007\u000e\u0002\u0002\u00aa\u00ac\u0005\n\u0006\u0002\u00ab\u00a9",
    "\u0003\u0002\u0002\u0002\u00ab\u00ac\u0003\u0002\u0002\u0002\u00ac\u00ad",
    "\u0003\u0002\u0002\u0002\u00ad\u00b4\u0007\u0004\u0002\u0002\u00ae\u00b0",
    "\u0005\u0004\u0003\u0002\u00af\u00b1\u0007\u0003\u0002\u0002\u00b0\u00af",
    "\u0003\u0002\u0002\u0002\u00b0\u00b1\u0003\u0002\u0002\u0002\u00b1\u00b3",
    "\u0003\u0002\u0002\u0002\u00b2\u00ae\u0003\u0002\u0002\u0002\u00b3\u00b6",
    "\u0003\u0002\u0002\u0002\u00b4\u00b2\u0003\u0002\u0002\u0002\u00b4\u00b5",
    "\u0003\u0002\u0002\u0002\u00b5\u00b7\u0003\u0002\u0002\u0002\u00b6\u00b4",
    "\u0003\u0002\u0002\u0002\u00b7\u00b8\u0007\u0005\u0002\u0002\u00b8\u0132",
    "\u0003\u0002\u0002\u0002\u00b9\u00ba\u0007\u0010\u0002\u0002\u00ba\u00bf",
    "\u00076\u0002\u0002\u00bb\u00bc\u0007\u000e\u0002\u0002\u00bc\u00be",
    "\u00076\u0002\u0002\u00bd\u00bb\u0003\u0002\u0002\u0002\u00be\u00c1",
    "\u0003\u0002\u0002\u0002\u00bf\u00bd\u0003\u0002\u0002\u0002\u00bf\u00c0",
    "\u0003\u0002\u0002\u0002\u00c0\u00c2\u0003\u0002\u0002\u0002\u00c1\u00bf",
    "\u0003\u0002\u0002\u0002\u00c2\u00c3\u0007\u0012\u0002\u0002\u00c3\u00c8",
    "\u0005\n\u0006\u0002\u00c4\u00c5\u0007\u000e\u0002\u0002\u00c5\u00c7",
    "\u0005\n\u0006\u0002\u00c6\u00c4\u0003\u0002\u0002\u0002\u00c7\u00ca",
    "\u0003\u0002\u0002\u0002\u00c8\u00c6\u0003\u0002\u0002\u0002\u00c8\u00c9",
    "\u0003\u0002\u0002\u0002\u00c9\u00cb\u0003\u0002\u0002\u0002\u00ca\u00c8",
    "\u0003\u0002\u0002\u0002\u00cb\u00d2\u0007\u0004\u0002\u0002\u00cc\u00ce",
    "\u0005\u0004\u0003\u0002\u00cd\u00cf\u0007\u0003\u0002\u0002\u00ce\u00cd",
    "\u0003\u0002\u0002\u0002\u00ce\u00cf\u0003\u0002\u0002\u0002\u00cf\u00d1",
    "\u0003\u0002\u0002\u0002\u00d0\u00cc\u0003\u0002\u0002\u0002\u00d1\u00d4",
    "\u0003\u0002\u0002\u0002\u00d2\u00d0\u0003\u0002\u0002\u0002\u00d2\u00d3",
    "\u0003\u0002\u0002\u0002\u00d3\u00d5\u0003\u0002\u0002\u0002\u00d4\u00d2",
    "\u0003\u0002\u0002\u0002\u00d5\u00d6\u0007\u0005\u0002\u0002\u00d6\u0132",
    "\u0003\u0002\u0002\u0002\u00d7\u00d8\u0007\u0013\u0002\u0002\u00d8\u00dd",
    "\u00076\u0002\u0002\u00d9\u00da\u0007\u0014\u0002\u0002\u00da\u00dc",
    "\u00076\u0002\u0002\u00db\u00d9\u0003\u0002\u0002\u0002\u00dc\u00df",
    "\u0003\u0002\u0002\u0002\u00dd\u00db\u0003\u0002\u0002\u0002\u00dd\u00de",
    "\u0003\u0002\u0002\u0002\u00de\u00e2\u0003\u0002\u0002\u0002\u00df\u00dd",
    "\u0003\u0002\u0002\u0002\u00e0\u00e1\u0007\u0015\u0002\u0002\u00e1\u00e3",
    "\u00076\u0002\u0002\u00e2\u00e0\u0003\u0002\u0002\u0002\u00e2\u00e3",
    "\u0003\u0002\u0002\u0002\u00e3\u00e4\u0003\u0002\u0002\u0002\u00e4\u00f2",
    "\u0007\u0016\u0002\u0002\u00e5\u00ea\u00076\u0002\u0002\u00e6\u00e7",
    "\u0007\u000e\u0002\u0002\u00e7\u00e9\u00076\u0002\u0002\u00e8\u00e6",
    "\u0003\u0002\u0002\u0002\u00e9\u00ec\u0003\u0002\u0002\u0002\u00ea\u00e8",
    "\u0003\u0002\u0002\u0002\u00ea\u00eb\u0003\u0002\u0002\u0002\u00eb\u00ef",
    "\u0003\u0002\u0002\u0002\u00ec\u00ea\u0003\u0002\u0002\u0002\u00ed\u00ee",
    "\u0007\u000e\u0002\u0002\u00ee\u00f0\u00075\u0002\u0002\u00ef\u00ed",
    "\u0003\u0002\u0002\u0002\u00ef\u00f0\u0003\u0002\u0002\u0002\u00f0\u00f3",
    "\u0003\u0002\u0002\u0002\u00f1\u00f3\u00075\u0002\u0002\u00f2\u00e5",
    "\u0003\u0002\u0002\u0002\u00f2\u00f1\u0003\u0002\u0002\u0002\u00f2\u00f3",
    "\u0003\u0002\u0002\u0002\u00f3\u00f4\u0003\u0002\u0002\u0002\u00f4\u00fb",
    "\u0007\u0017\u0002\u0002\u00f5\u00f7\u0005\u0004\u0003\u0002\u00f6\u00f8",
    "\u0007\u0003\u0002\u0002\u00f7\u00f6\u0003\u0002\u0002\u0002\u00f7\u00f8",
    "\u0003\u0002\u0002\u0002\u00f8\u00fa\u0003\u0002\u0002\u0002\u00f9\u00f5",
    "\u0003\u0002\u0002\u0002\u00fa\u00fd\u0003\u0002\u0002\u0002\u00fb\u00f9",
    "\u0003\u0002\u0002\u0002\u00fb\u00fc\u0003\u0002\u0002\u0002\u00fc\u00fe",
    "\u0003\u0002\u0002\u0002\u00fd\u00fb\u0003\u0002\u0002\u0002\u00fe\u0132",
    "\u0007\u0005\u0002\u0002\u00ff\u0100\u00074\u0002\u0002\u0100\u0101",
    "\u0007\u0013\u0002\u0002\u0101\u0102\u00076\u0002\u0002\u0102\u0110",
    "\u0007\u0016\u0002\u0002\u0103\u0108\u00076\u0002\u0002\u0104\u0105",
    "\u0007\u000e\u0002\u0002\u0105\u0107\u00076\u0002\u0002\u0106\u0104",
    "\u0003\u0002\u0002\u0002\u0107\u010a\u0003\u0002\u0002\u0002\u0108\u0106",
    "\u0003\u0002\u0002\u0002\u0108\u0109\u0003\u0002\u0002\u0002\u0109\u010d",
    "\u0003\u0002\u0002\u0002\u010a\u0108\u0003\u0002\u0002\u0002\u010b\u010c",
    "\u0007\u000e\u0002\u0002\u010c\u010e\u00075\u0002\u0002\u010d\u010b",
    "\u0003\u0002\u0002\u0002\u010d\u010e\u0003\u0002\u0002\u0002\u010e\u0111",
    "\u0003\u0002\u0002\u0002\u010f\u0111\u00075\u0002\u0002\u0110\u0103",
    "\u0003\u0002\u0002\u0002\u0110\u010f\u0003\u0002\u0002\u0002\u0110\u0111",
    "\u0003\u0002\u0002\u0002\u0111\u0112\u0003\u0002\u0002\u0002\u0112\u0119",
    "\u0007\u0017\u0002\u0002\u0113\u0115\u0005\u0004\u0003\u0002\u0114\u0116",
    "\u0007\u0003\u0002\u0002\u0115\u0114\u0003\u0002\u0002\u0002\u0115\u0116",
    "\u0003\u0002\u0002\u0002\u0116\u0118\u0003\u0002\u0002\u0002\u0117\u0113",
    "\u0003\u0002\u0002\u0002\u0118\u011b\u0003\u0002\u0002\u0002\u0119\u0117",
    "\u0003\u0002\u0002\u0002\u0119\u011a\u0003\u0002\u0002\u0002\u011a\u011c",
    "\u0003\u0002\u0002\u0002\u011b\u0119\u0003\u0002\u0002\u0002\u011c\u0132",
    "\u0007\u0005\u0002\u0002\u011d\u011e\u00074\u0002\u0002\u011e\u0123",
    "\u00076\u0002\u0002\u011f\u0120\u0007\u000e\u0002\u0002\u0120\u0122",
    "\u00076\u0002\u0002\u0121\u011f\u0003\u0002\u0002\u0002\u0122\u0125",
    "\u0003\u0002\u0002\u0002\u0123\u0121\u0003\u0002\u0002\u0002\u0123\u0124",
    "\u0003\u0002\u0002\u0002\u0124\u012f\u0003\u0002\u0002\u0002\u0125\u0123",
    "\u0003\u0002\u0002\u0002\u0126\u0127\u0007\u0011\u0002\u0002\u0127\u012c",
    "\u0005\n\u0006\u0002\u0128\u0129\u0007\u000e\u0002\u0002\u0129\u012b",
    "\u0005\n\u0006\u0002\u012a\u0128\u0003\u0002\u0002\u0002\u012b\u012e",
    "\u0003\u0002\u0002\u0002\u012c\u012a\u0003\u0002\u0002\u0002\u012c\u012d",
    "\u0003\u0002\u0002\u0002\u012d\u0130\u0003\u0002\u0002\u0002\u012e\u012c",
    "\u0003\u0002\u0002\u0002\u012f\u0126\u0003\u0002\u0002\u0002\u012f\u0130",
    "\u0003\u0002\u0002\u0002\u0130\u0132\u0003\u0002\u0002\u0002\u0131E",
    "\u0003\u0002\u0002\u0002\u0131F\u0003\u0002\u0002\u0002\u0131G\u0003",
    "\u0002\u0002\u0002\u0131R\u0003\u0002\u0002\u0002\u0131`\u0003\u0002",
    "\u0002\u0002\u0131l\u0003\u0002\u0002\u0002\u0131\u0097\u0003\u0002",
    "\u0002\u0002\u0131\u00a2\u0003\u0002\u0002\u0002\u0131\u00a3\u0003\u0002",
    "\u0002\u0002\u0131\u00b9\u0003\u0002\u0002\u0002\u0131\u00d7\u0003\u0002",
    "\u0002\u0002\u0131\u00ff\u0003\u0002\u0002\u0002\u0131\u011d\u0003\u0002",
    "\u0002\u0002\u0132\u0005\u0003\u0002\u0002\u0002\u0133\u0138\u0005\u0012",
    "\n\u0002\u0134\u0135\u0007\u000e\u0002\u0002\u0135\u0137\u0005\u0012",
    "\n\u0002\u0136\u0134\u0003\u0002\u0002\u0002\u0137\u013a\u0003\u0002",
    "\u0002\u0002\u0138\u0136\u0003\u0002\u0002\u0002\u0138\u0139\u0003\u0002",
    "\u0002\u0002\u0139\u013b\u0003\u0002\u0002\u0002\u013a\u0138\u0003\u0002",
    "\u0002\u0002\u013b\u013c\u0007\u0011\u0002\u0002\u013c\u0141\u0005\n",
    "\u0006\u0002\u013d\u013e\u0007\u000e\u0002\u0002\u013e\u0140\u0005\n",
    "\u0006\u0002\u013f\u013d\u0003\u0002\u0002\u0002\u0140\u0143\u0003\u0002",
    "\u0002\u0002\u0141\u013f\u0003\u0002\u0002\u0002\u0141\u0142\u0003\u0002",
    "\u0002\u0002\u0142\u0007\u0003\u0002\u0002\u0002\u0143\u0141\u0003\u0002",
    "\u0002\u0002\u0144\u0150\u00072\u0002\u0002\u0145\u0150\u00073\u0002",
    "\u0002\u0146\u0150\u00056\u001c\u0002\u0147\u0150\u00058\u001d\u0002",
    "\u0148\u0150\u0005\u0012\n\u0002\u0149\u0150\u0005\u0014\u000b\u0002",
    "\u014a\u0150\u0005\u0018\r\u0002\u014b\u014c\u0007\u0016\u0002\u0002",
    "\u014c\u014d\u0005\n\u0006\u0002\u014d\u014e\u0007\u0017\u0002\u0002",
    "\u014e\u0150\u0003\u0002\u0002\u0002\u014f\u0144\u0003\u0002\u0002\u0002",
    "\u014f\u0145\u0003\u0002\u0002\u0002\u014f\u0146\u0003\u0002\u0002\u0002",
    "\u014f\u0147\u0003\u0002\u0002\u0002\u014f\u0148\u0003\u0002\u0002\u0002",
    "\u014f\u0149\u0003\u0002\u0002\u0002\u014f\u014a\u0003\u0002\u0002\u0002",
    "\u014f\u014b\u0003\u0002\u0002\u0002\u0150\t\u0003\u0002\u0002\u0002",
    "\u0151\u0182\u0005\b\u0005\u0002\u0152\u0153\u0007\u0013\u0002\u0002",
    "\u0153\u0161\u0007\u0016\u0002\u0002\u0154\u0159\u00076\u0002\u0002",
    "\u0155\u0156\u0007\u000e\u0002\u0002\u0156\u0158\u00076\u0002\u0002",
    "\u0157\u0155\u0003\u0002\u0002\u0002\u0158\u015b\u0003\u0002\u0002\u0002",
    "\u0159\u0157\u0003\u0002\u0002\u0002\u0159\u015a\u0003\u0002\u0002\u0002",
    "\u015a\u015e\u0003\u0002\u0002\u0002\u015b\u0159\u0003\u0002\u0002\u0002",
    "\u015c\u015d\u0007\u000e\u0002\u0002\u015d\u015f\u00075\u0002\u0002",
    "\u015e\u015c\u0003\u0002\u0002\u0002\u015e\u015f\u0003\u0002\u0002\u0002",
    "\u015f\u0162\u0003\u0002\u0002\u0002\u0160\u0162\u00075\u0002\u0002",
    "\u0161\u0154\u0003\u0002\u0002\u0002\u0161\u0160\u0003\u0002\u0002\u0002",
    "\u0161\u0162\u0003\u0002\u0002\u0002\u0162\u0163\u0003\u0002\u0002\u0002",
    "\u0163\u016a\u0007\u0017\u0002\u0002\u0164\u0166\u0005\u0004\u0003\u0002",
    "\u0165\u0167\u0007\u0003\u0002\u0002\u0166\u0165\u0003\u0002\u0002\u0002",
    "\u0166\u0167\u0003\u0002\u0002\u0002\u0167\u0169\u0003\u0002\u0002\u0002",
    "\u0168\u0164\u0003\u0002\u0002\u0002\u0169\u016c\u0003\u0002\u0002\u0002",
    "\u016a\u0168\u0003\u0002\u0002\u0002\u016a\u016b\u0003\u0002\u0002\u0002",
    "\u016b\u016d\u0003\u0002\u0002\u0002\u016c\u016a\u0003\u0002\u0002\u0002",
    "\u016d\u0182\u0007\u0005\u0002\u0002\u016e\u017a\u0005\b\u0005\u0002",
    "\u016f\u017b\u0005\u001e\u0010\u0002\u0170\u017b\u0005 \u0011\u0002",
    "\u0171\u017b\u0005\"\u0012\u0002\u0172\u017b\u0005,\u0017\u0002\u0173",
    "\u017b\u0005.\u0018\u0002\u0174\u017b\u0005*\u0016\u0002\u0175\u017b",
    "\u00050\u0019\u0002\u0176\u017b\u0005$\u0013\u0002\u0177\u017b\u0005",
    "&\u0014\u0002\u0178\u017b\u0005(\u0015\u0002\u0179\u017b\u00054\u001b",
    "\u0002\u017a\u016f\u0003\u0002\u0002\u0002\u017a\u0170\u0003\u0002\u0002",
    "\u0002\u017a\u0171\u0003\u0002\u0002\u0002\u017a\u0172\u0003\u0002\u0002",
    "\u0002\u017a\u0173\u0003\u0002\u0002\u0002\u017a\u0174\u0003\u0002\u0002",
    "\u0002\u017a\u0175\u0003\u0002\u0002\u0002\u017a\u0176\u0003\u0002\u0002",
    "\u0002\u017a\u0177\u0003\u0002\u0002\u0002\u017a\u0178\u0003\u0002\u0002",
    "\u0002\u017a\u0179\u0003\u0002\u0002\u0002\u017b\u017c\u0003\u0002\u0002",
    "\u0002\u017c\u017d\u0005\n\u0006\u0002\u017d\u0182\u0003\u0002\u0002",
    "\u0002\u017e\u017f\u00052\u001a\u0002\u017f\u0180\u0005\n\u0006\u0002",
    "\u0180\u0182\u0003\u0002\u0002\u0002\u0181\u0151\u0003\u0002\u0002\u0002",
    "\u0181\u0152\u0003\u0002\u0002\u0002\u0181\u016e\u0003\u0002\u0002\u0002",
    "\u0181\u017e\u0003\u0002\u0002\u0002\u0182\u000b\u0003\u0002\u0002\u0002",
    "\u0183\u0184\u0007\u0016\u0002\u0002\u0184\u0185\u0005\n\u0006\u0002",
    "\u0185\u0186\u0007\u0017\u0002\u0002\u0186\u0189\u0003\u0002\u0002\u0002",
    "\u0187\u0189\u00076\u0002\u0002\u0188\u0183\u0003\u0002\u0002\u0002",
    "\u0188\u0187\u0003\u0002\u0002\u0002\u0189\r\u0003\u0002\u0002\u0002",
    "\u018a\u018b\u0007\u0015\u0002\u0002\u018b\u018d\u00076\u0002\u0002",
    "\u018c\u018a\u0003\u0002\u0002\u0002\u018c\u018d\u0003\u0002\u0002\u0002",
    "\u018d\u018e\u0003\u0002\u0002\u0002\u018e\u0191\u0005\u0016\f\u0002",
    "\u018f\u0191\u0005\u0010\t\u0002\u0190\u018c\u0003\u0002\u0002\u0002",
    "\u0190\u018f\u0003\u0002\u0002\u0002\u0191\u000f\u0003\u0002\u0002\u0002",
    "\u0192\u0193\u0007\u0018\u0002\u0002\u0193\u0194\u0005\n\u0006\u0002",
    "\u0194\u0195\u0007\u0019\u0002\u0002\u0195\u0199\u0003\u0002\u0002\u0002",
    "\u0196\u0197\u0007\u0014\u0002\u0002\u0197\u0199\u00076\u0002\u0002",
    "\u0198\u0192\u0003\u0002\u0002\u0002\u0198\u0196\u0003\u0002\u0002\u0002",
    "\u0199\u0011\u0003\u0002\u0002\u0002\u019a\u019e\u0005\f\u0007\u0002",
    "\u019b\u019d\u0005\u000e\b\u0002\u019c\u019b\u0003\u0002\u0002\u0002",
    "\u019d\u01a0\u0003\u0002\u0002\u0002\u019e\u019c\u0003\u0002\u0002\u0002",
    "\u019e\u019f\u0003\u0002\u0002\u0002\u019f\u01a1\u0003\u0002\u0002\u0002",
    "\u01a0\u019e\u0003\u0002\u0002\u0002\u01a1\u01a2\u0005\u0010\t\u0002",
    "\u01a2\u01a5\u0003\u0002\u0002\u0002\u01a3\u01a5\u00076\u0002\u0002",
    "\u01a4\u019a\u0003\u0002\u0002\u0002\u01a4\u01a3\u0003\u0002\u0002\u0002",
    "\u01a5\u0013\u0003\u0002\u0002\u0002\u01a6\u01aa\u0005\f\u0007\u0002",
    "\u01a7\u01a9\u0005\u000e\b\u0002\u01a8\u01a7\u0003\u0002\u0002\u0002",
    "\u01a9\u01ac\u0003\u0002\u0002\u0002\u01aa\u01a8\u0003\u0002\u0002\u0002",
    "\u01aa\u01ab\u0003\u0002\u0002\u0002\u01ab\u01af\u0003\u0002\u0002\u0002",
    "\u01ac\u01aa\u0003\u0002\u0002\u0002\u01ad\u01ae\u0007\u0015\u0002\u0002",
    "\u01ae\u01b0\u00076\u0002\u0002\u01af\u01ad\u0003\u0002\u0002\u0002",
    "\u01af\u01b0\u0003\u0002\u0002\u0002\u01b0\u01b1\u0003\u0002\u0002\u0002",
    "\u01b1\u01b2\u0005\u0016\f\u0002\u01b2\u0015\u0003\u0002\u0002\u0002",
    "\u01b3\u01bc\u0007\u0016\u0002\u0002\u01b4\u01b9\u0005\n\u0006\u0002",
    "\u01b5\u01b6\u0007\u000e\u0002\u0002\u01b6\u01b8\u0005\n\u0006\u0002",
    "\u01b7\u01b5\u0003\u0002\u0002\u0002\u01b8\u01bb\u0003\u0002\u0002\u0002",
    "\u01b9\u01b7\u0003\u0002\u0002\u0002\u01b9\u01ba\u0003\u0002\u0002\u0002",
    "\u01ba\u01bd\u0003\u0002\u0002\u0002\u01bb\u01b9\u0003\u0002\u0002\u0002",
    "\u01bc\u01b4\u0003\u0002\u0002\u0002\u01bc\u01bd\u0003\u0002\u0002\u0002",
    "\u01bd\u01be\u0003\u0002\u0002\u0002\u01be\u01c2\u0007\u0017\u0002\u0002",
    "\u01bf\u01c2\u0005\u0018\r\u0002\u01c0\u01c2\u00058\u001d\u0002\u01c1",
    "\u01b3\u0003\u0002\u0002\u0002\u01c1\u01bf\u0003\u0002\u0002\u0002\u01c1",
    "\u01c0\u0003\u0002\u0002\u0002\u01c2\u0017\u0003\u0002\u0002\u0002\u01c3",
    "\u01c5\u0007\u001a\u0002\u0002\u01c4\u01c6\u0005\u001a\u000e\u0002\u01c5",
    "\u01c4\u0003\u0002\u0002\u0002\u01c5\u01c6\u0003\u0002\u0002\u0002\u01c6",
    "\u01c7\u0003\u0002\u0002\u0002\u01c7\u01c8\u0007\u001b\u0002\u0002\u01c8",
    "\u0019\u0003\u0002\u0002\u0002\u01c9\u01ce\u0005\u001c\u000f\u0002\u01ca",
    "\u01cb\t\u0002\u0002\u0002\u01cb\u01cd\u0005\u001c\u000f\u0002\u01cc",
    "\u01ca\u0003\u0002\u0002\u0002\u01cd\u01d0\u0003\u0002\u0002\u0002\u01ce",
    "\u01cc\u0003\u0002\u0002\u0002\u01ce\u01cf\u0003\u0002\u0002\u0002\u01cf",
    "\u01d2\u0003\u0002\u0002\u0002\u01d0\u01ce\u0003\u0002\u0002\u0002\u01d1",
    "\u01d3\t\u0002\u0002\u0002\u01d2\u01d1\u0003\u0002\u0002\u0002\u01d2",
    "\u01d3\u0003\u0002\u0002\u0002\u01d3\u001b\u0003\u0002\u0002\u0002\u01d4",
    "\u01d5\u0007\u0018\u0002\u0002\u01d5\u01d6\u0005\n\u0006\u0002\u01d6",
    "\u01d7\u0007\u0019\u0002\u0002\u01d7\u01d8\u0007\u0011\u0002\u0002\u01d8",
    "\u01d9\u0005\n\u0006\u0002\u01d9\u01df\u0003\u0002\u0002\u0002\u01da",
    "\u01db\u00076\u0002\u0002\u01db\u01dc\u0007\u0011\u0002\u0002\u01dc",
    "\u01df\u0005\n\u0006\u0002\u01dd\u01df\u0005\n\u0006\u0002\u01de\u01d4",
    "\u0003\u0002\u0002\u0002\u01de\u01da\u0003\u0002\u0002\u0002\u01de\u01dd",
    "\u0003\u0002\u0002\u0002\u01df\u001d\u0003\u0002\u0002\u0002\u01e0\u01e1",
    "\u0007\u001c\u0002\u0002\u01e1\u001f\u0003\u0002\u0002\u0002\u01e2\u01e3",
    "\u0007\u001d\u0002\u0002\u01e3!\u0003\u0002\u0002\u0002\u01e4\u01e5",
    "\t\u0003\u0002\u0002\u01e5#\u0003\u0002\u0002\u0002\u01e6\u01e7\u0007",
    "%\u0002\u0002\u01e7%\u0003\u0002\u0002\u0002\u01e8\u01e9\t\u0004\u0002",
    "\u0002\u01e9\'\u0003\u0002\u0002\u0002\u01ea\u01eb\t\u0005\u0002\u0002",
    "\u01eb)\u0003\u0002\u0002\u0002\u01ec\u01ed\u0007*\u0002\u0002\u01ed",
    "+\u0003\u0002\u0002\u0002\u01ee\u01ef\u0007+\u0002\u0002\u01ef-\u0003",
    "\u0002\u0002\u0002\u01f0\u01f1\u0007,\u0002\u0002\u01f1/\u0003\u0002",
    "\u0002\u0002\u01f2\u01f3\t\u0006\u0002\u0002\u01f31\u0003\u0002\u0002",
    "\u0002\u01f4\u01f5\t\u0007\u0002\u0002\u01f53\u0003\u0002\u0002\u0002",
    "\u01f6\u01f7\u00071\u0002\u0002\u01f75\u0003\u0002\u0002\u0002\u01f8",
    "\u01f9\t\b\u0002\u0002\u01f97\u0003\u0002\u0002\u0002\u01fa\u01fb\t",
    "\t\u0002\u0002\u01fb9\u0003\u0002\u0002\u0002D<@JNW[cgqu}\u0081\u0086",
    "\u008c\u0090\u0093\u009d\u00a0\u00ab\u00b0\u00b4\u00bf\u00c8\u00ce\u00d2",
    "\u00dd\u00e2\u00ea\u00ef\u00f2\u00f7\u00fb\u0108\u010d\u0110\u0115\u0119",
    "\u0123\u012c\u012f\u0131\u0138\u0141\u014f\u0159\u015e\u0161\u0166\u016a",
    "\u017a\u0181\u0188\u018c\u0190\u0198\u019e\u01a4\u01aa\u01af\u01b9\u01bc",
    "\u01c1\u01c5\u01ce\u01d2\u01de"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [ null, "';'", "'do'", "'end'", "'while'", "'repeat'",
                     "'until'", "'if'", "'then'", "'elseif'", "'else'",
                     "'return'", "','", "'break'", "'for'", "'='", "'in'",
                     "'function'", "'.'", "':'", "'('", "')'", "'['", "']'",
                     "'{'", "'}'", "'or'", "'and'", "'<'", "'>'", "'<='",
                     "'>='", "'~='", "'!='", "'=='", "'..'", "'+'", "'-'",
                     "'*'", "'/'", "'&'", "'|'", "'^^'", "'<<'", "'>>'",
                     "'not'", "'!'", "'^'", "'nil'", null, "'local'", "'...'" ];

var symbolicNames = [ null, null, null, null, null, null, null, null, null,
                      null, null, null, null, null, null, null, null, null,
                      null, null, null, null, null, null, null, null, null,
                      null, null, null, null, null, null, null, null, null,
                      null, null, null, null, null, null, null, null, null,
                      null, null, null, "NIL", "BOOLEAN", "LOCAL", "VARARG",
                      "NAME", "NORMALSTRING", "CHARSTRING", "LONGSTRING",
                      "INT", "HEX", "FLOAT", "LONGCOMMENT", "LINE_COMMENT",
                      "HORIZONTAL_WS", "VERTICAL_WS", "SHEBANG" ];

var ruleNames =  [ "chunk", "statement", "assignment", "value", "expression",
                   "prefix", "suffix", "index", "variable", "functionCall",
                   "args", "tableConstructor", "fieldList", "field", "operatorOr",
                   "operatorAnd", "operatorComparison", "operatorStrcat",
                   "operatorAddSub", "operatorMulDiv", "operatorBitwiseAnd",
                   "operatorBitwiseOr", "operatorBitwiseXor", "operatorBitwiseShift",
                   "operatorUnary", "operatorPower", "number", "string" ];

function TspParser (input) {
	antlr4.Parser.call(this, input);
    this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
    this.ruleNames = ruleNames;
    this.literalNames = literalNames;
    this.symbolicNames = symbolicNames;
    return this;
}

TspParser.prototype = Object.create(antlr4.Parser.prototype);
TspParser.prototype.constructor = TspParser;

Object.defineProperty(TspParser.prototype, "atn", {
	get : function() {
		return atn;
	}
});

TspParser.EOF = antlr4.Token.EOF;
TspParser.T__0 = 1;
TspParser.T__1 = 2;
TspParser.T__2 = 3;
TspParser.T__3 = 4;
TspParser.T__4 = 5;
TspParser.T__5 = 6;
TspParser.T__6 = 7;
TspParser.T__7 = 8;
TspParser.T__8 = 9;
TspParser.T__9 = 10;
TspParser.T__10 = 11;
TspParser.T__11 = 12;
TspParser.T__12 = 13;
TspParser.T__13 = 14;
TspParser.T__14 = 15;
TspParser.T__15 = 16;
TspParser.T__16 = 17;
TspParser.T__17 = 18;
TspParser.T__18 = 19;
TspParser.T__19 = 20;
TspParser.T__20 = 21;
TspParser.T__21 = 22;
TspParser.T__22 = 23;
TspParser.T__23 = 24;
TspParser.T__24 = 25;
TspParser.T__25 = 26;
TspParser.T__26 = 27;
TspParser.T__27 = 28;
TspParser.T__28 = 29;
TspParser.T__29 = 30;
TspParser.T__30 = 31;
TspParser.T__31 = 32;
TspParser.T__32 = 33;
TspParser.T__33 = 34;
TspParser.T__34 = 35;
TspParser.T__35 = 36;
TspParser.T__36 = 37;
TspParser.T__37 = 38;
TspParser.T__38 = 39;
TspParser.T__39 = 40;
TspParser.T__40 = 41;
TspParser.T__41 = 42;
TspParser.T__42 = 43;
TspParser.T__43 = 44;
TspParser.T__44 = 45;
TspParser.T__45 = 46;
TspParser.T__46 = 47;
TspParser.NIL = 48;
TspParser.BOOLEAN = 49;
TspParser.LOCAL = 50;
TspParser.VARARG = 51;
TspParser.NAME = 52;
TspParser.NORMALSTRING = 53;
TspParser.CHARSTRING = 54;
TspParser.LONGSTRING = 55;
TspParser.INT = 56;
TspParser.HEX = 57;
TspParser.FLOAT = 58;
TspParser.LONGCOMMENT = 59;
TspParser.LINE_COMMENT = 60;
TspParser.HORIZONTAL_WS = 61;
TspParser.VERTICAL_WS = 62;
TspParser.SHEBANG = 63;

TspParser.RULE_chunk = 0;
TspParser.RULE_statement = 1;
TspParser.RULE_assignment = 2;
TspParser.RULE_value = 3;
TspParser.RULE_expression = 4;
TspParser.RULE_prefix = 5;
TspParser.RULE_suffix = 6;
TspParser.RULE_index = 7;
TspParser.RULE_variable = 8;
TspParser.RULE_functionCall = 9;
TspParser.RULE_args = 10;
TspParser.RULE_tableConstructor = 11;
TspParser.RULE_fieldList = 12;
TspParser.RULE_field = 13;
TspParser.RULE_operatorOr = 14;
TspParser.RULE_operatorAnd = 15;
TspParser.RULE_operatorComparison = 16;
TspParser.RULE_operatorStrcat = 17;
TspParser.RULE_operatorAddSub = 18;
TspParser.RULE_operatorMulDiv = 19;
TspParser.RULE_operatorBitwiseAnd = 20;
TspParser.RULE_operatorBitwiseOr = 21;
TspParser.RULE_operatorBitwiseXor = 22;
TspParser.RULE_operatorBitwiseShift = 23;
TspParser.RULE_operatorUnary = 24;
TspParser.RULE_operatorPower = 25;
TspParser.RULE_number = 26;
TspParser.RULE_string = 27;

function ChunkContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = TspParser.RULE_chunk;
    return this;
}

ChunkContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ChunkContext.prototype.constructor = ChunkContext;

ChunkContext.prototype.EOF = function() {
    return this.getToken(TspParser.EOF, 0);
};

ChunkContext.prototype.statement = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(StatementContext);
    } else {
        return this.getTypedRuleContext(StatementContext,i);
    }
};

ChunkContext.prototype.enterRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.enterChunk(this);
	}
};

ChunkContext.prototype.exitRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.exitChunk(this);
	}
};




TspParser.ChunkContext = ChunkContext;

TspParser.prototype.chunk = function() {

    var localctx = new ChunkContext(this, this._ctx, this.state);
    this.enterRule(localctx, 0, TspParser.RULE_chunk);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 62;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << TspParser.T__1) | (1 << TspParser.T__3) | (1 << TspParser.T__4) | (1 << TspParser.T__6) | (1 << TspParser.T__10) | (1 << TspParser.T__12) | (1 << TspParser.T__13) | (1 << TspParser.T__16) | (1 << TspParser.T__19))) !== 0) || _la===TspParser.LOCAL || _la===TspParser.NAME) {
            this.state = 56;
            this.statement();
            this.state = 58;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if(_la===TspParser.T__0) {
                this.state = 57;
                this.match(TspParser.T__0);
            }

            this.state = 64;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 65;
        this.match(TspParser.EOF);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function StatementContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = TspParser.RULE_statement;
    return this;
}

StatementContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
StatementContext.prototype.constructor = StatementContext;

StatementContext.prototype.assignment = function() {
    return this.getTypedRuleContext(AssignmentContext,0);
};

StatementContext.prototype.functionCall = function() {
    return this.getTypedRuleContext(FunctionCallContext,0);
};

StatementContext.prototype.statement = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(StatementContext);
    } else {
        return this.getTypedRuleContext(StatementContext,i);
    }
};

StatementContext.prototype.expression = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExpressionContext);
    } else {
        return this.getTypedRuleContext(ExpressionContext,i);
    }
};

StatementContext.prototype.NAME = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(TspParser.NAME);
    } else {
        return this.getToken(TspParser.NAME, i);
    }
};


StatementContext.prototype.VARARG = function() {
    return this.getToken(TspParser.VARARG, 0);
};

StatementContext.prototype.LOCAL = function() {
    return this.getToken(TspParser.LOCAL, 0);
};

StatementContext.prototype.enterRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.enterStatement(this);
	}
};

StatementContext.prototype.exitRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.exitStatement(this);
	}
};




TspParser.StatementContext = StatementContext;

TspParser.prototype.statement = function() {

    var localctx = new StatementContext(this, this._ctx, this.state);
    this.enterRule(localctx, 2, TspParser.RULE_statement);
    var _la = 0; // Token type
    try {
        this.state = 303;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,40,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 67;
            this.assignment();
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 68;
            this.functionCall();
            break;

        case 3:
            this.enterOuterAlt(localctx, 3);
            this.state = 69;
            this.match(TspParser.T__1);
            this.state = 76;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << TspParser.T__1) | (1 << TspParser.T__3) | (1 << TspParser.T__4) | (1 << TspParser.T__6) | (1 << TspParser.T__10) | (1 << TspParser.T__12) | (1 << TspParser.T__13) | (1 << TspParser.T__16) | (1 << TspParser.T__19))) !== 0) || _la===TspParser.LOCAL || _la===TspParser.NAME) {
                this.state = 70;
                this.statement();
                this.state = 72;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if(_la===TspParser.T__0) {
                    this.state = 71;
                    this.match(TspParser.T__0);
                }

                this.state = 78;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            this.state = 79;
            this.match(TspParser.T__2);
            break;

        case 4:
            this.enterOuterAlt(localctx, 4);
            this.state = 80;
            this.match(TspParser.T__3);
            this.state = 81;
            this.expression();
            this.state = 82;
            this.match(TspParser.T__1);
            this.state = 89;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << TspParser.T__1) | (1 << TspParser.T__3) | (1 << TspParser.T__4) | (1 << TspParser.T__6) | (1 << TspParser.T__10) | (1 << TspParser.T__12) | (1 << TspParser.T__13) | (1 << TspParser.T__16) | (1 << TspParser.T__19))) !== 0) || _la===TspParser.LOCAL || _la===TspParser.NAME) {
                this.state = 83;
                this.statement();
                this.state = 85;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if(_la===TspParser.T__0) {
                    this.state = 84;
                    this.match(TspParser.T__0);
                }

                this.state = 91;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            this.state = 92;
            this.match(TspParser.T__2);
            break;

        case 5:
            this.enterOuterAlt(localctx, 5);
            this.state = 94;
            this.match(TspParser.T__4);
            this.state = 101;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << TspParser.T__1) | (1 << TspParser.T__3) | (1 << TspParser.T__4) | (1 << TspParser.T__6) | (1 << TspParser.T__10) | (1 << TspParser.T__12) | (1 << TspParser.T__13) | (1 << TspParser.T__16) | (1 << TspParser.T__19))) !== 0) || _la===TspParser.LOCAL || _la===TspParser.NAME) {
                this.state = 95;
                this.statement();
                this.state = 97;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if(_la===TspParser.T__0) {
                    this.state = 96;
                    this.match(TspParser.T__0);
                }

                this.state = 103;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            this.state = 104;
            this.match(TspParser.T__5);
            this.state = 105;
            this.expression();
            break;

        case 6:
            this.enterOuterAlt(localctx, 6);
            this.state = 106;
            this.match(TspParser.T__6);
            this.state = 107;
            this.expression();
            this.state = 108;
            this.match(TspParser.T__7);
            this.state = 115;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << TspParser.T__1) | (1 << TspParser.T__3) | (1 << TspParser.T__4) | (1 << TspParser.T__6) | (1 << TspParser.T__10) | (1 << TspParser.T__12) | (1 << TspParser.T__13) | (1 << TspParser.T__16) | (1 << TspParser.T__19))) !== 0) || _la===TspParser.LOCAL || _la===TspParser.NAME) {
                this.state = 109;
                this.statement();
                this.state = 111;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if(_la===TspParser.T__0) {
                    this.state = 110;
                    this.match(TspParser.T__0);
                }

                this.state = 117;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            this.state = 132;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while(_la===TspParser.T__8) {
                this.state = 118;
                this.match(TspParser.T__8);
                this.state = 119;
                this.expression();
                this.state = 120;
                this.match(TspParser.T__7);
                this.state = 127;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << TspParser.T__1) | (1 << TspParser.T__3) | (1 << TspParser.T__4) | (1 << TspParser.T__6) | (1 << TspParser.T__10) | (1 << TspParser.T__12) | (1 << TspParser.T__13) | (1 << TspParser.T__16) | (1 << TspParser.T__19))) !== 0) || _la===TspParser.LOCAL || _la===TspParser.NAME) {
                    this.state = 121;
                    this.statement();
                    this.state = 123;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                    if(_la===TspParser.T__0) {
                        this.state = 122;
                        this.match(TspParser.T__0);
                    }

                    this.state = 129;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                }
                this.state = 134;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            this.state = 145;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if(_la===TspParser.T__9) {
                this.state = 135;
                this.match(TspParser.T__9);
                this.state = 142;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << TspParser.T__1) | (1 << TspParser.T__3) | (1 << TspParser.T__4) | (1 << TspParser.T__6) | (1 << TspParser.T__10) | (1 << TspParser.T__12) | (1 << TspParser.T__13) | (1 << TspParser.T__16) | (1 << TspParser.T__19))) !== 0) || _la===TspParser.LOCAL || _la===TspParser.NAME) {
                    this.state = 136;
                    this.statement();
                    this.state = 138;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                    if(_la===TspParser.T__0) {
                        this.state = 137;
                        this.match(TspParser.T__0);
                    }

                    this.state = 144;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                }
            }

            this.state = 147;
            this.match(TspParser.T__2);
            break;

        case 7:
            this.enterOuterAlt(localctx, 7);
            this.state = 149;
            this.match(TspParser.T__10);
            this.state = 158;
            this._errHandler.sync(this);
            var la_ = this._interp.adaptivePredict(this._input,17,this._ctx);
            if(la_===1) {
                this.state = 150;
                this.expression();
                this.state = 155;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while(_la===TspParser.T__11) {
                    this.state = 151;
                    this.match(TspParser.T__11);
                    this.state = 152;
                    this.expression();
                    this.state = 157;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                }

            }
            break;

        case 8:
            this.enterOuterAlt(localctx, 8);
            this.state = 160;
            this.match(TspParser.T__12);
            break;

        case 9:
            this.enterOuterAlt(localctx, 9);
            this.state = 161;
            this.match(TspParser.T__13);
            this.state = 162;
            this.match(TspParser.NAME);
            this.state = 163;
            this.match(TspParser.T__14);
            this.state = 164;
            this.expression();
            this.state = 165;
            this.match(TspParser.T__11);
            this.state = 166;
            this.expression();
            this.state = 169;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if(_la===TspParser.T__11) {
                this.state = 167;
                this.match(TspParser.T__11);
                this.state = 168;
                this.expression();
            }

            this.state = 171;
            this.match(TspParser.T__1);
            this.state = 178;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << TspParser.T__1) | (1 << TspParser.T__3) | (1 << TspParser.T__4) | (1 << TspParser.T__6) | (1 << TspParser.T__10) | (1 << TspParser.T__12) | (1 << TspParser.T__13) | (1 << TspParser.T__16) | (1 << TspParser.T__19))) !== 0) || _la===TspParser.LOCAL || _la===TspParser.NAME) {
                this.state = 172;
                this.statement();
                this.state = 174;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if(_la===TspParser.T__0) {
                    this.state = 173;
                    this.match(TspParser.T__0);
                }

                this.state = 180;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            this.state = 181;
            this.match(TspParser.T__2);
            break;

        case 10:
            this.enterOuterAlt(localctx, 10);
            this.state = 183;
            this.match(TspParser.T__13);
            this.state = 184;
            this.match(TspParser.NAME);
            this.state = 189;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while(_la===TspParser.T__11) {
                this.state = 185;
                this.match(TspParser.T__11);
                this.state = 186;
                this.match(TspParser.NAME);
                this.state = 191;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            this.state = 192;
            this.match(TspParser.T__15);
            this.state = 193;
            this.expression();
            this.state = 198;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while(_la===TspParser.T__11) {
                this.state = 194;
                this.match(TspParser.T__11);
                this.state = 195;
                this.expression();
                this.state = 200;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            this.state = 201;
            this.match(TspParser.T__1);
            this.state = 208;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << TspParser.T__1) | (1 << TspParser.T__3) | (1 << TspParser.T__4) | (1 << TspParser.T__6) | (1 << TspParser.T__10) | (1 << TspParser.T__12) | (1 << TspParser.T__13) | (1 << TspParser.T__16) | (1 << TspParser.T__19))) !== 0) || _la===TspParser.LOCAL || _la===TspParser.NAME) {
                this.state = 202;
                this.statement();
                this.state = 204;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if(_la===TspParser.T__0) {
                    this.state = 203;
                    this.match(TspParser.T__0);
                }

                this.state = 210;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            this.state = 211;
            this.match(TspParser.T__2);
            break;

        case 11:
            this.enterOuterAlt(localctx, 11);
            this.state = 213;
            this.match(TspParser.T__16);
            this.state = 214;
            this.match(TspParser.NAME);
            this.state = 219;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while(_la===TspParser.T__17) {
                this.state = 215;
                this.match(TspParser.T__17);
                this.state = 216;
                this.match(TspParser.NAME);
                this.state = 221;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            this.state = 224;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if(_la===TspParser.T__18) {
                this.state = 222;
                this.match(TspParser.T__18);
                this.state = 223;
                this.match(TspParser.NAME);
            }

            this.state = 226;
            this.match(TspParser.T__19);
            this.state = 240;
            this._errHandler.sync(this);
            switch (this._input.LA(1)) {
            case TspParser.NAME:
            	this.state = 227;
            	this.match(TspParser.NAME);
            	this.state = 232;
            	this._errHandler.sync(this);
            	var _alt = this._interp.adaptivePredict(this._input,27,this._ctx)
            	while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            	    if(_alt===1) {
            	        this.state = 228;
            	        this.match(TspParser.T__11);
            	        this.state = 229;
            	        this.match(TspParser.NAME);
            	    }
            	    this.state = 234;
            	    this._errHandler.sync(this);
            	    _alt = this._interp.adaptivePredict(this._input,27,this._ctx);
            	}

            	this.state = 237;
            	this._errHandler.sync(this);
            	_la = this._input.LA(1);
            	if(_la===TspParser.T__11) {
            	    this.state = 235;
            	    this.match(TspParser.T__11);
            	    this.state = 236;
            	    this.match(TspParser.VARARG);
            	}

            	break;
            case TspParser.VARARG:
            	this.state = 239;
            	this.match(TspParser.VARARG);
            	break;
            case TspParser.T__20:
            	break;
            default:
            	break;
            }
            this.state = 242;
            this.match(TspParser.T__20);
            this.state = 249;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << TspParser.T__1) | (1 << TspParser.T__3) | (1 << TspParser.T__4) | (1 << TspParser.T__6) | (1 << TspParser.T__10) | (1 << TspParser.T__12) | (1 << TspParser.T__13) | (1 << TspParser.T__16) | (1 << TspParser.T__19))) !== 0) || _la===TspParser.LOCAL || _la===TspParser.NAME) {
                this.state = 243;
                this.statement();
                this.state = 245;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if(_la===TspParser.T__0) {
                    this.state = 244;
                    this.match(TspParser.T__0);
                }

                this.state = 251;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            this.state = 252;
            this.match(TspParser.T__2);
            break;

        case 12:
            this.enterOuterAlt(localctx, 12);
            this.state = 253;
            this.match(TspParser.LOCAL);
            this.state = 254;
            this.match(TspParser.T__16);
            this.state = 255;
            this.match(TspParser.NAME);
            this.state = 256;
            this.match(TspParser.T__19);
            this.state = 270;
            this._errHandler.sync(this);
            switch (this._input.LA(1)) {
            case TspParser.NAME:
            	this.state = 257;
            	this.match(TspParser.NAME);
            	this.state = 262;
            	this._errHandler.sync(this);
            	var _alt = this._interp.adaptivePredict(this._input,32,this._ctx)
            	while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            	    if(_alt===1) {
            	        this.state = 258;
            	        this.match(TspParser.T__11);
            	        this.state = 259;
            	        this.match(TspParser.NAME);
            	    }
            	    this.state = 264;
            	    this._errHandler.sync(this);
            	    _alt = this._interp.adaptivePredict(this._input,32,this._ctx);
            	}

            	this.state = 267;
            	this._errHandler.sync(this);
            	_la = this._input.LA(1);
            	if(_la===TspParser.T__11) {
            	    this.state = 265;
            	    this.match(TspParser.T__11);
            	    this.state = 266;
            	    this.match(TspParser.VARARG);
            	}

            	break;
            case TspParser.VARARG:
            	this.state = 269;
            	this.match(TspParser.VARARG);
            	break;
            case TspParser.T__20:
            	break;
            default:
            	break;
            }
            this.state = 272;
            this.match(TspParser.T__20);
            this.state = 279;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << TspParser.T__1) | (1 << TspParser.T__3) | (1 << TspParser.T__4) | (1 << TspParser.T__6) | (1 << TspParser.T__10) | (1 << TspParser.T__12) | (1 << TspParser.T__13) | (1 << TspParser.T__16) | (1 << TspParser.T__19))) !== 0) || _la===TspParser.LOCAL || _la===TspParser.NAME) {
                this.state = 273;
                this.statement();
                this.state = 275;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if(_la===TspParser.T__0) {
                    this.state = 274;
                    this.match(TspParser.T__0);
                }

                this.state = 281;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            this.state = 282;
            this.match(TspParser.T__2);
            break;

        case 13:
            this.enterOuterAlt(localctx, 13);
            this.state = 283;
            this.match(TspParser.LOCAL);
            this.state = 284;
            this.match(TspParser.NAME);
            this.state = 289;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while(_la===TspParser.T__11) {
                this.state = 285;
                this.match(TspParser.T__11);
                this.state = 286;
                this.match(TspParser.NAME);
                this.state = 291;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            this.state = 301;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if(_la===TspParser.T__14) {
                this.state = 292;
                this.match(TspParser.T__14);
                this.state = 293;
                this.expression();
                this.state = 298;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while(_la===TspParser.T__11) {
                    this.state = 294;
                    this.match(TspParser.T__11);
                    this.state = 295;
                    this.expression();
                    this.state = 300;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                }
            }

            break;

        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function AssignmentContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = TspParser.RULE_assignment;
    return this;
}

AssignmentContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
AssignmentContext.prototype.constructor = AssignmentContext;

AssignmentContext.prototype.variable = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(VariableContext);
    } else {
        return this.getTypedRuleContext(VariableContext,i);
    }
};

AssignmentContext.prototype.expression = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExpressionContext);
    } else {
        return this.getTypedRuleContext(ExpressionContext,i);
    }
};

AssignmentContext.prototype.enterRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.enterAssignment(this);
	}
};

AssignmentContext.prototype.exitRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.exitAssignment(this);
	}
};




TspParser.AssignmentContext = AssignmentContext;

TspParser.prototype.assignment = function() {

    var localctx = new AssignmentContext(this, this._ctx, this.state);
    this.enterRule(localctx, 4, TspParser.RULE_assignment);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 305;
        this.variable();
        this.state = 310;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===TspParser.T__11) {
            this.state = 306;
            this.match(TspParser.T__11);
            this.state = 307;
            this.variable();
            this.state = 312;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 313;
        this.match(TspParser.T__14);
        this.state = 314;
        this.expression();
        this.state = 319;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===TspParser.T__11) {
            this.state = 315;
            this.match(TspParser.T__11);
            this.state = 316;
            this.expression();
            this.state = 321;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function ValueContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = TspParser.RULE_value;
    return this;
}

ValueContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ValueContext.prototype.constructor = ValueContext;

ValueContext.prototype.NIL = function() {
    return this.getToken(TspParser.NIL, 0);
};

ValueContext.prototype.BOOLEAN = function() {
    return this.getToken(TspParser.BOOLEAN, 0);
};

ValueContext.prototype.number = function() {
    return this.getTypedRuleContext(NumberContext,0);
};

ValueContext.prototype.string = function() {
    return this.getTypedRuleContext(StringContext,0);
};

ValueContext.prototype.variable = function() {
    return this.getTypedRuleContext(VariableContext,0);
};

ValueContext.prototype.functionCall = function() {
    return this.getTypedRuleContext(FunctionCallContext,0);
};

ValueContext.prototype.tableConstructor = function() {
    return this.getTypedRuleContext(TableConstructorContext,0);
};

ValueContext.prototype.expression = function() {
    return this.getTypedRuleContext(ExpressionContext,0);
};

ValueContext.prototype.enterRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.enterValue(this);
	}
};

ValueContext.prototype.exitRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.exitValue(this);
	}
};




TspParser.ValueContext = ValueContext;

TspParser.prototype.value = function() {

    var localctx = new ValueContext(this, this._ctx, this.state);
    this.enterRule(localctx, 6, TspParser.RULE_value);
    try {
        this.state = 333;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,43,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 322;
            this.match(TspParser.NIL);
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 323;
            this.match(TspParser.BOOLEAN);
            break;

        case 3:
            this.enterOuterAlt(localctx, 3);
            this.state = 324;
            this.number();
            break;

        case 4:
            this.enterOuterAlt(localctx, 4);
            this.state = 325;
            this.string();
            break;

        case 5:
            this.enterOuterAlt(localctx, 5);
            this.state = 326;
            this.variable();
            break;

        case 6:
            this.enterOuterAlt(localctx, 6);
            this.state = 327;
            this.functionCall();
            break;

        case 7:
            this.enterOuterAlt(localctx, 7);
            this.state = 328;
            this.tableConstructor();
            break;

        case 8:
            this.enterOuterAlt(localctx, 8);
            this.state = 329;
            this.match(TspParser.T__19);
            this.state = 330;
            this.expression();
            this.state = 331;
            this.match(TspParser.T__20);
            break;

        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function ExpressionContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = TspParser.RULE_expression;
    return this;
}

ExpressionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ExpressionContext.prototype.constructor = ExpressionContext;

ExpressionContext.prototype.value = function() {
    return this.getTypedRuleContext(ValueContext,0);
};

ExpressionContext.prototype.NAME = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(TspParser.NAME);
    } else {
        return this.getToken(TspParser.NAME, i);
    }
};


ExpressionContext.prototype.VARARG = function() {
    return this.getToken(TspParser.VARARG, 0);
};

ExpressionContext.prototype.statement = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(StatementContext);
    } else {
        return this.getTypedRuleContext(StatementContext,i);
    }
};

ExpressionContext.prototype.expression = function() {
    return this.getTypedRuleContext(ExpressionContext,0);
};

ExpressionContext.prototype.operatorOr = function() {
    return this.getTypedRuleContext(OperatorOrContext,0);
};

ExpressionContext.prototype.operatorAnd = function() {
    return this.getTypedRuleContext(OperatorAndContext,0);
};

ExpressionContext.prototype.operatorComparison = function() {
    return this.getTypedRuleContext(OperatorComparisonContext,0);
};

ExpressionContext.prototype.operatorBitwiseOr = function() {
    return this.getTypedRuleContext(OperatorBitwiseOrContext,0);
};

ExpressionContext.prototype.operatorBitwiseXor = function() {
    return this.getTypedRuleContext(OperatorBitwiseXorContext,0);
};

ExpressionContext.prototype.operatorBitwiseAnd = function() {
    return this.getTypedRuleContext(OperatorBitwiseAndContext,0);
};

ExpressionContext.prototype.operatorBitwiseShift = function() {
    return this.getTypedRuleContext(OperatorBitwiseShiftContext,0);
};

ExpressionContext.prototype.operatorStrcat = function() {
    return this.getTypedRuleContext(OperatorStrcatContext,0);
};

ExpressionContext.prototype.operatorAddSub = function() {
    return this.getTypedRuleContext(OperatorAddSubContext,0);
};

ExpressionContext.prototype.operatorMulDiv = function() {
    return this.getTypedRuleContext(OperatorMulDivContext,0);
};

ExpressionContext.prototype.operatorPower = function() {
    return this.getTypedRuleContext(OperatorPowerContext,0);
};

ExpressionContext.prototype.operatorUnary = function() {
    return this.getTypedRuleContext(OperatorUnaryContext,0);
};

ExpressionContext.prototype.enterRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.enterExpression(this);
	}
};

ExpressionContext.prototype.exitRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.exitExpression(this);
	}
};




TspParser.ExpressionContext = ExpressionContext;

TspParser.prototype.expression = function() {

    var localctx = new ExpressionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 8, TspParser.RULE_expression);
    var _la = 0; // Token type
    try {
        this.state = 383;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,50,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 335;
            this.value();
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 336;
            this.match(TspParser.T__16);
            this.state = 337;
            this.match(TspParser.T__19);
            this.state = 351;
            this._errHandler.sync(this);
            switch (this._input.LA(1)) {
            case TspParser.NAME:
            	this.state = 338;
            	this.match(TspParser.NAME);
            	this.state = 343;
            	this._errHandler.sync(this);
            	var _alt = this._interp.adaptivePredict(this._input,44,this._ctx)
            	while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            	    if(_alt===1) {
            	        this.state = 339;
            	        this.match(TspParser.T__11);
            	        this.state = 340;
            	        this.match(TspParser.NAME);
            	    }
            	    this.state = 345;
            	    this._errHandler.sync(this);
            	    _alt = this._interp.adaptivePredict(this._input,44,this._ctx);
            	}

            	this.state = 348;
            	this._errHandler.sync(this);
            	_la = this._input.LA(1);
            	if(_la===TspParser.T__11) {
            	    this.state = 346;
            	    this.match(TspParser.T__11);
            	    this.state = 347;
            	    this.match(TspParser.VARARG);
            	}

            	break;
            case TspParser.VARARG:
            	this.state = 350;
            	this.match(TspParser.VARARG);
            	break;
            case TspParser.T__20:
            	break;
            default:
            	break;
            }
            this.state = 353;
            this.match(TspParser.T__20);
            this.state = 360;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << TspParser.T__1) | (1 << TspParser.T__3) | (1 << TspParser.T__4) | (1 << TspParser.T__6) | (1 << TspParser.T__10) | (1 << TspParser.T__12) | (1 << TspParser.T__13) | (1 << TspParser.T__16) | (1 << TspParser.T__19))) !== 0) || _la===TspParser.LOCAL || _la===TspParser.NAME) {
                this.state = 354;
                this.statement();
                this.state = 356;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if(_la===TspParser.T__0) {
                    this.state = 355;
                    this.match(TspParser.T__0);
                }

                this.state = 362;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            this.state = 363;
            this.match(TspParser.T__2);
            break;

        case 3:
            this.enterOuterAlt(localctx, 3);
            this.state = 364;
            this.value();
            this.state = 376;
            this._errHandler.sync(this);
            switch(this._input.LA(1)) {
            case TspParser.T__25:
                this.state = 365;
                this.operatorOr();
                break;
            case TspParser.T__26:
                this.state = 366;
                this.operatorAnd();
                break;
            case TspParser.T__27:
            case TspParser.T__28:
            case TspParser.T__29:
            case TspParser.T__30:
            case TspParser.T__31:
            case TspParser.T__32:
            case TspParser.T__33:
                this.state = 367;
                this.operatorComparison();
                break;
            case TspParser.T__40:
                this.state = 368;
                this.operatorBitwiseOr();
                break;
            case TspParser.T__41:
                this.state = 369;
                this.operatorBitwiseXor();
                break;
            case TspParser.T__39:
                this.state = 370;
                this.operatorBitwiseAnd();
                break;
            case TspParser.T__42:
            case TspParser.T__43:
                this.state = 371;
                this.operatorBitwiseShift();
                break;
            case TspParser.T__34:
                this.state = 372;
                this.operatorStrcat();
                break;
            case TspParser.T__35:
            case TspParser.T__36:
                this.state = 373;
                this.operatorAddSub();
                break;
            case TspParser.T__37:
            case TspParser.T__38:
                this.state = 374;
                this.operatorMulDiv();
                break;
            case TspParser.T__46:
                this.state = 375;
                this.operatorPower();
                break;
            default:
                throw new antlr4.error.NoViableAltException(this);
            }
            this.state = 378;
            this.expression();
            break;

        case 4:
            this.enterOuterAlt(localctx, 4);
            this.state = 380;
            this.operatorUnary();
            this.state = 381;
            this.expression();
            break;

        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function PrefixContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = TspParser.RULE_prefix;
    return this;
}

PrefixContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
PrefixContext.prototype.constructor = PrefixContext;

PrefixContext.prototype.expression = function() {
    return this.getTypedRuleContext(ExpressionContext,0);
};

PrefixContext.prototype.NAME = function() {
    return this.getToken(TspParser.NAME, 0);
};

PrefixContext.prototype.enterRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.enterPrefix(this);
	}
};

PrefixContext.prototype.exitRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.exitPrefix(this);
	}
};




TspParser.PrefixContext = PrefixContext;

TspParser.prototype.prefix = function() {

    var localctx = new PrefixContext(this, this._ctx, this.state);
    this.enterRule(localctx, 10, TspParser.RULE_prefix);
    try {
        this.state = 390;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case TspParser.T__19:
            this.enterOuterAlt(localctx, 1);
            this.state = 385;
            this.match(TspParser.T__19);
            this.state = 386;
            this.expression();
            this.state = 387;
            this.match(TspParser.T__20);
            break;
        case TspParser.NAME:
            this.enterOuterAlt(localctx, 2);
            this.state = 389;
            this.match(TspParser.NAME);
            break;
        default:
            throw new antlr4.error.NoViableAltException(this);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function SuffixContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = TspParser.RULE_suffix;
    return this;
}

SuffixContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
SuffixContext.prototype.constructor = SuffixContext;

SuffixContext.prototype.args = function() {
    return this.getTypedRuleContext(ArgsContext,0);
};

SuffixContext.prototype.NAME = function() {
    return this.getToken(TspParser.NAME, 0);
};

SuffixContext.prototype.index = function() {
    return this.getTypedRuleContext(IndexContext,0);
};

SuffixContext.prototype.enterRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.enterSuffix(this);
	}
};

SuffixContext.prototype.exitRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.exitSuffix(this);
	}
};




TspParser.SuffixContext = SuffixContext;

TspParser.prototype.suffix = function() {

    var localctx = new SuffixContext(this, this._ctx, this.state);
    this.enterRule(localctx, 12, TspParser.RULE_suffix);
    var _la = 0; // Token type
    try {
        this.state = 398;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case TspParser.T__18:
        case TspParser.T__19:
        case TspParser.T__23:
        case TspParser.NORMALSTRING:
        case TspParser.CHARSTRING:
        case TspParser.LONGSTRING:
            this.enterOuterAlt(localctx, 1);
            this.state = 394;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if(_la===TspParser.T__18) {
                this.state = 392;
                this.match(TspParser.T__18);
                this.state = 393;
                this.match(TspParser.NAME);
            }

            this.state = 396;
            this.args();
            break;
        case TspParser.T__17:
        case TspParser.T__21:
            this.enterOuterAlt(localctx, 2);
            this.state = 397;
            this.index();
            break;
        default:
            throw new antlr4.error.NoViableAltException(this);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function IndexContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = TspParser.RULE_index;
    return this;
}

IndexContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
IndexContext.prototype.constructor = IndexContext;

IndexContext.prototype.expression = function() {
    return this.getTypedRuleContext(ExpressionContext,0);
};

IndexContext.prototype.NAME = function() {
    return this.getToken(TspParser.NAME, 0);
};

IndexContext.prototype.enterRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.enterIndex(this);
	}
};

IndexContext.prototype.exitRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.exitIndex(this);
	}
};




TspParser.IndexContext = IndexContext;

TspParser.prototype.index = function() {

    var localctx = new IndexContext(this, this._ctx, this.state);
    this.enterRule(localctx, 14, TspParser.RULE_index);
    try {
        this.state = 406;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case TspParser.T__21:
            this.enterOuterAlt(localctx, 1);
            this.state = 400;
            this.match(TspParser.T__21);
            this.state = 401;
            this.expression();
            this.state = 402;
            this.match(TspParser.T__22);
            break;
        case TspParser.T__17:
            this.enterOuterAlt(localctx, 2);
            this.state = 404;
            this.match(TspParser.T__17);
            this.state = 405;
            this.match(TspParser.NAME);
            break;
        default:
            throw new antlr4.error.NoViableAltException(this);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function VariableContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = TspParser.RULE_variable;
    return this;
}

VariableContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
VariableContext.prototype.constructor = VariableContext;

VariableContext.prototype.prefix = function() {
    return this.getTypedRuleContext(PrefixContext,0);
};

VariableContext.prototype.index = function() {
    return this.getTypedRuleContext(IndexContext,0);
};

VariableContext.prototype.suffix = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(SuffixContext);
    } else {
        return this.getTypedRuleContext(SuffixContext,i);
    }
};

VariableContext.prototype.NAME = function() {
    return this.getToken(TspParser.NAME, 0);
};

VariableContext.prototype.enterRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.enterVariable(this);
	}
};

VariableContext.prototype.exitRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.exitVariable(this);
	}
};




TspParser.VariableContext = VariableContext;

TspParser.prototype.variable = function() {

    var localctx = new VariableContext(this, this._ctx, this.state);
    this.enterRule(localctx, 16, TspParser.RULE_variable);
    try {
        this.state = 418;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,56,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 408;
            this.prefix();
            this.state = 412;
            this._errHandler.sync(this);
            var _alt = this._interp.adaptivePredict(this._input,55,this._ctx)
            while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
                if(_alt===1) {
                    this.state = 409;
                    this.suffix();
                }
                this.state = 414;
                this._errHandler.sync(this);
                _alt = this._interp.adaptivePredict(this._input,55,this._ctx);
            }

            this.state = 415;
            this.index();
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 417;
            this.match(TspParser.NAME);
            break;

        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function FunctionCallContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = TspParser.RULE_functionCall;
    return this;
}

FunctionCallContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
FunctionCallContext.prototype.constructor = FunctionCallContext;

FunctionCallContext.prototype.prefix = function() {
    return this.getTypedRuleContext(PrefixContext,0);
};

FunctionCallContext.prototype.args = function() {
    return this.getTypedRuleContext(ArgsContext,0);
};

FunctionCallContext.prototype.suffix = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(SuffixContext);
    } else {
        return this.getTypedRuleContext(SuffixContext,i);
    }
};

FunctionCallContext.prototype.NAME = function() {
    return this.getToken(TspParser.NAME, 0);
};

FunctionCallContext.prototype.enterRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.enterFunctionCall(this);
	}
};

FunctionCallContext.prototype.exitRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.exitFunctionCall(this);
	}
};




TspParser.FunctionCallContext = FunctionCallContext;

TspParser.prototype.functionCall = function() {

    var localctx = new FunctionCallContext(this, this._ctx, this.state);
    this.enterRule(localctx, 18, TspParser.RULE_functionCall);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 420;
        this.prefix();
        this.state = 424;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,57,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                this.state = 421;
                this.suffix();
            }
            this.state = 426;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,57,this._ctx);
        }

        this.state = 429;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===TspParser.T__18) {
            this.state = 427;
            this.match(TspParser.T__18);
            this.state = 428;
            this.match(TspParser.NAME);
        }

        this.state = 431;
        this.args();
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function ArgsContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = TspParser.RULE_args;
    return this;
}

ArgsContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ArgsContext.prototype.constructor = ArgsContext;

ArgsContext.prototype.expression = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExpressionContext);
    } else {
        return this.getTypedRuleContext(ExpressionContext,i);
    }
};

ArgsContext.prototype.tableConstructor = function() {
    return this.getTypedRuleContext(TableConstructorContext,0);
};

ArgsContext.prototype.string = function() {
    return this.getTypedRuleContext(StringContext,0);
};

ArgsContext.prototype.enterRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.enterArgs(this);
	}
};

ArgsContext.prototype.exitRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.exitArgs(this);
	}
};




TspParser.ArgsContext = ArgsContext;

TspParser.prototype.args = function() {

    var localctx = new ArgsContext(this, this._ctx, this.state);
    this.enterRule(localctx, 20, TspParser.RULE_args);
    var _la = 0; // Token type
    try {
        this.state = 447;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case TspParser.T__19:
            this.enterOuterAlt(localctx, 1);
            this.state = 433;
            this.match(TspParser.T__19);
            this.state = 442;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << TspParser.T__16) | (1 << TspParser.T__19) | (1 << TspParser.T__23))) !== 0) || ((((_la - 37)) & ~0x1f) == 0 && ((1 << (_la - 37)) & ((1 << (TspParser.T__36 - 37)) | (1 << (TspParser.T__44 - 37)) | (1 << (TspParser.T__45 - 37)) | (1 << (TspParser.NIL - 37)) | (1 << (TspParser.BOOLEAN - 37)) | (1 << (TspParser.NAME - 37)) | (1 << (TspParser.NORMALSTRING - 37)) | (1 << (TspParser.CHARSTRING - 37)) | (1 << (TspParser.LONGSTRING - 37)) | (1 << (TspParser.INT - 37)) | (1 << (TspParser.HEX - 37)) | (1 << (TspParser.FLOAT - 37)))) !== 0)) {
                this.state = 434;
                this.expression();
                this.state = 439;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while(_la===TspParser.T__11) {
                    this.state = 435;
                    this.match(TspParser.T__11);
                    this.state = 436;
                    this.expression();
                    this.state = 441;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                }
            }

            this.state = 444;
            this.match(TspParser.T__20);
            break;
        case TspParser.T__23:
            this.enterOuterAlt(localctx, 2);
            this.state = 445;
            this.tableConstructor();
            break;
        case TspParser.NORMALSTRING:
        case TspParser.CHARSTRING:
        case TspParser.LONGSTRING:
            this.enterOuterAlt(localctx, 3);
            this.state = 446;
            this.string();
            break;
        default:
            throw new antlr4.error.NoViableAltException(this);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function TableConstructorContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = TspParser.RULE_tableConstructor;
    return this;
}

TableConstructorContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
TableConstructorContext.prototype.constructor = TableConstructorContext;

TableConstructorContext.prototype.fieldList = function() {
    return this.getTypedRuleContext(FieldListContext,0);
};

TableConstructorContext.prototype.enterRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.enterTableConstructor(this);
	}
};

TableConstructorContext.prototype.exitRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.exitTableConstructor(this);
	}
};




TspParser.TableConstructorContext = TableConstructorContext;

TspParser.prototype.tableConstructor = function() {

    var localctx = new TableConstructorContext(this, this._ctx, this.state);
    this.enterRule(localctx, 22, TspParser.RULE_tableConstructor);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 449;
        this.match(TspParser.T__23);
        this.state = 451;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << TspParser.T__16) | (1 << TspParser.T__19) | (1 << TspParser.T__21) | (1 << TspParser.T__23))) !== 0) || ((((_la - 37)) & ~0x1f) == 0 && ((1 << (_la - 37)) & ((1 << (TspParser.T__36 - 37)) | (1 << (TspParser.T__44 - 37)) | (1 << (TspParser.T__45 - 37)) | (1 << (TspParser.NIL - 37)) | (1 << (TspParser.BOOLEAN - 37)) | (1 << (TspParser.NAME - 37)) | (1 << (TspParser.NORMALSTRING - 37)) | (1 << (TspParser.CHARSTRING - 37)) | (1 << (TspParser.LONGSTRING - 37)) | (1 << (TspParser.INT - 37)) | (1 << (TspParser.HEX - 37)) | (1 << (TspParser.FLOAT - 37)))) !== 0)) {
            this.state = 450;
            this.fieldList();
        }

        this.state = 453;
        this.match(TspParser.T__24);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function FieldListContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = TspParser.RULE_fieldList;
    return this;
}

FieldListContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
FieldListContext.prototype.constructor = FieldListContext;

FieldListContext.prototype.field = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(FieldContext);
    } else {
        return this.getTypedRuleContext(FieldContext,i);
    }
};

FieldListContext.prototype.enterRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.enterFieldList(this);
	}
};

FieldListContext.prototype.exitRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.exitFieldList(this);
	}
};




TspParser.FieldListContext = FieldListContext;

TspParser.prototype.fieldList = function() {

    var localctx = new FieldListContext(this, this._ctx, this.state);
    this.enterRule(localctx, 24, TspParser.RULE_fieldList);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 455;
        this.field();
        this.state = 460;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,63,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                this.state = 456;
                _la = this._input.LA(1);
                if(!(_la===TspParser.T__0 || _la===TspParser.T__11)) {
                this._errHandler.recoverInline(this);
                }
                else {
                	this._errHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 457;
                this.field();
            }
            this.state = 462;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,63,this._ctx);
        }

        this.state = 464;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===TspParser.T__0 || _la===TspParser.T__11) {
            this.state = 463;
            _la = this._input.LA(1);
            if(!(_la===TspParser.T__0 || _la===TspParser.T__11)) {
            this._errHandler.recoverInline(this);
            }
            else {
            	this._errHandler.reportMatch(this);
                this.consume();
            }
        }

    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function FieldContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = TspParser.RULE_field;
    return this;
}

FieldContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
FieldContext.prototype.constructor = FieldContext;

FieldContext.prototype.expression = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExpressionContext);
    } else {
        return this.getTypedRuleContext(ExpressionContext,i);
    }
};

FieldContext.prototype.NAME = function() {
    return this.getToken(TspParser.NAME, 0);
};

FieldContext.prototype.enterRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.enterField(this);
	}
};

FieldContext.prototype.exitRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.exitField(this);
	}
};




TspParser.FieldContext = FieldContext;

TspParser.prototype.field = function() {

    var localctx = new FieldContext(this, this._ctx, this.state);
    this.enterRule(localctx, 26, TspParser.RULE_field);
    try {
        this.state = 476;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,65,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 466;
            this.match(TspParser.T__21);
            this.state = 467;
            this.expression();
            this.state = 468;
            this.match(TspParser.T__22);
            this.state = 469;
            this.match(TspParser.T__14);
            this.state = 470;
            this.expression();
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 472;
            this.match(TspParser.NAME);
            this.state = 473;
            this.match(TspParser.T__14);
            this.state = 474;
            this.expression();
            break;

        case 3:
            this.enterOuterAlt(localctx, 3);
            this.state = 475;
            this.expression();
            break;

        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function OperatorOrContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = TspParser.RULE_operatorOr;
    return this;
}

OperatorOrContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
OperatorOrContext.prototype.constructor = OperatorOrContext;


OperatorOrContext.prototype.enterRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.enterOperatorOr(this);
	}
};

OperatorOrContext.prototype.exitRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.exitOperatorOr(this);
	}
};




TspParser.OperatorOrContext = OperatorOrContext;

TspParser.prototype.operatorOr = function() {

    var localctx = new OperatorOrContext(this, this._ctx, this.state);
    this.enterRule(localctx, 28, TspParser.RULE_operatorOr);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 478;
        this.match(TspParser.T__25);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function OperatorAndContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = TspParser.RULE_operatorAnd;
    return this;
}

OperatorAndContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
OperatorAndContext.prototype.constructor = OperatorAndContext;


OperatorAndContext.prototype.enterRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.enterOperatorAnd(this);
	}
};

OperatorAndContext.prototype.exitRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.exitOperatorAnd(this);
	}
};




TspParser.OperatorAndContext = OperatorAndContext;

TspParser.prototype.operatorAnd = function() {

    var localctx = new OperatorAndContext(this, this._ctx, this.state);
    this.enterRule(localctx, 30, TspParser.RULE_operatorAnd);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 480;
        this.match(TspParser.T__26);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function OperatorComparisonContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = TspParser.RULE_operatorComparison;
    return this;
}

OperatorComparisonContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
OperatorComparisonContext.prototype.constructor = OperatorComparisonContext;


OperatorComparisonContext.prototype.enterRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.enterOperatorComparison(this);
	}
};

OperatorComparisonContext.prototype.exitRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.exitOperatorComparison(this);
	}
};




TspParser.OperatorComparisonContext = OperatorComparisonContext;

TspParser.prototype.operatorComparison = function() {

    var localctx = new OperatorComparisonContext(this, this._ctx, this.state);
    this.enterRule(localctx, 32, TspParser.RULE_operatorComparison);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 482;
        _la = this._input.LA(1);
        if(!(((((_la - 28)) & ~0x1f) == 0 && ((1 << (_la - 28)) & ((1 << (TspParser.T__27 - 28)) | (1 << (TspParser.T__28 - 28)) | (1 << (TspParser.T__29 - 28)) | (1 << (TspParser.T__30 - 28)) | (1 << (TspParser.T__31 - 28)) | (1 << (TspParser.T__32 - 28)) | (1 << (TspParser.T__33 - 28)))) !== 0))) {
        this._errHandler.recoverInline(this);
        }
        else {
        	this._errHandler.reportMatch(this);
            this.consume();
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function OperatorStrcatContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = TspParser.RULE_operatorStrcat;
    return this;
}

OperatorStrcatContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
OperatorStrcatContext.prototype.constructor = OperatorStrcatContext;


OperatorStrcatContext.prototype.enterRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.enterOperatorStrcat(this);
	}
};

OperatorStrcatContext.prototype.exitRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.exitOperatorStrcat(this);
	}
};




TspParser.OperatorStrcatContext = OperatorStrcatContext;

TspParser.prototype.operatorStrcat = function() {

    var localctx = new OperatorStrcatContext(this, this._ctx, this.state);
    this.enterRule(localctx, 34, TspParser.RULE_operatorStrcat);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 484;
        this.match(TspParser.T__34);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function OperatorAddSubContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = TspParser.RULE_operatorAddSub;
    return this;
}

OperatorAddSubContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
OperatorAddSubContext.prototype.constructor = OperatorAddSubContext;


OperatorAddSubContext.prototype.enterRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.enterOperatorAddSub(this);
	}
};

OperatorAddSubContext.prototype.exitRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.exitOperatorAddSub(this);
	}
};




TspParser.OperatorAddSubContext = OperatorAddSubContext;

TspParser.prototype.operatorAddSub = function() {

    var localctx = new OperatorAddSubContext(this, this._ctx, this.state);
    this.enterRule(localctx, 36, TspParser.RULE_operatorAddSub);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 486;
        _la = this._input.LA(1);
        if(!(_la===TspParser.T__35 || _la===TspParser.T__36)) {
        this._errHandler.recoverInline(this);
        }
        else {
        	this._errHandler.reportMatch(this);
            this.consume();
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function OperatorMulDivContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = TspParser.RULE_operatorMulDiv;
    return this;
}

OperatorMulDivContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
OperatorMulDivContext.prototype.constructor = OperatorMulDivContext;


OperatorMulDivContext.prototype.enterRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.enterOperatorMulDiv(this);
	}
};

OperatorMulDivContext.prototype.exitRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.exitOperatorMulDiv(this);
	}
};




TspParser.OperatorMulDivContext = OperatorMulDivContext;

TspParser.prototype.operatorMulDiv = function() {

    var localctx = new OperatorMulDivContext(this, this._ctx, this.state);
    this.enterRule(localctx, 38, TspParser.RULE_operatorMulDiv);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 488;
        _la = this._input.LA(1);
        if(!(_la===TspParser.T__37 || _la===TspParser.T__38)) {
        this._errHandler.recoverInline(this);
        }
        else {
        	this._errHandler.reportMatch(this);
            this.consume();
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function OperatorBitwiseAndContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = TspParser.RULE_operatorBitwiseAnd;
    return this;
}

OperatorBitwiseAndContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
OperatorBitwiseAndContext.prototype.constructor = OperatorBitwiseAndContext;


OperatorBitwiseAndContext.prototype.enterRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.enterOperatorBitwiseAnd(this);
	}
};

OperatorBitwiseAndContext.prototype.exitRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.exitOperatorBitwiseAnd(this);
	}
};




TspParser.OperatorBitwiseAndContext = OperatorBitwiseAndContext;

TspParser.prototype.operatorBitwiseAnd = function() {

    var localctx = new OperatorBitwiseAndContext(this, this._ctx, this.state);
    this.enterRule(localctx, 40, TspParser.RULE_operatorBitwiseAnd);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 490;
        this.match(TspParser.T__39);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function OperatorBitwiseOrContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = TspParser.RULE_operatorBitwiseOr;
    return this;
}

OperatorBitwiseOrContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
OperatorBitwiseOrContext.prototype.constructor = OperatorBitwiseOrContext;


OperatorBitwiseOrContext.prototype.enterRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.enterOperatorBitwiseOr(this);
	}
};

OperatorBitwiseOrContext.prototype.exitRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.exitOperatorBitwiseOr(this);
	}
};




TspParser.OperatorBitwiseOrContext = OperatorBitwiseOrContext;

TspParser.prototype.operatorBitwiseOr = function() {

    var localctx = new OperatorBitwiseOrContext(this, this._ctx, this.state);
    this.enterRule(localctx, 42, TspParser.RULE_operatorBitwiseOr);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 492;
        this.match(TspParser.T__40);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function OperatorBitwiseXorContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = TspParser.RULE_operatorBitwiseXor;
    return this;
}

OperatorBitwiseXorContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
OperatorBitwiseXorContext.prototype.constructor = OperatorBitwiseXorContext;


OperatorBitwiseXorContext.prototype.enterRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.enterOperatorBitwiseXor(this);
	}
};

OperatorBitwiseXorContext.prototype.exitRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.exitOperatorBitwiseXor(this);
	}
};




TspParser.OperatorBitwiseXorContext = OperatorBitwiseXorContext;

TspParser.prototype.operatorBitwiseXor = function() {

    var localctx = new OperatorBitwiseXorContext(this, this._ctx, this.state);
    this.enterRule(localctx, 44, TspParser.RULE_operatorBitwiseXor);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 494;
        this.match(TspParser.T__41);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function OperatorBitwiseShiftContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = TspParser.RULE_operatorBitwiseShift;
    return this;
}

OperatorBitwiseShiftContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
OperatorBitwiseShiftContext.prototype.constructor = OperatorBitwiseShiftContext;


OperatorBitwiseShiftContext.prototype.enterRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.enterOperatorBitwiseShift(this);
	}
};

OperatorBitwiseShiftContext.prototype.exitRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.exitOperatorBitwiseShift(this);
	}
};




TspParser.OperatorBitwiseShiftContext = OperatorBitwiseShiftContext;

TspParser.prototype.operatorBitwiseShift = function() {

    var localctx = new OperatorBitwiseShiftContext(this, this._ctx, this.state);
    this.enterRule(localctx, 46, TspParser.RULE_operatorBitwiseShift);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 496;
        _la = this._input.LA(1);
        if(!(_la===TspParser.T__42 || _la===TspParser.T__43)) {
        this._errHandler.recoverInline(this);
        }
        else {
        	this._errHandler.reportMatch(this);
            this.consume();
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function OperatorUnaryContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = TspParser.RULE_operatorUnary;
    return this;
}

OperatorUnaryContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
OperatorUnaryContext.prototype.constructor = OperatorUnaryContext;


OperatorUnaryContext.prototype.enterRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.enterOperatorUnary(this);
	}
};

OperatorUnaryContext.prototype.exitRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.exitOperatorUnary(this);
	}
};




TspParser.OperatorUnaryContext = OperatorUnaryContext;

TspParser.prototype.operatorUnary = function() {

    var localctx = new OperatorUnaryContext(this, this._ctx, this.state);
    this.enterRule(localctx, 48, TspParser.RULE_operatorUnary);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 498;
        _la = this._input.LA(1);
        if(!(((((_la - 37)) & ~0x1f) == 0 && ((1 << (_la - 37)) & ((1 << (TspParser.T__36 - 37)) | (1 << (TspParser.T__44 - 37)) | (1 << (TspParser.T__45 - 37)))) !== 0))) {
        this._errHandler.recoverInline(this);
        }
        else {
        	this._errHandler.reportMatch(this);
            this.consume();
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function OperatorPowerContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = TspParser.RULE_operatorPower;
    return this;
}

OperatorPowerContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
OperatorPowerContext.prototype.constructor = OperatorPowerContext;


OperatorPowerContext.prototype.enterRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.enterOperatorPower(this);
	}
};

OperatorPowerContext.prototype.exitRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.exitOperatorPower(this);
	}
};




TspParser.OperatorPowerContext = OperatorPowerContext;

TspParser.prototype.operatorPower = function() {

    var localctx = new OperatorPowerContext(this, this._ctx, this.state);
    this.enterRule(localctx, 50, TspParser.RULE_operatorPower);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 500;
        this.match(TspParser.T__46);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function NumberContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = TspParser.RULE_number;
    return this;
}

NumberContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
NumberContext.prototype.constructor = NumberContext;

NumberContext.prototype.INT = function() {
    return this.getToken(TspParser.INT, 0);
};

NumberContext.prototype.HEX = function() {
    return this.getToken(TspParser.HEX, 0);
};

NumberContext.prototype.FLOAT = function() {
    return this.getToken(TspParser.FLOAT, 0);
};

NumberContext.prototype.enterRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.enterNumber(this);
	}
};

NumberContext.prototype.exitRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.exitNumber(this);
	}
};




TspParser.NumberContext = NumberContext;

TspParser.prototype.number = function() {

    var localctx = new NumberContext(this, this._ctx, this.state);
    this.enterRule(localctx, 52, TspParser.RULE_number);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 502;
        _la = this._input.LA(1);
        if(!(((((_la - 56)) & ~0x1f) == 0 && ((1 << (_la - 56)) & ((1 << (TspParser.INT - 56)) | (1 << (TspParser.HEX - 56)) | (1 << (TspParser.FLOAT - 56)))) !== 0))) {
        this._errHandler.recoverInline(this);
        }
        else {
        	this._errHandler.reportMatch(this);
            this.consume();
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function StringContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = TspParser.RULE_string;
    return this;
}

StringContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
StringContext.prototype.constructor = StringContext;

StringContext.prototype.NORMALSTRING = function() {
    return this.getToken(TspParser.NORMALSTRING, 0);
};

StringContext.prototype.CHARSTRING = function() {
    return this.getToken(TspParser.CHARSTRING, 0);
};

StringContext.prototype.LONGSTRING = function() {
    return this.getToken(TspParser.LONGSTRING, 0);
};

StringContext.prototype.enterRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.enterString(this);
	}
};

StringContext.prototype.exitRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.exitString(this);
	}
};




TspParser.StringContext = StringContext;

TspParser.prototype.string = function() {

    var localctx = new StringContext(this, this._ctx, this.state);
    this.enterRule(localctx, 54, TspParser.RULE_string);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 504;
        _la = this._input.LA(1);
        if(!(((((_la - 53)) & ~0x1f) == 0 && ((1 << (_la - 53)) & ((1 << (TspParser.NORMALSTRING - 53)) | (1 << (TspParser.CHARSTRING - 53)) | (1 << (TspParser.LONGSTRING - 53)))) !== 0))) {
        this._errHandler.recoverInline(this);
        }
        else {
        	this._errHandler.reportMatch(this);
            this.consume();
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


exports.TspParser = TspParser;
