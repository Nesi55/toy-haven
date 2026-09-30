/* =========================================================
   TOY HAVEN - ASSIGNMENT 3
   Main JavaScript File
   ========================================================= */


/* =========================================================
   PRODUCT DATA
   ========================================================= */

const products = [

    {
        id: 1,
        name: "Galaxy Hero Figure",
        category: "Figurines",
        price: 4500,
        icon: "🤖",
        description: "A collectible hero figure for imaginative play and display."
    },

    {
        id: 2,
        name: "Classic Teddy Bear",
        category: "Toys",
        price: 2500,
        icon: "🧸",
        description: "A soft classic teddy bear suitable for children and collectors."
    },

    {
        id: 3,
        name: "Racing Car Model",
        category: "Diecast Cars",
        price: 3200,
        icon: "🚗",
        description: "A detailed racing car model for diecast collectors."
    },

    {
        id: 4,
        name: "Family Strategy Game",
        category: "Board Games",
        price: 4800,
        icon: "🎲",
        description: "A fun strategy game designed for family and friends."
    },

    {
        id: 5,
        name: "Future Robot Toy",
        category: "Toys",
        price: 5500,
        icon: "🤖",
        description: "A futuristic robot toy for creative and imaginative play."
    },

    {
        id: 6,
        name: "Fantasy Dragon Figure",
        category: "Figurines",
        price: 4200,
        icon: "🐉",
        description: "A fantasy dragon collectible figure."
    },

    {
        id: 7,
        name: "Space Explorer Figure",
        category: "Figurines",
        price: 3900,
        icon: "👨‍🚀",
        description: "An explorer figure inspired by space adventures."
    },

    {
        id: 8,
        name: "Building Blocks Set",
        category: "Toys",
        price: 3500,
        icon: "🧱",
        description: "A colourful building block set for creative construction."
    },

    {
        id: 9,
        name: "Mystery Board Game",
        category: "Board Games",
        price: 5200,
        icon: "🎯",
        description: "A mystery-themed board game for friends and family."
    },

    {
        id: 10,
        name: "Classic Sports Car",
        category: "Diecast Cars",
        price: 4100,
        icon: "🏎️",
        description: "A classic sports car model for collectors."
    },

    {
        id: 11,
        name: "Monster Truck Model",
        category: "Diecast Cars",
        price: 3800,
        icon: "🚙",
        description: "A powerful monster truck diecast model."
    },

    {
        id: 12,
        name: "Educational Puzzle",
        category: "Board Games",
        price: 2800,
        icon: "🧩",
        description: "An educational puzzle designed to develop problem-solving skills."
    }

];


/* =========================================================
   LOCAL STORAGE KEYS
   ========================================================= */

const CART_KEY = "toyHavenCart";
const WISHLIST_KEY = "toyHavenWishlist";
const NEWSLETTER_KEY = "toyHavenNewsletter";
const FEEDBACK_KEY = "toyHavenFeedback";
const ORDERS_KEY = "toyHavenOrders";
const RECENT_KEY = "toyHavenRecent";


/* =========================================================
   HELPER FUNCTIONS
   ========================================================= */


/* Format money */

function formatPrice(price) {

    return "LKR " + price.toLocaleString();

}


/* Find product */

function getProduct(productId) {

    return products.find(
        product => product.id === Number(productId)
    );

}


/* Create product image */

function createProductImage(product) {

    const svg = `
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="600"
            height="400"
            viewBox="0 0 600 400"
        >

            <rect
                width="600"
                height="400"
                fill="#fff0df"
            />

            <circle
                cx="300"
                cy="200"
                r="120"
                fill="#ffffff"
            />

            <text
                x="300"
                y="235"
                font-size="100"
                text-anchor="middle"
            >
                ${product.icon}
            </text>

        </svg>
    `;

    return "data:image/svg+xml;charset=UTF-8," +
        encodeURIComponent(svg);

}


/* Get cart */

function getCart() {

    return JSON.parse(
        localStorage.getItem(CART_KEY)
    ) || [];

}


/* Save cart */

function saveCart(cart) {

    localStorage.setItem(
        CART_KEY,
        JSON.stringify(cart)
    );

}


