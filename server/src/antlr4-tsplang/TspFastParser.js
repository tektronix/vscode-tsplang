// Generated from C:\Source\vscode-tsplang\server\grammar\TspFast.g4 by ANTLR 4.7.1
// jshint ignore: start
var antlr4 = require('antlr4/index');
var TspFastListener = require('./TspFastListener').TspFastListener;
var grammarFileName = "TspFast.g4";

var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0003@\u01fa\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004\t",
    "\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007\u0004",
    "\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004\f\t\f\u0004",
    "\r\t\r\u0004\u000e\t\u000e\u0004\u000f\t\u000f\u0004\u0010\t\u0010\u0004",
    "\u0011\t\u0011\u0004\u0012\t\u0012\u0004\u0013\t\u0013\u0004\u0014\t",
    "\u0014\u0004\u0015\t\u0015\u0004\u0016\t\u0016\u0004\u0017\t\u0017\u0004",
    "\u0018\t\u0018\u0004\u0019\t\u0019\u0004\u001a\t\u001a\u0004\u001b\t",
    "\u001b\u0004\u001c\t\u001c\u0003\u0002\u0003\u0002\u0005\u0002;\n\u0002",
    "\u0007\u0002=\n\u0002\f\u0002\u000e\u0002@\u000b\u0002\u0003\u0002\u0003",
    "\u0002\u0003\u0003\u0003\u0003\u0003\u0003\u0007\u0003G\n\u0003\f\u0003",
    "\u000e\u0003J\u000b\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0007\u0003P\n\u0003\f\u0003\u000e\u0003S\u000b\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0005\u0003Y\n\u0003\u0007\u0003",
    "[\n\u0003\f\u0003\u000e\u0003^\u000b\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0005\u0003f\n\u0003\u0007",
    "\u0003h\n\u0003\f\u0003\u000e\u0003k\u000b\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0005\u0003r\n\u0003\u0007\u0003",
    "t\n\u0003\f\u0003\u000e\u0003w\u000b\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0005\u0003\u0080",
    "\n\u0003\u0007\u0003\u0082\n\u0003\f\u0003\u000e\u0003\u0085\u000b\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0005\u0003",
    "\u008c\n\u0003\u0007\u0003\u008e\n\u0003\f\u0003\u000e\u0003\u0091\u000b",
    "\u0003\u0007\u0003\u0093\n\u0003\f\u0003\u000e\u0003\u0096\u000b\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0005\u0003\u009b\n\u0003\u0007",
    "\u0003\u009d\n\u0003\f\u0003\u000e\u0003\u00a0\u000b\u0003\u0005\u0003",
    "\u00a2\n\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0007\u0003\u00aa\n\u0003\f\u0003\u000e\u0003\u00ad",
    "\u000b\u0003\u0005\u0003\u00af\n\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0005\u0003\u00ba\n\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0005\u0003\u00bf\n\u0003\u0007\u0003\u00c1\n\u0003\f\u0003\u000e\u0003",
    "\u00c4\u000b\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0007\u0003\u00cc\n\u0003\f\u0003\u000e\u0003\u00cf",
    "\u000b\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0007\u0003",
    "\u00d5\n\u0003\f\u0003\u000e\u0003\u00d8\u000b\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0005\u0003\u00dd\n\u0003\u0007\u0003\u00df\n\u0003",
    "\f\u0003\u000e\u0003\u00e2\u000b\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0007\u0003\u00ea\n\u0003",
    "\f\u0003\u000e\u0003\u00ed\u000b\u0003\u0003\u0003\u0003\u0003\u0005",
    "\u0003\u00f1\n\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0007\u0003\u00f7\n\u0003\f\u0003\u000e\u0003\u00fa\u000b\u0003\u0003",
    "\u0003\u0003\u0003\u0005\u0003\u00fe\n\u0003\u0003\u0003\u0005\u0003",
    "\u0101\n\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0005\u0003\u0106",
    "\n\u0003\u0007\u0003\u0108\n\u0003\f\u0003\u000e\u0003\u010b\u000b\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0007\u0003\u0115\n\u0003\f\u0003\u000e\u0003",
    "\u0118\u000b\u0003\u0003\u0003\u0003\u0003\u0005\u0003\u011c\n\u0003",
    "\u0003\u0003\u0005\u0003\u011f\n\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0005\u0003\u0124\n\u0003\u0007\u0003\u0126\n\u0003\f\u0003\u000e",
    "\u0003\u0129\u000b\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0007\u0003\u0130\n\u0003\f\u0003\u000e\u0003\u0133\u000b",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0007\u0003\u0139",
    "\n\u0003\f\u0003\u000e\u0003\u013c\u000b\u0003\u0005\u0003\u013e\n\u0003",
    "\u0005\u0003\u0140\n\u0003\u0003\u0004\u0003\u0004\u0003\u0004\u0003",
    "\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003",
    "\u0004\u0003\u0004\u0005\u0004\u014d\n\u0004\u0003\u0005\u0003\u0005",
    "\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0007\u0005\u0155\n",
    "\u0005\f\u0005\u000e\u0005\u0158\u000b\u0005\u0003\u0005\u0003\u0005",
    "\u0005\u0005\u015c\n\u0005\u0003\u0005\u0005\u0005\u015f\n\u0005\u0003",
    "\u0005\u0003\u0005\u0003\u0005\u0005\u0005\u0164\n\u0005\u0007\u0005",
    "\u0166\n\u0005\f\u0005\u000e\u0005\u0169\u000b\u0005\u0003\u0005\u0003",
    "\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003",
    "\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0005",
    "\u0005\u0178\n\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005",
    "\u0003\u0005\u0005\u0005\u017f\n\u0005\u0003\u0006\u0003\u0006\u0003",
    "\u0006\u0003\u0006\u0003\u0006\u0005\u0006\u0186\n\u0006\u0003\u0007",
    "\u0003\u0007\u0005\u0007\u018a\n\u0007\u0003\u0007\u0003\u0007\u0005",
    "\u0007\u018e\n\u0007\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b",
    "\u0005\b\u0196\n\b\u0003\t\u0003\t\u0007\t\u019a\n\t\f\t\u000e\t\u019d",
    "\u000b\t\u0003\t\u0003\t\u0003\t\u0005\t\u01a2\n\t\u0003\n\u0003\n\u0007",
    "\n\u01a6\n\n\f\n\u000e\n\u01a9\u000b\n\u0003\n\u0003\n\u0005\n\u01ad",
    "\n\n\u0003\n\u0003\n\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b",
    "\u0007\u000b\u01b5\n\u000b\f\u000b\u000e\u000b\u01b8\u000b\u000b\u0005",
    "\u000b\u01ba\n\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0005\u000b",
    "\u01bf\n\u000b\u0003\f\u0003\f\u0005\f\u01c3\n\f\u0003\f\u0003\f\u0003",
    "\r\u0003\r\u0003\r\u0007\r\u01ca\n\r\f\r\u000e\r\u01cd\u000b\r\u0003",
    "\r\u0005\r\u01d0\n\r\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e",
    "\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e",
    "\u0005\u000e\u01dc\n\u000e\u0003\u000f\u0003\u000f\u0003\u0010\u0003",
    "\u0010\u0003\u0011\u0003\u0011\u0003\u0012\u0003\u0012\u0003\u0013\u0003",
    "\u0013\u0003\u0014\u0003\u0014\u0003\u0015\u0003\u0015\u0003\u0016\u0003",
    "\u0016\u0003\u0017\u0003\u0017\u0003\u0018\u0003\u0018\u0003\u0019\u0003",
    "\u0019\u0003\u001a\u0003\u001a\u0003\u001b\u0003\u001b\u0003\u001c\u0003",
    "\u001c\u0003\u001c\u0002\u0002\u001d\u0002\u0004\u0006\b\n\f\u000e\u0010",
    "\u0012\u0014\u0016\u0018\u001a\u001c\u001e \"$&(*,.0246\u0002\n\u0003",
    "\u0002\u0003\u0004\u0003\u0002\u001e$\u0003\u0002&\'\u0003\u0002()\u0003",
    "\u0002-.\u0004\u0002\'\'/0\u0003\u0002:<\u0003\u000279\u0002\u0241\u0002",
    ">\u0003\u0002\u0002\u0002\u0004\u013f\u0003\u0002\u0002\u0002\u0006",
    "\u014c\u0003\u0002\u0002\u0002\b\u017e\u0003\u0002\u0002\u0002\n\u0185",
    "\u0003\u0002\u0002\u0002\f\u018d\u0003\u0002\u0002\u0002\u000e\u0195",
    "\u0003\u0002\u0002\u0002\u0010\u01a1\u0003\u0002\u0002\u0002\u0012\u01a3",
    "\u0003\u0002\u0002\u0002\u0014\u01be\u0003\u0002\u0002\u0002\u0016\u01c0",
    "\u0003\u0002\u0002\u0002\u0018\u01c6\u0003\u0002\u0002\u0002\u001a\u01db",
    "\u0003\u0002\u0002\u0002\u001c\u01dd\u0003\u0002\u0002\u0002\u001e\u01df",
    "\u0003\u0002\u0002\u0002 \u01e1\u0003\u0002\u0002\u0002\"\u01e3\u0003",
    "\u0002\u0002\u0002$\u01e5\u0003\u0002\u0002\u0002&\u01e7\u0003\u0002",
    "\u0002\u0002(\u01e9\u0003\u0002\u0002\u0002*\u01eb\u0003\u0002\u0002",
    "\u0002,\u01ed\u0003\u0002\u0002\u0002.\u01ef\u0003\u0002\u0002\u0002",
    "0\u01f1\u0003\u0002\u0002\u00022\u01f3\u0003\u0002\u0002\u00024\u01f5",
    "\u0003\u0002\u0002\u00026\u01f7\u0003\u0002\u0002\u00028:\u0005\u0004",
    "\u0003\u00029;\u0007\u0003\u0002\u0002:9\u0003\u0002\u0002\u0002:;\u0003",
    "\u0002\u0002\u0002;=\u0003\u0002\u0002\u0002<8\u0003\u0002\u0002\u0002",
    "=@\u0003\u0002\u0002\u0002><\u0003\u0002\u0002\u0002>?\u0003\u0002\u0002",
    "\u0002?A\u0003\u0002\u0002\u0002@>\u0003\u0002\u0002\u0002AB\u0007\u0002",
    "\u0002\u0003B\u0003\u0003\u0002\u0002\u0002CH\u0005\u0010\t\u0002DE",
    "\u0007\u0004\u0002\u0002EG\u0005\u0010\t\u0002FD\u0003\u0002\u0002\u0002",
    "GJ\u0003\u0002\u0002\u0002HF\u0003\u0002\u0002\u0002HI\u0003\u0002\u0002",
    "\u0002IK\u0003\u0002\u0002\u0002JH\u0003\u0002\u0002\u0002KL\u0007\u0005",
    "\u0002\u0002LQ\u0005\b\u0005\u0002MN\u0007\u0004\u0002\u0002NP\u0005",
    "\b\u0005\u0002OM\u0003\u0002\u0002\u0002PS\u0003\u0002\u0002\u0002Q",
    "O\u0003\u0002\u0002\u0002QR\u0003\u0002\u0002\u0002R\u0140\u0003\u0002",
    "\u0002\u0002SQ\u0003\u0002\u0002\u0002T\u0140\u0005\u0012\n\u0002U\\",
    "\u0007\u0006\u0002\u0002VX\u0005\u0004\u0003\u0002WY\u0007\u0003\u0002",
    "\u0002XW\u0003\u0002\u0002\u0002XY\u0003\u0002\u0002\u0002Y[\u0003\u0002",
    "\u0002\u0002ZV\u0003\u0002\u0002\u0002[^\u0003\u0002\u0002\u0002\\Z",
    "\u0003\u0002\u0002\u0002\\]\u0003\u0002\u0002\u0002]_\u0003\u0002\u0002",
    "\u0002^\\\u0003\u0002\u0002\u0002_\u0140\u0007\u0007\u0002\u0002`a\u0007",
    "\b\u0002\u0002ab\u0005\b\u0005\u0002bi\u0007\u0006\u0002\u0002ce\u0005",
    "\u0004\u0003\u0002df\u0007\u0003\u0002\u0002ed\u0003\u0002\u0002\u0002",
    "ef\u0003\u0002\u0002\u0002fh\u0003\u0002\u0002\u0002gc\u0003\u0002\u0002",
    "\u0002hk\u0003\u0002\u0002\u0002ig\u0003\u0002\u0002\u0002ij\u0003\u0002",
    "\u0002\u0002jl\u0003\u0002\u0002\u0002ki\u0003\u0002\u0002\u0002lm\u0007",
    "\u0007\u0002\u0002m\u0140\u0003\u0002\u0002\u0002nu\u0007\t\u0002\u0002",
    "oq\u0005\u0004\u0003\u0002pr\u0007\u0003\u0002\u0002qp\u0003\u0002\u0002",
    "\u0002qr\u0003\u0002\u0002\u0002rt\u0003\u0002\u0002\u0002so\u0003\u0002",
    "\u0002\u0002tw\u0003\u0002\u0002\u0002us\u0003\u0002\u0002\u0002uv\u0003",
    "\u0002\u0002\u0002vx\u0003\u0002\u0002\u0002wu\u0003\u0002\u0002\u0002",
    "xy\u0007\n\u0002\u0002y\u0140\u0005\b\u0005\u0002z{\u0007\u000b\u0002",
    "\u0002{|\u0005\b\u0005\u0002|\u0083\u0007\f\u0002\u0002}\u007f\u0005",
    "\u0004\u0003\u0002~\u0080\u0007\u0003\u0002\u0002\u007f~\u0003\u0002",
    "\u0002\u0002\u007f\u0080\u0003\u0002\u0002\u0002\u0080\u0082\u0003\u0002",
    "\u0002\u0002\u0081}\u0003\u0002\u0002\u0002\u0082\u0085\u0003\u0002",
    "\u0002\u0002\u0083\u0081\u0003\u0002\u0002\u0002\u0083\u0084\u0003\u0002",
    "\u0002\u0002\u0084\u0094\u0003\u0002\u0002\u0002\u0085\u0083\u0003\u0002",
    "\u0002\u0002\u0086\u0087\u0007\r\u0002\u0002\u0087\u0088\u0005\b\u0005",
    "\u0002\u0088\u008f\u0007\f\u0002\u0002\u0089\u008b\u0005\u0004\u0003",
    "\u0002\u008a\u008c\u0007\u0003\u0002\u0002\u008b\u008a\u0003\u0002\u0002",
    "\u0002\u008b\u008c\u0003\u0002\u0002\u0002\u008c\u008e\u0003\u0002\u0002",
    "\u0002\u008d\u0089\u0003\u0002\u0002\u0002\u008e\u0091\u0003\u0002\u0002",
    "\u0002\u008f\u008d\u0003\u0002\u0002\u0002\u008f\u0090\u0003\u0002\u0002",
    "\u0002\u0090\u0093\u0003\u0002\u0002\u0002\u0091\u008f\u0003\u0002\u0002",
    "\u0002\u0092\u0086\u0003\u0002\u0002\u0002\u0093\u0096\u0003\u0002\u0002",
    "\u0002\u0094\u0092\u0003\u0002\u0002\u0002\u0094\u0095\u0003\u0002\u0002",
    "\u0002\u0095\u00a1\u0003\u0002\u0002\u0002\u0096\u0094\u0003\u0002\u0002",
    "\u0002\u0097\u009e\u0007\u000e\u0002\u0002\u0098\u009a\u0005\u0004\u0003",
    "\u0002\u0099\u009b\u0007\u0003\u0002\u0002\u009a\u0099\u0003\u0002\u0002",
    "\u0002\u009a\u009b\u0003\u0002\u0002\u0002\u009b\u009d\u0003\u0002\u0002",
    "\u0002\u009c\u0098\u0003\u0002\u0002\u0002\u009d\u00a0\u0003\u0002\u0002",
    "\u0002\u009e\u009c\u0003\u0002\u0002\u0002\u009e\u009f\u0003\u0002\u0002",
    "\u0002\u009f\u00a2\u0003\u0002\u0002\u0002\u00a0\u009e\u0003\u0002\u0002",
    "\u0002\u00a1\u0097\u0003\u0002\u0002\u0002\u00a1\u00a2\u0003\u0002\u0002",
    "\u0002\u00a2\u00a3\u0003\u0002\u0002\u0002\u00a3\u00a4\u0007\u0007\u0002",
    "\u0002\u00a4\u0140\u0003\u0002\u0002\u0002\u00a5\u00ae\u0007\u000f\u0002",
    "\u0002\u00a6\u00ab\u0005\b\u0005\u0002\u00a7\u00a8\u0007\u0004\u0002",
    "\u0002\u00a8\u00aa\u0005\b\u0005\u0002\u00a9\u00a7\u0003\u0002\u0002",
    "\u0002\u00aa\u00ad\u0003\u0002\u0002\u0002\u00ab\u00a9\u0003\u0002\u0002",
    "\u0002\u00ab\u00ac\u0003\u0002\u0002\u0002\u00ac\u00af\u0003\u0002\u0002",
    "\u0002\u00ad\u00ab\u0003\u0002\u0002\u0002\u00ae\u00a6\u0003\u0002\u0002",
    "\u0002\u00ae\u00af\u0003\u0002\u0002\u0002\u00af\u0140\u0003\u0002\u0002",
    "\u0002\u00b0\u0140\u0007\u0010\u0002\u0002\u00b1\u00b2\u0007\u0011\u0002",
    "\u0002\u00b2\u00b3\u00076\u0002\u0002\u00b3\u00b4\u0007\u0005\u0002",
    "\u0002\u00b4\u00b5\u0005\b\u0005\u0002\u00b5\u00b6\u0007\u0004\u0002",
    "\u0002\u00b6\u00b9\u0005\b\u0005\u0002\u00b7\u00b8\u0007\u0004\u0002",
    "\u0002\u00b8\u00ba\u0005\b\u0005\u0002\u00b9\u00b7\u0003\u0002\u0002",
    "\u0002\u00b9\u00ba\u0003\u0002\u0002\u0002\u00ba\u00bb\u0003\u0002\u0002",
    "\u0002\u00bb\u00c2\u0007\u0006\u0002\u0002\u00bc\u00be\u0005\u0004\u0003",
    "\u0002\u00bd\u00bf\u0007\u0003\u0002\u0002\u00be\u00bd\u0003\u0002\u0002",
    "\u0002\u00be\u00bf\u0003\u0002\u0002\u0002\u00bf\u00c1\u0003\u0002\u0002",
    "\u0002\u00c0\u00bc\u0003\u0002\u0002\u0002\u00c1\u00c4\u0003\u0002\u0002",
    "\u0002\u00c2\u00c0\u0003\u0002\u0002\u0002\u00c2\u00c3\u0003\u0002\u0002",
    "\u0002\u00c3\u00c5\u0003\u0002\u0002\u0002\u00c4\u00c2\u0003\u0002\u0002",
    "\u0002\u00c5\u00c6\u0007\u0007\u0002\u0002\u00c6\u0140\u0003\u0002\u0002",
    "\u0002\u00c7\u00c8\u0007\u0011\u0002\u0002\u00c8\u00cd\u00076\u0002",
    "\u0002\u00c9\u00ca\u0007\u0004\u0002\u0002\u00ca\u00cc\u00076\u0002",
    "\u0002\u00cb\u00c9\u0003\u0002\u0002\u0002\u00cc\u00cf\u0003\u0002\u0002",
    "\u0002\u00cd\u00cb\u0003\u0002\u0002\u0002\u00cd\u00ce\u0003\u0002\u0002",
    "\u0002\u00ce\u00d0\u0003\u0002\u0002\u0002\u00cf\u00cd\u0003\u0002\u0002",
    "\u0002\u00d0\u00d1\u0007\u0012\u0002\u0002\u00d1\u00d6\u0005\b\u0005",
    "\u0002\u00d2\u00d3\u0007\u0004\u0002\u0002\u00d3\u00d5\u0005\b\u0005",
    "\u0002\u00d4\u00d2\u0003\u0002\u0002\u0002\u00d5\u00d8\u0003\u0002\u0002",
    "\u0002\u00d6\u00d4\u0003\u0002\u0002\u0002\u00d6\u00d7\u0003\u0002\u0002",
    "\u0002\u00d7\u00d9\u0003\u0002\u0002\u0002\u00d8\u00d6\u0003\u0002\u0002",
    "\u0002\u00d9\u00e0\u0007\u0006\u0002\u0002\u00da\u00dc\u0005\u0004\u0003",
    "\u0002\u00db\u00dd\u0007\u0003\u0002\u0002\u00dc\u00db\u0003\u0002\u0002",
    "\u0002\u00dc\u00dd\u0003\u0002\u0002\u0002\u00dd\u00df\u0003\u0002\u0002",
    "\u0002\u00de\u00da\u0003\u0002\u0002\u0002\u00df\u00e2\u0003\u0002\u0002",
    "\u0002\u00e0\u00de\u0003\u0002\u0002\u0002\u00e0\u00e1\u0003\u0002\u0002",
    "\u0002\u00e1\u00e3\u0003\u0002\u0002\u0002\u00e2\u00e0\u0003\u0002\u0002",
    "\u0002\u00e3\u00e4\u0007\u0007\u0002\u0002\u00e4\u0140\u0003\u0002\u0002",
    "\u0002\u00e5\u00e6\u0007\u0013\u0002\u0002\u00e6\u00eb\u00076\u0002",
    "\u0002\u00e7\u00e8\u0007\u0014\u0002\u0002\u00e8\u00ea\u00076\u0002",
    "\u0002\u00e9\u00e7\u0003\u0002\u0002\u0002\u00ea\u00ed\u0003\u0002\u0002",
    "\u0002\u00eb\u00e9\u0003\u0002\u0002\u0002\u00eb\u00ec\u0003\u0002\u0002",
    "\u0002\u00ec\u00f0\u0003\u0002\u0002\u0002\u00ed\u00eb\u0003\u0002\u0002",
    "\u0002\u00ee\u00ef\u0007\u0015\u0002\u0002\u00ef\u00f1\u00076\u0002",
    "\u0002\u00f0\u00ee\u0003\u0002\u0002\u0002\u00f0\u00f1\u0003\u0002\u0002",
    "\u0002\u00f1\u00f2\u0003\u0002\u0002\u0002\u00f2\u0100\u0007\u0016\u0002",
    "\u0002\u00f3\u00f8\u00076\u0002\u0002\u00f4\u00f5\u0007\u0004\u0002",
    "\u0002\u00f5\u00f7\u00076\u0002\u0002\u00f6\u00f4\u0003\u0002\u0002",
    "\u0002\u00f7\u00fa\u0003\u0002\u0002\u0002\u00f8\u00f6\u0003\u0002\u0002",
    "\u0002\u00f8\u00f9\u0003\u0002\u0002\u0002\u00f9\u00fd\u0003\u0002\u0002",
    "\u0002\u00fa\u00f8\u0003\u0002\u0002\u0002\u00fb\u00fc\u0007\u0004\u0002",
    "\u0002\u00fc\u00fe\u00075\u0002\u0002\u00fd\u00fb\u0003\u0002\u0002",
    "\u0002\u00fd\u00fe\u0003\u0002\u0002\u0002\u00fe\u0101\u0003\u0002\u0002",
    "\u0002\u00ff\u0101\u00075\u0002\u0002\u0100\u00f3\u0003\u0002\u0002",
    "\u0002\u0100\u00ff\u0003\u0002\u0002\u0002\u0100\u0101\u0003\u0002\u0002",
    "\u0002\u0101\u0102\u0003\u0002\u0002\u0002\u0102\u0109\u0007\u0017\u0002",
    "\u0002\u0103\u0105\u0005\u0004\u0003\u0002\u0104\u0106\u0007\u0003\u0002",
    "\u0002\u0105\u0104\u0003\u0002\u0002\u0002\u0105\u0106\u0003\u0002\u0002",
    "\u0002\u0106\u0108\u0003\u0002\u0002\u0002\u0107\u0103\u0003\u0002\u0002",
    "\u0002\u0108\u010b\u0003\u0002\u0002\u0002\u0109\u0107\u0003\u0002\u0002",
    "\u0002\u0109\u010a\u0003\u0002\u0002\u0002\u010a\u010c\u0003\u0002\u0002",
    "\u0002\u010b\u0109\u0003\u0002\u0002\u0002\u010c\u0140\u0007\u0007\u0002",
    "\u0002\u010d\u010e\u00074\u0002\u0002\u010e\u010f\u0007\u0013\u0002",
    "\u0002\u010f\u0110\u00076\u0002\u0002\u0110\u011e\u0007\u0016\u0002",
    "\u0002\u0111\u0116\u00076\u0002\u0002\u0112\u0113\u0007\u0004\u0002",
    "\u0002\u0113\u0115\u00076\u0002\u0002\u0114\u0112\u0003\u0002\u0002",
    "\u0002\u0115\u0118\u0003\u0002\u0002\u0002\u0116\u0114\u0003\u0002\u0002",
    "\u0002\u0116\u0117\u0003\u0002\u0002\u0002\u0117\u011b\u0003\u0002\u0002",
    "\u0002\u0118\u0116\u0003\u0002\u0002\u0002\u0119\u011a\u0007\u0004\u0002",
    "\u0002\u011a\u011c\u00075\u0002\u0002\u011b\u0119\u0003\u0002\u0002",
    "\u0002\u011b\u011c\u0003\u0002\u0002\u0002\u011c\u011f\u0003\u0002\u0002",
    "\u0002\u011d\u011f\u00075\u0002\u0002\u011e\u0111\u0003\u0002\u0002",
    "\u0002\u011e\u011d\u0003\u0002\u0002\u0002\u011e\u011f\u0003\u0002\u0002",
    "\u0002\u011f\u0120\u0003\u0002\u0002\u0002\u0120\u0127\u0007\u0017\u0002",
    "\u0002\u0121\u0123\u0005\u0004\u0003\u0002\u0122\u0124\u0007\u0003\u0002",
    "\u0002\u0123\u0122\u0003\u0002\u0002\u0002\u0123\u0124\u0003\u0002\u0002",
    "\u0002\u0124\u0126\u0003\u0002\u0002\u0002\u0125\u0121\u0003\u0002\u0002",
    "\u0002\u0126\u0129\u0003\u0002\u0002\u0002\u0127\u0125\u0003\u0002\u0002",
    "\u0002\u0127\u0128\u0003\u0002\u0002\u0002\u0128\u012a\u0003\u0002\u0002",
    "\u0002\u0129\u0127\u0003\u0002\u0002\u0002\u012a\u0140\u0007\u0007\u0002",
    "\u0002\u012b\u012c\u00074\u0002\u0002\u012c\u0131\u00076\u0002\u0002",
    "\u012d\u012e\u0007\u0004\u0002\u0002\u012e\u0130\u00076\u0002\u0002",
    "\u012f\u012d\u0003\u0002\u0002\u0002\u0130\u0133\u0003\u0002\u0002\u0002",
    "\u0131\u012f\u0003\u0002\u0002\u0002\u0131\u0132\u0003\u0002\u0002\u0002",
    "\u0132\u013d\u0003\u0002\u0002\u0002\u0133\u0131\u0003\u0002\u0002\u0002",
    "\u0134\u0135\u0007\u0005\u0002\u0002\u0135\u013a\u0005\b\u0005\u0002",
    "\u0136\u0137\u0007\u0004\u0002\u0002\u0137\u0139\u0005\b\u0005\u0002",
    "\u0138\u0136\u0003\u0002\u0002\u0002\u0139\u013c\u0003\u0002\u0002\u0002",
    "\u013a\u0138\u0003\u0002\u0002\u0002\u013a\u013b\u0003\u0002\u0002\u0002",
    "\u013b\u013e\u0003\u0002\u0002\u0002\u013c\u013a\u0003\u0002\u0002\u0002",
    "\u013d\u0134\u0003\u0002\u0002\u0002\u013d\u013e\u0003\u0002\u0002\u0002",
    "\u013e\u0140\u0003\u0002\u0002\u0002\u013fC\u0003\u0002\u0002\u0002",
    "\u013fT\u0003\u0002\u0002\u0002\u013fU\u0003\u0002\u0002\u0002\u013f",
    "`\u0003\u0002\u0002\u0002\u013fn\u0003\u0002\u0002\u0002\u013fz\u0003",
    "\u0002\u0002\u0002\u013f\u00a5\u0003\u0002\u0002\u0002\u013f\u00b0\u0003",
    "\u0002\u0002\u0002\u013f\u00b1\u0003\u0002\u0002\u0002\u013f\u00c7\u0003",
    "\u0002\u0002\u0002\u013f\u00e5\u0003\u0002\u0002\u0002\u013f\u010d\u0003",
    "\u0002\u0002\u0002\u013f\u012b\u0003\u0002\u0002\u0002\u0140\u0005\u0003",
    "\u0002\u0002\u0002\u0141\u014d\u00072\u0002\u0002\u0142\u014d\u0007",
    "3\u0002\u0002\u0143\u014d\u00054\u001b\u0002\u0144\u014d\u00056\u001c",
    "\u0002\u0145\u014d\u0005\u0010\t\u0002\u0146\u014d\u0005\u0012\n\u0002",
    "\u0147\u014d\u0005\u0016\f\u0002\u0148\u0149\u0007\u0016\u0002\u0002",
    "\u0149\u014a\u0005\b\u0005\u0002\u014a\u014b\u0007\u0017\u0002\u0002",
    "\u014b\u014d\u0003\u0002\u0002\u0002\u014c\u0141\u0003\u0002\u0002\u0002",
    "\u014c\u0142\u0003\u0002\u0002\u0002\u014c\u0143\u0003\u0002\u0002\u0002",
    "\u014c\u0144\u0003\u0002\u0002\u0002\u014c\u0145\u0003\u0002\u0002\u0002",
    "\u014c\u0146\u0003\u0002\u0002\u0002\u014c\u0147\u0003\u0002\u0002\u0002",
    "\u014c\u0148\u0003\u0002\u0002\u0002\u014d\u0007\u0003\u0002\u0002\u0002",
    "\u014e\u017f\u0005\u0006\u0004\u0002\u014f\u0150\u0007\u0013\u0002\u0002",
    "\u0150\u015e\u0007\u0016\u0002\u0002\u0151\u0156\u00076\u0002\u0002",
    "\u0152\u0153\u0007\u0004\u0002\u0002\u0153\u0155\u00076\u0002\u0002",
    "\u0154\u0152\u0003\u0002\u0002\u0002\u0155\u0158\u0003\u0002\u0002\u0002",
    "\u0156\u0154\u0003\u0002\u0002\u0002\u0156\u0157\u0003\u0002\u0002\u0002",
    "\u0157\u015b\u0003\u0002\u0002\u0002\u0158\u0156\u0003\u0002\u0002\u0002",
    "\u0159\u015a\u0007\u0004\u0002\u0002\u015a\u015c\u00075\u0002\u0002",
    "\u015b\u0159\u0003\u0002\u0002\u0002\u015b\u015c\u0003\u0002\u0002\u0002",
    "\u015c\u015f\u0003\u0002\u0002\u0002\u015d\u015f\u00075\u0002\u0002",
    "\u015e\u0151\u0003\u0002\u0002\u0002\u015e\u015d\u0003\u0002\u0002\u0002",
    "\u015e\u015f\u0003\u0002\u0002\u0002\u015f\u0160\u0003\u0002\u0002\u0002",
    "\u0160\u0167\u0007\u0017\u0002\u0002\u0161\u0163\u0005\u0004\u0003\u0002",
    "\u0162\u0164\u0007\u0003\u0002\u0002\u0163\u0162\u0003\u0002\u0002\u0002",
    "\u0163\u0164\u0003\u0002\u0002\u0002\u0164\u0166\u0003\u0002\u0002\u0002",
    "\u0165\u0161\u0003\u0002\u0002\u0002\u0166\u0169\u0003\u0002\u0002\u0002",
    "\u0167\u0165\u0003\u0002\u0002\u0002\u0167\u0168\u0003\u0002\u0002\u0002",
    "\u0168\u016a\u0003\u0002\u0002\u0002\u0169\u0167\u0003\u0002\u0002\u0002",
    "\u016a\u017f\u0007\u0007\u0002\u0002\u016b\u0177\u0005\u0006\u0004\u0002",
    "\u016c\u0178\u0005\u001c\u000f\u0002\u016d\u0178\u0005\u001e\u0010\u0002",
    "\u016e\u0178\u0005 \u0011\u0002\u016f\u0178\u0005*\u0016\u0002\u0170",
    "\u0178\u0005,\u0017\u0002\u0171\u0178\u0005(\u0015\u0002\u0172\u0178",
    "\u0005.\u0018\u0002\u0173\u0178\u0005\"\u0012\u0002\u0174\u0178\u0005",
    "$\u0013\u0002\u0175\u0178\u0005&\u0014\u0002\u0176\u0178\u00052\u001a",
    "\u0002\u0177\u016c\u0003\u0002\u0002\u0002\u0177\u016d\u0003\u0002\u0002",
    "\u0002\u0177\u016e\u0003\u0002\u0002\u0002\u0177\u016f\u0003\u0002\u0002",
    "\u0002\u0177\u0170\u0003\u0002\u0002\u0002\u0177\u0171\u0003\u0002\u0002",
    "\u0002\u0177\u0172\u0003\u0002\u0002\u0002\u0177\u0173\u0003\u0002\u0002",
    "\u0002\u0177\u0174\u0003\u0002\u0002\u0002\u0177\u0175\u0003\u0002\u0002",
    "\u0002\u0177\u0176\u0003\u0002\u0002\u0002\u0178\u0179\u0003\u0002\u0002",
    "\u0002\u0179\u017a\u0005\b\u0005\u0002\u017a\u017f\u0003\u0002\u0002",
    "\u0002\u017b\u017c\u00050\u0019\u0002\u017c\u017d\u0005\b\u0005\u0002",
    "\u017d\u017f\u0003\u0002\u0002\u0002\u017e\u014e\u0003\u0002\u0002\u0002",
    "\u017e\u014f\u0003\u0002\u0002\u0002\u017e\u016b\u0003\u0002\u0002\u0002",
    "\u017e\u017b\u0003\u0002\u0002\u0002\u017f\t\u0003\u0002\u0002\u0002",
    "\u0180\u0181\u0007\u0016\u0002\u0002\u0181\u0182\u0005\b\u0005\u0002",
    "\u0182\u0183\u0007\u0017\u0002\u0002\u0183\u0186\u0003\u0002\u0002\u0002",
    "\u0184\u0186\u00076\u0002\u0002\u0185\u0180\u0003\u0002\u0002\u0002",
    "\u0185\u0184\u0003\u0002\u0002\u0002\u0186\u000b\u0003\u0002\u0002\u0002",
    "\u0187\u0188\u0007\u0015\u0002\u0002\u0188\u018a\u00076\u0002\u0002",
    "\u0189\u0187\u0003\u0002\u0002\u0002\u0189\u018a\u0003\u0002\u0002\u0002",
    "\u018a\u018b\u0003\u0002\u0002\u0002\u018b\u018e\u0005\u0014\u000b\u0002",
    "\u018c\u018e\u0005\u000e\b\u0002\u018d\u0189\u0003\u0002\u0002\u0002",
    "\u018d\u018c\u0003\u0002\u0002\u0002\u018e\r\u0003\u0002\u0002\u0002",
    "\u018f\u0190\u0007\u0018\u0002\u0002\u0190\u0191\u0005\b\u0005\u0002",
    "\u0191\u0192\u0007\u0019\u0002\u0002\u0192\u0196\u0003\u0002\u0002\u0002",
    "\u0193\u0194\u0007\u0014\u0002\u0002\u0194\u0196\u00076\u0002\u0002",
    "\u0195\u018f\u0003\u0002\u0002\u0002\u0195\u0193\u0003\u0002\u0002\u0002",
    "\u0196\u000f\u0003\u0002\u0002\u0002\u0197\u019b\u0005\n\u0006\u0002",
    "\u0198\u019a\u0005\f\u0007\u0002\u0199\u0198\u0003\u0002\u0002\u0002",
    "\u019a\u019d\u0003\u0002\u0002\u0002\u019b\u0199\u0003\u0002\u0002\u0002",
    "\u019b\u019c\u0003\u0002\u0002\u0002\u019c\u019e\u0003\u0002\u0002\u0002",
    "\u019d\u019b\u0003\u0002\u0002\u0002\u019e\u019f\u0005\u000e\b\u0002",
    "\u019f\u01a2\u0003\u0002\u0002\u0002\u01a0\u01a2\u00076\u0002\u0002",
    "\u01a1\u0197\u0003\u0002\u0002\u0002\u01a1\u01a0\u0003\u0002\u0002\u0002",
    "\u01a2\u0011\u0003\u0002\u0002\u0002\u01a3\u01a7\u0005\n\u0006\u0002",
    "\u01a4\u01a6\u0005\f\u0007\u0002\u01a5\u01a4\u0003\u0002\u0002\u0002",
    "\u01a6\u01a9\u0003\u0002\u0002\u0002\u01a7\u01a5\u0003\u0002\u0002\u0002",
    "\u01a7\u01a8\u0003\u0002\u0002\u0002\u01a8\u01ac\u0003\u0002\u0002\u0002",
    "\u01a9\u01a7\u0003\u0002\u0002\u0002\u01aa\u01ab\u0007\u0015\u0002\u0002",
    "\u01ab\u01ad\u00076\u0002\u0002\u01ac\u01aa\u0003\u0002\u0002\u0002",
    "\u01ac\u01ad\u0003\u0002\u0002\u0002\u01ad\u01ae\u0003\u0002\u0002\u0002",
    "\u01ae\u01af\u0005\u0014\u000b\u0002\u01af\u0013\u0003\u0002\u0002\u0002",
    "\u01b0\u01b9\u0007\u0016\u0002\u0002\u01b1\u01b6\u0005\b\u0005\u0002",
    "\u01b2\u01b3\u0007\u0004\u0002\u0002\u01b3\u01b5\u0005\b\u0005\u0002",
    "\u01b4\u01b2\u0003\u0002\u0002\u0002\u01b5\u01b8\u0003\u0002\u0002\u0002",
    "\u01b6\u01b4\u0003\u0002\u0002\u0002\u01b6\u01b7\u0003\u0002\u0002\u0002",
    "\u01b7\u01ba\u0003\u0002\u0002\u0002\u01b8\u01b6\u0003\u0002\u0002\u0002",
    "\u01b9\u01b1\u0003\u0002\u0002\u0002\u01b9\u01ba\u0003\u0002\u0002\u0002",
    "\u01ba\u01bb\u0003\u0002\u0002\u0002\u01bb\u01bf\u0007\u0017\u0002\u0002",
    "\u01bc\u01bf\u0005\u0016\f\u0002\u01bd\u01bf\u00056\u001c\u0002\u01be",
    "\u01b0\u0003\u0002\u0002\u0002\u01be\u01bc\u0003\u0002\u0002\u0002\u01be",
    "\u01bd\u0003\u0002\u0002\u0002\u01bf\u0015\u0003\u0002\u0002\u0002\u01c0",
    "\u01c2\u0007\u001a\u0002\u0002\u01c1\u01c3\u0005\u0018\r\u0002\u01c2",
    "\u01c1\u0003\u0002\u0002\u0002\u01c2\u01c3\u0003\u0002\u0002\u0002\u01c3",
    "\u01c4\u0003\u0002\u0002\u0002\u01c4\u01c5\u0007\u001b\u0002\u0002\u01c5",
    "\u0017\u0003\u0002\u0002\u0002\u01c6\u01cb\u0005\u001a\u000e\u0002\u01c7",
    "\u01c8\t\u0002\u0002\u0002\u01c8\u01ca\u0005\u001a\u000e\u0002\u01c9",
    "\u01c7\u0003\u0002\u0002\u0002\u01ca\u01cd\u0003\u0002\u0002\u0002\u01cb",
    "\u01c9\u0003\u0002\u0002\u0002\u01cb\u01cc\u0003\u0002\u0002\u0002\u01cc",
    "\u01cf\u0003\u0002\u0002\u0002\u01cd\u01cb\u0003\u0002\u0002\u0002\u01ce",
    "\u01d0\t\u0002\u0002\u0002\u01cf\u01ce\u0003\u0002\u0002\u0002\u01cf",
    "\u01d0\u0003\u0002\u0002\u0002\u01d0\u0019\u0003\u0002\u0002\u0002\u01d1",
    "\u01d2\u0007\u0018\u0002\u0002\u01d2\u01d3\u0005\b\u0005\u0002\u01d3",
    "\u01d4\u0007\u0019\u0002\u0002\u01d4\u01d5\u0007\u0005\u0002\u0002\u01d5",
    "\u01d6\u0005\b\u0005\u0002\u01d6\u01dc\u0003\u0002\u0002\u0002\u01d7",
    "\u01d8\u00076\u0002\u0002\u01d8\u01d9\u0007\u0005\u0002\u0002\u01d9",
    "\u01dc\u0005\b\u0005\u0002\u01da\u01dc\u0005\b\u0005\u0002\u01db\u01d1",
    "\u0003\u0002\u0002\u0002\u01db\u01d7\u0003\u0002\u0002\u0002\u01db\u01da",
    "\u0003\u0002\u0002\u0002\u01dc\u001b\u0003\u0002\u0002\u0002\u01dd\u01de",
    "\u0007\u001c\u0002\u0002\u01de\u001d\u0003\u0002\u0002\u0002\u01df\u01e0",
    "\u0007\u001d\u0002\u0002\u01e0\u001f\u0003\u0002\u0002\u0002\u01e1\u01e2",
    "\t\u0003\u0002\u0002\u01e2!\u0003\u0002\u0002\u0002\u01e3\u01e4\u0007",
    "%\u0002\u0002\u01e4#\u0003\u0002\u0002\u0002\u01e5\u01e6\t\u0004\u0002",
    "\u0002\u01e6%\u0003\u0002\u0002\u0002\u01e7\u01e8\t\u0005\u0002\u0002",
    "\u01e8\'\u0003\u0002\u0002\u0002\u01e9\u01ea\u0007*\u0002\u0002\u01ea",
    ")\u0003\u0002\u0002\u0002\u01eb\u01ec\u0007+\u0002\u0002\u01ec+\u0003",
    "\u0002\u0002\u0002\u01ed\u01ee\u0007,\u0002\u0002\u01ee-\u0003\u0002",
    "\u0002\u0002\u01ef\u01f0\t\u0006\u0002\u0002\u01f0/\u0003\u0002\u0002",
    "\u0002\u01f1\u01f2\t\u0007\u0002\u0002\u01f21\u0003\u0002\u0002\u0002",
    "\u01f3\u01f4\u00071\u0002\u0002\u01f43\u0003\u0002\u0002\u0002\u01f5",
    "\u01f6\t\b\u0002\u0002\u01f65\u0003\u0002\u0002\u0002\u01f7\u01f8\t",
    "\t\u0002\u0002\u01f87\u0003\u0002\u0002\u0002D:>HQX\\eiqu\u007f\u0083",
    "\u008b\u008f\u0094\u009a\u009e\u00a1\u00ab\u00ae\u00b9\u00be\u00c2\u00cd",
    "\u00d6\u00dc\u00e0\u00eb\u00f0\u00f8\u00fd\u0100\u0105\u0109\u0116\u011b",
    "\u011e\u0123\u0127\u0131\u013a\u013d\u013f\u014c\u0156\u015b\u015e\u0163",
    "\u0167\u0177\u017e\u0185\u0189\u018d\u0195\u019b\u01a1\u01a7\u01ac\u01b6",
    "\u01b9\u01be\u01c2\u01cb\u01cf\u01db"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [ null, "';'", "','", "'='", "'do'", "'end'", "'while'", 
                     "'repeat'", "'until'", "'if'", "'then'", "'elseif'", 
                     "'else'", "'return'", "'break'", "'for'", "'in'", "'function'", 
                     "'.'", "':'", "'('", "')'", "'['", "']'", "'{'", "'}'", 
                     "'or'", "'and'", "'<'", "'>'", "'<='", "'>='", "'~='", 
                     "'!='", "'=='", "'..'", "'+'", "'-'", "'*'", "'/'", 
                     "'&'", "'|'", "'^^'", "'<<'", "'>>'", "'not'", "'!'", 
                     "'^'", "'nil'", null, "'local'", "'...'" ];

