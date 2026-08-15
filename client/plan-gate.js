// Plan Gate Logic for Client Side
function checkTierAccess(tierName) {
    // Fetch user plan status and admin toggle state from your backend API or local storage
    const userPlanData = JSON.parse(localStorage.getItem('user_plan_' + tierName)) || {
        status: 'pending_initial',
        currentStage: 'initial',
        adminWallOverride: true
    };

    // 1. If Admin turned OFF the payment wall override for this tier, go straight to active plan view
    if (userPlanData.adminWallOverride === false) {
        window.location.href = tierName.toLowerCase() + '-active.html';
        return;
    }

    // 2. If payment wall is ON, check if fully active or locked at a specific stage
    if (userPlanData.status !== 'active') {
        // Redirect to deposit / payment wall page based on current stage (initial, weekly, daily)
        window.location.href = `deposit.html?tier=${encodeURIComponent(tierName)}&stage=${userPlanData.currentStage}`;
    } else {
        // Fully active, send to active tier management page
        window.location.href = tierName.toLowerCase() + '-active.html';
    }
}
