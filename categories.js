
"use strict";

// =======================================
// 1. PRODUCT DATA
// =======================================

// Same product IDs and details as the homepage.
// Add more products here as your store grows.

const products = [
  {
    id: 1,
    title: "Nike Air Max",
    price: 4999,
    oldprice: 6499,
    category: "Shoes",
    rating: 4.8,
    review: 124,
    description: "A sporty everyday sneaker with a modern design and cushioned comfort.",
    image: "images/nike_air_max.jpeg"
  },
  {
    id: 2,
    title: "Wireless Headphones",
    price: 2999,
    oldprice: 3999,
    category: "Electronics",
    rating: 4.7,
    review: 89,
    description: "Stylish wireless headphones designed for everyday listening.",
    image: "images/wireless_headphones.jpeg"
  },
  {
    id: 3,
    title: "Smart Watch",
    price: 6999,
    oldprice: 8999,
    category: "Gadgets",
    rating: 4.9,
    review: 210,
    description: "A versatile smartwatch for daily activities and notifications.",
    image: "images/smartwatch.jpeg"
  },
  {
    id: 4,
    title: "Leather Backpack",
    price: 2499,
    oldprice: 3299,
    category: "Bags",
    rating: 4.6,
    review: 89,
    description: "A practical backpack for your everyday essentials.",
    image: "images/bagpack.jpeg"
  },
  {
    id: 5,
    title: "White Shoes",
    price: 6799,
    oldprice: 9999,
    category: "Shoes",
    rating: 4.9,
    review: 290,
    description: "Minimal white sneakers for casual outfits.",
    image: "images/nike_air_max.jpeg"
  },
  {
    id: 6,
    title: "Classic White Sneakers",
    price: 6799,
    oldprice: 9999,
    category: "Shoes",
    rating: 4.9,
    review: 290,
    description: "Classic everyday sneakers with a clean finish.",
    image: "images/nike_air_max.jpeg"
  },
  {
    id: 7,
    title: "Casual White Sneakers",
    price: 6799,
    oldprice: 9999,
    category: "Shoes",
    rating: 4.9,
    review: 290,
    description: "Comfortable sneakers for everyday looks.",
    image: "images/nike_air_max.jpeg"
  },
  {
    id: 8,
    title: "Premium White Shoes",
    price: 6799,
    oldprice: 9999,
    category: "Shoes",
    rating: 4.9,
    review: 290,
    description: "Premium-looking white shoes for a polished outfit.",
    image: "images/nike_air_max.jpeg"
  }
];

// =======================================
// 2. VARIABLES
// =======================================

const categories = [
  "all",
  "women",
  "men",
  "shoes",
  "electronics",
  "accessories",
  "bags"
];

const productContainer = document.getElementById("category-products");
const modal = document.getElementById("product-modal");
const modalContent = document.getElementById("modal-content");

let selectedCategory = "all";
let selectedSort = "featured";
let toastTimer;

// =======================================
// 3. LOCAL STORAGE
// =======================================

function readSaved(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

const savedCart = readSaved("luxora-cart", []);

const cart = Array.isArray(savedCart)
  ? savedCart.filter(item =>
      Number.isInteger(item.id) &&
      Number.isInteger(item.quantity) &&
      item.quantity > 0
    )
  : [];

const savedWishlist = readSaved("luxora-wishlist", []);

const wishlist = new Set(
  Array.isArray(savedWishlist)
    ? savedWishlist.map(Number)
    : []
);

function saveShoppingData() {
  localStorage.setItem("luxora-cart", JSON.stringify(cart));

  localStorage.setItem(
    "luxora-wishlist",
    JSON.stringify([...wishlist])
  );
}

// =======================================
// 4. HELPER FUNCTIONS
// =======================================

function price(value) {
  return `₹${value.toLocaleString("en-IN")}`;
}

function getProduct(id) {
  return products.find(product => product.id === Number(id));
}

function updateCounters() {
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  document.getElementById("cart-count").textContent = cartTotal;
  document.getElementById("wishlist-count").textContent = wishlist.size;
}

function showToast(message) {
  const toast = document.getElementById("toast");

  toast.textContent = message;
  toast.classList.remove("hidden");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.add("hidden");
  }, 2500);
}