var symbolicNames = [ null, null, null, null, null, null, null, null, null, 
                      null, null, null, null, null, null, null, null, null, 
                      null, null, null, null, null, null, null, null, null, 
                      null, null, null, null, null, null, null, null, null, 
                      null, null, null, null, null, null, null, null, null, 
                      null, null, null, "NIL", "BOOLEAN", "LOCAL", "VARARG", 
                      "NAME", "NORMALSTRING", "CHARSTRING", "LONGSTRING", 
                      "INT", "HEX", "FLOAT", "LONGCOMMENT", "LINE_COMMENT", 
                      "WS", "SHEBANG" ];

var ruleNames =  [ "chunk", "statement", "value", "expression", "prefix", 
                   "suffix", "index", "variable", "functionCall", "args", 
                   "tableConstructor", "fieldList", "field", "operatorOr", 
                   "operatorAnd", "operatorComparison", "operatorStrcat", 
                   "operatorAddSub", "operatorMulDiv", "operatorBitwiseAnd", 
                   "operatorBitwiseOr", "operatorBitwiseXor", "operatorBitwiseShift", 
                   "operatorUnary", "operatorPower", "number", "string" ];

function TspFastParser (input) {
	antlr4.Parser.call(this, input);
    this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
    this.ruleNames = ruleNames;
    this.literalNames = literalNames;
    this.symbolicNames = symbolicNames;
    return this;
}

