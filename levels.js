var levels = [
  {
    map: ""
        +"TTTTTTTTT\n"
        +"xxxxxxxxx\n"
        +"x       x\n"
        +"x       x\n"
        +"x       x\n"
        +"x       x\n"
        +"x       x\n"
        +"x   p    \n"
        +"x  /G:   e\n"
        +"xxxxxxxxx\n"
        +"BBBBBBBBB\n"
    ,
    addons: {
      "d": {type: "door", circuit: 0, disableIndicator: true},
      "I": {type: "indicator", circuit: 0},
      "G": {type: "generator", circuit: 0},
      ":": {type: "x", tr: 1},
      "/": {type: "x", tl: 1}
    },
    voice: []
  },
  {
    map: ""
        +" TTTTTTTTTT\n"
        +" xxxxxxxxxx\n"
        +"   ;xxxxxxx\n"
        +"e    ;xxxxx\n"
        +" xx:   ;xxx\n"
        +" xxxx:   ;x\n"
        +" xxxxxx:   p\n"
        +" xxxxxxxx: s\n"
        +" xxxxxxxxxx\n"
        +" BBBBBBBBBB\n"
    ,
    addons: {
      "d": {type: "door", circuit: 0, disableIndicator: true},
      "I": {type: "indicator", circuit: 0},
      "G": {type: "generator", circuit: 0},
      ":": {type: "x", tr: 1},
      ";": {type: "x", bl: 1},
      "e": {type: "e", inversed: true},
      "s": {type: "s", inversed: true}
    },
    voice: []
  },
  {
    map: ""
        +" TTTTTTTTT\n"
        +" xxxxxxxxx\n"
        +" xxxxxxxxx\n"
        +" xxx: ;xxx\n"
        +" xx:   ;xx\n"
        +" x:     ;I\n"
        +"p        d\n"
        +"s        de\n"
        +" xxxx0xxxI\n"
        +" BBBBBBBBB\n"
    ,
    addons: {
      "d": {type: "door", circuit: 0, disableIndicator: true},
      "I": {type: "indicator", circuit: 0},
      "0": {type: "button", circuit: 0, minTime: 100, timeout: 10000},
      ":": {type: "x", br: 1},
      ";": {type: "x", bl: 1}
    },
    voice: []
  },
  {
    map: ""
        +" TTTTTTTTT\n"
        +" xxxxxxxxx\n"
        +" xxxxxxxxx\n"
        +" xxx: ;xxx\n"
        +" xx:   ;xx\n"
        +" I:     ;x\n"
        +" d        p\n"
        +"ed  b     s\n"
        +" Ixxx0xxxx\n"
        +" BBBBBBBBB\n"
    ,
    addons: {
      "d": {type: "door", circuit: 0, disableIndicator: true},
      "I": {type: "indicator", circuit: 0},
      "0": {type: "button", circuit: 0, minTime: 100, timeout: 100},
      ":": {type: "x", br: 1},
      ";": {type: "x", bl: 1},
      "e": {type: "e", inversed: true},
      "s": {type: "s", inversed: true}
    },
    voice: []
  },
  {
    map: ""
        +" TTTTTTTTT\n"
        +" xxxxxxxxx\n"
        +" xxxxgxxxx\n"
        +" xxx: ;xxx\n"
        +" xx:   ;xx\n"
        +" x:     ;I\n"
        +"p        d\n"
        +"s        de\n"
        +" xxxx0xxxI\n"
        +" BBBBBBBBB\n"

    ,
    addons: {
      "d": {type: "door", circuit: 0, disableIndicator: true},
      "g": {type: "machinegun", circuit: 0},
      "I": {type: "indicator", circuit: 0},
      "0": {type: "button", circuit: 0, minTime: 100, timeout: 10000},
      ":": {type: "x", br: 1},
      ";": {type: "x", bl: 1}
    },
    voice: []
  },
  {
    map: ""
        +" TTTTTTTTT\n"
        +" Ixxxxxxxx\n"
        +" d        p\n"
        +"ed       cs\n"
        +" I:     ;x\n"
        +" xx:   ;xx\n"
        +" xxx: ;xxx\n"
        +" xxxx0xxxx\n"
        +" xxxxxxxxx\n"
        +" BBBBBBBBB\n"
    ,
    addons: {
      "d": {type: "door", circuit: 0, disableIndicator: true},
      "I": {type: "indicator", circuit: 0},
      "0": {type: "button", circuit: 0, minTime: 100, timeout: 100},
      ":": {type: "x", tr: 1},
      ";": {type: "x", tl: 1},
      "e": {type: "e", inversed: true},
      "s": {type: "s", inversed: true}
    },
    voice: []
  },
  {
    map: ""
        +" TTTTTTTTT\n"
        +" IxxxGxxxI\n"
        +"pd       d \n"
        +"sd       de\n"
        +" I:     ;I\n"
        +" xx:   ;xx\n"
        +" xxx: ;xxx\n"
        +" xxxx xxxx\n"
        +" xxxx xxxx\n"
        +" BBBB BBBB\n"
    ,
    addons: {
      "d": {type: "door", circuit: 0, disableIndicator: true},
      "I": {type: "indicator", circuit: 0},
      "G": {type: "generator", circuit: 0, repeat: 2000},
      ":": {type: "x", tr: 1},
      ";": {type: "x", tl: 1}
    },
    voice: []
  },
  {
    map: ""
        +" TTTTTTTTT\n"
        +" IxxxGxxxI\n"
        +" d       dp\n"
        +"ed       ds\n"
        +" I:     ;I\n"
        +" xx:   ;xx\n"
        +" xxxlllxxx\n"
        +" xxxlllxxx\n"
        +" XXXlllXXX\n"
        +" XXXlllXXX\n"
        +" XXXlllXXX\n"
        +" XXXlllXXX\n"
        +" BBBBBBBBB\n"
    ,
    addons: {
      "d": {type: "door", circuit: 0, disableIndicator: true},
      "I": {type: "indicator", circuit: 0},
      "G": {type: "generator", circuit: 0, repeat: 2000},
      ":": {type: "x", tr: 1},
      ";": {type: "x", tl: 1},
      "e": {type: "e", inversed: true},
      "s": {type: "s", inversed: true}
    },
    voice: []
  },
  {
    map: ""
        +"  TTT TTT \n"
        +"  /  T  , \n"
        +"    ;G:   \n"
        +" TxxxgxxxT\n"
        +"p          \n"
        +"s         e\n"
        +" xxx   xxx\n"
        +",xx/   ,xx/\n"
        +" BB     BB\n"
        +"   :   ; \n"
        +"   B   B \n"
    ,
    addons: {
      "d": {type: "door", circuit: 0, disableIndicator: true},
      "I": {type: "indicator", circuit: 0},
      "g": {type: "machinegun", circuit: 0},
      "G": {type: "generator", circuit: 0, repeat: 1000},
      ":": {type: "x", tr: 1},
      ";": {type: "x", tl: 1},
      ",": {type: "x", bl: 1},
      "/": {type: "x", br: 1}
    },
    voice: []
  },
  {
    map: ""
        +" TTTTTTTTTTT\n"
        +" x/ ,xxx/ ,x \n"
        +" x   ,F/   x\n"
        +"            p\n"
        +"e           s\n"
        +" IaaabbbaaaG\n"
        +" B:       ;B \n"
        +"  B       B\n"
        +"   :     ; \n"
        +"   B     B \n"
    ,
    addons: {
      "d": {type: "door", circuit: 0, disableIndicator: true},
      "I": {type: "indicator", circuit: 0},
      "a": {type: "door", circuit: 0, disableIndicator: true},
      "b": {type: "door", circuit: 1, disableIndicator: true},
      "G": {type: "generator", circuit: 0, repeat: 1000},
      "F": {type: "generator", circuit: 1, repeat: 2000},
      ":": {type: "x", tr: 1},
      ";": {type: "x", tl: 1},
      ",": {type: "x", bl: 1},
      "/": {type: "x", br: 1},
      "e": {type: "e", inversed: true},
      "s": {type: "s", inversed: true}
    },
    voice: []
  },
  {
    map: ""
        +" T       T\n"
        +" ,TT   TT/\n"
        +"   ,TTT/  \n"
        +"   ;xIx:  \n"
        +"   xgxgx \n"
        +"p        \n"
        +"s c       e\n"
        +" xx:   ;xx\n"
        +" ,B/   ,B/\n"
        +"     c    \n"
        +" ; : 0 ; :\n"
        +" B B B B B\n"
    ,
    addons: {
      "d": {type: "door", circuit: 0, disableIndicator: true},
      "I": {type: "indicator", circuit: 0},
      "g": {type: "machinegun", circuit: 0},
      "G": {type: "generator", circuit: 0},
      "0": {type: "button", circuit: 0},
      ":": {type: "x", tr: 1},
      ";": {type: "x", tl: 1},
      ",": {type: "x", bl: 1},
      "/": {type: "x", br: 1}
    },
    voice: []
  },
  {
    map: ""
        +" TTTTTTTTT\n"
        +" xxx g xxx\n"
        +" xdddddddx\n"
        +"p         \n"
        +"s         e\n"
        +" x0xx0xx0x\n"
        +" BBBBBBBBB\n"
    ,
    addons: {
      "0": {type: "button", circuit: 0, timeout: 10000000},
      "1": {type: "button", circuit: 1, direction: 1},
      "g": {type: "machinegun", circuit: 0},
      "d": {type: "door", circuit: 0, disableIndicator: true},
      "f": {type: "door", circuit: 1, disableIndicator: true},
      "I": {type: "indicator", circuit: 0},
      "J": {type: "indicator", circuit: 1}
    },
    voice: []
  },
  {
    map: ""
        +" TTTTTTTTTTTTT\n"
        +" xxxxxxxxxxxxx\n"
        +" x/  ,xxx/  ,x\n"
        +" x     c     x\n"
        +" xjjjjj0jjjjjg\n"
        +"p jjjjj jjjjj \n"
        +"s jjjj   jjjj e\n"
        +" xxxxxxxxxxxxx\n"
        +" BBBBBBBBBBBBB\n"
    ,
    addons: {
      "0": {type: "button", circuit: 0, timeout: 0},
      "1": {type: "button", circuit: 1, direction: 1},
      "g": {type: "machinegun", circuit: 0},
      "d": {type: "door", circuit: 0, disableIndicator: true},
      "f": {type: "door", circuit: 1, disableIndicator: true},
      "I": {type: "indicator", circuit: 0},
      "J": {type: "indicator", circuit: 1},
      "j": {type: "freejump"},
      ",": {type: "x", bl: 1},
      "/": {type: "x", br: 1}
    },
    voice: []
  },
  {
    map: ""
        +" TTTTTTTTTTT\n"
        +" xxDxCxWxAxx \n"
        +" x d c b a x \n"
        +" x d c b a x \n"
        +" x d c b a x \n"
        +"   d c b a  p\n"
        +"e  d c b a  s\n"
        +" xxD3C2W1A0x \n"
        +" BBBBBBBBBBB\n"
    ,
    addons: {
      "0": {type: "button", circuit: 0, timeout: 3000},
      "1": {type: "button", circuit: 1, timeout: 3000},
      "2": {type: "button", circuit: 2, timeout: 3000},
      "3": {type: "button", circuit: 3, timeout: 3000},
      "a": {type: "door", circuit: 0, disableIndicator: true},
      "b": {type: "door", circuit: 1, disableIndicator: true},
      "c": {type: "door", circuit: 2, disableIndicator: true},
      "d": {type: "door", circuit: 3, disableIndicator: true},
      "A": {type: "indicator", circuit: 0},
      "W": {type: "indicator", circuit: 1},
      "C": {type: "indicator", circuit: 2},
      "D": {type: "indicator", circuit: 3},
      ":": {type: "x", tr: 1},
      ";": {type: "x", tl: 1},
      "e": {type: "e", inversed: true},
      "s": {type: "s", inversed: true}
    },
    voice: []
  },
  {
    map: ""
        +" TTTTTTTTTT\n"
        +" xxxxxxxxxx\n"
        +" xxxx/      \n"
        +" xxx/      e\n"
        +" xx/      : \n"
        +" x/     ffx\n"
        +"p     ffffx\n"
        +"s b ffffffx\n"
        +" x1xJJJJJJx\n"
        +" BBBBBBBBBB\n"
    ,
    addons: {
      "0": {type: "button", circuit: 0, timeout: 10000000, direction: 2},
      "1": {type: "button", circuit: 1},
      "d": {type: "door", circuit: 0, disableIndicator: true},
      "f": {type: "door", circuit: 1, disableIndicator: true},
      "I": {type: "indicator", circuit: 0},
      "J": {type: "indicator", circuit: 1},
      "/": {type: "x", br: 1},
      ";": {type: "x", bl: 1},
      ":": {type: "x", tl: 1}
    },
    voice: []
  },
  {
    map: ""
        +" TTTTTTTTTT\n"
        +" xxxxxxxxxx\n"
        +" xxxx/     p\n"
        +" xxx/      s\n"
        +" xx/    xxx\n"
        +" x/      0x\n"
        +" I        x\n"
        +" d        x\n"
        +"ed   b  :fx\n"
        +" Ixxx1xxxJx\n"
        +" BBBBBBBBBB\n"
    ,
    addons: {
      "0": {type: "button", circuit: 0, timeout: 10000000, direction: 2},
      "1": {type: "button", circuit: 1},
      "d": {type: "door", circuit: 0, disableIndicator: true},
      "f": {type: "door", circuit: 1, disableIndicator: true},
      "I": {type: "indicator", circuit: 0},
      "J": {type: "indicator", circuit: 1},
      ";": {type: "x", bl: 1},
      ":": {type: "x", tl: 1},
      "/": {type: "x", br: 1},
      "e": {type: "e", inversed: true},
      "s": {type: "s", inversed: true}
    },
    voice: []
  },
  {
    map: ""
        +" TTTTTTTTTT\n"
        +" xxxxxxxxxx\n"
        +" xxxx/  GG  \n"
        +" xxx/   GG e\n"
        +" xx/    GGx \n"
        +" x/     GGx\n"
        +"p       GGx\n"
        +"s       GGx\n"
        +" xxxg   GGx\n"
        +" BBBB     B\n"
    ,
    addons: {
      "0": {type: "button", circuit: 0, timeout: 10000000, direction: 2},
      "1": {type: "button", circuit: 1},
      "d": {type: "door", circuit: 0, disableIndicator: true},
      "G": {type: "antigravity", circuit: 1, direction: 2},
      "g": {type: "generator", circuit: 1},
      "/": {type: "x", br: 1},
      ";": {type: "x", bl: 1},
      ":": {type: "x", tl: 1}
    },
    voice: []
  },
  {
    map: ""
        +"   TTTT  \n"
        +"   /  :  \n"
        +"  T    T  \n"
        +"  /    :   \n"
        +"        T  \n"
        +"        :T \n"
        +" T       :T\n"
        +"      GGGGG \n"
        +"     GGGGGG \n"
        +"    GGGGGGGp\n"
        +"e  GGGGGGGGs\n"
        +" x/      ,g\n"
        +" B       BB\n"
        +"           \n"
    ,
    addons: {
      "G": {type: "antigravity", circuit: 1, direction: 2},
      "g": {type: "generator", circuit: 1},
      "/": {type: "x", br: 1},
      ":": {type: "x", bl: 1},
      ",": {type: "x", tl: 1},
      "e": {type: "e", inversed: true},
      "s": {type: "s", inversed: true}
    },
    voice: []
  },
  {
    map: ""
        +" TTTTTTTTTT\n"
        +" xxxxxxxxxI\n"
        +" xxxx/    d \n"
        +" xxx/     de\n"
        +" xx/     :I\n"
        +" xxx0x,  xx\n"
        +"p       :xx\n"
        +"s      :xxx\n"
        +" xxxxxxxxxx\n"
        +" BBBBBBBBBB\n"
    ,
    addons: {
      "0": {type: "button", circuit: 0, timeout: 10000000},
      "d": {type: "door", circuit: 0, disableIndicator: true},
      "I": {type: "indicator", circuit: 0},
      "/": {type: "x", br: 1},
      ";": {type: "x", bl: 1},
      ":": {type: "x", tl: 1},
      ",": {type: "x", tr: 1}
    },
    voice: []
  },
  {
    map: ""
        +" TTTTTTTTTT\n"
        +" xxxxxxxxxx\n"
        +" xxxx/ GGG p\n"
        +" xxx/ G  G s\n"
        +" xx/ G   gx\n"
        +" x/ G    BB\n"
        +" xGG       \n"
        +"           \n"
        +"e          \n"
        +" xx        \n"
        +" BB        \n"
    ,
    addons: {
      "G": {type: "antigravity", circuit: 1, direction: 2},
      "g": {type: "generator", circuit: 1},
      "/": {type: "x", br: 1},
      "e": {type: "e", inversed: true},
      "s": {type: "s", inversed: true}
    },
    voice: []
  },
  {
    map: " TTTTTTTTTT\n"
        +" xxxx/      \n"
        +" xxx/      e\n"
        +" xx/      : \n"
        +" xxwwwwwwxx\n"
        +" xxwwwwwwxx\n"
        +" xxwwwwwwxx\n"
        +" xxwwwwwwxx\n"
        +" xxwwwwwwxx\n"
        +" xxwwwwwwxx\n"
        +" xxwwwwwwxx\n"
        +"p  wwwwwwxx\n"
        +"s  wwwwwwxx\n"
        +" xxwwwwwwxx\n"
        +" BBBBBBBBBB\n"
    ,
    addons: {
      "0": {type: "button", circuit: 0, timeout: 10000000, direction: 2},
      "1": {type: "button", circuit: 1},
      "d": {type: "door", circuit: 0, disableIndicator: true},
      "G": {type: "antigravity", circuit: 1, direction: 2},
      "g": {type: "generator", circuit: 1},
      "/": {type: "x", br: 1},
      ";": {type: "x", bl: 1},
      ":": {type: "x", tl: 1},
      ",": {type: "x", tr: 1}
    },
    voice: []
  },
  {
    map: " TTTTTTTTTT\n"
        +" xRGGGGGGG p\n"
        +" xR      G s\n"
        +" xRxlllll0x\n"
        +" xRxxxxxxxB\n"
        +" xR  :xxBB\n"
        +"  R   :x \n"
        +"e R    : \n"
        +" BR        \n"
    ,
    addons: {
      "G": {type: "antigravity", circuit: 1, direction: 2},
      "R": {type: "antigravity", circuit: 1, direction: 3},
      "0": {type: "button", circuit: 1, timeout: 10000},
      ":": {type: "x", bl: 1},
      "e": {type: "e", inversed: true},
      "s": {type: "s", inversed: true}
    },
    voice: []
  },
  {
    map: " TTTTTTTTTT\n"
        +" xxxx/      \n"
        +" xxx/      e\n"
        +" xx/      : \n"
        +" xxllx,   x\n"
        +" xxllx   :x\n"
        +" xxllx,   x\n"
        +" xxllx   :x\n"
        +" xxllx,   x\n"
        +" xxllx   :x\n"
        +" xxxxx,   x\n"
        +"p        :x\n"
        +"s       :xx\n"
        +" BBllBBBBBB\n"
        +"   ll\n"
        +"   XX\n"
    ,
    addons: {
      "0": {type: "button", circuit: 0, timeout: 10000000, direction: 2},
      "1": {type: "button", circuit: 1},
      "d": {type: "door", circuit: 0, disableIndicator: true},
      "G": {type: "antigravity", circuit: 1, direction: 2},
      "g": {type: "generator", circuit: 1},
      "/": {type: "x", br: 1},
      ";": {type: "x", bl: 1},
      ":": {type: "x", tl: 1},
      ",": {type: "x", tr: 1}
    },
    voice: []
  },
  {
    map: " TTTTTTTTTT\n"
        +" xxxx/    x\n"
        +" xxx/ :lllx\n"
        +" xx/ :xlllx\n"
        +" x/ :xxxxxx\n"
        +" GGGG  GGGGp\n"
        +"e   G     Gs\n"
        +" B  G     g\n"
        +"          B\n"
        +"           \n"
        +"  ,      : \n"
        +"  B      B \n"
    ,
    addons: {
      "G": {type: "antigravity", circuit: 1, direction: 2},
      "g": {type: "generator", circuit: 1},
      "/": {type: "x", br: 1},
      ":": {type: "x", tl: 1},
      ",": {type: "x", tr: 1},
      "e": {type: "e", inversed: true},
      "s": {type: "s", inversed: true}
    },
    voice: []
  },
  {
    map: ""
        +" TTTTTTTTTTTTTT\n"
        +" x             \n"
        +" x       jj    e\n"
        +" x   :x      xx\n"
        +"p   :xxllllllxx\n"
        +"s  :xxxllllllxx\n"
        +" BBBBBBBBBBBBBB\n"
    ,
    addons: {
      ":": {type: "x", tl: 1},
      "/": {type: "x", br: 1},
      "j": {type: "freejump"}
    },
    voice: []
  },
  {
    map: ""
        +" TTTTTTTTTTTTTT\n"
        +" xxxxxxxxxxxxGx\n"
        +" x            x\n"
        +" x           /x\n"
        +" x         /1xx\n"
        +" x       /2xxxx\n"
        +" x     /3xxxxxx\n"
        +" xlllllxxxxxxxx\n"
        +" xxDxxCxxWxxxxx\n"
        +"   d  c  b     p\n"
        +"e  d  c  b     s\n"
        +" xxDxxCxxWxx0xx\n"
        +" BBBBBBBBBBBBBB\n"
    ,
    addons: {
      "0": {type: "button", circuit: 0, timeout: 100},
      "1": {type: "button", circuit: 1, timeout: 1000},
      "2": {type: "button", circuit: 2, timeout: 1000},
      "3": {type: "button", circuit: 3, timeout: 1000},
      "a": {type: "door", circuit: 0, disableIndicator: true},
      "b": {type: "door", circuit: 1, disableIndicator: true},
      "c": {type: "door", circuit: 2, disableIndicator: true},
      "d": {type: "door", circuit: 3, disableIndicator: true},
      "A": {type: "indicator", circuit: 0},
      "W": {type: "indicator", circuit: 1},
      "C": {type: "indicator", circuit: 2},
      "D": {type: "indicator", circuit: 3},
      "G": {type: "giver", give:"c", circuit: 0, max: 1},
      "/": {type: "x", tl: 1},
      ":": {type: "x", tr: 1},
      "e": {type: "e", inversed: true},
      "s": {type: "s", inversed: true}
    },
    voice: []
  },
  {
    map: ""
        +" TTTTTTTTTTTTTT\n"
        +" xxxgxGxxGxgxxx\n"
        +" x            x\n"
        +" x            x\n"
        +" x            x\n"
        +" x            x\n"
        +" x            x\n"
        +" xx3xx2xx1xx0xx\n"
        +"p  d  c  b  a   \n"
        +"s  d  c  b  a  e\n"
        +" xxxxxxxxxxxxxx\n"
        +" BBBBBBBBBBBBBB\n"
    ,
    addons: {
      "0": {type: "button", circuit: 0, timeout: 100},
      "1": {type: "button", circuit: 1, timeout: 1000},
      "2": {type: "button", circuit: 2, timeout: 1000},
      "3": {type: "button", circuit: 3, timeout: 1000},
      "a": {type: "door", circuit: 0, disableIndicator: true},
      "b": {type: "door", circuit: 1, disableIndicator: true},
      "c": {type: "door", circuit: 2, disableIndicator: true},
      "d": {type: "door", circuit: 3, disableIndicator: true},
      "A": {type: "indicator", circuit: 0},
      "W": {type: "indicator", circuit: 1},
      "C": {type: "indicator", circuit: 2},
      "D": {type: "indicator", circuit: 3},
      "G": {type: "giver", give:"c", circuit: 4, max: 15},
      "g": {type: "generator", repeat: 1000, circuit: 4},
      "/": {type: "x", tl: 1},
      ":": {type: "x", tr: 1}
    },
    voice: []
  },
  {
    map: ""
        +"     T T  T T  T T     \n"
        +"  TTT/ :TT/ :TT/ :TTT  \n"
        +"  /                 :  \n"
        +"                       \n"
        +" T      JJ   JJ      T \n"
        +"    J x    x    x J    \n"
        +"   J       x       J  p\n"
        +"e J        x        J s\n"
        +" xlllllllllxlllllllllx\n"
        +" xlllllllxxxxxlllllllx\n"
        +" xlllllxxxxxxxxxlllllx\n"
        +" xlllxxxxxxxxxxxxxlllx\n"
        +" xxxxxxxxxxxxxxxxxxxxx\n"
        +" BBBBBBBBBBBBBBBBBBBBB\n"
    ,
    addons: {
      "J": {type: "freejump"},
      "/": {type: "x", br: 1},
      ":": {type: "x", bl: 1},
      "e": {type: "e", inversed: true},
      "s": {type: "s", inversed: true}
    },
    voice: []
  },
  {
    map: ""
        + "  ,  ;TTTTTTTTT,  ;\n"
        + "  xxxxxxxxxxxxxxxxx\n"
        + " TxxgxgxgxKxGxHxIxxT\n"
        + " x        D        x\n"
        + "p         D        \n"
        + "s         D         e\n"
        + " x b      D        x \n"
        + " Bxx0x1x3xax3x1x2xxB \n"
        + "  xxxxxxxxxxxxxxxxx\n"
        + "  /  :xxxxxxxxx/  :\n"
        + "      BBBBBBBBB     \n"
    ,
    addons: {
      "3": {type: "button", circuit: 3, timeout: 100, minTime: 1000, direction: 0},
      "1": {type: "button", circuit: 1, timeout: 100, minTime: 500, direction: 0},
      "2": {type: "button", circuit: 2, timeout: 100, minTime: 1000, direction: 0},
      "0": {type: "button", circuit: 0, timeout: 100, minTime: 1000, direction: 0},

      "t": {type: "generator", repeat: 0, circuit: 4},

      "a": {type: "and", circuit: 5, andCircuits: [0,1,2]},

      "g": {type: "machinegun", circuit: 1},
      "D": {type: "door", circuit: 5, disableIndicator: true},
      "K": {type: "indicator", circuit: 5},
      "J": {type: "indicator", circuit: 2},

      "G": {type: "giver", give: "b", circuit: 1, max: 1},
      "H": {type: "giver", give: "b", circuit: 2, max: 1},
      "I": {type: "giver", give: "b", circuit: 3, max: 1},

      "/": {type: "x", br: 1},
      ":": {type: "x", bl: 1},
      ",": {type: "x", tr: 1},
      ";": {type: "x", tl: 1},

    },
    voice: [
    ]
  },
  {
    map: ""
        +"       T\n"
        +" TTTTTT0TTTTTT\n"
        +"p  GGGGGGGGG   \n"
        +"s  GGGGGGGGG  e\n"
        +" BB         BB \n"
    ,
    addons: {
      "0": {type: "generator", circuit: 0},
      "G": {type: "antigravity", circuit: 0, direction: -1},

      "/": {type: "x", br: 1},
      ":": {type: "x", bl: 1},
      ",": {type: "x", tr: 1},
      ";": {type: "x", tl: 1},
    },
    voice: []
  },
  {
    map: ""
        +" TTTTTTTTTTTTTT\n"
        +" x            x\n"
        +" x   G G G G  x\n"
        +"    G G G G G  p\n"
        +"e  G G G G G b s\n"
        +" xx G G G G Gxx\n"
        +" x/G G G G G :x\n"
        +" x  G G G G G x\n"
        +" x   G G G G  x\n"
        +" x            x\n"
        +" xxxx,    ;0xxx\n"
        +" BBBBB    BBBBB\n"
    ,
    addons: {
      "0": {type: "button", circuit: 0, timeout: 100, minTime: 1000},
      "G": {type: "antigravity", circuit: 0, direction: -1},
      "e": {type: "e", inversed: true},
      "s": {type: "s", inversed: true},

      "/": {type: "x", br: 1},
      ":": {type: "x", bl: 1},
      ",": {type: "x", tr: 1},
      ";": {type: "x", tl: 1},
    },
    voice: []
  },
  {
    map: ""
        +"  TTTTTTTTTTTT\n"
        +"  xx/JGJGJGJGJ  \n"
        +"  x/JGJGJGJGJGe\n"
        +"  /JGJ;xlllllx\n"
        +"  JGJGxxxxxxxx\n"
        +"  GJGJGJGJ:xxx\n"
        +"  JGJGJcJGJ:xx\n"
        +"  lllll0,JGJ:x\n"
        +" TxxxxxxxGJGJx\n"
        +"pJGJGJGJGJGJGx\n"
        +"sGJGJGJGJGJGJx\n"
        +" BlllllllllllB\n"
        +"  BBBBBBBBBBB\n"
    ,
    addons: {
      "0": {type: "button", circuit: 0},
      "G": {type: "antigravity", circuit: 0, direction: -1},
      "J": {type: "freejump", circuit: 0, direction: -1},

      "/": {type: "x", br: 1},
      ":": {type: "x", bl: 1},
      ",": {type: "x", tr: 1},
      ";": {type: "x", tl: 1},
    },
    voice: []
  },
  {
    map: ""
        +" TTTTTTTTTTTT\n"
        +" xxxxxxxxxxxx\n"
        +"p  f  g  d    \n"
        +"sb fb g  d   e\n"
        +" x0xx1xxxNxxx\n"
        +" BBBBBBBBBBBB\n"
    ,
    addons: {
      "0": {type: "button", circuit: 0, timeout: 2000, minTime: 100},
      "1": {type: "button", circuit: 1, timeout: 2000, minTime: 100},
      "N": {type: "and", circuit: 5, andCircuits: [0, 1]},
      "d": {type: "door", circuit: 5, disableIndicator: true},
      "f": {type: "door", circuit: 0, disableIndicator: true},
      "g": {type: "door", circuit: 1, disableIndicator: true}
    },
    voice: []
  },
  {
    map: ""
        +" TTTTTTTTTTTTTTTTT\n"
        +" xxxxxxxxxxxxxxxxx\n"
        +" x d             x\n"
        +"   d  b           p\n"
        +"e  d  bb        b s\n"
        +" x d bbb       bbx\n"
        +" xxNxxxx0x1x2x3xxx\n"
        +" BBBBBBBBBBBBBBBBB\n"
    ,
    addons: {
      "0": {type: "button", circuit: 0, timeout: 100, minTime: 100},
      "1": {type: "button", circuit: 1, timeout: 100, minTime: 100},
      "2": {type: "button", circuit: 2, timeout: 100, minTime: 100},
      "3": {type: "button", circuit: 3, timeout: 100, minTime: 100},
      "N": {type: "and", circuit: 5, andCircuits: [0, 1, 2, 3]},
      "d": {type: "door", circuit: 5, disableIndicator: true},
      "e": {type: "e", inversed: true},
      "s": {type: "s", inversed: true}
    },
    voice: []
  },
  {
    map: ""
        +" TlllllllllTlllllllllT\n"
        +" xlllllllxxxxxlllllllx\n"
        +" xlllllxxxxxxxxxlllllx\n"
        +" xlllxxxxxxxxxxxxxlllx\n"
        +" xxxxDxxVxxFxxAxxNxxxx\n"
        +"p    d  v  f  a  n    \n"
        +"s    dc vc fc a  n    e\n"
        +" xx3xxx xx xx xxxNxxxx\n"
        +" xwwwxx2xx1xx0xxxxwwwx\n"
        +" xwwwwwxxxxxxxxxwwwwwx\n"
        +" xwwwwwwwxxxxxwwwwwwwx\n"
        +" xxxxxxxxxxxxxxxxxxxxx\n"
        +" BBBBBBBBBBBBBBBBBBBBB\n"
    ,
    addons: {
      "0": {type: "button", circuit: 0, timeout: 100},
      "1": {type: "button", circuit: 1, timeout: 100},
      "2": {type: "button", circuit: 2, timeout: 100},
      "3": {type: "button", circuit: 3, timeout: 5000},
      "a": {type: "door", circuit: 0, disableIndicator: false},
      "f": {type: "door", circuit: 1, disableIndicator: false},
      "v": {type: "door", circuit: 2, disableIndicator: false},
      "d": {type: "door", circuit: 3, disableIndicator: false},
      "n": {type: "door", circuit: 5},
      "A": {type: "indicator", circuit: 0},
      "F": {type: "indicator", circuit: 1},
      "V": {type: "indicator", circuit: 2},
      "D": {type: "indicator", circuit: 3},
      "N": {type: "and", circuit: 5, andCircuits: [0, 1, 2, 3]}
    },
    voice: []
  },
  {
    map: ""
        +" TTTTTTTTTTTTXX\n"
        +" x       jj   X\n"
        +" x       jj   X\n"
        +" x bjjjjjjj   X\n"
        +" xx0    xjj   X\n"
        +" xxg    xjjxxXX\n"
        +" d      djj  p\n"
        +"ed      djj  s\n"
        +" xx1xxxxxx1xx\n"
        +" BBBBBBBBBBBB\n"
    ,
    addons: {
      "0": {type: "button", circuit: 0},
      "1": {type: "button", circuit: 1},
      "g": {type: "machinegun", circuit: 0},
      "d": {type: "door", circuit: 1, disableIndicator : true},
      "j": {type: "freejump"},
      "e": {type: "e", inversed: true},
      "s": {type: "s", inversed: true}
    },
    voice: []
  },
  {
    map: ""
        +"XXTTTTTTTTTTTTT\n"
        +"X      x      x\n"
        +"X  bjjjxjjj b x\n"
        +"XXx0  jxj  0xxx\n"
        +"XXxg  jxj  gxxx\n"
        +"p     jdj       \n"
        +" s    jdj      e\n"
        +"  xxx1xxx1xxxxx\n"
        +"  BBBBBBBBBBBBB\n"
    ,
    addons: {
      "0": {type: "button", circuit: 0},
      "1": {type: "button", circuit: 1},
      "g": {type: "machinegun", circuit: 0},
      "d": {type: "door", circuit: 1, disableIndicator : true},
      "j": {type: "freejump"}
    },
    voice: []
  },
  {
    map: ""
        +" TTTTTTTTTTTTTXX\n"
        +" x    jj  jj   X\n"
        +" x b  jj  jj   X\n"
        +" x bb jj  jj   X\n"
        +" xxx0 jj  jj   X\n"
        +" xxxg jjxxjj xXX\n"
        +" d f  jjf jj  p\n"
        +"ed fb jjf jj  s\n"
        +" xxx1xxxxx2xxx\n"
        +" BBBBBBBBBBBBB\n"
    ,
    addons: {
      "0": {type: "button", circuit: 0},
      "1": {type: "button", circuit: 1},
      "2": {type: "button", circuit: 2},
      "g": {type: "machinegun", circuit: 0},
      "d": {type: "door", circuit: 2, disableIndicator : true},
      "f": {type: "door", circuit: 1, disableIndicator : true},
      "j": {type: "freejump"},
      "e": {type: "e", inversed: true},
      "s": {type: "s", inversed: true}
    },
    voice: []
  },
  {
    map: ""
        +"      TTTTTTTTTTT\n"
        +"     /xDDxCCxWWxx\n"
        +"    /xx Dx Cx Wxx\n"
        +"   /xxx Dx Cx Wxx\n"
        +"  /xxxx Dx Cx Wxx\n"
        +" /xxxxx Dx Cx Wxx\n"
        +" xxxGxFfDFfCFfWxx\n"
        +"p       d  c  b   \n"
        +"s       d  c  b  e\n"
        +" x5x4xFfDFfCFfWxx\n"
        +" :xxxxx Dx Cx Wxx\n"
        +"  :xxxx Dx Cx Wxx\n"
        +"   :xxx Dx Cx Wxx\n"
        +"    :xx Dx Cx Wxx\n"
        +"     :x3Dx2Cx1Wxx\n"
        +"      BBBBBBBBBBB\n"
    ,
    addons: {
      "0": {type: "button", circuit: 0, timeout: 100},
      "1": {type: "button", circuit: 1, timeout: 100},
      "2": {type: "button", circuit: 2, timeout: 100},
      "3": {type: "button", circuit: 3, timeout: 100},
      "4": {type: "generator", circuit: 4, repeat: 3000},
      "5": {type: "button", circuit: 5, timeout: 100},
      "a": {type: "door", circuit: 0, disableIndicator: true},
      "b": {type: "door", circuit: 1, disableIndicator: true},
      "c": {type: "door", circuit: 2, disableIndicator: true},
      "d": {type: "door", circuit: 3, disableIndicator: true},
      "f": {type: "door", circuit: 4, disableIndicator: true},
      "A": {type: "indicator", circuit: 0},
      "W": {type: "indicator", circuit: 1},
      "C": {type: "indicator", circuit: 2},
      "D": {type: "indicator", circuit: 3},
      "F": {type: "indicator", circuit: 4},
      "G": {type: "giver", give: "c", circuit: 5, max: 3},
      ":": {type: "x", bl: 1},
      "/": {type: "x", tl: 1},
    },
    voice: []
  },
  {
    map: ""
        +"  TTTTTTTTTTT\n"
        +"  xxxxxxxxxxx,\n"
        +"  x         ;x,\n"
        +"  x          xx\n"
        +"             p\n"
        +" e   j   j   s\n"
        +"  x         x\n"
        +"  B         B\n"
        +"   ,       / \n"
        +"   B       B \n"
    ,
    addons: {
      "j": {type: "freejump"},
      "e": {type: "e", inversed: true},
      "s": {type: "s", inversed: true},
      ",": {type: "x", tr: 1},
      "/": {type: "x", tl: 1},
      ";": {type: "x", bl: 1},
    },
    voice: []
  },
  {
    map: ""
        +" ,TTTTTTTTTTTTT\n"
        +" xxxxxxxxxxxxxx\n"
        +" x            x \n"
        +",x            x \n"
        +"xx       j    x \n"
        +" p      j       \n"
        +" s   j         e\n"
        +"  x           x\n"
        +"  B           B\n"
        +"   ;         , \n"
        +"   B         B \n"
    ,
    addons: {
      "j": {type: "freejump"},
      ",": {type: "x", tl: 1},
      ";": {type: "x", tr: 1},
    },
    voice: []
  },
  {
    map: ""
        +"  TTTTTTTTTTT\n"
        +"  xxxxxxxxxxx,\n"
        +"  x         ;x\n"
        +"  x   j      x,\n"
        +"  x    j     xx\n"
        +"        j    p\n"
        +" e       j   s\n"
        +"  x         x\n"
        +"  B         B\n"
        +"   ,       / \n"
        +"   B       B \n"
    ,
    addons: {
      "j": {type: "freejump"},
      "e": {type: "e", inversed: true},
      "s": {type: "s", inversed: true},
      ",": {type: "x", tr: 1},
      "/": {type: "x", tl: 1},
      ";": {type: "x", bl: 1},
    },
    voice: []
  },
  {
    map: ""
        +" ,TTTTTTTTTTTTTTT \n"
        +",xxxxxxxxxxxxxxxx \n"
        +"x/                \n"
        +"x c  j       j   e\n"
        +"xxx    j   j    x\n"
        +"x        j       \n"
        +"x      j   j     \n"
        +"x        j       \n"
        +"x      j   j     \n"
        +"xx       j       \n"
        +" p     j   j    b\n"
        +" s   j       j  b x\n"
        +"  x             xxx\n"
        +"  B             Bx/\n"
        +"   ;           , /\n"
        +"   B           B\n"
    ,
    addons: {
      "j": {type: "freejump"},
      ",": {type: "x", tl: 1},
      "/": {type: "x", br: 1},
      ";": {type: "x", tr: 1},
    },
    voice: []
  },
  {
    map: ""
        +"  TTTTTTTTTTTTTTT;\n"
        +"  xxxxxxxxxxxxxxxxx\n"
        +"  xx/            p\n"
        +"  x/             s\n"
        +"  x             x\n"
        +"  x              \n"
        +"  x              \n"
        +"  x              \n"
        +"  x              \n"
        +"  I      j       \n"
        +"  d    j   j     \n"
        +" ed  j       j  b x\n"
        +"  I             x0x\n"
        +"  B             Bx/\n"
        +"   ;           , /\n"
        +"   B;         ,B\n"
        +"    B         B\n"
    ,
    addons: {
      "j": {type: "freejump"},
      "0": {type: "button", circuit: 0},
      "d": {type: "door", circuit: 0, disableIndicator: true},
      "I": {type: "indicator", circuit: 0},
      "e": {type: "e", inversed: true},
      "s": {type: "s", inversed: true},
      ",": {type: "X", tl: 1},
      "/": {type: "X", br: 1},
      ";": {type: "X", tr: 1},
    },
    voice: []
  },
  {
    map: ""
        +" ,TTTTTTTTTTTTTTT\n"
        +",xxxxxxxxxxxxxxxI \n"
        +"x               d \n"
        +"x c  j       j  de\n"
        +"xxx    j   j    I\n"
        +"xlxfJ    j      :xx\n"
        +"xlx x  j   j     :x\n"
        +"xlx0x    j        x\n"
        +"xlx/   j   j      x\n"
        +"xxx      j        x\n"
        +" p     j   j      x\n"
        +" s   j       j  b x\n"
        +"  x             x1x\n"
        +"  B             Bx/\n"
        +"   ;           , /\n"
        +"   B;         ,B\n"
        +"    B         B\n"
    ,
    addons: {
      "j": {type: "freejump"},
      "0": {type: "button", circuit: 0},
      "1": {type: "button", circuit: 1},
      "d": {type: "door", circuit: 0, disableIndicator: true},
      "f": {type: "door", circuit: 1, disableIndicator: true},
      "I": {type: "indicator", circuit: 0},
      "J": {type: "indicator", circuit: 1},
      ",": {type: "X", tl: 1},
      "/": {type: "X", br: 1},
      ":": {type: "X", bl: 1},
      ";": {type: "X", tr: 1},
    },
    voice: []
  },
  {
    map: ""
        +"    T     T       \n"
        +" , T:     /T       \n"
        +",xT:       /TTTTTTT\n"
        +"xlllllllllllxxxxxxx  \n"
        +"xlllllllllllxx  j   \n"
        +"xlllllllllllxx j   e\n"
        +"xllllllllllxx:  j x \n"
        +"xxxxxxxxxxxx:  j  xxx\n"
        +"                j llx\n"
        +" p             j  llx\n"
        +" s  j   j   j   j llx\n"
        +"  xlllllllllllllllllx\n"
        +"  xxxxxxxxxxxxxxxxxxx\n"
        +"  BBBBBBBBBBBBBBBBB:\n"
    ,
    addons: {
      "j": {type: "freejump"},
      "0": {type: "button", circuit: 0},
      "1": {type: "button", circuit: 1},
      "d": {type: "door", circuit: 0, disableIndicator: true},
      "f": {type: "door", circuit: 1, disableIndicator: true},
      "I": {type: "indicator", circuit: 0},
      "J": {type: "indicator", circuit: 1},
      ":": {type: "x", br: 1},
      ",": {type: "X", tl: 1},
      "/": {type: "X", bl: 1},
      ";": {type: "X", tr: 1},
    },
    voice: []
  },
  {
    map: ""
        +"  TTTTTTTTTTTTTTTTT\n"
        +"xxxxxxGxxxHxxxGxxxx\n"
        +" p    d   f   d     \n"
        +" s  j d j f j d j  e\n"
        +"  xlllllllllllllllx \n"
        +"  xxxxxxxxxxxxxxxxxxx\n"
        +"  BBBBBBBBBBBBBBBBB:\n"
    ,
    addons: {
      "j": {type: "freejump"},
      "0": {type: "button", circuit: 0},
      "1": {type: "button", circuit: 1},
      "d": {type: "door", circuit: 0, disableIndicator: true},
      "f": {type: "door", circuit: 1, disableIndicator: true},
      "G": {type: "generator", circuit: 0, repeat: 2000},
      "H": {type: "generator", circuit: 1, repeat: 3000},
      ":": {type: "x", br: 1},
    },
    voice: []
  },/*
  {
    map: ""
        + "      gxxI \n"
        + "p        D\n"
        + "s        De\n"
        + " x23333xxI \n"
        + " xb    LL0 \n"
        + " xL    TT1 \n"
        + " xxTTTTTT1 \n"
        + " x TTTTTT1 \n"
        + " xx4444xxx \n"
    ,
    addons: {
      "0": {type: "button", circuit: 0, timeout: 4000, minTime: 1000, direction: 1},
      "1": {type: "button", circuit: 1, timeout: 10000, minTime: 100, direction: 1},
      "3": {type: "button", circuit: 1, timeout: 10000, minTime: 100, direction: 2},
      "2": {type: "button", circuit: 2, timeout: 100, minTime: 100},

      "D": {type: "door", circuit: 0, disableIndicator: true},
      "I": {type: "indicator", circuit: 0},
      "g": {type: "machinegun", circuit: 1},

      "G": {type: "generator", circuit: 2},
      "L": {type: "antigravity", circuit: 2, direction: 1},
      "T": {type: "antigravity", circuit: 2, direction: 2}

    },
    voice: [
    ]
  },*/
  {
    map: ""
        + "                   \n"
        + "                   \n"
        + "                   \n"
        + "                   \n"
        + " .                .\n"
        + "                   \n"
        + "                   \n"
        + "                   \n"
        + "                   \n"
        + "                   \n"
        + "p                  \n"
        + "s.                .\n"
        + " BBBBBBBBBBBBBBBBBB\n"
    ,
    addons: {
      "0": {type: "button", circuit: 0, timeout: 100, minTime: 100, direction: 0},
      "t": {type: "generator", repeat: 0, circuit: 1},
      "T": {type: "generator", repeat: 2000, circuit: 2},
      "a": {type: "and", circuit: 3, andCircuits: [0,1,2]},
      "G": {type: "antigravity", circuit: 1, direction: 3},
      "J": {type: "freejump"},
      "v": {type: "transistor", circuit: 4, input: 2, outA: 5, outB: 6},
      "I": {type: "indicator", circuit: 4},
      "D": {type: "door", circuit: 0, disableIndicator: false},
      "r": {type: "transporter", circuit: 0, inversed: true, direction: 3},
      "g": {type: "machinegun", circuit: 0},


      "1": {type: "button", circuit: 4, timeout: 0, minTime: 100, direction: 0},
    },
    voice: [
    ],
    end: true
  }
]
