export function renderRentals(data){
  const total = data.rentals.reduce((s,r)=>s+r.month,0);
  return `
    <h2 class="section-title">Utleie</h2>
    <div class="grid cols-3">
      ${data.rentals.map(r=>`<div class="card"><h3>${r.name}</h3><div class="kpi">${fmt(r.month)} kr</div><div class="small">Denne måneden</div></div>`).join('')}
      <div class="card"><h3>Sum</h3><div class="kpi">${fmt(total)} kr</div></div>
    </div>
  `;
}
function fmt(n){ return Math.round(n).toLocaleString('no-NO'); }
