// Generated from ./Tsp.g4 by ANTLR 4.7.1
// jshint ignore: start
var antlr4 = require('antlr4/index');
var TspListener = require('./TspListener').TspListener;
var grammarFileName = "Tsp.g4";

var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0003A\u0199\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004\t",
    "\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007\u0004",
    "\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004\f\t\f\u0004",
    "\r\t\r\u0004\u000e\t\u000e\u0004\u000f\t\u000f\u0004\u0010\t\u0010\u0004",
    "\u0011\t\u0011\u0004\u0012\t\u0012\u0004\u0013\t\u0013\u0004\u0014\t",
    "\u0014\u0004\u0015\t\u0015\u0004\u0016\t\u0016\u0004\u0017\t\u0017\u0004",
    "\u0018\t\u0018\u0004\u0019\t\u0019\u0004\u001a\t\u001a\u0004\u001b\t",
    "\u001b\u0004\u001c\t\u001c\u0004\u001d\t\u001d\u0004\u001e\t\u001e\u0004",
    "\u001f\t\u001f\u0004 \t \u0004!\t!\u0004\"\t\"\u0004#\t#\u0004$\t$\u0004",
    "%\t%\u0004&\t&\u0004\'\t\'\u0003\u0002\u0003\u0002\u0003\u0002\u0003",
    "\u0003\u0003\u0003\u0005\u0003T\n\u0003\u0007\u0003V\n\u0003\f\u0003",
    "\u000e\u0003Y\u000b\u0003\u0003\u0004\u0003\u0004\u0003\u0004\u0003",
    "\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003",
    "\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003",
    "\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003",
    "\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003",
    "\u0004\u0003\u0004\u0007\u0004x\n\u0004\f\u0004\u000e\u0004{\u000b\u0004",
    "\u0003\u0004\u0003\u0004\u0005\u0004\u007f\n\u0004\u0003\u0004\u0003",
    "\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003",
    "\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0005\u0004\u008d",
    "\n\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004",
    "\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004",
    "\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004",
    "\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004",
    "\u0003\u0004\u0005\u0004\u00a7\n\u0004\u0005\u0004\u00a9\n\u0004\u0003",
    "\u0005\u0003\u0005\u0005\u0005\u00ad\n\u0005\u0003\u0006\u0003\u0006",
    "\u0003\u0006\u0007\u0006\u00b2\n\u0006\f\u0006\u000e\u0006\u00b5\u000b",
    "\u0006\u0003\u0006\u0003\u0006\u0005\u0006\u00b9\n\u0006\u0003\u0007",
    "\u0003\u0007\u0003\u0007\u0007\u0007\u00be\n\u0007\f\u0007\u000e\u0007",
    "\u00c1\u000b\u0007\u0003\b\u0003\b\u0003\b\u0007\b\u00c6\n\b\f\b\u000e",
    "\b\u00c9\u000b\b\u0003\t\u0003\t\u0003\t\u0007\t\u00ce\n\t\f\t\u000e",
    "\t\u00d1\u000b\t\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003",
    "\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0005\n\u00e0\n\n",
    "\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b",
    "\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b",
    "\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b",
    "\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b",
    "\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b",
    "\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b",
    "\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b",
    "\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0005\u000b",
    "\u0111\n\u000b\u0003\f\u0003\f\u0003\f\u0003\f\u0003\f\u0005\f\u0118",
    "\n\f\u0003\r\u0003\r\u0005\r\u011c\n\r\u0003\u000e\u0003\u000e\u0005",
    "\u000e\u0120\n\u000e\u0003\u000e\u0003\u000e\u0003\u000f\u0003\u000f",
    "\u0003\u000f\u0003\u000f\u0003\u000f\u0003\u000f\u0005\u000f\u012a\n",
    "\u000f\u0003\u0010\u0003\u0010\u0007\u0010\u012e\n\u0010\f\u0010\u000e",
    "\u0010\u0131\u000b\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0005\u0010",
    "\u0136\n\u0010\u0003\u0011\u0003\u0011\u0007\u0011\u013a\n\u0011\f\u0011",
    "\u000e\u0011\u013d\u000b\u0011\u0003\u0011\u0003\u0011\u0003\u0012\u0003",
    "\u0012\u0005\u0012\u0143\n\u0012\u0003\u0012\u0003\u0012\u0003\u0012",
    "\u0005\u0012\u0148\n\u0012\u0003\u0013\u0003\u0013\u0003\u0013\u0003",
    "\u0014\u0003\u0014\u0005\u0014\u014f\n\u0014\u0003\u0014\u0003\u0014",
    "\u0003\u0014\u0003\u0014\u0003\u0015\u0003\u0015\u0003\u0015\u0005\u0015",
    "\u0158\n\u0015\u0003\u0015\u0005\u0015\u015b\n\u0015\u0003\u0016\u0003",
    "\u0016\u0005\u0016\u015f\n\u0016\u0003\u0016\u0003\u0016\u0003\u0017",
    "\u0003\u0017\u0003\u0017\u0003\u0017\u0007\u0017\u0167\n\u0017\f\u0017",
    "\u000e\u0017\u016a\u000b\u0017\u0003\u0017\u0005\u0017\u016d\n\u0017",
    "\u0003\u0018\u0003\u0018\u0003\u0018\u0003\u0018\u0003\u0018\u0003\u0018",
    "\u0003\u0018\u0003\u0018\u0003\u0018\u0003\u0018\u0005\u0018\u0179\n",
    "\u0018\u0003\u0019\u0003\u0019\u0003\u001a\u0003\u001a\u0003\u001b\u0003",
    "\u001b\u0003\u001c\u0003\u001c\u0003\u001d\u0003\u001d\u0003\u001e\u0003",
    "\u001e\u0003\u001f\u0003\u001f\u0003 \u0003 \u0003!\u0003!\u0003\"\u0003",
    "\"\u0003#\u0003#\u0003$\u0003$\u0003%\u0003%\u0003&\u0003&\u0003\'\u0003",
    "\'\u0003\'\u0002\u0002(\u0002\u0004\u0006\b\n\f\u000e\u0010\u0012\u0014",
    "\u0016\u0018\u001a\u001c\u001e \"$&(*,.02468:<>@BDFHJL\u0002\n\u0004",
    "\u0002\u0003\u0003\u0010\u0010\u0003\u0002!\'\u0003\u0002)*\u0003\u0002",
    "+,\u0003\u000201\u0004\u0002**23\u0003\u0002;=\u0003\u00028:\u0002\u01b0",
    "\u0002N\u0003\u0002\u0002\u0002\u0004W\u0003\u0002\u0002\u0002\u0006",
    "\u00a8\u0003\u0002\u0002\u0002\b\u00aa\u0003\u0002\u0002\u0002\n\u00ae",
    "\u0003\u0002\u0002\u0002\f\u00ba\u0003\u0002\u0002\u0002\u000e\u00c2",
    "\u0003\u0002\u0002\u0002\u0010\u00ca\u0003\u0002\u0002\u0002\u0012\u00df",
    "\u0003\u0002\u0002\u0002\u0014\u0110\u0003\u0002\u0002\u0002\u0016\u0117",
    "\u0003\u0002\u0002\u0002\u0018\u011b\u0003\u0002\u0002\u0002\u001a\u011f",
    "\u0003\u0002\u0002\u0002\u001c\u0129\u0003\u0002\u0002\u0002\u001e\u0135",
    "\u0003\u0002\u0002\u0002 \u0137\u0003\u0002\u0002\u0002\"\u0147\u0003",
    "\u0002\u0002\u0002$\u0149\u0003\u0002\u0002\u0002&\u014c\u0003\u0002",
    "\u0002\u0002(\u015a\u0003\u0002\u0002\u0002*\u015c\u0003\u0002\u0002",
    "\u0002,\u0162\u0003\u0002\u0002\u0002.\u0178\u0003\u0002\u0002\u0002",
    "0\u017a\u0003\u0002\u0002\u00022\u017c\u0003\u0002\u0002\u00024\u017e",
    "\u0003\u0002\u0002\u00026\u0180\u0003\u0002\u0002\u00028\u0182\u0003",
    "\u0002\u0002\u0002:\u0184\u0003\u0002\u0002\u0002<\u0186\u0003\u0002",
    "\u0002\u0002>\u0188\u0003\u0002\u0002\u0002@\u018a\u0003\u0002\u0002",
    "\u0002B\u018c\u0003\u0002\u0002\u0002D\u018e\u0003\u0002\u0002\u0002",
    "F\u0190\u0003\u0002\u0002\u0002H\u0192\u0003\u0002\u0002\u0002J\u0194",
    "\u0003\u0002\u0002\u0002L\u0196\u0003\u0002\u0002\u0002NO\u0005\u0004",
    "\u0003\u0002OP\u0007\u0002\u0002\u0003P\u0003\u0003\u0002\u0002\u0002",
    "QS\u0005\u0006\u0004\u0002RT\u0007\u0003\u0002\u0002SR\u0003\u0002\u0002",
    "\u0002ST\u0003\u0002\u0002\u0002TV\u0003\u0002\u0002\u0002UQ\u0003\u0002",
    "\u0002\u0002VY\u0003\u0002\u0002\u0002WU\u0003\u0002\u0002\u0002WX\u0003",
    "\u0002\u0002\u0002X\u0005\u0003\u0002\u0002\u0002YW\u0003\u0002\u0002",
    "\u0002Z[\u0005\f\u0007\u0002[\\\u0007\u0004\u0002\u0002\\]\u0005\u0010",
    "\t\u0002]\u00a9\u0003\u0002\u0002\u0002^\u00a9\u0005 \u0011\u0002_`",
    "\u0007\u0005\u0002\u0002`a\u0005\u0004\u0003\u0002ab\u0007\u0006\u0002",
    "\u0002b\u00a9\u0003\u0002\u0002\u0002cd\u0007\u0007\u0002\u0002de\u0005",
    "\u0014\u000b\u0002ef\u0007\u0005\u0002\u0002fg\u0005\u0004\u0003\u0002",
    "gh\u0007\u0006\u0002\u0002h\u00a9\u0003\u0002\u0002\u0002ij\u0007\b",
    "\u0002\u0002jk\u0005\u0004\u0003\u0002kl\u0007\t\u0002\u0002lm\u0005",
    "\u0014\u000b\u0002m\u00a9\u0003\u0002\u0002\u0002no\u0007\n\u0002\u0002",
    "op\u0005\u0014\u000b\u0002pq\u0007\u000b\u0002\u0002qy\u0005\u0004\u0003",
    "\u0002rs\u0007\f\u0002\u0002st\u0005\u0014\u000b\u0002tu\u0007\u000b",
    "\u0002\u0002uv\u0005\u0004\u0003\u0002vx\u0003\u0002\u0002\u0002wr\u0003",
    "\u0002\u0002\u0002x{\u0003\u0002\u0002\u0002yw\u0003\u0002\u0002\u0002",
    "yz\u0003\u0002\u0002\u0002z~\u0003\u0002\u0002\u0002{y\u0003\u0002\u0002",
    "\u0002|}\u0007\r\u0002\u0002}\u007f\u0005\u0004\u0003\u0002~|\u0003",
    "\u0002\u0002\u0002~\u007f\u0003\u0002\u0002\u0002\u007f\u0080\u0003",
    "\u0002\u0002\u0002\u0080\u0081\u0007\u0006\u0002\u0002\u0081\u00a9\u0003",
    "\u0002\u0002\u0002\u0082\u00a9\u0005\b\u0005\u0002\u0083\u00a9\u0007",
    "\u000e\u0002\u0002\u0084\u0085\u0007\u000f\u0002\u0002\u0085\u0086\u0007",
    "7\u0002\u0002\u0086\u0087\u0007\u0004\u0002\u0002\u0087\u0088\u0005",
    "\u0014\u000b\u0002\u0088\u0089\u0007\u0010\u0002\u0002\u0089\u008c\u0005",
    "\u0014\u000b\u0002\u008a\u008b\u0007\u0010\u0002\u0002\u008b\u008d\u0005",
    "\u0014\u000b\u0002\u008c\u008a\u0003\u0002\u0002\u0002\u008c\u008d\u0003",
    "\u0002\u0002\u0002\u008d\u008e\u0003\u0002\u0002\u0002\u008e\u008f\u0007",
    "\u0005\u0002\u0002\u008f\u0090\u0005\u0004\u0003\u0002\u0090\u0091\u0007",
    "\u0006\u0002\u0002\u0091\u00a9\u0003\u0002\u0002\u0002\u0092\u0093\u0007",
    "\u000f\u0002\u0002\u0093\u0094\u0005\u000e\b\u0002\u0094\u0095\u0007",
    "\u0011\u0002\u0002\u0095\u0096\u0005\u0010\t\u0002\u0096\u0097\u0007",
    "\u0005\u0002\u0002\u0097\u0098\u0005\u0004\u0003\u0002\u0098\u0099\u0007",
    "\u0006\u0002\u0002\u0099\u00a9\u0003\u0002\u0002\u0002\u009a\u009b\u0007",
    "\u0012\u0002\u0002\u009b\u009c\u0005\n\u0006\u0002\u009c\u009d\u0005",
    "&\u0014\u0002\u009d\u00a9\u0003\u0002\u0002\u0002\u009e\u009f\u0007",
    "5\u0002\u0002\u009f\u00a0\u0007\u0012\u0002\u0002\u00a0\u00a1\u0007",
    "7\u0002\u0002\u00a1\u00a9\u0005&\u0014\u0002\u00a2\u00a3\u00075\u0002",
    "\u0002\u00a3\u00a6\u0005\u000e\b\u0002\u00a4\u00a5\u0007\u0004\u0002",
    "\u0002\u00a5\u00a7\u0005\u0010\t\u0002\u00a6\u00a4\u0003\u0002\u0002",
    "\u0002\u00a6\u00a7\u0003\u0002\u0002\u0002\u00a7\u00a9\u0003\u0002\u0002",
    "\u0002\u00a8Z\u0003\u0002\u0002\u0002\u00a8^\u0003\u0002\u0002\u0002",
    "\u00a8_\u0003\u0002\u0002\u0002\u00a8c\u0003\u0002\u0002\u0002\u00a8",
    "i\u0003\u0002\u0002\u0002\u00a8n\u0003\u0002\u0002\u0002\u00a8\u0082",
    "\u0003\u0002\u0002\u0002\u00a8\u0083\u0003\u0002\u0002\u0002\u00a8\u0084",
    "\u0003\u0002\u0002\u0002\u00a8\u0092\u0003\u0002\u0002\u0002\u00a8\u009a",
    "\u0003\u0002\u0002\u0002\u00a8\u009e\u0003\u0002\u0002\u0002\u00a8\u00a2",
    "\u0003\u0002\u0002\u0002\u00a9\u0007\u0003\u0002\u0002\u0002\u00aa\u00ac",
    "\u0007\u0013\u0002\u0002\u00ab\u00ad\u0005\u0010\t\u0002\u00ac\u00ab",
    "\u0003\u0002\u0002\u0002\u00ac\u00ad\u0003\u0002\u0002\u0002\u00ad\t",
    "\u0003\u0002\u0002\u0002\u00ae\u00b3\u00077\u0002\u0002\u00af\u00b0",
    "\u0007\u0014\u0002\u0002\u00b0\u00b2\u00077\u0002\u0002\u00b1\u00af",
    "\u0003\u0002\u0002\u0002\u00b2\u00b5\u0003\u0002\u0002\u0002\u00b3\u00b1",
    "\u0003\u0002\u0002\u0002\u00b3\u00b4\u0003\u0002\u0002\u0002\u00b4\u00b8",
    "\u0003\u0002\u0002\u0002\u00b5\u00b3\u0003\u0002\u0002\u0002\u00b6\u00b7",
    "\u0007\u0015\u0002\u0002\u00b7\u00b9\u00077\u0002\u0002\u00b8\u00b6",
    "\u0003\u0002\u0002\u0002\u00b8\u00b9\u0003\u0002\u0002\u0002\u00b9\u000b",
    "\u0003\u0002\u0002\u0002\u00ba\u00bf\u0005\u001e\u0010\u0002\u00bb\u00bc",
    "\u0007\u0010\u0002\u0002\u00bc\u00be\u0005\u001e\u0010\u0002\u00bd\u00bb",
    "\u0003\u0002\u0002\u0002\u00be\u00c1\u0003\u0002\u0002\u0002\u00bf\u00bd",
    "\u0003\u0002\u0002\u0002\u00bf\u00c0\u0003\u0002\u0002\u0002\u00c0\r",
    "\u0003\u0002\u0002\u0002\u00c1\u00bf\u0003\u0002\u0002\u0002\u00c2\u00c7",
    "\u00077\u0002\u0002\u00c3\u00c4\u0007\u0010\u0002\u0002\u00c4\u00c6",
    "\u00077\u0002\u0002\u00c5\u00c3\u0003\u0002\u0002\u0002\u00c6\u00c9",
    "\u0003\u0002\u0002\u0002\u00c7\u00c5\u0003\u0002\u0002\u0002\u00c7\u00c8",
    "\u0003\u0002\u0002\u0002\u00c8\u000f\u0003\u0002\u0002\u0002\u00c9\u00c7",
    "\u0003\u0002\u0002\u0002\u00ca\u00cf\u0005\u0014\u000b\u0002\u00cb\u00cc",
    "\u0007\u0010\u0002\u0002\u00cc\u00ce\u0005\u0014\u000b\u0002\u00cd\u00cb",
    "\u0003\u0002\u0002\u0002\u00ce\u00d1\u0003\u0002\u0002\u0002\u00cf\u00cd",
    "\u0003\u0002\u0002\u0002\u00cf\u00d0\u0003\u0002\u0002\u0002\u00d0\u0011",
    "\u0003\u0002\u0002\u0002\u00d1\u00cf\u0003\u0002\u0002\u0002\u00d2\u00e0",
    "\u0007\u0016\u0002\u0002\u00d3\u00e0\u0007\u0017\u0002\u0002\u00d4\u00e0",
    "\u0007\u0018\u0002\u0002\u00d5\u00e0\u0005J&\u0002\u00d6\u00e0\u0005",
    "L\'\u0002\u00d7\u00e0\u0005$\u0013\u0002\u00d8\u00e0\u0005\u001e\u0010",
    "\u0002\u00d9\u00e0\u0005 \u0011\u0002\u00da\u00e0\u0005*\u0016\u0002",
    "\u00db\u00dc\u0007\u0019\u0002\u0002\u00dc\u00dd\u0005\u0014\u000b\u0002",
    "\u00dd\u00de\u0007\u001a\u0002\u0002\u00de\u00e0\u0003\u0002\u0002\u0002",
    "\u00df\u00d2\u0003\u0002\u0002\u0002\u00df\u00d3\u0003\u0002\u0002\u0002",
    "\u00df\u00d4\u0003\u0002\u0002\u0002\u00df\u00d5\u0003\u0002\u0002\u0002",
    "\u00df\u00d6\u0003\u0002\u0002\u0002\u00df\u00d7\u0003\u0002\u0002\u0002",
    "\u00df\u00d8\u0003\u0002\u0002\u0002\u00df\u00d9\u0003\u0002\u0002\u0002",
    "\u00df\u00da\u0003\u0002\u0002\u0002\u00df\u00db\u0003\u0002\u0002\u0002",
    "\u00e0\u0013\u0003\u0002\u0002\u0002\u00e1\u00e2\u0005\u0012\n\u0002",
    "\u00e2\u00e3\u00052\u001a\u0002\u00e3\u00e4\u0005\u0014\u000b\u0002",
    "\u00e4\u0111\u0003\u0002\u0002\u0002\u00e5\u00e6\u0005\u0012\n\u0002",
    "\u00e6\u00e7\u00054\u001b\u0002\u00e7\u00e8\u0005\u0014\u000b\u0002",
    "\u00e8\u0111\u0003\u0002\u0002\u0002\u00e9\u00ea\u0005\u0012\n\u0002",
    "\u00ea\u00eb\u00056\u001c\u0002\u00eb\u00ec\u0005\u0014\u000b\u0002",
    "\u00ec\u0111\u0003\u0002\u0002\u0002\u00ed\u00ee\u0005\u0012\n\u0002",
    "\u00ee\u00ef\u0005@!\u0002\u00ef\u00f0\u0005\u0014\u000b\u0002\u00f0",
    "\u0111\u0003\u0002\u0002\u0002\u00f1\u00f2\u0005\u0012\n\u0002\u00f2",
    "\u00f3\u0005B\"\u0002\u00f3\u00f4\u0005\u0014\u000b\u0002\u00f4\u0111",
    "\u0003\u0002\u0002\u0002\u00f5\u00f6\u0005\u0012\n\u0002\u00f6\u00f7",
    "\u0005> \u0002\u00f7\u00f8\u0005\u0014\u000b\u0002\u00f8\u0111\u0003",
    "\u0002\u0002\u0002\u00f9\u00fa\u0005\u0012\n\u0002\u00fa\u00fb\u0005",
    "D#\u0002\u00fb\u00fc\u0005\u0014\u000b\u0002\u00fc\u0111\u0003\u0002",
    "\u0002\u0002\u00fd\u00fe\u0005\u0012\n\u0002\u00fe\u00ff\u00058\u001d",
    "\u0002\u00ff\u0100\u0005\u0014\u000b\u0002\u0100\u0111\u0003\u0002\u0002",
    "\u0002\u0101\u0102\u0005\u0012\n\u0002\u0102\u0103\u0005:\u001e\u0002",
    "\u0103\u0104\u0005\u0014\u000b\u0002\u0104\u0111\u0003\u0002\u0002\u0002",
    "\u0105\u0106\u0005\u0012\n\u0002\u0106\u0107\u0005<\u001f\u0002\u0107",
    "\u0108\u0005\u0014\u000b\u0002\u0108\u0111\u0003\u0002\u0002\u0002\u0109",
    "\u010a\u0005F$\u0002\u010a\u010b\u0005\u0014\u000b\u0002\u010b\u0111",
    "\u0003\u0002\u0002\u0002\u010c\u010d\u0005\u0012\n\u0002\u010d\u010e",
    "\u0005H%\u0002\u010e\u010f\u0005\u0014\u000b\u0002\u010f\u0111\u0003",
    "\u0002\u0002\u0002\u0110\u00e1\u0003\u0002\u0002\u0002\u0110\u00e5\u0003",
    "\u0002\u0002\u0002\u0110\u00e9\u0003\u0002\u0002\u0002\u0110\u00ed\u0003",
    "\u0002\u0002\u0002\u0110\u00f1\u0003\u0002\u0002\u0002\u0110\u00f5\u0003",
    "\u0002\u0002\u0002\u0110\u00f9\u0003\u0002\u0002\u0002\u0110\u00fd\u0003",
    "\u0002\u0002\u0002\u0110\u0101\u0003\u0002\u0002\u0002\u0110\u0105\u0003",
    "\u0002\u0002\u0002\u0110\u0109\u0003\u0002\u0002\u0002\u0110\u010c\u0003",
    "\u0002\u0002\u0002\u0111\u0015\u0003\u0002\u0002\u0002\u0112\u0113\u0007",
    "\u0019\u0002\u0002\u0113\u0114\u0005\u0014\u000b\u0002\u0114\u0115\u0007",
    "\u001a\u0002\u0002\u0115\u0118\u0003\u0002\u0002\u0002\u0116\u0118\u0007",
    "7\u0002\u0002\u0117\u0112\u0003\u0002\u0002\u0002\u0117\u0116\u0003",
    "\u0002\u0002\u0002\u0118\u0017\u0003\u0002\u0002\u0002\u0119\u011c\u0005",
    "\u001a\u000e\u0002\u011a\u011c\u0005\u001c\u000f\u0002\u011b\u0119\u0003",
    "\u0002\u0002\u0002\u011b\u011a\u0003\u0002\u0002\u0002\u011c\u0019\u0003",
    "\u0002\u0002\u0002\u011d\u011e\u0007\u0015\u0002\u0002\u011e\u0120\u0007",
    "7\u0002\u0002\u011f\u011d\u0003\u0002\u0002\u0002\u011f\u0120\u0003",
    "\u0002\u0002\u0002\u0120\u0121\u0003\u0002\u0002\u0002\u0121\u0122\u0005",
    "\"\u0012\u0002\u0122\u001b\u0003\u0002\u0002\u0002\u0123\u0124\u0007",
    "\u001b\u0002\u0002\u0124\u0125\u0005\u0014\u000b\u0002\u0125\u0126\u0007",
    "\u001c\u0002\u0002\u0126\u012a\u0003\u0002\u0002\u0002\u0127\u0128\u0007",
    "\u0014\u0002\u0002\u0128\u012a\u00077\u0002\u0002\u0129\u0123\u0003",
    "\u0002\u0002\u0002\u0129\u0127\u0003\u0002\u0002\u0002\u012a\u001d\u0003",
    "\u0002\u0002\u0002\u012b\u012f\u0005\u0016\f\u0002\u012c\u012e\u0005",
    "\u0018\r\u0002\u012d\u012c\u0003\u0002\u0002\u0002\u012e\u0131\u0003",
    "\u0002\u0002\u0002\u012f\u012d\u0003\u0002\u0002\u0002\u012f\u0130\u0003",
    "\u0002\u0002\u0002\u0130\u0132\u0003\u0002\u0002\u0002\u0131\u012f\u0003",
    "\u0002\u0002\u0002\u0132\u0133\u0005\u001c\u000f\u0002\u0133\u0136\u0003",
    "\u0002\u0002\u0002\u0134\u0136\u00077\u0002\u0002\u0135\u012b\u0003",
    "\u0002\u0002\u0002\u0135\u0134\u0003\u0002\u0002\u0002\u0136\u001f\u0003",
    "\u0002\u0002\u0002\u0137\u013b\u0005\u0016\f\u0002\u0138\u013a\u0005",
    "\u0018\r\u0002\u0139\u0138\u0003\u0002\u0002\u0002\u013a\u013d\u0003",
    "\u0002\u0002\u0002\u013b\u0139\u0003\u0002\u0002\u0002\u013b\u013c\u0003",
    "\u0002\u0002\u0002\u013c\u013e\u0003\u0002\u0002\u0002\u013d\u013b\u0003",
    "\u0002\u0002\u0002\u013e\u013f\u0005\u001a\u000e\u0002\u013f!\u0003",
    "\u0002\u0002\u0002\u0140\u0142\u0007\u0019\u0002\u0002\u0141\u0143\u0005",
    "\u0010\t\u0002\u0142\u0141\u0003\u0002\u0002\u0002\u0142\u0143\u0003",
    "\u0002\u0002\u0002\u0143\u0144\u0003\u0002\u0002\u0002\u0144\u0148\u0007",
    "\u001a\u0002\u0002\u0145\u0148\u0005*\u0016\u0002\u0146\u0148\u0005",
    "L\'\u0002\u0147\u0140\u0003\u0002\u0002\u0002\u0147\u0145\u0003\u0002",
    "\u0002\u0002\u0147\u0146\u0003\u0002\u0002\u0002\u0148#\u0003\u0002",
    "\u0002\u0002\u0149\u014a\u0007\u0012\u0002\u0002\u014a\u014b\u0005&",
    "\u0014\u0002\u014b%\u0003\u0002\u0002\u0002\u014c\u014e\u0007\u0019",
    "\u0002\u0002\u014d\u014f\u0005(\u0015\u0002\u014e\u014d\u0003\u0002",
    "\u0002\u0002\u014e\u014f\u0003\u0002\u0002\u0002\u014f\u0150\u0003\u0002",
    "\u0002\u0002\u0150\u0151\u0007\u001a\u0002\u0002\u0151\u0152\u0005\u0004",
    "\u0003\u0002\u0152\u0153\u0007\u0006\u0002\u0002\u0153\'\u0003\u0002",
    "\u0002\u0002\u0154\u0157\u0005\u000e\b\u0002\u0155\u0156\u0007\u0010",
    "\u0002\u0002\u0156\u0158\u00076\u0002\u0002\u0157\u0155\u0003\u0002",
    "\u0002\u0002\u0157\u0158\u0003\u0002\u0002\u0002\u0158\u015b\u0003\u0002",
    "\u0002\u0002\u0159\u015b\u00076\u0002\u0002\u015a\u0154\u0003\u0002",
    "\u0002\u0002\u015a\u0159\u0003\u0002\u0002\u0002\u015b)\u0003\u0002",
    "\u0002\u0002\u015c\u015e\u0007\u001d\u0002\u0002\u015d\u015f\u0005,",
    "\u0017\u0002\u015e\u015d\u0003\u0002\u0002\u0002\u015e\u015f\u0003\u0002",
    "\u0002\u0002\u015f\u0160\u0003\u0002\u0002\u0002\u0160\u0161\u0007\u001e",
    "\u0002\u0002\u0161+\u0003\u0002\u0002\u0002\u0162\u0168\u0005.\u0018",
    "\u0002\u0163\u0164\u00050\u0019\u0002\u0164\u0165\u0005.\u0018\u0002",
    "\u0165\u0167\u0003\u0002\u0002\u0002\u0166\u0163\u0003\u0002\u0002\u0002",
    "\u0167\u016a\u0003\u0002\u0002\u0002\u0168\u0166\u0003\u0002\u0002\u0002",
    "\u0168\u0169\u0003\u0002\u0002\u0002\u0169\u016c\u0003\u0002\u0002\u0002",
    "\u016a\u0168\u0003\u0002\u0002\u0002\u016b\u016d\u00050\u0019\u0002",
    "\u016c\u016b\u0003\u0002\u0002\u0002\u016c\u016d\u0003\u0002\u0002\u0002",
    "\u016d-\u0003\u0002\u0002\u0002\u016e\u016f\u0007\u001b\u0002\u0002",
    "\u016f\u0170\u0005\u0014\u000b\u0002\u0170\u0171\u0007\u001c\u0002\u0002",
    "\u0171\u0172\u0007\u0004\u0002\u0002\u0172\u0173\u0005\u0014\u000b\u0002",
    "\u0173\u0179\u0003\u0002\u0002\u0002\u0174\u0175\u00077\u0002\u0002",
    "\u0175\u0176\u0007\u0004\u0002\u0002\u0176\u0179\u0005\u0014\u000b\u0002",
    "\u0177\u0179\u0005\u0014\u000b\u0002\u0178\u016e\u0003\u0002\u0002\u0002",
    "\u0178\u0174\u0003\u0002\u0002\u0002\u0178\u0177\u0003\u0002\u0002\u0002",
    "\u0179/\u0003\u0002\u0002\u0002\u017a\u017b\t\u0002\u0002\u0002\u017b",
    "1\u0003\u0002\u0002\u0002\u017c\u017d\u0007\u001f\u0002\u0002\u017d",
    "3\u0003\u0002\u0002\u0002\u017e\u017f\u0007 \u0002\u0002\u017f5\u0003",
    "\u0002\u0002\u0002\u0180\u0181\t\u0003\u0002\u0002\u01817\u0003\u0002",
    "\u0002\u0002\u0182\u0183\u0007(\u0002\u0002\u01839\u0003\u0002\u0002",
    "\u0002\u0184\u0185\t\u0004\u0002\u0002\u0185;\u0003\u0002\u0002\u0002",
    "\u0186\u0187\t\u0005\u0002\u0002\u0187=\u0003\u0002\u0002\u0002\u0188",
    "\u0189\u0007-\u0002\u0002\u0189?\u0003\u0002\u0002\u0002\u018a\u018b",
    "\u0007.\u0002\u0002\u018bA\u0003\u0002\u0002\u0002\u018c\u018d\u0007",
    "/\u0002\u0002\u018dC\u0003\u0002\u0002\u0002\u018e\u018f\t\u0006\u0002",
    "\u0002\u018fE\u0003\u0002\u0002\u0002\u0190\u0191\t\u0007\u0002\u0002",
    "\u0191G\u0003\u0002\u0002\u0002\u0192\u0193\u00074\u0002\u0002\u0193",
    "I\u0003\u0002\u0002\u0002\u0194\u0195\t\b\u0002\u0002\u0195K\u0003\u0002",
    "\u0002\u0002\u0196\u0197\t\t\u0002\u0002\u0197M\u0003\u0002\u0002\u0002",
    "!SWy~\u008c\u00a6\u00a8\u00ac\u00b3\u00b8\u00bf\u00c7\u00cf\u00df\u0110",
    "\u0117\u011b\u011f\u0129\u012f\u0135\u013b\u0142\u0147\u014e\u0157\u015a",
    "\u015e\u0168\u016c\u0178"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [ null, "';'", "'='", "'do'", "'end'", "'while'", "'repeat'", 
                     "'until'", "'if'", "'then'", "'elseif'", "'else'", 
                     "'break'", "'for'", "','", "'in'", "'function'", "'return'", 
                     "'.'", "':'", "'nil'", "'false'", "'true'", "'('", 
                     "')'", "'['", "']'", "'{'", "'}'", "'or'", "'and'", 
                     "'<'", "'>'", "'<='", "'>='", "'~='", "'!='", "'=='", 
                     "'..'", "'+'", "'-'", "'*'", "'/'", "'&'", "'|'", "'^^'", 
                     "'<<'", "'>>'", "'not'", "'!'", "'^'", "'local'", "'...'" ];

