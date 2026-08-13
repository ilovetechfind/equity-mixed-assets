// ticker.js

const names = ["Jessica", "Michael", "David", "Sarah", "James", "Emma", "Daniel", "Olivia", "Matthew", "Sophia", "Andrew", "Isabella", "Joshua", "Mia", "Christopher", "Charlotte", "Joseph", "Amelia", "William", "Harper", "Lucas", "Evelyn", "Alexander", "Abigail", "Ethan", "Emily", "Jacob", "Elizabeth", "Logan", "Mila"];
const initials = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const cryptos = ["Bitcoin", "Ethereum", "USDT", "Solana", "Litecoin", "USDC"];
const plans = ["Silver", "Gold", "Platinum", "Diamond", "VIP Wealth"];

// Keep track of shown messages to prevent repeats
const history = new Set();

function generateUniqueMessage() {
    let unique = false;
    let icon = "";
    let message = "";
    let attempts = 0;

    while (!unique && attempts < 100) {
        attempts++;
        const name = names[Math.floor(Math.random() * names.length)];
        const initial = initials[Math.floor(Math.random() * initials.length)];
        const actionType = Math.floor(Math.random() * 3); // 0 = deposit, 1 = withdraw, 2 = upgrade

        if (actionType === 0) {
            const amount = (Math.floor(Math.random() * 100) + 1) * 100; // $100 to $10,000
            const crypto = cryptos[Math.floor(Math.random() * cryptos.length)];
            message = `${name} ${initial}. deposited $${amount.toLocaleString()} via ${crypto}`;
            icon = "💎";
        } else if (actionType === 1) {
            const amount = (Math.floor(Math.random() * 50) + 5) * 100; // $500 to $5,500
            message = `${name} ${initial}. withdrew $${amount.toLocaleString()} successfully`;
            icon = "💸";
        } else {
            const plan = plans[Math.floor(Math.random() * plans.length)];
            message = `${name} ${initial}. upgraded to the ${plan} Plan`;
            icon = "🚀";
        }

        const fullString = `${icon} ${message}`;
        
        // Check if we have used this exact string recently
        if (!history.has(fullString)) {
            unique = true;
            history.add(fullString);
            
            // Keep history memory manageable (reset after 5000 unique messages)
            if (history.size > 5000) {
                history.clear();
            }
        }
    }

    return { icon, message };
}

function updateTicker() {
    const tickerBox = document.getElementById("live-ticker");
    if (!tickerBox) return;

    // Fade out
    tickerBox.style.opacity = 0;

    setTimeout(() => {
        const { icon, message } = generateUniqueMessage();
        
        // Update content
        tickerBox.innerHTML = `${icon} <span>${message}</span>`;
        
        // Fade back in
        tickerBox.style.opacity = 1;
    }, 500); // 500ms delay to allow fade out
}

// Start the ticker after page loads
document.addEventListener("DOMContentLoaded", () => {
    const tickerBox = document.getElementById("live-ticker");
    if (tickerBox) {
        // Add CSS transition for smooth fading
        tickerBox.style.transition = "opacity 0.5s ease-in-out";
        
        // Change message every 4.5 seconds
        setInterval(updateTicker, 4500);
    }
});
