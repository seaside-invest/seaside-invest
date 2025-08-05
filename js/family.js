export function renderFamily(data){
  return `
    <h2 class="section-title">Hvor er familien?</h2>
    <div class="grid cols-3">
      ${data.family.map(f=>`
        <div class="card">
          <h3>${f.name}</h3>
          <div class="small">Status: ${f.status}</div>
          <div class="small">Lat: ${f.lat.toFixed(2)} / Lng: ${f.lng.toFixed(2)}</div>
          <button class="btn" onclick="alert('Ping sendt til ${f.name}: kom hjem til middag 🍽️')">Ping</button>
        </div>
      `).join('')}
    </div>
    <div class="card small">GPS-data er demo. I live-versjon kobles dette til mobilens posisjon og vises på kart.</div>
  `;
}
