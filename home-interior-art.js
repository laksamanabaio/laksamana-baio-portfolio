/*
 * BAIO DISTRICT 2077 — HOME 15.43 / TIME-AWARE WINDOW PANORAMA
 * Uses the seven approved isolated transparent PNGs, cropped and optimized
 * for the 960x540 game stage. The furniture, walls, rug and window are native
 * pixel art; Phaser Graphics is only used for the architectural shell, floor,
 * restrained ambient lighting, and the entrance.
 */
function renderHomeWithAssets(scene){
 const names=['bed','kitchen','dining','lounge','workstation','blueprint','window'];
 if(names.some(id=>!scene.textures.exists('home-v13-'+id))){
  if(typeof renderHomeInterior==='function')renderHomeInterior(scene);
  return;
 }
 const g=scene.add.graphics().setDepth(0);
 const r=(x,y,w,h,c,a=1)=>{g.fillStyle(c,a);g.fillRect(x,y,w,h)};
 const l=(x1,y1,x2,y2,c,w=2,a=1)=>{
  g.lineStyle(w,c,a);g.lineBetween(x1,y1,x2,y2);
 };
 const lighting=scene.add.graphics().setDepth(0.6);
 const light=(x,y,w,h,c,a)=>{
  lighting.fillStyle(c,a);lighting.fillRect(x,y,w,h);
 };
 const mount=(id,x,y,w,h,depth=2)=>{
  const o=scene.add.image(x,y,'home-v13-'+id).setOrigin(0,0)
   .setDisplaySize(w,h).setDepth(depth);
  return o;
 };
 // 1. Warm, softly textured sunrise-loft wood planks, matching the approved art.
 // The walls, window and floor are separate layers, keeping room architecture clear.
 r(0,0,960,540,0x07111d);
 r(24,20,913,488,0x101e30);
 r(33,29,896,471,0x26384d);
 r(42,39,877,453,0xb27b51);
 r(42,39,877,109,0x253040);
 for(let x=54;x<906;x+=88){
  r(x,48,2,82,0x3c4759,.60);
  r(x+6,51,1,76,0x77859a,.22);
 }
 // The first seam aligns with the north wall's baseboard.
 r(43,143,876,6,0x192a3d);
 for(let row=0,y=149;y<484;row++,y+=22){
  r(44,y,874,2,0x8b5939,.64);
  r(44,y+3,874,1,0xe2aa78,.28);
  for(let x=58+(row%3)*48;x<905;x+=151){
   r(x,y+2,2,18,0x82563a,.40);
   r(x+16,y+10,34,1,0xe6bd8e,.11);
  }
  if(row%3===0)r(45,y+9,871,2,0xb77b50,.055);
 }
 // 2. The morning window spans x=224..566 and is 342x94 pixels.
 // Cast exactly that same rectangular silhouette on a small section of
 // the upper floor, instead of long light beams reaching toward the exit.
 // Lighting stays behind furniture and avatars.
 lighting.fillStyle(0xffe2a6,.105);
 lighting.fillRect(224,166,342,94);
 r(28,39,16,458,0x172838);
 r(918,39,14,458,0x15283a);
 r(26,482,907,26,0x16283a);
 r(42,487,877,10,0x2d4559);
 // Wall-mounted accent strips (decorative, noninteractive).
 const neon=scene.add.graphics().setDepth(1);
 const strip=(x,y,w,h,c)=>{
  neon.fillStyle(c,.09);neon.fillRect(x-4,y-4,w+8,h+8);
  neon.fillStyle(c,.24);neon.fillRect(x-2,y-2,w+4,h+4);
  neon.fillStyle(c,.92);neon.fillRect(x,y,w,h);
 };
 strip(71,57,87,3,0x76dfeb);
 strip(628,45,53,3,0x7bdeef);
 strip(871,54,29,3,0xffbb75);
 strip(45,167,3,53,0x6acfe1);
 strip(918,196,3,55,0x73d8e9);
 strip(66,489,37,2,0x70d6e3);
 strip(857,489,36,2,0xffb269);
 // 2. Reference-driven wall-attached furniture positions, kept inside the room.
 // The bedroom rug ends against the kitchen wall; the kitchen sprite is in
 // front of it, so the partition neatly hides any overlap at their seam.
 scene.homeWindow=mount('window',224,12,342,94,1.6); // retain approved placement and scale
 mount('bed',44,96,213,157,1.8);          // lower, at left wall; bottom tucked behind kitchen wall
 mount('workstation',580,92,248,112,2.0); // left and down, inside the north wall
 mount('blueprint',842,84,74,48,2.8);    // flush against right wall but within room
 mount('kitchen',39,236,352,192,2.6);    // wall overlays bed bottom seam via higher depth
 mount('dining',95,380,158,98,3.0);      // original dining position remains
 mount('lounge',602,295,286,173,2.6);   // original sofa / coffee table remains
 // 3. The exit is visually connected to the same architecture.
 const door=scene.add.graphics().setDepth(1.2);
 door.fillStyle(0x13273b);door.fillRect(419,478,122,31);
 door.fillStyle(0x253d50);door.fillRect(432,479,98,30);
 door.fillStyle(0x4b6473);door.fillRect(440,484,81,20);
 door.fillStyle(0x334f63);door.fillRect(446,488,69,13);
 door.fillStyle(0x67dced,.85);door.fillRect(449,480,64,3);
 door.fillStyle(0xffb36a,.88);door.fillRect(420,482,4,22);
 door.fillStyle(0xffb36a,.88);door.fillRect(536,482,4,22);
 // 4. Keep the current Home objective and optional discoveries.
 scene.zones=[
  {x:480,y:447,r:59,label:'Return to Baio District',to:'district'},
  {x:703,y:245,r:86,label:'Read About Me',object:'home'},
  {x:760,y:433,r:79,label:'Read Design Notes',object:'home-notebook'},
  {x:882,y:159,r:73,label:'Inspect District Blueprint',object:'home-blueprint'}
 ];
 // Only solid furniture/wall silhouettes collide. Rugs, neon, and the floor are walkable.
 // The bottom of the kitchen partition has an open path for entering the dining nook.
 scene.homeFurniture=[
  {x:44,y:96,w:213,h:157},  // entire bed + rug solid per request: no walking through
  {x:43,y:238,w:344,h:12},   // kitchen wall touches west shell; higher render layer
  {x:367,y:244,w:21,h:171},  // east kitchen divider, southern passage remains open
  {x:78,y:293,w:272,h:70},   // kitchen counters and refrigerator
  {x:99,y:398,w:152,h:75},   // dining footprint moved to southwest corner
  {x:603,y:137,w:217,h:57},  // workstation moved left 26, down 14
  {x:665,y:182,w:61,h:39},   // chair follows workstation
  {x:643,y:314,w:219,h:69},  // sofa frame (rug is walkable)
  {x:690,y:390,w:144,h:50}   // lounge coffee table moved southeast
 ];
 // New transparent futuristic HOME EXIT mat (navy, blue and amber accents).
 // The existing exit interaction zone is unchanged.
 scene.add.image(480,440,'exit-pad-home-v1644')
  .setOrigin(.5,0).setDisplaySize(144,44).setDepth(1.2);
 // Animated, non-text interaction beacons: cyan for the computer chair,
 // amber for Blueprint, and lime green for Design Notes on the coffee table.
 // Position is anchored to each object; the existing E / SPACE / tap gameplay
 // continues to work normally. No extra collision or clickable screen overlay.
 const interactionBeacon=(x,y,tint)=>{
  const marker=scene.add.graphics().setDepth(4.8);
  const pulse={p:0};
  const paint=()=>{
   const wave=pulse.p,dy=-3*Math.sin(wave*Math.PI);
   const yy=y+dy;
   marker.clear();
   marker.fillStyle(tint,.07+.09*wave);
   marker.fillCircle(x,yy,14+2*wave);
   marker.lineStyle(2,tint,.60+.30*wave);
   marker.strokeCircle(x,yy,9+2*wave);
   marker.fillStyle(0x152b3a,.95);
   marker.fillCircle(x,yy,7);
   marker.fillStyle(tint,.95);
   marker.fillCircle(x,yy,4);
   marker.fillStyle(0xf1ffff,.88);
   marker.fillRect(x-1,yy-2,2,3);
   marker.fillStyle(tint,.85);
   marker.fillTriangle(x-4,yy-15,x+4,yy-15,x,yy-11);
  };
  paint();
  if(scene.tweens){
   scene.tweens.add({
    targets:pulse,p:1,duration:1050,yoyo:true,repeat:-1,
    ease:'Sine.easeInOut',onUpdate:paint
   });
  }
  return marker;
 };
 interactionBeacon(696,185,0x76e4ee); // centered on the computer chair
 interactionBeacon(881,145,0xffc979); // Blueprint
 interactionBeacon(748,406,0xa5f27a); // Design Notes: middle of the coffee table
}