/* Get wishlist */

function getWishlist() {

    return JSON.parse(
        localStorage.getItem(WISHLIST_KEY)
    ) || [];

}


/* Save wishlist */

function saveWishlist(wishlist) {

    localStorage.setItem(
        WISHLIST_KEY,
        JSON.stringify(wishlist)
    );

}


/* Update cart count */

function updateCartCount() {

    const cart = getCart();

    const totalQuantity = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    document
        .querySelectorAll(".cart-count")
        .forEach(element => {
            element.textContent = totalQuantity;
        });

}


/* Add product to cart */

function addToCart(productId) {

    const cart = getCart();

    const existingProduct = cart.find(
        item => item.id === Number(productId)
    );

    if (existingProduct) {

        existingProduct.quantity += 1;

    } else {

        cart.push({
            id: Number(productId),
            quantity: 1
        });

    }

    saveCart(cart);

    updateCartCount();

    showNotification(
        "Product added to cart!"
    );

}


/* Remove from cart */

function removeFromCart(productId) {

    let cart = getCart();

    cart = cart.filter(
        item => item.id !== Number(productId)
    );

    saveCart(cart);

    updateCartCount();

    renderCart();

}


/* Change quantity */

function changeQuantity(productId, change) {

    const cart = getCart();

    const item = cart.find(
        product => product.id === Number(productId)
    );

    if (!item) {
        return;
    }

    item.quantity += change;

    if (item.quantity <= 0) {

        removeFromCart(productId);
        return;

    }

    saveCart(cart);

    updateCartCount();

    renderCart();

}


/* Get cart total */

function getCartTotal() {

    const cart = getCart();

    return cart.reduce(
        (total, item) => {

            const product = getProduct(item.id);

            if (!product) {
                return total;
            }

            return total +
                product.price * item.quantity;

        },
        0
    );

}


/* Notification */

function showNotification(message) {

    let notification =
        document.querySelector(".notification");

    if (!notification) {

        notification =
            document.createElement("div");

        notification.className =
            "notification";

        document.body.appendChild(
            notification
        );

    }

    notification.textContent = message;

    notification.classList.add(
        "show"
    );

    setTimeout(() => {

        notification.classList.remove(
            "show"
        );

    }, 2200);

}


/* =========================================================
   NAVIGATION
   ========================================================= */

function setupNavigation() {

    const hamburger =
        document.getElementById("hamburger");

    const nav =
        document.getElementById("main-nav");

    if (!hamburger || !nav) {
        return;
    }

    hamburger.addEventListener(
        "click",
        () => {

            nav.classList.toggle("open");

            hamburger.classList.toggle(
                "active"
            );

            const isOpen =
                nav.classList.contains("open");

            hamburger.setAttribute(
                "aria-expanded",
                isOpen
            );

        }
    );

}


/* =========================================================
   GLOBAL SEARCH
   ========================================================= */

function setupGlobalSearch() {

    const form =
        document.getElementById(
            "global-search"
        );

    const input =
        document.getElementById(
            "global-search-input"
        );

    if (!form || !input) {
        return;
    }

    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            const search =
                input.value.trim();

            if (!search) {
                return;
            }

            window.location.href =
                "products.html?search=" +
                encodeURIComponent(search);

        }
    );

}


/* =========================================================
   HERO SLIDER
   ========================================================= */

const heroSlides = [

    {
        label: "WELCOME TO TOY HAVEN",
        title: "BIG FUN FOR LITTLE ADVENTURES",
        text: "Discover toys, games and collectibles made for every adventure.",
        icon: "🧸"
    },

    {
        label: "COLLECT SOMETHING SPECIAL",
        title: "FIGURINES FOR EVERY FAN",
        text: "Explore characters and collectible figures for your collection.",
        icon: "🤖"
    },

    {
        label: "PLAY TOGETHER",
        title: "GAMES FOR FAMILY & FRIENDS",
        text: "Bring everyone together with exciting board games.",
        icon: "🎲"
    },

    {
        label: "START YOUR COLLECTION",
        title: "DIECAST CARS & CLASSICS",
        text: "Discover detailed models made for collectors.",
        icon: "🏎️"
    }

];


