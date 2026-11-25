'use strict';
/* Éclos dessinés à la main (Éclosia) */
const ELOOK={'feuillon':{b:'quad',c1:'#a8743f',c2:'#e3c28f',c3:'#62c25a',ears:'round',x:['sprout']},'sylvorn':{b:'quad',c1:'#8c5a2b',c2:'#d9b47a',c3:'#3fa34d',ears:'round',x:['crown']},'brasille':{b:'quad',c1:'#7a3a2c',c2:'#f0b070',c3:'#ff8a3a',ears:'pointy',tail:'flame',x:['scales']},'fournex':{b:'quad',c1:'#5c2a20',c2:'#f5c27a',c3:'#ff6a2a',ears:'pointy',tail:'flame',x:['spikes','scales']},'clapotin':{b:'fish',c1:'#5aa0d8',c2:'#e6f3ff',c3:'#fff3c4',x:['horn']},'marevor':{b:'fish',c1:'#2f6fb5',c2:'#dceeff',c3:'#ffe08a',x:['fins','horn']},'cervolant':{b:'bird',c1:'#e04848',c2:'#f8e070',c3:'#3a7bd5',tail:'ribbon'},'taupiquet':{b:'round',c1:'#7a6a5a',c2:'#c9b59a',c3:'#c8c8d4',x:['drill']},'petalimace':{b:'long',c1:'#b6e08a',c2:'#f0f7d8',c3:'#ff8fb5',x:['petals','antenna']},'champignard':{b:'round',c1:'#f0e2c8',c2:'#fff8ea',c3:'#c94a3a',x:['mushroom']},'magmoule':{b:'blob',c1:'#3a2f36',c2:'#ff7a3a',c3:'#ffd060',x:['shell']},'Corapince':{b:'bug',c1:'#ff8a7a',c2:'#ffd2c8',c3:'#ff5f8f',x:['coral','claws']},'brasaile':{b:'bird',c1:'#3b2b2b',c2:'#ff9a3a',c3:'#ffd23a',x:['flamehead']},'galetin':{b:'round',c1:'#9a9aa6',c2:'#c8c8d2',c3:'#6b6b78',x:['cracks']},'frimousse':{b:'round',c1:'#eef8ff',c2:'#ffffff',c3:'#8fd8f0',ears:'long',tail:'fluffy',x:['icecrown']},'givrelame':{b:'bug',c1:'#4a7fa8',c2:'#bfe8f5',c3:'#e8fbff',x:['icehorn']},'lanterneau':{b:'blob',c1:'#f7e3b0',c2:'#fff4d6',c3:'#d0402a',x:['lantern']},'encrelot':{b:'round',c1:'#2a2238',c2:'#4a3a62',c3:'#b28cff',ears:'pointy',tail:'thin',x:['inkdrip']},'rubanelle':{b:'bug',c1:'#f4a6c8',c2:'#fff0f6',c3:'#8a5cf0',x:['wings','antenna']},'horlogon':{b:'bug',c1:'#c9a24a',c2:'#f0dc9a',c3:'#6b4e1f',x:['gear','antenna']},'zapillon':{b:'bird',c1:'#2b3a6b',c2:'#f2e14c',c3:'#7fd8ff',x:['antenna','stripes']},'surfouine':{b:'long',c1:'#8a5a3a',c2:'#f0d8b8',c3:'#3cc0d0',ears:'round',tail:'fluffy',x:['board']},'voltacoco':{b:'round',c1:'#7a4e2a',c2:'#f5ecd0',c3:'#f2e14c',x:['spikes','bolts']},'ronceloup':{b:'quad',c1:'#2e2a3a',c2:'#5a4a6a',c3:'#8fbf4a',ears:'pointy',tail:'fluffy',x:['thorns']},'epineant':{b:'tall',c1:'#2a1f2e',c2:'#4f3d55',c3:'#c43a5a',x:['thorns','crownthorn']},'nocturnis':{b:'tall',c1:'#f4f0dc',c2:'#ffffff',c3:'#6fd16a',x:['glow','antlers']}};
ELOOK.arbrasaure={b:'quad',c1:'#6a4a24',c2:'#d9b47a',c3:'#2f8a3d',ears:'round',x:['crown','glow']};
ELOOK.volcanthe={b:'quad',c1:'#4a1e18',c2:'#f5c27a',c3:'#ff5a1a',ears:'pointy',tail:'flame',x:['spikes','scales','flamehead']};
ELOOK.abyssard={b:'fish',c1:'#1f4f95',c2:'#dceeff',c3:'#bfeeff',x:['fins','horn','icecrown']};
ELOOK.eveillon={b:'bird',c1:'#fff4d6',c2:'#ffffff',c3:'#f2c14e',tail:'ribbon',x:['glow','crown']};
ELOOK.auberis={b:'bird',c1:'#3a2a6a',c2:'#ffd060',c3:'#b28cff',tail:'ribbon',x:['glow','crown']};
ELOOK.aquoree={b:'fish',c1:'#1f5fa8',c2:'#cfefff',c3:'#3ad8e0',x:['glow','fins','horn','icecrown']};
function drawCrea(g,L,shadowT){
 const {c1,c2,c3}=L,x=L.x||[],O='#1c1424',back=[],main=[],det=[];
 const E=(a,x,y,rx,ry,c)=>a.push({e:[x,y,rx,ry],c}),Pl=(a,p,c)=>a.push({p,c}),R=(a,x,y,w,h,c)=>a.push({r:[x,y,w,h],c});
 g.save();const SC=L.sc||1,SQ=L.sq||1;g.translate(24,44);g.scale(SC*SQ,SC);g.translate(-24,-44);
 let hx=24,hy=24,hr=10,tx=36,ty=34,eyes=[],float=false,body=L.b;
 if(body==='round'){hx=24;hy=27;hr=12;tx=35;ty=36;eyes=[[19,26],[29,26]]}
 if(body==='quad'){hx=14;hy=25;hr=8;tx=38;ty=31;eyes=[[10,24],[17,24]]}
 if(body==='bird'){hx=24;hy=17;hr=7;tx=31;ty=38;eyes=[[21,16],[27,16]]}
 if(body==='long'){hx=13;hy=28;hr=8;tx=41;ty=35;eyes=[[10,27],[16,27]]}
 if(body==='blob'){hx=24;hy=25;hr=13;float=true;eyes=[[20,24],[28,24]]}
 if(body==='fish'){hx=20;hy=27;hr=10;eyes=[[16,27],[23,27]]}
 if(body==='bug'){hx=14;hy=30;hr=7;tx=39;ty=31;eyes=[[11,29],[16,29]]}
 if(body==='tall'){hx=15;hy=15;hr=5;tx=37;ty=27;eyes=[[13,14],[17,14]]}
 if(body==='biped'){hx=24;hy=14;hr=8;tx=31;ty=36;eyes=[[20.5,13.5],[27.5,13.5]]}
 if(body==='dragon'){hx=13;hy=14;hr=6;tx=39;ty=33;eyes=[[10.5,13],[15.5,13]]}
 if(body==='jelly'){hx=24;hy=21;hr=12;float=true;eyes=[[19.5,21],[28.5,21]]}
 const top=hy-hr;
 // ombre
 g.fillStyle='rgba(0,0,0,.22)';g.beginPath();g.ellipse(24,45,float?9:14,2.5,0,0,7);g.fill();
 if(x.includes('glow')){const gr=g.createRadialGradient(24,26,2,24,26,24);gr.addColorStop(0,'rgba(255,240,170,.9)');gr.addColorStop(1,'rgba(255,240,170,0)');g.fillStyle=gr;g.fillRect(0,0,48,48)}
 // arrière
 if(L.ears){for(const s of[-1,1]){const ex=hx+s*hr*.6,ey=top+2;
  if(L.ears==='pointy'){Pl(back,[[ex-3,ey+3],[ex+3,ey+3],[ex+s*1,ey-6]],c1);Pl(det,[[ex-1.5,ey+2],[ex+1.5,ey+2],[ex+s*.5,ey-3]],c3)}
  if(L.ears==='round')E(back,ex,ey,3.2,3.2,c1);
  if(L.ears==='long'){E(back,ex+s*1,ey-7,2.6,8,c1);E(det,ex+s*1,ey-7,1.2,5,c3)}}}
 if(L.tail==='flame'){Pl(back,[[tx,ty+3],[tx+3,ty-7],[tx+6,ty-2],[tx+9,ty-11],[tx+10,ty+3]],c3);Pl(det,[[tx+3,ty+2],[tx+6,ty-4],[tx+8,ty+2]],'#ffe070')}
 if(L.tail==='fluffy'){E(back,tx+4,ty-4,6,5,c1);E(det,tx+7,ty-6,3,2,c2)}
 if(L.tail==='thin')Pl(back,[[tx,ty],[tx+8,ty-6],[tx+9,ty-13],[tx+11,ty-13],[tx+10,ty-5],[tx+1,ty+3]],c1);
 if(L.tail==='ribbon'){Pl(back,[[tx,ty-2],[tx+8,ty+4],[tx+12,ty+1],[tx+15,ty+7],[tx+11,ty+8],[tx+7,ty+6],[tx,ty+2]],c3)}
 if(x.includes('spikes')){const sx=body==='round'?16:20;for(let i=0;i<4;i++)Pl(back,[[sx+i*5,body==='round'?20:27],[sx+i*5+5,body==='round'?20:27],[sx+i*5+2.5,body==='round'?13:19]],c3)}
 if(x.includes('thorns')){for(let i=0;i<5;i++){const bx=body==='tall'?22+i*3.5:20+i*4;const by=body==='tall'?25:26;Pl(back,[[bx,by],[bx+4,by],[bx+1,by-7]],c3)}}
 if(x.includes('wings')){E(back,13,20,9,10,c1);E(back,35,20,9,10,c1);E(det,12,19,3,3,c3);E(det,36,19,3,3,c3);E(det,14,26,2,2,c2);E(det,34,26,2,2,c2)}
 if(x.includes('gear')){E(back,36,20,8,8,c3);for(let i=0;i<8;i++){const a=i/8*6.283;R(back,36+Math.cos(a)*9-1.5,20+Math.sin(a)*9-1.5,3,3,c3)}E(det,36,20,3,3,c2)}
 if(x.includes('board'))E(back,26,44,19,2.6,c3);
 if(x.includes('coral')){for(const[a,b,h]of[[26,24,9],[32,25,7],[37,26,6]]){Pl(back,[[a-1.5,b],[a+1.5,b],[a,b-h]],c3);E(back,a,b-h,1.8,1.8,c3)}}
 if(x.includes('petals')){for(let i=0;i<6;i++){const a=i/6*6.283;E(back,hx+Math.cos(a)*(hr+1),hy+Math.sin(a)*(hr+1),3,3,c3)}}
 if(body==='bird'){E(back,13,31,5,9,c1);E(back,35,31,5,9,c1)}
 if(body==='dragon'){Pl(back,[[27,25],[45,6],[44,16],[40,18],[41,24],[34,27]],c3);Pl(back,[[22,24],[30,4],[33,12],[30,16],[31,22]],dhex(c3,.15));Pl(back,[[tx,ty],[tx+8,ty+2],[tx+9,ty-6],[tx+3,ty+4]],c1)}
 if(x.includes('leafwings')){Pl(back,[[24,26],[6,12],[12,26]],c3);Pl(back,[[24,26],[42,12],[36,26]],c3)}
 if(x.includes('mane')){for(let i=0;i<9;i++){const a=Math.PI*(0.9+i*0.15);E(back,hx+Math.cos(a)*(hr+1.5),hy+Math.sin(a)*(hr+1.5)*0.9,3.6,3,c3)}}
 if(x.includes('halo')){g.strokeStyle='#ffe9a0';g.lineWidth=1.6;g.beginPath();g.ellipse(hx,top-4,7,2,0,0,7);g.stroke()}
 if(x.includes('tailorb')){Pl(back,[[tx,ty],[tx+9,ty-8],[tx+10,ty-7],[tx+2,ty+2]],c1);E(back,tx+11,ty-9,3.2,3.2,c3)}
 if(x.includes('tentacles')){for(const lx of[14,19,24,29,34])Pl(back,[[lx-1.6,33],[lx+1.6,33],[lx+2.5,41],[lx,45],[lx-1,41]],c1)}
 // corps
 if(body==='round'){E(main,24,31,13,12,c1);E(main,17,42,4,2.5,c1);E(main,31,42,4,2.5,c1);E(det,24,35,8,6,c2)}
 if(body==='quad'){for(const lx of[19,25,32,37])R(main,lx-2,35,4,9,c1);E(main,27,32,13,8.5,c1);E(main,hx,hy,9,8,c1);E(det,27,37,8,3,c2);E(det,hx-4,hy+4,3.5,2.5,c2);E(det,hx-6.5,hy+3,1,1,O)}
 if(body==='bird'){E(main,24,31,10,11,c1);E(main,hx,hy,8,7,c1);E(det,24,34,6,7,c2);R(main,20,41,2,4,'#f5a524');R(main,26,41,2,4,'#f5a524');Pl(main,[[22,20],[26,20],[24,24.5]],'#f5a524')}
 if(body==='long'){E(main,28,36,15,7,c1);E(main,hx,hy,8,8,c1);E(det,29,40,11,2.5,c2)}
 if(body==='blob'){E(main,24,27,x.includes('shell')?15:11,x.includes('shell')?11:13,c1)}
 if(body==='fish'){Pl(main,[[36,28],[46,20],[45,38]],c1);E(main,24,30,15,10,c1);E(main,22,39,4,2,c1);E(det,24,35,11,4.5,c2)}
 if(body==='bug'){E(main,28,32,13,9.5,c1);E(main,hx,hy,7,7,c1);for(const lx of[22,28,34])R(main,lx,39,2,6,c1);E(det,30,33,8,5,c2)}
 if(body==='biped'){R(main,17.5,36,5,9,c1);R(main,25.5,36,5,9,c1);E(main,20,45,3.4,1.6,dhex(c1,.2));E(main,28,45,3.4,1.6,dhex(c1,.2));E(main,24,29,10,10,c1);E(main,12.5,27,3,6.5,c1);E(main,35.5,27,3,6.5,c1);E(main,hx,hy,hr,hr*0.92,c1);E(det,24,31,6,6.5,c2)}
 if(body==='dragon'){for(const lx of[21,26,33,37])R(main,lx-2,34,4.4,10,c1);E(main,29,31,13,8.5,c1);Pl(main,[[17,31],[23,27],[17,15],[10,17]],c1);E(main,hx,hy,6.5,5.5,c1);Pl(main,[[hx-6,hy+1],[hx-10,hy+3],[hx-6,hy+4]],c1);E(det,29,36,9,3,c2);Pl(det,[[18,29],[21,27],[16,17],[13,18]],c2)}
 if(body==='jelly'){E(main,24,22,13,11,c1);E(det,24,26,9,4,c2)}
 if(body==='tall'){for(const lx of[20,25,32,36])R(main,lx-1.5,32,3,12,c1);E(main,28,30,11,7,c1);Pl(main,[[13,18],[19,17],[23,27],[17,29]],c1);E(main,hx,hy,6,5,c1);E(det,28,33,7,2.5,c2)}
 // extras devant
 if(x.includes('sprout')){R(main,hx-.7,top-6,1.6,7,'#3f8a3a');E(main,hx-3.4,top-6,3.4,1.9,c3);E(main,hx+3.4,top-7,3.4,1.9,c3)}
 if(x.includes('crown')){for(let i=-2;i<=2;i++)E(main,hx+i*3.2,top+1-Math.abs(i)*-.6-2,2.4,3.6,c3);E(det,hx,top-1,1.5,1.5,'#ffd23a')}
 if(x.includes('horn')){Pl(main,[[hx-2.5,top+3],[hx+2.5,top+3],[hx+9,top-13]],c3);for(let i=0;i<3;i++)R(det,hx+1+i*2.2,top+.5-i*4,2.6,.8,'#d9b860')}
 if(x.includes('fins'))Pl(main,[[26,21],[33,21],[31,13]],c1);
 if(x.includes('scales')){for(let i=0;i<3;i++)for(let j=0;j<2;j++)E(det,22+i*5+j*2.5,29+j*4,2.2,1.6,c3)}
 if(x.includes('drill')){Pl(main,[[hx-5,hy+1],[hx-5,hy+7],[hx-15,hy+4]],c3);R(det,hx-9,hy+2.5,1,3,'#8a8a96');R(det,hx-12,hy+3.2,1,1.6,'#8a8a96')}
 if(x.includes('antenna')){for(const s of[-1,1]){R(main,hx+s*3-.5,top-7,1.2,8,O);E(main,hx+s*3+.1,top-8,2,2,c3)}}
 if(x.includes('mushroom')){E(main,24,top+4,17,8,c3);for(const[a,b]of[[17,top+2],[25,top-1],[32,top+3],[21,top+6]])E(det,a,b,2,1.5,'#fff')}
 if(x.includes('shell')){E(det,24,28,14,3,c2);E(det,24,28,10,1.6,c3);for(const sx of[-8,0,8])R(det,24+sx-.5,17,1,6,'#5a4a54');for(const sx of[-8,0,8])R(det,24+sx-.5,33,1,5,'#5a4a54')}
 if(x.includes('claws')){E(main,7,27,5,4,c3);E(main,9,37,4.5,3.5,c3);Pl(det,[[3,26],[7,27],[3,28]],O)}
 if(x.includes('flamehead')){Pl(main,[[hx-5,top+2],[hx-3,top-6],[hx,top-2],[hx+2,top-9],[hx+5,top+2]],c3);Pl(det,[[hx-2,top+1],[hx+1,top-4],[hx+3,top+1]],'#fff3a0')}
 if(x.includes('cracks')){R(det,18,22,1,6,c3);R(det,18,27,5,1,c3);R(det,29,30,1,5,c3);R(det,26,34,4,1,c3)}
 if(x.includes('icecrown')){for(const[a,h]of[[-6,6],[-2,9],[2,9],[6,6]])Pl(main,[[hx+a-2,top+2],[hx+a+2,top+2],[hx+a,top+2-h]],c3)}
 if(x.includes('icehorn'))Pl(main,[[hx-3,hy-4],[hx+2,hy-6],[hx-11,hy-14]],c3);
 if(x.includes('lantern')){R(main,16,11,16,3,c3);R(main,16,37,16,3,c3);R(main,22.5,6,3,5,O);E(det,24,26,6,8,'#ffd36a');for(const yy of[17,22,30,34])R(det,15,yy,18,.8,'#c9a76a')}
 if(x.includes('inkdrip')){for(const[a,h]of[[16,5],[24,7],[31,4]])R(det,a,39,2.4,h,c1)}
 if(x.includes('stripes')){for(const yy of[28,33])R(det,16,yy,16,2,c2)}
 if(x.includes('bolts')){Pl(det,[[30,26],[34,26],[31,31],[35,31],[28,38],[30,32],[27,32]],c3)}
 if(x.includes('crownthorn')){for(const a of[-5,-2,1,4])Pl(main,[[hx+a-1.5,top+1],[hx+a+1.5,top+1],[hx+a+(a<0?-2:2),top-8]],c3)}
 if(x.includes('antlers')){for(const s of[-1,1]){Pl(main,[[hx+s*2,top+1],[hx+s*3,top+1],[hx+s*8,top-10],[hx+s*7,top-11]],'#c9a76a');Pl(main,[[hx+s*5,top-4],[hx+s*6,top-5],[hx+s*11,top-6],[hx+s*11,top-5]],'#c9a76a');E(main,hx+s*8,top-11,2.6,1.8,c3);E(main,hx+s*11,top-6,2.4,1.6,c3);E(main,hx+s*4,top-8,2,1.4,c3)}}
 // marques et détails (devant)
 if(x.includes('spots')){for(const[a,b,r]of[[30,30,1.8],[34,34,1.3],[25,35,1.5],[37,29,1.1]])E(det,a,b,r,r*0.8,dhex(c1,.3))}
 if(x.includes('mask')){E(det,(eyes[0]||[hx,hy])[0]+((eyes[1]||[hx,hy])[0]-(eyes[0]||[hx,hy])[0])/2,(eyes[0]||[hx,hy])[1],(Math.abs(((eyes[1]||[0])[0])-((eyes[0]||[0])[0]))/2)+3.5,2.6,dhex(c1,.45))}
 if(x.includes('bellymark')){Pl(det,[[24,29],[27,33],[24,37],[21,33]],c3)}
 if(x.includes('collar')){E(det,body==='quad'||body==='long'?hx+5:24,body==='quad'||body==='long'?hy+6:hy+hr*0.9,6,1.8,c3)}
 if(x.includes('whiskers')){g.strokeStyle=O;g.lineWidth=0.5;for(const s of[-1,1])for(const d of[-1,1]){g.beginPath();g.moveTo(hx+s*3,hy+2+d*.6);g.lineTo(hx+s*9,hy+1+d*2);g.stroke()}}
 if(x.includes('gems')){for(const[a,b]of[[hx,top+2.5],[24,33]])Pl(det,[[a,b-2.4],[a+1.8,b],[a,b+2.4],[a-1.8,b]],'#9ff0ff')}
 if(x.includes('crystals')){for(const[a,b,h]of[[30,26,7],[35,27,5],[25,25,6]])Pl(main,[[a-2,b],[a+2,b],[a+.5,b-h]],'#bfefff')}
 if(x.includes('tusks')){for(const s of[-1,1])Pl(main,[[hx+s*2,hy+3],[hx+s*3.4,hy+3],[hx+s*3.6,hy+8]],'#fff4dc')}
 if(x.includes('crest')){Pl(main,[[hx-1,top+1],[hx+1,top+1],[hx+6,top-9],[hx+3,top-3],[hx-4,top-8]],c3)}
 if(x.includes('embers')){for(const[a,b]of[[30,22],[36,26],[18,24],[26,18]])E(det,a,b,1,1,'#ffb040')}
 if(x.includes('ash')){for(const[a,b,w]of[[20,30,6],[28,34,5],[33,29,4]])R(det,a,b,w,.9,'#ff7a3a')}
 // rendu peint : contour teinté, puis volumes en dégradé, reflets
 const hex=c=>typeof c==='string'&&c[0]==='#'&&c.length===7;
 const ol=c=>hex(c)?rgb2hex(mixc(hex2rgb(dhex(c,.62)),hex2rgb(O),.45)):O;
 const paint=(o)=>{const c=o.c;if(!hex(c))return c;
  if(o.e){const[a,b,rx,ry]=o.e,gr=g.createRadialGradient(a-rx*.38,b-ry*.48,Math.max(.3,Math.min(rx,ry)*.08),a,b,Math.max(rx,ry)*1.08);gr.addColorStop(0,lhex(c,.38));gr.addColorStop(.5,c);gr.addColorStop(1,dhex(c,.26));return gr}
  let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;const pts=o.p||[[o.r[0],o.r[1]],[o.r[0]+o.r[2],o.r[1]+o.r[3]]];for(const[a,b]of pts){x0=Math.min(x0,a);y0=Math.min(y0,b);x1=Math.max(x1,a);y1=Math.max(y1,b)}
  const gr=g.createLinearGradient(x0,y0,x1,y1);gr.addColorStop(0,lhex(c,.3));gr.addColorStop(.55,c);gr.addColorStop(1,dhex(c,.24));return gr};
 const draw=(list,out)=>{for(const o of list){if(o.e){g.fillStyle=out?ol(o.c):paint(o);g.beginPath();g.ellipse(o.e[0],o.e[1],o.e[2]+(out?1.15:0),o.e[3]+(out?1.15:0),0,0,7);g.fill()}else if(o.p){g.beginPath();o.p.forEach((q,i)=>i?g.lineTo(q[0],q[1]):g.moveTo(q[0],q[1]));g.closePath();if(out){g.strokeStyle=ol(o.c);g.lineWidth=2.3;g.lineJoin='round';g.stroke()}else{g.fillStyle=paint(o);g.fill()}}else{const[a,b,w,h]=o.r;if(out){g.fillStyle=ol(o.c);g.beginPath();g.roundRect(a-1.1,b-1.1,w+2.2,h+2.2,Math.min(w,h)*.5+1);g.fill()}else{g.fillStyle=paint(o);g.beginPath();g.roundRect(a,b,w,h,Math.min(w,h)*.45);g.fill()}}}};
 draw(back,1);draw(back,0);draw(main,1);draw(main,0);draw(det,0);
 // reflet de lumière sur les grands volumes
 g.save();g.globalCompositeOperation='source-atop';for(const o of main){if(!o.e||o.e[2]<7)continue;const[a,b,rx,ry]=o.e;g.strokeStyle='rgba(255,255,255,.32)';g.lineWidth=1.1;g.beginPath();g.ellipse(a,b,rx-1.4,ry-1.4,0,Math.PI*1.08,Math.PI*1.42);g.stroke()}g.restore();
 // yeux
 const shadow=shadowT,es=L.eye||'round',iris=L.ei||(hex(c3)?dhex(c3,.15):'#3a3a5a');
 for(const[ex,ey]of eyes){
  if(L.blink||L.hurt){g.strokeStyle=O;g.lineWidth=1.1;g.lineCap='round';g.beginPath();if(L.hurt){const s=ex<24?1:-1;g.moveTo(ex-1.8*s,ey-1.8);g.lineTo(ex+1.6*s,ey);g.lineTo(ex-1.8*s,ey+1.8)}else{g.moveTo(ex-2.3,ey);g.quadraticCurveTo(ex,ey+1.6,ex+2.3,ey)}g.stroke();continue}
  if(shadow&&es!=='big'){g.fillStyle=c3;g.beginPath();g.ellipse(ex,ey,2.3,1.4,0,0,7);g.fill();g.fillStyle='rgba(255,255,255,.7)';g.fillRect(ex-.6,ey-.5,1,.6);continue}
  const ry=es==='big'?3.2:es==='sleepy'?1.7:2.8,rx=es==='big'?2.8:2.3;
  g.fillStyle=O;g.beginPath();g.ellipse(ex,ey,rx+.55,ry+.55,0,0,7);g.fill();
  g.fillStyle='#fff';g.beginPath();g.ellipse(ex,ey,rx,ry,0,0,7);g.fill();
  g.fillStyle=iris;g.beginPath();g.ellipse(ex+.35,ey+.3,rx*.72,ry*.78,0,0,7);g.fill();
  g.fillStyle=O;g.beginPath();g.ellipse(ex+.45,ey+.45,rx*.38,ry*.45,0,0,7);g.fill();
  g.fillStyle='#fff';g.beginPath();g.arc(ex-.45,ey-ry*.4,.75,0,7);g.fill();g.beginPath();g.arc(ex+.9,ey+ry*.35,.35,0,7);g.fill();
  if(es==='sharp'){g.fillStyle=ol(c1);g.beginPath();g.moveTo(ex-rx-.8,ey-ry-.6);g.lineTo(ex+rx+.8,ey-ry*.2);g.lineTo(ex+rx+.8,ey-ry-1.2);g.closePath();g.fill()}
  if(es==='sleepy'){g.fillStyle=hex(c1)?c1:'#888';g.beginPath();g.ellipse(ex,ey-ry*.55,rx+.6,ry*.6,0,Math.PI,Math.PI*2);g.fill()}
 }
 if(eyes.length&&body!=='bird'&&L.open){const mx=(eyes[0][0]+eyes[1][0])/2,my=eyes[0][1]+4.2;g.fillStyle=O;g.beginPath();g.ellipse(mx,my,2.4,2,0,0,7);g.fill();g.fillStyle='#e8707a';g.beginPath();g.ellipse(mx,my+.9,1.5,.9,0,0,7);g.fill();if(L.fang){g.fillStyle='#fff';g.beginPath();g.moveTo(mx-1.6,my-1.2);g.lineTo(mx-.6,my-1.2);g.lineTo(mx-1.1,my+.4);g.fill()}}
 else if(eyes.length&&body!=='bird'){const mx=(eyes[0][0]+eyes[1][0])/2,my=eyes[0][1]+3.6;g.strokeStyle=O;g.lineWidth=.75;g.lineCap='round';g.beginPath();g.moveTo(mx-1.6,my);g.quadraticCurveTo(mx,my+1.3,mx+1.6,my);g.stroke();if(L.fang){g.fillStyle='#fff';g.beginPath();g.moveTo(mx+.4,my+.4);g.lineTo(mx+1.4,my+.3);g.lineTo(mx+.9,my+1.8);g.fill()}
  g.fillStyle='rgba(255,120,130,.32)';g.beginPath();g.ellipse(eyes[0][0]-1.6,eyes[0][1]+2.8,1.5,.8,0,0,7);g.ellipse(eyes[1][0]+1.6,eyes[1][1]+2.8,1.5,.8,0,0,7);g.fill()}
 g.restore();
}
/* Style dessiné pour toutes les créatures (traits générés depuis le type et la morphologie) */
const AUTO_X = {
  flore: ['sprout', 'petals', 'crown', 'mushroom', 'leafwings', 'mane'], feu: ['flamehead', 'spikes', 'scales', 'embers', 'mane'], eau: ['fins', 'horn', 'coral', 'spots', 'whiskers'],
  givre: ['icecrown', 'icehorn', 'crystals', 'gems'], foudre: ['bolts', 'antenna', 'stripes', 'crest', 'tailorb'], roc: ['cracks', 'spikes', 'drill', 'crystals', 'tusks'],
  acier: ['gear', 'drill', 'cracks', 'collar', 'gems'], vent: ['antenna', 'stripes', 'crest', 'leafwings'], ombre: ['inkdrip', 'thorns', 'mask', 'tailorb'], lumiere: ['glow', 'crown', 'halo', 'gems'],
  esprit: ['glow', 'antenna', 'halo', 'gems', 'bellymark'], toxine: ['mushroom', 'stripes', 'spikes', 'spots', 'tentacles'], combat: ['claws', 'stripes', 'mask', 'mane', 'collar'], normal: ['stripes', 'whiskers', 'spots', 'collar'], dragon: ['spikes', 'horn', 'crownthorn', 'crest', 'tusks'],
};
const AUTO_CACHE = {};
function hueShift(hex, dh, ds, dl) { const [h, s, l] = rgb2hsl(hex2rgb(hex)); return rgb2hex(hsl2rgb([h + dh, Math.max(0, Math.min(1, s + ds)), Math.max(0.08, Math.min(0.92, l + dl))])); }
function autoLook(id) {
  if (AUTO_CACHE[id]) return AUTO_CACHE[id];
  const s = SP[id], line = s.line || id, H = hashStr(line + ':line'), hi = hashStr(id + ':look');
  const lh = k => (H >>> (k * 3)) & 7, ih = k => (hi >>> (k * 3)) & 7;
  const t1 = s.types[0], t2 = s.types[1], plan = s.plan, stage = s.stage;
  const late = stage === '3' || stage === 'L' || stage === 'M' || stage === 'P' || (stage === '2' && !s.next);
  let b = { quad: 'quad', biped: stage === '1' ? 'round' : late ? (lh(1) < 5 ? 'biped' : 'tall') : 'biped', blob: ['eau', 'esprit', 'toxine'].includes(t1) && lh(1) < 5 ? 'jelly' : 'blob', fish: 'fish', serpent: 'long', bird: 'bird', bug: 'bug' }[plan] || 'round';
  if (t1 === 'dragon' && late && (plan === 'quad' || plan === 'serpent' || plan === 'biped')) b = 'dragon';
  // palette de la lignée, décalée pour que chaque famille soit unique
  const base = TC[t1] || '#999999';
  const c1 = hueShift(base, (lh(2) - 3.5) * 7, (lh(3) - 3.5) * 0.04, (lh(4) - 3.5) * 0.035 + (stage === '1' ? 0.05 : late ? -0.04 : 0));
  const c2 = hueShift(c1, (lh(5) - 3.5) * 4, -0.25, 0.32);
  const c3 = t2 ? hueShift(TC[t2], (lh(6) - 3.5) * 6, 0.05, 0) : hueShift(base, 150 + lh(6) * 12, 0.1, (lh(7) < 4 ? -0.15 : 0.18));
  const L = { b, c1, c2, c3, x: [], sc: { '1': 0.82, '2': s.next ? 0.93 : 1, '3': 1.05, 'u': 0.97, 'P': 1.04, 'L': 1.08, 'M': 1.06 }[stage] || 1, sq: 0.94 + lh(8) * 0.018 };
  L.eye = ['round', 'big', 'sharp', 'sleepy', 'round', 'big', 'sharp', 'round'][lh(9)];
  if (stage === '1' && L.eye === 'sharp') L.eye = 'big';
  L.ei = hueShift(c3, 20, 0.1, -0.12);
  L.fang = ['ombre', 'dragon', 'combat', 'feu'].includes(t1) && lh(10) < 5;
  if (['quad', 'round', 'tall', 'long', 'biped'].includes(b)) L.ears = [null, 'pointy', 'round', 'long', 'pointy', null, 'round', 'long'][lh(11)] || undefined;
  if (['quad', 'round', 'long', 'biped'].includes(b)) L.tail = t1 === 'feu' ? 'flame' : t1 === 'ombre' ? 'thin' : [undefined, 'fluffy', 'thin', 'ribbon', 'fluffy', undefined, 'thin', 'fluffy'][lh(12)];
  // traits : un socle commun à la lignée, puis des ajouts à chaque évolution
  const pool = (AUTO_X[t1] || []).concat(t2 ? AUTO_X[t2] || [] : []), common = ['spots', 'mask', 'whiskers', 'collar', 'bellymark', 'crest'];
  const n = stage === '1' ? 1 : stage === '2' ? 2 : stage === 'u' ? 2 : 3;
  for (let i = 0; i < n && pool.length; i++) { const e = pool[((H >>> (i * 4)) + i * 3) % pool.length]; if (!L.x.includes(e)) L.x.push(e); }
  if (lh(13) < 4) { const e = common[(H >>> 7) % common.length]; if (!L.x.includes(e)) L.x.push(e); }
  if (late && ih(1) < 4) { const e = pool[(hi >>> 5) % Math.max(1, pool.length)]; if (e && !L.x.includes(e)) L.x.push(e); }
  if (b === 'bug' && (t1 === 'vent' || t2 === 'vent')) L.x.push('wings');
  if (stage === 'L' || stage === 'M') { L.x.push('glow'); if (!L.x.includes('crown') && !L.x.includes('halo')) L.x.push(b === 'tall' || b === 'quad' || b === 'dragon' ? 'antlers' : 'halo'); L.eye = 'sharp'; }
  if (b !== 'blob' && b !== 'jelly') L.x = L.x.filter(e => e !== 'lantern' && e !== 'shell' && e !== 'tentacles');
  if (b === 'jelly' && !L.x.includes('tentacles')) L.x.push('tentacles');
  if (b === 'fish' || b === 'bird' || b === 'jelly' || b === 'blob') L.x = L.x.filter(e => e !== 'mane' && e !== 'collar');
  return (AUTO_CACHE[id] = L);
}
