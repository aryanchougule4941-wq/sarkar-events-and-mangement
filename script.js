
// ============================================
// SARKAR EVENTS - PREMIUM GALLERY & ENQUIRIES
// ============================================

const collections = {
  "Wedding": [
    { url: "https://i.ibb.co/mFC92hpm/IMG-1928-1.jpg", price: 90000 },
    { url: "https://i.ibb.co/XZvSvWsL/IMG-1595.jpg", price: 70000 },
    { url: "https://i.ibb.co/99FTnjw4/IMG-1741-JPG.jpg", price: 60000 },
    { url: "https://i.ibb.co/DfdTtnBn/IMG-1927.jpg", price: 75000 },
    { url: "https://i.ibb.co/b5DZv2Z2/IMG-1601-JPG.jpg", price: 45000 },
    { url: "https://i.ibb.co/gkhwjbW/IMG-1951.jpg", price: 85000 }
  ],

 Haldi: [
    { url: "https://i.ibb.co/27P30Bfh/IMG-1938.jpg", price: 7000 },
    { url: "https://i.ibb.co/n8ZJTJs7/IMG-1936.jpg", price: 16000 },
    { url: "https://i.ibb.co/4ZkmgfdY/IMG-1941.jpg", price: 9000 },
    { url: "https://i.ibb.co/ZrFysXM/IMG-1939.jpg", price: 12000 },
    { url: "https://i.ibb.co/4nWrLJVs/IMG-1940.jpg", price: 11000 },
    { url: "https://i.ibb.co/Z1hTyj7W/IMG-1978.jpg", price: 9000 }
  ],

  "Birthday": [
    { url: "https://i.ibb.co/nMVvX6fg/IMG-1931.jpg", price: 37000 },
    { url: "https://i.ibb.co/WpWBXVgZ/IMG-1935.jpg", price: 30000 },
    { url: "https://i.ibb.co/S4xxYr97/IMG-1976.jpg", price: 29000 },
    { url: "https://i.ibb.co/NdcwhvSC/IMG-1975.jpg", price: 22000 },
    { url: "https://i.ibb.co/WvDFQkZv/IMG-1932.jpg", price: 39000 },
    { url: "https://i.ibb.co/ksV5vNJW/IMG-1934.jpg", price: 43000 }
  ],

  "Baby Shower": [
    { url: "https://i.ibb.co/9HGHP6sq/IMG-1944-1.jpg", price: 19000 },
    { url: "https://i.ibb.co/CCw17GK/IMG-1943-2.jpg", price: 24000 },
    { url: "https://i.ibb.co/3Yr0rWPs/IMG-1946.jpg", price: 22000 },
    { url: "https://i.ibb.co/gMtBYXCy/IMG-1945.jpg", price: 18000 },
    { url: "https://i.ibb.co/LDvTx0TK/IMG-1947.jpg", price: 23500 },
    { url: "https://i.ibb.co/TDGGFjTB/IMG-1977.jpg", price: 16000 }
  ]
};

const whatsappNumber = "919699678956";

let currentCategory = "Wedding";
let selectedIndex = 0;

const categoryTabs = document.getElementById("categoryTabs");
const thumbnails = document.getElementById("thumbnails");
const mainImage = document.getElementById("mainImage");
const mainCaption = document.getElementById("mainCaption");
const selectedLabel = document.getElementById("selectedDesignLabel");
const selectedDesignInput = document.getElementById("selectedDesignInput");
const eventType = document.getElementById("eventType");
const enquiryForm = document.getElementById("enquiryForm");

const formatPrice = price =>
  "₹" + Number(price).toLocaleString("en-IN");

// Create selected price panel
const pricePanel = document.createElement("div");
pricePanel.className = "selected-price-panel";
pricePanel.innerHTML = `
  <span>SELECTED DESIGN PRICE</span>
  <strong id="selectedPrice">₹0</strong>
`;

