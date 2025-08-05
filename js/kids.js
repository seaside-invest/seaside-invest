export function renderKids(data){
  return `
    <h2 class="section-title">Barna</h2>
    <div class="grid cols-3">
      ${data.kids.map(k=>`
        <div class="card">
          <h3>${k.name}</h3>
          <div class="small">Ukeprogresjon</div>
          <div class="kpi">${k.tasks_done} / ${k.tasks_total}</div>
          <div class="small">Ukelønn: ${k.weekly_allowance} kr</div>
          <div class="grid"><button class="btn" onclick="alert('Ping sendt til ${k.name}!')">Send ping</button></div>
        </div>
      `).join('')}
    </div>
  `;
}
