/* BAIO DISTRICT 2077 — Laboratory HD interior v15.75.
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
 // Exit is a physical doormat as in HOME, not explanatory wall text.
 const mat=scene.add.graphics().setDepth(1.2);
 mat.fillStyle(0x0c202e,.32);mat.fillRoundedRect(431,449,98,28,3);
 mat.fillStyle(0x384d55,.97);mat.fillRoundedRect(432,444,96,29,3);
 mat.fillStyle(0x172d3b,.99);mat.fillRoundedRect(436,448,88,21,2);
 mat.lineStyle(1,0x85bfc0,.7);mat.strokeRoundedRect(434,446,92,25,2);
 scene.add.text(480,452,'EXIT',{
  fontFamily:'monospace',fontSize:'12px',fontStyle:'bold',color:'#ebffff',
  stroke:'#112938',strokeThickness:1
 }).setOrigin(.5,0).setDepth(1.3);
 // Each image is a real PNG-origin transparent HD art asset, optimized as WebP.
 // Position and display size are isolated in this table for future fine tuning.
 // Chemical refrigerator and shelving stay 352x192 at X=39.
 // Lowered 25px from Y=231 back to Y=256, restoring the path into
 // the teleport front stairs while keeping the bottom path walkable.
 // Existing DNA, board, computer, teleport and both right benches stay put.
 const items=[
  {name:'teleport',x:45,y:25,w:177,depth:2.15},
  {name:'dna-research-board',x:250,y:3,w:166,depth:2.06},
  {name:'dna-machine',x:441,y:10,w:244,depth:2.1},
  {name:'computer',x:705,y:95,w:213,depth:2.1},
  {name:'chemical-storage-wall',x:39,y:256,w:352,h:192,depth:2.6}, // matches HOME kitchen
  {name:'chemical-bench',x:687,y:239,w:215,depth:2.23}, // upper bench
  {name:'chemical-bench',x:687,y:358,w:215,depth:2.24}  // lower bench
 ];
 scene.labAssetLayout=items;
 for(const item of items){
  const key=item.name==='dna-research-board'
   ?'lab-v1561-dna-research-board':item.name==='chemical-storage-wall'
   ?'lab-v1566-chemical-storage-wall':'lab-v1549-'+item.name;
  if(!scene.textures.exists(key)){
   console.warn('Lab HD asset missing:',key);
   continue;
  }
  const texture=scene.textures.get(key).getSourceImage();
  const h=item.h||item.w*texture.height/texture.width;
  scene.add.image(item.x,item.y,key).setOrigin(0,0)
   .setDisplaySize(item.w,h).setDepth(item.depth);
 }
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
  // Keep the chemical wall solid, but leave a clear passage at y235..247
  // between its top collision edge and the teleport's right stair railing.
  // The collider follows the lowered asset and does not extend to the
  // bottom of the room, so Baio can still pass below the wall at y457..466.
  {x:10,y:256,w:405,h:192}, // chemical wall / fridge / shelving
  {x:445,y:147,w:236,h:67}, // DNA collision follows another 10px left
  {x:711,y:199,w:203,h:48}, // computer collider follows 5px left movement
  {x:689,y:305,w:211,h:50}, // upper right chemistry bench
  {x:689,y:424,w:211,h:50}  // lower right chemistry bench
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
  {x:563,y:231,r:60,label:'Inspect DNA Research',object:'lab-samples'},
  {x:650,y:389,r:60,label:'Inspect Chemical Samples',object:'lab-samples'}
 ];
 // The same approved 32-frame walking scientist used in v15.48.
 // Preserve the lab-uniform recolor when available, otherwise derive it.
 const native='npc-nadia',uniform='npc-nadia-interior-lab-v1548';
 if(!scene.textures.exists(uniform)){
  try{
   const source=scene.textures.get(native).getSourceImage();
   const canvas=document.createElement('canvas');
   canvas.width=source.width;canvas.height=source.height;
   const ctx=canvas.getContext('2d',{willReadFrequently:true});
   ctx.drawImage(source,0,0);
   const frame=ctx.getImageData(0,0,canvas.width,canvas.height),arr=frame.data;
   for(let y=0;y<canvas.height;y++){
    const fy=y%184;
    if(fy<84||fy>125)continue;
    for(let x=0;x<canvas.width;x++){
     const fx=x%136;
     if(fx<38||fx>99)continue;
     const p=(y*canvas.width+x)*4;
     if(arr[p+3]<90)continue;
     const r=arr[p],g=arr[p+1],b=arr[p+2],v=(r+g+b)/3;
     if(v<28||v>245||(r>g*1.11&&g>b*1.06&&r>82))continue;
     const l=Math.max(.46,Math.min(1.25,v/125));
     arr[p]=Math.round(98*l);arr[p+1]=Math.round(222*l);
     arr[p+2]=Math.round(216*l);
    }
   }
   ctx.putImageData(frame,0,0);
   scene.textures.addSpriteSheet(uniform,canvas,{frameWidth:136,frameHeight:184,
    margin:0,spacing:0});
  }catch(error){console.warn('Lab staff uniform unavailable',error)}
 }
 const npcTexture=scene.textures.exists(uniform)?uniform:native;
 const shadow=scene.add.graphics();
 shadow.fillStyle(0x0c2730,.24);shadow.fillEllipse(0,3,29,8);
 const avatar=scene.add.sprite(0,0,npcTexture,0)
  .setOrigin(.5,175/184).setScale(.56);
 const patrol=[[554,377],[573,384],[578,414],[547,416]];
 const actorContainer=scene.add.container(patrol[0][0],patrol[0][1],[shadow,avatar])
  .setDepth(4.25);
 const actor={name:'Dr. Nira',appearance:'nadia',
  pages:[
   'Welcome to Laboratory! I’m Nira. We study ideas, test hypotheses, and explore how things work.',
   'Look at the DNA machine, chemical refrigerators and experimental tables. The computer opens Baio’s professional experience.',
   'The glowing TELEPORT platform with stairs connects this Lab to the Workshop.'
  ],
  sprite:actorContainer,avatar,portraitTexture:npcTexture,waypoint:1,clock:0};
 actor.update=delta=>{
  if(scene.dialogNpc||scene.journalOpen||scene.readerObject){avatar.setFrame(0);return}
  const goal=patrol[actor.waypoint],dx=goal[0]-actorContainer.x,
   dy=goal[1]-actorContainer.y,dist=Math.hypot(dx,dy);
  if(dist<2.5){actor.waypoint=(actor.waypoint+1)%patrol.length;return}
  const step=Math.min(dist,Math.min(delta,50)*.033);
  actorContainer.x+=dx/dist*step;actorContainer.y+=dy/dist*step;
  const direction=Math.abs(dx)>Math.abs(dy)?(dx<0?'left':'right'):(dy<0?'up':'down');
  const row={down:0,up:1,left:2,right:3}[direction];
  actor.clock+=Math.min(delta,50);
  avatar.setFrame(row*8+4+(Math.floor(actor.clock/165)%4));
 };
 scene.roomGuard=actor;
 return true;
}