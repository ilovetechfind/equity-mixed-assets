const SUPABASE_URL = "https://rrdddtmqojyheshznrwl.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJyZGRkdG1xb2p5aGVzaHpucndsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYyODUxNjEsImV4cCI6MjEwMTg2MTE2MX0.0Gp4-6D-TKBMgvHYZhKncfyfcWRTGd2oeSzpJGUg8vQ";

if (!window.client) {
  window.client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storage: window.localStorage
    }
  });
}

window.requireAuth = async function requireAuth(redirectTo) {
  redirectTo = redirectTo || 'index.html';
  try {
    const { data: { session } } = await window.client.auth.getSession();
    if (session && session.user) return session.user;
    const { data: { user } } = await window.client.auth.getUser();
    if (user) return user;
  } catch (e) {
    console.warn('auth check:', e);
  }
  window.location.href = redirectTo;
  return null;
};

window.goTo = function goTo(page) {
  try {
    const id = new URLSearchParams(window.location.search).get('id');
    if (id && page && !page.includes('?')) {
      window.location.href = page + '?id=' + encodeURIComponent(id);
      return;
    }
  } catch (e) {}
  window.location.href = page;
};

(function setupTransferToasts() {
  function ensureToastEl() {
    let el = document.getElementById('ema-transfer-toast');
    if (el) return el;
    el = document.createElement('div');
    el.id = 'ema-transfer-toast';
    el.style.cssText = 'position:fixed;top:18px;left:50%;transform:translateX(-50%);z-index:99999;display:none;max-width:92%;padding:12px 16px;border-radius:14px;background:#0f172a;border:1px solid #10b981;color:#34d399;font-family:system-ui,-apple-system,sans-serif;font-weight:700;font-size:0.88rem;box-shadow:0 10px 30px rgba(0,0,0,0.45);text-align:center;';
    document.body.appendChild(el);
    return el;
  }

  function showToast(text) {
    const el = ensureToastEl();
    el.textContent = text;
    el.style.display = 'block';
    clearTimeout(el._hide);
    el._hide = setTimeout(function () { el.style.display = 'none'; }, 4500);
  }

  function parseMsg(message) {
    try {
      const j = JSON.parse(message);
      if (j && j.dir === 'recv' && j.amount != null) {
        return '💰 @' + (j.other || 'Someone') + ' sent you $' + Number(j.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      }
      if (j && j.text) return j.text;
    } catch (e) {}
    return message || 'You received a transfer';
  }

  async function pollOnce() {
    try {
      if (!window.client || !window.supabase) return;
      const { data: { session } } = await window.client.auth.getSession();
      const user = session && session.user;
      if (!user) return;

      const seenKey = 'transfer_toast_seen_' + user.id;
      let seen = [];
      try { seen = JSON.parse(localStorage.getItem(seenKey) || '[]'); } catch (e) {}

      const { data } = await window.client
        .from('notifications')
        .select('id, message, created_at, type')
        .eq('user_id', user.id)
        .eq('type', 'transfer_received')
        .order('created_at', { ascending: false })
        .limit(5);

      if (!data || !data.length) return;

      const now = Date.now();
      data.forEach(function (n) {
        const id = String(n.id);
        if (seen.indexOf(id) !== -1) return;
        const t = n.created_at ? new Date(n.created_at).getTime() : 0;
        if (now - t > 120000) {
          seen.push(id);
          return;
        }
        seen.push(id);
        showToast(parseMsg(n.message));
      });

      localStorage.setItem(seenKey, JSON.stringify(seen.slice(-40)));
    } catch (e) {}
  }

  function start() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', start);
      return;
    }
    pollOnce();
    setInterval(pollOnce, 12000);
  }
  start();
})();
