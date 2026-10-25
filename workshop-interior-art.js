/* BAIO DISTRICT 2077 — Workshop HD interior v16.02.
 * Six transparent neon-orange Workshop props, with individually tuned scale.
 * Collision shapes and teleport interactions follow the enlarged artwork.
 */
function renderHDWorkshopInterior(scene){
 const C={orange:0xff962d,amber:0xffc16d,ice:0xa3ecf2};
 const shell=scene.add.graphics().setDepth(0);
 const detail=scene.add.graphics().setDepth(1);
 const rect=(g,x,y,w,h,c,a=1)=>{g.fillStyle(c,a);g.fillRect(x,y,w,h)};
 // Match the Lab room footprint, with a warm graphite/steel Workshop theme.
 rect(shell,0,0,960,540,0x06131f);
 rect(shell,23,19,914,488,0x142331);
 rect(shell,29,26,902,476,0x343c4d);
 rect(shell,42,38,876,449,0xaaa19d);
 rect(shell,43,38,874,113,0x292e3b);
 rect(shell,43,151,874,332,0x948b88);
 for(let y=151,row=0;y<483;y+=27,row++){
  rect(shell,43,y,875,2,0x655d62,.56);
  rect(shell,43,y+3,875,2,0xf9c59a,.15);
  for(let x=54+(row%2)*52;x<914;x+=107){
   rect(shell,x,y+6,2,19,0x746e6d,.30);
   rect(shell,x+10,y+19,41,1,0xffefe1,.15);
  }
 }
 for(let x=58;x<903;x+=94){
  rect(shell,x,47,3,93,0x67595a);
  rect(shell,x+7,49,2,87,0xffa954,.13);
 }
 for(const [x,y,w] of [[69,61,115],[325,63,118],[602,59,79],[785,62,101]]){
  rect(detail,x-5,y-5,w+10,9,0xff971e,.09);
  rect(detail,x,y,w,3,0xffa344,.88);
  rect(detail,x+5,y+4,w-10,1,0xffead0,.32);
 }
 rect(shell,27,38,15,449,0x1d2938);
 rect(shell,918,38,13,449,0x1d2938);
 rect(shell,27,483,905,22,0x182939);
 rect(shell,42,487,875,10,0x45505d);
 for(const x of [58,860]){
  rect(detail,x,489,50,3,0xff9e36,.18);
  rect(detail,x+9,489,35,2,0xffb967,.91);
 }
 // Same visible EXIT mat as Lab/Home, with orange accents.
 const mat=scene.add.graphics().setDepth(1.2);
 mat.fillStyle(0x0c202e,.32);mat.fillRoundedRect(431,449,98,28,3);
 mat.fillStyle(0x514943,.97);mat.fillRoundedRect(432,444,96,29,3);
 mat.fillStyle(0x24303b,.99);mat.fillRoundedRect(436,448,88,21,2);
 mat.lineStyle(1,0xffb068,.68);mat.strokeRoundedRect(434,446,92,25,2);
 scene.add.text(480,452,'EXIT',{
  fontFamily:'monospace',fontSize:'12px',fontStyle:'bold',
  color:'#fff0d9',stroke:'#111e2c',strokeThickness:1
 }).setOrigin(.5,0).setDepth(1.3);

 // Workshop-specific display sizes. Preserve each HD image's proportions;
 // the tool wall has a transparent top margin that is NOT solid collision.
 // Keep the prototype bench inside the room and clear of Pak Damar's patrol.
 const items=[
  {name:'teleport',asset:'workshop-teleport',labKey:'lab-v1549-teleport',x:40,y:5,w:196,h:221,depth:2.15},
  {name:'dna-research-board',asset:'flying-car-blueprint',labKey:'lab-v1561-dna-research-board',x:235,y:3,w:166,depth:2.06},
  {name:'dna-machine',asset:'three-d-printer',labKey:'lab-v1549-dna-machine',x:403,y:0,w:260,h:216,depth:2.1},
  {name:'computer',asset:'workshop-computer',labKey:'lab-v1549-computer',x:664,y:29,w:260,h:196,depth:2.1},
  {name:'chemical-storage-wall',asset:'tools-storage-wall',labKey:'lab-v1566-chemical-storage-wall',x:45,y:224,w:383,h:205,depth:2.6},
  {name:'research-workbench-long',asset:'prototype-bench',labKey:'lab-v1584-research-workbench-long',x:545,y:219,w:371,h:209,depth:2.62}
 ];
 scene.workshopAssetLayout=items;
 for(const item of items){
  const key='workshop-v1592-'+item.asset;
  if(!scene.textures.exists(key)){
   console.warn('Workshop HD asset missing:',key);continue;
  }
  const source=scene.textures.get(item.labKey).getSourceImage();
  const h=item.h||item.w*source.height/source.width;
  scene.add.image(item.x,item.y,key).setOrigin(0,0)
   .setDisplaySize(item.w,h).setDepth(item.depth);
 }

 // Same non-text interaction beacons and animation timing as Home and Lab.
 const interactionBeacon=(x,y,tint)=>{
  const marker=scene.add.graphics().setDepth(4.8),pulse={p:0};
  const paint=()=>{
   const wave=pulse.p,yy=y-3*Math.sin(wave*Math.PI);
   marker.clear();
   marker.fillStyle(tint,.07+.09*wave);marker.fillCircle(x,yy,14+2*wave);
   marker.lineStyle(2,tint,.60+.30*wave);marker.strokeCircle(x,yy,9+2*wave);
   marker.fillStyle(0x152b3a,.95);marker.fillCircle(x,yy,7);
   marker.fillStyle(tint,.95);marker.fillCircle(x,yy,4);
   marker.fillStyle(0xf1ffff,.88);marker.fillRect(x-1,yy-2,2,3);
   marker.fillStyle(tint,.85);
   marker.fillTriangle(x-4,yy-15,x+4,yy-15,x,yy-11);
  };
  paint();
  scene.tweens.add({targets:pulse,p:1,duration:1050,yoyo:true,
   repeat:-1,ease:'Sine.easeInOut',onUpdate:paint});
 };
 const teleporter=items[0],printer=items[2],computer=items[3];
 interactionBeacon(teleporter.x+teleporter.w/2,teleporter.y+Math.round(teleporter.h*.89),0xa5f27a);
 interactionBeacon(computer.x+computer.w/2,computer.y+Math.round(computer.h*.66),0x76e4ee);

 // Orange energy shimmer and rising particles stay inside the teleport.
 const energy=scene.add.graphics().setDepth(2.25);
 const portalScale=teleporter.w/160,portalCX=teleporter.x+80*portalScale;
 const portalAuraY=teleporter.y+141*portalScale;
 const portalParticleY=teleporter.y+104*portalScale;
 const portalMotion={phase:0};
 const paintPortal=()=>{
  energy.clear();const t=portalMotion.phase*Math.PI*2;
  energy.lineStyle(1.5,0xffd19a,.32+.2*Math.sin(t));
  energy.strokeEllipse(portalCX,portalAuraY,73*portalScale+4*Math.sin(t),
   16*portalScale+2*Math.sin(t));
  for(let n=0;n<8;n++){
   const angle=t+n*.85,rad=25+6*Math.sin(t*2+n);
   energy.fillStyle(n%3===0?0xffffff:0xffb249,.45+.24*Math.sin(t+n)**2);
   energy.fillCircle(portalCX+Math.cos(angle)*rad*portalScale,
    portalParticleY+Math.sin(angle)*53*portalScale,n%2?1.4:2.1);
  }
 };
 paintPortal();
 scene.tweens.add({targets:portalMotion,phase:1,duration:2800,repeat:-1,
  ease:'Linear',onUpdate:paintPortal});
 // Small workshop-machine indicator lights, without drawing over the asset.
 const status=scene.add.graphics().setDepth(2.31),progress={p:0};
 const paintStatus=()=>{
  status.clear();const t=progress.p*Math.PI*2;
  for(let k=0;k<6;k++){
   rect(status,printer.x+printer.w*.69+k*4,printer.y+printer.h*.72+
    Math.round(Math.sin(t+k)*2),2,4+k%3,0xffbe68,.24);
  }
 };
 paintStatus();
 scene.tweens.add({targets:progress,p:1,duration:2350,repeat:-1,
  ease:'Linear',onUpdate:paintStatus});

 // Enlarged-asset colliders. Keep the FRONT-CENTER teleport stairs open,
 // leave a passage below the digital board and above the tool wall, and
 // preserve a southern aisle under the prototype bench.
 scene.homeFurniture=[
  {x:45,y:105,w:188,h:67}, // teleport body follows 5px right shift
  {x:47,y:176,w:52,h:45},  // left stair rail (not center steps)
  {x:179,y:176,w:53,h:45}, // right stair rail (not center steps)
  {x:45,y:247,w:373,h:177}, // tool wall 10px up; visible top starts at effective y238
  {x:235,y:30,w:166,h:184}, // blueprint 5px right
  {x:405,y:145,w:250,h:70}, // printer another 5px right
  {x:669,y:174,w:250,h:61}, // computer moved 3px up, collider covers desk
  {x:559,y:293,w:343,h:137} // bench 5px up; south aisle and Pak Damar patrol remain clear
 ];
 scene.zones=[
  {x:480,y:450,r:37,label:'Return to Baio District',to:'district'},
  // The old interaction started at foot Y=185 and vanished on upper stairs.
  // Keep the lower landing (Y=255) but extend the same 64px-wide center
  // strip up to Y=155. Side rails remain non-interactive.
  {x:portalCX,y:teleporter.y+200,w:64,h:100,
   id:'workshop-teleport-stairs',label:'Teleport to Laboratory',to:'lab'},
  {x:747,y:268,r:68,label:'View Project Showcase at Computer',object:'workshop'}
 ];

 // Workshop engineer: same existing NPC identity, conversations, and walking
 // frames; patrol positioned in the newly available central aisle.
 // Pak Damar now has his own full-detail brown technician sprite sheet.
 // Same 8x4 rows and 136x184 frames as Dr. Nira, without runtime recoloring.
 const damarKey='npc-pak-damar-v1602-hd';
 const npcTexture=scene.textures.exists(damarKey)?damarKey:'npc-dimas';
 const shadow=scene.add.graphics();
 shadow.fillStyle(0x071c2b,.25);shadow.fillEllipse(0,3,28,8);
 const avatar=scene.add.sprite(0,0,npcTexture,0)
  .setOrigin(.5,175/184).setScale(.56);
 const patrol=[[515,375],[544,387],[543,427],[504,426]];
 const container=scene.add.container(patrol[0][0],patrol[0][1],[shadow,avatar])
  .setDepth(4.25);
 const actor={name:'Pak Damar',appearance:'dimas',
  pages:[
   'Welcome to the Workshop! I am Damar, the engineer looking after the project bay.',
   'Here we take ideas from sketches to prototypes. Explore the project machine or read Baio’s work on the computer.',
   'Need the science lab? Our portal upstairs links this workshop straight to the Laboratory.'
  ],sprite:container,avatar,portraitTexture:npcTexture,stepIndex:1,stepTimer:0};
 actor.update=delta=>{
  if(scene.dialogNpc||scene.journalOpen||scene.readerObject){avatar.setFrame(0);return}
  const end=patrol[actor.stepIndex],dx=end[0]-container.x,dy=end[1]-container.y;
  const distance=Math.hypot(dx,dy);
  if(distance<2.5){actor.stepIndex=(actor.stepIndex+1)%patrol.length;return}
  const speed=Math.min(distance,.034*Math.min(delta,50));
  container.x+=dx/distance*speed;container.y+=dy/distance*speed;
  const dir=Math.abs(dx)>Math.abs(dy)?(dx<0?'left':'right'):(dy<0?'up':'down');
  const row={down:0,up:1,left:2,right:3}[dir];
  actor.stepTimer+=Math.min(delta,50);
  avatar.setFrame(row*8+4+(Math.floor(actor.stepTimer/165)%4));
 };
 scene.roomGuard=actor;
 return true;
}