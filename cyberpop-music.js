/* District 2077: original eight-bar cyberpop chiptune.
 * Synthesized locally in Web Audio; no streamed music or third-party samples.
 * An AudioContext is only created after the visitor presses START or MUSIC ON.
 */
(function(){
 'use strict';
 const Engine=window.AudioContext||window.webkitAudioContext;
 const BPM=116,beat=60/BPM,stepLength=beat/4,stepsPerLoop=128;
 const chords=[[57,60,64,67],[53,57,60,64],[60,64,67,71],[55,59,62,67]];
 const roots=[45,41,48,43];
 // Original 8-bar A-minor pop melody; one eighth-note position per entry.
 const melody=[
  [76,79,81,79,76,72,74,76],
  [76,72,69,72,76,77,76,72],
  [79,76,72,74,76,79,83,79],
  [74,76,79,81,79,76,74,71],
  [76,79,81,84,83,79,76,74],
  [72,76,77,79,77,76,72,69],
  [72,76,79,83,81,79,76,72],
  [74,76,79,76,74,71,69,null]
 ];
 let enabled=true,started=false,ctx=null,mix=null,noiseBuffer=null;
 let interval=null,nextStepTime=0,stepNumber=0;
 try{enabled=localStorage.getItem('district2077-music-muted')!=='1'}catch(e){}
 const button=document.getElementById('musicToggle');
 const updateButton=()=>{
  if(!button)return;
  const on=enabled&&!!Engine;
  button.textContent=on?'♫ MUSIC ON':'♫ MUSIC OFF';
  button.setAttribute('aria-pressed',String(on));
  button.setAttribute('aria-label',on?'Matikan musik latar':'Nyalakan musik latar');
  button.title='Musik cyberpunk pop orisinal (tekan M untuk ON/OFF)';
  button.disabled=!Engine;
 };
 const frequency=midi=>440*Math.pow(2,(midi-69)/12);
 const synth=(midi,time,duration,wave,level)=>{
  if(midi===null||!ctx)return;
  const length=Math.max(.065,duration),attack=wave==='triangle'?.025:.009;
  const osc=ctx.createOscillator(),gain=ctx.createGain();
  osc.type=wave;
  osc.frequency.setValueAtTime(frequency(midi),time);
  gain.gain.setValueAtTime(.0001,time);
  gain.gain.linearRampToValueAtTime(level,time+attack);
  gain.gain.exponentialRampToValueAtTime(Math.max(.0001,level*.62),
   time+Math.max(attack+.015,length*.35));
  gain.gain.exponentialRampToValueAtTime(.0001,time+length);
  osc.connect(gain);gain.connect(mix);
  osc.start(time);osc.stop(time+length+.02);
 };
 const hiss=(time,length,level,cutoff)=>{
  const src=ctx.createBufferSource(),hp=ctx.createBiquadFilter();
  const gain=ctx.createGain();
  src.buffer=noiseBuffer;hp.type='highpass';
  hp.frequency.setValueAtTime(cutoff,time);
  gain.gain.setValueAtTime(level,time);
  gain.gain.exponentialRampToValueAtTime(.0001,time+length);
  src.connect(hp);hp.connect(gain);gain.connect(mix);
  src.start(time);src.stop(time+length+.01);
 };
 const kick=time=>{
  const osc=ctx.createOscillator(),gain=ctx.createGain();
  osc.type='sine';
  osc.frequency.setValueAtTime(155,time);
  osc.frequency.exponentialRampToValueAtTime(47,time+.14);
  gain.gain.setValueAtTime(.23,time);
  gain.gain.exponentialRampToValueAtTime(.0001,time+.17);
  osc.connect(gain);gain.connect(mix);
  osc.start(time);osc.stop(time+.18);
 };
 const composeStep=(step,time)=>{
  const bar=Math.floor(step/16)%8,s=step%16,chord=chords[bar%4];
  if(s===0)chord.forEach(midi=>synth(midi-12,time,beat*3.8,'triangle',.018));
  // Four-on-the-floor bass drum and syncopated synth-bass.
  if(s%4===0){
   kick(time);
   const base=roots[bar%4]+(s===12?7:0);
   synth(base,time,beat*.78,'sawtooth',.057);
   synth(base-12,time,beat*.60,'triangle',.042);
  }
  if(s===4||s===12)hiss(time,.13,.09,1300);
  if(s%2===0){
   hiss(time,.045,s%4===0?.033:.049,5300);
   const note=melody[bar][s/2];
   synth(note,time,beat*.38,'square',.046);
   if(note!==null)synth(note-12,time,beat*.25,'triangle',.012);
  }
  if(s%4===2)synth(chord[Math.floor(s/4)%4]+12,time,beat*.27,'square',.013);
 };
 const schedule=()=>{
  if(!ctx||ctx.state!=='running'||!enabled||!started)return;
  while(nextStepTime<ctx.currentTime+.22){
   composeStep(stepNumber%stepsPerLoop,nextStepTime);
   stepNumber++;
   nextStepTime+=stepLength;
  }
 };
 const stopTicker=()=>{if(interval!==null){clearInterval(interval);interval=null}};
 const initialize=()=>{
  if(ctx)return true;
  if(!Engine)return false;
  try{
   ctx=new Engine();
   mix=ctx.createGain();mix.gain.value=.19;
   const compressor=ctx.createDynamicsCompressor();
   compressor.threshold.value=-15;compressor.knee.value=14;
   compressor.ratio.value=5;compressor.attack.value=.004;
   compressor.release.value=.14;
   mix.connect(compressor);compressor.connect(ctx.destination);
   noiseBuffer=ctx.createBuffer(1,Math.round(ctx.sampleRate*.28),ctx.sampleRate);
   const samples=noiseBuffer.getChannelData(0);
   for(let i=0;i<samples.length;i++)samples[i]=Math.random()*2-1;
   return true;
  }catch(error){console.warn('District soundtrack unavailable',error);return false}
 };
 const play=()=>{
  if(!enabled||!started||!initialize())return;
  // Call resume directly during a click. Browser autoplay policies require it.
  Promise.resolve(ctx.resume()).then(()=>{
   if(!enabled||!started||ctx.state!=='running'||interval!==null)return;
   nextStepTime=ctx.currentTime+.08;
   schedule();
   interval=window.setInterval(schedule,55);
  }).catch(error=>console.warn('Audio needs a browser interaction',error));
 };
 const pause=()=>{
  stopTicker();
  if(ctx&&ctx.state==='running')ctx.suspend().catch(()=>{});
 };
 const toggle=()=>{
  if(!Engine)return;
  enabled=!enabled;
  try{localStorage.setItem('district2077-music-muted',enabled?'0':'1')}catch(e){}
  if(enabled)play();else pause();
  updateButton();
 };
 if(button){
  button.addEventListener('click',toggle);
  document.addEventListener('keydown',event=>{
   if(event.code!=='KeyM'||event.repeat||!started)return;
   const target=event.target;
   if(target&&/^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName||''))return;
   toggle();
  });
  document.addEventListener('visibilitychange',()=>{
   if(document.hidden)pause();
   else if(enabled&&started)play();
  });
 }
 updateButton();
 window.CyberpopMusic={
  begin(){
   started=true;
   if(button)button.hidden=false;
   updateButton();play();
  },
  toggle,
  get enabled(){return enabled&&!!Engine}
 };
})();