let currentHeroSlide = 0;


function changeHeroSlide(index) {

    const label =
        document.getElementById("hero-label");

    const title =
        document.getElementById("hero-title");

    const text =
        document.getElementById("hero-text");

    const icon =
        document.getElementById("hero-icon");

    if (!label || !title || !text || !icon) {
        return;
    }

    const slide =
        heroSlides[index];

    label.textContent =
        slide.label;

    title.textContent =
        slide.title;

    text.textContent =
        slide.text;

    icon.textContent =
        slide.icon;

    document
        .querySelectorAll(".hero-dots button")
        .forEach(
            (dot, dotIndex) => {

                dot.classList.toggle(
                    "active",
                    dotIndex === index
                );

            }
        );

}


function setupHeroSlider() {

    if (!document.getElementById("hero")) {
        return;
    }

    document
        .querySelectorAll(".hero-dots button")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    currentHeroSlide =
                        Number(
                            button.dataset.slide
                        );

                    changeHeroSlide(
                        currentHeroSlide
                    );

                }
            );

        });

    setInterval(() => {

        currentHeroSlide =
            (currentHeroSlide + 1) %
            heroSlides.length;

        changeHeroSlide(
            currentHeroSlide
        );

    }, 4000);

}


/* =========================================================
   FEATURED PRODUCT
   ========================================================= */

function renderFeaturedProduct() {

    const container =
        document.getElementById(
            "featured-product"
        );

    if (!container) {
        return;
    }

    const product =
        products[0];

    container.innerHTML = `

        <div class="featured-product reveal">

            <div class="featured-image">

                <img
                    src="${createProductImage(product)}"
                    alt="${product.name}"
                >

            </div>

            <div class="featured-details">

                <p class="product-category">
                    ${product.category}
                </p>

                <h3>
                    ${product.name}
                </h3>

                <div class="rating">
                    ★★★★★
                    <span>(24 reviews)</span>
                </div>

                <p class="featured-description">
                    ${product.description}
                </p>

                <div class="price">
                    ${formatPrice(product.price)}
                </div>

                <p class="stock">
                    ● In Stock
                </p>

                <div class="button-group">

                    <button
                        class="primary-button"
                        data-add-cart="${product.id}"
                    >
                        Add to Cart
                    </button>

                    <button
                        class="secondary-button"
                        data-wishlist="${product.id}"
                    >
                        ♡ Wishlist
                    </button>

                </div>

            </div>

        </div>

    `;

}


/* =========================================================
   PRODUCT CARD
   ========================================================= */

function createProductCard(product) {

    return `

        <article
            class="product-card reveal"
            data-product-id="${product.id}"
        >

            <button
                class="product-image-button"
                data-view-product="${product.id}"
                aria-label="View ${product.name}"
            >

                <img
                    class="product-image"
                    src="${createProductImage(product)}"
                    alt="${product.name}"
                >

            </button>

            <div class="product-info">

                <p class="product-category">
                    ${product.category}
                </p>

                <h3>
                    ${product.name}
                </h3>

                <p class="product-description">
                    ${product.description}
                </p>

                <p class="product-price">
                    ${formatPrice(product.price)}
                </p>

                <div class="product-actions">

                    <button
                        class="primary-button small-button"
                        data-add-cart="${product.id}"
                    >
                        Add to Cart
                    </button>

                    <button
                        class="wishlist-button"
                        data-wishlist="${product.id}"
                        aria-label="Add ${product.name} to wishlist"
                    >
                        ♡
                    </button>

                </div>

            </div>

        </article>

    `;

}


/* =========================================================
   PRODUCT LISTING
   ========================================================= */

let selectedCategory = "All";
let selectedSearch = "";


function renderProducts() {

    const container =
        document.getElementById(
            "product-list"
        );

    const noProducts =
        document.getElementById(
            "no-products"
        );

    if (!container) {
        return;
    }

    let filteredProducts =
        [...products];

    if (selectedCategory !== "All") {

        filteredProducts =
            filteredProducts.filter(
                product =>
                    product.category ===
                    selectedCategory
            );

    }

    if (selectedSearch) {

        filteredProducts =
            filteredProducts.filter(
                product =>
                    product.name
                        .toLowerCase()
                        .includes(
                            selectedSearch.toLowerCase()
                        )
            );

    }

    container.innerHTML =
        filteredProducts
            .map(createProductCard)
            .join("");

    if (noProducts) {

        noProducts.classList.toggle(
            "hidden",
            filteredProducts.length !== 0
        );

    }

}


