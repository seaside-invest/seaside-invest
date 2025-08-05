export function renderGoals(data){
  return `
    <h2 class="section-title">Sparemål</h2>
    <div class="grid cols-3">
      ${data.goals.map(g=>{
        const pct = Math.round(100*g.current/g.target);
        return `<div class="card">
          <h3>${g.name}</h3>
          <div class="kpi">${fmt(g.current)} / ${fmt(g.target)} kr</div>
          <div class="small">Progresjon: ${pct}%</div>
        </div>`
      }).join('')}
    </div>
  `;
}
function fmt(n){ return Math.round(n).toLocaleString('no-NO'); }
