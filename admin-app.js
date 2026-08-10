// Ensure Supabase client is initialized via config.js
// Example: const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener('DOMContentLoaded', async () => {
    // Check which page we are on
    const isLoginPage = document.getElementById('admin-email') !== null;
    const isSignupPage = document.getElementById('admin-signup-email') !== null;
    const isDashboard = document.getElementById('admin-greeting') !== null;

    if (isDashboard) {
        await verifyAdminAccess();
        loadActiveCodes();
        loadUsers();
    }
});

// --- 1. AUTHENTICATION & REGISTRATION ---

async function adminLogin() {
    const email = document.getElementById('admin-email').value;
    const password = document.getElementById('admin-password').value;
    const errorMsg = document.getElementById('error-msg');
    
    errorMsg.style.display = 'none';
    
    // Log in via Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });
    
    if (error) {
        errorMsg.innerText = error.message;
        errorMsg.style.display = 'block';
        return;
    }
    
    // Verify the user actually has 'admin' privileges in the profiles table
    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();
        
    if (profile && profile.role === 'admin') {
        window.location.href = 'admin-dashboard.html';
    } else {
        errorMsg.innerText = 'Unauthorized: Admin access required.';
        errorMsg.style.display = 'block';
        await supabase.auth.signOut();
    }
}

async function registerAdmin() {
    const email = document.getElementById('admin-signup-email').value;
    const password = document.getElementById('admin-signup-password').value;
    const errorMsg = document.getElementById('error-msg');
    const successMsg = document.getElementById('success-msg');
    
    errorMsg.style.display = 'none';
    successMsg.style.display = 'none';
    
    if (!email || !password) {
        errorMsg.innerText = "Please fill in all fields.";
        errorMsg.style.display = 'block';
        return;
    }
    
    // 1. Create user in Supabase Auth
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
    });
    
    if (error) {
        errorMsg.innerText = error.message;
        errorMsg.style.display = 'block';
        return;
    }
    
    if (data.user) {
        // 2. Automatically assign 'admin' role in the profiles table
        const { error: profileError } = await supabase
            .from('profiles')
            .insert([
                { id: data.user.id, email: email, role: 'admin' }
            ]);
            
        if (profileError) {
            errorMsg.innerText = "Failed to setup admin profile.";
            errorMsg.style.display = 'block';
            console.error(profileError);
            return;
        }
        
        successMsg.style.display = 'block';
        setTimeout(() => {
            window.location.href = 'admin-dashboard.html';
        }, 1500);
    }
}

async function verifyAdminAccess() {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
        window.location.href = 'admin-login.html';
        return;
    }
    
    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();
        
    if (!profile || profile.role !== 'admin') {
        await supabase.auth.signOut();
        window.location.href = 'admin-login.html';
    }
}

async function adminLogout() {
    await supabase.auth.signOut();
    window.location.href = 'admin-login.html';
}

// --- 2. REFERRAL CODES ---

async function generateCode() {
    const codeInput = document.getElementById('new-promo-code');
    const code = codeInput.value.trim().toUpperCase();
    
    if (!code) {
        alert("Please enter a valid code.");
        return;
    }

    const { data: { session } } = await supabase.auth.getSession();
    
    const { error } = await supabase
        .from('referral_codes')
        .insert([{ code: code, admin_id: session.user.id }]);
        
    if (error) {
        alert("Error creating code. It might already exist.");
        console.error(error);
    } else {
        alert("Code created successfully!");
        codeInput.value = '';
        loadActiveCodes();
    }
}

async function loadActiveCodes() {
    const container = document.getElementById('active-codes-list');
    const { data: { session } } = await supabase.auth.getSession();
    
    const { data: codes, error } = await supabase
        .from('referral_codes')
        .select('code, created_at')
        .eq('admin_id', session.user.id)
        .order('created_at', { ascending: false });
        
    if (error) {
        container.innerHTML = '<p style="color: #ef4444;">Failed to load codes.</p>';
        return;
    }
    
    if (codes.length === 0) {
        container.innerHTML = '<p style="color: #94a3b8;">You have no active codes.</p>';
        return;
    }
    
    let html = '<ul style="list-style-type: none; padding: 0;">';
    codes.forEach(c => {
        html += `<li style="padding: 10px; border-bottom: 1px solid #334155;"><strong>${c.code}</strong></li>`;
    });
    html += '</ul>';
    container.innerHTML = html;
}

// --- 3. MANAGE USERS ---

async function loadUsers() {
    const container = document.getElementById('user-list-container');
    const { data: { session } } = await supabase.auth.getSession();
    
    // Fetch users assigned to this admin
    const { data: users, error } = await supabase
        .from('profiles')
        .select('id, email, balance, used_code')
        .eq('assigned_admin_id', session.user.id)
        .eq('role', 'user');
        
    if (error) {
        container.innerHTML = '<p style="color: #ef4444;">Failed to load users.</p>';
        return;
    }
    
    if (users.length === 0) {
        container.innerHTML = '<p style="color: #94a3b8;">No users have registered with your codes yet.</p>';
        return;
    }
    
    let html = '';
    users.forEach(user => {
        html += `
        <div style="background: #0f172a; padding: 15px; border-radius: 6px; margin-bottom: 10px; border: 1px solid #334155;">
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Used Code:</strong> ${user.used_code}</p>
            <p><strong>Current Balance:</strong> $${user.balance}</p>
            <div style="display: flex; gap: 10px; margin-top: 10px;">
                <input type="number" id="balance-input-${user.id}" placeholder="New Balance" style="padding: 8px; border-radius: 4px; border: 1px solid #475569; background: #1e293b; color: white;">
                <button onclick="updateBalance('${user.id}')" style="background: #10b981; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">Update</button>
            </div>
        </div>
        `;
    });
    container.innerHTML = html;
}

async function updateBalance(userId) {
    const input = document.getElementById(`balance-input-${userId}`);
    const newBalance = parseFloat(input.value);
    
    if (isNaN(newBalance)) {
        alert("Please enter a valid number.");
        return;
    }
    
    const { error } = await supabase
        .from('profiles')
        .update({ balance: newBalance })
        .eq('id', userId);
        
    if (error) {
        alert("Failed to update balance.");
        console.error(error);
    } else {
        alert("Balance updated successfully!");
        input.value = '';
        loadUsers(); // Refresh the list
    }
                  }
                                             

async function forgotPassword() {
    const email = document.getElementById('admin-signup-email').value;
    const errorMsg = document.getElementById('error-msg');
    const successMsg = document.getElementById('success-msg');
    
    errorMsg.style.display = 'none';
    successMsg.style.display = 'none';
    
    if (!email) {
        errorMsg.innerText = "Please enter your email address above first.";
        errorMsg.style.display = 'block';
        return;
    }
    
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/admin-login.html',
    });
    
    if (error) {
        errorMsg.innerText = error.message;
        errorMsg.style.display = 'block';
    } else {
        successMsg.innerText = "Password reset link sent to your email!";
        successMsg.style.display = 'block';
    }
}
