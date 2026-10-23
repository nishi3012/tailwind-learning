// ===============================
// 1. PRODUCT DATA
// ===============================

const products = [
    {
        id: 1,
        title: "Nike Air Max",
        price: 4999,
        oldprice: 6499,
        discount: 23,
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
        discount: 25,
        category: "Electronics",
        rating: 4.7,
        review: 89,
        description: "Enjoy your favourite audio with stylish wireless headphones designed for everyday listening.",
        image: "images/wireless_headphones.jpeg"
    },
    {
        id: 3,
        title: "Smart Watch",
        price: 6999,
        oldprice: 8999,
        discount: 22,
        category: "Gadgets",
        rating: 4.9,
        review: 210,
        description: "A versatile smartwatch with a modern design for daily activities and notifications.",
        image: "images/smartwatch.jpeg"
    },
    {
        id: 4,
        title: "Leather Backpack",
        price: 2499,
        oldprice: 3299,
        discount: 24,
        category: "Bags",
        rating: 4.6,
        review: 89,
        description: "A practical backpack with a timeless look for carrying your everyday essentials.",
        image: "images/bagpack.jpeg"
    },
    {
        id: 5,
        title: "White Shoes",
        price: 6799,
        oldprice: 9999,
        discount: 32,
        category: "Shoes",
        rating: 4.9,
        review: 290,
        description: "Minimal white sneakers that pair easily with casual and everyday outfits.",
        image: "images/nike_air_max.jpeg"
    },
    {
        id: 6,
        title: "Classic White Sneakers",
        price: 6799,
        oldprice: 9999,
        discount: 32,
        category: "Shoes",
        rating: 4.9,
        review: 290,
        description: "Classic everyday sneakers with a versatile design and a clean finish.",
        image: "images/nike_air_max.jpeg"
    },
    {
        id: 7,
        title: "Casual White Sneakers",
        price: 6799,
        oldprice: 9999,
        discount: 32,
        category: "Shoes",
        rating: 4.9,
        review: 290,
        description: "Casual sneakers designed to complement relaxed, everyday looks.",
        image: "images/nike_air_max.jpeg"
    },
    {
        id: 8,
        title: "Premium White Shoes",
        price: 6799,
        oldprice: 9999,
        discount: 32,
        category: "Shoes",
        rating: 4.9,
        review: 290,
        description: "Premium-looking white shoes for a simple and polished outfit.",
        image: "images/nike_air_max.jpeg"
    }
];


// ===============================
// 2. GLOBAL VARIABLES
// ===============================

const productContainer = document.getElementById("product-list");

const wishlist = new Set();
const cart = [];

function formatPrice(price) {
    return `₹${price.toLocaleString("en-IN")}`;
}


// ===============================
// 3. DISPLAY PRODUCT CARDS
// ===============================

function renderProducts() {
    if (!productContainer) return;

    productContainer.innerHTML = products.map((product) => `
        <article
            onclick="openProduct(${product.id})"
            class="product-card group bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            <!-- Product Image -->
            <div class="relative aspect-[4/4.5] overflow-hidden bg-stone-100">

                <img
                    src="${product.image}"
                    alt="${product.title}"
                    loading="lazy"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                >

                <!-- Discount -->
                <span class="absolute top-4 left-4 bg-emerald-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                    ${product.discount}% OFF
                </span>

                <!-- Wishlist Button -->
                <button
                    type="button"
                    onclick="event.stopPropagation(); toggleWishlist(${product.id})"
                    aria-label="Add to wishlist"
                    class="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/95 backdrop-blur flex items-center justify-center text-xl shadow-md hover:bg-emerald-600 hover:text-white transition">

                    <i class="${wishlist.has(product.id)
                        ? "ri-heart-fill text-rose-500"
                        : "ri-heart-line"}"></i>
                </button>

                <!-- Quick View -->
                <button
                    type="button"
                    onclick="event.stopPropagation(); openProduct(${product.id})"
                    class="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur text-stone-900 py-3 rounded-xl font-medium shadow-md hover:bg-emerald-600 hover:text-white transition">

                    Quick View
                    <i class="ri-arrow-right-line ml-1"></i>
                </button>

            </div>

            <!-- Product Details -->
            <div class="p-5">

                <p class="text-xs text-emerald-600 font-semibold uppercase tracking-widest">
                    ${product.category}
                </p>

                <h3 class="text-lg font-semibold text-stone-900 mt-2">
                    ${product.title}
                </h3>

                <!-- Rating -->
                <div class="flex items-center gap-2 mt-2 text-sm">
                    <span class="text-amber-500">
                        <i class="ri-star-fill"></i>
                    </span>

                    <span class="font-medium text-stone-700">
                        ${product.rating}
                    </span>

                    <span class="text-stone-400">
                        (${product.review} reviews)
                    </span>
                </div>

                <!-- Price -->
                <div class="flex items-center gap-3 mt-4 flex-wrap">
                    <span class="text-xl font-bold text-stone-900">
                        ${formatPrice(product.price)}
                    </span>

                    <span class="text-sm text-stone-400 line-through">
                        ${formatPrice(product.oldprice)}
                    </span>
                </div>

            </div>
        </article>
    `).join("");
}


