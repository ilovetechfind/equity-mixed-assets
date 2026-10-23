const SUPABASE_URL = "https://rrdddtmqojyheshznrwl.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJyZGRkdG1xb2p5aGVzaHpucndsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYyODUxNjEsImV4cCI6MjEwMTg2MTE2MX0.0Gp4-6D-TKBMgvHYZhKncfyfcWRTGd2oeSzpJGUg8vQ";

// ✅ Make it GLOBAL
window.client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Gate: new admins need approval (admin_access === true).
// Legacy accounts with null admin_access still allowed.
(async function adminAccessGate() {
  try {
    const path = (location.pathname || '').toLowerCase();
    if (path.endsWith('login.html') || path.endsWith('signup.html') || path.endsWith('pending.html')) return;

    const { data: { session } } = await client.auth.getSession();
    let user = session && session.user;
    if (!user) {
      const r = await client.auth.getUser();
      user = r.data && r.data.user;
    }
    if (!user) {
      location.replace('login.html');
      return;
    }

    const { data: profile } = await client.from('profiles')
      .select('admin_access, role, admin_status')
      .eq('id', user.id)
      .maybeSingle();

    // Explicitly denied or still pending
    if (profile && profile.admin_access === false) {
      location.replace('pending.html');
      return;
    }
  } catch (e) {
    // Don't hard-block on network blips for legacy admins
  }
})();