/* Setup filters */

function setupProductFilters() {

    const buttons =
        document.querySelectorAll(
            ".filter-button"
        );

    if (!buttons.length) {
        return;
    }

    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                selectedCategory =
                    button.dataset.category;

                buttons.forEach(
                    item =>
                        item.classList.remove(
                            "active"
                        )
                );

                button.classList.add(
                    "active"
                );

                renderProducts();

            }
        );

    });


    const search =
        document.getElementById(
            "product-search"
        );

    if (search) {

        search.addEventListener(
            "input",
            () => {

                selectedSearch =
                    search.value;

                renderProducts();

            }
        );

    }


    const params =
        new URLSearchParams(
            window.location.search
        );

    const category =
        params.get("category");

    const searchParam =
        params.get("search");

    if (category) {

        selectedCategory =
            category;

        buttons.forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.category ===
                category
            );

        });

    }

    if (searchParam) {

        selectedSearch =
            searchParam;

        if (search) {
            search.value =
                searchParam;
        }

    }

    renderProducts();

}


/* =========================================================
   MODAL
   ========================================================= */

function openProductModal(productId) {

    const product =
        getProduct(productId);

    const modal =
        document.getElementById(
            "product-modal"
        );

    const body =
        document.getElementById(
            "modal-body"
        );

    if (!product || !modal || !body) {
        return;
    }

    body.innerHTML = `

        <div class="modal-product">

            <div>

                <img
                    src="${createProductImage(product)}"
                    alt="${product.name}"
                    class="modal-product-image"
                >

            </div>

            <div class="modal-product-details">

                <p class="product-category">
                    ${product.category}
                </p>

                <h2>
                    ${product.name}
                </h2>

                <div class="rating">
                    ★★★★★
                </div>

                <p>
                    ${product.description}
                </p>

                <h3 class="modal-price">
                    ${formatPrice(product.price)}
                </h3>

                <div class="button-group">

                    <button
                        class="primary-button"
                        data-add-cart="${product.id}"
                    >
                        Add to Cart
                    </button>

                    <button
                        class="secondary-button"
                        data-wishlist="${product.id}"
                    >
                        ♡ Add to Wishlist
                    </button>

                </div>

            </div>

        </div>

    `;

    modal.classList.add("show");

    modal.setAttribute(
        "aria-hidden",
        "false"
    );


    addRecentlyViewed(
        product.id
    );

}


function closeProductModal() {

    const modal =
        document.getElementById(
            "product-modal"
        );

    if (!modal) {
        return;
    }

    modal.classList.remove(
        "show"
    );

    modal.setAttribute(
        "aria-hidden",
        "true"
    );

}


function setupModal() {

    const close =
        document.getElementById(
            "modal-close"
        );

    if (close) {

        close.addEventListener(
            "click",
            closeProductModal
        );

    }

    const modal =
        document.getElementById(
            "product-modal"
        );

    if (modal) {

        modal.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    modal
                ) {

                    closeProductModal();

                }

            }
        );

    }

}


/* =========================================================
   WISHLIST
   ========================================================= */

function addToWishlist(productId) {

    const wishlist =
        getWishlist();

    const existing =
        wishlist.find(
            item =>
                item.id ===
                Number(productId)
        );

    if (!existing) {

        wishlist.push({
            id: Number(productId),
            status: "Interested"
        });

        saveWishlist(
            wishlist
        );

        showNotification(
            "Product added to wishlist!"
        );

    } else {

        showNotification(
            "Product is already in your wishlist."
        );

    }

}


function removeFromWishlist(productId) {

    let wishlist =
        getWishlist();

    wishlist =
        wishlist.filter(
            item =>
                item.id !==
                Number(productId)
        );

    saveWishlist(
        wishlist
    );

    renderWishlist();

}


