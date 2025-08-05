export function renderSettings(data){
  return `
    <h2 class="section-title">Innstillinger</h2>
    <div class="grid cols-2">
      <div class="card">
        <h3>Oppdater data</h3>
        <p class="small">Laster fra <code>data/demo.json</code>. Kan kobles til Google Sheets/Nordnet.</p>
        <button id="refreshNow" class="btn">Oppdater nå</button>
      </div>
      <div class="card">
        <h3>Varsler</h3>
        <div class="small">Aktiver push-varsler i nettleseren.</div>
        <button class="btn" onclick="alert('Varsler aktiveres i live-versjon via Notifications API.')">Aktiver varsler</button>
      </div>
    </div>
    <div class="card">
      <h3>Tilbakemelding (Netlify Forms)</h3>
      <form name="feedback" method="POST" data-netlify="true">
        <input type="hidden" name="form-name" value="feedback">
        <div style="display:grid; gap:8px; grid-template-columns:1fr 1fr">
          <input name="navn" placeholder="Navn" required>
          <input name="epost" type="email" placeholder="E-post" required>
        </div>
        <div style="margin-top:8px"><textarea name="melding" placeholder="Hva skal vi forbedre?" rows="4" style="width:100%"></textarea></div>
        <button class="btn" type="submit" style="margin-top:8px">Send</button>
      </form>
      <div class="small">Skjemaet fungerer automatisk på Netlify (finnes under Forms).</div>
    </div>
  `;
}
export function bindSettings(){
  const btn = document.getElementById('refreshNow');
  if(btn) btn.addEventListener('click', ()=>location.reload());
}
