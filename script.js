(function(){
var IW=1600,IH=900,MX=1372,MY=574; // mushroom position inside the original image
var KW=500,FX=1165; // portrait: visible source width and focal x (keeps moon + mushroom in view)
var boxes=document.querySelectorAll('.box'),sh=document.getElementById('shroom');
function place(){
 var w=innerWidth,h=innerHeight;
 var s=w>=h?Math.min(w/IW,h/IH):Math.min(h/IH,w/KW);
 var bw=IW*s,bh=IH*s,t=(h-bh)/2,l;
 if(bw<=w)l=(w-bw)/2;else l=Math.min(0,Math.max(w-bw,w/2-FX*s));
 boxes.forEach(function(b){var st=b.style;st.left=l+'px';st.top=t+'px';st.width=bw+'px';st.height=bh+'px';
  st.setProperty('--fx',bw<w-1?'6%':'0%');st.setProperty('--fy',bh<h-1?'6%':'0%');});
 var d=Math.max(60,bw*.05);
 sh.style.left=(l+MX*s)+'px';sh.style.top=(t+MY*s)+'px';
 sh.style.width=sh.style.height=d+'px';sh.style.margin=(-d/2)+'px 0 0 '+(-d/2)+'px';
}
addEventListener('resize',place);place();
// rain
var mq=matchMedia('(prefers-reduced-motion: reduce)');
var c=document.getElementById('rain'),x=c.getContext('2d'),W,H,drops=[],raf,last=0;
function size(){W=c.width=innerWidth;H=c.height=innerHeight;var n=Math.min(200,Math.round(W*H/9500));drops=[];for(var i=0;i<n;i++)drops.push(mk(true));}
function mk(r){return{x:Math.random()*(W+120)-60,y:r?Math.random()*H:-30,l:10+Math.random()*16,v:700+Math.random()*500,a:.1+Math.random()*.18}}
function frame(t){raf=requestAnimationFrame(frame);var dt=Math.min(.05,(t-last)/1000||.016);last=t;
 x.clearRect(0,0,W,H);x.lineWidth=1;x.lineCap='round';
 for(var i=0;i<drops.length;i++){var d=drops[i];d.y+=d.v*dt;d.x-=d.v*dt*.12;
  if(d.y>H+20){drops[i]=mk(false);continue}
  x.strokeStyle='rgba(185,205,220,'+d.a+')';x.beginPath();x.moveTo(d.x,d.y);x.lineTo(d.x+d.l*.12,d.y-d.l);x.stroke();}}
function start(){cancelAnimationFrame(raf);if(mq.matches||document.hidden)return;size();last=performance.now();raf=requestAnimationFrame(frame)}
addEventListener('resize',start);document.addEventListener('visibilitychange',start);
(mq.addEventListener?mq.addEventListener('change',start):mq.addListener(start));start();
})();