// =======================================
// 5. FILTER PRODUCTS
// =======================================

function filteredProducts() {
  let list = products.filter(product => {

    if (selectedCategory === "all") {
      return true;
    }

    // Homepage uses Gadgets for smartwatch.
    if (selectedCategory === "accessories") {
      return product.category === "Gadgets";
    }

    return product.category.toLowerCase() === selectedCategory;
  });

  list = [...list];

  if (selectedSort === "low") {
    list.sort((a, b) => a.price - b.price);
  }

  if (selectedSort === "high") {
    list.sort((a, b) => b.price - a.price);
  }

  if (selectedSort === "rating") {
    list.sort((a, b) => b.rating - a.rating);
  }

  return list;
}

// =======================================
// 6. DISPLAY PRODUCTS
// =======================================

function renderProducts() {
  const list = filteredProducts();

  document.getElementById("product-count").textContent =
    `Showing ${list.length} of ${products.length} products`;

  document.getElementById("empty-state").classList.toggle(
    "hidden",
    list.length !== 0
  );

  productContainer.innerHTML = list.map(product => {

    const discount = Math.round(
      (1 - product.price / product.oldprice) * 100
    );

    const heart = wishlist.has(product.id)
      ? "ri-heart-fill text-rose-500"
      : "ri-heart-line";

    return `
      <article class="group overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">

        <div class="relative h-[290px] overflow-hidden bg-[#f0eee9]">

          <img
            src="${product.image}"
            alt="${product.title}"
            loading="lazy"
            class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          >

          <span class="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-semibold">
            ${discount}% OFF
          </span>

          <button
            type="button"
            data-wishlist="${product.id}"
            aria-label="Toggle wishlist for ${product.title}"
            class="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg shadow"
          >
            <i class="${heart}"></i>
          </button>

          <button
            type="button"
            data-view="${product.id}"
            class="absolute bottom-4 left-4 right-4 rounded-full bg-white/95 py-3 text-sm font-semibold transition sm:opacity-0 sm:group-hover:opacity-100"
          >
            Quick View
            <i class="ri-arrow-right-up-line"></i>
          </button>

        </div>

        <div class="p-5">

          <p class="mb-2 text-xs uppercase tracking-widest text-stone-400">
            ${product.category}
          </p>

          <h3 class="mb-3 font-semibold">
            ${product.title}
          </h3>

          <p class="mb-4 text-xs">
            <i class="ri-star-fill text-amber-400"></i>
            ${product.rating}
            <span class="text-stone-400">
              (${product.review} reviews)
            </span>
          </p>

          <div class="flex flex-wrap items-center gap-2">

            <strong class="text-lg">
              ${price(product.price)}
            </strong>

            <span class="text-xs text-stone-400 line-through">
              ${price(product.oldprice)}
            </span>

          </div>

          <button
            type="button"
            data-cart="${product.id}"
            class="mt-5 w-full rounded-full bg-[#17251f] py-3 text-sm font-semibold text-white transition hover:bg-[#81916f]"
          >
            Add to Cart
          </button>

        </div>

      </article>
    `;
  }).join("");
}

// =======================================
// 7. CATEGORY SELECTION
// =======================================

function setCategory(category, scroll = false) {
  if (!categories.includes(category)) {
    category = "all";
  }

  selectedCategory = category;

  document.querySelectorAll("[data-filter]").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.filter === category
    );
  });

  renderProducts();

  // Update URL to reflect the category.
  const url = new URL(window.location.href);

  if (category === "all") {
    url.searchParams.delete("category");
  } else {
    url.searchParams.set("category", category);
  }

  history.replaceState(null, "", url);

  if (scroll) {
    document.getElementById("products").scrollIntoView({
      behavior: "smooth"
    });
  }
}