var symbolicNames = [ null, null, null, null, null, null, null, null, null, 
                      null, null, null, null, null, null, null, null, null, 
                      null, null, null, null, null, null, null, null, null, 
                      null, null, null, null, null, null, null, null, null, 
                      null, null, null, null, null, null, null, null, null, 
                      null, null, null, null, null, null, "LOCAL", "VARARG", 
                      "NAME", "NORMALSTRING", "CHARSTRING", "LONGSTRING", 
                      "INT", "HEX", "FLOAT", "LONGCOMMENT", "LINE_COMMENT", 
                      "WS", "SHEBANG" ];

var ruleNames =  [ "chunk", "block", "statement", "returnStatement", "functionName", 
                   "variableList", "nameList", "expressionList", "value", 
                   "expression", "prefix", "suffix", "objectCall", "index", 
                   "variable", "functionCall", "args", "functionDefinition", 
                   "functionBody", "parameterList", "tableConstructor", 
                   "fieldList", "field", "fieldSeparator", "operatorOr", 
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
TspParser.T__47 = 48;
TspParser.T__48 = 49;
TspParser.T__49 = 50;
TspParser.LOCAL = 51;
TspParser.VARARG = 52;
TspParser.NAME = 53;
TspParser.NORMALSTRING = 54;
TspParser.CHARSTRING = 55;
TspParser.LONGSTRING = 56;
TspParser.INT = 57;
TspParser.HEX = 58;
TspParser.FLOAT = 59;
TspParser.LONGCOMMENT = 60;
TspParser.LINE_COMMENT = 61;
TspParser.WS = 62;
TspParser.SHEBANG = 63;

TspParser.RULE_chunk = 0;
TspParser.RULE_block = 1;
TspParser.RULE_statement = 2;
TspParser.RULE_returnStatement = 3;
TspParser.RULE_functionName = 4;
TspParser.RULE_variableList = 5;
TspParser.RULE_nameList = 6;
TspParser.RULE_expressionList = 7;
TspParser.RULE_value = 8;
TspParser.RULE_expression = 9;
TspParser.RULE_prefix = 10;
TspParser.RULE_suffix = 11;
TspParser.RULE_objectCall = 12;
TspParser.RULE_index = 13;
TspParser.RULE_variable = 14;
TspParser.RULE_functionCall = 15;
TspParser.RULE_args = 16;
TspParser.RULE_functionDefinition = 17;
TspParser.RULE_functionBody = 18;
TspParser.RULE_parameterList = 19;
TspParser.RULE_tableConstructor = 20;
TspParser.RULE_fieldList = 21;
TspParser.RULE_field = 22;
TspParser.RULE_fieldSeparator = 23;
TspParser.RULE_operatorOr = 24;
TspParser.RULE_operatorAnd = 25;
TspParser.RULE_operatorComparison = 26;
TspParser.RULE_operatorStrcat = 27;
TspParser.RULE_operatorAddSub = 28;
TspParser.RULE_operatorMulDiv = 29;
TspParser.RULE_operatorBitwiseAnd = 30;
TspParser.RULE_operatorBitwiseOr = 31;
TspParser.RULE_operatorBitwiseXor = 32;
TspParser.RULE_operatorBitwiseShift = 33;
TspParser.RULE_operatorUnary = 34;
TspParser.RULE_operatorPower = 35;
TspParser.RULE_number = 36;
TspParser.RULE_string = 37;

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

ChunkContext.prototype.block = function() {
    return this.getTypedRuleContext(BlockContext,0);
};

ChunkContext.prototype.EOF = function() {
    return this.getToken(TspParser.EOF, 0);
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
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 76;
        this.block();
        this.state = 77;
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

function BlockContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = TspParser.RULE_block;
    return this;
}

BlockContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
BlockContext.prototype.constructor = BlockContext;

BlockContext.prototype.statement = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(StatementContext);
    } else {
        return this.getTypedRuleContext(StatementContext,i);
    }
};

