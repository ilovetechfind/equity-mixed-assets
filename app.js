let isBalanceHidden = false;
let currentBalance = "$0.00";

async function checkUser() {
  const { data: { user } } = await supabaseClient.auth.getUser();
  if (!user) {
    window.location.href = 'index.html';
  } else {
    // Load profile data if user is logged in
    loadUserProfile();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  switchView('main-view');
});

async function loadUserProfile() {
  const { data: { session } } = await supabaseClient.auth.getSession();
  if (!session) return;

  const { data: profile, error } = await supabaseClient
    .from('profiles')
    .select('balance, avatar_url')
    .eq('id', session.user.id)
    .single();

  if (profile) {
    // Format the balance properly
    currentBalance = '$' + (profile.balance || 0).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
    
    // Update display if it is not currently hidden
    if (!isBalanceHidden) {
      document.getElementById('balance-display').innerText = currentBalance;
    }
    
    // Update avatar if the user has one
    if (profile.avatar_url) {
      document.getElementById('user-profile-pic').src = profile.avatar_url;
    }
  }
}

async function requestWithdrawal() {
  const amountInput = document.getElementById('withdraw-amount-input');
  const amount = parseFloat(amountInput.value);

  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid withdrawal amount.");
    return;
  }

  const { data: { session } } = await supabaseClient.auth.getSession();
  if (!session) {
    alert("You must be logged in to withdraw.");
    return;
  }

  // Fetch current balance to verify they have enough funds
  const { data: profile } = await supabaseClient
    .from('profiles')
    .select('balance')
    .eq('id', session.user.id)
    .single();

  if (!profile || (profile.balance || 0) < amount) {
    alert("Insufficient balance for this withdrawal.");
    return;
  }

  // Deduct the requested amount from the balance
  const { error } = await supabaseClient
    .from('profiles')
    .update({ balance: profile.balance - amount })
    .eq('id', session.user.id);

  if (error) {
    alert("Withdrawal failed. Please try again.");
    console.error(error);
  } else {
    alert("Withdrawal request submitted successfully!");
    amountInput.value = '';
    // Refresh the profile to show the new lower balance
    loadUserProfile();
  }
}

function switchView(viewId) {
  document.querySelectorAll('.view-section').forEach(el => {
    el.classList.remove('active');
    el.style.display = 'none';
  });
  const target = document.getElementById(viewId);
  if (target) {
    target.classList.add('active');
    target.style.display = 'block';
  }
  window.scrollTo(0, 0);
}

function setActiveNav(btn) {
  document.querySelectorAll('.bottom-nav .nav-item').forEach(el => el.classList.remove('active'));
  btn.classList.add('active');
}

function toggleMenu() {
  document.getElementById('drawer').classList.toggle('active');
  document.getElementById('drawer-overlay').classList.toggle('active');
}

function toggleChatModal() {
  document.getElementById('chat-modal').classList.toggle('active');
}

function sendChatMessage() {
  const input = document.getElementById('chat-input-field');
  const text = input.value.trim();
  if (!text) return;

  const chatBody = document.getElementById('chat-body');
  
  const userMsg = document.createElement('div');
  userMsg.className = 'chat-msg user';
  userMsg.innerText = text;
  chatBody.appendChild(userMsg);

  input.value = '';
  chatBody.scrollTop = chatBody.scrollHeight;

  setTimeout(() => {
    const supportMsg = document.createElement('div');
    supportMsg.className = 'chat-msg support';
    supportMsg.innerText = "Thank you for reaching out. A customer care representative will review your message and respond shortly.";
    chatBody.appendChild(supportMsg);
    chatBody.scrollTop = chatBody.scrollHeight;
  }, 1000);
}

function handleChatKeyPress(event) {
  if (event.key === 'Enter') {
    sendChatMessage();
  }
}

function toggleBalance() {
  isBalanceHidden = !isBalanceHidden;
  const display = document.getElementById('balance-display');
  const eye = document.getElementById('eye-icon');
  display.innerText = isBalanceHidden ? "$***" : currentBalance;
  eye.innerText = isBalanceHidden ? "🙈" : "👁️";
}

function applyPromoCode() {
  const code = document.getElementById('promo-input-field').value.trim();
  if (!code) {
    alert('Please enter a valid promo code.');
  } else {
    alert(`Promo code "${code}" submitted for verification.`);
  }
}

const fallbackNotifications = [
  "⚡ Alex M. deposited $1,200 via Bitcoin",
  "🚀 Sarah K. upgraded to Gold Tier",
  "💵 David L. withdrew $450 to crypto wallet",
  "🌟 Emma W. invested in Super Platinum Tier",
  "🔥 Michael B. deposited $3,500 via Bank Transfer",
  "💎 Jessica T. deposited $5,000 via Bitcoin",
  "🚀 Robert P. upgraded to Super Platinum God Tier",
  "💵 Chris D. withdrew $1,200 to crypto wallet"
];

function startNotificationStream() {
  const noticeElement = document.getElementById('notification-text');
  if (!noticeElement) return;

  const dataSource = (window.liveNotificationData && window.liveNotificationData.length > 0) 
    ? window.liveNotificationData 
    : fallbackNotifications;

  function showRandomNotice() {
    const randomMsg = dataSource[Math.floor(Math.random() * dataSource.length)];
    
    noticeElement.style.opacity = '0';

    setTimeout(() => {
      noticeElement.innerText = randomMsg;
      noticeElement.style.opacity = '1';
    }, 500);

    const randomDelay = Math.random() * 2000 + 4000;
    setTimeout(showRandomNotice, randomDelay);
  }

  showRandomNotice();
}

async function logout() {
  await supabaseClient.auth.signOut();
  window.location.href = 'index.html';
}

checkUser();
startNotificationStream();
