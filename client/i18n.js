/**
 * Equity Mixed Assets — shared i18n
 * Language is stored in localStorage key: ema_lang
 */
(function (global) {
  var STORAGE_KEY = 'ema_lang';

  var LANGS = [
    { code: 'en', name: 'English', native: 'English', dir: 'ltr' },
    { code: 'ar', name: 'Arabic', native: '\u0627\u0644\u0639\u0631\u0628\u064A\u0629', dir: 'rtl' },
    { code: 'fr', name: 'French', native: 'Fran\u00e7ais', dir: 'ltr' },
    { code: 'es', name: 'Spanish', native: 'Espa\u00f1ol', dir: 'ltr' },
    { code: 'pt', name: 'Portuguese', native: 'Portugu\u00eas', dir: 'ltr' },
    { code: 'de', name: 'German', native: 'Deutsch', dir: 'ltr' },
    { code: 'zh', name: 'Chinese', native: '\u4e2d\u6587', dir: 'ltr' },
    { code: 'hi', name: 'Hindi', native: '\u0939\u093f\u0928\u094d\u0926\u0940', dir: 'ltr' },
    { code: 'tr', name: 'Turkish', native: 'T\u00fcrk\u00e7e', dir: 'ltr' },
    { code: 'ru', name: 'Russian', native: '\u0420\u0443\u0441\u0441\u043a\u0438\u0439', dir: 'ltr' },
    { code: 'ur', name: 'Urdu', native: '\u0627\u0631\u062f\u0648', dir: 'rtl' },
    { code: 'ha', name: 'Hausa', native: 'Hausa', dir: 'ltr' },
    { code: 'sw', name: 'Swahili', native: 'Kiswahili', dir: 'ltr' },
    { code: 'id', name: 'Indonesian', native: 'Bahasa Indonesia', dir: 'ltr' },
    { code: 'it', name: 'Italian', native: 'Italiano', dir: 'ltr' },
    { code: 'nl', name: 'Dutch', native: 'Nederlands', dir: 'ltr' },
    { code: 'ja', name: 'Japanese', native: '\u65e5\u672c\u8a9e', dir: 'ltr' },
    { code: 'ko', name: 'Korean', native: '\ud55c\uad6d\uc5b4', dir: 'ltr' }
  ];

  var BASE = {
    home: 'Home', plans: 'Plans', deposit: 'Deposit', settings: 'Settings',
    back: 'Back', save: 'Save', cancel: 'Cancel', edit: 'Edit', logout: 'Log Out',
    session: 'Session', language: 'Language',
    language_hint: 'Choose your preferred app language. Arabic and Urdu use right-to-left layout.',
    language_saved: 'Language saved',
    my_profile: 'My Profile', edit_profile: 'Edit Profile', profile_setup: 'Profile Setup',
    username: 'Username', transfer_pin: 'Transfer PIN', edit_pin: 'Edit PIN',
    save_profile: 'Save Profile', save_pin: 'Save Transfer PIN',
    status: 'Status', locked: 'Locked', not_set: 'Not set', required: 'Required',
    active_profile: 'Active Profile', no_username: 'No username',
    pin_hint: 'Required when sending money. Locked until you edit.',
    pin_edit_hint: 'Min 4 characters. Keep it private.',
    current_pin: 'Current PIN', new_pin: 'New PIN', confirm_pin: 'Confirm New PIN',
    dashboard: 'Dashboard', investment_plans: 'Investment Plans', deposit_funds: 'Deposit Funds',
    send_money: 'Send Money', spin_win: 'Spin & Win', trading: 'Trading',
    history: 'History', red_black: 'Red / Black', horse_racing: 'Horse Racing',
    withdraw: 'Withdraw', customer_care: 'Customer Care',
    total_balance: 'Total Account Balance', welcome: 'Welcome',
    pay_installment: 'Pay Next Installment', withdraw_to_main: 'Withdraw to Main Balance',
    from_balance: 'From Main Balance', deposit_new: 'Deposit New',
    select_payment: 'Select Payment Method', bitcoin: 'Pay through Bitcoin',
    giftcard: 'Upload Gift Card', bank: 'Bank Transfer', custom_payment: 'Request Custom Payment',
    users: 'Users', profile: 'Profile', display_name: 'Display name', email: 'Email',
    change_photo: 'Change photo', save_profile_admin: 'Save profile', admin_settings: 'Settings',
    login_title: 'Client Portal Login', login_subtitle: 'Access your investment dashboard',
    password: 'Password', log_in: 'Log In', no_account: "Don't have an account?", sign_up: 'Sign up',
    create_account: 'Create Account', signup_subtitle: 'Join our institutional portfolio network',
    full_name: 'Full Name', referral_code: 'Referral Code (Optional)',
    have_account: 'Already have an account?', log_in_here: 'Log in here'
  };

  var T = {
    en: BASE,
    ar: Object.assign({}, BASE, {
      home: '\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629', plans: '\u0627\u0644\u062E\u0637\u0637', deposit: '\u0625\u064A\u062F\u0627\u0639', settings: '\u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A',
      back: '\u0631\u062C\u0648\u0639', save: '\u062D\u0641\u0638', cancel: '\u0625\u0644\u063A\u0627\u0621', edit: '\u062A\u0639\u062F\u064A\u0644', logout: '\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062E\u0631\u0648\u062C',
      language: '\u0627\u0644\u0644\u063A\u0629', language_saved: '\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0644\u063A\u0629',
      login_title: '\u062A\u0633\u062C\u064A\u0644 \u062F\u062E\u0648\u0644 \u0627\u0644\u0639\u0645\u064A\u0644',
      login_subtitle: '\u0627\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0644\u0648\u062D\u0629 \u0627\u0644\u0627\u0633\u062A\u062B\u0645\u0627\u0631',
      password: '\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631', log_in: '\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644',
      no_account: '\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u062D\u0633\u0627\u0628\u061F', sign_up: '\u0625\u0646\u0634\u0627\u0621 \u062D\u0633\u0627\u0628',
      create_account: '\u0625\u0646\u0634\u0627\u0621 \u062D\u0633\u0627\u0628',
      signup_subtitle: '\u0627\u0646\u0636\u0645 \u0625\u0644\u0649 \u0634\u0628\u0643\u0629 \u0627\u0644\u0645\u062D\u0641\u0638\u0629',
      full_name: '\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644',
      referral_code: '\u0631\u0645\u0632 \u0627\u0644\u0625\u062D\u0627\u0644\u0629 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)',
      have_account: '\u0644\u062F\u064A\u0643 \u062D\u0633\u0627\u0628\u061F', log_in_here: '\u0633\u062C\u0644 \u0627\u0644\u062F\u062E\u0648\u0644 \u0647\u0646\u0627',
      email: '\u0627\u0644\u0628\u0631\u064A\u062F', dashboard: '\u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0643\u0645',
      investment_plans: '\u062E\u0637\u0637 \u0627\u0644\u0627\u0633\u062A\u062B\u0645\u0627\u0631', deposit_funds: '\u0625\u064A\u062F\u0627\u0639 \u0623\u0645\u0648\u0627\u0644',
      send_money: '\u0625\u0631\u0633\u0627\u0644 \u0623\u0645\u0648\u0627\u0644', spin_win: '\u062F\u0648\u0631 \u0648\u0627\u0631\u0628\u062D', trading: '\u062A\u062F\u0627\u0648\u0644',
      history: '\u0627\u0644\u0633\u062C\u0644', red_black: '\u0623\u062D\u0645\u0631 / \u0623\u0633\u0648\u062F', horse_racing: '\u0633\u0628\u0627\u0642 \u0627\u0644\u062E\u064A\u0644',
      withdraw: '\u0633\u062D\u0628', select_payment: '\u0627\u062E\u062A\u0631 \u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u062F\u0641\u0639',
      bitcoin: '\u0627\u0644\u062F\u0641\u0639 \u0628\u0627\u0644\u0628\u064A\u062A\u0643\u0648\u064A\u0646', giftcard: '\u0631\u0641\u0639 \u0628\u0637\u0627\u0642\u0629 \u0647\u062F\u064A\u0629',
      bank: '\u062A\u062D\u0648\u064A\u0644 \u0628\u0646\u0643\u064A', custom_payment: '\u0637\u0644\u0628 \u062F\u0641\u0639 \u0645\u062E\u0635\u0635'
    }),
    fr: Object.assign({}, BASE, {
      home: 'Accueil', plans: 'Plans', deposit: 'D\u00e9p\u00f4t', settings: 'Param\u00e8tres',
      language: 'Langue', log_in: 'Connexion', create_account: 'Cr\u00e9er un compte',
      login_title: 'Connexion client', password: 'Mot de passe', email: 'E-mail',
      no_account: "Pas de compte ?", sign_up: "S'inscrire", full_name: 'Nom complet',
      have_account: 'D\u00e9j\u00e0 un compte ?', log_in_here: 'Connectez-vous',
      back: 'Retour', select_payment: 'Choisir le mode de paiement'
    }),
    es: Object.assign({}, BASE, {
      home: 'Inicio', plans: 'Planes', deposit: 'Dep\u00f3sito', settings: 'Ajustes',
      language: 'Idioma', log_in: 'Iniciar sesi\u00f3n', create_account: 'Crear cuenta',
      login_title: 'Portal del cliente', password: 'Contrase\u00f1a', email: 'Correo',
      no_account: '\u00bfNo tienes cuenta?', sign_up: 'Reg\u00edstrate', full_name: 'Nombre completo',
      have_account: '\u00bfYa tienes cuenta?', log_in_here: 'Inicia sesi\u00f3n aqu\u00ed',
      back: 'Atr\u00e1s', select_payment: 'Seleccionar m\u00e9todo de pago'
    }),
    pt: Object.assign({}, BASE, {
      home: 'In\u00edcio', plans: 'Planos', deposit: 'Dep\u00f3sito', settings: 'Defini\u00e7\u00f5es',
      language: 'Idioma', log_in: 'Entrar', create_account: 'Criar conta',
      login_title: 'Portal do cliente', password: 'Palavra-passe', email: 'E-mail',
      no_account: 'N\u00e3o tem conta?', sign_up: 'Registar', full_name: 'Nome completo',
      have_account: 'J\u00e1 tem conta?', log_in_here: 'Entrar aqui', back: 'Voltar'
    }),
    de: Object.assign({}, BASE, {
      home: 'Start', plans: 'Pl\u00e4ne', deposit: 'Einzahlung', settings: 'Einstellungen',
      language: 'Sprache', log_in: 'Anmelden', create_account: 'Konto erstellen',
      login_title: 'Kundenportal', password: 'Passwort', email: 'E-Mail',
      no_account: 'Kein Konto?', sign_up: 'Registrieren', full_name: 'Vollst\u00e4ndiger Name',
      have_account: 'Bereits ein Konto?', log_in_here: 'Hier anmelden', back: 'Zur\u00fcck'
    }),
    zh: Object.assign({}, BASE, {
      home: '\u9996\u9875', plans: '\u8ba1\u5212', deposit: '\u5b58\u5165', settings: '\u8bbe\u7f6e',
      language: '\u8bed\u8a00', log_in: '\u767b\u5f55', create_account: '\u521b\u5efa\u8d26\u6237',
      login_title: '\u5ba2\u6237\u7aef\u767b\u5f55', password: '\u5bc6\u7801', email: '\u90ae\u7bb1',
      no_account: '\u6ca1\u6709\u8d26\u6237\uff1f', sign_up: '\u6ce8\u518c', full_name: '\u59d3\u540d',
      have_account: '\u5df2\u6709\u8d26\u6237\uff1f', log_in_here: '\u5728\u6b64\u767b\u5f55', back: '\u8fd4\u56de'
    }),
    hi: Object.assign({}, BASE, { language: '\u092d\u093e\u0937\u093e', log_in: '\u0932\u0949\u0917 \u0907\u0928', create_account: '\u0916\u093e\u0924\u093e \u092c\u0928\u093e\u090f\u0901', password: '\u092a\u093e\u0938\u0935\u0930\u094d\u0921', email: '\u0908\u092e\u0947\u0932' }),
    tr: Object.assign({}, BASE, { language: 'Dil', log_in: 'Giri\u015f', create_account: 'Hesap olu\u015ftur', password: '\u015eifre', email: 'E-posta' }),
    ru: Object.assign({}, BASE, { language: '\u042f\u0437\u044b\u043a', log_in: '\u0412\u043e\u0439\u0442\u0438', create_account: '\u0421\u043e\u0437\u0434\u0430\u0442\u044c \u0430\u043a\u043a\u0430\u0443\u043d\u0442', password: '\u041f\u0430\u0440\u043e\u043b\u044c', email: '\u041f\u043e\u0447\u0442\u0430' }),
    ur: Object.assign({}, BASE, { language: '\u0632\u0628\u0627\u0646', log_in: '\u0644\u0627\u06AF \u0627\u0646', create_account: '\u062D\u0633\u0627\u0628 \u0628\u0646\u0627\u0626\u06CC\u06BA', password: '\u067E\u0627\u0633 \u0648\u0631\u0688', email: '\u0627\u06CC \u0645\u06CC\u0644' }),
    ha: Object.assign({}, BASE, { language: 'Harshe', log_in: 'Shiga', create_account: '\u0198ir\u0199iri asusu', password: 'Kalmar sirri', email: 'Imel' }),
    sw: Object.assign({}, BASE, { language: 'Lugha', log_in: 'Ingia', create_account: 'Fungua akaunti', password: 'Nenosiri', email: 'Barua pepe' }),
    id: Object.assign({}, BASE, { language: 'Bahasa', log_in: 'Masuk', create_account: 'Buat akun', password: 'Kata sandi', email: 'Email' }),
    it: Object.assign({}, BASE, { language: 'Lingua', log_in: 'Accedi', create_account: 'Crea account', password: 'Password', email: 'Email' }),
    nl: Object.assign({}, BASE, { language: 'Taal', log_in: 'Inloggen', create_account: 'Account aanmaken', password: 'Wachtwoord', email: 'E-mail' }),
    ja: Object.assign({}, BASE, { language: '\u8a00\u8a9e', log_in: '\u30ed\u30b0\u30a4\u30f3', create_account: '\u30a2\u30ab\u30a6\u30f3\u30c8\u4f5c\u6210', password: '\u30d1\u30b9\u30ef\u30fc\u30c9', email: '\u30e1\u30fc\u30eb' }),
    ko: Object.assign({}, BASE, { language: '\uc5b8\uc5b4', log_in: '\ub85c\uadf8\uc778', create_account: '\uacc4\uc815 \uc0dd\uc131', password: '\ube44\ubc00\ubc88\ud638', email: '\uc774\uba54\uc77c' })
  };

  function dict(code) { return T[code] || T.en; }
  function getLang() {
    try {
      var c = localStorage.getItem(STORAGE_KEY) || 'en';
      if (!LANGS.some(function (l) { return l.code === c; })) return 'en';
      return c;
    } catch (e) { return 'en'; }
  }
  function langMeta(code) {
    for (var i = 0; i < LANGS.length; i++) if (LANGS[i].code === code) return LANGS[i];
    return LANGS[0];
  }
  function t(key) {
    var d = dict(getLang());
    if (d[key] != null) return d[key];
    if (T.en[key] != null) return T.en[key];
    return key;
  }
  function applyDir(code) {
    var meta = langMeta(code);
    try {
      document.documentElement.lang = code;
      document.documentElement.dir = meta.dir || 'ltr';
      if (document.body) document.body.dir = meta.dir || 'ltr';
    } catch (e) {}
  }
  function applyPage() {
    var code = getLang();
    applyDir(code);
    try {
      document.querySelectorAll('[data-i18n]').forEach(function (el) {
        var key = el.getAttribute('data-i18n');
        if (!key) return;
        var val = t(key);
        if (val === key) return;
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') return;
        el.textContent = val;
      });
      document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
        var key = el.getAttribute('data-i18n-placeholder');
        if (key) el.setAttribute('placeholder', t(key));
      });
      document.querySelectorAll('[data-i18n-title]').forEach(function (el) {
        var key = el.getAttribute('data-i18n-title');
        if (key) el.setAttribute('title', t(key));
      });
    } catch (e) {}
  }
  function setLang(code) {
    if (!LANGS.some(function (l) { return l.code === code; })) code = 'en';
    try { localStorage.setItem(STORAGE_KEY, code); } catch (e) {}
    applyPage();
    return code;
  }
  function fillSelect(selectEl) {
    if (!selectEl) return;
    var cur = getLang();
    selectEl.innerHTML = '';
    LANGS.forEach(function (l) {
      var opt = document.createElement('option');
      opt.value = l.code;
      opt.textContent = l.native + ' (' + l.name + ')';
      if (l.code === cur) opt.selected = true;
      selectEl.appendChild(opt);
    });
  }
  function boot() { applyPage(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();

  global.EMA_I18N = { LANGS: LANGS, t: t, getLang: getLang, setLang: setLang, applyPage: applyPage, fillSelect: fillSelect };
})(window);
