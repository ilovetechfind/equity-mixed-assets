/**
 * Equity Mixed Assets — shared i18n
 * Language is stored in localStorage key: ema_lang
 * Usage:
 *   <span data-i18n="home">Home</span>
 *   <input data-i18n-placeholder="enter_username" placeholder="...">
 *   window.EMA_I18N.t('home')
 *   window.EMA_I18N.setLang('ar')
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
    { code: 'ko', name: 'Korean', native: '\ud55c\uad6d\uC5B4', dir: 'ltr' }
  ];

  // Common UI strings (English keys)
  var T = {
    en: {
      home: 'Home', plans: 'Plans', deposit: 'Deposit', settings: 'Settings',
      back: 'Back', save: 'Save', cancel: 'Cancel', edit: 'Edit', logout: 'Log Out',
      session: 'Session', language: 'Language', language_hint: 'Choose your preferred app language. Arabic and Urdu use right-to-left layout.',
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
      change_photo: 'Change photo', save_profile_admin: 'Save profile',
      admin_settings: 'Settings'
    },
    ar: {
      home: '\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629', plans: '\u0627\u0644\u062E\u0637\u0637', deposit: '\u0625\u064A\u062F\u0627\u0639', settings: '\u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A',
      back: '\u0631\u062C\u0648\u0639', save: '\u062D\u0641\u0638', cancel: '\u0625\u0644\u063A\u0627\u0621', edit: '\u062A\u0639\u062F\u064A\u0644', logout: '\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062E\u0631\u0648\u062C',
      session: '\u0627\u0644\u062C\u0644\u0633\u0629', language: '\u0627\u0644\u0644\u063A\u0629', language_hint: '\u0627\u062E\u062A\u0631 \u0644\u063A\u0629 \u0627\u0644\u062A\u0637\u0628\u064A\u0642. \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0648\u0627\u0644\u0623\u0631\u062F\u064A\u0629 \u062A\u0633\u062A\u062E\u062F\u0645\u0627\u0646 \u0627\u0644\u0627\u062A\u062C\u0627\u0647 \u0645\u0646 \u0627\u0644\u064A\u0645\u064A\u0646 \u0625\u0644\u0649 \u0627\u0644\u064A\u0633\u0627\u0631.',
      language_saved: '\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0644\u063A\u0629',
      my_profile: '\u0645\u0644\u0641\u064A \u0627\u0644\u0634\u062E\u0635\u064A', edit_profile: '\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0645\u0644\u0641', profile_setup: '\u0625\u0639\u062F\u0627\u062F \u0627\u0644\u0645\u0644\u0641',
      username: '\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645', transfer_pin: '\u0631\u0645\u0632 PIN \u0627\u0644\u062A\u062D\u0648\u064A\u0644', edit_pin: '\u062A\u0639\u062F\u064A\u0644 PIN',
      save_profile: '\u062D\u0641\u0638 \u0627\u0644\u0645\u0644\u0641', save_pin: '\u062D\u0641\u0638 PIN',
      status: '\u0627\u0644\u062D\u0627\u0644\u0629', locked: '\u0645\u0642\u0641\u0644', not_set: '\u063A\u064A\u0631 \u0645\u0639\u062F', required: '\u0645\u0637\u0644\u0648\u0628',
      active_profile: '\u0645\u0644\u0641 \u0646\u0634\u0637', no_username: '\u0644\u0627 \u064A\u0648\u062C\u062F \u0627\u0633\u0645',
      pin_hint: '\u0645\u0637\u0644\u0648\u0628 \u0639\u0646\u062F \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0623\u0645\u0648\u0627\u0644. \u0645\u0642\u0641\u0644 \u062D\u062A\u0649 \u0627\u0644\u062A\u0639\u062F\u064A\u0644.',
      pin_edit_hint: '\u0627\u0644\u062D\u062F \u0627\u0644\u0623\u062F\u0646\u0649 4 \u0623\u062D\u0631\u0641. \u0627\u062D\u062A\u0641\u0638 \u0628\u0647 \u062E\u0627\u0635\u064B\u0627.',
      current_pin: 'PIN \u0627\u0644\u062D\u0627\u0644\u064A', new_pin: 'PIN \u062C\u062F\u064A\u062F', confirm_pin: '\u062A\u0623\u0643\u064A\u062F PIN',
      dashboard: '\u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0643\u0645', investment_plans: '\u062E\u0637\u0637 \u0627\u0644\u0627\u0633\u062A\u062B\u0645\u0627\u0631', deposit_funds: '\u0625\u064A\u062F\u0627\u0639 \u0623\u0645\u0648\u0627\u0644',
      send_money: '\u0625\u0631\u0633\u0627\u0644 \u0623\u0645\u0648\u0627\u0644', spin_win: '\u062F\u0648\u0631 \u0648\u0627\u0631\u0628\u062D', trading: '\u062A\u062F\u0627\u0648\u0644',
      history: '\u0627\u0644\u0633\u062C\u0644', red_black: '\u0623\u062D\u0645\u0631 / \u0623\u0633\u0648\u062F', horse_racing: '\u0633\u0628\u0627\u0642 \u0627\u0644\u062E\u064A\u0644',
      withdraw: '\u0633\u062D\u0628', customer_care: '\u062E\u062F\u0645\u0629 \u0627\u0644\u0639\u0645\u0644\u0627\u0621',
      total_balance: '\u0625\u062C\u0645\u0627\u0644\u064A \u0631\u0635\u064A\u062F \u0627\u0644\u062D\u0633\u0627\u0628', welcome: '\u0645\u0631\u062D\u0628\u064B\u0627',
      pay_installment: '\u062F\u0641\u0639 \u0627\u0644\u0642\u0633\u0637 \u0627\u0644\u062A\u0627\u0644\u064A', withdraw_to_main: '\u0633\u062D\u0628 \u0625\u0644\u0649 \u0627\u0644\u0631\u0635\u064A\u062F \u0627\u0644\u0631\u0626\u064A\u0633\u064A',
      from_balance: '\u0645\u0646 \u0627\u0644\u0631\u0635\u064A\u062F \u0627\u0644\u0631\u0626\u064A\u0633\u064A', deposit_new: '\u0625\u064A\u062F\u0627\u0639 \u062C\u062F\u064A\u062F',
      select_payment: '\u0627\u062E\u062A\u0631 \u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u062F\u0641\u0639', bitcoin: '\u0627\u0644\u062F\u0641\u0639 \u0628\u0627\u0644\u0628\u064A\u062A\u0643\u0648\u064A\u0646',
      giftcard: '\u0631\u0641\u0639 \u0628\u0637\u0627\u0642\u0629 \u0647\u062F\u064A\u0629', bank: '\u062A\u062D\u0648\u064A\u0644 \u0628\u0646\u0643\u064A', custom_payment: '\u0637\u0644\u0628 \u062F\u0641\u0639 \u0645\u062E\u0635\u0635',
      users: '\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u0648\u0646', profile: '\u0627\u0644\u0645\u0644\u0641', display_name: '\u0627\u0633\u0645 \u0627\u0644\u0639\u0631\u0636', email: '\u0627\u0644\u0628\u0631\u064A\u062F',
      change_photo: '\u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u0635\u0648\u0631\u0629', save_profile_admin: '\u062D\u0641\u0638 \u0627\u0644\u0645\u0644\u0641',
      admin_settings: '\u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A'
    },
    fr: {
      home: 'Accueil', plans: 'Plans', deposit: 'D\u00e9p\u00f4t', settings: 'Param\u00e8tres',
      back: 'Retour', save: 'Enregistrer', cancel: 'Annuler', edit: 'Modifier', logout: 'D\u00e9connexion',
      session: 'Session', language: 'Langue', language_hint: 'Choisissez la langue de l\u2019application.',
      language_saved: 'Langue enregistr\u00e9e',
      my_profile: 'Mon profil', edit_profile: 'Modifier le profil', profile_setup: 'Configuration du profil',
      username: 'Nom d\u2019utilisateur', transfer_pin: 'PIN de transfert', edit_pin: 'Modifier le PIN',
      save_profile: 'Enregistrer le profil', save_pin: 'Enregistrer le PIN',
      status: 'Statut', locked: 'Verrouill\u00e9', not_set: 'Non d\u00e9fini', required: 'Requis',
      active_profile: 'Profil actif', no_username: 'Pas de nom',
      pin_hint: 'Requis pour envoyer de l\u2019argent.', pin_edit_hint: 'Minimum 4 caract\u00e8res.',
      current_pin: 'PIN actuel', new_pin: 'Nouveau PIN', confirm_pin: 'Confirmer le PIN',
      dashboard: 'Tableau de bord', investment_plans: 'Plans d\u2019investissement', deposit_funds: 'D\u00e9poser des fonds',
      send_money: 'Envoyer de l\u2019argent', spin_win: 'Tourner & gagner', trading: 'Trading',
      history: 'Historique', red_black: 'Rouge / Noir', horse_racing: 'Courses de chevaux',
      withdraw: 'Retirer', customer_care: 'Support client',
      total_balance: 'Solde total du compte', welcome: 'Bienvenue',
      pay_installment: 'Payer la prochaine \u00e9ch\u00e9ance', withdraw_to_main: 'Retirer vers le solde principal',
      from_balance: 'Depuis le solde principal', deposit_new: 'Nouveau d\u00e9p\u00f4t',
      select_payment: 'Choisir le mode de paiement', bitcoin: 'Payer en Bitcoin',
      giftcard: 'Carte cadeau', bank: 'Virement bancaire', custom_payment: 'Paiement personnalis\u00e9',
      users: 'Utilisateurs', profile: 'Profil', display_name: 'Nom affich\u00e9', email: 'E-mail',
      change_photo: 'Changer la photo', save_profile_admin: 'Enregistrer le profil',
      admin_settings: 'Param\u00e8tres'
    },
    es: {
      home: 'Inicio', plans: 'Planes', deposit: 'Dep\u00f3sito', settings: 'Ajustes',
      back: 'Atr\u00e1s', save: 'Guardar', cancel: 'Cancelar', edit: 'Editar', logout: 'Cerrar sesi\u00f3n',
      session: 'Sesi\u00f3n', language: 'Idioma', language_hint: 'Elige el idioma de la aplicaci\u00f3n.',
      language_saved: 'Idioma guardado',
      my_profile: 'Mi perfil', edit_profile: 'Editar perfil', profile_setup: 'Configurar perfil',
      username: 'Usuario', transfer_pin: 'PIN de transferencia', edit_pin: 'Editar PIN',
      save_profile: 'Guardar perfil', save_pin: 'Guardar PIN',
      status: 'Estado', locked: 'Bloqueado', not_set: 'No definido', required: 'Obligatorio',
      active_profile: 'Perfil activo', no_username: 'Sin usuario',
      pin_hint: 'Necesario para enviar dinero.', pin_edit_hint: 'M\u00ednimo 4 caracteres.',
      current_pin: 'PIN actual', new_pin: 'PIN nuevo', confirm_pin: 'Confirmar PIN',
      dashboard: 'Panel', investment_plans: 'Planes de inversi\u00f3n', deposit_funds: 'Depositar fondos',
      send_money: 'Enviar dinero', spin_win: 'Girar y ganar', trading: 'Trading',
      history: 'Historial', red_black: 'Rojo / Negro', horse_racing: 'Carreras de caballos',
      withdraw: 'Retirar', customer_care: 'Atenci\u00f3n al cliente',
      total_balance: 'Saldo total de la cuenta', welcome: 'Bienvenido',
      pay_installment: 'Pagar siguiente cuota', withdraw_to_main: 'Retirar al saldo principal',
      from_balance: 'Desde saldo principal', deposit_new: 'Nuevo dep\u00f3sito',
      select_payment: 'Seleccionar m\u00e9todo de pago', bitcoin: 'Pagar con Bitcoin',
      giftcard: 'Tarjeta de regalo', bank: 'Transferencia bancaria', custom_payment: 'Pago personalizado',
      users: 'Usuarios', profile: 'Perfil', display_name: 'Nombre visible', email: 'Correo',
      change_photo: 'Cambiar foto', save_profile_admin: 'Guardar perfil',
      admin_settings: 'Ajustes'
    },
    pt: {
      home: 'In\u00edcio', plans: 'Planos', deposit: 'Dep\u00f3sito', settings: 'Defini\u00e7\u00f5es',
      back: 'Voltar', save: 'Guardar', cancel: 'Cancelar', edit: 'Editar', logout: 'Sair',
      session: 'Sess\u00e3o', language: 'Idioma', language_hint: 'Escolha o idioma da aplica\u00e7\u00e3o.',
      language_saved: 'Idioma guardado',
      my_profile: 'O meu perfil', edit_profile: 'Editar perfil', profile_setup: 'Configurar perfil',
      username: 'Nome de utilizador', transfer_pin: 'PIN de transfer\u00eancia', edit_pin: 'Editar PIN',
      save_profile: 'Guardar perfil', save_pin: 'Guardar PIN',
      status: 'Estado', locked: 'Bloqueado', not_set: 'N\u00e3o definido', required: 'Obrigat\u00f3rio',
      active_profile: 'Perfil ativo', no_username: 'Sem nome',
      pin_hint: 'Necess\u00e1rio para enviar dinheiro.', pin_edit_hint: 'M\u00ednimo 4 caracteres.',
      current_pin: 'PIN atual', new_pin: 'Novo PIN', confirm_pin: 'Confirmar PIN',
      dashboard: 'Painel', investment_plans: 'Planos de investimento', deposit_funds: 'Depositar fundos',
      send_money: 'Enviar dinheiro', spin_win: 'Rodar e ganhar', trading: 'Trading',
      history: 'Hist\u00f3rico', red_black: 'Vermelho / Preto', horse_racing: 'Corrida de cavalos',
      withdraw: 'Levantar', customer_care: 'Apoio ao cliente',
      total_balance: 'Saldo total da conta', welcome: 'Bem-vindo',
      pay_installment: 'Pagar pr\u00f3xima presta\u00e7\u00e3o', withdraw_to_main: 'Levantar para saldo principal',
      from_balance: 'Do saldo principal', deposit_new: 'Novo dep\u00f3sito',
      select_payment: 'Selecionar m\u00e9todo de pagamento', bitcoin: 'Pagar com Bitcoin',
      giftcard: 'Cart\u00e3o presente', bank: 'Transfer\u00eancia banc\u00e1ria', custom_payment: 'Pagamento personalizado',
      users: 'Utilizadores', profile: 'Perfil', display_name: 'Nome de exibi\u00e7\u00e3o', email: 'E-mail',
      change_photo: 'Alterar foto', save_profile_admin: 'Guardar perfil',
      admin_settings: 'Defini\u00e7\u00f5es'
    },
    de: {
      home: 'Start', plans: 'Pl\u00e4ne', deposit: 'Einzahlung', settings: 'Einstellungen',
      back: 'Zur\u00fcck', save: 'Speichern', cancel: 'Abbrechen', edit: 'Bearbeiten', logout: 'Abmelden',
      session: 'Sitzung', language: 'Sprache', language_hint: 'W\u00e4hlen Sie die App-Sprache.',
      language_saved: 'Sprache gespeichert',
      my_profile: 'Mein Profil', edit_profile: 'Profil bearbeiten', profile_setup: 'Profil einrichten',
      username: 'Benutzername', transfer_pin: 'Transfer-PIN', edit_pin: 'PIN bearbeiten',
      save_profile: 'Profil speichern', save_pin: 'PIN speichern',
      status: 'Status', locked: 'Gesperrt', not_set: 'Nicht gesetzt', required: 'Erforderlich',
      active_profile: 'Aktives Profil', no_username: 'Kein Name',
      pin_hint: 'Erforderlich beim Senden von Geld.', pin_edit_hint: 'Mindestens 4 Zeichen.',
      current_pin: 'Aktuelle PIN', new_pin: 'Neue PIN', confirm_pin: 'PIN best\u00e4tigen',
      dashboard: 'Dashboard', investment_plans: 'Anlagepl\u00e4ne', deposit_funds: 'Geld einzahlen',
      send_money: 'Geld senden', spin_win: 'Drehen & Gewinnen', trading: 'Handel',
      history: 'Verlauf', red_black: 'Rot / Schwarz', horse_racing: 'Pferderennen',
      withdraw: 'Auszahlen', customer_care: 'Kundendienst',
      total_balance: 'Gesamtkontostand', welcome: 'Willkommen',
      pay_installment: 'N\u00e4chste Rate zahlen', withdraw_to_main: 'Auf Hauptguthaben auszahlen',
      from_balance: 'Vom Hauptguthaben', deposit_new: 'Neue Einzahlung',
      select_payment: 'Zahlungsmethode w\u00e4hlen', bitcoin: 'Mit Bitcoin zahlen',
      giftcard: 'Geschenkkarte', bank: 'Bank\u00fcberweisung', custom_payment: 'Individuelle Zahlung',
      users: 'Benutzer', profile: 'Profil', display_name: 'Anzeigename', email: 'E-Mail',
      change_photo: 'Foto \u00e4ndern', save_profile_admin: 'Profil speichern',
      admin_settings: 'Einstellungen'
    },
    zh: {
      home: '\u9996\u9875', plans: '\u8ba1\u5212', deposit: '\u5b58\u5165', settings: '\u8bbe\u7f6e',
      back: '\u8fd4\u56de', save: '\u4fdd\u5b58', cancel: '\u53d6\u6d88', edit: '\u7f16\u8f91', logout: '\u9000\u51fa\u767b\u5f55',
      session: '\u4f1a\u8bdd', language: '\u8bed\u8a00', language_hint: '\u9009\u62e9\u5e94\u7528\u8bed\u8a00\u3002',
      language_saved: '\u8bed\u8a00\u5df2\u4fdd\u5b58',
      my_profile: '\u6211\u7684\u8d44\u6599', edit_profile: '\u7f16\u8f91\u8d44\u6599', profile_setup: '\u8bbe\u7f6e\u8d44\u6599',
      username: '\u7528\u6237\u540d', transfer_pin: '\u8f6c\u8d26PIN', edit_pin: '\u7f16\u8f91PIN',
      save_profile: '\u4fdd\u5b58\u8d44\u6599', save_pin: '\u4fdd\u5b58PIN',
      status: '\u72b6\u6001', locked: '\u5df2\u9501\u5b9a', not_set: '\u672a\u8bbe\u7f6e', required: '\u5fc5\u9700',
      active_profile: '\u5df2\u6fc0\u6d3b\u8d44\u6599', no_username: '\u65e0\u7528\u6237\u540d',
      pin_hint: '\u53d1\u9001\u8d44\u91d1\u65f6\u9700\u8981\u3002', pin_edit_hint: '\u81f3\u5c114\u4e2a\u5b57\u7b26\u3002',
      current_pin: '\u5f53\u524dPIN', new_pin: '\u65b0PIN', confirm_pin: '\u786e\u8ba4PIN',
      dashboard: '\u4eea\u8868\u677f', investment_plans: '\u6295\u8d44\u8ba1\u5212', deposit_funds: '\u5b58\u5165\u8d44\u91d1',
      send_money: '\u53d1\u9001\u8d44\u91d1', spin_win: '\u8f6c\u76d8\u8d62\u5956', trading: '\u4ea4\u6613',
      history: '\u5386\u53f2', red_black: '\u7ea2/\u9ed1', horse_racing: '\u8d5b\u9a6c',
      withdraw: '\u63d0\u73b0', customer_care: '\u5ba2\u6237\u670d\u52a1',
      total_balance: '\u8d26\u6237\u603b\u4f59\u989d', welcome: '\u6b22\u8fce',
      pay_installment: '\u652f\u4ed8\u4e0b\u4e00\u671f', withdraw_to_main: '\u63d0\u73b0\u81f3\u4e3b\u4f59\u989d',
      from_balance: '\u4ece\u4e3b\u4f59\u989d', deposit_new: '\u65b0\u5b58\u5165',
      select_payment: '\u9009\u62e9\u4ed8\u6b3e\u65b9\u5f0f', bitcoin: '\u6bd4\u7279\u5e01\u652f\u4ed8',
      giftcard: '\u793c\u54c1\u5361', bank: '\u94f6\u884c\u8f6c\u8d26', custom_payment: '\u81ea\u5b9a\u4e49\u4ed8\u6b3e',
      users: '\u7528\u6237', profile: '\u8d44\u6599', display_name: '\u663e\u793a\u540d\u79f0', email: '\u90ae\u7bb1',
      change_photo: '\u66f4\u6362\u7167\u7247', save_profile_admin: '\u4fdd\u5b58\u8d44\u6599',
      admin_settings: '\u8bbe\u7f6e'
    },
    hi: {
      home: '\u0939\u094b\u092e', plans: '\u092f\u094b\u091c\u0928\u093e\u090f\u0901', deposit: '\u091c\u092e\u093e', settings: '\u0938\u0947\u091f\u093f\u0902\u0917\u094d\u0938',
      back: '\u0935\u093e\u092a\u0938', save: '\u0938\u0939\u0947\u091c\u0947\u0902', cancel: '\u0930\u0926\u094d\u0926', edit: '\u0938\u0902\u092a\u093e\u0926\u093f\u0924', logout: '\u0932\u0949\u0917 \u0906\u0909\u091f',
      session: '\u0938\u0924\u094d\u0930', language: '\u092d\u093e\u0937\u093e', language_hint: '\u0905\u092a\u0928\u0940 \u092d\u093e\u0937\u093e \u091a\u0941\u0928\u0947\u0902\u0964',
      language_saved: '\u092d\u093e\u0937\u093e \u0938\u0939\u0947\u091c\u0940 \u0917\u0908',
      my_profile: '\u092e\u0947\u0930\u093e \u092a\u094d\u0930\u094b\u092b\u093c\u093e\u0907\u0932', edit_profile: '\u092a\u094d\u0930\u094b\u092b\u093c\u093e\u0907\u0932 \u0938\u0902\u092a\u093e\u0926\u093f\u0924 \u0915\u0930\u0947\u0902', profile_setup: '\u092a\u094d\u0930\u094b\u092b\u093c\u093e\u0907\u0932 \u0938\u0947\u091f\u0905\u092a',
      username: '\u0909\u092a\u092f\u094b\u0917\u0915\u0930\u094d\u0924\u093e \u0928\u093e\u092e', transfer_pin: '\u091f\u094d\u0930\u093e\u0902\u0938\u092b\u0930 PIN', edit_pin: 'PIN \u0938\u0902\u092a\u093e\u0926\u093f\u0924 \u0915\u0930\u0947\u0902',
      save_profile: '\u092a\u094d\u0930\u094b\u092b\u093c\u093e\u0907\u0932 \u0938\u0939\u0947\u091c\u0947\u0902', save_pin: 'PIN \u0938\u0939\u0947\u091c\u0947\u0902',
      status: '\u0938\u094d\u0925\u093f\u0924\u093f', locked: '\u0932\u0949\u0915\u094d\u0921', not_set: '\u0938\u0947\u091f \u0928\u0939\u0940\u0902', required: '\u0906\u0935\u0936\u094d\u092f\u0915',
      active_profile: '\u0938\u0915\u094d\u0930\u093f\u092f \u092a\u094d\u0930\u094b\u092b\u093c\u093e\u0907\u0932', no_username: '\u0915\u094b\u0908 \u0928\u093e\u092e \u0928\u0939\u0940\u0902',
      pin_hint: '\u092a\u0948\u0938\u093e \u092d\u0947\u091c\u0928\u0947 \u0915\u0947 \u0932\u093f\u090f \u0906\u0935\u0936\u094d\u092f\u0915\u0964', pin_edit_hint: '\u0915\u092e \u0938\u0947 \u0915\u092e 4 \u0905\u0915\u094d\u0937\u0930\u0964',
      current_pin: '\u0935\u0930\u094d\u0924\u092e\u093e\u0928 PIN', new_pin: '\u0928\u092f\u093e PIN', confirm_pin: 'PIN \u092a\u0941\u0937\u094d\u091f\u093f \u0915\u0930\u0947\u0902',
      dashboard: '\u0921\u0948\u0936\u092c\u094b\u0930\u094d\u0921', investment_plans: '\u0928\u093f\u0935\u0947\u0936 \u092f\u094b\u091c\u0928\u093e\u090f\u0901', deposit_funds: '\u0930\u093e\u0936\u093f \u091c\u092e\u093e \u0915\u0930\u0947\u0902',
      send_money: '\u092a\u0948\u0938\u093e \u092d\u0947\u091c\u0947\u0902', spin_win: '\u0938\u094d\u092a\u093f\u0928 \u0914\u0930 \u091c\u0940\u0924\u0947\u0902', trading: '\u091f\u094d\u0930\u0947\u0921\u093f\u0902\u0917',
      history: '\u0907\u0924\u093f\u0939\u093e\u0938', red_black: '\u0932\u093e\u0932 / \u0915\u093e\u0932\u093e', horse_racing: '\u0918\u094b\u0921\u093c\u0926\u094c\u0921',
      withdraw: '\u0928\u093f\u0915\u093e\u0938\u0940', customer_care: '\u0917\u094d\u0930\u093e\u0939\u0915 \u0938\u0947\u0935\u093e',
      total_balance: '\u0915\u0941\u0932 \u0916\u093e\u0924\u093e \u0936\u0947\u0937', welcome: '\u0938\u094d\u0935\u093e\u0917\u0924',
      pay_installment: '\u0905\u0917\u0932\u093e \u0915\u093f\u0938\u094d\u0924 \u091a\u0941\u0915\u093e\u090f\u0901', withdraw_to_main: '\u092e\u0941\u0916\u094d\u092f \u0936\u0947\u0937 \u092e\u0947\u0902 \u0928\u093f\u0915\u093e\u0938\u0940',
      from_balance: '\u092e\u0941\u0916\u094d\u092f \u0936\u0947\u0937 \u0938\u0947', deposit_new: '\u0928\u092f\u093e \u091c\u092e\u093e',
      select_payment: '\u092d\u0941\u0917\u0924\u093e\u0928 \u0935\u093f\u0927\u093f \u091a\u0941\u0928\u0947\u0902', bitcoin: 'Bitcoin \u0938\u0947 \u092d\u0941\u0917\u0924\u093e\u0928',
      giftcard: '\u0917\u093f\u092b\u094d\u091f \u0915\u093e\u0930\u094d\u0921', bank: '\u092c\u0948\u0902\u0915 \u091f\u094d\u0930\u093e\u0902\u0938\u092b\u0930', custom_payment: '\u0915\u0938\u094d\u091f\u092e \u092d\u0941\u0917\u0924\u093e\u0928',
      users: '\u0909\u092a\u092f\u094b\u0917\u0915\u0930\u094d\u0924\u093e', profile: '\u092a\u094d\u0930\u094b\u092b\u093c\u093e\u0907\u0932', display_name: '\u0926\u093f\u0916\u093e\u0928\u0947 \u0915\u093e \u0928\u093e\u092e', email: '\u0908\u092e\u0947\u0932',
      change_photo: '\u092b\u094b\u091f\u094b \u092c\u0926\u0932\u0947\u0902', save_profile_admin: '\u092a\u094d\u0930\u094b\u092b\u093c\u093e\u0907\u0932 \u0938\u0939\u0947\u091c\u0947\u0902',
      admin_settings: '\u0938\u0947\u091f\u093f\u0902\u0917\u094d\u0938'
    },
    tr: {
      home: 'Ana Sayfa', plans: 'Planlar', deposit: 'Yat\u0131r', settings: 'Ayarlar',
      back: 'Geri', save: 'Kaydet', cancel: '\u0130ptal', edit: 'D\u00fczenle', logout: '\u00c7\u0131k\u0131\u015f',
      session: 'Oturum', language: 'Dil', language_hint: 'Uygulama dilini se\u00e7in.',
      language_saved: 'Dil kaydedildi',
      my_profile: 'Profilim', edit_profile: 'Profili d\u00fczenle', profile_setup: 'Profil kurulumu',
      username: 'Kullan\u0131c\u0131 ad\u0131', transfer_pin: 'Transfer PIN', edit_pin: 'PIN d\u00fczenle',
      save_profile: 'Profili kaydet', save_pin: 'PIN kaydet',
      status: 'Durum', locked: 'Kilitli', not_set: 'Ayarlanmad\u0131', required: 'Gerekli',
      active_profile: 'Aktif profil', no_username: 'Kullan\u0131c\u0131 ad\u0131 yok',
      pin_hint: 'Para g\u00f6nderirken gerekli.', pin_edit_hint: 'En az 4 karakter.',
      current_pin: 'Mevcut PIN', new_pin: 'Yeni PIN', confirm_pin: 'PIN do\u011frula',
      dashboard: 'Panel', investment_plans: 'Yat\u0131r\u0131m planlar\u0131', deposit_funds: 'Fon yat\u0131r',
      send_money: 'Para g\u00f6nder', spin_win: '\u00c7evir & Kazan', trading: 'i\u015flem',
      history: 'Ge\u00e7mi\u015f', red_black: 'K\u0131rm\u0131z\u0131 / Siyah', horse_racing: 'At yar\u0131\u015f\u0131',
      withdraw: '\u00c7ek', customer_care: 'M\u00fc\u015fteri hizmetleri',
      total_balance: 'Toplam hesap bakiyesi', welcome: 'Ho\u015f geldiniz',
      pay_installment: 'Sonraki taksiti \u00f6de', withdraw_to_main: 'Ana bakiyeye \u00e7ek',
      from_balance: 'Ana bakiyeden', deposit_new: 'Yeni yat\u0131r\u0131m',
      select_payment: '\u00d6deme y\u00f6ntemi se\u00e7', bitcoin: 'Bitcoin ile \u00f6de',
      giftcard: 'Hediye kart\u0131', bank: 'Banka transferi', custom_payment: '\u00d6zel \u00f6deme',
      users: 'Kullan\u0131c\u0131lar', profile: 'Profil', display_name: 'G\u00f6r\u00fcnen ad', email: 'E-posta',
      change_photo: 'Foto\u011fraf\u0131 de\u011fi\u015ftir', save_profile_admin: 'Profili kaydet',
      admin_settings: 'Ayarlar'
    },
    ru: {
      home: '\u0413\u043b\u0430\u0432\u043d\u0430\u044f', plans: '\u041f\u043b\u0430\u043d\u044b', deposit: '\u0414\u0435\u043f\u043e\u0437\u0438\u0442', settings: '\u041d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0438',
      back: '\u041d\u0430\u0437\u0430\u0434', save: '\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c', cancel: '\u041e\u0442\u043c\u0435\u043d\u0430', edit: '\u0418\u0437\u043c\u0435\u043d\u0438\u0442\u044c', logout: '\u0412\u044b\u0439\u0442\u0438',
      session: '\u0421\u0435\u0441\u0441\u0438\u044f', language: '\u042f\u0437\u044b\u043a', language_hint: '\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u044f\u0437\u044b\u043a \u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u044f.',
      language_saved: '\u042f\u0437\u044b\u043a \u0441\u043e\u0445\u0440\u0430\u043d\u0451\u043d',
      my_profile: '\u041c\u043e\u0439 \u043f\u0440\u043e\u0444\u0438\u043b\u044c', edit_profile: '\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c', profile_setup: '\u041d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0430 \u043f\u0440\u043e\u0444\u0438\u043b\u044f',
      username: '\u0418\u043c\u044f \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044f', transfer_pin: 'PIN \u043f\u0435\u0440\u0435\u0432\u043e\u0434\u0430', edit_pin: '\u0418\u0437\u043c\u0435\u043d\u0438\u0442\u044c PIN',
      save_profile: '\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c \u043f\u0440\u043e\u0444\u0438\u043b\u044c', save_pin: '\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c PIN',
      status: '\u0421\u0442\u0430\u0442\u0443\u0441', locked: '\u0417\u0430\u0431\u043b\u043e\u043a\u0438\u0440\u043e\u0432\u0430\u043d', not_set: '\u041d\u0435 \u0437\u0430\u0434\u0430\u043d', required: '\u041e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u043e',
      active_profile: '\u0410\u043a\u0442\u0438\u0432\u043d\u044b\u0439 \u043f\u0440\u043e\u0444\u0438\u043b\u044c', no_username: '\u041d\u0435\u0442 \u0438\u043c\u0435\u043d\u0438',
      pin_hint: '\u041d\u0443\u0436\u0435\u043d \u0434\u043b\u044f \u043e\u0442\u043f\u0440\u0430\u0432\u043a\u0438 \u0434\u0435\u043d\u0435\u0433.', pin_edit_hint: '\u041c\u0438\u043d\u0438\u043c\u0443\u043c 4 \u0441\u0438\u043c\u0432\u043e\u043b\u0430.',
      current_pin: '\u0422\u0435\u043a\u0443\u0449\u0438\u0439 PIN', new_pin: '\u041d\u043e\u0432\u044b\u0439 PIN', confirm_pin: '\u041f\u043e\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044c PIN',
      dashboard: '\u041f\u0430\u043d\u0435\u043b\u044c', investment_plans: '\u0418\u043d\u0432\u0435\u0441\u0442\u0438\u0446\u0438\u043e\u043d\u043d\u044b\u0435 \u043f\u043b\u0430\u043d\u044b', deposit_funds: '\u0412\u043d\u0435\u0441\u0442\u0438 \u0441\u0440\u0435\u0434\u0441\u0442\u0432\u0430',
      send_money: '\u041e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c', spin_win: '\u041a\u0440\u0443\u0442\u0438\u0442\u044c \u0438 \u0432\u044b\u0438\u0433\u0440\u0430\u0442\u044c', trading: '\u0422\u043e\u0440\u0433\u043e\u0432\u043b\u044f',
      history: '\u0418\u0441\u0442\u043e\u0440\u0438\u044f', red_black: '\u041a\u0440\u0430\u0441\u043d\u044b\u0439 / \u0427\u0451\u0440\u043d\u044b\u0439', horse_racing: '\u0421\u043a\u0430\u0447\u043a\u0438',
      withdraw: '\u0412\u044b\u0432\u0435\u0441\u0442\u0438', customer_care: '\u041f\u043e\u0434\u0434\u0435\u0440\u0436\u043a\u0430',
      total_balance: '\u041e\u0431\u0449\u0438\u0439 \u0431\u0430\u043b\u0430\u043d\u0441', welcome: '\u0414\u043e\u0431\u0440\u043e \u043f\u043e\u0436\u0430\u043b\u043e\u0432\u0430\u0442\u044c',
      pay_installment: '\u041e\u043f\u043b\u0430\u0442\u0438\u0442\u044c \u0441\u043b\u0435\u0434\u0443\u044e\u0449\u0438\u0439 \u0432\u0437\u043d\u043e\u0441', withdraw_to_main: '\u041d\u0430 \u043e\u0441\u043d\u043e\u0432\u043d\u043e\u0439 \u0431\u0430\u043b\u0430\u043d\u0441',
      from_balance: '\u0421 \u043e\u0441\u043d\u043e\u0432\u043d\u043e\u0433\u043e \u0431\u0430\u043b\u0430\u043d\u0441\u0430', deposit_new: '\u041d\u043e\u0432\u044b\u0439 \u0434\u0435\u043f\u043e\u0437\u0438\u0442',
      select_payment: '\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u043e\u043f\u043b\u0430\u0442\u0443', bitcoin: 'Bitcoin',
      giftcard: '\u041f\u043e\u0434\u0430\u0440\u043e\u0447\u043d\u0430\u044f \u043a\u0430\u0440\u0442\u0430', bank: '\u0411\u0430\u043d\u043a\u043e\u0432\u0441\u043a\u0438\u0439 \u043f\u0435\u0440\u0435\u0432\u043e\u0434', custom_payment: '\u0421\u0432\u043e\u0439 \u0441\u043f\u043e\u0441\u043e\u0431',
      users: '\u041f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0438', profile: '\u041f\u0440\u043e\u0444\u0438\u043b\u044c', display_name: '\u0418\u043c\u044f', email: '\u041f\u043e\u0447\u0442\u0430',
      change_photo: '\u0421\u043c\u0435\u043d\u0438\u0442\u044c \u0444\u043e\u0442\u043e', save_profile_admin: '\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c',
      admin_settings: '\u041d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0438'
    },
    ur: {
      home: '\u06C1\u0648\u0645', plans: '\u0645\u0646\u0635\u0648\u0628\u06D2', deposit: '\u062C\u0645\u0627', settings: '\u062A\u0631\u062A\u06CC\u0628\u0627\u062A',
      back: '\u0648\u0627\u067E\u0633', save: '\u0645\u062D\u0641\u0648\u0638 \u06A9\u0631\u06CC\u06BA', cancel: '\u0645\u0646\u0633\u0648\u062E', edit: '\u062A\u0631\u0645\u06CC\u0645', logout: '\u0644\u0627\u06AF \u0622\u0624\u0679',
      session: '\u0633\u06CC\u0634\u0646', language: '\u0632\u0628\u0627\u0646', language_hint: '\u0627\u067E\u0644\u06CC \u06A9\u06CC \u0632\u0628\u0627\u0646 \u0645\u0646\u062A\u062E\u0628 \u06A9\u0631\u06CC\u06BA\u06D4',
      language_saved: '\u0632\u0628\u0627\u0646 \u0645\u062D\u0641\u0648\u0638 \u06C1\u0648 \u06AF\u0626\u06CC',
      my_profile: '\u0645\u06CC\u0631\u0627 \u067E\u0631\u0648\u0641\u0627\u0626\u0644', edit_profile: '\u067E\u0631\u0648\u0641\u0627\u0626\u0644 \u062A\u0631\u0645\u06CC\u0645 \u06A9\u0631\u06CC\u06BA', profile_setup: '\u067E\u0631\u0648\u0641\u0627\u0626\u0644 \u0633\u06CC\u0679 \u0627\u067E',
      username: '\u06CC\u0648\u0632\u0631 \u0646\u06CC\u0645', transfer_pin: '\u0679\u0631\u0627\u0646\u0633\u0641\u0631 PIN', edit_pin: 'PIN \u062A\u0631\u0645\u06CC\u0645 \u06A9\u0631\u06CC\u06BA',
      save_profile: '\u067E\u0631\u0648\u0641\u0627\u0626\u0644 \u0645\u062D\u0641\u0648\u0638 \u06A9\u0631\u06CC\u06BA', save_pin: 'PIN \u0645\u062D\u0641\u0648\u0638 \u06A9\u0631\u06CC\u06BA',
      status: '\u062D\u0627\u0644\u062A', locked: '\u0644\u0627\u06A9', not_set: '\u0637\u06D2 \u0646\u06C1\u06CC\u06BA', required: '\u0636\u0631\u0648\u0631\u06CC',
      active_profile: '\u0641\u0639\u0627\u0644 \u067E\u0631\u0648\u0641\u0627\u0626\u0644', no_username: '\u06A9\u0648\u0626\u06CC \u0646\u0627\u0645 \u0646\u06C1\u06CC\u06BA',
      pin_hint: '\u067E\u06CC\u0633\u06D2 \u0628\u06BE\u06CC\u062C\u0646\u06D2 \u06A9\u06D2 \u0644\u06CC\u06D2 \u0636\u0631\u0648\u0631\u06CC\u06D4', pin_edit_hint: '\u06A9\u0645 \u0627\u0632 \u06A9\u0645 4 \u062D\u0631\u0648\u0641\u06D4',
      current_pin: '\u0645\u0648\u062C\u0648\u062F\u06C1 PIN', new_pin: '\u0646\u06CC\u0627 PIN', confirm_pin: 'PIN \u062A\u0635\u062F\u06CC\u0642 \u06A9\u0631\u06CC\u06BA',
      dashboard: '\u0688\u06CC\u0634 \u0628\u0648\u0631\u0688', investment_plans: '\u0633\u0631\u0645\u0627\u06CC\u06C1 \u0645\u0646\u0635\u0648\u0628\u06D2', deposit_funds: '\u0631\u0642\u0645 \u062C\u0645\u0627 \u06A9\u0631\u06CC\u06BA',
      send_money: '\u067E\u06CC\u0633\u06D2 \u0628\u06BE\u06CC\u062C\u06CC\u06BA', spin_win: '\u06AF\u06BE\u0648\u0645\u0627\u0626\u06CC\u06BA \u0627\u0648\u0631 \u062C\u06CC\u062A\u06CC\u06BA', trading: '\u0679\u0631\u06CC\u0688\u0646\u06AF',
      history: '\u062A\u0627\u0631\u06CC\u062E', red_black: '\u0644\u0627\u0644 / \u06A9\u0627\u0644\u0627', horse_racing: '\u06AF\u06BE\u0648\u0691 \u062F\u0648\u0691',
      withdraw: '\u0646\u06A9\u0627\u0644\u06CC', customer_care: '\u06A9\u0633\u0679\u0645\u0631 \u06A9\u06CC\u0626\u0631',
      total_balance: '\u06A9\u0644 \u0628\u0626\u0644\u0646\u0633', welcome: '\u062E\u0648\u0634 \u0622\u0645\u062F\u06CC\u062F',
      pay_installment: '\u0627\u06AF\u0644\u0627 \u0642\u0633\u0637 \u0627\u062F\u0627 \u06A9\u0631\u06CC\u06BA', withdraw_to_main: '\u0627\u0635\u0644\u06CC \u0628\u0626\u0644\u0646\u0633 \u0645\u06CC\u06BA \u0646\u06A9\u0627\u0644\u06CC',
      from_balance: '\u0627\u0635\u0644\u06CC \u0628\u0626\u0644\u0646\u0633 \u0633\u06D2', deposit_new: '\u0646\u06CC\u0627 \u062C\u0645\u0627',
      select_payment: '\u0627\u062F\u0627\u0626\u06CC\u06AF\u06CC \u06A9\u0627 \u0637\u0631\u06CC\u0642\u06C1 \u0645\u0646\u062A\u062E\u0628 \u06A9\u0631\u06CC\u06BA', bitcoin: 'Bitcoin',
      giftcard: '\u06AF\u0641\u0679 \u06A9\u0627\u0631\u0688', bank: '\u0628\u06CC\u0646\u06A9 \u0679\u0631\u0627\u0646\u0633\u0641\u0631', custom_payment: '\u062E\u0627\u0635 \u0627\u062F\u0627\u0626\u06CC\u06AF\u06CC',
      users: '\u06A9\u0627\u0631\u0628\u0631\u0627\u0646', profile: '\u067E\u0631\u0648\u0641\u0627\u0626\u0644', display_name: '\u0646\u0627\u0645', email: '\u0627\u06CC \u0645\u06CC\u0644',
      change_photo: '\u0641\u0648\u0679\u0648 \u0628\u062F\u0644\u06CC\u06BA', save_profile_admin: '\u067E\u0631\u0648\u0641\u0627\u0626\u0644 \u0645\u062D\u0641\u0648\u0638 \u06A9\u0631\u06CC\u06BA',
      admin_settings: '\u062A\u0631\u062A\u06CC\u0628\u0627\u062A'
    },
    ha: {
      home: 'Gida', plans: 'Tsare-tsare', deposit: 'Ajiya', settings: 'Saiti',
      back: 'Baya', save: 'Ajiye', cancel: 'Soke', edit: 'Gyara', logout: 'Fita',
      session: 'Zama', language: 'Harshe', language_hint: 'Za\u0253i harshen manhaja.',
      language_saved: 'An ajiye harshe',
      my_profile: 'Bayananina', edit_profile: 'Gyara bayani', profile_setup: 'Saita bayani',
      username: 'Sunan mai amfani', transfer_pin: 'PIN na canja wuri', edit_pin: 'Gyara PIN',
      save_profile: 'Ajiye bayani', save_pin: 'Ajiye PIN',
      status: 'Hali', locked: 'Kulle', not_set: 'Ba a saita ba', required: 'Ana bukata',
      active_profile: 'Bayani mai aiki', no_username: 'Babu suna',
      pin_hint: 'Ana bukata lokacin aika ku\u0257i.', pin_edit_hint: 'A\u0199alla haruffa 4.',
      current_pin: 'PIN na yanzu', new_pin: 'Sabin PIN', confirm_pin: 'Tabbatar da PIN',
      dashboard: 'Dashboard', investment_plans: 'Tsare-tsaren saka hannun jari', deposit_funds: 'Ajiye ku\u0257i',
      send_money: 'Aika ku\u0257i', spin_win: 'Juya & Ci nasara', trading: 'Ciniki',
      history: 'Tarihi', red_black: 'Ja / Ba\u0199i', horse_racing: 'Tseren doki',
      withdraw: 'Cire', customer_care: 'Tallafin abokin ciniki',
      total_balance: 'Jimlar ma\u2019auni', welcome: 'Barka da zuwa',
      pay_installment: 'Biya gaba', withdraw_to_main: 'Cire zuwa babban ma\u2019auni',
      from_balance: 'Daga babban ma\u2019auni', deposit_new: 'Sabuwar ajiya',
      select_payment: 'Za\u0253i hanyar biya', bitcoin: 'Biya da Bitcoin',
      giftcard: 'Katin kyauta', bank: 'Canja banki', custom_payment: 'Biya na musamman',
      users: 'Masu amfani', profile: 'Bayani', display_name: 'Sunan nunawa', email: 'Imel',
      change_photo: 'Canza hoto', save_profile_admin: 'Ajiye bayani',
      admin_settings: 'Saiti'
    },
    sw: {
      home: 'Nyumbani', plans: 'Mipango', deposit: 'Weka', settings: 'Mipangilio',
      back: 'Rudi', save: 'Hifadhi', cancel: 'Ghairi', edit: 'Hariri', logout: 'Toka',
      session: 'Kipindi', language: 'Lugha', language_hint: 'Chagua lugha ya programu.',
      language_saved: 'Lugha imehifadhiwa',
      my_profile: 'Wasifu wangu', edit_profile: 'Hariri wasifu', profile_setup: 'Weka wasifu',
      username: 'Jina la mtumiaji', transfer_pin: 'PIN ya uhamisho', edit_pin: 'Hariri PIN',
      save_profile: 'Hifadhi wasifu', save_pin: 'Hifadhi PIN',
      status: 'Hali', locked: 'Imefungwa', not_set: 'Haijawekwa', required: 'Inahitajika',
      active_profile: 'Wasifu hai', no_username: 'Hakuna jina',
      pin_hint: 'Inahitajika unapotuma pesa.', pin_edit_hint: 'Angalau herufi 4.',
      current_pin: 'PIN ya sasa', new_pin: 'PIN mpya', confirm_pin: 'Thibitisha PIN',
      dashboard: 'Dashibodi', investment_plans: 'Mipango ya uwekezaji', deposit_funds: 'Weka fedha',
      send_money: 'Tuma pesa', spin_win: 'Zungusha & Shinda', trading: 'Biashara',
      history: 'Historia', red_black: 'Nyekundu / Nyeusi', horse_racing: 'Mbio za farasi',
      withdraw: 'Toa', customer_care: 'Huduma kwa wateja',
      total_balance: 'Jumla ya salio', welcome: 'Karibu',
      pay_installment: 'Lipa awamu inayofuata', withdraw_to_main: 'Toa kwa salio kuu',
      from_balance: 'Kutoka salio kuu', deposit_new: 'Weka mpya',
      select_payment: 'Chagua njia ya malipo', bitcoin: 'Lipa kwa Bitcoin',
      giftcard: 'Kadi ya zawadi', bank: 'Uhamisho wa benki', custom_payment: 'Malipo maalum',
      users: 'Watumiaji', profile: 'Wasifu', display_name: 'Jina la kuonyesha', email: 'Barua pepe',
      change_photo: 'Badilisha picha', save_profile_admin: 'Hifadhi wasifu',
      admin_settings: 'Mipangilio'
    },
    id: {
      home: 'Beranda', plans: 'Paket', deposit: 'Setor', settings: 'Pengaturan',
      back: 'Kembali', save: 'Simpan', cancel: 'Batal', edit: 'Edit', logout: 'Keluar',
      session: 'Sesi', language: 'Bahasa', language_hint: 'Pilih bahasa aplikasi.',
      language_saved: 'Bahasa disimpan',
      my_profile: 'Profil saya', edit_profile: 'Edit profil', profile_setup: 'Atur profil',
      username: 'Nama pengguna', transfer_pin: 'PIN transfer', edit_pin: 'Edit PIN',
      save_profile: 'Simpan profil', save_pin: 'Simpan PIN',
      status: 'Status', locked: 'Terkunci', not_set: 'Belum diatur', required: 'Wajib',
      active_profile: 'Profil aktif', no_username: 'Tidak ada nama',
      pin_hint: 'Diperlukan saat mengirim uang.', pin_edit_hint: 'Minimal 4 karakter.',
      current_pin: 'PIN saat ini', new_pin: 'PIN baru', confirm_pin: 'Konfirmasi PIN',
      dashboard: 'Dasbor', investment_plans: 'Paket investasi', deposit_funds: 'Setor dana',
      send_money: 'Kirim uang', spin_win: 'Putar & Menang', trading: 'Trading',
      history: 'Riwayat', red_black: 'Merah / Hitam', horse_racing: 'Balap kuda',
      withdraw: 'Tarik', customer_care: 'Layanan pelanggan',
      total_balance: 'Total saldo akun', welcome: 'Selamat datang',
      pay_installment: 'Bayar cicilan berikutnya', withdraw_to_main: 'Tarik ke saldo utama',
      from_balance: 'Dari saldo utama', deposit_new: 'Setor baru',
      select_payment: 'Pilih metode pembayaran', bitcoin: 'Bayar dengan Bitcoin',
      giftcard: 'Kartu hadiah', bank: 'Transfer bank', custom_payment: 'Pembayaran kustom',
      users: 'Pengguna', profile: 'Profil', display_name: 'Nama tampilan', email: 'Email',
      change_photo: 'Ganti foto', save_profile_admin: 'Simpan profil',
      admin_settings: 'Pengaturan'
    },
    it: {
      home: 'Home', plans: 'Piani', deposit: 'Deposito', settings: 'Impostazioni',
      back: 'Indietro', save: 'Salva', cancel: 'Annulla', edit: 'Modifica', logout: 'Esci',
      session: 'Sessione', language: 'Lingua', language_hint: 'Scegli la lingua dell\u2019app.',
      language_saved: 'Lingua salvata',
      my_profile: 'Il mio profilo', edit_profile: 'Modifica profilo', profile_setup: 'Configura profilo',
      username: 'Nome utente', transfer_pin: 'PIN di trasferimento', edit_pin: 'Modifica PIN',
      save_profile: 'Salva profilo', save_pin: 'Salva PIN',
      status: 'Stato', locked: 'Bloccato', not_set: 'Non impostato', required: 'Obbligatorio',
      active_profile: 'Profilo attivo', no_username: 'Nessun nome',
      pin_hint: 'Richiesto per inviare denaro.', pin_edit_hint: 'Minimo 4 caratteri.',
      current_pin: 'PIN attuale', new_pin: 'Nuovo PIN', confirm_pin: 'Conferma PIN',
      dashboard: 'Dashboard', investment_plans: 'Piani di investimento', deposit_funds: 'Deposita fondi',
      send_money: 'Invia denaro', spin_win: 'Gira e vinci', trading: 'Trading',
      history: 'Cronologia', red_black: 'Rosso / Nero', horse_racing: 'Corse di cavalli',
      withdraw: 'Preleva', customer_care: 'Assistenza clienti',
      total_balance: 'Saldo totale conto', welcome: 'Benvenuto',
      pay_installment: 'Paga prossima rata', withdraw_to_main: 'Preleva sul saldo principale',
      from_balance: 'Dal saldo principale', deposit_new: 'Nuovo deposito',
      select_payment: 'Seleziona metodo di pagamento', bitcoin: 'Paga con Bitcoin',
      giftcard: 'Carta regalo', bank: 'Bonifico bancario', custom_payment: 'Pagamento personalizzato',
      users: 'Utenti', profile: 'Profilo', display_name: 'Nome visualizzato', email: 'Email',
      change_photo: 'Cambia foto', save_profile_admin: 'Salva profilo',
      admin_settings: 'Impostazioni'
    },
    nl: {
      home: 'Home', plans: 'Plannen', deposit: 'Storten', settings: 'Instellingen',
      back: 'Terug', save: 'Opslaan', cancel: 'Annuleren', edit: 'Bewerken', logout: 'Uitloggen',
      session: 'Sessie', language: 'Taal', language_hint: 'Kies de app-taal.',
      language_saved: 'Taal opgeslagen',
      my_profile: 'Mijn profiel', edit_profile: 'Profiel bewerken', profile_setup: 'Profiel instellen',
      username: 'Gebruikersnaam', transfer_pin: 'Transfer-PIN', edit_pin: 'PIN bewerken',
      save_profile: 'Profiel opslaan', save_pin: 'PIN opslaan',
      status: 'Status', locked: 'Vergrendeld', not_set: 'Niet ingesteld', required: 'Vereist',
      active_profile: 'Actief profiel', no_username: 'Geen naam',
      pin_hint: 'Vereist bij het verzenden van geld.', pin_edit_hint: 'Minimaal 4 tekens.',
      current_pin: 'Huidige PIN', new_pin: 'Nieuwe PIN', confirm_pin: 'Bevestig PIN',
      dashboard: 'Dashboard', investment_plans: 'Investeringsplannen', deposit_funds: 'Geld storten',
      send_money: 'Geld versturen', spin_win: 'Draai & Win', trading: 'Handel',
      history: 'Geschiedenis', red_black: 'Rood / Zwart', horse_racing: 'Paardenrennen',
      withdraw: 'Opnemen', customer_care: 'Klantenservice',
      total_balance: 'Totaal rekeningsaldo', welcome: 'Welkom',
      pay_installment: 'Volgende termijn betalen', withdraw_to_main: 'Opnemen naar hoofdsaldo',
      from_balance: 'Van hoofdsaldo', deposit_new: 'Nieuwe storting',
      select_payment: 'Selecteer betaalmethode', bitcoin: 'Betaal met Bitcoin',
      giftcard: 'Cadeaukaart', bank: 'Bankoverschrijving', custom_payment: 'Aangepaste betaling',
      users: 'Gebruikers', profile: 'Profiel', display_name: 'Weergavenaam', email: 'E-mail',
      change_photo: 'Foto wijzigen', save_profile_admin: 'Profiel opslaan',
      admin_settings: 'Instellingen'
    },
    ja: {
      home: '\u30db\u30fc\u30e0', plans: '\u30d7\u30e9\u30f3', deposit: '\u5165\u91d1', settings: '\u8a2d\u5b9a',
      back: '\u623b\u308b', save: '\u4fdd\u5b58', cancel: '\u30ad\u30e3\u30f3\u30bb\u30eb', edit: '\u7de8\u96c6', logout: '\u30ed\u30b0\u30a2\u30a6\u30c8',
      session: '\u30bb\u30c3\u30b7\u30e7\u30f3', language: '\u8a00\u8a9e', language_hint: '\u30a2\u30d7\u30ea\u306e\u8a00\u8a9e\u3092\u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044\u3002',
      language_saved: '\u8a00\u8a9e\u3092\u4fdd\u5b58\u3057\u307e\u3057\u305f',
      my_profile: '\u30d7\u30ed\u30d5\u30a3\u30fc\u30eb', edit_profile: '\u30d7\u30ed\u30d5\u30a3\u30fc\u30eb\u7de8\u96c6', profile_setup: '\u30d7\u30ed\u30d5\u30a3\u30fc\u30eb\u8a2d\u5b9a',
      username: '\u30e6\u30fc\u30b6\u30fc\u540d', transfer_pin: '\u9001\u91d1PIN', edit_pin: 'PIN\u7de8\u96c6',
      save_profile: '\u30d7\u30ed\u30d5\u30a3\u30fc\u30eb\u4fdd\u5b58', save_pin: 'PIN\u4fdd\u5b58',
      status: '\u72b6\u614b', locked: '\u30ed\u30c3\u30af\u4e2d', not_set: '\u672a\u8a2d\u5b9a', required: '\u5fc5\u9808',
      active_profile: '\u6709\u52b9\u30d7\u30ed\u30d5\u30a3\u30fc\u30eb', no_username: '\u540d\u524d\u306a\u3057',
      pin_hint: '\u9001\u91d1\u6642\u306b\u5fc5\u8981\u3067\u3059\u3002', pin_edit_hint: '\u6700\u4f4e4\u6587\u5b57\u3002',
      current_pin: '\u73fe\u5728\u306ePIN', new_pin: '\u65b0\u3057\u3044PIN', confirm_pin: 'PIN\u78ba\u8a8d',
      dashboard: '\u30c0\u30c3\u30b7\u30e5\u30dc\u30fc\u30c9', investment_plans: '\u6295\u8cc7\u30d7\u30e9\u30f3', deposit_funds: '\u8cc7\u91d1\u5165\u91d1',
      send_money: '\u9001\u91d1', spin_win: '\u30b9\u30d4\u30f3\uff06\u30a6\u30a3\u30f3', trading: '\u53d6\u5f15',
      history: '\u5c65\u6b74', red_black: '\u8d64 / \u9ed2', horse_racing: '\u7af6\u99ac',
      withdraw: '\u51fa\u91d1', customer_care: '\u30ab\u30b9\u30bf\u30de\u30fc\u30b5\u30dd\u30fc\u30c8',
      total_balance: '\u53e3\u5ea7\u7dcf\u6b8b\u9ad8', welcome: '\u3088\u3046\u3053\u305d',
      pay_installment: '\u6b21\u56de\u5272\u8ce6\u3092\u652f\u6255\u3046', withdraw_to_main: '\u30e1\u30a4\u30f3\u6b8b\u9ad8\u3078\u51fa\u91d1',
      from_balance: '\u30e1\u30a4\u30f3\u6b8b\u9ad8\u304b\u3089', deposit_new: '\u65b0\u898f\u5165\u91d1',
      select_payment: '\u652f\u6255\u3044\u65b9\u6cd5\u3092\u9078\u629e', bitcoin: 'Bitcoin\u3067\u652f\u6255\u3046',
      giftcard: '\u30ae\u30d5\u30c8\u30ab\u30fc\u30c9', bank: '\u9280\u884c\u632f\u8fbc', custom_payment: '\u30ab\u30b9\u30bf\u30e0\u652f\u6255\u3044',
      users: '\u30e6\u30fc\u30b6\u30fc', profile: '\u30d7\u30ed\u30d5\u30a3\u30fc\u30eb', display_name: '\u8868\u793a\u540d', email: '\u30e1\u30fc\u30eb',
      change_photo: '\u5199\u771f\u3092\u5909\u66f4', save_profile_admin: '\u30d7\u30ed\u30d5\u30a3\u30fc\u30eb\u4fdd\u5b58',
      admin_settings: '\u8a2d\u5b9a'
    },
    ko: {
      home: '\ud648', plans: '\uacc4\ud68d', deposit: '\uc785\uae08', settings: '\uc124\uc815',
      back: '\ub4a4\ub85c', save: '\uc800\uc7a5', cancel: '\ucde8\uc18c', edit: '\ud3b8\uc9d1', logout: '\ub85c\uadf8\uc544\uc6c3',
      session: '\uc138\uc158', language: '\uc5b8\uc5b4', language_hint: '\uc571 \uc5b8\uc5b4\ub97c \uc120\ud0dd\ud558\uc138\uc694.',
      language_saved: '\uc5b8\uc5b4\uac00 \uc800\uc7a5\ub418\uc5c8\uc2b5\ub2c8\ub2e4',
      my_profile: '\ub0b4 \ud504\ub85c\ud544', edit_profile: '\ud504\ub85c\ud544 \ud3b8\uc9d1', profile_setup: '\ud504\ub85c\ud544 \uc124\uc815',
      username: '\uc0ac\uc6a9\uc790\uba85', transfer_pin: '\uc1a1\uae08 PIN', edit_pin: 'PIN \ud3b8\uc9d1',
      save_profile: '\ud504\ub85c\ud544 \uc800\uc7a5', save_pin: 'PIN \uc800\uc7a5',
      status: '\uc0c1\ud0dc', locked: '\uc7a0\uae40', not_set: '\ubbf8\uc124\uc815', required: '\ud544\uc218',
      active_profile: '\ud65c\uc131 \ud504\ub85c\ud544', no_username: '\uc774\ub984 \uc5c6\uc74c',
      pin_hint: '\uc1a1\uae08 \uc2dc \ud544\uc694\ud569\ub2c8\ub2e4.', pin_edit_hint: '\ucd5c\uc18c 4\uc790.',
      current_pin: '\ud604\uc7ac PIN', new_pin: '\uc0c8 PIN', confirm_pin: 'PIN \ud655\uc778',
      dashboard: '\ub300\uc2dc\ubcf4\ub4dc', investment_plans: '\ud22c\uc790 \uacc4\ud68d', deposit_funds: '\uc790\uae08 \uc785\uae08',
      send_money: '\uc1a1\uae08', spin_win: '\uc2a4\ud540 & \uc2b9\ub9ac', trading: '\ud2b8\ub808\uc774\ub529',
      history: '\ub0b4\uc5ed', red_black: '\ube68\uac15 / \uac80\uc815', horse_racing: '\uacbd\ub9c8',
      withdraw: '\ucd9c\uae08', customer_care: '\uace0\uac1d \uc9c0\uc6d0',
      total_balance: '\ucd1d \uc794\uc561', welcome: '\ud658\uc601\ud569\ub2c8\ub2e4',
      pay_installment: '\ub2e4\uc74c \ud560\ubd80 \uc9c0\uae09', withdraw_to_main: '\uba54\uc778 \uc794\uc561\uc73c\ub85c \ucd9c\uae08',
      from_balance: '\uba54\uc778 \uc794\uc561\uc5d0\uc11c', deposit_new: '\uc0c8 \uc785\uae08',
      select_payment: '\uacb0\uc81c \ubc29\ubc95 \uc120\ud0dd', bitcoin: 'Bitcoin\uc73c\ub85c \uacb0\uc81c',
      giftcard: '\uc120\ubb3c \uce74\ub4dc', bank: '\uc740\ud589 \uc1a1\uae08', custom_payment: '\uc0ac\uc6a9\uc790 \uc9c0\uc815 \uacb0\uc81c',
      users: '\uc0ac\uc6a9\uc790', profile: '\ud504\ub85c\ud544', display_name: '\ud45c\uc2dc \uc774\ub984', email: '\uc774\uba54\uc77c',
      change_photo: '\uc0ac\uc9c4 \ubcc0\uacbd', save_profile_admin: '\ud504\ub85c\ud544 \uc800\uc7a5',
      admin_settings: '\uc124\uc815'
    }
  };

  // Fallback missing langs to English map structure
  function dict(code) {
    return T[code] || T.en;
  }

  function getLang() {
    try {
      var c = localStorage.getItem(STORAGE_KEY) || 'en';
      if (!LANGS.some(function (l) { return l.code === c; })) return 'en';
      return c;
    } catch (e) {
      return 'en';
    }
  }

  function langMeta(code) {
    for (var i = 0; i < LANGS.length; i++) {
      if (LANGS[i].code === code) return LANGS[i];
    }
    return LANGS[0];
  }

  function t(key) {
    var code = getLang();
    var d = dict(code);
    if (d[key] != null) return d[key];
    if (T.en[key] != null) return T.en[key];
    return key;
  }

  function applyDir(code) {
    var meta = langMeta(code);
    try {
      document.documentElement.lang = code;
      document.documentElement.dir = meta.dir || 'ltr';
      if (document.body) {
        document.body.dir = meta.dir || 'ltr';
      }
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
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          // don't overwrite values
        } else {
          el.textContent = val;
        }
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
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch (e) {}
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

  // Auto-apply on load
  function boot() {
    applyPage();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  global.EMA_I18N = {
    LANGS: LANGS,
    t: t,
    getLang: getLang,
    setLang: setLang,
    applyPage: applyPage,
    fillSelect: fillSelect
  };
})(window);