function updateWishlistStatus(
    productId,
    status
) {

    const wishlist =
        getWishlist();

    const item =
        wishlist.find(
            product =>
                product.id ===
                Number(productId)
        );

    if (!item) {
        return;
    }

    item.status =
        status;

    saveWishlist(
        wishlist
    );

    renderWishlist();

}


function renderWishlist() {

    const container =
        document.getElementById(
            "wishlist-list"
        );

    const empty =
        document.getElementById(
            "wishlist-empty"
        );

    const count =
        document.getElementById(
            "wishlist-count"
        );

    if (!container) {
        return;
    }

    const wishlist =
        getWishlist();

    if (count) {

        count.textContent =
            wishlist.length;

    }

    if (!wishlist.length) {

        container.innerHTML = "";

        if (empty) {
            empty.classList.remove(
                "hidden"
            );
        }

        return;

    }

    if (empty) {

        empty.classList.add(
            "hidden"
        );

    }

    container.innerHTML =
        wishlist.map(item => {

            const product =
                getProduct(item.id);

            if (!product) {
                return "";
            }

            return `

                <article class="wishlist-card">

                    <img
                        src="${createProductImage(product)}"
                        alt="${product.name}"
                    >

                    <div class="wishlist-info">

                        <p class="product-category">
                            ${product.category}
                        </p>

                        <h3>
                            ${product.name}
                        </h3>

                        <p class="product-price">
                            ${formatPrice(product.price)}
                        </p>

                        <label>
                            Collection Status
                        </label>

                        <select
                            class="wishlist-status"
                            data-wishlist-status="${product.id}"
                        >

                            <option
                                value="Interested"
                                ${item.status === "Interested" ? "selected" : ""}
                            >
                                Interested
                            </option>

                            <option
                                value="Owned"
                                ${item.status === "Owned" ? "selected" : ""}
                            >
                                Owned
                            </option>

                            <option
                                value="Not Interested"
                                ${item.status === "Not Interested" ? "selected" : ""}
                            >
                                Not Interested
                            </option>

                        </select>

                        <div class="button-group">

                            <button
                                class="primary-button small-button"
                                data-add-cart="${product.id}"
                            >
                                Add to Cart
                            </button>

                            <button
                                class="secondary-button small-button"
                                data-remove-wishlist="${product.id}"
                            >
                                Remove
                            </button>

                        </div>

                    </div>

                </article>

            `;

        }).join("");

}


/* =========================================================
   RECENTLY VIEWED
   ========================================================= */

function addRecentlyViewed(productId) {

    let recent =
        JSON.parse(
            localStorage.getItem(
                RECENT_KEY
            )
        ) || [];

    recent =
        recent.filter(
            id =>
                id !==
                Number(productId)
        );

    recent.unshift(
        Number(productId)
    );

    recent =
        recent.slice(0, 4);

    localStorage.setItem(
        RECENT_KEY,
        JSON.stringify(recent)
    );

}


function renderRecentlyViewed() {

    const container =
        document.getElementById(
            "recent-products"
        );

    if (!container) {
        return;
    }

    const recent =
        JSON.parse(
            localStorage.getItem(
                RECENT_KEY
            )
        ) || [];

    if (!recent.length) {

        container.innerHTML = `

            <p class="empty-message">
                Products you view will appear here.
            </p>

        `;

        return;

    }

    container.innerHTML =
        recent.map(id => {

            const product =
                getProduct(id);

            if (!product) {
                return "";
            }

            return `

                <article class="recent-card">

                    <img
                        src="${createProductImage(product)}"
                        alt="${product.name}"
                        class="recent-image"
                    >

                    <div class="recent-info">

                        <h3>
                            ${product.name}
                        </h3>

                        <p>
                            ${formatPrice(product.price)}
                        </p>

                    </div>

                </article>

            `;

        }).join("");

}


/* =========================================================
   CART PAGE
   ========================================================= */

