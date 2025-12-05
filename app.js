console.log("app.js loaded");


// ===========================
// SIDEBAR FUNCTIONALITY
// ===========================

const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const openBtn = document.getElementById("sidebarToggleTop");
const closeBtn = document.getElementById("sidebarToggle");

// Open sidebar
openBtn.addEventListener("click", () => {
    sidebar.classList.add("open");
    overlay.classList.add("show");
});

// Close sidebar (button inside panel)
closeBtn.addEventListener("click", () => {
    sidebar.classList.remove("open");
    overlay.classList.remove("show");
});

// Close when clicking background overlay
overlay.addEventListener("click", () => {
    sidebar.classList.remove("open");
    overlay.classList.remove("show");
});




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
// Smooth fade-in topbar on scroll
const topbar = document.querySelector(".topbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
        topbar.classList.add("scrolled");
    } else {
        topbar.classList.remove("scrolled");
    }
});
// ===============================
// GOLD HALO SCROLL EFFECT
// ===============================
const haloBar = document.getElementById("haloBar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
        haloBar.style.opacity = "1";
    } else {
        haloBar.style.opacity = "0";
    }
});
/* ================================
   IMAGE PREVIEW FOR ADMIN PRODUCT FORM
=================================== */

const prodImageFile = document.getElementById("prodImageFile");
const prodImagePreview = document.getElementById("prodImagePreview");
const prodImageText = document.getElementById("prodImage");

if (prodImageFile) {
  prodImageFile.addEventListener("change", () => {
    const file = prodImageFile.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = e => {
      // Show image preview
      prodImagePreview.src = e.target.result;

      // Store base64 in hidden text input so it saves
      prodImageText.value = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}
document.getElementById("adminHomeBtn").addEventListener("click", () => {
  document.getElementById("admin").style.display = "none";
  document.getElementById("content").style.display = "block";
});
