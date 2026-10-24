/*
 * BAIO DISTRICT 2077 — themed interiors / Workshop, Laboratory, Contact Hub.
 * Purpose-built fabrication machines, research equipment and communications
 * hardware. HOME-style computer sprites remain; no dining or kitchens.
 */
function renderThemedInterior(scene,place){
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
     'We sort messages, invitations, and ideas here. Visit the contact computer to learn how to connect with Baio.',
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
  // Dedicated twin-district transit gate: dimensional pillars, center
  // animated, and an easily reachable interaction zone.
  const port=scene.add.graphics().setDepth(2.35);
  const px=432,py=153,pw=96,ph=74;
  fill(port,px-8,py+5,pw+16,ph+8,0x102130,.30);
  fill(port,px,py,pw,ph,p.dark);
  fill(port,px+8,py+5,pw-16,ph-10,0x162c41);
  fill(port,px+16,py+10,pw-32,ph-20,0x235467);
  fill(port,px+20,py+14,pw-40,ph-28,p.accent,.35);
  port.lineStyle(4,p.accent,.95);port.strokeRoundedRect(px+12,py+8,pw-24,ph-18,6);
  fill(port,px-5,py-5,11,ph+15,0x2e4753);
  fill(port,px+pw-6,py-5,11,ph+15,0x2e4753);
  for(let a=0;a<5;a++){
   fill(port,px+24+a*10,py+23+(a%2)*5,5,18,p.bright,.18);
  }
  const portalAura=scene.add.graphics().setDepth(2.36);
  portalAura.fillStyle(p.accent,.18);portalAura.fillRoundedRect(px+18,py+13,60,44,4);
  portalAura.lineStyle(2,p.bright,.63);portalAura.strokeRoundedRect(px+20,py+15,56,40,4);
  scene.tweens.add({targets:portalAura,alpha:.30,duration:1600,yoyo:true,repeat:-1});
  fill(details,439,235,82,5,p.accent,.8);
  scene.zones.push({x:480,y:282,r:61,
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
  // CONTACT HUB: a small high-tech post office, sorting and reception.
  // Package shelves and message trays line the left wall.
  panel(69,164,158,159,p.wallLight);
  for(let row=0;row<3;row++){
   fill(details,81,181+row*40,133,7,p.mid);
   for(let col=0;col<3;col++){
    const x=89+col*42,y=188+row*40;
    fill(details,x,y,31,24,(col+row)%2?0xc7b4a2:0xe3d0b9);
    fill(details,x+3,y+3,25,2,p.bright,.56);
    fill(details,x+13,y+6,5,4,p.accent,.72);
    fill(details,x,y+22,31,3,p.mid,.76);
   }
  }
  scene.zones.push({x:157,y:348,r:72,label:'Inspect Parcel Sorting Area',object:'hub-mail'});
  collide(72,166,158,156);
  // Visitor bench and queue guides, avoiding the center walkway.
  panel(108,385,169,40,0x7e749a);
  for(const x of [120,176,232]){
   fill(details,x,385,3,38,p.bright,.7);
   fill(details,x+5,394,39,15,0xa69ab9);
  }
  collide(116,394,151,27);
  // Wide postal counter with lit screen, parcel tray and messaging panel.
  panel(251,200,365,98,p.soft);
  fill(details,258,211,351,18,0x332d4e);
  fill(details,270,216,326,5,p.accent,.82);
  fill(details,274,235,318,39,0x524b68);
  for(let x=285;x<580;x+=48){
   fill(details,x,250,39,4,p.bright,.38);
   fill(details,x,260,26,3,0xfff0e2,.2);
  }
  // Terminal over the counter for stamps and status.
  fill(details,473,174,99,48,0x102c3d);
  fill(details,481,181,83,34,0x344d75);
  fill(details,487,187,71,7,p.accent,.68);
  fill(details,487,199,53,4,p.bright,.68);
  fill(details,487,206,63,3,0xe7deff,.46);
  collide(252,203,365,89);
  // Directly accessible contact computer (separate from front counter).
  mount('workstation',642,178,212,112,0xece4ff);
  collide(645,194,207,64);
  fill(details,667,153,162,15,0x2d3652);
  fill(details,677,159,105,4,p.accent,.9);
  scene.zones.push({x:749,y:317,r:72,label:'Open Contact Console at Computer',object:'hub'});
  const beacon=scene.add.graphics().setDepth(4.7);
  beacon.fillStyle(p.accent,.20);beacon.fillCircle(750,309,14);
  beacon.lineStyle(2,p.bright,.90);beacon.strokeCircle(750,309,9);
  beacon.fillStyle(0xf9f7ff);beacon.fillCircle(750,309,3);
  scene.tweens.add({targets:beacon,alpha:.45,duration:1000,yoyo:true,repeat:-1});
 }
 // One stationary themed custodian per building. The base sprite sheets are
 // the same approved 4-direction NPC art used outdoors (136x184, boot anchor).
 // Outfit overlay adds a dedicated uniform without changing facial artwork.
 const staff=p.guard;
 const shadow=scene.add.graphics();
 shadow.fillStyle(0x071c2b,.26);shadow.fillEllipse(0,3,28,8);
 const avatar=scene.add.sprite(0,0,'npc-'+staff.appearance,0)
  .setOrigin(.5,175/184).setScale(.56);
 const uniform=scene.add.graphics();
 const U=(x,y,w,h,color,alpha=1)=>fill(uniform,x,y,w,h,color,alpha);
 if(place==='workshop'){
  // Workshop engineer: dark copper work apron, shoulder straps, tool belt.
  U(-13,-50,26,25,0x5e4235,.95);
  U(-11,-52,4,15,p.accent);U(7,-52,4,15,p.accent);
  U(-11,-37,22,4,0x2e3c44);
  U(-6,-44,12,3,0xc3a281);U(4,-33,6,5,0xe4b46e);
  U(-10,-28,20,4,0x58392e);
 }else if(place==='lab'){
  // White research coat with teal inner garment and clipped ID badge.
  U(-13,-51,26,27,0xe1eee9,.94);
  U(-3,-51,6,22,0x4fabae);
  U(-12,-49,3,22,0xffffff);U(9,-49,3,22,0xffffff);
  U(5,-45,6,4,p.accent);U(-9,-34,6,5,0xbad3d9);
  U(-2,-40,3,2,0xf7fffb);
 }else{
  // Postal/front desk uniform: lavender vest, cream shirt and badge.
  U(-13,-49,26,22,0x665789,.92);
  U(-11,-49,5,19,p.accent);U(6,-49,5,19,p.accent);
  U(-5,-49,10,9,0xebdce7);
  U(4,-40,5,3,0xffdf9d);
  U(-11,-28,22,4,0x302d4a);
 }
 const guard=scene.add.container(staff.x,staff.y,[shadow,avatar,uniform]).setDepth(4.25);
 scene.roomGuard={
  name:staff.name,appearance:staff.appearance,pages:staff.pages,
  sprite:guard,avatar
 };
 // The existing interaction hint and conversation panel show the staff
 // member's name; avoid a permanent badge overlapping their hair.
 return true;
}
