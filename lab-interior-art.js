/* BAIO DISTRICT 2077 — Laboratory HD interior v15.91.
 * The Lab is constructed from the approved transparent high-resolution props.
 * Old procedural laboratory furnishings are not rendered in this scene.
 */
function renderHDLabInterior(scene){
 const C={cyan:0x65e9ec,ice:0xd0fbfc,slate:0x253e4f,steel:0x597b87};
 const shell=scene.add.graphics().setDepth(0);
 const detail=scene.add.graphics().setDepth(1);
 const rect=(g,x,y,w,h,c,a=1)=>{g.fillStyle(c,a);g.fillRect(x,y,w,h)};
 // The same 960 x 540 three-quarter-view cutaway stage as HOME.
 rect(shell,0,0,960,540,0x06131f);
 rect(shell,23,19,914,488,0x102534);
 rect(shell,29,26,902,476,0x243c4d);
 rect(shell,42,38,876,449,0x9db0b5);
 rect(shell,43,38,874,113,0x1e3545);
 rect(shell,43,151,874,332,0x829da5);
 // Brushed, pale blue-gray alloy floor, subtly warmer than street flooring.
 for(let y=151,row=0;y<483;y+=27,row++){
  rect(shell,43,y,875,2,0x537480,.55);
  rect(shell,43,y+3,875,2,0xd0e2dd,.32);
  for(let x=54+(row%2)*52;x<914;x+=107){
   rect(shell,x,y+6,2,19,0x63838e,.25);
   rect(shell,x+10,y+19,41,1,0xe7ffff,.17);
  }
 }
 // Wall framing and subtle luminous panels behind the object PNGs.
 for(let x=58;x<903;x+=94){
  rect(shell,x,47,3,93,0x3f6371);
  rect(shell,x+7,49,2,87,0x8edcde,.13);
 }
 for(const [x,y,w] of [[69,61,115],[325,63,118],[602,59,79],[785,62,101]]){
  rect(detail,x-5,y-5,w+10,9,0x35a9bc,.10);
  rect(detail,x,y,w,3,0x79edf1,.77);
  rect(detail,x+5,y+4,w-10,1,0xe9ffff,.35);
 }
 rect(shell,27,38,15,449,0x182f41);
 rect(shell,918,38,13,449,0x182f41);
 rect(shell,27,483,905,22,0x173042);
 rect(shell,42,487,875,10,0x365366);
 for(const x of [58,860]){
  rect(detail,x,489,50,3,0x4de1e8,.18);
  rect(detail,x+9,489,35,2,0x8dfcff,.88);
 }
 // Futuristic aqua/cyan EXIT mat, rendered above the Lab floor.
 // This is decorative only; the existing exit zone and collision are preserved.
 scene.add.image(480,444,'exit-pad-lab-v1644')
  .setOrigin(.5,0).setDisplaySize(132,39).setDepth(1.2);
 // Each image is a real PNG-origin transparent HD art asset, optimized as WebP.
 // Position and display size are isolated in this table for future fine tuning.
 // Chemical refrigerator and shelving stay 352x192 at X=39.
 // Lowered 25px from Y=231 back to Y=256, restoring the path into
 // the teleport front stairs while keeping the bottom path walkable.
 // Keep DNA machine, digital research board, computer, teleport and storage wall.
 // Both right-side chemical benches have been removed.
 const items=[
  {name:'teleport',x:45,y:25,w:177,depth:2.15},
  {name:'dna-research-board',x:250,y:3,w:166,depth:2.06},
  {name:'dna-machine',x:441,y:10,w:244,depth:2.1},
  {name:'computer',x:705,y:95,w:213,depth:2.1},
  {name:'chemical-storage-wall',x:39,y:256,w:352,h:192,depth:2.6}, // matches HOME kitchen
  // Long drawer-free laboratory research bench, paper studies and glassware.
  {name:'research-workbench-long',x:568,y:267,w:329,depth:2.62} // 20px up from v15.86; lower-right Lab
 ];
 scene.labAssetLayout=items;
 for(const item of items){
  const key=item.name==='dna-research-board'
   ?'lab-v1561-dna-research-board':item.name==='chemical-storage-wall'
   ?'lab-v1566-chemical-storage-wall':item.name==='research-workbench-long'
   ?'lab-v1584-research-workbench-long':'lab-v1549-'+item.name;
  if(!scene.textures.exists(key)){
   console.warn('Lab HD asset missing:',key);
   continue;
  }
  const texture=scene.textures.get(key).getSourceImage();
  const h=item.h||item.w*texture.height/texture.width;
  scene.add.image(item.x,item.y,key).setOrigin(0,0)
   .setDisplaySize(item.w,h).setDepth(item.depth);
 }
 // Match the three pulsing, floating interaction beacons used by HOME.
 // Visual-only overlays: the teleport stair zone, object interactions,
 // furniture collisions and walking behaviour are unchanged.
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
 // Object-relative anchors also follow future furniture repositioning.
 const portalItem=items.find(item=>item.name==='teleport');
 const dnaItem=items.find(item=>item.name==='dna-machine');
 const computerItem=items.find(item=>item.name==='computer');
 interactionBeacon(portalItem.x+portalItem.w/2,portalItem.y+178,0xa5f27a);
 interactionBeacon(dnaItem.x+dnaItem.w/2,dnaItem.y+162,0xffc979);
 interactionBeacon(computerItem.x+computerItem.w/2,computerItem.y+93,0x76e4ee);
 // Energy shimmer only: the transparent TELEPORT asset contains the staircase,
 // lit podium, tube, existing aura and TELEPORT sign. Portal art remains unchanged.
 const energy=scene.add.graphics().setDepth(2.25);
 // Neon aura tracks the teleporter's revised position and visual scale.
 const teleporter=items.find(item=>item.name==='teleport');
 const portalScale=teleporter.w/160;
 const portalCX=teleporter.x+80*portalScale;
 const portalAuraY=teleporter.y+141*portalScale;
 const portalParticleY=teleporter.y+104*portalScale;
 const portalMotion={phase:0};
 const paintPortal=()=>{
  energy.clear();
  const t=portalMotion.phase*Math.PI*2;
  energy.lineStyle(1.5,0xc3ffff,.30+.2*Math.sin(t));
  energy.strokeEllipse(portalCX,portalAuraY,73*portalScale+4*Math.sin(t),16*portalScale+2*Math.sin(t));
  for(let n=0;n<8;n++){
   const angle=t+n*.85,rad=25+6*Math.sin(t*2+n);
   energy.fillStyle(n%3===0?0xffffff:0x8eefff,.40+.25*Math.sin(t+n)**2);
   energy.fillCircle(portalCX+Math.cos(angle)*rad*portalScale,
    portalParticleY+Math.sin(angle)*53*portalScale,n%2?1.4:2.1);
  }
 };
 paintPortal();
 scene.tweens.add({targets:portalMotion,phase:1,duration:2800,repeat:-1,
  ease:'Linear',onUpdate:paintPortal});
 // Align animated graphics to the computer's actual position so future
 // movement of this prop always carries the animated monitor display.
 const computer=items.find(item=>item.name==='computer');
 const monitorOffsetX=computer.x-710;
 const monitorOffsetY=computer.y-145;
 const screen=scene.add.graphics().setDepth(2.3),ui={phase:0};
 const paintScreen=()=>{
  screen.clear();
  const t=ui.phase*Math.PI*2;
  for(let k=0;k<8;k++){
   const x=799+monitorOffsetX+k*6,amp=Math.sin(t+k*.84);
   rect(screen,x,167+monitorOffsetY+Math.round(amp*4),3,6+(k%3)*2,k%2?C.ice:C.cyan,.42);
  }
  rect(screen,790+monitorOffsetX,182+monitorOffsetY+Math.round(ui.phase*10),51,1,C.ice,.48);
  for(let k=0;k<4;k++){
   rect(screen,733+monitorOffsetX+k*4,197+monitorOffsetY+Math.round(Math.sin(t+k)*2),2,7,C.cyan,.48);
  }
 };
 paintScreen();
 scene.tweens.add({targets:ui,phase:1,duration:2150,repeat:-1,
  ease:'Linear',onUpdate:paintScreen});
 // Keep the machine solid at its rear and on both sides, but leave its
 // FRONT-CENTER STAIRS walkable. Previously a single 170x115 block made
 // Baio's feet collide with the very stairs needed for interaction.
 scene.homeFurniture=[
  {x:48,y:110,w:170,h:65}, // rear teleporter body; no clipping into the energy tube
  {x:48,y:178,w:53,h:47},  // left podium / stair railing
  {x:165,y:178,w:53,h:47}, // right podium / stair railing
  // Tight footprint for the chemical fridge + glassware wall (art at
  // x39..391, y256..448). The image itself has transparent edge padding.
  // Account for the player collision margin (+/-10x, +/-9y) so the top
  // effective edge starts at y256 and right edge at x379, removing the
  // invisible upper/right barrier without letting Baio clip through.
  // The bottom effective edge stays y457, preserving the lower passage.
  {x:29,y:265,w:340,h:183}, // fridge and chemical-shelf collision
  // The freestanding DNA research digital board occupies x250..416 and its
  // visible stand ends around y214. Keep the player OUT of its screen and
  // frame, but preserve the narrow y224..246 passage to the teleport stairs.
  // The game already adds 10px horizontal / 9px vertical collision margins.
  {x:250,y:30,w:166,h:184}, // DNA digital research board + stand
  {x:445,y:147,w:236,h:67}, // DNA machine, separate from digital board
  {x:711,y:199,w:203,h:48}, // computer collider follows 5px left movement
  // Match the enlarged table's body, top apron and raised legs.
  // The rightmost edge stays within the Lab and the lower path stays open.
  // Dr. Nira's patrol is left untouched; approach her from the free left aisle.
  {x:580,y:322,w:311,h:79} // research workbench, moved up 20px
 ];
 scene.zones=[
  {x:480,y:450,r:37,label:'Return to Baio District',to:'district'},
  // Stair interaction runs from the upper steps to their bottom landing.
  // The player's position represents their FEET: when climbing, those feet
  // move above the old 208px cutoff. Keep X tightly within the center stairs,
  // never to the machine's left or right side.
  // Teleport at y=25: interact at feet y=184..252 (not just 208..252).
  {x:portalCX,y:teleporter.y+193,w:60,h:68,
   id:'lab-teleport-stairs',label:'Teleport to Workshop',to:'workshop'},
  {x:753,y:268,r:68,label:'Explore Experience at Computer',object:'lab'},
  {x:563,y:231,r:60,label:'Inspect DNA Research',object:'lab-samples'}
 ];
 // Dr. Nira uses the same HD 136x184, 32-frame layout as the District NPCs.
 // All views now have identical visible heights and aligned feet, including
 // the left/right walking frames. Full-detail RGBA replaces 32-color art.
 // Rows DOWN/UP/LEFT/RIGHT, with 4 idle and 4 walking frames per row.
 const niraKey='npc-dr-nira-v1583-hd';
 const npcTexture=scene.textures.exists(niraKey)?niraKey:'npc-nadia';
 const shadow=scene.add.graphics();
 shadow.fillStyle(0x0c2730,.24);shadow.fillEllipse(0,3,29,8);
 const avatar=scene.add.sprite(0,0,npcTexture,0)
  .setOrigin(.5,175/184).setScale(.56);
 // Wide, collision-safe patrol across the Lab's actual walkable aisles.
 // Upper corridor skirts the DNA machine; the vertical path follows the gap
 // between chemical storage and the workbench; the southern path runs below
 // the long table. No NPC collision or teleport rules are changed.
 const patrol=[
  [680,241], // north-east endpoint: by DNA and computer
  [470,241], // northern-left corner, outside digital-board collision
  [470,287], // turn into central aisle
  [470,438], // southern-left corner, beyond chemical storage
  [520,438], // south aisle
  [858,438]  // south-east endpoint, below research bench
 ];
 const pauseCorners=new Set([0,1,3,5]);
 // Each entry starts from a different point ON the unchanged patrol path.
 // Phaser's shared registry survives scene.restart, so consecutive Lab visits
 // never choose the same segment. Direction, frame phase, and position vary.
 const segmentCount=patrol.length-1;
 const lastSegment=scene.game.registry.get('labNiraLastEntrySegment');
 const choices=Array.from({length:segmentCount},(_,i)=>i)
  .filter(i=>i!==lastSegment);
 const segment=choices[Math.floor(Math.random()*choices.length)];
 scene.game.registry.set('labNiraLastEntrySegment',segment);
 const progress=.15+Math.random()*.70;
 const startX=patrol[segment][0]+
  (patrol[segment+1][0]-patrol[segment][0])*progress;
 const startY=patrol[segment][1]+
  (patrol[segment+1][1]-patrol[segment][1])*progress;
 const startDirection=Math.random()<.5?1:-1;
 const startWaypoint=startDirection>0?segment+1:segment;
 const startDx=patrol[startWaypoint][0]-startX;
 const startDy=patrol[startWaypoint][1]-startY;
 const startFacing=Math.abs(startDx)>Math.abs(startDy)
  ?(startDx<0?'left':'right'):(startDy<0?'up':'down');
 const actorContainer=scene.add.container(startX,startY,[shadow,avatar])
  .setDepth(4.25);
 const actor={name:'Dr. Nira',appearance:'dr-nira',
  pages:[
   'Welcome to Laboratory! I’m Nira. We study ideas, test hypotheses, and explore how things work.',
   'Look at the DNA machine, digital research board and chemical refrigerators. The computer opens Baio’s professional experience.',
   'The glowing TELEPORT platform with stairs connects this Lab to the Workshop.'
  ],
  sprite:actorContainer,avatar,portraitTexture:npcTexture,
  waypoint:startWaypoint,routeDirection:startDirection,waitMs:0,
  clock:Math.floor(Math.random()*660),facing:startFacing};
 actor.update=delta=>{
  const dt=Math.min(delta,50);
  const rows={down:0,up:1,left:2,right:3};
  // A conversation or open journal pauses both walking and the idle timer.
  if(scene.dialogNpc||scene.journalOpen||scene.readerObject){
   avatar.setFrame(rows[actor.facing]*8);return;
  }
  if(actor.waitMs>0){
   actor.waitMs=Math.max(0,actor.waitMs-dt);
   avatar.setFrame(rows[actor.facing]*8);
   return;
  }
  const goal=patrol[actor.waypoint];
  const dx=goal[0]-actorContainer.x,dy=goal[1]-actorContainer.y;
  const dist=Math.hypot(dx,dy),step=Math.min(dist,dt*.047);
  if(dist<=step+.01){
   actorContainer.setPosition(goal[0],goal[1]);
   // Stop for 3 seconds at outer ends and major corners; reverse at ends.
   if(pauseCorners.has(actor.waypoint))actor.waitMs=3000;
   if(actor.waypoint===0||actor.waypoint===patrol.length-1){
    actor.routeDirection*=-1;
   }
   actor.waypoint+=actor.routeDirection;
   avatar.setFrame(rows[actor.facing]*8);
   return;
  }
  actorContainer.x+=dx/dist*step;
  actorContainer.y+=dy/dist*step;
  actor.facing=Math.abs(dx)>Math.abs(dy)
   ?(dx<0?'left':'right'):(dy<0?'up':'down');
  actor.clock+=dt;
  avatar.setFrame(rows[actor.facing]*8+4+(Math.floor(actor.clock/165)%4));
 };
 scene.roomGuard=actor;
 return true;
}