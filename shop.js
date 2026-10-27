
const products = [
    {
        id: 1,
        name: "Nike Air Max",
        price: 4999,
        category: "Shoes",
        image: "images/nike_air_max.jpeg"
    },
    {
        id: 2,
        name: "Wireless Headphones",
        price: 2999,
        category: "Electronics",
        image: "images/wireless_headphones.jpeg"
    },
    {
        id: 3,
        name: "Smart Watch",
        price: 6999,
        category: "Electronics",
        image: "images/smartwatch.jpeg"
    },
    {
        id: 4,
        name: "Leather Backpack",
        price: 2499,
        category: "Bags",
        image: "images/bagpack.jpeg"
    }
];

const productContainer = document.getElementById("shop-products");
const sortSelect = document.getElementById("sort-products");
const filterButtons = document.querySelectorAll(".filter-btn");
const cartCount = document.getElementById("cart-count");

let activeCategory = "All";

function getCart() {
    try {
        const cart = JSON.parse(localStorage.getItem("luxora-cart") || "[]");
        return Array.isArray(cart) ? cart : [];
    } catch {
        return [];
    }
}

function updateCartCount() {
    const cart = getCart();
    cartCount.textContent = `Cart (${cart.length})`;
}

function addToCart(id) {
    const product = products.find(item => item.id === id);
    if (!product) return;

    const cart = getCart();
    cart.push(product);

    localStorage.setItem("luxora-cart", JSON.stringify(cart));
    updateCartCount();

    alert(`${product.name} added to cart!`);
}

function displayProducts() {
    let filteredProducts = products.filter(product =>
        activeCategory === "All" || product.category === activeCategory
    );

    if (sortSelect.value === "low") {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortSelect.value === "high") {
        filteredProducts.sort((a, b) => b.price - a.price);
    }

    productContainer.innerHTML = filteredProducts.map(product => `
        <div class="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition">

            <div class="bg-gray-100 h-64 overflow-hidden">
                <img
                    src="${product.image}"
                    alt="${product.name}"
                    class="w-full h-full object-cover hover:scale-105 transition duration-300"
                >
            </div>

            <div class="p-5">
                <p class="text-xs text-gray-500 mb-2">${product.category}</p>

                <h3 class="text-lg font-semibold mb-2">${product.name}</h3>

                <p class="font-bold mb-4">₹${product.price.toLocaleString("en-IN")}</p>

                <button
                    data-cart-id="${product.id}"
                    class="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    `).join("");
}

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        activeCategory = button.dataset.filter;

        filterButtons.forEach(btn => {
            btn.classList.remove("bg-black", "text-white");
            btn.classList.add("bg-white", "border");
        });

        button.classList.add("bg-black", "text-white");
        button.classList.remove("bg-white", "border");

        displayProducts();
    });
});

sortSelect.addEventListener("change", displayProducts);

productContainer.addEventListener("click", event => {
    const button = event.target.closest("[data-cart-id]");

    if (button) {
        addToCart(Number(button.dataset.cartId));
    }
});

displayProducts();
updateCartCount();
