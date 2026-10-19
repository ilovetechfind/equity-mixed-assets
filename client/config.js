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

/**
 * Global toast: when someone sends you money, show on ANY page that loads config.js
 * Uses profiles.last_incoming (JSON) so it works even if notifications RLS blocks cross-user inserts.
 */
(function setupTransferToasts() {
  var started = false;

  function ensureToastEl() {
    var el = document.getElementById('ema-transfer-toast');
    if (el) return el;
    el = document.createElement('div');
    el.id = 'ema-transfer-toast';
    el.setAttribute('role', 'status');
    el.style.cssText =
      'position:fixed;top:16px;left:50%;transform:translateX(-50%);z-index:2147483647;' +
      'display:none;max-width:92%;min-width:220px;padding:14px 18px;border-radius:14px;' +
      'background:#0f172a;border:1px solid #10b981;color:#34d399;' +
      'font-family:system-ui,-apple-system,BlinkMacSystemFont,sans-serif;' +
      'font-weight:700;font-size:0.9rem;box-shadow:0 12px 40px rgba(0,0,0,0.55);' +
      'text-align:center;line-height:1.35;pointer-events:none;';
    (document.body || document.documentElement).appendChild(el);
    return el;
  }

  function showToast(text) {
    try {
      var el = ensureToastEl();
      el.textContent = text;
      el.style.display = 'block';
      clearTimeout(el._hide);
      el._hide = setTimeout(function () {
        el.style.display = 'none';
      }, 5000);
    } catch (e) {}
  }

  function fmt(n) {
    return Number(n).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function seenKey(uid) {
    return 'transfer_toast_seen_v2_' + uid;
  }

  function getSeen(uid) {
    try {
      return JSON.parse(localStorage.getItem(seenKey(uid)) || '[]');
    } catch (e) {
      return [];
    }
  }

  function markSeen(uid, id) {
    var seen = getSeen(uid);
    if (seen.indexOf(id) === -1) seen.push(id);
    localStorage.setItem(seenKey(uid), JSON.stringify(seen.slice(-50)));
  }

  async function pollOnce() {
    try {
      if (!window.client) return;
      var sessionRes = await window.client.auth.getSession();
      var user = sessionRes.data && sessionRes.data.session && sessionRes.data.session.user;
      if (!user) return;

      // 1) last_incoming on profiles (reliable path)
      var prof = await window.client
        .from('profiles')
        .select('last_incoming')
        .eq('id', user.id)
        .maybeSingle();

      var li = prof.data && prof.data.last_incoming;
      if (li && typeof li === 'object') {
        var lid = String(li.at || li.ts || '') + '_' + String(li.amount || '') + '_' + String(li.from || '');
        var seen = getSeen(user.id);
        var age = Date.now() - Number(li.at || li.ts || 0);
        // show if within last 10 minutes and not seen
        if (lid && seen.indexOf(lid) === -1 && age >= 0 && age < 10 * 60 * 1000) {
          markSeen(user.id, lid);
          var who = li.from || li.other || 'Someone';
          showToast('💰 @' + who + ' sent you $' + fmt(li.amount || 0));
        }
      }

      // 2) notifications fallback
      try {
        var notif = await window.client
          .from('notifications')
          .select('id, message, created_at, type')
          .eq('user_id', user.id)
          .eq('type', 'transfer_received')
          .order('created_at', { ascending: false })
          .limit(5);

        if (notif.data && notif.data.length) {
          var now = Date.now();
          var seen2 = getSeen(user.id);
          notif.data.forEach(function (n) {
            var id = 'n_' + String(n.id);
            if (seen2.indexOf(id) !== -1) return;
            var t = n.created_at ? new Date(n.created_at).getTime() : 0;
            if (now - t > 10 * 60 * 1000) {
              markSeen(user.id, id);
              return;
            }
            markSeen(user.id, id);
            var text = 'You received a transfer';
            try {
              var j = JSON.parse(n.message);
              if (j && j.amount != null) {
                text = '💰 @' + (j.other || 'Someone') + ' sent you $' + fmt(j.amount);
              } else if (j && j.text) text = j.text;
            } catch (e2) {
              if (n.message) text = n.message;
            }
            showToast(text);
          });
        }
      } catch (e3) {}
    } catch (e) {}
  }

  function start() {
    if (started) return;
    started = true;
    // wait for body
    if (!document.body) {
      document.addEventListener('DOMContentLoaded', function () {
        pollOnce();
        setInterval(pollOnce, 8000);
      });
      return;
    }
    pollOnce();
    setInterval(pollOnce, 8000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