function renderCart() {

    const container =
        document.getElementById(
            "cart-items"
        );

    const empty =
        document.getElementById(
            "cart-empty"
        );

    const summary =
        document.getElementById(
            "cart-summary"
        );

    if (!container) {
        return;
    }

    const cart =
        getCart();

    if (!cart.length) {

        container.innerHTML = "";

        if (empty) {
            empty.classList.remove(
                "hidden"
            );
        }

        if (summary) {
            summary.classList.add(
                "hidden"
            );
        }

        return;

    }

    if (empty) {
        empty.classList.add(
            "hidden"
        );
    }

    if (summary) {
        summary.classList.remove(
            "hidden"
        );
    }


    container.innerHTML =
        cart.map(item => {

            const product =
                getProduct(item.id);

            if (!product) {
                return "";
            }

            const subtotal =
                product.price *
                item.quantity;

            return `

                <article class="cart-item">

                    <img
                        src="${createProductImage(product)}"
                        alt="${product.name}"
                        class="cart-product-image"
                    >

                    <div class="cart-product-info">

                        <p class="product-category">
                            ${product.category}
                        </p>

                        <h3>
                            ${product.name}
                        </h3>

                        <p>
                            ${formatPrice(product.price)}
                            each
                        </p>

                    </div>

                    <div class="quantity-controls">

                        <button
                            type="button"
                            data-minus="${product.id}"
                        >
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            type="button"
                            data-plus="${product.id}"
                        >
                            +
                        </button>

                    </div>

                    <strong class="cart-subtotal">
                        ${formatPrice(subtotal)}
                    </strong>

                    <button
                        class="remove-button"
                        data-remove-cart="${product.id}"
                        type="button"
                    >
                        Remove
                    </button>

                </article>

            `;

        }).join("");


    const total =
        getCartTotal();

    const subtotal =
        document.getElementById(
            "cart-subtotal"
        );

    const totalElement =
        document.getElementById(
            "cart-total"
        );

    if (subtotal) {
        subtotal.textContent =
            formatPrice(total);
    }

    if (totalElement) {
        totalElement.textContent =
            formatPrice(total);
    }

}


/* =========================================================
   CHECKOUT
   ========================================================= */

function renderCheckout() {

    const container =
        document.getElementById(
            "checkout-items"
        );

    const totalElement =
        document.getElementById(
            "checkout-total"
        );

    if (!container) {
        return;
    }

    const cart =
        getCart();

    if (!cart.length) {

        container.innerHTML = `

            <p class="empty-message">
                Your cart is empty.
            </p>

            <a
                href="products.html"
                class="secondary-button"
            >
                Go to Products
            </a>

        `;

        if (totalElement) {
            totalElement.textContent =
                "LKR 0";
        }

        return;

    }


    container.innerHTML =
        cart.map(item => {

            const product =
                getProduct(item.id);

            if (!product) {
                return "";
            }

            return `

                <div class="checkout-item">

                    <span>
                        ${product.name}
                        × ${item.quantity}
                    </span>

                    <strong>
                        ${formatPrice(
                            product.price *
                            item.quantity
                        )}
                    </strong>

                </div>

            `;

        }).join("");


    if (totalElement) {

        totalElement.textContent =
            formatPrice(
                getCartTotal()
            );

    }

}


/* Payment fields */

function setupPaymentMethod() {

    const radios =
        document.querySelectorAll(
            'input[name="payment"]'
        );

    const cardFields =
        document.getElementById(
            "card-fields"
        );

    if (!radios.length || !cardFields) {
        return;
    }

    radios.forEach(radio => {

        radio.addEventListener(
            "change",
            () => {

                cardFields.classList.toggle(
                    "hidden",
                    radio.value !== "Card"
                );

            }
        );

    });

}


/* Checkout validation */

