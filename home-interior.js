/*
 * BAIO DISTRICT 2077 — HOME APARTMENT / PROTOTYPE 11.3
 * Proportional furniture for a ~24x55px avatar, with pixel-art pseudo-depth:
 * highlighted top planes, shaded sides, cast/contact shadows, and restrained glows.
 * Native Phaser Graphics; no 3D engine or downloaded sprite assets.
 */
function renderHomeInterior(scene){
 const g=scene.add.graphics();
 const R=(x,y,w,h,c,a=1)=>{
  g.fillStyle(c,a);g.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h));
 };
 const L=(x1,y1,x2,y2,c,w=2,a=1)=>{
  g.lineStyle(w,c,a);g.lineBetween(x1,y1,x2,y2);
 };
 const SH=(x,y,w,h,a=.19)=>{
  R(x+5,y+h+2,w-5,7,0x101722,a);
  R(x+2,y+h,w+2,4,0x0b111a,a*.75);
 };
 const GL=(x,y,w,h,c)=>{
  R(x-2,y-2,w+4,h+4,c,.07);
  R(x-1,y-1,w+2,h+2,c,.17);
  R(x,y,w,h,c);
 };
 // A small pixel-art cuboid viewed from above: light top, shaded front, dark side.
 const BOX=(x,y,w,h,d,top,front,side)=>{
  SH(x,y,w,h+d,.16);
  R(x+3,y+d+2,w,h,side,.85); // right / side face
  R(x,y+d,w,h,front);
  R(x,y,w,d,top);
  R(x,y+2,3,Math.max(3,d-2),0xffffff,.11);
  R(x+2,y+d+h-3,w-3,3,side);
  R(x+w-4,y+d+3,4,Math.max(1,h-7),side,.70);
 };
 const PANEL=(x,y,w,h,top,front,dark)=>{
  SH(x,y,w,h,.09);
  R(x,y,w,h,front);R(x,y,w,3,top);
  R(x,y+h-3,w,3,dark);R(x+w-3,y+3,3,Math.max(1,h-6),dark);
 };
 const plant=(x,y,k=1)=>{
  const v=n=>Math.max(1,Math.round(n*k));
  SH(x-v(10),y-v(1),v(21),v(17),.21);
  R(x-v(10),y+v(5),v(20),v(15),0x667384);
  R(x-v(8),y+v(5),v(16),v(5),0xa9a69a);
  R(x-v(8),y+v(12),v(16),v(6),0x495766);
  R(x-v(1),y-v(12),v(3),v(17),0x557c53);
  const leaves=[[-9,-13,0x346c50],[6,-20,0x569b68],
   [-2,-25,0x72ad79],[13,-7,0x3a825c],[-13,-5,0x73b384]];
  for(const [dx,dy,c] of leaves){
   g.fillStyle(c);g.fillEllipse(x+v(dx),y+v(dy),v(17),v(10));
   R(x+v(dx-4),y+v(dy-3),v(6),v(2),0xc0dda7,.29);
  }
 };
 const book=(x,y,c)=>{R(x+2,y+2,13,9,0x152633,.29);R(x,y,13,8,c);R(x,y,3,8,0xe4d5ab);R(x+4,y+2,6,1,0xf3ead0,.68)};
 const monitor=(x,y,w,h)=>{
  SH(x,y,w,h,.12);
  R(x-3,y-3,w+6,h+6,0x172635);
  R(x,y,w,h,0x244b62);
  R(x+3,y+4,w-6,4,0x528fad);
  for(let i=0;i<3;i++)R(x+4,y+13+i*6,w-11-(i%2)*9,2,i%2?0x83d9dd:0x8db4ca);
  R(x+5,y+h-9,w-15,2,0x38778e);
  GL(x+2,y+2,w-4,1,0x71d3e5);
  R(x+Math.floor(w/2)-2,y+h+4,4,6,0x293b49);
  R(x+Math.floor(w/2)-10,y+h+10,20,3,0x526575);
 };
 // 1. Architecture: dark-cutaway apartment, warm walnut planks.
 R(0,0,960,540,0x07111c);
 R(25,23,911,487,0x101e2c);
 R(35,32,891,470,0x223646);
 R(43,40,876,455,0xb98051);
 R(43,40,876,106,0x494447);
 for(let x=53;x<908;x+=72){
  R(x,51,2,82,0x755b54);R(x+4,52,1,79,0x262f3a);
 }
 R(44,137,875,9,0x172a3a);
 for(let y=146;y<489;y+=19){
  R(44,y,875,2,0x986447,.85);
  R(44,y+3,875,1,0xd6a06b,.56);
  for(let x=52+Math.floor(y/19)%3*46;x<905;x+=139)
   R(x,y+2,2,16,0x8d573a,.7);
 }
 // A soft, directional ray of warm daylight on the walking floor.
 g.fillStyle(0xffe0ab,.12);g.fillTriangle(342,146,391,146,594,473);
 g.fillStyle(0xffeed2,.09);g.fillTriangle(422,146,440,146,720,475);
 R(27,39,17,457,0x16283a);R(919,39,13,457,0x162838);
 R(27,484,906,24,0x172b3d);R(42,489,881,8,0x3c5360);
 GL(42,88,3,76,0x68d2e4);GL(923,184,3,98,0x67d3e1);
 for(let x=64;x<904;x+=123)GL(x,491,37,2,x%2?0xe6a063:0x79cfde);
 GL(55,129,176,2,0xffac5f);GL(582,129,275,2,0xffb366);
 // 2. Panoramic skyline. Architectural opening stays substantial but is not furniture.
 R(263,45,299,137,0x192d40);R(270,51,286,125,0xa7d3e4);
 for(let y=53;y<175;y+=7)
  R(279,y,269,7,y<105?0x94cfe4:y<139?0xbdd4da:0xdccaa9);
 R(293,73,49,4,0xf7f5e9,.6);
 R(384,68,34,3,0xf6f4e2,.54);
 const skyline=[
  [279,124,17,47],[299,99,21,72],[324,112,18,59],
  [347,82,26,89],[380,113,22,58],[409,96,15,75],
  [431,79,22,92],[459,105,28,66],[494,89,20,82],[518,115,30,56]
 ];
 for(let i=0;i<skyline.length;i++){
  const [x,y,w,h]=skyline[i];
  R(x,y,w,h,[0x6f96af,0x6087a6,0x799db0][i%3]);
  R(x+Math.floor(w/2),y-6,2,6,0x567b94);
  for(let xx=x+4;xx<x+w-2;xx+=7)
   for(let yy=y+7;yy<169;yy+=10)
    R(xx,yy,2,3,(xx+yy)%3?0xf5dfb3:0xa3e2df,.83);
 }
 R(279,155,269,14,0x76adb9);R(279,161,269,5,0x8fc6cf);
 L(282,145,553,145,0x516d80,4);
 for(let x=292;x<543;x+=35)R(x,141,3,16,0x466679);
 R(263,45,9,139,0x20394a);R(554,45,9,139,0x20394a);
 R(263,44,299,10,0x192f40);R(263,175,299,10,0x455661);
 GL(271,45,283,2,0x78d7e7);
 // 3. Scaled bedroom NW: mattress roughly 2.5 avatar heights, no huge billboard bed.
 SH(71,143,137,110,.22);
 PANEL(72,133,131,15,0x77879a,0x33485a,0x1e3242);
 BOX(79,145,125,88,9,0xb5c1c9,0x8999a9,0x607584);
 BOX(87,150,46,18,4,0xffffff,0xf0e9de,0xd4d1ca);
 BOX(143,150,46,18,4,0xfaf5ec,0xe9e1d8,0xc8c5bd);
 BOX(85,177,112,62,5,0x4b586c,0x344154,0x253142);
 R(91,189,100,2,0x82929c,.34);R(91,227,100,2,0x131f32,.31);
 BOX(128,174,25,12,3,0xf5cd8b,0xe5ac60,0xb88242);
 GL(77,247,122,2,0x69cadd);
 // Side cabinet with a warm table lamp, tiny picture.
 BOX(212,177,33,41,4,0x6c6267,0x313c4c,0x253243);
 R(216,182,25,3,0xe1b681);R(219,193,18,19,0x906a4c);
 GL(226,185,8,3,0xffce75);
 R(86,92,145,5,0x2a3540);GL(87,91,143,2,0xffb56e);
 for(let i=0;i<3;i++){
  const x=101+i*42;PANEL(x,71,27,19,0x5f747e,0x293d4c,0x192b39);
  R(x+4,76,18,9,[0x4c9aa1,0x9e806c,0x6897b0][i]);
 }
 plant(249,197,.65);
 // Panorama bench, kept narrow to leave the middle of Home walkable.
 BOX(290,182,248,10,4,0xad896c,0x505766,0x344052);
 for(let i=0;i<5;i++){
  R(295+i*48,194,43,10,0x455362);
  R(299+i*48,196,34,2,0x88909c);
 }
 plant(297,181,.5);plant(527,184,.57);
 // 4. Compact designer workstation NE — more proportional to the player.
 // Three small but readable monitors and wood desktop, side drawers, chair.
 SH(583,214,167,72,.23);
 BOX(585,214,156,22,7,0xe6bd92,0xbb8a64,0x896345);
 BOX(587,243,28,43,5,0x60707a,0x3a4a59,0x293641);
 BOX(715,243,28,43,5,0x657078,0x3a4858,0x263540);
 for(const x of [590,720])for(let i=0;i<2;i++){
  PANEL(x,254+i*17,23,13,0x576a7c,0x364858,0x273745);
  R(x+7,260+i*17,9,2,0xe8b27b);
 }
 monitor(597,164,34,33);
 monitor(638,152,48,42);
 monitor(693,163,36,34);
 // Pixel chart on the central display.
 L(646,185,657,173,0x8ce6d8,2);L(657,173,669,182,0x8ce6d8,2);
 L(669,182,679,165,0x8ce6d8,2);
 for(const [x,y] of [[646,185],[657,173],[669,182],[679,165]])R(x-1,y-1,3,3,0xf0e9d9);
 PANEL(624,230,76,8,0x455a68,0x263746,0x182939);
 for(let i=0;i<10;i++)R(632+i*6,234,4,1,i%3?0x97c9cb:0xe3b780);
 R(708,231,11,7,0xe3ded0);R(713,231,4,2,0x7b9aa6);
 // Chair shadow separates the chair from the desk.
 SH(645,258,47,31,.27);
 BOX(650,254,40,25,5,0x526779,0x344b60,0x213445);
 BOX(645,281,49,8,4,0x2c4456,0x233848,0x192c3d);
 R(665,293,6,14,0x2b4050);
 R(648,308,46,3,0x2f4150);
 // Books & decorative items at reduced scale.
 R(749,92,59,5,0x334353);
 for(let i=0;i<2;i++){
  R(749,111+i*21,59,4,0x3f4852);
  for(let j=0;j<7;j++)R(754+j*8,96+i*21,5,15,
   [0x70a1a3,0xb99869,0x718faa,0x66a58b][j%4]);
 }
 plant(751,203,.38);
 // 5. Compact interactive blueprint board to the right of workstation.
 SH(801,102,54,57,.12);
 BOX(804,102,48,53,4,0xf6e6c4,0xdbcaac,0xb29b78);
 R(810,112,36,38,0xc3d9d0);
 for(let i=0;i<3;i++){R(819+i*8,114,1,33,0xf2ecda);R(811,121+i*10,34,1,0xf1e9d5)}
 R(821,124,13,9,0x75b1c0);R(825,126,7,5,0x32768e);
 R(822,105,12,3,0xb48f6a);
 // 6. Kitchen SW: separate furniture components instead of a single giant slab.
 SH(61,328,252,82,.17);
 BOX(62,330,56,70,6,0xb8bec2,0x818f9b,0x576877); // fridge
 R(68,366,42,2,0x5c7283);R(108,343,3,12,0xd5d9d5);
 GL(108,374,2,20,0x7bd6ed);
 BOX(130,340,165,14,6,0xe9bb8e,0xc48f63,0x936b4f); // counter
 BOX(130,361,165,43,4,0x627182,0x3d4c5b,0x293b49); // doors
 for(let i=0;i<3;i++){
  PANEL(133+i*53,365,50,34,0x526374,0x3d4e5e,0x2c3b4a);
  R(150+i*53,369,15,2,0xe1b786);
 }
 BOX(146,340,33,9,3,0xcdd7d6,0xabb9bd,0x7a9398); // sink
 R(150,344,25,5,0x55737e);R(159,332,3,12,0xe3d5b8);
 R(155,330,11,3,0xe3d5b8);
 BOX(191,340,46,9,3,0x4f5d64,0x283541,0x17232e); // cooktop
 for(const x of [203,222])R(x,345,8,3,0x889ba3);
 R(272,338,17,16,0x394c57);R(274,338,13,4,0x4e7b8b);
 for(let i=0;i<4;i++)R(137+i*23,324,16,6,0x597983);
 GL(133,357,160,2,0xffb46f);
 BOX(306,322,10,80,4,0x647586,0x455767,0x303d4d); // divider
 GL(313,350,2,34,0xffaa64);
 plant(322,326,.48);
 // 7. Smaller dining table with two chairs, visibly detached from the kitchen.
 SH(136,430,118,28,.21);
 BOX(136,430,112,23,5,0xe3b385,0xbf8a5c,0x875d40);
 BOX(150,461,24,13,4,0x648397,0x3b5264,0x25394c);
 BOX(205,461,24,13,4,0x638297,0x3b5062,0x243849);
 R(154,478,3,8,0x374c5d);R(218,478,3,8,0x384b59);
 plant(159,427,.32);
 R(224,425,8,10,0xe7e1d5);R(225,424,7,2,0x8198a6);
 // 8. Scaled living area SE. Lighter sofa top, darker front and realistic floor shadow.
 // Textured carpet is slightly larger than the couch, but not the whole quarter.
 R(681,332,171,103,0x404b5a);
 R(688,339,156,89,0x657083);
 R(694,346,144,77,0x485466);
 for(let x=697;x<836;x+=18)R(x,348,2,72,0x8290a1,.09);
 SH(702,349,134,61,.20);
 BOX(706,350,115,22,6,0xe0dadd,0x9cabb9,0x768694);
 BOX(706,374,115,18,5,0xc7c9d0,0x8999a9,0x667789);
 BOX(810,349,23,52,6,0xb8c4cb,0x879bab,0x63788a);
 BOX(717,353,22,13,3,0xf2bc7e,0xe1a167,0xaf7848);
 BOX(784,353,22,13,3,0xe7bd87,0xd69e60,0xa97c4b);
 // Coffee table in front of couch: shaded legs and small portfolio notebook.
 SH(724,404,87,21,.24);
 BOX(726,404,84,17,4,0xd8a170,0xa96f45,0x794b35);
 book(743,408,0x8ec5c8);R(789,408,9,7,0xe1dacc);
 // Smaller TV and lamps.
 PANEL(871,335,22,49,0x719baa,0x243f53,0x172f45);
 R(876,343,12,34,0x51a5be);R(879,351,7,11,0x7ec2cf);
 GL(892,346,2,30,0x59d8e9);
 plant(849,314,.50);plant(854,426,.45);
 R(862,298,4,42,0x6a5f52);GL(857,294,14,3,0xffb96b);
 // 9. Compact south door with walkable space on either side.
 R(418,471,122,36,0x1a2e40);R(435,476,90,32,0x2f4658);
 R(442,482,77,23,0x4c6272);R(449,488,63,9,0x344f63);
 GL(453,479,56,3,0x67d9e6);
 GL(419,481,3,19,0xf9ad61);GL(538,481,3,19,0xf9ad61);
 // 10. Interaction radii are based on the new furniture positions.
 // Home computer completes its quest; book and blueprint are optional reading.
 scene.zones=[
  {x:480,y:449,r:56,label:'Return to Baio District',to:'district'},
  {x:664,y:286,r:76,label:'Read About Me',object:'home'},
  {x:771,y:421,r:62,label:'Read Design Notes',object:'home-notebook'},
  {x:827,y:179,r:59,label:'Inspect District Blueprint',object:'home-blueprint'}
 ];
 // Furniture footprints match visible solid areas (carpet, windows, shadows are walkable).
 scene.homeFurniture=[
  {x:79,y:145,w:125,h:102},  // bed
  {x:62,y:330,w:56,h:76},   // refrigerator
  {x:130,y:340,w:165,h:68},// kitchen cabinet block
  {x:306,y:322,w:10,h:84}, // divider
  {x:136,y:430,w:112,h:29},// dining table
  {x:585,y:214,w:156,h:71},// workstation
  {x:650,y:254,w:40,h:52}, // desk chair
  {x:706,y:350,w:127,h:57},// sofa and chaise
  {x:726,y:404,w:84,h:23}, // coffee table
  {x:871,y:335,w:22,h:49}  // TV
 ];
 const caption=(x,y,t,size,c,bg)=>{
  scene.add.text(x,y,t,{
   fontFamily:'monospace',fontSize:size+'px',color:c,
   ...(bg?{backgroundColor:bg,padding:{x:5,y:3}}:{})
  }).setOrigin(.5,0);
 };
 caption(480,450,'EXIT TO DISTRICT',11,'#e3efe4','#1e3545');
 caption(665,314,'ABOUT ME COMPUTER',11,'#eddbba','#293c49');
 caption(829,187,'BLUEPRINT',10,'#f4ddb8');
}