TspFastParser.prototype = Object.create(antlr4.Parser.prototype);
TspFastParser.prototype.constructor = TspFastParser;

Object.defineProperty(TspFastParser.prototype, "atn", {
	get : function() {
		return atn;
	}
});

TspFastParser.EOF = antlr4.Token.EOF;
TspFastParser.T__0 = 1;
TspFastParser.T__1 = 2;
TspFastParser.T__2 = 3;
TspFastParser.T__3 = 4;
TspFastParser.T__4 = 5;
TspFastParser.T__5 = 6;
TspFastParser.T__6 = 7;
TspFastParser.T__7 = 8;
TspFastParser.T__8 = 9;
TspFastParser.T__9 = 10;
TspFastParser.T__10 = 11;
TspFastParser.T__11 = 12;
TspFastParser.T__12 = 13;
TspFastParser.T__13 = 14;
TspFastParser.T__14 = 15;
TspFastParser.T__15 = 16;
TspFastParser.T__16 = 17;
TspFastParser.T__17 = 18;
TspFastParser.T__18 = 19;
TspFastParser.T__19 = 20;
TspFastParser.T__20 = 21;
TspFastParser.T__21 = 22;
TspFastParser.T__22 = 23;
TspFastParser.T__23 = 24;
TspFastParser.T__24 = 25;
TspFastParser.T__25 = 26;
TspFastParser.T__26 = 27;
TspFastParser.T__27 = 28;
TspFastParser.T__28 = 29;
TspFastParser.T__29 = 30;
TspFastParser.T__30 = 31;
TspFastParser.T__31 = 32;
TspFastParser.T__32 = 33;
TspFastParser.T__33 = 34;
TspFastParser.T__34 = 35;
TspFastParser.T__35 = 36;
TspFastParser.T__36 = 37;
TspFastParser.T__37 = 38;
TspFastParser.T__38 = 39;
TspFastParser.T__39 = 40;
TspFastParser.T__40 = 41;
TspFastParser.T__41 = 42;
TspFastParser.T__42 = 43;
TspFastParser.T__43 = 44;
TspFastParser.T__44 = 45;
TspFastParser.T__45 = 46;
TspFastParser.T__46 = 47;
TspFastParser.NIL = 48;
TspFastParser.BOOLEAN = 49;
TspFastParser.LOCAL = 50;
TspFastParser.VARARG = 51;
TspFastParser.NAME = 52;
TspFastParser.NORMALSTRING = 53;
TspFastParser.CHARSTRING = 54;
TspFastParser.LONGSTRING = 55;
TspFastParser.INT = 56;
TspFastParser.HEX = 57;
TspFastParser.FLOAT = 58;
TspFastParser.LONGCOMMENT = 59;
TspFastParser.LINE_COMMENT = 60;
TspFastParser.WS = 61;
TspFastParser.SHEBANG = 62;

