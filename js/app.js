import { renderDashboard } from './dashboard.js';
import { renderDividends } from './dividends.js';
import { renderRentals } from './rentals.js';
import { renderKids } from './kids.js';
import { renderGoals } from './goals.js';
import { renderFamily } from './family.js';
import { renderSettings, bindSettings } from './settings.js';

const app = document.getElementById('app');

function loadTheme(){
  const t = localStorage.getItem('theme') || 'dark';
  if(t==='light') document.documentElement.classList.add('light');
}
function toggleTheme(){
  const isLight = document.documentElement.classList.toggle('light');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
}
loadTheme();

async function loadData(){
  const res = await fetch('data/demo.json?ts=' + Date.now());
  return res.json();
}
function setActive(hash){
  document.querySelectorAll('.header nav a').forEach(a=>a.classList.toggle('active', a.getAttribute('href')===hash));
}
async function route(){
  const data = await loadData();
  const hash = location.hash || '#dashboard';
  setActive(hash);
  switch(hash){
    case '#dashboard': app.innerHTML = renderDashboard(data); drawCharts(data); break;
    case '#dividends': app.innerHTML = renderDividends(data); break;
    case '#rentals': app.innerHTML = renderRentals(data); break;
    case '#kids': app.innerHTML = renderKids(data); break;
    case '#goals': app.innerHTML = renderGoals(data); break;
    case '#family': app.innerHTML = renderFamily(data); break;
    case '#settings': app.innerHTML = renderSettings(data); bindSettings(); break;
    default: app.innerHTML = '<p>Fant ikke siden.</p>';
  }
}
function drawLine(ctx, points){
  const w = ctx.canvas.width, h = ctx.canvas.height;
  const xs = points.map(p=>p.x), ys=points.map(p=>p.y);
  const minY=Math.min(...ys), maxY=Math.max(...ys);
  const minX=Math.min(...xs), maxX=Math.max(...xs);
  const pad=10;
  ctx.clearRect(0,0,w,h);
  ctx.strokeStyle='#00c2ff'; ctx.lineWidth=2;
  ctx.beginPath();
  points.forEach((p,i)=>{
    const x = pad + (p.x-minX)/(maxX-minX||1)*(w-2*pad);
    const y = h - (pad + (p.y-minY)/(maxY-minY||1)*(h-2*pad));
    if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
  });
  ctx.stroke();
}
function drawCharts(data){
  const el = document.getElementById('dividendChart');
  if(!el) return;
  const ctx = el.getContext('2d');
  const pts = Array.from({length:12}).map((_,i)=>({x:i, y:(data.dividends_year/12) * (0.7+Math.random()*0.6)}));
  drawLine(ctx, pts);
}
// Auto-refresh 5 min
setInterval(route, 5*60*1000);
// Fullscreen
document.getElementById('fullscreenBtn').addEventListener('click', ()=>{
  if(!document.fullscreenElement){ document.documentElement.requestFullscreen(); }
  else{ document.exitFullscreen(); }
});
// Theme toggle
document.getElementById('themeBtn').addEventListener('click', toggleTheme);
// Clock
function tick(){
  const d=new Date(); const s = d.toLocaleTimeString('no-NO',{hour:'2-digit',minute:'2-digit'});
  document.getElementById('clock').textContent = s;
}
setInterval(tick, 1000); tick();

window.addEventListener('hashchange', route);
route();