BlockContext.prototype.enterRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.enterBlock(this);
	}
};

BlockContext.prototype.exitRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.exitBlock(this);
	}
};




TspParser.BlockContext = BlockContext;

TspParser.prototype.block = function() {

    var localctx = new BlockContext(this, this._ctx, this.state);
    this.enterRule(localctx, 2, TspParser.RULE_block);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 85;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << TspParser.T__2) | (1 << TspParser.T__4) | (1 << TspParser.T__5) | (1 << TspParser.T__7) | (1 << TspParser.T__11) | (1 << TspParser.T__12) | (1 << TspParser.T__15) | (1 << TspParser.T__16) | (1 << TspParser.T__22))) !== 0) || _la===TspParser.LOCAL || _la===TspParser.NAME) {
            this.state = 79;
            this.statement();
            this.state = 81;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if(_la===TspParser.T__0) {
                this.state = 80;
                this.match(TspParser.T__0);
            }

            this.state = 87;
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

StatementContext.prototype.variableList = function() {
    return this.getTypedRuleContext(VariableListContext,0);
};

StatementContext.prototype.expressionList = function() {
    return this.getTypedRuleContext(ExpressionListContext,0);
};

StatementContext.prototype.functionCall = function() {
    return this.getTypedRuleContext(FunctionCallContext,0);
};

StatementContext.prototype.block = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(BlockContext);
    } else {
        return this.getTypedRuleContext(BlockContext,i);
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

StatementContext.prototype.returnStatement = function() {
    return this.getTypedRuleContext(ReturnStatementContext,0);
};

StatementContext.prototype.NAME = function() {
    return this.getToken(TspParser.NAME, 0);
};

StatementContext.prototype.nameList = function() {
    return this.getTypedRuleContext(NameListContext,0);
};

StatementContext.prototype.functionName = function() {
    return this.getTypedRuleContext(FunctionNameContext,0);
};

StatementContext.prototype.functionBody = function() {
    return this.getTypedRuleContext(FunctionBodyContext,0);
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
    this.enterRule(localctx, 4, TspParser.RULE_statement);
    var _la = 0; // Token type
    try {
        this.state = 166;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,6,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 88;
            this.variableList();
            this.state = 89;
            this.match(TspParser.T__1);
            this.state = 90;
            this.expressionList();
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 92;
            this.functionCall();
            break;

        case 3:
            this.enterOuterAlt(localctx, 3);
            this.state = 93;
            this.match(TspParser.T__2);
            this.state = 94;
            this.block();
            this.state = 95;
            this.match(TspParser.T__3);
            break;

        case 4:
            this.enterOuterAlt(localctx, 4);
            this.state = 97;
            this.match(TspParser.T__4);
            this.state = 98;
            this.expression();
            this.state = 99;
            this.match(TspParser.T__2);
            this.state = 100;
            this.block();
            this.state = 101;
            this.match(TspParser.T__3);
            break;

        case 5:
            this.enterOuterAlt(localctx, 5);
            this.state = 103;
            this.match(TspParser.T__5);
            this.state = 104;
            this.block();
            this.state = 105;
            this.match(TspParser.T__6);
            this.state = 106;
            this.expression();
            break;

        case 6:
            this.enterOuterAlt(localctx, 6);
            this.state = 108;
            this.match(TspParser.T__7);
            this.state = 109;
            this.expression();
            this.state = 110;
            this.match(TspParser.T__8);
            this.state = 111;
            this.block();
            this.state = 119;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while(_la===TspParser.T__9) {
                this.state = 112;
                this.match(TspParser.T__9);
                this.state = 113;
                this.expression();
                this.state = 114;
                this.match(TspParser.T__8);
                this.state = 115;
                this.block();
                this.state = 121;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            this.state = 124;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if(_la===TspParser.T__10) {
                this.state = 122;
                this.match(TspParser.T__10);
                this.state = 123;
                this.block();
            }

            this.state = 126;
            this.match(TspParser.T__3);
            break;

        case 7:
            this.enterOuterAlt(localctx, 7);
            this.state = 128;
            this.returnStatement();
            break;

        case 8:
            this.enterOuterAlt(localctx, 8);
            this.state = 129;
            this.match(TspParser.T__11);
            break;

        case 9:
            this.enterOuterAlt(localctx, 9);
            this.state = 130;
            this.match(TspParser.T__12);
            this.state = 131;
            this.match(TspParser.NAME);
            this.state = 132;
            this.match(TspParser.T__1);
            this.state = 133;
            this.expression();
            this.state = 134;
            this.match(TspParser.T__13);
            this.state = 135;
            this.expression();
            this.state = 138;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if(_la===TspParser.T__13) {
                this.state = 136;
                this.match(TspParser.T__13);
                this.state = 137;
                this.expression();
            }

            this.state = 140;
            this.match(TspParser.T__2);
            this.state = 141;
            this.block();
            this.state = 142;
            this.match(TspParser.T__3);
            break;

        case 10:
            this.enterOuterAlt(localctx, 10);
            this.state = 144;
            this.match(TspParser.T__12);
            this.state = 145;
            this.nameList();
            this.state = 146;
            this.match(TspParser.T__14);
            this.state = 147;
            this.expressionList();
            this.state = 148;
            this.match(TspParser.T__2);
            this.state = 149;
            this.block();
            this.state = 150;
            this.match(TspParser.T__3);
            break;

        case 11:
            this.enterOuterAlt(localctx, 11);
            this.state = 152;
            this.match(TspParser.T__15);
            this.state = 153;
            this.functionName();
            this.state = 154;
            this.functionBody();
            break;

        case 12:
            this.enterOuterAlt(localctx, 12);
            this.state = 156;
            this.match(TspParser.LOCAL);
            this.state = 157;
            this.match(TspParser.T__15);
            this.state = 158;
            this.match(TspParser.NAME);
            this.state = 159;
            this.functionBody();
            break;

        case 13:
            this.enterOuterAlt(localctx, 13);
            this.state = 160;
            this.match(TspParser.LOCAL);
            this.state = 161;
            this.nameList();
            this.state = 164;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if(_la===TspParser.T__1) {
                this.state = 162;
                this.match(TspParser.T__1);
                this.state = 163;
                this.expressionList();
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

function ReturnStatementContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = TspParser.RULE_returnStatement;
    return this;
}

ReturnStatementContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ReturnStatementContext.prototype.constructor = ReturnStatementContext;

ReturnStatementContext.prototype.expressionList = function() {
    return this.getTypedRuleContext(ExpressionListContext,0);
};

ReturnStatementContext.prototype.enterRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.enterReturnStatement(this);
	}
};

ReturnStatementContext.prototype.exitRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.exitReturnStatement(this);
	}
};




