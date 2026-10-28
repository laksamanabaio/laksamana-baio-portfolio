/*
 * BAIO DISTRICT 2077 — HOME APARTMENT / PROTOTYPE 11.8
 * Proportional furniture for a ~24x55px avatar, with pixel-art pseudo-depth:
 * highlighted top planes, shaded sides, cast/contact shadows, and restrained glows.
 * Native Phaser Graphics; no 3D engine or downloaded sprite assets.
 */
function renderHomeInterior(scene){
 const g=scene.add.graphics();
 // Scale individual furniture clusters, not the room shell, floor, or player.
 // Pixel coordinates remain rounded so the room retains crisp 16-bit artwork.
 const FURNITURE_SCALE=.90;
 let artRegion={cx:0,cy:0,scale:1};
 const objectGroup=(cx,cy)=>{artRegion={cx,cy,scale:FURNITURE_SCALE}};
 const endGroup=()=>{artRegion={cx:0,cy:0,scale:1}};
 const transformed=(x,y)=>({
  x:Math.round(artRegion.cx+(x-artRegion.cx)*artRegion.scale),
  y:Math.round(artRegion.cy+(y-artRegion.cy)*artRegion.scale)
 });
 const R=(x,y,w,h,c,a=1)=>{
  const p=transformed(x,y);
  g.fillStyle(c,a);
  g.fillRect(p.x,p.y,Math.max(1,Math.round(w*artRegion.scale)),Math.max(1,Math.round(h*artRegion.scale)));
 };
 const L=(x1,y1,x2,y2,c,w=2,a=1)=>{
  const p=transformed(x1,y1),q=transformed(x2,y2);
  g.lineStyle(Math.max(1,Math.round(w*artRegion.scale)),c,a);
  g.lineBetween(p.x,p.y,q.x,q.y);
 };
 const E=(x,y,w,h,c)=>{
  const p=transformed(x,y);
  g.fillStyle(c);
  g.fillEllipse(p.x,p.y,Math.max(1,Math.round(w*artRegion.scale)),Math.max(1,Math.round(h*artRegion.scale)));
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
   E(x+v(dx),y+v(dy),v(17),v(10),c);
   R(x+v(dx-4),y+v(dy-3),v(6),v(2),0xc0dda7,.29);
  }
 };
 const book=(x,y,c)=>{R(x+2,y+2,13,9,0x152633,.29);R(x,y,13,8,c);R(x,y,3,8,0xe4d5ab);R(x+4,y+2,6,1,0xf3ead0,.68)};
 const monitor=(x,y,w,h,deskY)=>{
  // Display housing, contact shadow, and stand that reaches the desk surface.
  R(x-3,y-3,w+6,h+6,0x162535);
  R(x,y,w,h,0x20485f);
  R(x+3,y+4,w-6,4,0x568da7);
  for(let i=0;i<3;i++)
   R(x+4,y+13+i*6,w-11-(i%2)*8,2,i%2?0x83d9dd:0x8db4ca);
  R(x+5,y+h-9,w-15,2,0x39748b);
  GL(x+2,y+2,w-4,1,0x70d4e3);
  const middle=x+Math.floor(w/2);
  const stemTop=y+h+3;
  R(middle-3,stemTop,6,Math.max(2,deskY-stemTop),0x293c49);
  R(middle-2,stemTop,2,Math.max(2,deskY-stemTop),0x668396);
  R(middle-10,deskY-1,20,3,0x4d6874);
  R(middle-9,deskY,18,1,0x142e3b,.38);
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
 objectGroup(155,193);
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
 endGroup();
 objectGroup(414,195);
 // Panorama bench, kept narrow to leave the middle of Home walkable.
 BOX(290,182,248,10,4,0xad896c,0x505766,0x344052);
 for(let i=0;i<5;i++){
  R(295+i*48,194,43,10,0x455362);
  R(299+i*48,196,34,2,0x88909c);
 }
 plant(297,181,.5);plant(527,184,.57);
 endGroup();
 objectGroup(689,188);
 // 4. Workstation pushed against the north wall beside the blueprint.
 // Desktop at y=171. Every monitor stem terminates on that same surface.
 SH(603,171,182,64,.23);
 BOX(604,171,180,23,6,0xe9bc8e,0xbc8e68,0x8a654c);
 R(609,177,168,2,0xf3d4a7,.38);
 BOX(607,195,30,35,4,0x607381,0x3c4f60,0x273b49);
 BOX(751,195,30,35,4,0x5e7180,0x3b4e5f,0x273847);
 for(const xx of [610,754])for(let i=0;i<2;i++){
  PANEL(xx,202+i*15,23,12,0x556c7b,0x344959,0x233643);
  R(xx+7,207+i*15,10,2,0xe3b57f);
 }
 // Books and small ornaments are above the monitors, never over the screen pixels.
 R(619,96,144,5,0x2d3d49);
 GL(620,95,143,1,0xffb46e);
 for(let i=0;i<8;i++){
  const xx=624+i*17;
  R(xx,82+(i%3)*2,10,14-(i%3)*2,
   [0x6b9ca0,0xb9956d,0x8fa0b4,0x648f80][i%4]);
  R(xx+2,84+(i%3)*2,2,9,0xe6cfaa,.66);
 }
 plant(776,155,.32);
 // Monitors and their stands are actually attached to the rear of the desk.
 monitor(618,127,33,32,172);
 monitor(662,120,44,39,172);
 monitor(717,127,34,32,172);
 // Product-flow chart on the main display.
 L(669,148,678,137,0x91e2d9,2);
 L(678,137,688,145,0x91e2d9,2);
 L(688,145,700,130,0x91e2d9,2);
 for(const [x,y] of [[669,148],[678,137],[688,145],[700,130]])
  R(x-1,y-1,3,3,0xecf6e9);
 // Keyboard, mouse, tablet, and a coffee mug rest on the visible desktop.
 PANEL(644,182,84,8,0x526572,0x253644,0x192b39);
 for(let i=0;i<12;i++)
  R(651+i*6,186,4,1,i%3?0x9fc6c3:0xe3b47d);
 R(734,180,8,9,0x243747);R(737,181,3,2,0x92b9bb);
 R(748,180,13,9,0xdcd3bf);R(752,179,5,3,0x799aa1);
 // Compact ergonomic chair below the workstation.
 SH(666,230,45,33,.25);
 BOX(669,225,41,26,4,0x567183,0x364e62,0x223748);
 BOX(664,251,50,7,4,0x2d4659,0x233848,0x172b3c);
 R(687,260,6,11,0x293d4e);
 R(670,270,41,3,0x334958);
 endGroup();
 objectGroup(843,130);
 // 5. Blueprint stays mounted on the north wall beside the shifted desk.
 SH(817,102,52,57,.10);
 BOX(820,101,47,54,4,0xf7e6c6,0xdccbaf,0xb29b7b);
 R(826,111,35,39,0xc4dad1);
 for(let i=0;i<3;i++){
  R(835+i*8,113,1,34,0xf7ecdc);
  R(828,119+i*10,31,1,0xf5ebda);
 }
 R(837,125,13,9,0x78afbf);R(840,128,7,5,0x347b92);
 R(838,104,11,3,0xb48f69);
 endGroup();
 objectGroup(191,368);
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
 endGroup();
 objectGroup(197,450);
 // 7. Smaller dining table with two chairs, visibly detached from the kitchen.
 SH(136,430,118,28,.21);
 BOX(136,430,112,23,5,0xe3b385,0xbf8a5c,0x875d40);
 BOX(150,461,24,13,4,0x648397,0x3b5264,0x25394c);
 BOX(205,461,24,13,4,0x638297,0x3b5062,0x243849);
 R(154,478,3,8,0x374c5d);R(218,478,3,8,0x384b59);
 plant(159,427,.32);
 R(224,425,8,10,0xe7e1d5);R(225,424,7,2,0x8198a6);
 endGroup();
 objectGroup(765,383);
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
 endGroup();
 objectGroup(850,410);
 // Living-room TV now faces upward from the bottom wall, not the right wall.
 plant(849,312,.48);
 plant(892,423,.36);
 R(864,299,4,45,0x6a5f52);GL(859,296,14,3,0xffb96b);
 SH(802,448,88,29,.15);
 PANEL(803,447,86,27,0x739eaf,0x213e53,0x152d43);
 R(809,452,74,16,0x50acc4);
 R(813,455,67,2,0x8bd9e6,.55);
 R(816,461,31,2,0x70d5d5);
 R(857,457,17,7,0x2c7296);
 GL(887,454,2,13,0x67d4e7);
 R(835,475,23,3,0x354b5c);R(844,478,6,5,0x273947);
 endGroup();
 // 9. Compact south door with walkable space on either side.
 R(418,471,122,36,0x1a2e40);R(435,476,90,32,0x2f4658);
 R(442,482,77,23,0x4c6272);R(449,488,63,9,0x344f63);
 GL(453,479,56,3,0x67d9e6);
 GL(419,481,3,19,0xf9ad61);GL(538,481,3,19,0xf9ad61);
 // Match the approved futuristic HOME EXIT mat even in the fallback renderer.
 scene.add.image(480,444,'exit-pad-home-v1644')
  .setOrigin(.5,0).setDisplaySize(120,38).setDepth(1.2);
 // 10. Interaction radii are based on the new furniture positions.
 // Home computer completes its quest; book and blueprint are optional reading.
 scene.zones=[
  {x:480,y:449,r:56,label:'Return to Baio District',to:'district'},
  {x:686,y:247,r:91,label:'Read About Me',object:'home'},
  {x:771,y:421,r:62,label:'Read Design Notes',object:'home-notebook'},
  {x:843,y:177,r:62,label:'Inspect District Blueprint',object:'home-blueprint'}
 ];
 // Furniture footprints match visible solid areas (carpet, windows, shadows are walkable).
 // Match collision footprints to the scaled furniture artwork.
 const fit=(x,y,w,h,cx,cy)=>{
  const k=FURNITURE_SCALE;
  return {x:Math.round(cx+(x-cx)*k),y:Math.round(cy+(y-cy)*k),
   w:Math.max(1,Math.round(w*k)),h:Math.max(1,Math.round(h*k))};
 };
 scene.homeFurniture=[
  fit(79,145,125,102,155,193),  // bed
  fit(62,330,56,76,191,368),   // refrigerator
  fit(130,340,165,68,191,368), // kitchen cabinets
  fit(306,322,10,84,191,368),  // divider
  fit(136,430,112,29,197,450), // dining table
  fit(604,171,180,63,689,188), // workstation
  fit(669,225,41,49,689,188),  // desk chair
  fit(706,350,127,57,765,383), // sofa
  fit(726,404,84,23,765,383),  // coffee table
  fit(803,447,86,36,850,410)   // television
 ];
 const caption=(x,y,t,size,c,bg)=>{
  scene.add.text(x,y,t,{
   fontFamily:'monospace',fontSize:size+'px',color:c,
   ...(bg?{backgroundColor:bg,padding:{x:5,y:3}}:{})
  }).setOrigin(.5,0);
 };
 caption(480,450,'EXIT TO DISTRICT',11,'#e3efe4','#1e3545');
 caption(686,279,'ABOUT ME COMPUTER',11,'#eddbba','#293c49');
 caption(845,181,'BLUEPRINT',10,'#f4ddb8');
}
