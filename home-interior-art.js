/*
 * BAIO DISTRICT 2077 / HOME INTERIOR 12.2
 * Real transparent pixel-art furniture extracted from approved design studies.
 * Hand-drawn architecture and divider walls remain solid, navigable and readable.
 */
function renderHomeWithAssets(scene){
 // If an asset cannot load, retain the previous procedural interior as fallback.
 if(!scene.textures.exists('home-bed') || !scene.textures.exists('home-workstation') ||
    !scene.textures.exists('home-skyline') || !scene.textures.exists('home-kitchen')){
  renderHomeInterior(scene);return;
 }
 const g=scene.add.graphics().setDepth(0);
 const rect=(x,y,w,h,color,alpha=1)=>{
  g.fillStyle(color,alpha);g.fillRect(x,y,w,h);
 };
 const line=(x1,y1,x2,y2,color,width=2,alpha=1)=>{
  g.lineStyle(width,color,alpha);g.lineBetween(x1,y1,x2,y2);
 };
 const lamp=(x,y,amber=false)=>{
  const c=amber?0xffbd65:0x75ddef;
  rect(x-4,y-5,12,14,c,.06);rect(x-2,y-3,8,10,c,.19);
  rect(x,y,4,8,c);rect(x+1,y+2,2,3,0xffffff,.65);
 };
 const asset=(key,x,y,w,h,depth=2)=>{
  if(!scene.textures.exists('home-'+key))return null;
  return scene.add.image(x,y,'home-'+key)
   .setOrigin(0,0).setDisplaySize(w,h).setDepth(depth);
 };
 // 1. Warm timber floor inside a beveled cyberpunk apartment shell.
 rect(0,0,960,540,0x07111c);
 rect(24,20,913,489,0x101b2a);
 rect(33,30,897,473,0x26384c);
 rect(42,39,876,460,0xb47e55);
 rect(42,39,876,113,0x293244);
 for(let x=52;x<909;x+=79){
  rect(x,48,2,83,0x4c4c56);rect(x+5,48,1,83,0x43546a,.55);
 }
 rect(42,143,876,5,0x111f33);
 for(let y=149;y<484;y+=19){
  rect(43,y,875,2,0x906140,.67);
  rect(43,y+3,875,1,0xd79c6b,.48);
  for(let x=54+Math.floor(y/19)%3*44;x<900;x+=139)
   rect(x,y+2,2,16,0x8d5b44,.55);
 }
 g.fillStyle(0xffdba1,.09);g.fillTriangle(350,145,390,145,607,467);
 g.fillStyle(0xffe7ae,.07);g.fillTriangle(429,148,455,148,736,472);
 rect(27,38,17,457,0x18293b);rect(918,38,13,457,0x172738);
 rect(26,481,907,27,0x142639);rect(42,486,878,12,0x294154);
 for(let x=55;x<911;x+=139){
  rect(x,490,42,3,x%2?0x63cadc:0xf6a85f,.88);
 }
 lamp(42,86);lamp(917,179);lamp(414,485,true);lamp(540,485,true);
 // 2. Real pixel-art furnishings, aligned to walls in the approved reference.
 // Flush-fit panorama window into the north wall; its lower console stays beneath the glass.
 rect(264,40,314,137,0x12283b);
 rect(267,43,308,131,0x3e5d70);
 asset('skyline',255,20,326,174,1);
 // Bed in the northwest corner, headboard right against the upper wall.
 asset('bed',14,68,192,150,2);
 // Triple-display desk sits along north wall, just left of the Blueprint.
 asset('workstation',603,60,245,183,2);
 // Fridge and kitchen counter are pressed close to the kitchen's upper partition.
 asset('kitchen',39,251,276,158,3);
 // NEW: straight-on dining tabletop and two chairs, natural image proportions.
 asset('dining-v2',154,391,153,93,3);
 // No free floor plant pots; cropped sofa sprite also has no floor pot.
 asset('sofa-v3',691,303,205,159,3);
 // NEW: front-aligned cyberpunk coffee table, not the skewed old asset.
 asset('coffee-v2',728,409,134,68,4);
 // 3. Real partition walls around kitchen and dining, with a 74px walk-in gap.
 // Their upper faces and shadowed fronts match the furnished apartment aesthetic.
 // The walls are architectural background, never foreground above kitchen furniture.
 const w=scene.add.graphics().setDepth(1);
 const wall=(x,y,width,height)=>{
  w.fillStyle(0x071421,.18);w.fillRect(x+4,y+7,width,height+4);
  w.fillStyle(0x111f30);w.fillRect(x,y,width,height);
  w.fillStyle(0x283d50);w.fillRect(x+2,y+2,width-4,height-6);
  w.fillStyle(0x546a7a);w.fillRect(x+3,y+3,width-6,4);
  w.fillStyle(0x69cee0,.84);w.fillRect(x+6,y+8,Math.max(3,width-12),2);
  w.fillStyle(0x101b2b);w.fillRect(x+2,y+height-6,width-4,6);
  w.fillStyle(0xd79a61,.6);w.fillRect(x+5,y+height-5,width-10,2);
 };
 // The top wall clearly divides the sleeping/working room from the kitchen.
 wall(33,270,329,20);
 // East wall is split in two so the avatar can actually enter the kitchen/dining.
 wall(349,277,21,64);
 wall(349,415,21,57);
 // Visible wall endcaps frame the open entrance.
 w.fillStyle(0x23394b);w.fillRect(348,336,23,7);
 w.fillStyle(0x23394b);w.fillRect(348,412,23,8);
 w.fillStyle(0xffae65,.88);w.fillRect(354,334,4,6);
 w.fillStyle(0x70dbe6,.88);w.fillRect(354,414,4,6);
 // 4. Subtle mounted neon fixtures: the world stays 16-bit pixel art.
 // Their soft rectangular halos sit on the apartment walls, never blocking movement.
 const neon=scene.add.graphics().setDepth(1.5);
 const neonBar=(x,y,bw,bh,tint)=>{
  neon.fillStyle(0x070d15,.53);neon.fillRect(x-4,y-4,bw+8,bh+8);
  neon.fillStyle(tint,.07);neon.fillRect(x-8,y-8,bw+16,bh+16);
  neon.fillStyle(tint,.21);neon.fillRect(x-4,y-4,bw+8,bh+8);
  neon.fillStyle(tint,.92);neon.fillRect(x,y,bw,bh);
  neon.fillStyle(0xe8ffff,.62);neon.fillRect(x+2,y+1,Math.max(1,bw-4),Math.max(1,bh-2));
 };
 const wallSconce=(x,y,tint)=>{
  neon.fillStyle(0x111b2b);neon.fillRect(x-5,y-4,14,30);
  neon.fillStyle(0x445e70);neon.fillRect(x-3,y-3,10,27);
  neon.fillStyle(tint,.19);neon.fillRect(x-6,y-2,16,25);
  neon.fillStyle(tint,.93);neon.fillRect(x,y,4,21);
  neon.fillStyle(0xffffff,.55);neon.fillRect(x+1,y+3,1,14);
 };
 // Top wall, above bedroom and workstation.
 neonBar(75,64,96,3,0x69dbed);
 neonBar(204,86,38,3,0xffbd77);
 neonBar(604,51,99,3,0x61d7f0);
 neonBar(785,58,58,3,0xffba70);
 wallSconce(50,164,0xffac69);
 wallSconce(900,173,0x77e3f4);
 // Partition top and doorway have their own alternating colors.
 neonBar(57,274,113,2,0xffb66d);
 neonBar(213,274,115,2,0x6ad5e7);
 wallSconce(352,303,0x64dcf0);
 wallSconce(352,438,0xffaf6c);
 // Calm reflected light over the floor creates depth without overlighting the art.
 const reflect=scene.add.graphics().setDepth(.5);
 reflect.fillStyle(0xffb36e,.055);reflect.fillRect(67,290,140,24);
 reflect.fillStyle(0x64d6e6,.045);reflect.fillRect(214,291,104,18);
 // Right-wall TV is a deliberately simplified decorative item (no quest).
 const tv=scene.add.graphics().setDepth(2);
 tv.fillStyle(0x172d42);tv.fillRect(895,287,22,126);
 tv.fillStyle(0x5fc1d8);tv.fillRect(899,291,13,116);
 tv.fillStyle(0x174d73);tv.fillRect(901,301,9,95);
 tv.fillStyle(0x90eff2,.75);tv.fillRect(907,315,2,54);
 tv.fillStyle(0x0b2036);tv.fillRect(897,410,19,6);
 // Blueprint remains a visible extra inspectable object on the north-east wall.
 const bp=scene.add.graphics().setDepth(1);
 bp.fillStyle(0x172b40);bp.fillRect(865,102,35,66);
 bp.fillStyle(0xdcc9a8);bp.fillRect(870,107,25,56);
 bp.fillStyle(0x82bcca);bp.fillRect(874,112,17,44);
 bp.fillStyle(0x477b96);bp.fillRect(879,119,7,9);
 bp.fillStyle(0xe8ece0,.85);bp.fillRect(876,138,13,2);
 bp.fillStyle(0x84dfeb);bp.fillRect(871,109,23,2);
 // Soft decorative lighting beneath the long window frame.
 const glow=scene.add.graphics().setDepth(1);
 glow.fillStyle(0x73d7ed,.13);glow.fillRect(297,175,241,6);
 glow.fillStyle(0xffb46b,.12);glow.fillRect(623,223,197,6);
 // Primary quest stays the workstation, two optional stories stay discoverable.
 scene.zones=[
  {x:480,y:449,r:59,label:'Return to Baio District',to:'district'},
  {x:734,y:234,r:82,label:'Read About Me',object:'home'},
  {x:760,y:457,r:75,label:'Read Design Notes',object:'home-notebook'},
  {x:881,y:196,r:71,label:'Inspect District Blueprint',object:'home-blueprint'}
 ];
 // These are *solid silhouettes*, not image rectangles: leave walkways clear.
 // Top and east room dividers share collision bounds with the visible walls.
 scene.homeFurniture=[
  {x:33,y:270,w:329,h:20}, // raised upper kitchen wall
  {x:349,y:277,w:21,h:64}, // upper doorway partition
  {x:349,y:415,w:21,h:57}, // lower doorway partition
  {x:40,y:89,w:159,h:126},// enlarged northwest bed
  {x:52,y:300,w:251,h:64}, // kitchen cabinet block moved 16px north
  {x:154,y:424,w:153,h:54},// dining table/chairs UNCHANGED
  {x:617,y:110,w:213,h:77},// workstation
  {x:695,y:186,w:64,h:33}, // desk chair
  {x:715,y:332,w:166,h:69},// larger sofa, shifted north
  {x:728,y:418,w:134,h:55},// coffee table centered with sofa
  {x:895,y:287,w:22,h:126}// wall television
 ];
 const text=(x,y,value,size,color,background)=>{
  return scene.add.text(x,y,value,{
   fontFamily:'monospace',fontSize:size+'px',color,
   ...(background?{backgroundColor:background,padding:{x:6,y:3}}:{})
  }).setOrigin(.5,0).setDepth(9);
 };
 text(480,446,'EXIT TO DISTRICT',11,'#e3f5f0','#152f42');
 text(734,237,'ABOUT ME COMPUTER',11,'#e9f4e8','#243b4a');
 text(880,174,'BLUEPRINT',10,'#ffe1a4','#23364b');
}
