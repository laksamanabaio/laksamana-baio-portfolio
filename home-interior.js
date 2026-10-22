/*
 * Baio District 2077 — bespoke HOME studio interior.
 * Native Phaser Graphics only: pixel-perfect rectangles, no generated-image dependency.
 * Reference: cozy futuristic studio, panoramic skyline, triple-screen workstation,
 * bedroom NW, kitchenette SW, lounge SE, door at the south.
 */
function renderHomeInterior(scene){
 const g=scene.add.graphics();
 const R=(x,y,w,h,c,a=1)=>{g.fillStyle(c,a);g.fillRect(x,y,w,h)};
 const L=(x1,y1,x2,y2,c,w=2)=>{g.lineStyle(w,c);g.lineBetween(x1,y1,x2,y2)};
 const G=(x,y,w,h,c)=>{R(x-3,y-3,w+6,h+6,c,.12);R(x-1,y-1,w+2,h+2,c,.24);R(x,y,w,h,c)};
 const leaf=(x,y,w,h,c)=>{g.fillStyle(c);g.fillEllipse(x,y,w,h)};
 const plant=(x,y,k=1)=>{
  R(x-10*k,y+6*k,20*k,14*k,0x748391);R(x-8*k,y+8*k,16*k,10*k,0xaba5a0);
  R(x-2*k,y-17*k,4*k,23*k,0x476e54);
  for(const [dx,dy,c] of [[-11,-8,0x367956],[9,-14,0x57956b],
    [0,-23,0x72a976],[-8,-21,0x408163],[12,-3,0x6fab7b]])
   leaf(x+dx*k,y+dy*k,18*k,12*k,c);
 };
 // Architectural cutaway — bevelled navy shell, timber flooring and amber lights.
 R(0,0,960,540,0x070e18);
 R(26,22,908,489,0x132334);R(36,33,888,468,0x26394c);
 R(46,44,869,448,0xb98254);R(47,44,866,106,0x44444b);
 for(let x=56;x<903;x+=85){R(x,55,2,76,0x76605b);R(x+4,55,1,78,0x283542)}
 R(48,137,866,8,0x172838);
 for(let y=145;y<486;y+=20){
  R(48,y,867,2,0x936247);R(48,y+4,867,1,0xdba16a,.57);
  for(let x=56+Math.floor(y/20)%3*44;x<899;x+=150){
   R(x,y+2,2,17,0x855b45,.72);R(x+6,y+9,28,1,0xd5a06c,.3);
  }
 }
 // Sunbeams from the big north window fall over a clear central walkway.
 g.fillStyle(0xffdd9c,.14);g.fillTriangle(332,146,390,146,592,479);
 g.fillStyle(0xffe9b6,.10);g.fillTriangle(402,146,433,146,725,478);
 R(30,39,19,454,0x192a3a);R(910,39,19,454,0x19293a);
 R(30,479,901,28,0x142335);R(47,485,868,9,0x34495a);
 G(45,91,3,79,0x6ad4e8);G(914,183,3,126,0x71d7eb);
 for(let x=65;x<894;x+=126)G(x,489,44,2,x%3?0xf0ac69:0x69d1ed);
 G(67,131,193,3,0xffae61);G(567,131,320,3,0xffb365);
 // Grand 2077 skyline vista: layered city silhouettes, sunlit river, skybridge.
 R(266,44,296,140,0x1d3144);R(273,49,283,128,0x6ca3bc);
 for(let y=54;y<171;y+=7)
  R(280,y,268,7,y<101?0x91d1e8:y<135?0xb1ced9:0xcdc6ae);
 R(292,77,49,5,0xe9f2e7,.65);R(377,64,53,4,0xe9f0e4,.62);
 for(const [x,y,w,h] of [
  [281,125,15,40],[300,99,24,67],[330,110,17,56],
  [354,86,28,80],[390,113,25,53],[423,97,18,69],
  [448,75,24,91],[481,109,29,57],[518,88,23,78],[541,129,8,38]
 ]){
  R(x,y,w,h,x%3===0?0x5d84a4:x%3===1?0x789aae:0x6485a2);
  R(x+Math.floor(w/2),y-8,2,8,0x51738f);
  for(let xx=x+3;xx<x+w-2;xx+=7)
   for(let yy=y+6;yy<165;yy+=10)R(xx,yy,2,3,(xx+yy)%3?0xe5d3ae:0xabe9e6,.78);
 }
 R(280,154,267,15,0x79b8c7);R(280,159,267,7,0x92c8d1);
 L(284,147,551,147,0x506d82,4);
 for(let x=295;x<545;x+=34)R(x,143,3,17,0x435b70);
 R(267,44,12,141,0x203749);R(551,44,12,141,0x203749);
 R(266,44,296,12,0x183143);R(267,174,296,12,0x465660);
 G(275,45,278,2,0x8fe4ea);
 // Bedroom NW: upholstered headboard, white pillows, navy duvet, gold cushion.
 R(62,121,176,176,0x253649);R(70,131,160,156,0x17283b);
 R(77,138,146,144,0x9cabba);R(84,146,132,42,0xe7e2d8);
 R(89,148,55,34,0xfbf0df);R(153,148,56,34,0xf7ebdf);
 R(87,190,122,84,0x334154);
 for(let i=0;i<6;i++)R(91,202+i*10,109-i*3,2,0x526072,.4);
 R(131,177,30,17,0xe4ab69);R(136,181,21,9,0xf2c27e);
 G(77,281,149,3,0x71d0e8);
 R(233,192,43,73,0x2c3544);R(238,197,32,9,0x88634c);
 R(247,210,15,22,0xffce8c);G(244,209,19,3,0xffb565);
 R(81,88,187,7,0x2b313e);G(82,87,186,2,0xffaa55);
 for(let i=0;i<3;i++){
  const xx=102+i*49;R(xx,66,34,24,0x162939);
  R(xx+4,70,26,15,i===1?0x4a8c9f:0x9c7661);
  R(xx+10,78,13,3,0xdfbf91);
 }
 plant(256,184,.75);
 // Bench under the panoramic window and distributed indoor plants.
 R(287,187,269,22,0x39414c);R(288,183,266,8,0x9a8069);
 for(let i=0;i<4;i++){R(296+i*64,199,57,16,0x4a596b);R(301+i*64,201,45,3,0x738293)}
 plant(302,182,.63);plant(535,183,.65);
 // Work area NE: L-shaped wood workstation and individual drawer units.
 R(562,212,320,25,0xc69b76);R(570,206,309,10,0xe6ba87);
 R(573,232,55,88,0x303b49);R(827,231,53,94,0x35404d);
 for(const xx of [579,835])for(let i=0;i<3;i++){
  R(xx,242+i*24,41,20,0x46505c);R(xx+10,252+i*24,17,2,0xe5b278);
 }
 // Three screens with cyan data lines, a hero chart and individual stands.
 for(const [x,y,w,h] of [[584,146,64,65],[655,133,87,78],[749,148,70,62]]){
  R(x-5,y-5,w+10,h+10,0x142433);R(x,y,w,h,0x1b435c);
  R(x+4,y+5,w-8,5,0x397899);
  for(let i=0;i<5;i++)R(x+6,y+20+i*7,w-20-(i%3)*7,2,
   i%2?0x6dd3db:0x84b1d1);
  R(x+w/2-3,y+h+5,6,11,0x243a48);
  R(x+w/2-12,y+h+16,24,3,0x617786);
  G(x+2,y+2,w-4,2,0x5dc6dd);
 }
 L(672,189,695,168,0x90e7df,3);L(695,168,711,190,0x90e7df,3);
 L(711,190,729,159,0x90e7df,3);
 for(const [x,y] of [[672,189],[695,168],[711,190],[729,159]])R(x-3,y-3,6,6,0xe1f5e6);
 R(646,228,133,14,0x303740);
 for(let i=0;i<12;i++)R(652+i*10,233,7,2,i%3?0xbdc5bc:0xe0ad6a);
 R(793,229,16,13,0xe9ddd0);R(799,228,5,7,0x567e89);
 // Dark chair and base beneath workstation.
 R(669,250,49,43,0x223342);R(675,254,36,35,0x405568);
 R(663,284,62,7,0x1f3241);R(691,291,9,13,0x2a4150);
 R(673,301,50,4,0x2c4454);
 // Shelf, blueprints, books, framed artifacts and desk corner plant.
 for(let i=0;i<3;i++){
  R(749,91+i*19,72,5,0x303c49);
  for(let j=0;j<8;j++)R(757+j*8,77+i*19,5,14,
    [0x70a5a7,0xc59d6e,0x758cb0,0x6fa389][j%4]);
 }
 R(826,90,73,88,0x8e6a53);R(832,96,60,76,0xe5d6b4);
 R(837,102,51,65,0xc5d6d0);
 for(let i=0;i<3;i++){R(848+i*15,104,2,60,0xf1e6cf);R(839,114+i*19,47,2,0xf1e6cf)}
 R(858,126,17,14,0x7caebd);R(861,128,11,9,0x397e91);
 G(890,80,4,5,0xffb464);plant(811,208,.33);
 // Compact kitchen SW: fridge, cupboards, sink, stove, drawers and neon lighting.
 R(56,311,334,115,0x253343);
 R(61,318,73,109,0x4e5b6a);R(66,324,60,100,0x91a0ab);
 R(66,363,60,4,0x5f7485);R(117,346,4,15,0xb6ccd2);G(115,385,3,22,0x64c8e4);
 R(136,311,232,26,0x394754);R(138,336,229,27,0xddb187);
 R(140,364,226,61,0x334251);
 R(136,335,232,7,0x8d654e);
 for(let i=0;i<4;i++){R(143+i*55,366,52,57,0x425564);R(164+i*55,371,15,2,0xe4b37e)}
 G(139,360,226,3,0xffb65e);
 R(159,342,49,16,0xa5b6bb);R(168,346,32,7,0x344e5e);
 R(180,330,5,13,0xd4c9b3);R(176,328,13,4,0xe0d7c2);
 R(232,340,65,17,0x222c39);
 for(const xx of [252,279]){leaf(xx,349,19,12,0x536a74);R(xx-5,345,9,2,0x1f2e3a)}
 R(315,340,34,17,0x3e5660);R(319,344,26,7,0x1d3340);
 for(let i=0;i<5;i++)R(145+i*27,314,18,6,0x80a8a0);
 R(376,307,15,134,0x24384a);G(382,343,3,54,0xffae67);
 plant(372,313,.62);
 // Dining table / stools at lower left, leaving entry path in the center.
 R(118,429,231,45,0x293747);R(126,430,219,17,0xd9a878);
 R(131,434,209,4,0xf4c38d);R(139,447,201,22,0x93674c);
 for(const xx of [156,278]){
  R(xx,474,43,10,0x273f52);R(xx+8,468,28,7,0x456478);
  R(xx+12,483,4,7,0x304858);R(xx+27,483,4,7,0x304858);
 }
 plant(162,426,.4);R(299,425,15,13,0xd1dcd9);R(302,424,11,3,0x7894a0);
 // Sectional lounge SE with textured indigo rug, cushions and coffee table.
 R(686,327,210,131,0x415061);R(697,335,189,115,0x697485);
 R(706,342,170,95,0x394656);
 R(697,315,178,54,0x91a0ad);R(703,322,164,35,0xbec4ca);
 R(705,353,165,26,0x9fabba);
 for(const xx of [714,766,816])R(xx,354,45,20,0xbbc4cb);
 R(715,348,20,18,0xe4a865);R(832,347,21,19,0xd99f64);
 R(867,347,25,74,0x8195a9);R(868,389,25,33,0x394e65);
 R(715,405,152,36,0x674f43);R(722,401,138,31,0xc69060);
 R(726,405,130,5,0xe0b17e);
 R(747,412,43,14,0xdde3d7);R(751,414,35,9,0x83b6c9);
 R(807,412,31,16,0x304554);
 for(let i=0;i<3;i++)R(814,415+i*4,19-i*3,2,0x71cddb);
 plant(740,405,.36);R(791,418,12,9,0xf2e8d6);
 // Plants, tall amber lamp and cyan television on the far-right wall.
 plant(895,323,.75);plant(873,448,.63);
 R(899,339,13,106,0x263b4c);R(890,349,11,71,0x455c70);
 G(902,356,3,54,0x65dce9);
 R(877,301,5,80,0x5a5050);G(872,298,15,4,0xffb769);
 // Neon framed entrance at bottom center.
 R(417,471,127,39,0x1a2e41);R(436,475,89,35,0x31475a);
 R(443,482,75,23,0x536878);R(449,488,62,11,0x3d5368);
 G(450,481,61,3,0x6ad8e8);G(419,484,5,20,0xffa965);G(540,484,4,20,0xffa965);
 // The computer is the only mandatory Home discovery; the other two are optional.
 scene.zones=[
  {x:480,y:451,r:59,label:'Return to Baio District',to:'district'},
  {x:689,y:287,r:103,label:'Read About Me',object:'home'},
  {x:783,y:459,r:83,label:'Read Design Notes',object:'home-notebook'},
  {x:840,y:269,r:74,label:'Inspect District Blueprint',object:'home-blueprint'}
 ];
 // Furniture silhouettes prevent walking through the major objects.
 scene.homeFurniture=[
  {x:61,y:122,w:177,h:169},{x:55,y:309,w:335,h:115},
  {x:119,y:431,w:230,h:44},{x:564,y:137,w:319,h:117},
  {x:697,y:316,w:180,h:64},{x:714,y:405,w:153,h:37},
  {x:891,y:335,w:26,h:114}
 ];
 const label=(x,y,t,size,c,bg)=>scene.add.text(x,y,t,{
  fontFamily:'monospace',fontSize:size+'px',color:c,
  ...(bg?{backgroundColor:bg,padding:{x:6,y:3}}:{})
 }).setOrigin(.5,0);
 label(480,455,'EXIT TO DISTRICT',11,'#dce8de','#1e3648');
 label(690,313,'ABOUT ME COMPUTER',12,'#f2ddb0','#263c4a');
 label(841,184,'BLUEPRINT',10,'#efd7af');
}
