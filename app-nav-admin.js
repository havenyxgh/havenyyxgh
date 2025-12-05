/* ===========================================================
   app-nav-admin.js
   - Sidebar navigation controller
   - Simple client-side Admin auth (prototype only)
   - Product CRUD stored in localStorage for prototyping
   - Tab persistence + UI wiring
   =========================================================== */

/* ===========================
   CONFIG / PROTOTYPE CREDENTIALS
   =========================== */
/*
 NOTE: These prototype credentials are for local preview only.
 For production, move auth to a server (Firebase, Supabase, or your own API).
*/
const PROTO_ADMIN = {
  email: "magdalynnanon@gmail.com",
  password: "Davelyn2729",
  entryCode: "0987", // second stage
  entryPasswords: ["adminsomah", "admincurry"] // either allowed
};

const STORAGE_KEYS = {
  PRODUCTS: "havenyx_products_v1",
  ACTIVE_TAB: "havenyx_active_tab",
  WISHLIST: "havenyx_wishlist",
  CART: "havenyx_cart",
  ADMIN_AUTH: "havenyx_admin_authed" // boolean flag
};

/* ===========================
   DOM SELECTORS
   =========================== */
const navButtons = () => Array.from(document.querySelectorAll(".nav-btn"));
const adminEntryBtn = document.getElementById("adminEntryBtn");
const pageSections = () => Array.from(document.querySelectorAll(".page-section"));
const productGridSales = document.getElementById("salesGrid");
const productGridExplore = document.getElementById("exploreGrid");
const adminProductsList = document.getElementById("adminProductsList");
const productForm = document.getElementById("productForm");
const saveProductBtn = document.getElementById("saveProductBtn");

/* ===========================
   STATE
   =========================== */
let products = []; // local runtime array
let editingProductId = null;

/* ===========================
   UTIL: localStorage helpers
   =========================== */
function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Storage save error:", e);
  }
}
function readFromStorage(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    console.error("Storage read error:", e);
    return fallback;
  }
}

/* ===========================
   NAVIGATION: show/hide sections
   =========================== */
function showTab(tabId, pushToStorage = true) {
  pageSections().forEach(sec => {
    if (sec.id === tabId) sec.style.display = "";
    else sec.style.display = "none";
  });

  // active state on sidebar buttons
  navButtons().forEach(btn => {
    if (btn.dataset.tab === tabId) btn.classList.add("active");
    else btn.classList.remove("active");
  });

  if (pushToStorage) saveToStorage(STORAGE_KEYS.ACTIVE_TAB, tabId);
}

/* ===========================
   NAV INITIALIZATION
   =========================== */
function initNavigation() {
  // Button click wiring
  navButtons().forEach(btn => {
    btn.addEventListener("click", () => {
      const tab = btn.dataset.tab;
      if (!tab) return;
      // Special: if admin nav clicked but not authed, prompt to login
      if (tab === "admin" && !isAdminAuthed()) {
        triggerAdminLogin();
        return;
      }
      showTab(tab);
    });
  });

  // Admin entry button visibility (if authed)
  if (isAdminAuthed()) revealAdminEntry();

  // Load active tab from storage, default to "home"
  const saved = readFromStorage(STORAGE_KEYS.ACTIVE_TAB, "home");
  showTab(saved, false);
}

/* ===========================
   ADMIN AUTH FUNCTIONS
   =========================== */
function setAdminAuthed(val) {
  saveToStorage(STORAGE_KEYS.ADMIN_AUTH, !!val);
  if (val) revealAdminEntry();
  else {
    if (adminEntryBtn) adminEntryBtn.style.display = "none";
  }
}
function isAdminAuthed() {
  return !!readFromStorage(STORAGE_KEYS.ADMIN_AUTH, false);
}
function revealAdminEntry() {
  if (adminEntryBtn) adminEntryBtn.style.display = "";
  // If admin is currently authed and admin section is the active tab, show it
  const saved = readFromStorage(STORAGE_KEYS.ACTIVE_TAB, "home");
  if (saved === "admin") showTab("admin");
}