TspParser.ReturnStatementContext = ReturnStatementContext;

TspParser.prototype.returnStatement = function() {

    var localctx = new ReturnStatementContext(this, this._ctx, this.state);
    this.enterRule(localctx, 6, TspParser.RULE_returnStatement);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 168;
        this.match(TspParser.T__16);
        this.state = 170;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,7,this._ctx);
        if(la_===1) {
            this.state = 169;
            this.expressionList();

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

function FunctionNameContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = TspParser.RULE_functionName;
    return this;
}

FunctionNameContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
FunctionNameContext.prototype.constructor = FunctionNameContext;

FunctionNameContext.prototype.NAME = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(TspParser.NAME);
    } else {
        return this.getToken(TspParser.NAME, i);
    }
};


FunctionNameContext.prototype.enterRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.enterFunctionName(this);
	}
};

FunctionNameContext.prototype.exitRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.exitFunctionName(this);
	}
};




TspParser.FunctionNameContext = FunctionNameContext;

TspParser.prototype.functionName = function() {

    var localctx = new FunctionNameContext(this, this._ctx, this.state);
    this.enterRule(localctx, 8, TspParser.RULE_functionName);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 172;
        this.match(TspParser.NAME);
        this.state = 177;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===TspParser.T__17) {
            this.state = 173;
            this.match(TspParser.T__17);
            this.state = 174;
            this.match(TspParser.NAME);
            this.state = 179;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 182;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===TspParser.T__18) {
            this.state = 180;
            this.match(TspParser.T__18);
            this.state = 181;
            this.match(TspParser.NAME);
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

function VariableListContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = TspParser.RULE_variableList;
    return this;
}

VariableListContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
VariableListContext.prototype.constructor = VariableListContext;

VariableListContext.prototype.variable = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(VariableContext);
    } else {
        return this.getTypedRuleContext(VariableContext,i);
    }
};

VariableListContext.prototype.enterRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.enterVariableList(this);
	}
};

VariableListContext.prototype.exitRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.exitVariableList(this);
	}
};




TspParser.VariableListContext = VariableListContext;

TspParser.prototype.variableList = function() {

    var localctx = new VariableListContext(this, this._ctx, this.state);
    this.enterRule(localctx, 10, TspParser.RULE_variableList);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 184;
        this.variable();
        this.state = 189;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===TspParser.T__13) {
            this.state = 185;
            this.match(TspParser.T__13);
            this.state = 186;
            this.variable();
            this.state = 191;
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

function NameListContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = TspParser.RULE_nameList;
    return this;
}

NameListContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
NameListContext.prototype.constructor = NameListContext;

NameListContext.prototype.NAME = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(TspParser.NAME);
    } else {
        return this.getToken(TspParser.NAME, i);
    }
};


NameListContext.prototype.enterRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.enterNameList(this);
	}
};

NameListContext.prototype.exitRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.exitNameList(this);
	}
};




TspParser.NameListContext = NameListContext;