TspFastParser.RULE_chunk = 0;
TspFastParser.RULE_statement = 1;
TspFastParser.RULE_value = 2;
TspFastParser.RULE_expression = 3;
TspFastParser.RULE_prefix = 4;
TspFastParser.RULE_suffix = 5;
TspFastParser.RULE_index = 6;
TspFastParser.RULE_variable = 7;
TspFastParser.RULE_functionCall = 8;
TspFastParser.RULE_args = 9;
TspFastParser.RULE_tableConstructor = 10;
TspFastParser.RULE_fieldList = 11;
TspFastParser.RULE_field = 12;
TspFastParser.RULE_operatorOr = 13;
TspFastParser.RULE_operatorAnd = 14;
TspFastParser.RULE_operatorComparison = 15;
TspFastParser.RULE_operatorStrcat = 16;
TspFastParser.RULE_operatorAddSub = 17;
TspFastParser.RULE_operatorMulDiv = 18;
TspFastParser.RULE_operatorBitwiseAnd = 19;
TspFastParser.RULE_operatorBitwiseOr = 20;
TspFastParser.RULE_operatorBitwiseXor = 21;
TspFastParser.RULE_operatorBitwiseShift = 22;
TspFastParser.RULE_operatorUnary = 23;
TspFastParser.RULE_operatorPower = 24;
TspFastParser.RULE_number = 25;
TspFastParser.RULE_string = 26;

function ChunkContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = TspFastParser.RULE_chunk;
    return this;
}

ChunkContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ChunkContext.prototype.constructor = ChunkContext;

ChunkContext.prototype.EOF = function() {
    return this.getToken(TspFastParser.EOF, 0);
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
    if(listener instanceof TspFastListener ) {
        listener.enterChunk(this);
	}
};

ChunkContext.prototype.exitRule = function(listener) {
    if(listener instanceof TspFastListener ) {
        listener.exitChunk(this);
	}
};




TspFastParser.ChunkContext = ChunkContext;

TspFastParser.prototype.chunk = function() {

    var localctx = new ChunkContext(this, this._ctx, this.state);
    this.enterRule(localctx, 0, TspFastParser.RULE_chunk);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 60;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << TspFastParser.T__3) | (1 << TspFastParser.T__5) | (1 << TspFastParser.T__6) | (1 << TspFastParser.T__8) | (1 << TspFastParser.T__12) | (1 << TspFastParser.T__13) | (1 << TspFastParser.T__14) | (1 << TspFastParser.T__16) | (1 << TspFastParser.T__19))) !== 0) || _la===TspFastParser.LOCAL || _la===TspFastParser.NAME) {
            this.state = 54;
            this.statement();
            this.state = 56;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if(_la===TspFastParser.T__0) {
                this.state = 55;
                this.match(TspFastParser.T__0);
            }

            this.state = 62;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 63;
        this.match(TspFastParser.EOF);
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
    this.ruleIndex = TspFastParser.RULE_statement;
    return this;
}

StatementContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
StatementContext.prototype.constructor = StatementContext;

StatementContext.prototype.variable = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(VariableContext);
    } else {
        return this.getTypedRuleContext(VariableContext,i);
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

StatementContext.prototype.NAME = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(TspFastParser.NAME);
    } else {
        return this.getToken(TspFastParser.NAME, i);
    }
};


StatementContext.prototype.VARARG = function() {
    return this.getToken(TspFastParser.VARARG, 0);
};

StatementContext.prototype.LOCAL = function() {
    return this.getToken(TspFastParser.LOCAL, 0);
};

StatementContext.prototype.enterRule = function(listener) {
    if(listener instanceof TspFastListener ) {
        listener.enterStatement(this);
	}
};

StatementContext.prototype.exitRule = function(listener) {
    if(listener instanceof TspFastListener ) {
        listener.exitStatement(this);
	}
};




TspFastParser.StatementContext = StatementContext;

TspFastParser.prototype.statement = function() {

    var localctx = new StatementContext(this, this._ctx, this.state);
    this.enterRule(localctx, 2, TspFastParser.RULE_statement);
    var _la = 0; // Token type
    try {
        this.state = 317;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,42,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 65;
            this.variable();
            this.state = 70;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while(_la===TspFastParser.T__1) {
                this.state = 66;
                this.match(TspFastParser.T__1);
                this.state = 67;
                this.variable();
                this.state = 72;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            this.state = 73;
            this.match(TspFastParser.T__2);
            this.state = 74;
            this.expression();
            this.state = 79;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while(_la===TspFastParser.T__1) {
                this.state = 75;
                this.match(TspFastParser.T__1);
                this.state = 76;
                this.expression();
                this.state = 81;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 82;
            this.functionCall();
            break;

        case 3:
            this.enterOuterAlt(localctx, 3);
            this.state = 83;
            this.match(TspFastParser.T__3);
            this.state = 90;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << TspFastParser.T__3) | (1 << TspFastParser.T__5) | (1 << TspFastParser.T__6) | (1 << TspFastParser.T__8) | (1 << TspFastParser.T__12) | (1 << TspFastParser.T__13) | (1 << TspFastParser.T__14) | (1 << TspFastParser.T__16) | (1 << TspFastParser.T__19))) !== 0) || _la===TspFastParser.LOCAL || _la===TspFastParser.NAME) {
                this.state = 84;
                this.statement();
                this.state = 86;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if(_la===TspFastParser.T__0) {
                    this.state = 85;
                    this.match(TspFastParser.T__0);
                }

                this.state = 92;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            this.state = 93;
            this.match(TspFastParser.T__4);
            break;

        case 4:
            this.enterOuterAlt(localctx, 4);
            this.state = 94;
            this.match(TspFastParser.T__5);
            this.state = 95;
            this.expression();
            this.state = 96;
            this.match(TspFastParser.T__3);
            this.state = 103;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << TspFastParser.T__3) | (1 << TspFastParser.T__5) | (1 << TspFastParser.T__6) | (1 << TspFastParser.T__8) | (1 << TspFastParser.T__12) | (1 << TspFastParser.T__13) | (1 << TspFastParser.T__14) | (1 << TspFastParser.T__16) | (1 << TspFastParser.T__19))) !== 0) || _la===TspFastParser.LOCAL || _la===TspFastParser.NAME) {
                this.state = 97;
                this.statement();
                this.state = 99;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if(_la===TspFastParser.T__0) {
                    this.state = 98;
                    this.match(TspFastParser.T__0);
                }

                this.state = 105;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            this.state = 106;
            this.match(TspFastParser.T__4);
            break;

        case 5:
            this.enterOuterAlt(localctx, 5);
            this.state = 108;
            this.match(TspFastParser.T__6);
            this.state = 115;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << TspFastParser.T__3) | (1 << TspFastParser.T__5) | (1 << TspFastParser.T__6) | (1 << TspFastParser.T__8) | (1 << TspFastParser.T__12) | (1 << TspFastParser.T__13) | (1 << TspFastParser.T__14) | (1 << TspFastParser.T__16) | (1 << TspFastParser.T__19))) !== 0) || _la===TspFastParser.LOCAL || _la===TspFastParser.NAME) {
                this.state = 109;
                this.statement();
                this.state = 111;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if(_la===TspFastParser.T__0) {
                    this.state = 110;
                    this.match(TspFastParser.T__0);
                }

                this.state = 117;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            this.state = 118;
            this.match(TspFastParser.T__7);
            this.state = 119;
            this.expression();
            break;

        case 6:
            this.enterOuterAlt(localctx, 6);
            this.state = 120;
            this.match(TspFastParser.T__8);
            this.state = 121;
            this.expression();
            this.state = 122;
            this.match(TspFastParser.T__9);
            this.state = 129;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << TspFastParser.T__3) | (1 << TspFastParser.T__5) | (1 << TspFastParser.T__6) | (1 << TspFastParser.T__8) | (1 << TspFastParser.T__12) | (1 << TspFastParser.T__13) | (1 << TspFastParser.T__14) | (1 << TspFastParser.T__16) | (1 << TspFastParser.T__19))) !== 0) || _la===TspFastParser.LOCAL || _la===TspFastParser.NAME) {
                this.state = 123;
                this.statement();
                this.state = 125;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if(_la===TspFastParser.T__0) {
                    this.state = 124;
                    this.match(TspFastParser.T__0);
                }

                this.state = 131;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            this.state = 146;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while(_la===TspFastParser.T__10) {
                this.state = 132;
                this.match(TspFastParser.T__10);
                this.state = 133;
                this.expression();
                this.state = 134;
                this.match(TspFastParser.T__9);
                this.state = 141;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << TspFastParser.T__3) | (1 << TspFastParser.T__5) | (1 << TspFastParser.T__6) | (1 << TspFastParser.T__8) | (1 << TspFastParser.T__12) | (1 << TspFastParser.T__13) | (1 << TspFastParser.T__14) | (1 << TspFastParser.T__16) | (1 << TspFastParser.T__19))) !== 0) || _la===TspFastParser.LOCAL || _la===TspFastParser.NAME) {
                    this.state = 135;
                    this.statement();
                    this.state = 137;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                    if(_la===TspFastParser.T__0) {
                        this.state = 136;
                        this.match(TspFastParser.T__0);
                    }

                    this.state = 143;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                }
                this.state = 148;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            this.state = 159;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if(_la===TspFastParser.T__11) {
                this.state = 149;
                this.match(TspFastParser.T__11);
                this.state = 156;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << TspFastParser.T__3) | (1 << TspFastParser.T__5) | (1 << TspFastParser.T__6) | (1 << TspFastParser.T__8) | (1 << TspFastParser.T__12) | (1 << TspFastParser.T__13) | (1 << TspFastParser.T__14) | (1 << TspFastParser.T__16) | (1 << TspFastParser.T__19))) !== 0) || _la===TspFastParser.LOCAL || _la===TspFastParser.NAME) {
                    this.state = 150;
                    this.statement();
                    this.state = 152;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                    if(_la===TspFastParser.T__0) {
                        this.state = 151;
                        this.match(TspFastParser.T__0);
                    }

                    this.state = 158;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                }
            }

            this.state = 161;
            this.match(TspFastParser.T__4);
            break;

        case 7:
            this.enterOuterAlt(localctx, 7);
            this.state = 163;
            this.match(TspFastParser.T__12);
            this.state = 172;
            this._errHandler.sync(this);
            var la_ = this._interp.adaptivePredict(this._input,19,this._ctx);
            if(la_===1) {
                this.state = 164;
                this.expression();
                this.state = 169;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while(_la===TspFastParser.T__1) {
                    this.state = 165;
                    this.match(TspFastParser.T__1);
                    this.state = 166;
                    this.expression();
                    this.state = 171;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                }

            }
            break;

        case 8:
            this.enterOuterAlt(localctx, 8);
            this.state = 174;
            this.match(TspFastParser.T__13);
            break;

        case 9:
            this.enterOuterAlt(localctx, 9);
            this.state = 175;
            this.match(TspFastParser.T__14);
            this.state = 176;
            this.match(TspFastParser.NAME);
            this.state = 177;
            this.match(TspFastParser.T__2);
            this.state = 178;
            this.expression();
            this.state = 179;
            this.match(TspFastParser.T__1);
            this.state = 180;
            this.expression();
            this.state = 183;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if(_la===TspFastParser.T__1) {
                this.state = 181;
                this.match(TspFastParser.T__1);
                this.state = 182;
                this.expression();
            }

            this.state = 185;
            this.match(TspFastParser.T__3);
            this.state = 192;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << TspFastParser.T__3) | (1 << TspFastParser.T__5) | (1 << TspFastParser.T__6) | (1 << TspFastParser.T__8) | (1 << TspFastParser.T__12) | (1 << TspFastParser.T__13) | (1 << TspFastParser.T__14) | (1 << TspFastParser.T__16) | (1 << TspFastParser.T__19))) !== 0) || _la===TspFastParser.LOCAL || _la===TspFastParser.NAME) {
                this.state = 186;
                this.statement();
                this.state = 188;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if(_la===TspFastParser.T__0) {
                    this.state = 187;
                    this.match(TspFastParser.T__0);
                }

                this.state = 194;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            this.state = 195;
            this.match(TspFastParser.T__4);
            break;

        case 10:
            this.enterOuterAlt(localctx, 10);
            this.state = 197;
            this.match(TspFastParser.T__14);
            this.state = 198;
            this.match(TspFastParser.NAME);
            this.state = 203;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while(_la===TspFastParser.T__1) {
                this.state = 199;
                this.match(TspFastParser.T__1);
                this.state = 200;
                this.match(TspFastParser.NAME);
                this.state = 205;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            this.state = 206;
            this.match(TspFastParser.T__15);
            this.state = 207;
            this.expression();
            this.state = 212;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while(_la===TspFastParser.T__1) {
                this.state = 208;
                this.match(TspFastParser.T__1);
                this.state = 209;
                this.expression();
                this.state = 214;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            this.state = 215;
            this.match(TspFastParser.T__3);
            this.state = 222;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << TspFastParser.T__3) | (1 << TspFastParser.T__5) | (1 << TspFastParser.T__6) | (1 << TspFastParser.T__8) | (1 << TspFastParser.T__12) | (1 << TspFastParser.T__13) | (1 << TspFastParser.T__14) | (1 << TspFastParser.T__16) | (1 << TspFastParser.T__19))) !== 0) || _la===TspFastParser.LOCAL || _la===TspFastParser.NAME) {
                this.state = 216;
                this.statement();
                this.state = 218;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if(_la===TspFastParser.T__0) {
                    this.state = 217;
                    this.match(TspFastParser.T__0);
                }

                this.state = 224;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            this.state = 225;
            this.match(TspFastParser.T__4);
            break;

        case 11:
            this.enterOuterAlt(localctx, 11);
            this.state = 227;
            this.match(TspFastParser.T__16);
            this.state = 228;
            this.match(TspFastParser.NAME);
            this.state = 233;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while(_la===TspFastParser.T__17) {
                this.state = 229;
                this.match(TspFastParser.T__17);
                this.state = 230;
                this.match(TspFastParser.NAME);
                this.state = 235;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            this.state = 238;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if(_la===TspFastParser.T__18) {
                this.state = 236;
                this.match(TspFastParser.T__18);
                this.state = 237;
                this.match(TspFastParser.NAME);
            }

            this.state = 240;
            this.match(TspFastParser.T__19);
            this.state = 254;
            this._errHandler.sync(this);
            switch (this._input.LA(1)) {
            case TspFastParser.NAME:
            	this.state = 241;
            	this.match(TspFastParser.NAME);
            	this.state = 246;
            	this._errHandler.sync(this);
            	var _alt = this._interp.adaptivePredict(this._input,29,this._ctx)
            	while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            	    if(_alt===1) {
            	        this.state = 242;
            	        this.match(TspFastParser.T__1);
            	        this.state = 243;
            	        this.match(TspFastParser.NAME); 
            	    }
            	    this.state = 248;
            	    this._errHandler.sync(this);
            	    _alt = this._interp.adaptivePredict(this._input,29,this._ctx);
            	}

            	this.state = 251;
            	this._errHandler.sync(this);
            	_la = this._input.LA(1);
            	if(_la===TspFastParser.T__1) {
            	    this.state = 249;
            	    this.match(TspFastParser.T__1);
            	    this.state = 250;
            	    this.match(TspFastParser.VARARG);
            	}

            	break;
            case TspFastParser.VARARG:
            	this.state = 253;
            	this.match(TspFastParser.VARARG);
            	break;
            case TspFastParser.T__20:
            	break;
            default:
            	break;
            }
            this.state = 256;
            this.match(TspFastParser.T__20);
            this.state = 263;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << TspFastParser.T__3) | (1 << TspFastParser.T__5) | (1 << TspFastParser.T__6) | (1 << TspFastParser.T__8) | (1 << TspFastParser.T__12) | (1 << TspFastParser.T__13) | (1 << TspFastParser.T__14) | (1 << TspFastParser.T__16) | (1 << TspFastParser.T__19))) !== 0) || _la===TspFastParser.LOCAL || _la===TspFastParser.NAME) {
                this.state = 257;
                this.statement();
                this.state = 259;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if(_la===TspFastParser.T__0) {
                    this.state = 258;
                    this.match(TspFastParser.T__0);
                }

                this.state = 265;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            this.state = 266;
            this.match(TspFastParser.T__4);
            break;

        case 12:
            this.enterOuterAlt(localctx, 12);
            this.state = 267;
            this.match(TspFastParser.LOCAL);
            this.state = 268;
            this.match(TspFastParser.T__16);
            this.state = 269;
            this.match(TspFastParser.NAME);
            this.state = 270;
            this.match(TspFastParser.T__19);
            this.state = 284;
            this._errHandler.sync(this);
            switch (this._input.LA(1)) {
            case TspFastParser.NAME:
            	this.state = 271;
            	this.match(TspFastParser.NAME);
            	this.state = 276;
            	this._errHandler.sync(this);
            	var _alt = this._interp.adaptivePredict(this._input,34,this._ctx)
            	while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            	    if(_alt===1) {
            	        this.state = 272;
            	        this.match(TspFastParser.T__1);
            	        this.state = 273;
            	        this.match(TspFastParser.NAME); 
            	    }
            	    this.state = 278;
            	    this._errHandler.sync(this);
            	    _alt = this._interp.adaptivePredict(this._input,34,this._ctx);
            	}

            	this.state = 281;
            	this._errHandler.sync(this);
            	_la = this._input.LA(1);
            	if(_la===TspFastParser.T__1) {
            	    this.state = 279;
            	    this.match(TspFastParser.T__1);
            	    this.state = 280;
            	    this.match(TspFastParser.VARARG);
            	}

            	break;
            case TspFastParser.VARARG:
            	this.state = 283;
            	this.match(TspFastParser.VARARG);
            	break;
            case TspFastParser.T__20:
            	break;
            default:
            	break;
            }
            this.state = 286;
            this.match(TspFastParser.T__20);
            this.state = 293;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << TspFastParser.T__3) | (1 << TspFastParser.T__5) | (1 << TspFastParser.T__6) | (1 << TspFastParser.T__8) | (1 << TspFastParser.T__12) | (1 << TspFastParser.T__13) | (1 << TspFastParser.T__14) | (1 << TspFastParser.T__16) | (1 << TspFastParser.T__19))) !== 0) || _la===TspFastParser.LOCAL || _la===TspFastParser.NAME) {
                this.state = 287;
                this.statement();
                this.state = 289;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if(_la===TspFastParser.T__0) {
                    this.state = 288;
                    this.match(TspFastParser.T__0);
                }

                this.state = 295;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            this.state = 296;
            this.match(TspFastParser.T__4);
            break;

        case 13:
            this.enterOuterAlt(localctx, 13);
            this.state = 297;
            this.match(TspFastParser.LOCAL);
            this.state = 298;
            this.match(TspFastParser.NAME);
            this.state = 303;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while(_la===TspFastParser.T__1) {
                this.state = 299;
                this.match(TspFastParser.T__1);
                this.state = 300;
                this.match(TspFastParser.NAME);
                this.state = 305;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            this.state = 315;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if(_la===TspFastParser.T__2) {
                this.state = 306;
                this.match(TspFastParser.T__2);
                this.state = 307;
                this.expression();
                this.state = 312;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while(_la===TspFastParser.T__1) {
                    this.state = 308;
                    this.match(TspFastParser.T__1);
                    this.state = 309;
                    this.expression();
                    this.state = 314;
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

function ValueContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = TspFastParser.RULE_value;
    return this;
}

ValueContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ValueContext.prototype.constructor = ValueContext;

ValueContext.prototype.NIL = function() {
    return this.getToken(TspFastParser.NIL, 0);
};

ValueContext.prototype.BOOLEAN = function() {
    return this.getToken(TspFastParser.BOOLEAN, 0);
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
    if(listener instanceof TspFastListener ) {
        listener.enterValue(this);
	}
};

ValueContext.prototype.exitRule = function(listener) {
    if(listener instanceof TspFastListener ) {
        listener.exitValue(this);
	}
};




TspFastParser.ValueContext = ValueContext;

TspFastParser.prototype.value = function() {

    var localctx = new ValueContext(this, this._ctx, this.state);
    this.enterRule(localctx, 4, TspFastParser.RULE_value);
    try {
        this.state = 330;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,43,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 319;
            this.match(TspFastParser.NIL);
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 320;
            this.match(TspFastParser.BOOLEAN);
            break;

        case 3:
            this.enterOuterAlt(localctx, 3);
            this.state = 321;
            this.number();
            break;

        case 4:
            this.enterOuterAlt(localctx, 4);
            this.state = 322;
            this.string();
            break;

        case 5:
            this.enterOuterAlt(localctx, 5);
            this.state = 323;
            this.variable();
            break;

        case 6:
            this.enterOuterAlt(localctx, 6);
            this.state = 324;
            this.functionCall();
            break;

        case 7:
            this.enterOuterAlt(localctx, 7);
            this.state = 325;
            this.tableConstructor();
            break;

        case 8:
            this.enterOuterAlt(localctx, 8);
            this.state = 326;
            this.match(TspFastParser.T__19);
            this.state = 327;
            this.expression();
            this.state = 328;
            this.match(TspFastParser.T__20);
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
    this.ruleIndex = TspFastParser.RULE_expression;
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
        return this.getTokens(TspFastParser.NAME);
    } else {
        return this.getToken(TspFastParser.NAME, i);
    }
};


ExpressionContext.prototype.VARARG = function() {
    return this.getToken(TspFastParser.VARARG, 0);
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
    if(listener instanceof TspFastListener ) {
        listener.enterExpression(this);
	}
};

ExpressionContext.prototype.exitRule = function(listener) {
    if(listener instanceof TspFastListener ) {
        listener.exitExpression(this);
	}
};




TspFastParser.ExpressionContext = ExpressionContext;

TspFastParser.prototype.expression = function() {

    var localctx = new ExpressionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 6, TspFastParser.RULE_expression);
    var _la = 0; // Token type
    try {
        this.state = 380;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,50,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 332;
            this.value();
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 333;
            this.match(TspFastParser.T__16);
            this.state = 334;
            this.match(TspFastParser.T__19);
            this.state = 348;
            this._errHandler.sync(this);
            switch (this._input.LA(1)) {
            case TspFastParser.NAME:
            	this.state = 335;
            	this.match(TspFastParser.NAME);
            	this.state = 340;
            	this._errHandler.sync(this);
            	var _alt = this._interp.adaptivePredict(this._input,44,this._ctx)
            	while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            	    if(_alt===1) {
            	        this.state = 336;
            	        this.match(TspFastParser.T__1);
            	        this.state = 337;
            	        this.match(TspFastParser.NAME); 
            	    }
            	    this.state = 342;
            	    this._errHandler.sync(this);
            	    _alt = this._interp.adaptivePredict(this._input,44,this._ctx);
            	}

            	this.state = 345;
            	this._errHandler.sync(this);
            	_la = this._input.LA(1);
            	if(_la===TspFastParser.T__1) {
            	    this.state = 343;
            	    this.match(TspFastParser.T__1);
            	    this.state = 344;
            	    this.match(TspFastParser.VARARG);
            	}

            	break;
            case TspFastParser.VARARG:
            	this.state = 347;
            	this.match(TspFastParser.VARARG);
            	break;
            case TspFastParser.T__20:
            	break;
            default:
            	break;
            }
            this.state = 350;
            this.match(TspFastParser.T__20);
            this.state = 357;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << TspFastParser.T__3) | (1 << TspFastParser.T__5) | (1 << TspFastParser.T__6) | (1 << TspFastParser.T__8) | (1 << TspFastParser.T__12) | (1 << TspFastParser.T__13) | (1 << TspFastParser.T__14) | (1 << TspFastParser.T__16) | (1 << TspFastParser.T__19))) !== 0) || _la===TspFastParser.LOCAL || _la===TspFastParser.NAME) {
                this.state = 351;
                this.statement();
                this.state = 353;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if(_la===TspFastParser.T__0) {
                    this.state = 352;
                    this.match(TspFastParser.T__0);
                }

                this.state = 359;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            this.state = 360;
            this.match(TspFastParser.T__4);
            break;

        case 3:
            this.enterOuterAlt(localctx, 3);
            this.state = 361;
            this.value();
            this.state = 373;
            this._errHandler.sync(this);
            switch(this._input.LA(1)) {
            case TspFastParser.T__25:
                this.state = 362;
                this.operatorOr();
                break;
            case TspFastParser.T__26:
                this.state = 363;
                this.operatorAnd();
                break;
            case TspFastParser.T__27:
            case TspFastParser.T__28:
            case TspFastParser.T__29:
            case TspFastParser.T__30:
            case TspFastParser.T__31:
            case TspFastParser.T__32:
            case TspFastParser.T__33:
                this.state = 364;
                this.operatorComparison();
                break;
            case TspFastParser.T__40:
                this.state = 365;
                this.operatorBitwiseOr();
                break;
            case TspFastParser.T__41:
                this.state = 366;
                this.operatorBitwiseXor();
                break;
            case TspFastParser.T__39:
                this.state = 367;
                this.operatorBitwiseAnd();
                break;
            case TspFastParser.T__42:
            case TspFastParser.T__43:
                this.state = 368;
                this.operatorBitwiseShift();
                break;
            case TspFastParser.T__34:
                this.state = 369;
                this.operatorStrcat();
                break;
            case TspFastParser.T__35:
            case TspFastParser.T__36:
                this.state = 370;
                this.operatorAddSub();
                break;
            case TspFastParser.T__37:
            case TspFastParser.T__38:
                this.state = 371;
                this.operatorMulDiv();
                break;
            case TspFastParser.T__46:
                this.state = 372;
                this.operatorPower();
                break;
            default:
                throw new antlr4.error.NoViableAltException(this);
            }
            this.state = 375;
            this.expression();
            break;

        case 4:
            this.enterOuterAlt(localctx, 4);
            this.state = 377;
            this.operatorUnary();
            this.state = 378;
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
    this.ruleIndex = TspFastParser.RULE_prefix;
    return this;
}

PrefixContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
PrefixContext.prototype.constructor = PrefixContext;

PrefixContext.prototype.expression = function() {
    return this.getTypedRuleContext(ExpressionContext,0);
};

PrefixContext.prototype.NAME = function() {
    return this.getToken(TspFastParser.NAME, 0);
};

PrefixContext.prototype.enterRule = function(listener) {
    if(listener instanceof TspFastListener ) {
        listener.enterPrefix(this);
	}
};

PrefixContext.prototype.exitRule = function(listener) {
    if(listener instanceof TspFastListener ) {
        listener.exitPrefix(this);
	}
};




TspFastParser.PrefixContext = PrefixContext;

TspFastParser.prototype.prefix = function() {

    var localctx = new PrefixContext(this, this._ctx, this.state);
    this.enterRule(localctx, 8, TspFastParser.RULE_prefix);
    try {
        this.state = 387;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case TspFastParser.T__19:
            this.enterOuterAlt(localctx, 1);
            this.state = 382;
            this.match(TspFastParser.T__19);
            this.state = 383;
            this.expression();
            this.state = 384;
            this.match(TspFastParser.T__20);
            break;
        case TspFastParser.NAME:
            this.enterOuterAlt(localctx, 2);
            this.state = 386;
            this.match(TspFastParser.NAME);
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
    this.ruleIndex = TspFastParser.RULE_suffix;
    return this;
}

SuffixContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
SuffixContext.prototype.constructor = SuffixContext;

SuffixContext.prototype.args = function() {
    return this.getTypedRuleContext(ArgsContext,0);
};

SuffixContext.prototype.NAME = function() {
    return this.getToken(TspFastParser.NAME, 0);
};

SuffixContext.prototype.index = function() {
    return this.getTypedRuleContext(IndexContext,0);
};

SuffixContext.prototype.enterRule = function(listener) {
    if(listener instanceof TspFastListener ) {
        listener.enterSuffix(this);
	}
};

SuffixContext.prototype.exitRule = function(listener) {
    if(listener instanceof TspFastListener ) {
        listener.exitSuffix(this);
	}
};




TspFastParser.SuffixContext = SuffixContext;

TspFastParser.prototype.suffix = function() {

    var localctx = new SuffixContext(this, this._ctx, this.state);
    this.enterRule(localctx, 10, TspFastParser.RULE_suffix);
    var _la = 0; // Token type
    try {
        this.state = 395;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case TspFastParser.T__18:
        case TspFastParser.T__19:
        case TspFastParser.T__23:
        case TspFastParser.NORMALSTRING:
        case TspFastParser.CHARSTRING:
        case TspFastParser.LONGSTRING:
            this.enterOuterAlt(localctx, 1);
            this.state = 391;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if(_la===TspFastParser.T__18) {
                this.state = 389;
                this.match(TspFastParser.T__18);
                this.state = 390;
                this.match(TspFastParser.NAME);
            }

            this.state = 393;
            this.args();
            break;
        case TspFastParser.T__17:
        case TspFastParser.T__21:
            this.enterOuterAlt(localctx, 2);
            this.state = 394;
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
    this.ruleIndex = TspFastParser.RULE_index;
    return this;
}

IndexContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
IndexContext.prototype.constructor = IndexContext;

IndexContext.prototype.expression = function() {
    return this.getTypedRuleContext(ExpressionContext,0);
};

IndexContext.prototype.NAME = function() {
    return this.getToken(TspFastParser.NAME, 0);
};

IndexContext.prototype.enterRule = function(listener) {
    if(listener instanceof TspFastListener ) {
        listener.enterIndex(this);
	}
};

IndexContext.prototype.exitRule = function(listener) {
    if(listener instanceof TspFastListener ) {
        listener.exitIndex(this);
	}
};




TspFastParser.IndexContext = IndexContext;

TspFastParser.prototype.index = function() {

    var localctx = new IndexContext(this, this._ctx, this.state);
    this.enterRule(localctx, 12, TspFastParser.RULE_index);
    try {
        this.state = 403;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case TspFastParser.T__21:
            this.enterOuterAlt(localctx, 1);
            this.state = 397;
            this.match(TspFastParser.T__21);
            this.state = 398;
            this.expression();
            this.state = 399;
            this.match(TspFastParser.T__22);
            break;
        case TspFastParser.T__17:
            this.enterOuterAlt(localctx, 2);
            this.state = 401;
            this.match(TspFastParser.T__17);
            this.state = 402;
            this.match(TspFastParser.NAME);
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
    this.ruleIndex = TspFastParser.RULE_variable;
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
    return this.getToken(TspFastParser.NAME, 0);
};

VariableContext.prototype.enterRule = function(listener) {
    if(listener instanceof TspFastListener ) {
        listener.enterVariable(this);
	}
};

VariableContext.prototype.exitRule = function(listener) {
    if(listener instanceof TspFastListener ) {
        listener.exitVariable(this);
	}
};




TspFastParser.VariableContext = VariableContext;

TspFastParser.prototype.variable = function() {

    var localctx = new VariableContext(this, this._ctx, this.state);
    this.enterRule(localctx, 14, TspFastParser.RULE_variable);
    try {
        this.state = 415;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,56,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 405;
            this.prefix();
            this.state = 409;
            this._errHandler.sync(this);
            var _alt = this._interp.adaptivePredict(this._input,55,this._ctx)
            while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
                if(_alt===1) {
                    this.state = 406;
                    this.suffix(); 
                }
                this.state = 411;
                this._errHandler.sync(this);
                _alt = this._interp.adaptivePredict(this._input,55,this._ctx);
            }

            this.state = 412;
            this.index();
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 414;
            this.match(TspFastParser.NAME);
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
    this.ruleIndex = TspFastParser.RULE_functionCall;
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
    return this.getToken(TspFastParser.NAME, 0);
};

FunctionCallContext.prototype.enterRule = function(listener) {
    if(listener instanceof TspFastListener ) {
        listener.enterFunctionCall(this);
	}
};

FunctionCallContext.prototype.exitRule = function(listener) {
    if(listener instanceof TspFastListener ) {
        listener.exitFunctionCall(this);
	}
};




TspFastParser.FunctionCallContext = FunctionCallContext;

TspFastParser.prototype.functionCall = function() {

    var localctx = new FunctionCallContext(this, this._ctx, this.state);
    this.enterRule(localctx, 16, TspFastParser.RULE_functionCall);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 417;
        this.prefix();
        this.state = 421;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,57,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                this.state = 418;
                this.suffix(); 
            }
            this.state = 423;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,57,this._ctx);
        }

        this.state = 426;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===TspFastParser.T__18) {
            this.state = 424;
            this.match(TspFastParser.T__18);
            this.state = 425;
            this.match(TspFastParser.NAME);
        }

        this.state = 428;
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
    this.ruleIndex = TspFastParser.RULE_args;
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
    if(listener instanceof TspFastListener ) {
        listener.enterArgs(this);
	}
};

