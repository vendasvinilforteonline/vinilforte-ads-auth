'use strict';
// Capture the short-lived return in memory only, before rendering or loading images.
// No Partner Key, access token, API request, local service request or persistence here.
(() => {
  const search = location.search;
  const params = new URLSearchParams(search);
  const hasReturn = ['code', 'shop_id', 'error', 'state'].some(key => params.has(key));
  let cleaned = true;
  try { history.replaceState(null, '', location.pathname); } catch { cleaned = false; }
  let payload = null;
  let invalid = false;
  let rejected = false;
  const single = key => params.getAll(key).length <= 1;
  const code = params.get('code') || '';
  const shop = params.get('shop_id') || '';
  const state = params.get('state');
  if (hasReturn) {
    rejected = params.has('error');
    invalid = !cleaned || search.length > 8192 ||
      !['code', 'shop_id', 'state', 'error'].every(single) ||
      !/^[A-Za-z0-9_-]{6,2048}$/.test(code) || !/^[1-9]\d{0,19}$/.test(shop) ||
      (state !== null && !/^[A-Za-z0-9_-]{16,256}$/.test(state));
    if (!invalid && !rejected) {
      payload = { version: 1, platform: 'shopee', code, shop_id: shop };
      if (state !== null) payload.state = state;
    }
  }
  // Empty the parsed parameters; only the validated payload remains usable.
  for (const key of [...params.keys()]) params.delete(key);
  document.addEventListener('DOMContentLoaded', () => {
    const status = document.getElementById('status');
    const actions = document.getElementById('actions');
    const copy = document.getElementById('copy');
    const clear = document.getElementById('clear');
    let expiration;
    const wipe = message => {
      payload = null;
      clearTimeout(expiration);
      actions.hidden = true;
      status.textContent = message;
    };
    if (rejected) status.textContent = 'A autorização não foi concluída. Volte ao gestor para iniciar uma nova tentativa.';
    else if (hasReturn && invalid) status.textContent = 'O retorno está incompleto ou inválido. Inicie uma nova autorização pelo gestor.';
    else if (payload) {
      actions.hidden = false;
      status.textContent = 'Retorno recebido. A loja ainda não está conectada. Copie o retorno e conclua a autorização no gestor quando essa etapa estiver disponível. Não compartilhe esse conteúdo.';
      copy.addEventListener('click', async () => {
        if (!payload) return;
        const current = payload;
        copy.disabled = true;
        try {
          await navigator.clipboard.writeText(JSON.stringify(current));
          if (payload === current) status.textContent = 'Retorno copiado. Use somente no gestor VINILFORTE. A conexão ainda precisa ser concluída no serviço local.';
        } catch {
          if (payload === current) status.textContent = 'O navegador não permitiu copiar. Permita o acesso à área de transferência e tente novamente.';
        } finally { copy.disabled = false; }
      });
      clear.addEventListener('click', () => wipe('Retorno removido desta tela. Se já copiou, o conteúdo da área de transferência permanece sob seu controle.'));
      expiration = setTimeout(() => wipe('O retorno foi removido desta tela por segurança. Se necessário, inicie uma nova autorização pelo gestor.'), 5 * 60 * 1000);
    }
    window.addEventListener('pagehide', () => { payload = null; clearTimeout(expiration); }, { once: true });
    window.addEventListener('pageshow', event => {
      if (event.persisted) wipe('Inicie uma nova autorização pelo gestor. O retorno anterior não foi mantido.');
    });
  }, { once: true });
})();