/* Admin login flow (prompt-based for prototype) */
function triggerAdminLogin() {
  // Step 1: email + password
  const email = prompt("Admin login — Email:");
  if (!email) return alert("Admin login cancelled.");
  const pwd = prompt("Password:");
  if (!pwd) return alert("Admin login cancelled.");

  if (email.trim().toLowerCase() !== PROTO_ADMIN.email || pwd !== PROTO_ADMIN.password) {
    return alert("Invalid admin credentials (prototype).");
  }

  // Step 2: entry code
  const code = prompt("Enter admin entry code:");
  if (code !== PROTO_ADMIN.entryCode) {
    return alert("Invalid entry code.");
  }

  // Step 3: entry password (one of allowed)
  const entryPwd = prompt("Enter admin entry password (secondary):");
  if (!PROTO_ADMIN.entryPasswords.includes(entryPwd)) {
    return alert("Invalid secondary admin password.");
  }

  // Success
  setAdminAuthed(true);
  alert("Admin authenticated (prototype). Admin menu unlocked.");
  // show admin tab
  showTab("admin");
}

/* ===========================
   PRODUCTS: load / save / render
   =========================== */
function loadProducts() {
  products = readFromStorage(STORAGE_KEYS.PRODUCTS, [
    // seed with some sample items (optional)
    {
      id: Date.now(),
      brand: "Onyx Touch",
      name: "Minimalist Silk Scarf",
      price: 150,
      oldPrice: 200,
      category: "Clothing",
      colors: ["Black"],
      sizes: [],
      image: ""
    }
  ]);
}

function saveProducts() {
  saveToStorage(STORAGE_KEYS.PRODUCTS, products);
}