ArgsContext.prototype.exitRule = function(listener) {
    if(listener instanceof TspFastListener ) {
        listener.exitArgs(this);
	}
};




TspFastParser.ArgsContext = ArgsContext;

TspFastParser.prototype.args = function() {

    var localctx = new ArgsContext(this, this._ctx, this.state);
    this.enterRule(localctx, 18, TspFastParser.RULE_args);
    var _la = 0; // Token type
    try {
        this.state = 444;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case TspFastParser.T__19:
            this.enterOuterAlt(localctx, 1);
            this.state = 430;
            this.match(TspFastParser.T__19);
            this.state = 439;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << TspFastParser.T__16) | (1 << TspFastParser.T__19) | (1 << TspFastParser.T__23))) !== 0) || ((((_la - 37)) & ~0x1f) == 0 && ((1 << (_la - 37)) & ((1 << (TspFastParser.T__36 - 37)) | (1 << (TspFastParser.T__44 - 37)) | (1 << (TspFastParser.T__45 - 37)) | (1 << (TspFastParser.NIL - 37)) | (1 << (TspFastParser.BOOLEAN - 37)) | (1 << (TspFastParser.NAME - 37)) | (1 << (TspFastParser.NORMALSTRING - 37)) | (1 << (TspFastParser.CHARSTRING - 37)) | (1 << (TspFastParser.LONGSTRING - 37)) | (1 << (TspFastParser.INT - 37)) | (1 << (TspFastParser.HEX - 37)) | (1 << (TspFastParser.FLOAT - 37)))) !== 0)) {
                this.state = 431;
                this.expression();
                this.state = 436;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while(_la===TspFastParser.T__1) {
                    this.state = 432;
                    this.match(TspFastParser.T__1);
                    this.state = 433;
                    this.expression();
                    this.state = 438;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                }
            }

            this.state = 441;
            this.match(TspFastParser.T__20);
            break;
        case TspFastParser.T__23:
            this.enterOuterAlt(localctx, 2);
            this.state = 442;
            this.tableConstructor();
            break;
        case TspFastParser.NORMALSTRING:
        case TspFastParser.CHARSTRING:
        case TspFastParser.LONGSTRING:
            this.enterOuterAlt(localctx, 3);
            this.state = 443;
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
    this.ruleIndex = TspFastParser.RULE_tableConstructor;
    return this;
}

TableConstructorContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
TableConstructorContext.prototype.constructor = TableConstructorContext;

TableConstructorContext.prototype.fieldList = function() {
    return this.getTypedRuleContext(FieldListContext,0);
};

TableConstructorContext.prototype.enterRule = function(listener) {
    if(listener instanceof TspFastListener ) {
        listener.enterTableConstructor(this);
	}
};

TableConstructorContext.prototype.exitRule = function(listener) {
    if(listener instanceof TspFastListener ) {
        listener.exitTableConstructor(this);
	}
};




TspFastParser.TableConstructorContext = TableConstructorContext;

TspFastParser.prototype.tableConstructor = function() {

    var localctx = new TableConstructorContext(this, this._ctx, this.state);
    this.enterRule(localctx, 20, TspFastParser.RULE_tableConstructor);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 446;
        this.match(TspFastParser.T__23);
        this.state = 448;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << TspFastParser.T__16) | (1 << TspFastParser.T__19) | (1 << TspFastParser.T__21) | (1 << TspFastParser.T__23))) !== 0) || ((((_la - 37)) & ~0x1f) == 0 && ((1 << (_la - 37)) & ((1 << (TspFastParser.T__36 - 37)) | (1 << (TspFastParser.T__44 - 37)) | (1 << (TspFastParser.T__45 - 37)) | (1 << (TspFastParser.NIL - 37)) | (1 << (TspFastParser.BOOLEAN - 37)) | (1 << (TspFastParser.NAME - 37)) | (1 << (TspFastParser.NORMALSTRING - 37)) | (1 << (TspFastParser.CHARSTRING - 37)) | (1 << (TspFastParser.LONGSTRING - 37)) | (1 << (TspFastParser.INT - 37)) | (1 << (TspFastParser.HEX - 37)) | (1 << (TspFastParser.FLOAT - 37)))) !== 0)) {
            this.state = 447;
            this.fieldList();
        }

        this.state = 450;
        this.match(TspFastParser.T__24);
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
    this.ruleIndex = TspFastParser.RULE_fieldList;
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
    if(listener instanceof TspFastListener ) {
        listener.enterFieldList(this);
	}
};

FieldListContext.prototype.exitRule = function(listener) {
    if(listener instanceof TspFastListener ) {
        listener.exitFieldList(this);
	}
};




TspFastParser.FieldListContext = FieldListContext;

