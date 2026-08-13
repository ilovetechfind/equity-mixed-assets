const SUPABASE_URL = "https://rrdddtmqojyheshznrwl.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJyZGRkdG1xb2p5aGVzaHpucndsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYyODUxNjEsImV4cCI6MjEwMTg2MTE2MX0.0Gp4-6D-TKBMgvHYZhKncfyfcWRTGd2oeSzpJGUg8vQ";

// Initialize Supabase globally so signup.html and index.html can see it immediately
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
