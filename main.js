 function toggleMenu() {
      document.getElementById('mobileMenu').classList.toggle('show');
    }

    function toggleDropdown(el) {
      el.classList.toggle('open');
    }


     document.addEventListener('DOMContentLoaded', () => {
      const productTableBody = document.querySelector('.product-table tbody');
      const subtotalEl = document.querySelector('.summary .subtotal');
      const deliveryEl = document.querySelector('.summary .delivery');
      const totalEl = document.querySelector('.summary .total');
      const submitBtn = document.querySelector('.submit-btn');
      const emptyMsg = document.querySelector('.empty-message');

      const deliveryCharge = 70;

      function formatCurrency(num) {
        return num.toLocaleString();
      }

      function updateTotals() {
        let subtotal = 0;
        const rows = productTableBody.querySelectorAll('tr');

        if (rows.length === 0) {
          // No products in cart
          subtotalEl.textContent = 'Subtotal: TK 0';
          totalEl.textContent = 'Total: TK 0';
          deliveryEl.style.display = 'none';
          submitBtn.style.display = 'none';
          emptyMsg.style.display = 'block';
          return;
        }

        deliveryEl.style.display = 'block';
        submitBtn.style.display = 'block';
        emptyMsg.style.display = 'none';

        rows.forEach(row => {
          const qtyInput = row.querySelector('input[type="text"]');
          let qty = parseInt(qtyInput.value);
          if (isNaN(qty) || qty < 1) qty = 1;

          const priceText = row.querySelector('td:nth-child(5)').textContent.trim();
          const price = parseInt(priceText.replace(/[^\d]/g, '')) || 0;
          const totalPrice = qty * price;

          row.querySelector('td:nth-child(6)').textContent = 'TK ' + formatCurrency(totalPrice);
          subtotal += totalPrice;
          qtyInput.value = qty; // sanitize input
        });

        subtotalEl.textContent = 'Subtotal: TK ' + formatCurrency(subtotal);
        deliveryEl.textContent = 'Delivery charge: TK ' + formatCurrency(deliveryCharge);
        totalEl.textContent = 'Total: TK ' + formatCurrency(subtotal + deliveryCharge);
      }

      function attachRowListeners(row) {
        const minusBtn = row.querySelector('.minus-btn');
        const plusBtn = row.querySelector('.plus-btn');
        const qtyInput = row.querySelector('input[type="text"]');
        const removeBtn = row.querySelector('.remove-btn');

        minusBtn.addEventListener('click', () => {
          let qty = parseInt(qtyInput.value) || 1;
          if (qty > 1) {
            qty--;
            qtyInput.value = qty;
            updateTotals();
          }
        });

        plusBtn.addEventListener('click', () => {
          let qty = parseInt(qtyInput.value) || 1;
          qty++;
          qtyInput.value = qty;
          updateTotals();
        });

        qtyInput.addEventListener('input', () => {
          let qty = parseInt(qtyInput.value);
          if (isNaN(qty) || qty < 1) {
            qtyInput.value = 1;
          }
          updateTotals();
        });

        removeBtn.addEventListener('click', () => {
          row.remove();
          updateTotals();
        });
      }

      // Attach event listeners to existing rows
      productTableBody.querySelectorAll('tr').forEach(attachRowListeners);

      updateTotals();
    });

    

   document.getElementById('increase').onclick = () => {
    let input = document.getElementById('quantity');
    input.value = parseInt(input.value) + 1;
  };

  document.getElementById('decrease').onclick = () => {
    let input = document.getElementById('quantity');
    if (parseInt(input.value) > 1) {
      input.value = parseInt(input.value) - 1;
    }
  };

  // Size selection
  const sizeButtons = document.querySelectorAll('.sizes button');
  sizeButtons.forEach(button => {
    button.onclick = () => {
      sizeButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
    };
  });

  // Tab logic
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tab = button.dataset.tab;
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabPanes.forEach(pane => pane.classList.remove('active'));
      button.classList.add('active');
      document.getElementById(tab).classList.add('active');
    });
  });
document.getElementById("review-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const text = document.getElementById("review-text").value.trim();
  if (text) {
    const newReview = document.createElement("p");
    newReview.textContent = `⭐️⭐️⭐️⭐️⭐️ — "${text}"`;
    document.getElementById("review-list").appendChild(newReview);
    document.getElementById("review-text").value = "";
  }
});

//signin
  function switchForm(formType) {
      document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
      document.querySelectorAll('.shop-form').forEach(f => f.classList.remove('active'));
      
      document.querySelector(`.tab-btn[onclick*="${formType}"]`).classList.add('active');
      document.getElementById(formType).classList.add('active');
    }

    