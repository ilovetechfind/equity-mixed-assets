const SUPABASE_URL = "https://rrdddtmqojyheshznrwl.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJyZGRkdG1xb2p5aGVzaHpucndsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYyODUxNjEsImV4cCI6MjEwMTg2MTE2MX0.0Gp4-6D-TKBMgvHYZhKncfyfcWRTGd2oeSzpJGUg8vQ";

if (!window.client) {
  window.client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storage: window.localStorage
    },
    realtime: {
      params: { eventsPerSecond: 5 }
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
 * Global incoming-transfer popup on ANY page that includes config.js.
 * 1) profiles.last_incoming (sender name)
 * 2) balance increase vs last known (works even without extra columns)
 * 3) notifications.transfer_received
 * + Realtime profile UPDATE subscription
 */
(function setupTransferToasts() {
  var started = false;
  var lastKnownBalance = null;
  var channel = null;

  function ensureToastEl() {
    var el = document.getElementById('ema-transfer-toast');
    if (el) return el;
    el = document.createElement('div');
    el.id = 'ema-transfer-toast';
    el.setAttribute('role', 'status');
    el.style.cssText =
      'position:fixed;top:18px;left:50%;transform:translateX(-50%);z-index:2147483647;' +
      'display:none;max-width:92%;min-width:240px;padding:14px 18px;border-radius:16px;' +
      'background:linear-gradient(135deg,#0f172a,#134e4a);border:1px solid #10b981;color:#6ee7b7;' +
      'font-family:system-ui,-apple-system,BlinkMacSystemFont,sans-serif;' +
      'font-weight:700;font-size:0.95rem;box-shadow:0 16px 40px rgba(0,0,0,0.55);' +
      'text-align:center;line-height:1.4;pointer-events:none;';
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
      }, 5500);
    } catch (e) {}
  }

  window.emaShowTransferToast = showToast;

  function fmt(n) {
    return Number(n).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function seenKey(uid) {
    return 'ema_toast_seen_v3_' + uid;
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
    try {
      localStorage.setItem(seenKey(uid), JSON.stringify(seen.slice(-60)));
    } catch (e) {}
  }

  function alreadySeen(uid, id) {
    return getSeen(uid).indexOf(id) !== -1;
  }

  function balKey(uid) {
    return 'ema_last_balance_' + uid;
  }

  function handleIncoming(uid, li, balanceNow) {
    if (li && typeof li === 'object' && (li.amount != null || li.from)) {
      var lid = 'li_' + String(li.at || li.ts || '') + '_' + String(li.amount || '') + '_' + String(li.from || '');
      var age = Date.now() - Number(li.at || li.ts || 0);
      if (!alreadySeen(uid, lid) && age >= 0 && age < 15 * 60 * 1000) {
        markSeen(uid, lid);
        var who = li.from || li.other || 'Someone';
        showToast('💰 @' + who + ' sent you $' + fmt(li.amount || 0));
        return true;
      }
    }

    if (balanceNow != null && lastKnownBalance != null) {
      var delta = Number(balanceNow) - Number(lastKnownBalance);
      if (delta >= 1) {
        var bid = 'bal_' + String(Math.round(Number(balanceNow) * 100)) + '_' + String(Math.round(delta * 100));
        if (!alreadySeen(uid, bid)) {
          markSeen(uid, bid);
          showToast('💰 You received $' + fmt(delta));
          return true;
        }
      }
    }
    return false;
  }

  async function getUser() {
    try {
      var s = await window.client.auth.getSession();
      var u = s.data && s.data.session && s.data.session.user;
      if (u) return u;
      var g = await window.client.auth.getUser();
      return g.data && g.data.user;
    } catch (e) {
      return null;
    }
  }

  async function pollOnce() {
    try {
      if (!window.client) return;
      var user = await getUser();
      if (!user) return;

      var data = null;
      var res = await window.client
        .from('profiles')
        .select('balance, last_incoming')
        .eq('id', user.id)
        .maybeSingle();

      if (res.error) {
        res = await window.client
          .from('profiles')
          .select('balance')
          .eq('id', user.id)
          .maybeSingle();
      }
      data = res.data;
      if (!data) return;

      var bal = Number(data.balance || 0);

      if (lastKnownBalance === null) {
        var stored = localStorage.getItem(balKey(user.id));
        if (stored != null && stored !== '') {
          lastKnownBalance = Number(stored);
        } else {
          lastKnownBalance = bal;
        }
      }

      handleIncoming(user.id, data.last_incoming, bal);

      lastKnownBalance = bal;
      try {
        localStorage.setItem(balKey(user.id), String(bal));
      } catch (e) {}

      try {
        var notif = await window.client
          .from('notifications')
          .select('id, message, created_at, type')
          .eq('user_id', user.id)
          .eq('type', 'transfer_received')
          .order('created_at', { ascending: false })
          .limit(3);

        if (notif.data) {
          var now = Date.now();
          notif.data.forEach(function (n) {
            var id = 'n_' + String(n.id);
            if (alreadySeen(user.id, id)) return;
            var t = n.created_at ? new Date(n.created_at).getTime() : 0;
            if (now - t > 15 * 60 * 1000) {
              markSeen(user.id, id);
              return;
            }
            markSeen(user.id, id);
            var text = '💰 You received a transfer';
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
    } catch (e) {
      console.warn('transfer toast poll', e);
    }
  }

  async function startRealtime() {
    try {
      var user = await getUser();
      if (!user || !window.client) return;

      if (channel) {
        try {
          window.client.removeChannel(channel);
        } catch (e) {}
      }

      channel = window.client
        .channel('ema-transfer-toast-' + user.id)
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'profiles',
            filter: 'id=eq.' + user.id
          },
          function (payload) {
            try {
              var row = payload.new || {};
              var bal = Number(row.balance || 0);
              handleIncoming(user.id, row.last_incoming, bal);
              lastKnownBalance = bal;
              try {
                localStorage.setItem(balKey(user.id), String(bal));
              } catch (e) {}
            } catch (e) {}
          }
        )
        .subscribe();
    } catch (e) {
      console.warn('transfer toast realtime', e);
    }
  }

  function start() {
    if (started) return;
    started = true;

    function boot() {
      pollOnce();
      startRealtime();
      setInterval(pollOnce, 5000);
    }

    if (!document.body) {
      document.addEventListener('DOMContentLoaded', boot);
    } else {
      boot();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
