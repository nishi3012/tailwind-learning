
/* ========================================
   LUXORA - MAIN JAVASCRIPT
======================================== */

/* ---------- PRODUCT DATA ---------- */

const products = [
    {
        id: 1,
        name: "Nike Air Max",
        price: 4999,
        category: "Shoes",
        image: "images/nike_air_max.jpeg",
        description: "Comfortable and stylish sneakers for everyday wear."
    },
    {
        id: 2,
        name: "Wireless Headphones",
        price: 2999,
        category: "Electronics",
        image: "images/wireless_headphones.jpeg",
        description: "Enjoy your favourite music with wireless headphones."
    },
    {
        id: 3,
        name: "Smart Watch",
        price: 6999,
        category: "Gadgets",
        image: "images/smartwatch.jpeg",
        description: "A modern smartwatch for your everyday lifestyle."
    },
    {
        id: 4,
        name: "Leather Backpack",
        price: 2499,
        category: "Bags",
        image: "images/bagpack.jpeg",
        description: "A practical backpack with a premium look."
    },
    {
        id: 5,
        name: "White Shoes",
        price: 6799,
        category: "Shoes",
        image: "images/nike_air_max.jpeg",
        description: "Classic footwear designed for comfort and style."
    },
    {
        id: 6,
        name: "Classic White Sneakers",
        price: 6799,
        category: "Shoes",
        image: "images/nike_air_max.jpeg",
        description: "Classic sneakers that complement any outfit."
    },
    {
        id: 7,
        name: "Casual White Sneakers",
        price: 6799,
        category: "Shoes",
        image: "images/nike_air_max.jpeg",
        description: "Everyday sneakers with a clean, casual design."
    },
    {
        id: 8,
        name: "Premium White Shoes",
        price: 6799,
        category: "Shoes",
        image: "images/nike_air_max.jpeg",
        description: "Premium-style shoes for a modern wardrobe."
    }
];


/* ---------- STORAGE ---------- */

let cart = JSON.parse(localStorage.getItem("luxoraCart")) || [];
let wishlist = JSON.parse(localStorage.getItem("luxoraWishlist")) || [];

let currentProduct = null;
let currentQuantity = 1;


/* ---------- HELPERS ---------- */

function formatPrice(price) {
    return "₹" + Number(price).toLocaleString("en-IN");
}

function saveCart() {
    localStorage.setItem("luxoraCart", JSON.stringify(cart));
}

function saveWishlist() {
    localStorage.setItem("luxoraWishlist", JSON.stringify(wishlist));
}


/* ---------- LIGHT PISTA BUTTON STYLES ---------- */

const pistaButton =
    "bg-[#DDE8C8] hover:bg-[#C5D5A8] text-[#34452E] rounded-full transition-colors duration-300";

const pistaIconButton =
    "bg-[#DDE8C8] hover:bg-[#C5D5A8] text-[#34452E] rounded-full transition-colors duration-300";


/* ---------- RENDER PRODUCTS ---------- */

function renderProducts() {
    const productsContainer = document.getElementById("products");

    if (!productsContainer) {
        console.warn('Products container "#products" was not found.');
        return;
    }

    productsContainer.innerHTML = products.map(product => {
        const isWishlisted = wishlist.includes(product.id);

        return `
            <article class="product-card group relative overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl">

                <div class="relative overflow-hidden bg-[#F5F5EF]">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                        loading="lazy"
                        class="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    >

                    <!-- Wishlist Button -->
                    <button
                        type="button"
                        onclick="toggleWishlist(${product.id})"
                        aria-label="Toggle wishlist"
                        class="absolute right-3 top-3 flex h-10 w-10 items-center justify-center ${pistaIconButton} shadow transition hover:scale-110"
                    >
                        <i class="${isWishlisted
                            ? "ri-heart-fill text-red-500"
                            : "ri-heart-line"
                        } text-xl"></i>
                    </button>

                    <!-- Quick View Button -->
                    <button
                        type="button"
                        onclick="openProduct(${product.id})"
                        class="absolute bottom-3 left-3 right-3 px-4 py-3 text-sm font-medium shadow ${pistaButton}"
                    >
                        Quick View
                    </button>

                </div>

                <div class="p-4">

                    <p class="mb-2 text-xs uppercase tracking-wider text-gray-500">
                        ${product.category}
                    </p>

                    <h3 class="mb-2 text-base font-semibold text-gray-900">
                        ${product.name}
                    </h3>

                    <div class="flex items-center justify-between gap-3">

                        <p class="font-semibold text-gray-900">
                            ${formatPrice(product.price)}
                        </p>

                        <!-- Add to Cart Button -->
                        <button
                            type="button"
                            onclick="addToCart(${product.id})"
                            class="px-4 py-2 text-sm ${pistaButton}"
                        >
                            Add to Cart
                        </button>

                    </div>
                </div>

            </article>
        `;
    }).join("");

    updateWishlistCount();
}


/* ---------- QUICK VIEW ---------- */

