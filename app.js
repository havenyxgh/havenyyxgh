/* =========================================
   SIDEBAR TOGGLE
========================================= */

function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");

    // toggle classes
    sidebar.classList.toggle("open");
    overlay.classList.toggle("show");
}

console.log("JS loaded");

document.querySelector(".menu-btn")?.addEventListener("click", () => {
    console.log("Menu button clicked");
});



/* =========================================
   DIVISION SWITCH (ONYX ↔ HAVEN)
========================================= */

function switchDivision(mode) {
    const body = document.body;
    const tagline = document.getElementById("divisionTagline");
    const onyxBtn = document.getElementById("onyxBtn");
    const havenBtn = document.getElementById("havenBtn");

    if (mode === "onyx") {
        body.classList.remove("haven");
        body.classList.add("onyx");

        tagline.textContent = "Onyx Touch — where style meets comfort.";

        onyxBtn.classList.add("active");
        havenBtn.classList.remove("active");

    } else {
        body.classList.remove("onyx");
        body.classList.add("haven");

        tagline.textContent = "Haven Haus — everyday essentials, elevated.";

        havenBtn.classList.add("active");
        onyxBtn.classList.remove("active");
    }
}



/* =========================================
   MASCOT – FLOATING GUIDE
========================================= */

let mascotTimer = null;

function showMascotMessage(message) {
    const bubble = document.querySelector(".mascot-bubble");
    const msg = document.querySelector(".mascot-message");

    msg.textContent = message;
    bubble.classList.add("active");

    clearTimeout(mascotTimer);

    mascotTimer = setTimeout(() => {
        bubble.classList.remove("active");
    }, 4000);
}


// Triggers
document.addEventListener("DOMContentLoaded", () => {
    showMascotMessage("Hi! Need help navigating?");
});

document.getElementById("sidebar").addEventListener("mouseenter", () => {
    showMascotMessage("Explore your options here.");
});

document.querySelector(".menu-btn").addEventListener("click", () => {
    showMascotMessage("Opening menu...");
});

document.getElementById("onyxBtn").addEventListener("click", () => {
    showMascotMessage("Switching to Onyx Touch.");
});

document.getElementById("havenBtn").addEventListener("click", () => {
    showMascotMessage("Switching to Haven Haus.");
});



/* =========================================
   NAV HOME (future backend)
========================================= */
function navigateHome() {
    showMascotMessage("Back to homepage.");
    window.location.href = "index.html";
}