function setupCheckout() {

    const form =
        document.getElementById(
            "checkout-form"
        );

    if (!form) {
        return;
    }

    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            const name =
                document.getElementById(
                    "full-name"
                );

            const email =
                document.getElementById(
                    "email"
                );

            const address =
                document.getElementById(
                    "address"
                );

            const payment =
                document.querySelector(
                    'input[name="payment"]:checked'
                );

            let valid = true;


            if (name.value.trim().length < 3) {

                setFieldError(
                    name,
                    "Please enter your full name."
                );

                valid = false;

            } else {

                clearFieldError(name);

            }


            if (!isValidEmail(email.value)) {

                setFieldError(
                    email,
                    "Please enter a valid email address."
                );

                valid = false;

            } else {

                clearFieldError(email);

            }


            if (address.value.trim().length < 10) {

                setFieldError(
                    address,
                    "Please enter your delivery address."
                );

                valid = false;

            } else {

                clearFieldError(address);

            }


            const cart =
                getCart();

            if (!cart.length) {

                showNotification(
                    "Your cart is empty."
                );

                valid = false;

            }


            if (!valid) {
                return;
            }


            const order = {

                id:
                    "TH-" +
                    Date.now(),

                customer:
                    name.value.trim(),

                email:
                    email.value.trim(),

                address:
                    address.value.trim(),

                payment:
                    payment.value,

                items:
                    cart,

                total:
                    getCartTotal(),

                date:
                    new Date().toLocaleString()

            };


            const orders =
                JSON.parse(
                    localStorage.getItem(
                        ORDERS_KEY
                    )
                ) || [];


            orders.push(order);


            localStorage.setItem(
                ORDERS_KEY,
                JSON.stringify(orders)
            );


            localStorage.removeItem(
                CART_KEY
            );


            updateCartCount();


            form.classList.add(
                "hidden"
            );


            const success =
                document.getElementById(
                    "order-success"
                );

            if (success) {

                success.classList.remove(
                    "hidden"
                );

                success.classList.add(
                    "success-animation"
                );

            }

        }
    );

}


/* =========================================================
   SUPPORT FORM
   ========================================================= */

function setupFeedbackForm() {

    const form =
        document.getElementById(
            "feedback-form"
        );

    if (!form) {
        return;
    }

    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            const name =
                document.getElementById(
                    "feedback-name"
                );

            const email =
                document.getElementById(
                    "feedback-email"
                );

            const message =
                document.getElementById(
                    "feedback-message"
                );

            const success =
                document.getElementById(
                    "feedback-success"
                );

            let valid = true;


            if (name.value.trim().length < 2) {

                setFieldError(
                    name,
                    "Please enter your name."
                );

                valid = false;

            } else {

                clearFieldError(name);

            }


            if (!isValidEmail(email.value)) {

                setFieldError(
                    email,
                    "Please enter a valid email."
                );

                valid = false;

            } else {

                clearFieldError(email);

            }


            if (message.value.trim().length < 10) {

                setFieldError(
                    message,
                    "Message must contain at least 10 characters."
                );

                valid = false;

            } else {

                clearFieldError(message);

            }


            if (!valid) {
                return;
            }


            const feedback =
                JSON.parse(
                    localStorage.getItem(
                        FEEDBACK_KEY
                    )
                ) || [];


            feedback.push({

                name:
                    name.value.trim(),

                email:
                    email.value.trim(),

                message:
                    message.value.trim(),

                date:
                    new Date().toLocaleString()

            });


            localStorage.setItem(
                FEEDBACK_KEY,
                JSON.stringify(feedback)
            );


            form.reset();


            if (success) {

                success.textContent =
                    "Thank you! Your feedback has been submitted successfully.";

                success.classList.add(
                    "success-text"
                );

            }

        }
    );

}


/* =========================================================
   FAQ ACCORDION
   ========================================================= */

function setupFAQ() {

    document
        .querySelectorAll(".faq-question")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const item =
                        button.closest(
                            ".faq-item"
                        );

                    item.classList.toggle(
                        "active"
                    );

                }
            );

        });

}


/* =========================================================
   NEWSLETTER
   ========================================================= */

function setupNewsletter() {

    const form =
        document.getElementById(
            "newsletter-form"
        );

    if (!form) {
        return;
    }

    const email =
        document.getElementById(
            "newsletter-email"
        );

    const message =
        document.getElementById(
            "newsletter-message"
        );


    const savedEmail =
        localStorage.getItem(
            NEWSLETTER_KEY
        );


    if (savedEmail) {

        message.textContent =
            "You are already subscribed.";

    }


    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            if (!isValidEmail(email.value)) {

                message.textContent =
                    "Please enter a valid email address.";

                return;

            }


            localStorage.setItem(
                NEWSLETTER_KEY,
                email.value.trim()
            );


            message.textContent =
                "Thank you for subscribing!";


            form.reset();

        }
    );

}