function openProduct(productId) {
    const product = products.find(
        item => item.id === Number(productId)
    );

    const modal = document.getElementById("product-modal");

    if (!product || !modal) {
        console.warn("Product or Quick View modal was not found.");
        return;
    }

    currentProduct = product;
    currentQuantity = 1;

    const image = modal.querySelector(
        "#modal-product-image, .modal-product-image"
    );

    const title = modal.querySelector(
        "#modal-product-title, .modal-product-title"
    );

    const price = modal.querySelector(
        "#modal-product-price, .modal-product-price"
    );

    const description = modal.querySelector(
        "#modal-product-description, .modal-product-description"
    );

    const category = modal.querySelector(
        "#modal-product-category, .modal-product-category"
    );

    const quantity = document.getElementById("product-quantity");

    if (image) {
        image.src = product.image;
        image.alt = product.name;
    }

    if (title) title.textContent = product.name;
    if (price) price.textContent = formatPrice(product.price);
    if (description) description.textContent = product.description;
    if (category) category.textContent = product.category;
    if (quantity) quantity.value = currentQuantity;

    updateModalWishlist();

    modal.classList.remove("hidden");
    modal.classList.add("flex");
    modal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";
}

function closeProductModal() {
    const modal = document.getElementById("product-modal");

    if (!modal) return;

    modal.classList.add("hidden");
    modal.classList.remove("flex");
    modal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";
}

function changeQuantity(amount) {
    const quantity = document.getElementById("product-quantity");

    const value = quantity
        ? Number(quantity.value) || 1
        : currentQuantity;

    currentQuantity = Math.max(1, value + amount);

    if (quantity) {
        quantity.value = currentQuantity;
    }
}


/* ---------- WISHLIST ---------- */

function toggleWishlist(productId) {
    const id = Number(productId);

    if (wishlist.includes(id)) {
        wishlist = wishlist.filter(item => item !== id);
    } else {
        wishlist.push(id);
    }

    saveWishlist();
    renderProducts();
    updateWishlistCount();
    updateModalWishlist();
}

function updateWishlistCount() {
    const element = document.getElementById("wishlist-count");

    if (element) {
        element.textContent = wishlist.length;
    }
}

function updateModalWishlist() {
    const button = document.getElementById("modal-wishlist-button");

    if (!button || !currentProduct) return;

    const isWishlisted = wishlist.includes(currentProduct.id);

    button.innerHTML = isWishlisted
        ? '<i class="ri-heart-fill"></i> Remove from Wishlist'
        : '<i class="ri-heart-line"></i> Add to Wishlist';

    button.classList.add(
        "bg-[#DDE8C8]",
        "hover:bg-[#C5D5A8]",
        "text-[#34452E]"
    );

    button.onclick = () => toggleWishlist(currentProduct.id);
}

function showWishlist() {
    const items = products.filter(product =>
        wishlist.includes(product.id)
    );

    if (!items.length) {
        alert("Your wishlist is empty.");
        return;
    }

    alert(
        "Your Wishlist:\n\n" +
        items.map(item =>
            `${item.name} - ${formatPrice(item.price)}`
        ).join("\n")
    );
}


/* ---------- CART ---------- */

function addToCart(productId, quantity = 1) {
    const product = products.find(
        item => item.id === Number(productId)
    );

    if (!product) return;

    const amount = Math.max(1, Number(quantity) || 1);

    const existing = cart.find(
        item => item.id === product.id
    );

    if (existing) {
        existing.quantity += amount;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: amount
        });
    }

    saveCart();
    updateCartCount();

    alert(`${product.name} added to your cart.`);
}

function updateCartCount() {
    const element = document.getElementById("cart-count");

    if (element) {
        element.textContent = cart.reduce(
            (total, item) => total + Number(item.quantity || 0),
            0
        );
    }
}

function showCart() {
    if (!cart.length) {
        alert("Your cart is empty.");
        return;
    }

    const details = cart.map(item =>
        `${item.name} x ${item.quantity} - ${formatPrice(
            item.price * item.quantity
        )}`
    );

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    alert(
        "Your Cart:\n\n" +
        details.join("\n") +
        "\n\nTotal: " + formatPrice(total)
    );
}


/* ---------- GSAP ANIMATIONS ---------- */

function initPageAnimations() {
    if (typeof gsap === "undefined") return;

    if (typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
    }

    const navbar = document.querySelector("header nav");

    if (navbar) {
        gsap.from(navbar, {
            y: -20,
            opacity: 0,
            duration: 0.7,
            ease: "power2.out",
            clearProps: "opacity,transform"
        });
    }

    const heroContent = document.querySelector(
        "#home .hero-content"
    );

    if (heroContent) {
        gsap.from(heroContent, {
            y: 25,
            opacity: 0,
            duration: 0.9,
            delay: 0.15,
            ease: "power2.out",
            clearProps: "opacity,transform"
        });
    }

    if (typeof ScrollTrigger !== "undefined") {
        const categoryCards = document.querySelectorAll(
            "#categories .category-card"
        );

        if (categoryCards.length) {
            gsap.from(categoryCards, {
                y: 20,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out",
                clearProps: "opacity,transform",
                scrollTrigger: {
                    trigger: "#categories",
                    start: "top 85%",
                    once: true
                }
            });
        }
    }
}


/* ---------- INITIALIZE ---------- */

function initializeWebsite() {
    renderProducts();
    updateCartCount();
    updateWishlistCount();
    initPageAnimations();
}

document.addEventListener(
    "DOMContentLoaded",
    initializeWebsite
);

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeProductModal();
    }
});
