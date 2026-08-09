const SUPABASE_URL = 'https://rrddtmqojyheshznrwl.supabase.co';
const SUPABASE_ANON_KEY = 'Sb_publishable_0fS5eYtsQL8tZz67eSWDvQ_G4flOw5M';

// Correct initialization for the global Supabase client
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
