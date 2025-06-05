// === Global Functions ===
function toggleMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenu) {
    mobileMenu.classList.toggle('show');
  }
}

function toggleDropdown(el) {
  el.classList.toggle('open');
}

// === Main Script ===
document.addEventListener('DOMContentLoaded', () => {
  // === Category Filter ===
  const categoryItems = document.querySelectorAll(".cat-item");
  const productCards = document.querySelectorAll(".prod-card");

  if (categoryItems.length && productCards.length) {
    categoryItems.forEach((item) => {
      item.addEventListener("click", () => {
        const selectedCategory = item.dataset.category;

        categoryItems.forEach((el) => el.classList.remove("active"));
        item.classList.add("active");

        productCards.forEach((card) => {
          card.style.display =
            card.dataset.category === selectedCategory ? "block" : "none";
        });
      });
    });
  }

  // === Search Functionality ===
  const searchInput = document.getElementById("product-search");
  const searchBtn = document.querySelector(".search-btn");

  if (searchInput && searchBtn && productCards.length) {
    searchBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const searchTerm = searchInput.value.toLowerCase().trim();

      productCards.forEach((card) => {
        const name = card.dataset.name.toLowerCase();
        const category = card.dataset.category.toLowerCase();

        const match =
          name.includes(searchTerm) || category.includes(searchTerm);

        card.style.display = match ? "block" : "none";
      });
    });
  }

  // === Quantity Buttons (Product Page) ===
  const increaseBtn = document.getElementById('increase');
  const decreaseBtn = document.getElementById('decrease');
  const quantityInput = document.getElementById('quantity');

  if (increaseBtn && decreaseBtn && quantityInput) {
    increaseBtn.onclick = () => {
      quantityInput.value = parseInt(quantityInput.value || '1') + 1;
    };

    decreaseBtn.onclick = () => {
      const currentQty = parseInt(quantityInput.value || '1');
      if (currentQty > 1) {
        quantityInput.value = currentQty - 1;
      }
    };
  }

  // === Size Buttons (Product Page) ===
  const sizeButtons = document.querySelectorAll('.sizes button');
  sizeButtons.forEach(button => {
    button.onclick = () => {
      sizeButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
    };
  });

  // === Tab Functionality (Product Details Page) ===
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tab = button.dataset.tab;
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabPanes.forEach(pane => pane.classList.remove('active'));
      button.classList.add('active');
      const activePane = document.getElementById(tab);
      if (activePane) activePane.classList.add('active');
    });
  });

  // === Review Form ===
  const reviewForm = document.getElementById("review-form");
  const reviewText = document.getElementById("review-text");
  const reviewList = document.getElementById("review-list");

  if (reviewForm && reviewText && reviewList) {
    reviewForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const text = reviewText.value.trim();
      if (text) {
        const newReview = document.createElement("p");
        newReview.textContent = `⭐️⭐️⭐️⭐️⭐️ — "${text}"`;
        reviewList.appendChild(newReview);
        reviewText.value = "";
      }
    });
  }

  // === Tab Switching (Login/Signup Forms) ===
  window.switchForm = function (formType) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.shop-form').forEach(f => f.classList.remove('active'));

    const tab = document.querySelector(`.tab-btn[onclick*="${formType}"]`);
    const form = document.getElementById(formType);

    if (tab && form) {
      tab.classList.add('active');
      form.classList.add('active');
    }
  };
});
