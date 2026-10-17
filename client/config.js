const SUPABASE_URL = "https://rrdddtmqojyheshznrwl.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJyZGRkdG1xb2p5aGVzaHpucndsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYyODUxNjEsImV4cCI6MjEwMTg2MTE2MX0.0Gp4-6D-TKBMgvHYZhKncfyfcWRTGd2oeSzpJGUg8vQ";

// Single shared client — persist session so navigation does not "lose connection"
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

// Helpers used by pages for stable navigation
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
  // Keep ?id= param when admin is previewing a user
  try {
    const id = new URLSearchParams(window.location.search).get('id');
    if (id && page && !page.includes('?')) {
      window.location.href = page + '?id=' + encodeURIComponent(id);
      return;
    }
  } catch (e) {}
  window.location.href = page;
};
