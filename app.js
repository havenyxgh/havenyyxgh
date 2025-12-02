/* ============================================================
   SIDEBAR TOGGLE
============================================================ */
function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");

    const isOpen = sidebar.classList.contains("open");

    if (isOpen) {
        sidebar.classList.remove("open");
        overlay.style.display = "none";
    } else {
        sidebar.classList.add("open");
        overlay.style.display = "block";
    }
}

function navigateHome() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}



/* ============================================================
   DIVISION SWITCHING (ONYX ↔ HAVEN)
============================================================ */
function switchDivision(div) {
    const body = document.body;
    const tagline = document.getElementById("divisionTagline");

    const onyxBtn = document.getElementById("onyxBtn");
    const havenBtn = document.getElementById("havenBtn");

    // Fade out before switching
    body.classList.add("fade");
    setTimeout(() => {
        if (div === "onyx") {
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

        // Fade back in
        body.classList.remove("fade");
        body.classList.add("fade", "show");

        setTimeout(() => {
            body.classList.remove("fade", "show");
        }, 400);

    }, 300);
}



/* ============================================================
   MASCOT GUIDE SYSTEM
============================================================ */
const mascot = document.querySelector(".mascot-bubble");
const mascotMsg = document.querySelector(".mascot-message");

let mascotStep = 0;

const mascotHints = [
    "Hi! Need help navigating?",
    "Use the menu to explore categories.",
    "Switch between Onyx Touch & Haven Haus anytime!",
    "Admin will add products soon — stay tuned.",
    "Tap me anytime if you get lost!"
];

mascot.addEventListener("click", () => {
    mascotStep = (mascotStep + 1) % mascotHints.length;
    mascotMsg.textContent = mascotHints[mascotStep];
});



/* ============================================================
   INITIAL STATE
============================================================ */
document.body.classList.add("onyx"); // default division