/* sanitize number helper */
function toNumber(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

function renderProductCard(p) {
  const el = document.createElement("div");
  el.className = "product-card";
  el.innerHTML = `
    <div class="product-img">${p.image ? `<img src="${p.image}" alt="${escapeHtml(p.name)}" style="width:100%;height:100%;object-fit:cover;border-radius:12px" />` : "IMG"}</div>
    <h4 class="product-title">${escapeHtml(p.name)}</h4>
    <div class="product-price"><span class="new">GHS ${p.price}</span>${p.oldPrice ? `<span class="old">GHS ${p.oldPrice}</span>` : ""}</div>
  `;
  return el;
}

/* render sales & explore grids from products array */
function renderProductGrids() {
  if (productGridSales) {
    productGridSales.innerHTML = "";
    // show items with a discount first (basic rule for sales)
    const sales = products.filter(p => p.oldPrice && p.oldPrice > p.price);
    sales.forEach(p => productGridSales.appendChild(renderProductCard(p)));
  }
  if (productGridExplore) {
    productGridExplore.innerHTML = "";
    products.forEach(p => {
      productGridExplore.appendChild(renderProductCard(p));
    });
  }
}

/* Render admin products list for management */
function renderAdminProductsList() {
  if (!adminProductsList) return;
  adminProductsList.innerHTML = "";
  products.forEach(p => {
    const box = document.createElement("div");
    box.style.padding = "10px";
    box.style.borderBottom = "1px solid #eee";
    box.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <div>
          <div style="font-weight:600">${escapeHtml(p.name)}</div>
          <div style="font-size:13px;color:#666">${escapeHtml(p.brand)} • ${escapeHtml(p.category || "")}</div>
        </div>
        <div style="display:flex;gap:8px">
          <button class="edit-btn" data-id="${p.id}">Edit</button>
          <button class="del-btn" data-id="${p.id}">Delete</button>
        </div>
      </div>
    `;
    adminProductsList.appendChild(box);
  });

  // wire edit/delete
  Array.from(adminProductsList.querySelectorAll(".edit-btn")).forEach(b => {
    b.addEventListener("click", (e) => {
      const id = Number(e.target.dataset.id);
      startEditProduct(id);
    });
  });
  Array.from(adminProductsList.querySelectorAll(".del-btn")).forEach(b => {
    b.addEventListener("click", (e) => {
      const id = Number(e.target.dataset.id);
      if (!confirm("Delete product?")) return;
      products = products.filter(x => x.id !== id);
      saveProducts();
      renderProductGrids();
      renderAdminProductsList();
    });
  });
}

/* ===========================
   PRODUCT FORM (ADMIN)
   =========================== */
function resetProductForm() {
  if (!productForm) return;
  productForm.reset();
  editingProductId = null;
  saveProductBtn.textContent = "Save Product";
}

function startEditProduct(id) {
  const p = products.find(x => x.id === id);
  if (!p || !productForm) return;
  editingProductId = id;
  productForm.prodBrand.value = p.brand || "";
  productForm.prodName.value = p.name || "";
  productForm.prodPrice.value = p.price || "";
  productForm.prodOldPrice.value = p.oldPrice || "";
  productForm.prodCategory.value = p.category || "";
  productForm.prodColors.value = (p.colors || []).join(",");
  productForm.prodSizes.value = (p.sizes || []).join(",");
  productForm.prodImage.value = p.image || "";
  saveProductBtn.textContent = "Update Product";
  // bring admin products pane into focus
  showTab("admin");
  // ensure admin tab content is visible (admin tab should already be selected)
}

function handleProductFormSubmit(e) {
  e.preventDefault();
  if (!productForm) return;
  // gather data
  const brand = productForm.prodBrand.value.trim();
  const name = productForm.prodName.value.trim();
  const price = toNumber(productForm.prodPrice.value);
  const oldPrice = toNumber(productForm.prodOldPrice.value);
  const category = productForm.prodCategory.value.trim();
  const colors = productForm.prodColors.value.split(",").map(s => s.trim()).filter(Boolean);
  const sizes = productForm.prodSizes.value.split(",").map(s => s.trim()).filter(Boolean);
  const image = productForm.prodImage.value.trim();

  if (!name || !brand || !price) return alert("Brand, name, and price are required.");

  if (editingProductId) {
    // update
    const idx = products.findIndex(p => p.id === editingProductId);
    if (idx === -1) return alert("Product not found.");
    products[idx] = {
      ...products[idx],
      brand, name, price, oldPrice, category, colors, sizes, image
    };
    alert("Product updated.");
  } else {
    // create
    const newP = {
      id: Date.now() + Math.floor(Math.random() * 999),
      brand, name, price, oldPrice, category, colors, sizes, image
    };
    products.unshift(newP); // newest first
    alert("Product created.");
  }

  saveProducts();
  renderProductGrids();
  renderAdminProductsList();
  resetProductForm();
}

/* ===========================
   HELPERS
   =========================== */
function escapeHtml(str = "") {
  return String(str).replace(/[&<>"']/g, m => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[m]));
}

/* ===========================
   BOOTSTRAP
   =========================== */
function bootstrapAppNavAdmin() {
  // load products
  loadProducts();
  renderProductGrids();

  // render admin list (only visible if authed, but safe to render)
  renderAdminProductsList();

  // wire product form
  if (productForm) {
    productForm.addEventListener("submit", handleProductFormSubmit);
    // assign short names to inputs for easier use (these are name attributes in your form)
    productForm.prodBrand = productForm.querySelector("#prodBrand");
    productForm.prodName = productForm.querySelector("#prodName");
    productForm.prodPrice = productForm.querySelector("#prodPrice");
    productForm.prodOldPrice = productForm.querySelector("#prodOldPrice");
    productForm.prodCategory = productForm.querySelector("#prodCategory");
    productForm.prodColors = productForm.querySelector("#prodColors");
    productForm.prodSizes = productForm.querySelector("#prodSizes");
    productForm.prodImage = productForm.querySelector("#prodImage");
  }

  // admin entry button opens admin tab if authed
  if (adminEntryBtn) {
    adminEntryBtn.addEventListener("click", (e) => {
      if (!isAdminAuthed()) return triggerAdminLogin();
      showTab("admin");
    });
  }

  // admin quick login trigger: ctrl+shift+A (handy)
  window.addEventListener("keydown", (ev) => {
    if (ev.ctrlKey && ev.shiftKey && ev.key.toLowerCase() === "a") {
      ev.preventDefault();
      if (!isAdminAuthed()) triggerAdminLogin();
      else {
        // toggle off
        if (confirm("Sign out admin?")) {
          setAdminAuthed(false);
          alert("Admin signed out (prototype).");
          showTab("home");
        }
      }
    }
  });

  // initial navigation setup
  initNavigation();

  // If admin already authed previously, reveal the button
  if (isAdminAuthed()) revealAdminEntry();

  // small UX: if you load admin and there's no products, prefill with an example
  if (products.length === 0) {
    // nothing — no forced seed here
  }
}

/* ===========================
   RUN
   =========================== */
document.addEventListener("DOMContentLoaded", () => {
  bootstrapAppNavAdmin();
});
/* ===========================
   IMAGE UPLOADER (client-side base64)
   Append to bottom of app-nav-admin.js
   =========================== */

(function() {
  // safe-guards in case elements aren't present
  const fileInput = document.getElementById("prodImageFile");
  const previewImg = document.getElementById("prodImagePreview");
  const prodImageInput = document.getElementById("prodImage");

  // helper: convert File -> base64 string (returns Promise)
  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      if (!file) return resolve(null);
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  }

  // Populate preview and hidden input when user selects a file
  async function handleFileChange(e) {
    const f = e.target.files && e.target.files[0];
    if (!f) return;

    // quick file size guard (5MB)
    const maxMB = 5;
    if (f.size > maxMB * 1024 * 1024) {
      alert(`File is too large — please select an image under ${maxMB} MB.`);
      fileInput.value = ""; // reset
      return;
    }

    try {
      const base64 = await fileToBase64(f);
      // set preview
      if (previewImg) previewImg.src = base64;
      // set the productForm's image field (used by existing product form logic)
      if (prodImageInput) prodImageInput.value = base64;
    } catch (err) {
      console.error("Failed to convert image:", err);
      alert("Failed to process image file.");
    }
  }

  // If the manual URL field (prodImage) changes (user pastes a URL or clears), update preview
  function handleManualUrlChange(e) {
    const v = e.target.value && e.target.value.trim();
    if (!v) {
      if (previewImg) previewImg.src = "";
      return;
    }

    // If it's a base64 string already, show it; otherwise try to use it as src (may be remote URL)
    if (v.startsWith("data:image/")) {
      if (previewImg) previewImg.src = v;
    } else {
      // it's probably a URL — set preview but allow browser caching / CORS to handle image load failures
      if (previewImg) {
        previewImg.src = v;
      }
    }
  }

  // reset preview & file input when product form resets
  function resetUploaderPreview() {
    if (previewImg) previewImg.src = "";
    if (fileInput) fileInput.value = "";
    if (prodImageInput) prodImageInput.value = "";
  }

  // expose a small hook: bootstrap integration if productForm exists in current scope
  document.addEventListener("DOMContentLoaded", () => {
    // wire file input
    if (fileInput) fileInput.addEventListener("change", handleFileChange);

    // wire manual URL change
    if (prodImageInput) prodImageInput.addEventListener("input", handleManualUrlChange);

    // Attempt to reuse existing resetProductForm if present
    if (typeof resetProductForm === "function") {
      // wrap original reset to also clear uploader preview
      const origReset = resetProductForm;
      window.resetProductForm = function() {
        origReset();
        resetUploaderPreview();
      };
    } else {
      // if not present, export our own for admin UI usage
      window.resetProductForm = resetUploaderPreview;
    }
  });

})();