// ===============================
// 4. FULL PRODUCT VIEW
// ===============================

function openProduct(id) {
    const product = products.find(
        (item) => item.id === Number(id)
    );

    if (!product) return;

    closeProductModal();

    const modal = document.createElement("div");

    modal.id = "product-modal";

    modal.className =
        "fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6";

    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");

    modal.innerHTML = `
        <div
            class="relative bg-white rounded-3xl w-full max-w-5xl max-h-[92vh] overflow-y-auto shadow-2xl"
            onclick="event.stopPropagation()">

            <!-- Close Button -->
            <button
                type="button"
                onclick="closeProductModal()"
                aria-label="Close product details"
                class="sticky top-3 float-right mr-3 mt-3 z-20 w-10 h-10 rounded-full bg-white shadow-md text-2xl hover:bg-stone-100 transition">

                <i class="ri-close-line"></i>
            </button>

            <div class="grid grid-cols-1 md:grid-cols-2 clear-both">

                <!-- Large Product Image -->
                <div class="relative bg-stone-100 min-h-[320px] sm:min-h-[450px] md:min-h-[600px]">

                    <img
                        src="${product.image}"
                        alt="${product.title}"
                        class="absolute inset-0 w-full h-full object-cover"
                    >

                    <span class="absolute top-5 left-5 bg-emerald-600 text-white text-sm font-semibold px-4 py-2 rounded-full">
                        ${product.discount}% OFF
                    </span>

                </div>

                <!-- Product Information -->
                <div class="p-6 sm:p-10 flex flex-col justify-center">

                    <p class="text-sm uppercase tracking-widest font-semibold text-emerald-600">
                        ${product.category}
                    </p>

                    <h2 class="text-3xl sm:text-4xl font-bold text-stone-900 mt-3">
                        ${product.title}
                    </h2>

                    <!-- Rating -->
                    <div class="flex items-center gap-2 mt-4 text-sm">
                        <span class="text-amber-500 text-lg">
                            <i class="ri-star-fill"></i>
                        </span>

                        <span class="font-semibold">
                            ${product.rating}/5
                        </span>

                        <span class="text-stone-500">
                            (${product.review} reviews)
                        </span>
                    </div>

                    <!-- Price -->
                    <div class="flex items-center gap-3 mt-6 flex-wrap">

                        <span class="text-3xl font-bold text-stone-900">
                            ${formatPrice(product.price)}
                        </span>

                        <span class="text-lg text-stone-400 line-through">
                            ${formatPrice(product.oldprice)}
                        </span>

                        <span class="text-sm font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                            Save ${formatPrice(product.oldprice - product.price)}
                        </span>

                    </div>

                    <div class="border-t border-stone-200 my-6"></div>

                    <!-- Description -->
                    <h3 class="font-semibold text-lg text-stone-900">
                        Product Details
                    </h3>

                    <p class="text-stone-600 leading-7 mt-3">
                        ${product.description}
                    </p>

                    <!-- Features -->
                    <div class="mt-5 space-y-3 text-sm text-stone-600">

                        <p>
                            <i class="ri-checkbox-circle-line text-emerald-600 mr-2"></i>
                            Designed for everyday style
                        </p>

                        <p>
                            <i class="ri-truck-line text-emerald-600 mr-2"></i>
                            Convenient shopping experience
                        </p>

                        <p>
                            <i class="ri-shield-check-line text-emerald-600 mr-2"></i>
                            Secure shopping experience
                        </p>

                    </div>

                    <!-- Quantity -->
                    <div class="mt-7">

                        <label
                            for="product-quantity"
                            class="block text-sm font-semibold mb-3">

                            Quantity
                        </label>

                        <div class="flex items-center border border-stone-300 rounded-xl w-fit">

                            <button
                                type="button"
                                onclick="changeQuantity(-1)"
                                aria-label="Decrease quantity"
                                class="w-11 h-11 text-xl hover:bg-stone-100 rounded-l-xl">

                                −
                            </button>

                            <span
                                id="product-quantity"
                                class="w-12 text-center font-semibold">

                                1
                            </span>

                            <button
                                type="button"
                                onclick="changeQuantity(1)"
                                aria-label="Increase quantity"
                                class="w-11 h-11 text-xl hover:bg-stone-100 rounded-r-xl">

                                +
                            </button>

                        </div>
                    </div>

                    <!-- Action Buttons -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-7">

                        <button
                            type="button"
                            onclick="addToCart(${product.id})"
                            class="bg-emerald-600 text-white py-4 px-5 rounded-xl font-semibold hover:bg-emerald-700 transition">

                            <i class="ri-shopping-cart-2-line mr-2"></i>
                            Add to Cart
                        </button>

                        <button
                            type="button"
                            id="modal-wishlist-button"
                            onclick="toggleWishlist(${product.id}); updateModalWishlist(${product.id})"
                            class="border border-stone-300 py-4 px-5 rounded-xl font-semibold hover:bg-stone-100 transition">

                            <i class="${wishlist.has(product.id)
                                ? "ri-heart-fill text-rose-500"
                                : "ri-heart-line"} mr-2"></i>

                            ${wishlist.has(product.id)
                                ? "Wishlisted"
                                : "Wishlist"}
                        </button>

                    </div>

                </div>
            </div>
        </div>
    `;

    // Close when clicking the dark background
    modal.addEventListener("click", closeProductModal);

    document.body.appendChild(modal);
    document.body.classList.add("modal-open");

    document.addEventListener("keydown", handleModalEscape);
}


