* { box-sizing: border-box; font-family: 'Inter', sans-serif; }
body {
  margin: 0; min-height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  color: #f8fafc; padding: 20px; padding-bottom: 90px;
}
.header {
  display: flex; justify-content: space-between; align-items: center;
  padding-bottom: 20px; border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
.brand-title { font-size: 18px; font-weight: 700; color: #ffffff; }
.menu-btn {
  background: rgba(30, 41, 59, 0.8); border: 1px solid #334155;
  color: white; padding: 8px 12px; border-radius: 8px; cursor: pointer; font-size: 16px;
}

.view-section { display: none; }
.view-section.active { display: block; }

.card {
  background: rgba(30, 41, 59, 0.7); backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px;
  padding: 24px; margin-top: 24px; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}
.balance-header { display: flex; justify-content: space-between; align-items: center; }
.balance-title { color: #94a3b8; font-size: 12px; text-transform: uppercase; font-weight: 500; }
.eye-toggle { background: none; border: none; cursor: pointer; font-size: 16px; color: #94a3b8; }
.balance-amount { font-size: 32px; font-weight: 700; color: #ffffff; margin: 12px 0 0 0; }

.actions-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 20px;
}
.action-btn {
  padding: 14px; border-radius: 12px; border: none; font-weight: 600; font-size: 14px; cursor: pointer; text-align: center;
}
.btn-deposit { background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; }
.btn-plan { background: rgba(30, 41, 59, 0.9); border: 1px solid #334155; color: #f8fafc; }

.volume-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.volume-title { color: #94a3b8; font-size: 12px; text-transform: uppercase; font-weight: 500; }
.volume-stats { font-size: 14px; font-weight: 600; color: #38bdf8; }

.progress-bar-container {
  width: 100%; height: 14px; background: rgba(15, 23, 42, 0.8);
  border-radius: 7px; overflow: hidden; position: relative; border: 1px solid #334155;
}
.progress-bar-fill {
  width: 15%; height: 100%; background: linear-gradient(90deg, #2563eb, #38bdf8, #2563eb);
  background-size: 200% 100%; border-radius: 7px;
  animation: bubbleMove 2s infinite linear;
}
@keyframes bubbleMove {
  0% { background-position: 200% 0; }
  100% { background-position: 0 0; }
}
.volume-note { font-size: 11px; color: #f59e0b; margin-top: 8px; font-style: italic; }

.live-feed-box {
  margin-top: 16px; background: rgba(15, 23, 42, 0.5); border: 1px solid #334155;
  border-radius: 10px; padding: 12px 14px; height: 50px; overflow: hidden; position: relative;
  display: flex; align-items: center;
}
.live-feed-item {
  font-size: 12px; color: #cbd5e1; width: 100%;
  transition: opacity 0.5s ease-in-out; opacity: 1;
}

.promo-box { display: flex; gap: 8px; margin-top: 14px; }
.promo-input {
  flex: 1; padding: 10px 14px; background: rgba(15, 23, 42, 0.6);
  border: 1px solid #334155; border-radius: 8px; color: #ffffff; font-size: 13px; outline: none;
}
.promo-btn {
  padding: 10px 16px; background: #334155; color: white; border: none;
  border-radius: 8px; font-weight: 600; font-size: 13px; cursor: pointer;
}

.chat-bubble-btn {
  position: fixed; bottom: 85px; right: 20px; width: 56px; height: 56px;
  background: linear-gradient(135deg, #2563eb, #1d4ed8); border-radius: 50%;
  display: flex; align-items: center; justify-content: center; cursor: pointer;
  box-shadow: 0 10px 25px rgba(37, 99, 235, 0.5); z-index: 98; border: none; font-size: 24px; color: white;
  transition: transform 0.2s ease;
}
.chat-bubble-btn:hover { transform: scale(1.05); }

.chat-modal {
  position: fixed; bottom: 150px; right: 20px; width: 320px; max-width: calc(100vw - 40px);
  height: 400px; background: #1e293b; border: 1px solid #334155; border-radius: 16px;
  display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 25px 50px rgba(0,0,0,0.5);
  z-index: 102; transform: scale(0); opacity: 0; transform-origin: bottom right; transition: all 0.3s ease;
}
.chat-modal.active { transform: scale(1); opacity: 1; }
.chat-header {
  background: #0f172a; padding: 14px 16px; display: flex; justify-content: space-between; align-items: center;
  border-bottom: 1px solid #334155;
}
.chat-title { font-size: 14px; font-weight: 600; color: white; display: flex; align-items: center; gap: 8px; }
.online-dot { width: 8px; height: 8px; background: #10b981; border-radius: 50%; display: inline-block; }
.chat-close { background: none; border: none; color: #94a3b8; font-size: 18px; cursor: pointer; }
.chat-body { flex: 1; padding: 14px; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; }
.chat-msg { background: rgba(30, 41, 59, 0.9); padding: 10px 12px; border-radius: 10px; font-size: 13px; color: #cbd5e1; max-width: 80%; }
.chat-msg.support { align-self: flex-start; border: 1px solid #334155; }
.chat-msg.user { align-self: flex-end; background: #2563eb; color: white; }
.chat-footer { padding: 10px; background: #0f172a; border-top: 1px solid #334155; display: flex; gap: 8px; }
.chat-input {
  flex: 1; background: rgba(30, 41, 59, 0.8); border: 1px solid #334155; padding: 8px 12px;
  border-radius: 8px; color: white; font-size: 13px; outline: none;
}
.chat-send-btn { background: #2563eb; color: white; border: none; padding: 8px 14px; border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 13px; }

.bottom-nav {
  position: fixed; bottom: 0; left: 0; width: 100%;
  background: rgba(15, 23, 42, 0.95); backdrop-filter: blur(10px);
  border-top: 1px solid #334155; display: flex; justify-content: space-around;
  padding: 10px 0; z-index: 99;
}
.nav-item {
  background: none; border: none; color: #94a3b8; font-size: 12px;
  display: flex; flex-direction: column; align-items: center; gap: 4px; cursor: pointer;
}
.nav-item.active { color: #38bdf8; }
.nav-icon { font-size: 18px; }

.section-header { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; margin-top: 20px; }
.back-btn { background: rgba(30, 41, 59, 0.8); border: 1px solid #334155; color: white; padding: 6px 12px; border-radius: 8px; cursor: pointer; font-size: 14px; }
.section-title { font-size: 18px; font-weight: 600; color: #ffffff; }

.method-card {
  background: rgba(30, 41, 59, 0.7); 
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px; 
  padding: 16px; 
  margin-bottom: 12px; 
  display: flex; 
  align-items: center; 
  justify-content: space-between; 
  cursor: pointer;
}
.method-content-left {
  display: flex;
  align-items: center;
  gap: 14px;
}
.method-icon-box {
  width: 44px;
  height: 44px;
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid #334155;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}
.active-tier-banner {
  background: rgba(30, 41, 59, 0.9);
  border: 1px solid #334155;
  border-radius: 14px;
  padding: 16px 20px;
  margin-bottom: 20px;
}
.active-tier-label {
  font-size: 11px;
  color: #38bdf8;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.5px;
}
.active-tier-title {
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
  margin-top: 4px;
}

.tier-card {
  background: rgba(30, 41, 59, 0.7); border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px; padding: 18px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;
}
.tier-card.active-tier { border-color: #10b981; background: rgba(16, 185, 129, 0.05); }
.tier-name { font-size: 16px; font-weight: 700; color: #ffffff; }
.tier-details { font-size: 12px; color: #94a3b8; margin-top: 4px; }
.tier-badge { font-size: 11px; padding: 4px 10px; border-radius: 6px; font-weight: 600; }
.badge-current { background: #10b981; color: white; }
.badge-select { background: #2563eb; color: white; border: none; cursor: pointer; padding: 4px 10px; border-radius: 6px; font-weight: 600; font-size: 11px; }

.drawer-overlay {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.7); backdrop-filter: blur(4px);
  opacity: 0; pointer-events: none; transition: opacity 0.3s ease; z-index: 100;
}
.drawer-overlay.active { opacity: 1; pointer-events: auto; }
.drawer {
  position: fixed; top: 0; right: -280px; width: 280px; height: 100%;
  background: #1e293b; border-left: 1px solid #334155;
  transition: right 0.3s ease; padding: 24px; display: flex; flex-direction: column; z-index: 101;
}
.drawer.active { right: 0; }
.drawer-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
.drawer-close { background: none; border: none; color: #94a3b8; font-size: 20px; cursor: pointer; }
.drawer-links { display: flex; flex-direction: column; gap: 16px; flex-grow: 1; }
.drawer-links a { color: #f8fafc; text-decoration: none; font-size: 15px; font-weight: 500; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.05); cursor: pointer; }
.logout-btn { background: #ef4444; color: white; border: none; padding: 12px; border-radius: 8px; font-weight: 600; cursor: pointer; width: 100%; }
    