TspFastParser.prototype.fieldList = function() {

    var localctx = new FieldListContext(this, this._ctx, this.state);
    this.enterRule(localctx, 22, TspFastParser.RULE_fieldList);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 452;
        this.field();
        this.state = 457;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,63,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                this.state = 453;
                _la = this._input.LA(1);
                if(!(_la===TspFastParser.T__0 || _la===TspFastParser.T__1)) {
                this._errHandler.recoverInline(this);
                }
                else {
                	this._errHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 454;
                this.field(); 
            }
            this.state = 459;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,63,this._ctx);
        }

        this.state = 461;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===TspFastParser.T__0 || _la===TspFastParser.T__1) {
            this.state = 460;
            _la = this._input.LA(1);
            if(!(_la===TspFastParser.T__0 || _la===TspFastParser.T__1)) {
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
    this.ruleIndex = TspFastParser.RULE_field;
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
    return this.getToken(TspFastParser.NAME, 0);
};

FieldContext.prototype.enterRule = function(listener) {
    if(listener instanceof TspFastListener ) {
        listener.enterField(this);
	}
};

FieldContext.prototype.exitRule = function(listener) {
    if(listener instanceof TspFastListener ) {
        listener.exitField(this);
	}
};




TspFastParser.FieldContext = FieldContext;

TspFastParser.prototype.field = function() {

    var localctx = new FieldContext(this, this._ctx, this.state);
    this.enterRule(localctx, 24, TspFastParser.RULE_field);
    try {
        this.state = 473;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,65,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 463;
            this.match(TspFastParser.T__21);
            this.state = 464;
            this.expression();
            this.state = 465;
            this.match(TspFastParser.T__22);
            this.state = 466;
            this.match(TspFastParser.T__2);
            this.state = 467;
            this.expression();
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 469;
            this.match(TspFastParser.NAME);
            this.state = 470;
            this.match(TspFastParser.T__2);
            this.state = 471;
            this.expression();
            break;

        case 3:
            this.enterOuterAlt(localctx, 3);
            this.state = 472;
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
    this.ruleIndex = TspFastParser.RULE_operatorOr;
    return this;
}

OperatorOrContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
OperatorOrContext.prototype.constructor = OperatorOrContext;


OperatorOrContext.prototype.enterRule = function(listener) {
    if(listener instanceof TspFastListener ) {
        listener.enterOperatorOr(this);
	}
};

OperatorOrContext.prototype.exitRule = function(listener) {
    if(listener instanceof TspFastListener ) {
        listener.exitOperatorOr(this);
	}
};




TspFastParser.OperatorOrContext = OperatorOrContext;

TspFastParser.prototype.operatorOr = function() {

    var localctx = new OperatorOrContext(this, this._ctx, this.state);
    this.enterRule(localctx, 26, TspFastParser.RULE_operatorOr);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 475;
        this.match(TspFastParser.T__25);
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
    this.ruleIndex = TspFastParser.RULE_operatorAnd;
    return this;
}

OperatorAndContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
OperatorAndContext.prototype.constructor = OperatorAndContext;


OperatorAndContext.prototype.enterRule = function(listener) {
    if(listener instanceof TspFastListener ) {
        listener.enterOperatorAnd(this);
	}
};

OperatorAndContext.prototype.exitRule = function(listener) {
    if(listener instanceof TspFastListener ) {
        listener.exitOperatorAnd(this);
	}
};




TspFastParser.OperatorAndContext = OperatorAndContext;

TspFastParser.prototype.operatorAnd = function() {

    var localctx = new OperatorAndContext(this, this._ctx, this.state);
    this.enterRule(localctx, 28, TspFastParser.RULE_operatorAnd);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 477;
        this.match(TspFastParser.T__26);
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
    this.ruleIndex = TspFastParser.RULE_operatorComparison;
    return this;
}

OperatorComparisonContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
OperatorComparisonContext.prototype.constructor = OperatorComparisonContext;


OperatorComparisonContext.prototype.enterRule = function(listener) {
    if(listener instanceof TspFastListener ) {
        listener.enterOperatorComparison(this);
	}
};

OperatorComparisonContext.prototype.exitRule = function(listener) {
    if(listener instanceof TspFastListener ) {
        listener.exitOperatorComparison(this);
	}
};




TspFastParser.OperatorComparisonContext = OperatorComparisonContext;

TspFastParser.prototype.operatorComparison = function() {

    var localctx = new OperatorComparisonContext(this, this._ctx, this.state);
    this.enterRule(localctx, 30, TspFastParser.RULE_operatorComparison);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 479;
        _la = this._input.LA(1);
        if(!(((((_la - 28)) & ~0x1f) == 0 && ((1 << (_la - 28)) & ((1 << (TspFastParser.T__27 - 28)) | (1 << (TspFastParser.T__28 - 28)) | (1 << (TspFastParser.T__29 - 28)) | (1 << (TspFastParser.T__30 - 28)) | (1 << (TspFastParser.T__31 - 28)) | (1 << (TspFastParser.T__32 - 28)) | (1 << (TspFastParser.T__33 - 28)))) !== 0))) {
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
    this.ruleIndex = TspFastParser.RULE_operatorStrcat;
    return this;
}

OperatorStrcatContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
OperatorStrcatContext.prototype.constructor = OperatorStrcatContext;


OperatorStrcatContext.prototype.enterRule = function(listener) {
    if(listener instanceof TspFastListener ) {
        listener.enterOperatorStrcat(this);
	}
};

OperatorStrcatContext.prototype.exitRule = function(listener) {
    if(listener instanceof TspFastListener ) {
        listener.exitOperatorStrcat(this);
	}
};




TspFastParser.OperatorStrcatContext = OperatorStrcatContext;

TspFastParser.prototype.operatorStrcat = function() {

    var localctx = new OperatorStrcatContext(this, this._ctx, this.state);
    this.enterRule(localctx, 32, TspFastParser.RULE_operatorStrcat);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 481;
        this.match(TspFastParser.T__34);
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
    this.ruleIndex = TspFastParser.RULE_operatorAddSub;
    return this;
}

OperatorAddSubContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
OperatorAddSubContext.prototype.constructor = OperatorAddSubContext;


OperatorAddSubContext.prototype.enterRule = function(listener) {
    if(listener instanceof TspFastListener ) {
        listener.enterOperatorAddSub(this);
	}
};

OperatorAddSubContext.prototype.exitRule = function(listener) {
    if(listener instanceof TspFastListener ) {
        listener.exitOperatorAddSub(this);
	}
};




TspFastParser.OperatorAddSubContext = OperatorAddSubContext;

TspFastParser.prototype.operatorAddSub = function() {

    var localctx = new OperatorAddSubContext(this, this._ctx, this.state);
    this.enterRule(localctx, 34, TspFastParser.RULE_operatorAddSub);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 483;
        _la = this._input.LA(1);
        if(!(_la===TspFastParser.T__35 || _la===TspFastParser.T__36)) {
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
    this.ruleIndex = TspFastParser.RULE_operatorMulDiv;
    return this;
}

OperatorMulDivContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
OperatorMulDivContext.prototype.constructor = OperatorMulDivContext;


OperatorMulDivContext.prototype.enterRule = function(listener) {
    if(listener instanceof TspFastListener ) {
        listener.enterOperatorMulDiv(this);
	}
};

OperatorMulDivContext.prototype.exitRule = function(listener) {
    if(listener instanceof TspFastListener ) {
        listener.exitOperatorMulDiv(this);
	}
};




TspFastParser.OperatorMulDivContext = OperatorMulDivContext;

TspFastParser.prototype.operatorMulDiv = function() {

    var localctx = new OperatorMulDivContext(this, this._ctx, this.state);
    this.enterRule(localctx, 36, TspFastParser.RULE_operatorMulDiv);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 485;
        _la = this._input.LA(1);
        if(!(_la===TspFastParser.T__37 || _la===TspFastParser.T__38)) {
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
    this.ruleIndex = TspFastParser.RULE_operatorBitwiseAnd;
    return this;
}

OperatorBitwiseAndContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
OperatorBitwiseAndContext.prototype.constructor = OperatorBitwiseAndContext;


OperatorBitwiseAndContext.prototype.enterRule = function(listener) {
    if(listener instanceof TspFastListener ) {
        listener.enterOperatorBitwiseAnd(this);
	}
};

OperatorBitwiseAndContext.prototype.exitRule = function(listener) {
    if(listener instanceof TspFastListener ) {
        listener.exitOperatorBitwiseAnd(this);
	}
};




TspFastParser.OperatorBitwiseAndContext = OperatorBitwiseAndContext;

TspFastParser.prototype.operatorBitwiseAnd = function() {

    var localctx = new OperatorBitwiseAndContext(this, this._ctx, this.state);
    this.enterRule(localctx, 38, TspFastParser.RULE_operatorBitwiseAnd);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 487;
        this.match(TspFastParser.T__39);
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
    this.ruleIndex = TspFastParser.RULE_operatorBitwiseOr;
    return this;
}

OperatorBitwiseOrContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
OperatorBitwiseOrContext.prototype.constructor = OperatorBitwiseOrContext;


OperatorBitwiseOrContext.prototype.enterRule = function(listener) {
    if(listener instanceof TspFastListener ) {
        listener.enterOperatorBitwiseOr(this);
	}
};

OperatorBitwiseOrContext.prototype.exitRule = function(listener) {
    if(listener instanceof TspFastListener ) {
        listener.exitOperatorBitwiseOr(this);
	}
};




TspFastParser.OperatorBitwiseOrContext = OperatorBitwiseOrContext;

TspFastParser.prototype.operatorBitwiseOr = function() {

    var localctx = new OperatorBitwiseOrContext(this, this._ctx, this.state);
    this.enterRule(localctx, 40, TspFastParser.RULE_operatorBitwiseOr);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 489;
        this.match(TspFastParser.T__40);
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
    this.ruleIndex = TspFastParser.RULE_operatorBitwiseXor;
    return this;
}

OperatorBitwiseXorContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
OperatorBitwiseXorContext.prototype.constructor = OperatorBitwiseXorContext;


OperatorBitwiseXorContext.prototype.enterRule = function(listener) {
    if(listener instanceof TspFastListener ) {
        listener.enterOperatorBitwiseXor(this);
	}
};

OperatorBitwiseXorContext.prototype.exitRule = function(listener) {
    if(listener instanceof TspFastListener ) {
        listener.exitOperatorBitwiseXor(this);
	}
};




TspFastParser.OperatorBitwiseXorContext = OperatorBitwiseXorContext;

TspFastParser.prototype.operatorBitwiseXor = function() {

    var localctx = new OperatorBitwiseXorContext(this, this._ctx, this.state);
    this.enterRule(localctx, 42, TspFastParser.RULE_operatorBitwiseXor);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 491;
        this.match(TspFastParser.T__41);
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
    this.ruleIndex = TspFastParser.RULE_operatorBitwiseShift;
    return this;
}

OperatorBitwiseShiftContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
OperatorBitwiseShiftContext.prototype.constructor = OperatorBitwiseShiftContext;


OperatorBitwiseShiftContext.prototype.enterRule = function(listener) {
    if(listener instanceof TspFastListener ) {
        listener.enterOperatorBitwiseShift(this);
	}
};

OperatorBitwiseShiftContext.prototype.exitRule = function(listener) {
    if(listener instanceof TspFastListener ) {
        listener.exitOperatorBitwiseShift(this);
	}
};




TspFastParser.OperatorBitwiseShiftContext = OperatorBitwiseShiftContext;

TspFastParser.prototype.operatorBitwiseShift = function() {

    var localctx = new OperatorBitwiseShiftContext(this, this._ctx, this.state);
    this.enterRule(localctx, 44, TspFastParser.RULE_operatorBitwiseShift);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 493;
        _la = this._input.LA(1);
        if(!(_la===TspFastParser.T__42 || _la===TspFastParser.T__43)) {
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
    this.ruleIndex = TspFastParser.RULE_operatorUnary;
    return this;
}

OperatorUnaryContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
OperatorUnaryContext.prototype.constructor = OperatorUnaryContext;


OperatorUnaryContext.prototype.enterRule = function(listener) {
    if(listener instanceof TspFastListener ) {
        listener.enterOperatorUnary(this);
	}
};

OperatorUnaryContext.prototype.exitRule = function(listener) {
    if(listener instanceof TspFastListener ) {
        listener.exitOperatorUnary(this);
	}
};




TspFastParser.OperatorUnaryContext = OperatorUnaryContext;

TspFastParser.prototype.operatorUnary = function() {

    var localctx = new OperatorUnaryContext(this, this._ctx, this.state);
    this.enterRule(localctx, 46, TspFastParser.RULE_operatorUnary);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 495;
        _la = this._input.LA(1);
        if(!(((((_la - 37)) & ~0x1f) == 0 && ((1 << (_la - 37)) & ((1 << (TspFastParser.T__36 - 37)) | (1 << (TspFastParser.T__44 - 37)) | (1 << (TspFastParser.T__45 - 37)))) !== 0))) {
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
    this.ruleIndex = TspFastParser.RULE_operatorPower;
    return this;
}

OperatorPowerContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
OperatorPowerContext.prototype.constructor = OperatorPowerContext;


OperatorPowerContext.prototype.enterRule = function(listener) {
    if(listener instanceof TspFastListener ) {
        listener.enterOperatorPower(this);
	}
};

OperatorPowerContext.prototype.exitRule = function(listener) {
    if(listener instanceof TspFastListener ) {
        listener.exitOperatorPower(this);
	}
};




TspFastParser.OperatorPowerContext = OperatorPowerContext;

TspFastParser.prototype.operatorPower = function() {

    var localctx = new OperatorPowerContext(this, this._ctx, this.state);
    this.enterRule(localctx, 48, TspFastParser.RULE_operatorPower);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 497;
        this.match(TspFastParser.T__46);
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
    this.ruleIndex = TspFastParser.RULE_number;
    return this;
}

NumberContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
NumberContext.prototype.constructor = NumberContext;

NumberContext.prototype.INT = function() {
    return this.getToken(TspFastParser.INT, 0);
};

NumberContext.prototype.HEX = function() {
    return this.getToken(TspFastParser.HEX, 0);
};

NumberContext.prototype.FLOAT = function() {
    return this.getToken(TspFastParser.FLOAT, 0);
};

NumberContext.prototype.enterRule = function(listener) {
    if(listener instanceof TspFastListener ) {
        listener.enterNumber(this);
	}
};

NumberContext.prototype.exitRule = function(listener) {
    if(listener instanceof TspFastListener ) {
        listener.exitNumber(this);
	}
};




TspFastParser.NumberContext = NumberContext;

TspFastParser.prototype.number = function() {

    var localctx = new NumberContext(this, this._ctx, this.state);
    this.enterRule(localctx, 50, TspFastParser.RULE_number);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 499;
        _la = this._input.LA(1);
        if(!(((((_la - 56)) & ~0x1f) == 0 && ((1 << (_la - 56)) & ((1 << (TspFastParser.INT - 56)) | (1 << (TspFastParser.HEX - 56)) | (1 << (TspFastParser.FLOAT - 56)))) !== 0))) {
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
    this.ruleIndex = TspFastParser.RULE_string;
    return this;
}

StringContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
StringContext.prototype.constructor = StringContext;

StringContext.prototype.NORMALSTRING = function() {
    return this.getToken(TspFastParser.NORMALSTRING, 0);
};

StringContext.prototype.CHARSTRING = function() {
    return this.getToken(TspFastParser.CHARSTRING, 0);
};

StringContext.prototype.LONGSTRING = function() {
    return this.getToken(TspFastParser.LONGSTRING, 0);
};

StringContext.prototype.enterRule = function(listener) {
    if(listener instanceof TspFastListener ) {
        listener.enterString(this);
	}
};

StringContext.prototype.exitRule = function(listener) {
    if(listener instanceof TspFastListener ) {
        listener.exitString(this);
	}
};




TspFastParser.StringContext = StringContext;

TspFastParser.prototype.string = function() {

    var localctx = new StringContext(this, this._ctx, this.state);
    this.enterRule(localctx, 52, TspFastParser.RULE_string);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 501;
        _la = this._input.LA(1);
        if(!(((((_la - 53)) & ~0x1f) == 0 && ((1 << (_la - 53)) & ((1 << (TspFastParser.NORMALSTRING - 53)) | (1 << (TspFastParser.CHARSTRING - 53)) | (1 << (TspFastParser.LONGSTRING - 53)))) !== 0))) {
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


exports.TspFastParser = TspFastParser;
