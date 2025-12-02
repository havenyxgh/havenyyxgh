console.log("app.js loaded");


// =====================
// SIDEBAR FUNCTIONALITY
// =====================

const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const openBtn = document.getElementById("sidebarToggleTop");  // ☰ button
const closeBtn = document.getElementById("sidebarToggle");     // × button

const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const openBtn = document.getElementById("sidebarToggleTop");  // ☰ button
const closeBtn = document.getElementById("sidebarToggle");     // × button

function toggleSidebar() {
    sidebar.classList.toggle("open");
    overlay.classList.toggle("show");
    console.log("Sidebar toggled");
}

openBtn?.addEventListener("click", toggleSidebar);
closeBtn?.addEventListener("click", toggleSidebar);
overlay?.addEventListener("click", toggleSidebar);




// =====================
// DIVISION SWITCH
// =====================

const divisionToggle = document.getElementById("divisionToggle");
const divisionTagline = document.getElementById("divisionTagline");

divisionToggle?.addEventListener("click", (e) => {
    if (e.target.tagName !== "SPAN") return;

    const spans = divisionToggle.querySelectorAll("span");
    spans.forEach(s => s.classList.remove("active"));
    e.target.classList.add("active");

    if (e.target.textContent === "Onyx Touch") {
        document.body.dataset.division = "onyx";
        divisionTagline.textContent = "Onyx Touch — where style meets comfort.";
    } else {
        document.body.dataset.division = "haven";
        divisionTagline.textContent = "Haven Haus — everyday essentials, elevated.";
    }
});




// =====================
// MASCOT PANEL
// =====================

const mascot = document.getElementById("mascotAssistant");
const mascotPanel = document.getElementById("mascotMessagePanel");
const closeMascot = document.getElementById("mascotMessageClose");
const mascotForm = document.getElementById("mascotMessageForm");
const mascotInput = document.getElementById("mascotMessageInput");

mascot?.addEventListener("click", () => {
    mascotPanel.classList.add("open");
});

closeMascot?.addEventListener("click", () => {
    mascotPanel.classList.remove("open");
});

mascotForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Message sent:", mascotInput.value);
    mascotInput.value = "";
    mascotPanel.classList.remove("open");
});




// =====================
// NAVIGATE HOME
// =====================

function navigateHome() {
    window.location.href = "index.html";
}