// =======================================
// 8. WISHLIST
// =======================================

function toggleWishlist(id) {
  const product = getProduct(id);

  if (!product) return;

  if (wishlist.has(id)) {
    wishlist.delete(id);
  } else {
    wishlist.add(id);
  }

  saveShoppingData();
  updateCounters();
  renderProducts();

  showToast(
    wishlist.has(id)
      ? `${product.title} added to wishlist`
      : `${product.title} removed from wishlist`
  );
}

function showWishlist() {
  const lines = [...wishlist]
    .map(id => getProduct(id))
    .filter(Boolean)
    .map(product => `${product.title} — ${price(product.price)}`);

  if (!lines.length) {
    showToast("Your wishlist is empty");
    return;
  }

  alert(`Your Wishlist:\n\n${lines.join("\n")}`);
}

// =======================================
// 9. CART
// =======================================

function addToCart(id, quantity = 1) {
  const product = getProduct(id);

  if (!product) return;

  const item = cart.find(item => item.id === id);

  if (item) {
    item.quantity += quantity;
  } else {
    cart.push({ id, quantity });
  }

  saveShoppingData();
  updateCounters();

  showToast(`${product.title} added to cart`);
}

function showCart() {
  if (!cart.length) {
    showToast("Your cart is empty");
    return;
  }

  const lines = cart.map(item => {
    const product = getProduct(item.id);

    return product
      ? `${product.title} × ${item.quantity} — ${price(product.price * item.quantity)}`
      : `Product #${item.id} × ${item.quantity}`;
  });

  const total = cart.reduce((sum, item) => {
    const product = getProduct(item.id);

    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  alert(
    `Your Cart:\n\n${lines.join("\n")}\n\nTotal: ${price(total)}`
  );
}

// =======================================
// 10. QUICK VIEW MODAL
// =======================================

function closeProduct() {
  modal.classList.add("hidden");
  modal.classList.remove("flex");

  document.body.classList.remove("overflow-hidden");
}

function openProduct(id) {
  const product = getProduct(id);

  if (!product) return;

  modalContent.innerHTML = `
    <button
      type="button"
      id="close-modal"
      aria-label="Close product"
      class="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl shadow"
    >
      <i class="ri-close-line"></i>
    </button>

    <div class="grid md:grid-cols-2">

      <div class="bg-[#f0eee9]">

        <img
          src="${product.image}"
          alt="${product.title}"
          class="h-[320px] w-full object-cover md:h-[460px]"
        >

      </div>

      <div class="flex flex-col justify-center p-7 md:p-10">

        <p class="mb-3 text-xs uppercase tracking-widest text-[#81916f]">
          ${product.category}
        </p>

        <h2 class="mb-4 text-2xl font-semibold">
          ${product.title}
        </h2>

        <p class="mb-5 text-sm text-amber-500">
          <i class="ri-star-fill"></i>
          ${product.rating}
          <span class="text-stone-400">
            (${product.review} reviews)
          </span>
        </p>

        <p class="mb-6 text-sm leading-7 text-stone-500">
          ${product.description}
        </p>

        <div class="mb-7 flex items-center gap-3">

          <strong class="text-2xl">
            ${price(product.price)}
          </strong>

          <span class="text-sm text-stone-400 line-through">
            ${price(product.oldprice)}
          </span>

        </div>

        <p class="mb-2 text-sm font-medium">
          Quantity
        </p>

        <div class="mb-6 flex w-fit items-center rounded-full border border-stone-200">

          <button type="button" id="decrease" class="px-4 py-2">−</button>

          <span id="quantity" class="min-w-8 text-center">1</span>

          <button type="button" id="increase" class="px-4 py-2">+</button>

        </div>

        <button
          type="button"
          id="modal-cart"
          class="rounded-full bg-[#17251f] py-3.5 text-sm font-semibold text-white"
        >
          Add to Cart
        </button>

        <button
          type="button"
          id="modal-wishlist"
          class="mt-3 rounded-full border border-stone-200 py-3 text-sm"
        >
          Toggle Wishlist
        </button>

      </div>

    </div>
  `;

  modal.classList.remove("hidden");
  modal.classList.add("flex");

  document.body.classList.add("overflow-hidden");

  let quantity = 1;

  const quantityLabel = document.getElementById("quantity");

  document.getElementById("increase").onclick = () => {
    quantity++;
    quantityLabel.textContent = quantity;
  };

  document.getElementById("decrease").onclick = () => {
    quantity = Math.max(1, quantity - 1);
    quantityLabel.textContent = quantity;
  };

  document.getElementById("modal-cart").onclick = () => {
    addToCart(id, quantity);
    closeProduct();
  };

  document.getElementById("modal-wishlist").onclick = () => {
    toggleWishlist(id);
  };

  document.getElementById("close-modal").onclick = closeProduct;
}

// =======================================
// 11. PRODUCT CARD EVENTS
// =======================================

productContainer.addEventListener("click", event => {
  const wish = event.target.closest("[data-wishlist]");
  const view = event.target.closest("[data-view]");
  const add = event.target.closest("[data-cart]");

  if (wish) {
    toggleWishlist(Number(wish.dataset.wishlist));
  } else if (view) {
    openProduct(Number(view.dataset.view));
  } else if (add) {
    addToCart(Number(add.dataset.cart));
  }
});

// =======================================
// 12. CATEGORY BUTTON EVENTS
// =======================================

document.querySelectorAll("[data-category]").forEach(button => {
  button.addEventListener("click", () => {
    setCategory(button.dataset.category, true);
  });
});

document.querySelectorAll("[data-filter]").forEach(button => {
  button.addEventListener("click", () => {
    setCategory(button.dataset.filter);
  });
});

document.getElementById("show-all").onclick = () => {
  setCategory("all");
};

// =======================================
// 13. SORTING
// =======================================

document.getElementById("sort-products").onchange = event => {
  selectedSort = event.target.value;
  renderProducts();
};

// =======================================
// 14. NAVBAR EVENTS
// =======================================

document.getElementById("cart-button").onclick = showCart;

document.getElementById("wishlist-button").onclick = showWishlist;

// =======================================
// 15. CLOSE MODAL
// =======================================

modal.addEventListener("click", event => {
  if (event.target === modal) {
    closeProduct();
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeProduct();
  }
});

// =======================================
// 16. MOBILE MENU
// =======================================

const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

menuToggle.onclick = () => {
  const closed = mobileMenu.classList.toggle("hidden");

  menuToggle.setAttribute("aria-expanded", String(!closed));

  menuToggle.innerHTML = closed
    ? '<i class="ri-menu-line"></i>'
    : '<i class="ri-close-line"></i>';
};

mobileMenu.querySelectorAll("a").forEach(link => {
  link.onclick = () => {
    mobileMenu.classList.add("hidden");

    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.innerHTML = '<i class="ri-menu-line"></i>';
  };
});

// =======================================
// 17. NEWSLETTER
// =======================================

document.getElementById("newsletter-form").onsubmit = event => {
  event.preventDefault();

  event.target.reset();

  showToast("Thanks for subscribing! (Demo only)");
};

// =======================================
// 18. INITIALIZE PAGE
// =======================================

// Read category from URL, e.g.
// categories.html?category=shoes

const initialCategory = new URLSearchParams(
  window.location.search
).get("category");

setCategory(initialCategory || "all");

updateCounters();

// Scroll to products when arriving with a category.
if (
  categories.includes(initialCategory) &&
  initialCategory !== "all"
) {
  requestAnimationFrame(() => {
    document.getElementById("products").scrollIntoView();
  });
}

// Update when shopping data changes in another tab.
window.addEventListener("storage", event => {
  if (
    event.key === "luxora-cart" ||
    event.key === "luxora-wishlist"
  ) {
    window.location.reload();
  }
});
