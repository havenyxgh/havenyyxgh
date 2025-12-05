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
// ------------------------------
// ADMIN TAB SWITCHING SYSTEM
// ------------------------------
const adminTabs = document.querySelectorAll(".admin-tab");
const adminSections = document.querySelectorAll(".admin-section");

adminTabs.forEach(tab => {
    tab.addEventListener("click", () => {
        const target = tab.getAttribute("data-admin-tab");

        // remove active highlight
        adminTabs.forEach(t => t.classList.remove("active"));

        // hide all sections
        adminSections.forEach(sec => sec.style.display = "none");

        // activate clicked tab + show section
        tab.classList.add("active");
        document.getElementById(`admin-${target}`).style.display = "block";
  
    if (target === "orders") loadAdminOrders();
    if (target === "sales") loadAdminSales();
if (target === "inbox") loadAdminInbox();

  });
});

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
      prodImagePreview.src = e.target.result;
      prodImageText.value = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

    
 document.getElementById("adminHomeBtn").addEventListener("click", () => {
  document.getElementById("admin").style.display = "none";
  document.getElementById("content").style.display = "block";
});



/* ================================
   ADMIN — ORDERS TAB
================================= */

// Read orders
function getOrders() {
    return JSON.parse(localStorage.getItem("orders") || "[]");
}

// Save orders
function saveOrders(list) {
    localStorage.setItem("orders", JSON.stringify(list));
}

// Render orders into admin tab
function renderOrders() {
    const orders = getOrders();
    const container = document.getElementById("ordersList");

    if (!container) return;

    if (orders.length === 0) {
        container.innerHTML = `<p class="placeholder">No orders yet.</p>`;
        return;
    }

    container.innerHTML = orders.map(o => `
        <div class="admin-order-card">
            <p><strong>Product:</strong> ${o.product}</p>
            <p><strong>Price:</strong> GHS ${o.price}</p>
            <p><strong>Customer:</strong> ${o.customer}</p>
            <p><strong>Date:</strong> ${o.date}</p>
        </div>
    `).join("");
}

// TEMP: Create a test order when clicking a product price (demo only)
document.addEventListener("click", e => {
    if (e.target.classList.contains("new-price")) {
        const productName = e.target.closest(".product-card").querySelector(".product-name").textContent;
        const price = e.target.textContent.replace("GHS ", "");

        const orders = getOrders();

        orders.push({
            product: productName,
            price: price,
            customer: "Demo User",
            date: new Date().toLocaleString(),
        });

        saveOrders(orders);
        renderOrders();
        alert("Order created for testing!");
    }
});

// When orders tab is opened
// ------------------------------
// ADMIN: ORDERS MANAGEMENT
// ------------------------------
function loadAdminOrders() {
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    const container = document.getElementById("ordersList");

    if (!orders.length) {
        container.innerHTML = `<div class="placeholder">No orders yet.</div>`;
        return;
    }

    container.innerHTML = orders.map((o, i) => `
        <div class="orderItem">
            <p><b>Order ID:</b> ${o.id}</p>
            <p><b>Customer:</b> ${o.name}</p>
            <p><b>Total:</b> GHS ${o.total}</p>
            <p><b>Status:</b> 
                <select data-order-index="${i}" class="orderStatusSelect">
                    <option ${o.status === "Pending" ? "selected" : ""}>Pending</option>
                    <option ${o.status === "Processing" ? "selected" : ""}>Processing</option>
                    <option ${o.status === "Completed" ? "selected" : ""}>Completed</option>
                </select>
            </p>
            <hr>
        </div>
    `).join("");

    document.querySelectorAll(".orderStatusSelect").forEach(sel => {
        sel.addEventListener("change", e => {
            const idx = e.target.dataset.orderIndex;
            orders[idx].status = e.target.value;
            localStorage.setItem("orders", JSON.stringify(orders));
        });
    });
}
// ------------------------------
// ADMIN: SALES SYSTEM
// ------------------------------
function loadAdminSales() {
    const sales = JSON.parse(localStorage.getItem("sales") || "[]");
    const container = document.getElementById("salesList");

    if (!sales.length) {
        container.innerHTML = `<div class="placeholder">No active discounts.</div>`;
        return;
    }

    container.innerHTML = sales.map((s, i) => `
        <div class="saleItem">
            <p><b>Category:</b> ${s.category}</p>
            <p><b>Discount:</b> ${s.percent}% OFF</p>
            <button data-sale-index="${i}" class="deleteSaleBtn">Delete</button>
            <hr>
        </div>
    `).join("");

    document.querySelectorAll(".deleteSaleBtn").forEach(btn => {
        btn.addEventListener("click", e => {
            const idx = e.target.dataset.saleIndex;
            sales.splice(idx, 1);
            localStorage.setItem("sales", JSON.stringify(sales));
            loadAdminSales();
        });
    });
}
// ------------------------------
// ADMIN: INBOX
// ------------------------------
function loadAdminInbox() {
    const inbox = JSON.parse(localStorage.getItem("inbox") || "[]");
    const container = document.getElementById("adminInboxList");

    if (!inbox.length) {
        container.innerHTML = `<div class="placeholder">No messages yet.</div>`;
        return;
    }

    container.innerHTML = inbox.map((m, i) => `
        <div class="messageItem">
            <p><b>Name:</b> ${m.name}</p>
            <p><b>Email:</b> ${m.email}</p>
            <p><b>Message:</b> ${m.message}</p>
            <button data-msg-index="${i}" class="deleteMsgBtn">Delete</button>
            <hr>
        </div>
    `).join("");

    document.querySelectorAll(".deleteMsgBtn").forEach(btn => {
        btn.addEventListener("click", e => {
            const idx = e.target.dataset.msgIndex;
            inbox.splice(idx, 1);
            localStorage.setItem("inbox", JSON.stringify(inbox));
            loadAdminInbox();
        });
    });
}
