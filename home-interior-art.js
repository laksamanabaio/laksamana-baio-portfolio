/*
 * BAIO DISTRICT 2077 — HOME 13.0 / SUNRISE LOFT
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
 // 1. Walnut flooring, shallow pixel bevels, and a slate-blue cutaway wall.
 r(0,0,960,540,0x07111d);
 r(24,20,913,488,0x101e30);
 r(33,29,896,471,0x26384d);
 r(42,39,877,453,0xb47f55);
 r(42,39,877,109,0x2b3344);
 for(let x=51;x<909;x+=76){
  r(x,50,2,83,0x455061,.7);r(x+5,53,1,77,0x718097,.34);
 }
 r(43,143,876,6,0x18283d);
 for(let y=149;y<484;y+=19){
  r(44,y,874,2,0x93613f,.8);r(44,y+3,874,1,0xd69c6a,.42);
  for(let x=54+(Math.floor(y/19)%3)*44;x<908;x+=139){
   r(x,y+2,2,16,0x865c43,.48);
   r(x+12,y+8,32,1,0xdfab78,.12);
  }
 }
 // Morning sunlight is behind every object; keep it subtle enough for navigation.
 lighting.fillStyle(0xffdfa8,.13);
 lighting.fillTriangle(337,145,364,145,520,474);
 lighting.fillTriangle(364,145,395,145,592,475);
 lighting.fillStyle(0xffe9ba,.07);
 lighting.fillTriangle(416,145,436,145,722,473);
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
 // 2. Seven genuine artwork assets placed like the approved morning loft mockup.
 // Behind characters and all dialogue/quest controls.
 mount('window',258,12,342,94,1.6);      // panoramic MORNING skyline, north wall
 mount('bed',76,47,213,157,2.0);        // northwest, rug integrated
 mount('workstation',606,50,248,112,2.0);// north-east, screen + chair
 mount('blueprint',819,84,74,48,2.8);  // wall panel below top-right HUD
 mount('kitchen',53,211,352,192,2.3);  // west kitchen + built-in partition wall
 mount('dining',170,352,158,98,2.8);   // southwest, table and two chairs
 mount('lounge',564,271,286,173,2.6); // southeast, sofa + whole rug + table
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
  {x:729,y:203,r:86,label:'Read About Me',object:'home'},
  {x:722,y:409,r:79,label:'Read Design Notes',object:'home-notebook'},
  {x:859,y:159,r:73,label:'Inspect District Blueprint',object:'home-blueprint'}
 ];
 // Only solid furniture/wall silhouettes collide. Rugs, neon, and the floor are walkable.
 // The bottom of the kitchen partition has an open path for entering the dining nook.
 scene.homeFurniture=[
  {x:130,y:66,w:116,h:110},  // bed mattress, not its floor rug
  {x:57,y:213,w:344,h:12},   // kitchen upper built-in wall
  {x:381,y:219,w:21,h:171},  // east kitchen divider, open at south
  {x:92,y:268,w:272,h:70},   // kitchen counters and fridge
  {x:174,y:370,w:152,h:75},  // dining set, position matches the reference
  {x:629,y:95,w:217,h:57},   // worktable
  {x:691,y:140,w:61,h:39},   // office chair
  {x:605,y:290,w:219,h:69},  // sofa frame, not the rug
  {x:652,y:366,w:144,h:50}   // lounge coffee table
 ];
 const tag=(x,y,value,size,color,bg)=>scene.add.text(x,y,value,{
  fontFamily:'monospace',fontSize:size+'px',color,
  backgroundColor:bg,padding:{x:6,y:3}
 }).setOrigin(.5,0).setDepth(9);
 tag(480,451,'EXIT TO DISTRICT',11,'#dcefed','#213748');
 tag(728,198,'ABOUT ME COMPUTER',11,'#e6f1e8','#243b4b');
 tag(858,151,'BLUEPRINT',10,'#e5d5b4','#20364a');
}