/* =========================================================
   VALIDATION HELPERS
   ========================================================= */

function isValidEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(email.trim());

}


function setFieldError(
    field,
    message
) {

    field.classList.add(
        "input-error"
    );

    const group =
        field.closest(
            ".form-group"
        );

    if (!group) {
        return;
    }

    const error =
        group.querySelector(
            ".field-error"
        );

    if (error) {
        error.textContent =
            message;
    }

}


function clearFieldError(field) {

    field.classList.remove(
        "input-error"
    );

    const group =
        field.closest(
            ".form-group"
        );

    if (!group) {
        return;
    }

    const error =
        group.querySelector(
            ".field-error"
        );

    if (error) {
        error.textContent =
            "";
    }

}


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

function setupScrollReveal() {

    const elements =
        document.querySelectorAll(
            ".reveal"
        );

    if (!elements.length) {
        return;
    }

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.1
            }
        );


    elements.forEach(
        element =>
            observer.observe(element)
    );

}


/* =========================================================
   EVENT DELEGATION
   ========================================================= */

document.addEventListener(
    "click",
    event => {

        const addCart =
            event.target.closest(
                "[data-add-cart]"
            );

        if (addCart) {

            const id =
                addCart.dataset.addCart;

            addToCart(id);

            return;

        }


        const wishlist =
            event.target.closest(
                "[data-wishlist]"
            );

        if (wishlist) {

            const id =
                wishlist.dataset.wishlist;

            addToWishlist(id);

            return;

        }


        const viewProduct =
            event.target.closest(
                "[data-view-product]"
            );

        if (viewProduct) {

            const id =
                viewProduct.dataset.viewProduct;

            openProductModal(id);

            return;

        }


        const plus =
            event.target.closest(
                "[data-plus]"
            );

        if (plus) {

            changeQuantity(
                plus.dataset.plus,
                1
            );

            return;

        }


        const minus =
            event.target.closest(
                "[data-minus]"
            );

        if (minus) {

            changeQuantity(
                minus.dataset.minus,
                -1
            );

            return;

        }


        const removeCart =
            event.target.closest(
                "[data-remove-cart]"
            );

        if (removeCart) {

            removeFromCart(
                removeCart.dataset.removeCart
            );

            return;

        }


        const removeWishlist =
            event.target.closest(
                "[data-remove-wishlist]"
            );

        if (removeWishlist) {

            removeFromWishlist(
                removeWishlist.dataset.removeWishlist
            );

            return;

        }

    }
);


/* Wishlist select */

document.addEventListener(
    "change",
    event => {

        const select =
            event.target.closest(
                "[data-wishlist-status]"
            );

        if (!select) {
            return;
        }

        updateWishlistStatus(
            select.dataset.wishlistStatus,
            select.value
        );

    }
);


/* =========================================================
   CLEAR CART
   ========================================================= */

document.addEventListener(
    "click",
    event => {

        if (
            event.target.id ===
            "clear-cart"
        ) {

            localStorage.removeItem(
                CART_KEY
            );

            updateCartCount();

            renderCart();

            showNotification(
                "Cart cleared."
            );

        }

    }
);


/* =========================================================
   CLEAR WISHLIST
   ========================================================= */

document.addEventListener(
    "click",
    event => {

        if (
            event.target.id ===
            "clear-wishlist"
        ) {

            localStorage.removeItem(
                WISHLIST_KEY
            );

            renderWishlist();

            showNotification(
                "Wishlist cleared."
            );

        }

    }
);


/* =========================================================
   PAGE INITIALIZATION
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        updateCartCount();

        setupNavigation();

        setupGlobalSearch();

        setupHeroSlider();

        renderFeaturedProduct();

        renderProducts();

        setupProductFilters();

        setupModal();

        renderWishlist();

        renderRecentlyViewed();

        renderCart();

        renderCheckout();

        setupPaymentMethod();

        setupCheckout();

        setupFeedbackForm();

        setupFAQ();

        setupNewsletter();

        setupScrollReveal();

    }
);