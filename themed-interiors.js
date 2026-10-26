/*
 * BAIO DISTRICT 2077 — themed interiors / Workshop, Laboratory, Contact Hub.
 * Purpose-built fabrication machines, research equipment and communications
 * hardware. HOME-style computer sprites remain; no dining or kitchens.
 */
function renderThemedInterior(scene,place){
 // Workshop never renders obsolete procedural assets on a failed HD load.
 if(place==='workshop'){
  if(typeof renderHDWorkshopInterior==='function'&&
     renderHDWorkshopInterior.buildVersion==='16.06')
   return renderHDWorkshopInterior(scene);
  console.error('Workshop HD renderer unavailable; legacy Workshop disabled');
  return false;
 }
 const settings={
  workshop:{
   title:'WORKSHOP',subtitle:'PROJECT FABRICATION BAY',
   accent:0xe5a16f,bright:0xffe0b1,mid:0x986d52,soft:0x7f6660,dark:0x372b36,
   floor:0x9f887b,floorLight:0xc5aa98,wall:0x343a46,wallLight:0x4b5261,
   guard:{name:'Pak Damar',appearance:'dimas',x:387,y:332,
    pages:[
     'Welcome to the Workshop! I am Damar, the engineer looking after the project bay.',
     'Here we take ideas from sketches to prototypes. Explore the project machine or read Baio’s work on the computer.',
     'Need the science lab? Our portal upstairs links this workshop straight to the Laboratory.'
    ]}
  },
  lab:{
   title:'LABORATORY',subtitle:'HUMAN-CENTERED RESEARCH',
   accent:0x62ded8,bright:0xd7fff6,mid:0x467f87,soft:0x7297a0,dark:0x203c4d,
   floor:0x93b5b4,floorLight:0xe2eee7,wall:0x294651,wallLight:0x557782,
   guard:{name:'Dr. Nira',appearance:'nadia',x:387,y:332,
    pages:[
     'Hello! I am Nira, the researcher on duty in Baio’s Laboratory.',
     'Our research benches explore testing, learning, and refining digital experiences. Try the sample station, too.',
     'The career terminal documents Baio’s experience. The illuminated portal connects to the Workshop.'
    ]}
  },
  hub:{
   title:'CONTACT HUB',subtitle:'CITY POST & COMMUNICATION',
   accent:0xb4a9f4,bright:0xf1e6ff,mid:0x6d6b96,soft:0x9790b4,dark:0x37334f,
   floor:0xb1a8c0,floorLight:0xe6e0ee,wall:0x403955,wallLight:0x625a82,
   guard:{name:'Mira',appearance:'tara',x:385,y:332,
    pages:[
     'Welcome to the Contact Hub! I’m Mira, your friendly postal and reception officer.',
     'We sort messages and invitations here. Visit the reception counter to learn how to contact Baio.',
     'Our message counter is always ready for the next creative collaboration.'
    ]}
  }
 };
 const p=settings[place];
 if(!p)return false;
 // Native pixel graphics: distinct depth groups keep architecture behind objects.
 const shell=scene.add.graphics().setDepth(0);
 const furniture=scene.add.graphics().setDepth(2.25);
 const details=scene.add.graphics().setDepth(2.6);
 const fill=(layer,x,y,w,h,color,alpha=1)=>{
  layer.fillStyle(color,alpha);layer.fillRect(x,y,w,h);
 };
 const line=(layer,x,y,x2,y2,color,width=2,alpha=1)=>{
  layer.lineStyle(width,color,alpha);layer.lineBetween(x,y,x2,y2);
 };
 const panel=(x,y,w,h,face=p.soft)=>{
  fill(furniture,x+5,y+7,w,h,0x081521,.21);
  fill(furniture,x,y,w,h,0x1a2937);
  fill(furniture,x+3,y+3,w-6,h-10,face);
  fill(furniture,x+4,y+4,w-8,4,p.bright,.36);
  fill(furniture,x+3,y+h-9,w-6,5,p.dark,.77);
  fill(furniture,x+w-8,y+9,4,h-18,p.dark,.63);
 };
 const led=(x,y,c=p.accent)=>{
  fill(details,x-3,y-3,10,10,c,.14);
  fill(details,x-1,y-1,6,6,c,.38);
  fill(details,x+1,y+1,2,2,p.bright);
 };
 const metal=(x,y,w,h)=>{
  fill(furniture,x+4,y+6,w,h,0x071521,.22);
  fill(furniture,x,y,w,h,0x243746);
  fill(furniture,x+4,y+3,w-8,h-8,0x536977);
  fill(furniture,x+4,y+3,w-8,5,p.bright,.45);
  fill(furniture,x+4,y+h-8,w-8,5,p.mid,.77);
 };
 // Room shell: the same cutaway rectangular architecture as HOME.
 fill(shell,0,0,960,540,0x07131f);
 fill(shell,23,20,914,489,0x0f2433);
 fill(shell,32,29,896,471,0x2b4252);
 fill(shell,43,39,875,455,p.floor);
 fill(shell,43,39,875,111,p.wall);
 for(let x=55;x<906;x+=88){
  fill(shell,x,48,2,87,p.wallLight,.75);
  fill(shell,x+6,49,2,82,p.bright,.10);
 }
 fill(shell,43,142,875,7,0x132b3a);
 fill(shell,44,149,874,337,p.floor);
 // Spacious alloy/wood floor panels with subtle polished highlights.
 for(let row=0,y=149;y<485;y+=23,row++){
  fill(shell,44,y,874,2,p.mid,.39);
  fill(shell,44,y+3,874,1,p.floorLight,.34);
  for(let x=54+(row%3)*38;x<908;x+=142){
   fill(shell,x,y+5,2,16,p.mid,.22);
   fill(shell,x+10,y+18,48,1,0xffffff,.08);
  }
 }
 fill(shell,28,39,15,455,0x132638);
 fill(shell,918,39,14,455,0x132638);
 fill(shell,26,483,907,26,0x142a3c);
 fill(shell,43,488,875,9,0x375264);
 // Lit girders and consistent futuristic accent strips.
 for(const [x,y,w,h] of [[63,62,136,4],[747,61,145,4],[48,180,3,72],[910,180,3,72],[66,489,60,3],[839,489,60,3]]){
  fill(details,x-4,y-3,w+8,h+6,p.accent,.10);
  fill(details,x-2,y-1,w+4,h+2,p.accent,.24);
  fill(details,x,y,w,h,p.accent,.87);
 }
 // The Contact Hub gets a continuous HD locker wall instead of this monitor.
 if(place!=='hub'){
 // Unlabeled glowing telemetry and waveform display.
 panel(355,65,250,65,p.dark);
 fill(details,365,74,230,3,p.accent,.68);
 for(let k=0;k<19;k++){
  const ht=7+Math.round((.5+.5*Math.sin(k*1.3))*26);
  fill(details,377+k*11,113-ht,6,ht,p.accent,.39+.14*(k%3));
 }
 for(let k=0;k<4;k++)led(401+k*53,117,p.bright);
 for(let x=91;x<=246;x+=31){
  fill(details,x,99,19,23,0x162b3b);
  fill(details,x+3,104,13,4,p.accent,.75);
  fill(details,x+3,112,9+(x%3),2,p.bright,.65);
 }
 for(let x=694;x<869;x+=33){
  fill(details,x,105,23,19,0x193445);
  fill(details,x+3,109,17,3,p.accent,.62);
  fill(details,x+3,116,11,2,0xe1f5e8,.54);
 }
 }
 // HOME-style woven EXIT doormat, without a floating explanation.
 const mat=scene.add.graphics().setDepth(1.15);
 mat.fillStyle(0x101b25,.25);mat.fillRoundedRect(433,450,96,26,3);
 mat.fillStyle(0x34434b,.96);mat.fillRoundedRect(433,445,94,27,3);
 mat.fillStyle(0x1a2934,.95);mat.fillRoundedRect(436,448,88,21,2);
 mat.lineStyle(1,0x71818a,.55);mat.strokeRoundedRect(434,446,92,25,3);
 for(let xx=440;xx<520;xx+=7){
  mat.fillStyle(0x72818a,.32);mat.fillRect(xx,450,3,1);
  mat.fillRect(xx,466,3,1);
 }
 scene.add.text(480,452,'EXIT',{
  fontFamily:'monospace',fontSize:'12px',fontStyle:'bold',
  color:'#d9e4e2',stroke:'#172630',strokeThickness:1
 }).setOrigin(.5,0).setDepth(1.2);
 scene.zones=[
  {x:480,y:450,r:48,label:'Return to Baio District',to:'district'}
 ];
 scene.homeFurniture=[];
 const collide=(x,y,w,h)=>scene.homeFurniture.push({x,y,w,h});
 // Reuse the approved high-quality HOME prop illustrations, matching their style.
 const mount=(id,x,y,w,h,tint)=>{
  const key='home-v13-'+id;
  if(!scene.textures.exists(key))return null;
  const sprite=scene.add.image(x,y,key).setOrigin(0,0).setDisplaySize(w,h).setDepth(2.1);
  if(tint!==undefined)sprite.setTint(tint);
  return sprite;
 };
 // Color-coded, textless animations drawn over HOME-style computer screens.
 const animateComputer=(x,y)=>{
  const gfx=scene.add.graphics().setDepth(2.44),pulse={value:0};
  const paint=()=>{
   const t=pulse.value;
   gfx.clear();
   fill(gfx,x,y,111,42,0x102737,.90);
   fill(gfx,x+3,y+3,105,36,0x244d5c,.87);
   for(let i=0;i<6;i++){
    const width=Math.round(90*(.29+.65*(.5+.5*Math.sin(t*Math.PI*2+i*1.15))));
    fill(gfx,x+7,y+6+i*5,width,2,i%2?p.bright:p.accent,.78);
   }
   fill(gfx,x+4,y+4+Math.round(t*32),103,2,p.bright,.82);
   fill(gfx,x+3,y+38,105,2,p.accent,.94);
  };
  paint();
  scene.tweens.add({targets:pulse,value:1,duration:2100,repeat:-1,ease:'Linear',onUpdate:paint});
 };
 if(place==='workshop'||place==='lab'){
  // Former pantry becomes a purpose-built industrial or scientific work bay.
  if(place==='workshop'){
   // Automated 3D printer and gantry fabricating a prototype.
   panel(71,352,250,88,0x68534b);
   metal(81,369,230,60);
   fill(details,99,362,193,7,0x182e3d);
   for(const xx of [130,253]){
    fill(details,xx,369,12,42,p.accent,.81);
    fill(details,xx+3,375,6,5,p.bright);
   }
   fill(details,127,389,146,10,0x152d40);
   for(let k=0;k<7;k++)fill(details,150+k*17,392,9,5,k%2?p.bright:p.accent,.86);
   fill(details,184,371,29,11,0x293d49);
   fill(details,194,382,8,26,p.bright);
   for(let xx=78;xx<315;xx+=46){
    fill(details,xx,441,38,16,0x243a48);
    fill(details,xx+3,443,31,5,p.accent,.7);
    fill(details,xx+15,451,7,2,p.bright);
   }
  }else{
   // Research sample analyzers and refrigerated microscopy pods.
   panel(71,352,252,90,0x63999b);
   metal(80,368,235,63);
   for(let xx=94;xx<311;xx+=43){
    fill(details,xx,378,31,42,0x244655);
    fill(details,xx+3,380,25,30,0x4c96a3);
    fill(details,xx+6,384,19,23,p.accent,.65);
    fill(details,xx+11,392,8,5,p.bright,.94);
    fill(details,xx+4,413,23,4,0xe7fff8,.41);
   }
   fill(details,164,357,63,12,0x193e4d);
   for(let k=0;k<4;k++)led(177+k*13,362);
  }
  collide(78,360,241,82);
  // A read-only workstation uses the same native HOME computer pixel art.
  mount('workstation',628,172,228,112,place==='workshop'?0xffe4cf:0xd1fffa);
  animateComputer(687,189);
  collide(633,193,220,61);
  // Dual-screen telemetry terminal and floor-level cable runs.
  fill(details,657,153,166,15,0x193342);
  fill(details,668,158,72,5,p.accent,.83);
  fill(details,747,158,64,5,p.bright,.58);
  scene.zones.push({
   x:737,y:304,r:70,
   label:place==='lab'?'Explore Experience at Computer':'View Project Showcase at Computer',
   object:place
  });
  // Advanced circular quantum teleport ring with an orbiting BLUE energy aura.
  const cx=480,cy=205,port=scene.add.graphics().setDepth(2.35);
  port.fillStyle(0x061524,.31);port.fillEllipse(cx,cy+54,145,27);
  port.fillStyle(0x152f45);port.fillCircle(cx,cy,55);
  port.lineStyle(10,0x203b54,.97);port.strokeCircle(cx,cy,51);
  port.lineStyle(6,0x418cba,.95);port.strokeCircle(cx,cy,44);
  port.lineStyle(2,0xa2faff,.80);port.strokeCircle(cx,cy,34);
  port.fillStyle(0x13517b,.77);port.fillCircle(cx,cy,31);
  port.fillStyle(0x2d9cc6,.36);port.fillCircle(cx,cy,25);
  for(let j=0;j<8;j++){
   const angle=j*Math.PI/4;
   port.fillStyle(j%2?0x70dffe:0xc5faff,.90);
   port.fillCircle(cx+Math.cos(angle)*48,cy+Math.sin(angle)*48,3);
  }
  const aura=scene.add.graphics().setDepth(2.47),rotation={phase:0};
  const paintPortal=()=>{
   aura.clear();
   const angle=rotation.phase*Math.PI*2;
   aura.lineStyle(15,0x40cbff,.09);
   aura.strokeCircle(cx,cy,50+2*Math.sin(angle));
   aura.lineStyle(5,0x77ecff,.39);
   aura.arc(cx,cy,43,angle,angle+Math.PI*.68,false);aura.strokePath();
   aura.lineStyle(3,0xc2ffff,.93);
   aura.arc(cx,cy,38,-angle,Math.PI*.4-angle,false);aura.strokePath();
   aura.lineStyle(3,0x48caff,.75);
   aura.strokeCircle(cx,cy,27+3*Math.sin(angle*2));
   for(let j=0;j<12;j++){
    const t=angle*(j%2?-1:1)+j*Math.PI/6;
    const radius=41+6*Math.sin(angle*3+j);
    aura.fillStyle(j%3===0?0xffffff:0x73dfff,.64+.3*(.5+.5*Math.sin(angle+j)));
    aura.fillCircle(cx+Math.cos(t)*radius,cy+Math.sin(t)*radius,j%3===0?3:2);
   }
  };
  paintPortal();
  scene.tweens.add({targets:rotation,phase:1,duration:3000,repeat:-1,ease:'Linear',onUpdate:paintPortal});
  scene.zones.push({x:480,y:287,r:59,
   label:place==='lab'?'Travel to Workshop':'Travel to Laboratory',
   to:place==='lab'?'workshop':'lab'});
  // Computer interface's interaction pulse.
  const beacon=scene.add.graphics().setDepth(4.7);
  beacon.fillStyle(p.accent,.25);beacon.fillCircle(737,298,15);
  beacon.lineStyle(2,p.bright,.86);beacon.strokeCircle(737,298,9);
  beacon.fillStyle(0xf4ffff);beacon.fillCircle(737,298,3);
  scene.tweens.add({targets:beacon,alpha:.44,duration:1100,yoyo:true,repeat:-1});
  if(place==='workshop'){
   // Industrial fabrication project: stacked equipment, parts, tooling,
   // robotic arm and a large prototype chassis under inspection.
   panel(72,168,281,134,0x6e5950);
   metal(85,194,258,86);
   for(let x=98;x<330;x+=30){
    fill(details,x,185,22,6,0x203443);
    fill(details,x+2,186,15,3,p.accent,.72);
   }
   // Four-slot mechanic pegboard with exposed hand tools.
   for(let x=105;x<320;x+=24){
    fill(details,x,167,15,3,0x1e3540);
    fill(details,x+4,171,5,15,p.bright,.58);
   }
   // Prototype mech engine in warm copper and dark graphite.
   fill(details,144,205,123,64,0x1b2d3b);
   fill(details,151,212,109,46,0x8f786d);
   fill(details,160,219,88,31,0x2d4651);
   fill(details,171,218,18,31,p.mid);
   fill(details,217,218,18,31,p.mid);
   for(let x=169;x<242;x+=14){
    fill(details,x,233,8,4,p.accent,.85);
    fill(details,x+3,227,2,2,p.bright);
   }
   fill(details,190,210,38,13,0x23313e);
   fill(details,195,214,28,5,0xf7dd9f);
   // Motor housings + clamps
   for(const x of [111,283]){
    fill(details,x,211,21,41,0x34424a);
    fill(details,x+4,217,13,12,p.accent,.8);
    fill(details,x+7,232,7,13,0x132a3b);
   }
   scene.zones.push({x:310,y:316,r:86,label:'Inspect Workshop Prototype',object:'workshop-engine'});
   collide(78,186,268,113);
   // Floor cables and parts crates along wall.
   for(let x=73;x<334;x+=72){
    fill(details,x,300,34,7,0x39414a);
    fill(details,x+3,301,27,3,p.accent,.49);
   }
  }else{
   // Laboratory: specimen pods, bio-scan bench, flasks, molecular display.
   panel(72,168,281,134,0x5d9094);
   metal(85,193,258,89);
   for(const x of [112,183,253]){
    fill(details,x-4,199,42,66,0x153745);
    fill(details,x,204,34,52,0x337c89);
    fill(details,x+4,210,26,44,0x8be4df,.63);
    fill(details,x+6,214,22,3,p.bright,.79);
    fill(details,x+7,248,20,3,p.mid,.67);
    fill(details,x+15,207,4,41,0xf8ffff,.18);
    for(let k=0;k<3;k++)fill(details,x+8+k*8,229+k%2*8,3,5,0xf4fbdf,.72);
   }
   fill(details,96,268,233,10,0x203c50);
   fill(details,116,272,193,2,p.accent,.86);
   for(const x of [145,212,282])led(x,260,p.bright);
   scene.zones.push({x:310,y:316,r:86,label:'Inspect Research Samples',object:'lab-samples'});
   collide(78,188,268,112);
  }
 }else{
  // CONTACT HUB v16.22: raise only the left bookshelf and right drawer rack by 50px.
  // Tall book/archive shelves stay on the upper wall, safely behind Baio.
  const placeHD=(asset,x,y,w,h,depth)=>{
   const key='hub-v1619-'+asset;
   if(!scene.textures.exists(key)){
    console.error('Contact Hub HD texture missing:',key);
    return null;
   }
   return scene.add.image(x,y,key).setOrigin(0,0)
    .setDisplaySize(w,h).setDepth(depth);
  };
  // Slightly larger HD shelves, separated by 10px horizontal gaps.
  placeHD('bookshelf',45,-2,200,193,2.3);
  placeHD('awards-bookshelf',255,43,450,154,2.3);
  placeHD('drawer-rack',715,-3,190,198,2.3);
  // Each counter panel is independently rendered at high resolution.
  // Widths: left 293 + reception 298 + right 293 = 884.
  // Shared y/height keeps the seams and the neon rails aligned.
  const counterY=214,counterHeight=112;
  placeHD('counter-left',38,counterY,293,counterHeight,4.85);
  placeHD('counter-center',331,counterY,298,counterHeight,4.85);
  placeHD('counter-right',629,counterY,293,counterHeight,4.85);
  // Wall shelves: block entry through their visible occupied footprints.
  collide(47,7,194,182);
  collide(257,48,446,146);
  collide(717,5,186,186);
  // Front counter is solid, except the employee entrance on the far-left
  // counter module. Collision is substepped even while Shift-sprinting.
  collide(39,227,35,92);
  collide(138,227,784,92);
  // Existing Contact Hub reader and District exit are still reachable.
  scene.zones[0].r=28;
  scene.zones.push({x:480,y:339,r:31,label:'View Contact Information',object:'hub'});
 }
 // Staff outfits are recolored INSIDE the original 32 walking sprite frames.
 // The former graphics 'uniform' was a separate static rectangle that looked
 // like NPCs were holding their own shirts. Do not use that overlay.
 const staff=p.guard,nativeKey='npc-'+staff.appearance;
 const costumeKey=nativeKey+'-interior-'+place+'-v1548';
 if(!scene.textures.exists(costumeKey)){
  try{
   const source=scene.textures.get(nativeKey).getSourceImage();
   const canvas=document.createElement('canvas');
   canvas.width=source.width;canvas.height=source.height;
   const ctx=canvas.getContext('2d',{willReadFrequently:true});
   ctx.drawImage(source,0,0);
   const image=ctx.getImageData(0,0,canvas.width,canvas.height);
   const bytes=image.data,target=p.accent;
   const tr=target>>16,tg=target>>8&255,tb=target&255;
   for(let yy=0;yy<canvas.height;yy++){
    const sy=yy%184;
    // Torsos only: keep face, arms, hair, trousers and boots intact.
    if(sy<84||sy>125)continue;
    for(let xx=0;xx<canvas.width;xx++){
     const sx=xx%136;
     if(sx<38||sx>99)continue;
     const index=(yy*canvas.width+xx)*4;
     if(bytes[index+3]<90)continue;
     const r=bytes[index],g=bytes[index+1],b=bytes[index+2];
     const value=(r+g+b)/3;
     if(value<28||value>245)continue;
     // Human skin tones should never be recolored.
     if(r>g*1.11&&g>b*1.06&&r>82)continue;
     const brightness=Math.max(.46,Math.min(1.25,value/125));
     bytes[index]=Math.min(255,Math.round(tr*brightness));
     bytes[index+1]=Math.min(255,Math.round(tg*brightness));
     bytes[index+2]=Math.min(255,Math.round(tb*brightness));
    }
   }
   ctx.putImageData(image,0,0);
   scene.textures.addSpriteSheet(costumeKey,canvas,{
    frameWidth:136,frameHeight:184,margin:0,spacing:0
   });
  }catch(error){
   console.warn('Interior NPC costume recolor unavailable:',error);
  }
 }
 const textureKey=scene.textures.exists(costumeKey)?costumeKey:nativeKey;
 const shadow=scene.add.graphics();
 shadow.fillStyle(0x071c2b,.25);shadow.fillEllipse(0,3,28,8);
 const avatar=scene.add.sprite(0,0,textureKey,0)
  .setOrigin(.5,175/184).setScale(.56);
 // Mira now stands behind the counter as a receptionist.
 const patrol=place==='hub'
  ?[[480,263]]
  :[[387,346],[433,352],[444,387],[365,388]];
 const container=scene.add.container(patrol[0][0],patrol[0][1],[shadow,avatar]).setDepth(4.25);
 const actor={
  name:staff.name,appearance:staff.appearance,pages:staff.pages,
  sprite:container,avatar,portraitTexture:textureKey,
  stepIndex:1,stepTimer:0
 };
 actor.update=delta=>{
  if(place==='hub'){avatar.setFrame(0);return}
  if(scene.dialogNpc||scene.journalOpen||scene.readerObject){
   avatar.setFrame(0);return;
  }
  const end=patrol[actor.stepIndex],dx=end[0]-container.x,dy=end[1]-container.y;
  const distance=Math.hypot(dx,dy);
  if(distance<2.5){
   actor.stepIndex=(actor.stepIndex+1)%patrol.length;
   return;
  }
  const speed=Math.min(distance,.034*Math.min(delta,50));
  container.x+=dx/distance*speed;
  container.y+=dy/distance*speed;
  const dir=Math.abs(dx)>Math.abs(dy)?(dx<0?'left':'right'):(dy<0?'up':'down');
  const row={down:0,up:1,left:2,right:3}[dir];
  actor.stepTimer+=Math.min(delta,50);
  avatar.setFrame(row*8+4+(Math.floor(actor.stepTimer/165)%4));
 };
 scene.roomGuard=actor;
 // The existing interaction hint and conversation panel show the staff
 // member's name; avoid a permanent badge overlapping their hair.
 return true;
}
