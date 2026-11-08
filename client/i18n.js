/**
 * Equity Mixed Assets — full-app i18n
 * Stores language in localStorage (ema_lang).
 * - data-i18n attributes
 * - Auto-replaces known English UI phrases anywhere in the page
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
    language_hint: 'Choose your preferred app language.',
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
    withdraw: 'Withdraw', customer_care: 'Customer Care', menu: 'Menu',
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
    have_account: 'Already have an account?', log_in_here: 'Log in here',
    select: 'Select', active: 'ACTIVE', current_active_tier: 'CURRENT ACTIVE TIER',
    active_plan_running: 'Active Plan Running', starter_plan: 'Starter Plan',
    bronze_tier: 'Bronze Tier', silver_tier: 'Silver Tier', gold_tier: 'Gold Tier',
    platinum_tier: 'Platinum Tier', diamond_tier: 'Diamond Tier',
    crown_tier: 'Crown Tier', portfolio: 'Equity Mixed Assets Portfolio',
    daily_growth: 'Daily Growth Accrual',
    installment_progress: 'Installment Volume Progress', paid: 'Paid',
    total_investment_goal: 'Total Investment Goal', portfolio_cap: 'Portfolio cap',
    remaining_balance: 'Remaining Balance', installment_balance: 'Installment balance',
    guaranteed_payout: 'Guaranteed Payout Return', maturity_target: 'Maturity target',
    volume_position: 'VOLUME POSITION', withdraw_funds: 'WITHDRAW FUNDS',
    withdraw_funds_btn: 'Withdraw Funds', investment_plan: 'Investment Plan',
    enter_promo: 'Enter Promo Code', enter: 'Enter',
    instant_crypto: 'Instant crypto network deposit',
    submit_card: 'Submit card details & receipt',
    direct_wire: 'Direct wire or local bank deposit',
    alternate_payment: 'Alternate payment arrangements',
    pump_fun: 'Pump.fun'
  };

  // Full Chinese (user actively testing)
  var ZH = Object.assign({}, BASE, {
    home: '\u9996\u9875', plans: '\u8ba1\u5212', deposit: '\u5b58\u5165', settings: '\u8bbe\u7f6e',
    back: '\u8fd4\u56de', save: '\u4fdd\u5b58', cancel: '\u53d6\u6d88', edit: '\u7f16\u8f91', logout: '\u9000\u51fa\u767b\u5f55',
    session: '\u4f1a\u8bdd', language: '\u8bed\u8a00', language_hint: '\u9009\u62e9\u5e94\u7528\u8bed\u8a00\u3002', language_saved: '\u8bed\u8a00\u5df2\u4fdd\u5b58',
    my_profile: '\u6211\u7684\u8d44\u6599', edit_profile: '\u7f16\u8f91\u8d44\u6599', profile_setup: '\u8bbe\u7f6e\u8d44\u6599',
    username: '\u7528\u6237\u540d', transfer_pin: '\u8f6c\u8d26PIN', edit_pin: '\u7f16\u8f91PIN',
    save_profile: '\u4fdd\u5b58\u8d44\u6599', save_pin: '\u4fdd\u5b58PIN',
    status: '\u72b6\u6001', locked: '\u5df2\u9501\u5b9a', not_set: '\u672a\u8bbe\u7f6e', required: '\u5fc5\u9700',
    active_profile: '\u5df2\u6fc0\u6d3b\u8d44\u6599', no_username: '\u65e0\u7528\u6237\u540d',
    pin_hint: '\u53d1\u9001\u8d44\u91d1\u65f6\u9700\u8981\u3002\u9501\u5b9a\u76f4\u5230\u60a8\u7f16\u8f91\u3002',
    pin_edit_hint: '\u81f3\u5c114\u4e2a\u5b57\u7b26\u3002\u8bf7\u4fdd\u5bc6\u3002',
    current_pin: '\u5f53\u524dPIN', new_pin: '\u65b0PIN', confirm_pin: '\u786e\u8ba4PIN',
    dashboard: '\u4eea\u8868\u677f', investment_plans: '\u6295\u8d44\u8ba1\u5212', deposit_funds: '\u5b58\u5165\u8d44\u91d1',
    send_money: '\u53d1\u9001\u8d44\u91d1', spin_win: '\u8f6c\u76d8\u8d62\u5956', trading: '\u4ea4\u6613',
    history: '\u5386\u53f2\u8bb0\u5f55', red_black: '\u7ea2/\u9ed1', horse_racing: '\u8d5b\u9a6c',
    withdraw: '\u63d0\u73b0', customer_care: '\u5ba2\u6237\u670d\u52a1', menu: '\u83dc\u5355',
    total_balance: '\u8d26\u6237\u603b\u4f59\u989d', welcome: '\u6b22\u8fce',
    pay_installment: '\u652f\u4ed8\u4e0b\u4e00\u671f', withdraw_to_main: '\u63d0\u73b0\u81f3\u4e3b\u4f59\u989d',
    from_balance: '\u4ece\u4e3b\u4f59\u989d', deposit_new: '\u65b0\u5b58\u5165',
    select_payment: '\u9009\u62e9\u4ed8\u6b3e\u65b9\u5f0f', bitcoin: '\u6bd4\u7279\u5e01\u652f\u4ed8',
    giftcard: '\u4e0a\u4f20\u793c\u54c1\u5361', bank: '\u94f6\u884c\u8f6c\u8d26', custom_payment: '\u81ea\u5b9a\u4e49\u4ed8\u6b3e',
    email: '\u90ae\u7bb1', password: '\u5bc6\u7801', log_in: '\u767b\u5f55',
    login_title: '\u5ba2\u6237\u7aef\u767b\u5f55', login_subtitle: '\u8bbf\u95ee\u60a8\u7684\u6295\u8d44\u4eea\u8868\u677f',
    create_account: '\u521b\u5efa\u8d26\u6237', signup_subtitle: '\u52a0\u5165\u6211\u4eec\u7684\u6295\u8d44\u7f51\u7edc',
    full_name: '\u59d3\u540d', referral_code: '\u63a8\u8350\u7801\uff08\u53ef\u9009\uff09',
    no_account: '\u6ca1\u6709\u8d26\u6237\uff1f', sign_up: '\u6ce8\u518c',
    have_account: '\u5df2\u6709\u8d26\u6237\uff1f', log_in_here: '\u5728\u6b64\u767b\u5f55',
    select: '\u9009\u62e9', active: '\u6fc0\u6d3b', current_active_tier: '\u5f53\u524d\u6fc0\u6d3b\u7b49\u7ea7',
    active_plan_running: '\u6fc0\u6d3b\u8ba1\u5212\u8fd0\u884c\u4e2d', starter_plan: '\u5165\u95e8\u8ba1\u5212',
    bronze_tier: '\u9752\u94dc\u7b49\u7ea7', silver_tier: '\u767d\u94f6\u7b49\u7ea7', gold_tier: '\u9ec4\u91d1\u7b49\u7ea7',
    platinum_tier: '\u767d\u91d1\u7b49\u7ea7', diamond_tier: '\u94bb\u77f3\u7b49\u7ea7', crown_tier: '\u7687\u51a0\u7b49\u7ea7',
    portfolio: 'Equity Mixed Assets \u6295\u8d44\u7ec4\u5408',
    daily_growth: '\u6bcf\u65e5\u589e\u957f\u8ba1\u63d0',
    installment_progress: '\u5206\u671f\u8fdb\u5ea6', paid: '\u5df2\u4ed8',
    total_investment_goal: '\u603b\u6295\u8d44\u76ee\u6807', portfolio_cap: '\u7ec4\u5408\u4e0a\u9650',
    remaining_balance: '\u5269\u4f59\u4f59\u989d', installment_balance: '\u5206\u671f\u4f59\u989d',
    guaranteed_payout: '\u4fdd\u8bc1\u5151\u4ed8\u6536\u76ca', maturity_target: '\u5230\u671f\u76ee\u6807',
    volume_position: '\u4ed3\u4f4d\u4f53\u79ef', withdraw_funds: '\u63d0\u73b0\u8d44\u91d1',
    withdraw_funds_btn: '\u63d0\u73b0\u8d44\u91d1', investment_plan: '\u6295\u8d44\u8ba1\u5212',
    enter_promo: '\u8f93\u5165\u4fc3\u9500\u7801', enter: '\u786e\u8ba4',
    instant_crypto: '\u5373\u65f6\u52a0\u5bc6\u8d27\u5e01\u7f51\u7edc\u5b58\u5165',
    submit_card: '\u63d0\u4ea4\u5361\u4fe1\u606f\u4e0e\u51ed\u8bc1',
    direct_wire: '\u76f4\u63a5\u7535\u6c47\u6216\u672c\u5730\u94f6\u884c\u5b58\u5165',
    alternate_payment: '\u5176\u4ed6\u4ed8\u6b3e\u5b89\u6392'
  });

  var AR = Object.assign({}, BASE, {
    home: '\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629', plans: '\u0627\u0644\u062E\u0637\u0637', deposit: '\u0625\u064A\u062F\u0627\u0639', settings: '\u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A',
    back: '\u0631\u062C\u0648\u0639', save: '\u062D\u0641\u0638', cancel: '\u0625\u0644\u063A\u0627\u0621', edit: '\u062A\u0639\u062F\u064A\u0644', logout: '\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062E\u0631\u0648\u062C',
    session: '\u0627\u0644\u062C\u0644\u0633\u0629', language: '\u0627\u0644\u0644\u063A\u0629',
    my_profile: '\u0645\u0644\u0641\u064A', edit_profile: '\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0645\u0644\u0641',
    transfer_pin: '\u0631\u0645\u0632 \u0627\u0644\u062A\u062D\u0648\u064A\u0644', edit_pin: '\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0631\u0645\u0632',
    status: '\u0627\u0644\u062D\u0627\u0644\u0629', locked: '\u0645\u0642\u0641\u0644', active_profile: '\u0645\u0644\u0641 \u0646\u0634\u0637',
    pin_hint: '\u0645\u0637\u0644\u0648\u0628 \u0639\u0646\u062F \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0623\u0645\u0648\u0627\u0644.',
    dashboard: '\u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0643\u0645', investment_plans: '\u062E\u0637\u0637 \u0627\u0644\u0627\u0633\u062A\u062B\u0645\u0627\u0631',
    deposit_funds: '\u0625\u064A\u062F\u0627\u0639 \u0623\u0645\u0648\u0627\u0644', send_money: '\u0625\u0631\u0633\u0627\u0644 \u0623\u0645\u0648\u0627\u0644',
    spin_win: '\u062F\u0648\u0631 \u0648\u0627\u0631\u0628\u062D', trading: '\u062A\u062F\u0627\u0648\u0644', history: '\u0627\u0644\u0633\u062C\u0644',
    red_black: '\u0623\u062D\u0645\u0631 / \u0623\u0633\u0648\u062F', horse_racing: '\u0633\u0628\u0627\u0642 \u0627\u0644\u062E\u064A\u0644',
    withdraw: '\u0633\u062D\u0628', menu: '\u0627\u0644\u0642\u0627\u0626\u0645\u0629', select: '\u0627\u062E\u062A\u0631',
    starter_plan: '\u062E\u0637\u0629 \u0627\u0644\u0628\u062F\u0627\u064A\u0629', bronze_tier: '\u0627\u0644\u0628\u0631\u0648\u0646\u0632',
    silver_tier: '\u0627\u0644\u0641\u0636\u0629', gold_tier: '\u0627\u0644\u0630\u0647\u0628', platinum_tier: '\u0627\u0644\u0628\u0644\u0627\u062A\u064A\u0646',
    diamond_tier: '\u0627\u0644\u0645\u0627\u0633', active: '\u0646\u0634\u0637', active_plan_running: '\u0627\u0644\u062E\u0637\u0629 \u0646\u0634\u0637\u0629',
    current_active_tier: '\u0627\u0644\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u0646\u0634\u0637 \u0627\u0644\u062D\u0627\u0644\u064A',
    select_payment: '\u0627\u062E\u062A\u0631 \u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u062F\u0641\u0639',
    email: '\u0627\u0644\u0628\u0631\u064A\u062F', password: '\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631', log_in: '\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644',
    create_account: '\u0625\u0646\u0634\u0627\u0621 \u062D\u0633\u0627\u0628', full_name: '\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644',
    withdraw_funds: '\u0633\u062D\u0628 \u0627\u0644\u0623\u0645\u0648\u0627\u0644', withdraw_funds_btn: '\u0633\u062D\u0628 \u0627\u0644\u0623\u0645\u0648\u0627\u0644',
    investment_plan: '\u062E\u0637\u0629 \u0627\u0633\u062A\u062B\u0645\u0627\u0631'
  });

  function pack(extra) { return Object.assign({}, BASE, extra || {}); }

  var T = {
    en: BASE,
    zh: ZH,
    ar: AR,
    fr: pack({ home: 'Accueil', plans: 'Plans', deposit: 'D\u00e9p\u00f4t', settings: 'Param\u00e8tres', language: 'Langue', logout: 'D\u00e9connexion',
      dashboard: 'Tableau de bord', investment_plans: "Plans d'investissement", deposit_funds: 'D\u00e9poser', send_money: "Envoyer de l'argent",
      spin_win: 'Tourner & gagner', trading: 'Trading', history: 'Historique', red_black: 'Rouge / Noir', horse_racing: 'Courses',
      my_profile: 'Mon profil', edit_profile: 'Modifier le profil', transfer_pin: 'PIN de transfert', edit_pin: 'Modifier le PIN',
      locked: 'Verrouill\u00e9', select: 'S\u00e9lectionner', menu: 'Menu', back: 'Retour', starter_plan: 'Plan D\u00e9butant',
      log_in: 'Connexion', create_account: 'Cr\u00e9er un compte', password: 'Mot de passe', email: 'E-mail' }),
    es: pack({ home: 'Inicio', plans: 'Planes', deposit: 'Dep\u00f3sito', settings: 'Ajustes', language: 'Idioma', logout: 'Cerrar sesi\u00f3n',
      dashboard: 'Panel', investment_plans: 'Planes de inversi\u00f3n', deposit_funds: 'Depositar', send_money: 'Enviar dinero',
      spin_win: 'Girar y ganar', trading: 'Trading', history: 'Historial', my_profile: 'Mi perfil', edit_profile: 'Editar perfil',
      transfer_pin: 'PIN de transferencia', locked: 'Bloqueado', select: 'Seleccionar', menu: 'Men\u00fa', back: 'Atr\u00e1s',
      log_in: 'Iniciar sesi\u00f3n', create_account: 'Crear cuenta', password: 'Contrase\u00f1a', email: 'Correo' }),
    pt: pack({ home: 'In\u00edcio', plans: 'Planos', deposit: 'Dep\u00f3sito', settings: 'Defini\u00e7\u00f5es', language: 'Idioma', logout: 'Sair',
      dashboard: 'Painel', investment_plans: 'Planos de investimento', menu: 'Menu', select: 'Selecionar',
      log_in: 'Entrar', create_account: 'Criar conta', password: 'Palavra-passe' }),
    de: pack({ home: 'Start', plans: 'Pl\u00e4ne', deposit: 'Einzahlung', settings: 'Einstellungen', language: 'Sprache', logout: 'Abmelden',
      dashboard: 'Dashboard', investment_plans: 'Anlagepl\u00e4ne', menu: 'Men\u00fc', select: 'Ausw\u00e4hlen',
      log_in: 'Anmelden', create_account: 'Konto erstellen', password: 'Passwort' }),
    hi: pack({ home: '\u0939\u094b\u092e', plans: '\u092f\u094b\u091c\u0928\u093e', deposit: '\u091c\u092e\u093e', settings: '\u0938\u0947\u091f\u093f\u0902\u0917\u094d\u0938', language: '\u092d\u093e\u0937\u093e', logout: '\u0932\u0949\u0917 \u0906\u0909\u091f' }),
    tr: pack({ home: 'Ana Sayfa', plans: 'Planlar', deposit: 'Yat\u0131r', settings: 'Ayarlar', language: 'Dil', logout: '\u00c7\u0131k\u0131\u015f' }),
    ru: pack({ home: '\u0413\u043b\u0430\u0432\u043d\u0430\u044f', plans: '\u041f\u043b\u0430\u043d\u044b', deposit: '\u0414\u0435\u043f\u043e\u0437\u0438\u0442', settings: '\u041d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0438', language: '\u042f\u0437\u044b\u043a', logout: '\u0412\u044b\u0439\u0442\u0438' }),
    ur: pack({ home: '\u06C1\u0648\u0645', plans: '\u0645\u0646\u0635\u0648\u0628\u06D2', deposit: '\u062C\u0645\u0627', settings: '\u062A\u0631\u062A\u06CC\u0628\u0627\u062A', language: '\u0632\u0628\u0627\u0646', logout: '\u0644\u0627\u06AF \u0622\u0624\u0679' }),
    ha: pack({ home: 'Gida', plans: 'Tsare-tsare', deposit: 'Ajiya', settings: 'Saiti', language: 'Harshe', logout: 'Fita' }),
    sw: pack({ home: 'Nyumbani', plans: 'Mipango', deposit: 'Weka', settings: 'Mipangilio', language: 'Lugha', logout: 'Toka' }),
    id: pack({ home: 'Beranda', plans: 'Paket', deposit: 'Setor', settings: 'Pengaturan', language: 'Bahasa', logout: 'Keluar' }),
    it: pack({ home: 'Home', plans: 'Piani', deposit: 'Deposito', settings: 'Impostazioni', language: 'Lingua', logout: 'Esci' }),
    nl: pack({ home: 'Home', plans: 'Plannen', deposit: 'Storten', settings: 'Instellingen', language: 'Taal', logout: 'Uitloggen' }),
    ja: pack({ home: '\u30db\u30fc\u30e0', plans: '\u30d7\u30e9\u30f3', deposit: '\u5165\u91d1', settings: '\u8a2d\u5b9a', language: '\u8a00\u8a9e', logout: '\u30ed\u30b0\u30a2\u30a6\u30c8' }),
    ko: pack({ home: '\ud648', plans: '\uacc4\ud68d', deposit: '\uc785\uae08', settings: '\uc124\uc815', language: '\uc5b8\uc5b4', logout: '\ub85c\uadf8\uc544\uc6c3' })
  };

  // Exact English UI phrases → translation keys (longest first for replace)
  var PHRASE_KEYS = [
    ['Required when sending money. Locked until you edit.', 'pin_hint'],
    ['Join our institutional portfolio network', 'signup_subtitle'],
    ['Access your investment dashboard', 'login_subtitle'],
    ['Referral Code (Optional)', 'referral_code'],
    ['Already have an account?', 'have_account'],
    ["Don't have an account?", 'no_account'],
    ['Equity Mixed Assets Portfolio', 'portfolio'],
    ['Installment Volume Progress', 'installment_progress'],
    ['Total Investment Goal', 'total_investment_goal'],
    ['Guaranteed Payout Return', 'guaranteed_payout'],
    ['Daily Growth Accrual', 'daily_growth'],
    ['Current Active Tier', 'current_active_tier'],
    ['CURRENT ACTIVE TIER', 'current_active_tier'],
    ['Active Plan Running', 'active_plan_running'],
    ['Total Account Balance', 'total_balance'],
    ['Select Payment Method', 'select_payment'],
    ['Request Custom Payment', 'custom_payment'],
    ['Pay through Bitcoin', 'bitcoin'],
    ['Upload Gift Card', 'giftcard'],
    ['Bank Transfer', 'bank'],
    ['Investment Plans', 'investment_plans'],
    ['Investment Plan', 'investment_plan'],
    ['Deposit Funds', 'deposit_funds'],
    ['Withdraw Funds', 'withdraw_funds_btn'],
    ['WITHDRAW FUNDS', 'withdraw_funds'],
    ['Send Money', 'send_money'],
    ['Spin & Win', 'spin_win'],
    ['Red / Black', 'red_black'],
    ['Horse Racing', 'horse_racing'],
    ['Customer Care', 'customer_care'],
    ['Client Portal Login', 'login_title'],
    ['Create Account', 'create_account'],
    ['Edit Profile', 'edit_profile'],
    ['My Profile', 'my_profile'],
    ['Transfer PIN', 'transfer_pin'],
    ['Edit PIN', 'edit_pin'],
    ['Active Profile', 'active_profile'],
    ['Save Profile', 'save_profile'],
    ['Log Out', 'logout'],
    ['Log in here', 'log_in_here'],
    ['Sign up', 'sign_up'],
    ['Log In', 'log_in'],
    ['Starter Plan', 'starter_plan'],
    ['Bronze Tier', 'bronze_tier'],
    ['Silver Tier', 'silver_tier'],
    ['Gold Tier', 'gold_tier'],
    ['Platinum Tier', 'platinum_tier'],
    ['Diamond Tier', 'diamond_tier'],
    ['Remaining Balance', 'remaining_balance'],
    ['VOLUME POSITION', 'volume_position'],
    ['Enter Promo Code', 'enter_promo'],
    ['Full Name', 'full_name'],
    ['Dashboard', 'dashboard'],
    ['Settings', 'settings'],
    ['Deposit', 'deposit'],
    ['History', 'history'],
    ['Trading', 'trading'],
    ['Withdraw', 'withdraw'],
    ['Session', 'session'],
    ['Status', 'status'],
    ['Locked', 'locked'],
    ['Select', 'select'],
    ['ACTIVE', 'active'],
    ['Active', 'active'],
    ['Plans', 'plans'],
    ['Home', 'home'],
    ['Back', 'back'],
    ['Menu', 'menu'],
    ['Email', 'email'],
    ['EMAIL', 'email'],
    ['Password', 'password'],
    ['PASSWORD', 'password'],
    ['Username', 'username'],
    ['Enter', 'enter'],
    ['Paid', 'paid'],
    ['Pump.fun', 'pump_fun']
  ];

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

  function translateText(raw) {
    if (!raw || getLang() === 'en') return raw;
    var s = String(raw);
    var trimmed = s.trim();
    if (!trimmed) return raw;
    for (var i = 0; i < PHRASE_KEYS.length; i++) {
      var en = PHRASE_KEYS[i][0];
      var key = PHRASE_KEYS[i][1];
      if (trimmed === en) {
        var tr = t(key);
        if (tr && tr !== key) return s.replace(trimmed, tr);
      }
    }
    // Case-insensitive full match
    var lower = trimmed.toLowerCase();
    for (var j = 0; j < PHRASE_KEYS.length; j++) {
      if (lower === PHRASE_KEYS[j][0].toLowerCase()) {
        var tr2 = t(PHRASE_KEYS[j][1]);
        if (tr2 && tr2 !== PHRASE_KEYS[j][1]) return s.replace(trimmed, tr2);
      }
    }
    return raw;
  }

  function walkTextNodes(root) {
    if (!root || getLang() === 'en') return;
    var skip = { SCRIPT: 1, STYLE: 1, TEXTAREA: 1, INPUT: 1, SELECT: 1, OPTION: 1, CODE: 1, PRE: 1 };
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    var nodes = [];
    var n;
    while ((n = walker.nextNode())) nodes.push(n);
    nodes.forEach(function (node) {
      var p = node.parentElement;
      if (!p || skip[p.tagName]) return;
      if (p.isContentEditable) return;
      if (p.closest && p.closest('[data-i18n-skip]')) return;
      var next = translateText(node.nodeValue);
      if (next !== node.nodeValue) node.nodeValue = next;
    });
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
      if (document.body) walkTextNodes(document.body);
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

  function boot() {
    applyPage();
    // Re-apply after late JS fills menu/balance labels
    setTimeout(applyPage, 400);
    setTimeout(applyPage, 1200);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();

  global.EMA_I18N = {
    LANGS: LANGS, t: t, getLang: getLang, setLang: setLang,
    applyPage: applyPage, fillSelect: fillSelect
  };
})(window);