TspParser.prototype.nameList = function() {

    var localctx = new NameListContext(this, this._ctx, this.state);
    this.enterRule(localctx, 12, TspParser.RULE_nameList);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 192;
        this.match(TspParser.NAME);
        this.state = 197;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,11,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                this.state = 193;
                this.match(TspParser.T__13);
                this.state = 194;
                this.match(TspParser.NAME); 
            }
            this.state = 199;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,11,this._ctx);
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

function ExpressionListContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = TspParser.RULE_expressionList;
    return this;
}

ExpressionListContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ExpressionListContext.prototype.constructor = ExpressionListContext;

ExpressionListContext.prototype.expression = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExpressionContext);
    } else {
        return this.getTypedRuleContext(ExpressionContext,i);
    }
};

ExpressionListContext.prototype.enterRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.enterExpressionList(this);
	}
};

ExpressionListContext.prototype.exitRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.exitExpressionList(this);
	}
};




TspParser.ExpressionListContext = ExpressionListContext;

TspParser.prototype.expressionList = function() {

    var localctx = new ExpressionListContext(this, this._ctx, this.state);
    this.enterRule(localctx, 14, TspParser.RULE_expressionList);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 200;
        this.expression();
        this.state = 205;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===TspParser.T__13) {
            this.state = 201;
            this.match(TspParser.T__13);
            this.state = 202;
            this.expression();
            this.state = 207;
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

ValueContext.prototype.number = function() {
    return this.getTypedRuleContext(NumberContext,0);
};

ValueContext.prototype.string = function() {
    return this.getTypedRuleContext(StringContext,0);
};

ValueContext.prototype.functionDefinition = function() {
    return this.getTypedRuleContext(FunctionDefinitionContext,0);
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
    this.enterRule(localctx, 16, TspParser.RULE_value);
    try {
        this.state = 221;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,13,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 208;
            this.match(TspParser.T__19);
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 209;
            this.match(TspParser.T__20);
            break;

        case 3:
            this.enterOuterAlt(localctx, 3);
            this.state = 210;
            this.match(TspParser.T__21);
            break;

        case 4:
            this.enterOuterAlt(localctx, 4);
            this.state = 211;
            this.number();
            break;

        case 5:
            this.enterOuterAlt(localctx, 5);
            this.state = 212;
            this.string();
            break;

        case 6:
            this.enterOuterAlt(localctx, 6);
            this.state = 213;
            this.functionDefinition();
            break;

        case 7:
            this.enterOuterAlt(localctx, 7);
            this.state = 214;
            this.variable();
            break;

        case 8:
            this.enterOuterAlt(localctx, 8);
            this.state = 215;
            this.functionCall();
            break;

        case 9:
            this.enterOuterAlt(localctx, 9);
            this.state = 216;
            this.tableConstructor();
            break;

        case 10:
            this.enterOuterAlt(localctx, 10);
            this.state = 217;
            this.match(TspParser.T__22);
            this.state = 218;
            this.expression();
            this.state = 219;
            this.match(TspParser.T__23);
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

ExpressionContext.prototype.operatorOr = function() {
    return this.getTypedRuleContext(OperatorOrContext,0);
};

ExpressionContext.prototype.expression = function() {
    return this.getTypedRuleContext(ExpressionContext,0);
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

ExpressionContext.prototype.operatorUnary = function() {
    return this.getTypedRuleContext(OperatorUnaryContext,0);
};

ExpressionContext.prototype.operatorPower = function() {
    return this.getTypedRuleContext(OperatorPowerContext,0);
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
    this.enterRule(localctx, 18, TspParser.RULE_expression);
    try {
        this.state = 270;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,14,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 223;
            this.value();
            this.state = 224;
            this.operatorOr();
            this.state = 225;
            this.expression();
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 227;
            this.value();
            this.state = 228;
            this.operatorAnd();
            this.state = 229;
            this.expression();
            break;

        case 3:
            this.enterOuterAlt(localctx, 3);
            this.state = 231;
            this.value();
            this.state = 232;
            this.operatorComparison();
            this.state = 233;
            this.expression();
            break;

        case 4:
            this.enterOuterAlt(localctx, 4);
            this.state = 235;
            this.value();
            this.state = 236;
            this.operatorBitwiseOr();
            this.state = 237;
            this.expression();
            break;

        case 5:
            this.enterOuterAlt(localctx, 5);
            this.state = 239;
            this.value();
            this.state = 240;
            this.operatorBitwiseXor();
            this.state = 241;
            this.expression();
            break;

        case 6:
            this.enterOuterAlt(localctx, 6);
            this.state = 243;
            this.value();
            this.state = 244;
            this.operatorBitwiseAnd();
            this.state = 245;
            this.expression();
            break;

        case 7:
            this.enterOuterAlt(localctx, 7);
            this.state = 247;
            this.value();
            this.state = 248;
            this.operatorBitwiseShift();
            this.state = 249;
            this.expression();
            break;

        case 8:
            this.enterOuterAlt(localctx, 8);
            this.state = 251;
            this.value();
            this.state = 252;
            this.operatorStrcat();
            this.state = 253;
            this.expression();
            break;

        case 9:
            this.enterOuterAlt(localctx, 9);
            this.state = 255;
            this.value();
            this.state = 256;
            this.operatorAddSub();
            this.state = 257;
            this.expression();
            break;

        case 10:
            this.enterOuterAlt(localctx, 10);
            this.state = 259;
            this.value();
            this.state = 260;
            this.operatorMulDiv();
            this.state = 261;
            this.expression();
            break;

        case 11:
            this.enterOuterAlt(localctx, 11);
            this.state = 263;
            this.operatorUnary();
            this.state = 264;
            this.expression();
            break;

        case 12:
            this.enterOuterAlt(localctx, 12);
            this.state = 266;
            this.value();
            this.state = 267;
            this.operatorPower();
            this.state = 268;
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
    this.enterRule(localctx, 20, TspParser.RULE_prefix);
    try {
        this.state = 277;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case TspParser.T__22:
            this.enterOuterAlt(localctx, 1);
            this.state = 272;
            this.match(TspParser.T__22);
            this.state = 273;
            this.expression();
            this.state = 274;
            this.match(TspParser.T__23);
            break;
        case TspParser.NAME:
            this.enterOuterAlt(localctx, 2);
            this.state = 276;
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

SuffixContext.prototype.objectCall = function() {
    return this.getTypedRuleContext(ObjectCallContext,0);
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
    this.enterRule(localctx, 22, TspParser.RULE_suffix);
    try {
        this.state = 281;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case TspParser.T__18:
        case TspParser.T__22:
        case TspParser.T__26:
        case TspParser.NORMALSTRING:
        case TspParser.CHARSTRING:
        case TspParser.LONGSTRING:
            this.enterOuterAlt(localctx, 1);
            this.state = 279;
            this.objectCall();
            break;
        case TspParser.T__17:
        case TspParser.T__24:
            this.enterOuterAlt(localctx, 2);
            this.state = 280;
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

function ObjectCallContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = TspParser.RULE_objectCall;
    return this;
}

ObjectCallContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ObjectCallContext.prototype.constructor = ObjectCallContext;

ObjectCallContext.prototype.args = function() {
    return this.getTypedRuleContext(ArgsContext,0);
};

ObjectCallContext.prototype.NAME = function() {
    return this.getToken(TspParser.NAME, 0);
};

ObjectCallContext.prototype.enterRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.enterObjectCall(this);
	}
};

ObjectCallContext.prototype.exitRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.exitObjectCall(this);
	}
};




TspParser.ObjectCallContext = ObjectCallContext;

TspParser.prototype.objectCall = function() {

    var localctx = new ObjectCallContext(this, this._ctx, this.state);
    this.enterRule(localctx, 24, TspParser.RULE_objectCall);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 285;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===TspParser.T__18) {
            this.state = 283;
            this.match(TspParser.T__18);
            this.state = 284;
            this.match(TspParser.NAME);
        }

        this.state = 287;
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
    this.enterRule(localctx, 26, TspParser.RULE_index);
    try {
        this.state = 295;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case TspParser.T__24:
            this.enterOuterAlt(localctx, 1);
            this.state = 289;
            this.match(TspParser.T__24);
            this.state = 290;
            this.expression();
            this.state = 291;
            this.match(TspParser.T__25);
            break;
        case TspParser.T__17:
            this.enterOuterAlt(localctx, 2);
            this.state = 293;
            this.match(TspParser.T__17);
            this.state = 294;
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
    this.enterRule(localctx, 28, TspParser.RULE_variable);
    try {
        this.state = 307;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,20,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 297;
            this.prefix();
            this.state = 301;
            this._errHandler.sync(this);
            var _alt = this._interp.adaptivePredict(this._input,19,this._ctx)
            while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
                if(_alt===1) {
                    this.state = 298;
                    this.suffix(); 
                }
                this.state = 303;
                this._errHandler.sync(this);
                _alt = this._interp.adaptivePredict(this._input,19,this._ctx);
            }

            this.state = 304;
            this.index();
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 306;
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

FunctionCallContext.prototype.objectCall = function() {
    return this.getTypedRuleContext(ObjectCallContext,0);
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
    this.enterRule(localctx, 30, TspParser.RULE_functionCall);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 309;
        this.prefix();
        this.state = 313;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,21,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                this.state = 310;
                this.suffix(); 
            }
            this.state = 315;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,21,this._ctx);
        }

        this.state = 316;
        this.objectCall();
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

ArgsContext.prototype.expressionList = function() {
    return this.getTypedRuleContext(ExpressionListContext,0);
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
    this.enterRule(localctx, 32, TspParser.RULE_args);
    var _la = 0; // Token type
    try {
        this.state = 325;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case TspParser.T__22:
            this.enterOuterAlt(localctx, 1);
            this.state = 318;
            this.match(TspParser.T__22);
            this.state = 320;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << TspParser.T__15) | (1 << TspParser.T__19) | (1 << TspParser.T__20) | (1 << TspParser.T__21) | (1 << TspParser.T__22) | (1 << TspParser.T__26))) !== 0) || ((((_la - 40)) & ~0x1f) == 0 && ((1 << (_la - 40)) & ((1 << (TspParser.T__39 - 40)) | (1 << (TspParser.T__47 - 40)) | (1 << (TspParser.T__48 - 40)) | (1 << (TspParser.NAME - 40)) | (1 << (TspParser.NORMALSTRING - 40)) | (1 << (TspParser.CHARSTRING - 40)) | (1 << (TspParser.LONGSTRING - 40)) | (1 << (TspParser.INT - 40)) | (1 << (TspParser.HEX - 40)) | (1 << (TspParser.FLOAT - 40)))) !== 0)) {
                this.state = 319;
                this.expressionList();
            }

            this.state = 322;
            this.match(TspParser.T__23);
            break;
        case TspParser.T__26:
            this.enterOuterAlt(localctx, 2);
            this.state = 323;
            this.tableConstructor();
            break;
        case TspParser.NORMALSTRING:
        case TspParser.CHARSTRING:
        case TspParser.LONGSTRING:
            this.enterOuterAlt(localctx, 3);
            this.state = 324;
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

function FunctionDefinitionContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = TspParser.RULE_functionDefinition;
    return this;
}

FunctionDefinitionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
FunctionDefinitionContext.prototype.constructor = FunctionDefinitionContext;

FunctionDefinitionContext.prototype.functionBody = function() {
    return this.getTypedRuleContext(FunctionBodyContext,0);
};

FunctionDefinitionContext.prototype.enterRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.enterFunctionDefinition(this);
	}
};

FunctionDefinitionContext.prototype.exitRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.exitFunctionDefinition(this);
	}
};




TspParser.FunctionDefinitionContext = FunctionDefinitionContext;

TspParser.prototype.functionDefinition = function() {

    var localctx = new FunctionDefinitionContext(this, this._ctx, this.state);
    this.enterRule(localctx, 34, TspParser.RULE_functionDefinition);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 327;
        this.match(TspParser.T__15);
        this.state = 328;
        this.functionBody();
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

function FunctionBodyContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = TspParser.RULE_functionBody;
    return this;
}

FunctionBodyContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
FunctionBodyContext.prototype.constructor = FunctionBodyContext;

FunctionBodyContext.prototype.block = function() {
    return this.getTypedRuleContext(BlockContext,0);
};

FunctionBodyContext.prototype.parameterList = function() {
    return this.getTypedRuleContext(ParameterListContext,0);
};

FunctionBodyContext.prototype.enterRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.enterFunctionBody(this);
	}
};

FunctionBodyContext.prototype.exitRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.exitFunctionBody(this);
	}
};