// ===============================
// 5. CLOSE PRODUCT MODAL
// ===============================

function closeProductModal() {
    document.getElementById("product-modal")?.remove();

    document.body.classList.remove("modal-open");

    document.removeEventListener(
        "keydown",
        handleModalEscape
    );
}

function handleModalEscape(event) {
    if (event.key === "Escape") {
        closeProductModal();
    }
}


// ===============================
// 6. QUANTITY SELECTOR
// ===============================

function changeQuantity(amount) {
    const quantityElement =
        document.getElementById("product-quantity");

    if (!quantityElement) return;

    const currentQuantity =
        Number(quantityElement.textContent);

    quantityElement.textContent = Math.max(
        1,
        currentQuantity + amount
    );
}


// ===============================
// 7. WISHLIST
// ===============================

function toggleWishlist(id) {
    id = Number(id);

    if (wishlist.has(id)) {
        wishlist.delete(id);
    } else {
        wishlist.add(id);
    }

    updateWishlistCount();
    renderProducts();
}

function updateWishlistCount() {
    const count =
        document.getElementById("wishlist-count");

    if (count) {
        count.textContent = wishlist.size;
    }
}

function updateModalWishlist(id) {
    const button =
        document.getElementById("modal-wishlist-button");

    if (!button) return;

    const isWishlisted = wishlist.has(Number(id));

    button.innerHTML = `
        <i class="${isWishlisted
            ? "ri-heart-fill text-rose-500"
            : "ri-heart-line"} mr-2"></i>

        ${isWishlisted ? "Wishlisted" : "Wishlist"}
    `;
}

function showWishlist() {
    if (wishlist.size === 0) {
        alert("Your wishlist is empty.");
        return;
    }

    const items = products
        .filter((product) => wishlist.has(product.id))
        .map((product) =>
            `${product.title} — ${formatPrice(product.price)}`
        )
        .join("\n");

    alert(`Your Wishlist:\n\n${items}`);
}


// ===============================
// 8. ADD TO CART
// ===============================

function addToCart(id) {
    const product = products.find(
        (item) => item.id === Number(id)
    );

    if (!product) return;

    const quantity = Number(
        document.getElementById("product-quantity")?.textContent || 1
    );

    const existingItem = cart.find(
        (item) => item.id === product.id
    );

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            quantity: quantity
        });
    }

    updateCartCount();
    closeProductModal();

    alert(`${product.title} added to cart.`);
}

function updateCartCount() {
    const count = document.getElementById("cart-count");

    if (count) {
        count.textContent = cart.reduce(
            (total, item) => total + item.quantity,
            0
        );
    }
}


// ===============================
// 9. VIEW CART
// ===============================

function showCart() {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    const cartDetails = cart.map((item) => {
        const product = products.find(
            (productItem) => productItem.id === item.id
        );

        return `${product.title} × ${item.quantity} — ${formatPrice(
            product.price * item.quantity
        )}`;
    });

    const total = cart.reduce((sum, item) => {
        const product = products.find(
            (productItem) => productItem.id === item.id
        );

        return sum + product.price * item.quantity;
    }, 0);

    alert(
        `Your Cart:\n\n${cartDetails.join("\n")}\n\nTotal: ${formatPrice(total)}`
    );
}


// ===============================
// 10. INITIALIZE WEBSITE
// ===============================

renderProducts();