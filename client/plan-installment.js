/**
 * Shared installment payment for all plan pages.
 * Intercepts #client-btn-invest → modal: From Main Balance | Deposit New
 * Requires: window.client, PLAN_ID (set on page), optional targetUserId
 */
(function () {
  function money(n) {
    return Number(n).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function parseMoney(text) {
    if (text == null) return 0;
    var m = String(text).replace(/[^0-9.]/g, '');
    var n = parseFloat(m);
    return isNaN(n) ? 0 : n;
  }

  function fmtUsd(n) {
    return '$' + Number(n).toLocaleString('en-US', { maximumFractionDigits: 0 });
  }

  function getInstallmentAmount() {
    var btnText = document.getElementById('client-btn-text');
    if (btnText) {
      var fromBtn = parseMoney(btnText.textContent);
      if (fromBtn > 0) return fromBtn;
    }
    var rem = document.getElementById('client-remaining');
    if (rem) {
      var fromRem = parseMoney(rem.textContent);
      if (fromRem > 0) return fromRem;
    }
    return 0;
  }

  function parsePaidHeader() {
    var el = document.getElementById('client-paid-volume-header');
    var text = el ? el.textContent : '';
    // e.g. "$140,000 / $200,000 Paid"
    var parts = String(text).match(/\$?([\d,]+(?:\.\d+)?)\s*\/\s*\$?([\d,]+(?:\.\d+)?)/);
    if (parts) {
      return { paid: parseMoney(parts[1]), total: parseMoney(parts[2]) };
    }
    var goalEl = document.getElementById('client-total-goal');
    var total = goalEl ? parseMoney(goalEl.textContent) : 0;
    var remEl = document.getElementById('client-remaining');
    var rem = remEl ? parseMoney(remEl.textContent) : 0;
    return { paid: Math.max(0, total - rem), total: total };
  }

  function ensureModal() {
    if (document.getElementById('ema-install-modal')) return;

    var style = document.createElement('style');
    style.textContent =
      '#ema-install-modal{display:none;position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,0.75);' +
      'align-items:center;justify-content:center;padding:20px;font-family:system-ui,-apple-system,sans-serif}' +
      '#ema-install-modal.show{display:flex}' +
      '#ema-install-modal .box{background:#0f172a;border:1px solid rgba(255,255,255,0.1);border-radius:18px;' +
      'padding:22px;width:100%;max-width:360px;color:#fff}' +
      '#ema-install-modal h3{margin:0 0 6px;font-size:1.15rem;font-weight:800}' +
      '#ema-install-modal p{margin:0 0 16px;color:#94a3b8;font-size:0.88rem;line-height:1.4}' +
      '#ema-install-modal .opt{display:block;width:100%;border:none;border-radius:14px;padding:14px;margin-bottom:10px;' +
      'font-weight:700;font-size:0.95rem;cursor:pointer;text-align:left}' +
      '#ema-install-modal .opt-bal{background:linear-gradient(135deg,#10b981,#059669);color:#fff}' +
      '#ema-install-modal .opt-dep{background:linear-gradient(135deg,#3b82f6,#1d4ed8);color:#fff}' +
      '#ema-install-modal .opt-cancel{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:#e2e8f0}' +
      '#ema-install-modal .sub{display:block;font-size:0.75rem;font-weight:500;opacity:0.85;margin-top:4px}' +
      '#ema-install-toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);z-index:100000;' +
      'display:none;max-width:90%;padding:12px 18px;border-radius:12px;background:#1e293b;border:1px solid #10b981;' +
      'color:#34d399;font-weight:600;font-size:0.88rem;text-align:center}';
    document.head.appendChild(style);

    var modal = document.createElement('div');
    modal.id = 'ema-install-modal';
    modal.innerHTML =
      '<div class="box">' +
      '<h3>Pay Next Installment</h3>' +
      '<p id="ema-install-desc">Choose how to pay this installment.</p>' +
      '<button type="button" class="opt opt-bal" id="ema-opt-balance">' +
      'Pay from Main Balance<span class="sub" id="ema-opt-bal-sub">Use available account balance</span></button>' +
      '<button type="button" class="opt opt-dep" id="ema-opt-deposit">' +
      'Deposit New<span class="sub">Bitcoin, gift card, bank, or custom</span></button>' +
      '<button type="button" class="opt opt-cancel" id="ema-opt-cancel">Cancel</button>' +
      '</div>';
    document.body.appendChild(modal);

    var toast = document.createElement('div');
    toast.id = 'ema-install-toast';
    document.body.appendChild(toast);

    document.getElementById('ema-opt-cancel').onclick = closeModal;
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });
    document.getElementById('ema-opt-deposit').onclick = function () {
      closeModal();
      var id = (typeof targetUserId !== 'undefined' && targetUserId) ? targetUserId : '';
      window.location.href = id ? ('deposit.html?id=' + encodeURIComponent(id)) : 'deposit.html';
    };
    document.getElementById('ema-opt-balance').onclick = payFromBalance;
  }

  function showToast(msg, isErr) {
    var t = document.getElementById('ema-install-toast');
    if (!t) return;
    t.textContent = msg;
    t.style.borderColor = isErr ? '#ef4444' : '#10b981';
    t.style.color = isErr ? '#fca5a5' : '#34d399';
    t.style.display = 'block';
    clearTimeout(t._h);
    t._h = setTimeout(function () { t.style.display = 'none'; }, 3200);
  }

  function openModal() {
    ensureModal();
    var amt = getInstallmentAmount();
    var desc = document.getElementById('ema-install-desc');
    var sub = document.getElementById('ema-opt-bal-sub');
    if (amt > 0) {
      desc.textContent = 'Installment due: $' + money(amt) + '. Pay from your main balance or deposit new funds.';
      sub.textContent = 'Deduct $' + money(amt) + ' from main balance';
    } else {
      desc.textContent = 'Choose how to pay this installment.';
      sub.textContent = 'Use available account balance';
    }
    document.getElementById('ema-install-modal').classList.add('show');
  }

  function closeModal() {
    var m = document.getElementById('ema-install-modal');
    if (m) m.classList.remove('show');
  }

  async function resolveUserId() {
    if (typeof targetUserId !== 'undefined' && targetUserId) return targetUserId;
    try {
      if (!window.client) return null;
      var s = await window.client.auth.getSession();
      var u = s.data && s.data.session && s.data.session.user;
      if (u) return u.id;
      var g = await window.client.auth.getUser();
      return g.data && g.data.user && g.data.user.id;
    } catch (e) {
      return null;
    }
  }

  async function payFromBalance() {
    var amt = getInstallmentAmount();
    if (!(amt > 0)) {
      showToast('No installment amount found', true);
      return;
    }
    if (typeof PLAN_ID === 'undefined' || !PLAN_ID) {
      showToast('Plan not identified', true);
      return;
    }
    if (!window.client) {
      showToast('Not connected', true);
      return;
    }

    var btn = document.getElementById('ema-opt-balance');
    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Processing…';
    }

    try {
      var uid = await resolveUserId();
      if (!uid) throw new Error('Please log in again');

      var profRes = await window.client.from('profiles').select('balance').eq('id', uid).maybeSingle();
      if (profRes.error) throw profRes.error;
      var bal = Number(profRes.data && profRes.data.balance || 0);
      if (bal < amt) {
        showToast('Insufficient main balance ($' + money(bal) + '). Deposit first.', true);
        closeModal();
        return;
      }

      var newBal = Math.round((bal - amt) * 100) / 100;
      var upBal = await window.client.from('profiles').update({ balance: newBal }).eq('id', uid);
      if (upBal.error) throw upBal.error;

      var vol = parsePaidHeader();
      var newPaid = Math.round((vol.paid + amt) * 100) / 100;
      var total = vol.total > 0 ? vol.total : newPaid;
      var newRem = Math.max(0, Math.round((total - newPaid) * 100) / 100);
      // if remaining on screen was the installment only and total unknown, reduce remaining
      var remEl = document.getElementById('client-remaining');
      var screenRem = remEl ? parseMoney(remEl.textContent) : 0;
      if (vol.total <= 0 && screenRem > 0) {
        newRem = Math.max(0, Math.round((screenRem - amt) * 100) / 100);
        total = newPaid + newRem;
      }
      var progress = total > 0 ? Math.min(100, Math.round((newPaid / total) * 100)) : 100;

      var paidText = fmtUsd(newPaid) + ' / ' + fmtUsd(total) + ' Paid';
      var remText = fmtUsd(newRem);
      var btnText = newRem > 0
        ? ('Pay Next Installment (' + fmtUsd(newRem) + ')')
        : 'Installments Complete';

      var planUpdate = {
        paid_volume_text: paidText,
        remaining_balance: remText,
        progress_percent: progress,
        installment_button_text: btnText
      };

      var planRes = await window.client
        .from('plan_configs')
        .update(planUpdate)
        .eq('user_id', uid)
        .eq('plan_id', PLAN_ID);

      // If no row, try upsert-ish: ignore and still update UI + local note
      if (planRes.error) {
        console.warn('plan_configs update', planRes.error);
      }

      // Update UI live
      if (document.getElementById('client-paid-volume-header')) {
        document.getElementById('client-paid-volume-header').innerText = paidText;
      }
      if (document.getElementById('client-remaining')) {
        document.getElementById('client-remaining').innerText = remText;
      }
      if (document.getElementById('client-progress-fill')) {
        document.getElementById('client-progress-fill').style.width = progress + '%';
      }
      if (document.getElementById('client-btn-text')) {
        document.getElementById('client-btn-text').innerText = btnText;
      }

      // local backup of last payment
      try {
        var key = 'plan_install_payments_' + uid + '_' + PLAN_ID;
        var hist = JSON.parse(localStorage.getItem(key) || '[]');
        hist.unshift({ amount: amt, ts: Date.now(), remaining: newRem, paid: newPaid });
        localStorage.setItem(key, JSON.stringify(hist.slice(0, 40)));
      } catch (e) {}

      closeModal();
      showToast('Paid $' + money(amt) + ' from main balance');
    } catch (err) {
      console.error(err);
      showToast(err.message || 'Payment failed', true);
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = 'Pay from Main Balance<span class="sub" id="ema-opt-bal-sub">Use available account balance</span>';
      }
    }
  }

  function wire() {
    var btn = document.getElementById('client-btn-invest');
    if (!btn) return;
    // stop plain navigation to deposit
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      openModal();
    });
    // also neutralize href so middle-click etc. is less confusing
    if (btn.tagName === 'A') {
      btn.setAttribute('href', '#');
      btn.setAttribute('role', 'button');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      ensureModal();
      wire();
    });
  } else {
    ensureModal();
    wire();
  }
})();