selectedLabel.insertAdjacentElement("afterend", pricePanel);

const selectedPrice = document.getElementById("selectedPrice");

// Create a category tab
function createCategoryTabs() {
  categoryTabs.innerHTML = "";

  Object.keys(collections).forEach(category => {
    const button = document.createElement("button");

    button.className = "category-tab";
    button.textContent = category;

    if (category === currentCategory) {
      button.classList.add("active");
    }

    button.addEventListener("click", () => {
      currentCategory = category;
      selectedIndex = 0;
      renderGallery();
    });

    categoryTabs.appendChild(button);
  });
}

// Show selected design in large preview
function updateMainPhoto() {
  const design = collections[currentCategory][selectedIndex];
  const designName = `${currentCategory} Design ${selectedIndex + 1}`;

  if (design.url) {
    mainImage.style.display = "block";
    mainImage.src = design.url;
    mainImage.alt = designName;
  } else {
    mainImage.style.display = "none";
  }

  mainCaption.textContent = designName;

  selectedLabel.textContent = "Selected: " + designName;
  selectedPrice.textContent = formatPrice(design.price);

  selectedDesignInput.value =
    `${designName} - ${formatPrice(design.price)}`;

  eventType.value = currentCategory;

  document.querySelectorAll(".thumbnail-card").forEach((card, index) => {
    card.classList.toggle("selected", index === selectedIndex);

    const button = card.querySelector(".thumbnail");
    button.classList.toggle("active", index === selectedIndex);
  });
}

// Render all designs and their prices
function renderGallery() {
  createCategoryTabs();

  thumbnails.innerHTML = "";

  collections[currentCategory].forEach((design, index) => {
    const card = document.createElement("div");
    card.className = "thumbnail-card";

    const button = document.createElement("button");
    button.className = "thumbnail";
    button.type = "button";
    button.setAttribute("aria-label", `${currentCategory} Design ${index + 1}`);

    if (design.url) {
      const image = document.createElement("img");
      image.src = design.url;
      image.alt = `${currentCategory} Design ${index + 1}`;

      image.onerror = () => {
        image.remove();
        button.textContent = "Image unavailable";
      };

      button.appendChild(image);
    } else {
      button.textContent = "PHOTO LINK NEEDED";
      button.style.color = "#c7a66a";
      button.style.fontSize = "11px";
    }

    button.addEventListener("click", () => {
      selectedIndex = index;
      updateMainPhoto();
    });

    const info = document.createElement("div");
    info.className = "design-info";

    const name = document.createElement("span");
    name.className = "design-name";
    name.textContent = `${currentCategory.toUpperCase()} ${String(index + 1).padStart(2, "0")}`;

    const price = document.createElement("span");
    price.className = "design-price";
    price.textContent = formatPrice(design.price);

    const caption = document.createElement("span");
    caption.className = "price-caption";
    caption.textContent = "DESIGN PRICE";

    info.append(name, price, caption);
    card.append(button, info);
    thumbnails.appendChild(card);
  });

  updateMainPhoto();
}

// WhatsApp enquiry submission
enquiryForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const customerName =
    document.getElementById("customerName").value.trim();

  const customerPhone =
    document.getElementById("customerPhone").value.trim();

  const extraMessage =
    document.getElementById("message").value.trim();

  const design = collections[currentCategory][selectedIndex];

  const designName =
    `${currentCategory} Design ${selectedIndex + 1}`;

  const whatsappMessage = `
Hello Sarkar Events!

I would like to enquire about an event.

Customer Name: ${customerName}
Customer Phone: ${customerPhone}

Event Category: ${currentCategory}
Selected Design: ${designName}
Design Price: ${formatPrice(design.price)}

Additional Requirements:
${extraMessage || "No additional requirements."}

Please contact me regarding availability and booking.

Thank you!
  `.trim();

  const whatsappURL =
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  window.open(whatsappURL, "_blank");
});

// Start website gallery
renderGallery();
