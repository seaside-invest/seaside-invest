export function renderDividends(data){
  const total = data.portfolio.reduce((s,p)=>s+p.dividend*p.shares,0);
  return `
    <h2 class="section-title">Utbytte</h2>
    <div class="grid cols-3">
      <div class="card"><h3>Årlig (est.)</h3><div class="kpi">${fmt(total)} kr</div></div>
      <div class="card"><h3>Per måned (snitt)</h3><div class="kpi">${fmt(total/12)} kr</div></div>
      <div class="card"><h3>Denne måneden</h3><div class="kpi">${fmt(data.dividends_month)} kr</div></div>
    </div>
    <div class="card">
      <h3>Detaljer</h3>
      <table class="table">
        <thead><tr><th>Aksje</th><th>Antall</th><th>Utbytte/aksje</th><th>Yield</th><th>Årlig</th></tr></thead>
        <tbody>
          ${data.portfolio.map(p=>`
            <tr>
              <td>${p.name} (${p.ticker})</td>
              <td>${p.shares}</td>
              <td>${p.dividend} kr</td>
              <td>${(p.yield*100).toFixed(1)}%</td>
              <td>${fmt(p.dividend*p.shares)} kr</td>
            </tr>`).join('')}
        </tbody>
      </table>
    </div>
  `;
}
function fmt(n){ return Math.round(n).toLocaleString('no-NO'); }

// v3.4 CSV import (client-side)
function parseCSV(text){
  const lines = text.trim().split(/\r?\n/);
  const headers = lines[0].split(',').map(s=>s.trim());
  return lines.slice(1).map(line=>{
    const cols = line.split(',').map(s=>s.trim());
    const obj = {};
    headers.forEach((h,i)=>obj[h]=cols[i]);
    return obj;
  });
}

function bindCSV(){
  const file = document.getElementById('csvFile');
  const btn = document.getElementById('csvBtn');
  if(!file || !btn) return;
  btn.addEventListener('click', ()=>{
    const f = file.files && file.files[0];
    if(!f) return alert('Velg en CSV-fil først.');
    const reader = new FileReader();
    reader.onload = ()=>{
      try {
        const rows = parseCSV(reader.result);
        const mapped = rows.map(r=>({ name:r.name, ticker:r.ticker, shares:+r.shares||0, dividend:+r.dividend||0, yield:+r.yield||0 }));
        const tbody = document.querySelector('table.table tbody');
        if(!tbody) return;
        tbody.innerHTML = mapped.map(p=>`
          <tr>
            <td>${p.name} (${p.ticker})</td>
            <td>${p.shares}</td>
            <td>${p.dividend} kr</td>
            <td>${(p.yield*100).toFixed(1)}%</td>
            <td>${fmt(p.dividend*p.shares)} kr</td>
          </tr>`).join('');
        const total = mapped.reduce((s,p)=>s+p.dividend*p.shares,0);
        const kpis = document.querySelectorAll('.grid.cols-3 .card .kpi');
        if(kpis && kpis[0]) kpis[0].textContent = fmt(total) + ' kr';
        if(kpis && kpis[1]) kpis[1].textContent = fmt(total/12) + ' kr';
        alert('CSV importert!');
      } catch(e){ alert('Klarte ikke å lese CSV. Sjekk kolonner.'); }
    };
    reader.readAsText(f);
  });
}

// Auto-bind on load
document.addEventListener('DOMContentLoaded', bindCSV);