TspParser.FunctionBodyContext = FunctionBodyContext;

TspParser.prototype.functionBody = function() {

    var localctx = new FunctionBodyContext(this, this._ctx, this.state);
    this.enterRule(localctx, 36, TspParser.RULE_functionBody);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 330;
        this.match(TspParser.T__22);
        this.state = 332;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===TspParser.VARARG || _la===TspParser.NAME) {
            this.state = 331;
            this.parameterList();
        }

        this.state = 334;
        this.match(TspParser.T__23);
        this.state = 335;
        this.block();
        this.state = 336;
        this.match(TspParser.T__3);
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

function ParameterListContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = TspParser.RULE_parameterList;
    return this;
}

ParameterListContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ParameterListContext.prototype.constructor = ParameterListContext;

ParameterListContext.prototype.nameList = function() {
    return this.getTypedRuleContext(NameListContext,0);
};

ParameterListContext.prototype.VARARG = function() {
    return this.getToken(TspParser.VARARG, 0);
};

ParameterListContext.prototype.enterRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.enterParameterList(this);
	}
};

ParameterListContext.prototype.exitRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.exitParameterList(this);
	}
};




TspParser.ParameterListContext = ParameterListContext;

TspParser.prototype.parameterList = function() {

    var localctx = new ParameterListContext(this, this._ctx, this.state);
    this.enterRule(localctx, 38, TspParser.RULE_parameterList);
    var _la = 0; // Token type
    try {
        this.state = 344;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case TspParser.NAME:
            this.enterOuterAlt(localctx, 1);
            this.state = 338;
            this.nameList();
            this.state = 341;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if(_la===TspParser.T__13) {
                this.state = 339;
                this.match(TspParser.T__13);
                this.state = 340;
                this.match(TspParser.VARARG);
            }

            break;
        case TspParser.VARARG:
            this.enterOuterAlt(localctx, 2);
            this.state = 343;
            this.match(TspParser.VARARG);
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
    this.enterRule(localctx, 40, TspParser.RULE_tableConstructor);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 346;
        this.match(TspParser.T__26);
        this.state = 348;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << TspParser.T__15) | (1 << TspParser.T__19) | (1 << TspParser.T__20) | (1 << TspParser.T__21) | (1 << TspParser.T__22) | (1 << TspParser.T__24) | (1 << TspParser.T__26))) !== 0) || ((((_la - 40)) & ~0x1f) == 0 && ((1 << (_la - 40)) & ((1 << (TspParser.T__39 - 40)) | (1 << (TspParser.T__47 - 40)) | (1 << (TspParser.T__48 - 40)) | (1 << (TspParser.NAME - 40)) | (1 << (TspParser.NORMALSTRING - 40)) | (1 << (TspParser.CHARSTRING - 40)) | (1 << (TspParser.LONGSTRING - 40)) | (1 << (TspParser.INT - 40)) | (1 << (TspParser.HEX - 40)) | (1 << (TspParser.FLOAT - 40)))) !== 0)) {
            this.state = 347;
            this.fieldList();
        }

        this.state = 350;
        this.match(TspParser.T__27);
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

FieldListContext.prototype.fieldSeparator = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(FieldSeparatorContext);
    } else {
        return this.getTypedRuleContext(FieldSeparatorContext,i);
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
    this.enterRule(localctx, 42, TspParser.RULE_fieldList);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 352;
        this.field();
        this.state = 358;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,28,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                this.state = 353;
                this.fieldSeparator();
                this.state = 354;
                this.field(); 
            }
            this.state = 360;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,28,this._ctx);
        }

        this.state = 362;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===TspParser.T__0 || _la===TspParser.T__13) {
            this.state = 361;
            this.fieldSeparator();
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
    this.enterRule(localctx, 44, TspParser.RULE_field);
    try {
        this.state = 374;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,30,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 364;
            this.match(TspParser.T__24);
            this.state = 365;
            this.expression();
            this.state = 366;
            this.match(TspParser.T__25);
            this.state = 367;
            this.match(TspParser.T__1);
            this.state = 368;
            this.expression();
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 370;
            this.match(TspParser.NAME);
            this.state = 371;
            this.match(TspParser.T__1);
            this.state = 372;
            this.expression();
            break;

        case 3:
            this.enterOuterAlt(localctx, 3);
            this.state = 373;
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

function FieldSeparatorContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = TspParser.RULE_fieldSeparator;
    return this;
}

FieldSeparatorContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
FieldSeparatorContext.prototype.constructor = FieldSeparatorContext;


FieldSeparatorContext.prototype.enterRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.enterFieldSeparator(this);
	}
};

FieldSeparatorContext.prototype.exitRule = function(listener) {
    if(listener instanceof TspListener ) {
        listener.exitFieldSeparator(this);
	}
};




TspParser.FieldSeparatorContext = FieldSeparatorContext;

TspParser.prototype.fieldSeparator = function() {

    var localctx = new FieldSeparatorContext(this, this._ctx, this.state);
    this.enterRule(localctx, 46, TspParser.RULE_fieldSeparator);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 376;
        _la = this._input.LA(1);
        if(!(_la===TspParser.T__0 || _la===TspParser.T__13)) {
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
    this.enterRule(localctx, 48, TspParser.RULE_operatorOr);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 378;
        this.match(TspParser.T__28);
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
    this.enterRule(localctx, 50, TspParser.RULE_operatorAnd);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 380;
        this.match(TspParser.T__29);
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
    this.enterRule(localctx, 52, TspParser.RULE_operatorComparison);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 382;
        _la = this._input.LA(1);
        if(!(((((_la - 31)) & ~0x1f) == 0 && ((1 << (_la - 31)) & ((1 << (TspParser.T__30 - 31)) | (1 << (TspParser.T__31 - 31)) | (1 << (TspParser.T__32 - 31)) | (1 << (TspParser.T__33 - 31)) | (1 << (TspParser.T__34 - 31)) | (1 << (TspParser.T__35 - 31)) | (1 << (TspParser.T__36 - 31)))) !== 0))) {
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
    this.enterRule(localctx, 54, TspParser.RULE_operatorStrcat);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 384;
        this.match(TspParser.T__37);
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
    this.enterRule(localctx, 56, TspParser.RULE_operatorAddSub);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 386;
        _la = this._input.LA(1);
        if(!(_la===TspParser.T__38 || _la===TspParser.T__39)) {
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
    this.enterRule(localctx, 58, TspParser.RULE_operatorMulDiv);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 388;
        _la = this._input.LA(1);
        if(!(_la===TspParser.T__40 || _la===TspParser.T__41)) {
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
    this.enterRule(localctx, 60, TspParser.RULE_operatorBitwiseAnd);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 390;
        this.match(TspParser.T__42);
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
    this.enterRule(localctx, 62, TspParser.RULE_operatorBitwiseOr);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 392;
        this.match(TspParser.T__43);
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
    this.enterRule(localctx, 64, TspParser.RULE_operatorBitwiseXor);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 394;
        this.match(TspParser.T__44);
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
    this.enterRule(localctx, 66, TspParser.RULE_operatorBitwiseShift);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 396;
        _la = this._input.LA(1);
        if(!(_la===TspParser.T__45 || _la===TspParser.T__46)) {
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
    this.enterRule(localctx, 68, TspParser.RULE_operatorUnary);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 398;
        _la = this._input.LA(1);
        if(!(((((_la - 40)) & ~0x1f) == 0 && ((1 << (_la - 40)) & ((1 << (TspParser.T__39 - 40)) | (1 << (TspParser.T__47 - 40)) | (1 << (TspParser.T__48 - 40)))) !== 0))) {
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
    this.enterRule(localctx, 70, TspParser.RULE_operatorPower);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 400;
        this.match(TspParser.T__49);
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
    this.enterRule(localctx, 72, TspParser.RULE_number);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 402;
        _la = this._input.LA(1);
        if(!(((((_la - 57)) & ~0x1f) == 0 && ((1 << (_la - 57)) & ((1 << (TspParser.INT - 57)) | (1 << (TspParser.HEX - 57)) | (1 << (TspParser.FLOAT - 57)))) !== 0))) {
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
    this.enterRule(localctx, 74, TspParser.RULE_string);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 404;
        _la = this._input.LA(1);
        if(!(((((_la - 54)) & ~0x1f) == 0 && ((1 << (_la - 54)) & ((1 << (TspParser.NORMALSTRING - 54)) | (1 << (TspParser.CHARSTRING - 54)) | (1 << (TspParser.LONGSTRING - 54)))) !== 0))) {
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
