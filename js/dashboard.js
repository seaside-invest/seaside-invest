export function renderDashboard(data){
  const surplus = data.income - data.expenses;
  return `
    <section class="hero">
      <div>
        <div class="title">Velkommen tilbake, Sondre 👋</div>
        <div class="subtitle">Formue, utbytte og familien – i sanntid.</div>
      </div>
    </section>
    <h2 class="section-title">Oversikt</h2>
    <div class="grid cols-3">
      <div class="card"><h3>Inntekter</h3><div class="kpi">${fmt(data.income)} kr</div><div class="small">per måned</div></div>
      <div class="card"><h3>Utgifter</h3><div class="kpi">${fmt(data.expenses)} kr</div><div class="small">per måned</div></div>
      <div class="card"><h3>Resultat</h3><div class="kpi" style="color:${surplus>=0?'var(--ok)':'var(--danger)'}">${fmt(surplus)} kr</div><div class="small">per måned</div></div>
    </div>
    <div class="grid cols-3">
      <div class="card">
        <h3>Buffer</h3>
        <div class="small">Mål: ${fmt(data.buffer.target)} kr</div>
        <div class="kpi">${fmt(data.buffer.current)} kr</div>
        <div class="small">Progresjon: ${Math.round(100*data.buffer.current/data.buffer.target)}%</div>
      </div>
      <div class="card">
        <h3>Utbytte siste 12 mnd</h3>
        <canvas id="dividendChart" width="520" height="180"></canvas>
      </div>
      <div class="card">
        <h3>Vær – Stavern</h3>
        <div class="kpi">${data.weather.temp}°C</div>
        <div class="small">Vind: ${data.weather.wind} m/s</div>
        <div class="small">${umbrella(data.weather.next5) ? '☂️ Paraply i helgen' : '🌤️ Ser bra ut'}</div>
      </div>
    </div>
  `;
}
function umbrella(days){ return days.slice(0,3).some(d=>d.rain); }
function fmt(n){ return Math.round(n).toLocaleString('no-NO'); }
