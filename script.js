 
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.innerHTML = navMenu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
}

 
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.padding = '0.8rem 0';
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.padding = '1.2rem 0';
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    }
});

 
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

 
document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in').forEach(element => {
    observer.observe(element);
});

 
function updatePromoTimer() {
    const timerValues = document.querySelectorAll('.timer-value');
     
}

updatePromoTimer();

 
const searchInput = document.querySelector('.search-input');
if (searchInput) {
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            const searchTerm = this.value.trim();
            if (searchTerm) {
                
                alert(`Pesquisando por: ${searchTerm}`);
              
            }
        }
    });
}

 
function filterProducts(category) {
   
    alert(`Filtrando produtos por: ${category}`);
}

 
let cartCount = 0;
const cartIcon = document.getElementById('cartIcon');
const cartCountElement = document.querySelector('.cart-count');

function updateCartCount(count) {
    cartCount = count;
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
}

function addToCart(productId) {
    cartCount++;
    updateCartCount(cartCount);
    
}

 
function setupQuantityControls() {
    document.querySelectorAll('.quantity-control').forEach(control => {
        const minusBtn = control.querySelector('.quantity-minus');
        const plusBtn = control.querySelector('.quantity-plus');
        const quantityInput = control.querySelector('.quantity-input');
        
        minusBtn?.addEventListener('click', () => {
            let value = parseInt(quantityInput.value);
            if (value > 1) {
                quantityInput.value = value - 1;
            }
        });
        
        plusBtn?.addEventListener('click', () => {
            let value = parseInt(quantityInput.value);
            quantityInput.value = value + 1;
        });
    });
}

 
function selectPaymentMethod(method) {
    const paymentMethods = document.querySelectorAll('.payment-method');
    paymentMethods.forEach(pm => pm.classList.remove('active'));
    
    const selectedMethod = document.querySelector(`.payment-method[data-method="${method}"]`);
    if (selectedMethod) {
        selectedMethod.classList.add('active');
    }
}

 
function setupFormValidation() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Por favor, preencha todos os campos obrigatórios.');
            }
        });
    });
}

 
document.addEventListener('DOMContentLoaded', function() {
    setupQuantityControls();
    setupFormValidation();
    
    
    const firstPaymentMethod = document.querySelector('.payment-method');
    if (firstPaymentMethod) {
        firstPaymentMethod.classList.add('active');
    }
    
 
    document.querySelectorAll('.btn-add-to-cart').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.dataset.productId;
            addToCart(productId);
            
            
            const successMsg = document.createElement('div');
            successMsg.className = 'success-message';
            successMsg.textContent = 'Produto adicionado ao carrinho!';
            successMsg.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                background: var(--azul-bem-claro);
                color: white;
                padding: 1rem 2rem;
                border-radius: 8px;
                z-index: 10000;
                animation: slideInRight 0.3s ease;
            `;
            
            document.body.appendChild(successMsg);
            
            setTimeout(() => {
                successMsg.remove();
            }, 3000);
        });
    });
});

 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

 
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}


// script.js - Código principal do site Vixel Sports

document.addEventListener('DOMContentLoaded', function() {
    // ========== INICIALIZAÇÃO DO CARRINHO ==========
    initializeCart();

    // ========== BARRA DE PESQUISA ==========
    initializeSearch();

    // ========== FILTROS DA SIDEBAR ==========
    initializeFilters();

    // ========== MENU MOBILE ==========
    initializeMobileMenu();

    // ========== ANIMAÇÕES ==========
    initializeAnimations();
});

// ========== FUNÇÕES DO CARRINHO ==========
function initializeCart() {
    // Carregar carrinho do localStorage
    let cart = JSON.parse(localStorage.getItem('vixelCart')) || [];
    updateCartDisplay(cart);

    // Botões de quantidade
    document.querySelectorAll('.quantity-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.parentElement.querySelector('.quantity-input');
            let value = parseInt(input.value);
            const itemId = this.closest('.cart-item').dataset.itemId;
            
            if (this.classList.contains('plus')) {
                input.value = value + 1;
                updateCartItemQuantity(itemId, value + 1);
            } else if (this.classList.contains('minus') && value > 1) {
                input.value = value - 1;
                updateCartItemQuantity(itemId, value - 1);
            }
            
            updateCartTotal();
        });
    });

    // Remover itens do carrinho
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const cartItem = this.closest('.cart-item');
            const itemId = cartItem.dataset.itemId;
            
            cartItem.style.animation = 'slideOut 0.3s ease';
            
            setTimeout(() => {
                removeFromCart(itemId);
                cartItem.remove();
                updateCartTotal();
                checkEmptyCart();
            }, 300);
        });
    });

    // Adicionar ao carrinho dos produtos recomendados
    document.querySelectorAll('.recommended-grid .btn, .product-actions .btn-primary').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-title').textContent;
            const productPrice = productCard.querySelector('.product-price').textContent;
            const productImage = productCard.querySelector('.product-image img').src;
            const productCategory = productCard.querySelector('.product-category')?.textContent || 'Geral';
            
            addToCart({
                id: generateId(),
                name: productName,
                price: extractPrice(productPrice),
                image: productImage,
                category: productCategory,
                quantity: 1,
                size: 'M',
                color: 'Preto'
            });
            
            showSuccessMessage(`${productName} adicionado ao carrinho!`);
        });
    });
}

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('vixelCart')) || [];
    
    // Verificar se o produto já está no carrinho
    const existingItem = cart.find(item => 
        item.name === product.name && 
        item.size === product.size && 
        item.color === product.color
    );
    
    if (existingItem) {
        existingItem.quantity += product.quantity;
    } else {
        cart.push(product);
    }
    
    localStorage.setItem('vixelCart', JSON.stringify(cart));
    updateCartDisplay(cart);
    updateCartTotal();
}

function removeFromCart(itemId) {
    let cart = JSON.parse(localStorage.getItem('vixelCart')) || [];
    cart = cart.filter(item => item.id !== itemId);
    localStorage.setItem('vixelCart', JSON.stringify(cart));
    updateCartDisplay(cart);
}

function updateCartItemQuantity(itemId, quantity) {
    let cart = JSON.parse(localStorage.getItem('vixelCart')) || [];
    const item = cart.find(item => item.id === itemId);
    if (item) {
        item.quantity = quantity;
        localStorage.setItem('vixelCart', JSON.stringify(cart));
        updateCartDisplay(cart);
    }
}

function updateCartDisplay(cart) {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }
    
    // Atualizar página do carrinho se estiver nela
    if (document.querySelector('.cart-items')) {
        renderCartItems(cart);
    }
}

function renderCartItems(cart) {
    const cartItemsContainer = document.querySelector('.cart-items');
    const emptyCart = document.querySelector('.empty-cart');
    
    if (cart.length === 0) {
        emptyCart.style.display = 'block';
        return;
    }
    
    emptyCart.style.display = 'none';
    
    // Limpar itens existentes (exceto empty-cart)
    document.querySelectorAll('.cart-item').forEach(item => item.remove());
    
    // Adicionar novos itens
    cart.forEach(item => {
        const cartItem = createCartItemElement(item);
        cartItemsContainer.insertBefore(cartItem, emptyCart);
    });
    
    updateCartSummary(cart);
}

function createCartItemElement(item) {
    const itemElement = document.createElement('div');
    itemElement.className = 'cart-item fade-in';
    itemElement.dataset.itemId = item.id;
    
    itemElement.innerHTML = `
        <div class="item-image">
            <img src="${item.image}" alt="${item.name}">
        </div>
        
        <div class="item-details">
            <h3 class="item-title">${item.name}</h3>
            <p class="item-category">${item.category}</p>
            <div class="item-options">
                <div class="option">
                    <span>Tamanho:</span>
                    <select class="size-select">
                        <option ${item.size === 'P' ? 'selected' : ''}>P</option>
                        <option ${item.size === 'M' ? 'selected' : ''}>M</option>
                        <option ${item.size === 'G' ? 'selected' : ''}>G</option>
                        <option ${item.size === 'GG' ? 'selected' : ''}>GG</option>
                    </select>
                </div>
                <div class="option">
                    <span>Cor:</span>
                    <span class="color-option">${item.color}</span>
                </div>
            </div>
        </div>
        
        <div class="item-quantity">
            <button class="quantity-btn minus">-</button>
            <input type="number" class="quantity-input" value="${item.quantity}" min="1">
            <button class="quantity-btn plus">+</button>
        </div>
        
        <div class="item-price">
            <span class="current-price">R$ ${formatPrice(item.price)}</span>
            ${item.originalPrice ? `<span class="original-price">R$ ${formatPrice(item.originalPrice)}</span>` : ''}
        </div>
        
        <button class="remove-btn">
            <i class="fas fa-trash"></i>
        </button>
    `;
    
    // Reaplicar event listeners
    const removeBtn = itemElement.querySelector('.remove-btn');
    const quantityBtns = itemElement.querySelectorAll('.quantity-btn');
    
    removeBtn.addEventListener('click', function() {
        const cartItem = this.closest('.cart-item');
        const itemId = cartItem.dataset.itemId;
        
        cartItem.style.animation = 'slideOut 0.3s ease';
        
        setTimeout(() => {
            removeFromCart(itemId);
            cartItem.remove();
            updateCartTotal();
            checkEmptyCart();
        }, 300);
    });
    
    quantityBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.parentElement.querySelector('.quantity-input');
            let value = parseInt(input.value);
            const itemId = this.closest('.cart-item').dataset.itemId;
            
            if (this.classList.contains('plus')) {
                input.value = value + 1;
                updateCartItemQuantity(itemId, value + 1);
            } else if (this.classList.contains('minus') && value > 1) {
                input.value = value - 1;
                updateCartItemQuantity(itemId, value - 1);
            }
            
            updateCartTotal();
        });
    });
    
    return itemElement;
}

function updateCartSummary(cart) {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = cart.reduce((sum, item) => sum + ((item.originalPrice || 0) - item.price) * item.quantity, 0);
    const total = subtotal - discount;
    
    const summaryLines = document.querySelectorAll('.summary-line');
    if (summaryLines.length >= 3) {
        summaryLines[0].querySelector('span:last-child').textContent = `R$ ${formatPrice(subtotal)}`;
        summaryLines[1].querySelector('span:last-child').textContent = 'Grátis';
        summaryLines[2].querySelector('span:last-child').textContent = `- R$ ${formatPrice(discount)}`;
        summaryLines[3].querySelector('span:last-child').textContent = `R$ ${formatPrice(total)}`;
    }
}

function updateCartTotal() {
    const cart = JSON.parse(localStorage.getItem('vixelCart')) || [];
    updateCartSummary(cart);
}

function checkEmptyCart() {
    const cart = JSON.parse(localStorage.getItem('vixelCart')) || [];
    const emptyCart = document.querySelector('.empty-cart');
    
    if (cart.length === 0 && emptyCart) {
        emptyCart.style.display = 'block';
    } else if (emptyCart) {
        emptyCart.style.display = 'none';
    }
}

// ========== BARRA DE PESQUISA ==========
function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchIcon = document.querySelector('.search-icon');
    
    if (searchInput) {
        // Pesquisa ao digitar
        searchInput.addEventListener('input', function() {
            performSearch(this.value);
        });
        
        // Pesquisa ao clicar no ícone
        if (searchIcon) {
            searchIcon.addEventListener('click', function() {
                performSearch(searchInput.value);
            });
        }
        
        // Pesquisa ao pressionar Enter
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(this.value);
            }
        });
    }
}

function performSearch(query) {
    if (!query.trim()) return;
    
    // Em uma implementação real, isso faria uma requisição para o backend
    // Por enquanto, vamos apenas redirecionar para a página de produtos com o parâmetro de busca
    const searchUrl = `produtos.html?search=${encodeURIComponent(query)}`;
    window.location.href = searchUrl;
}

// ========== FILTROS DA SIDEBAR ==========
function initializeFilters() {
    // Filtro de preço
    const priceRange = document.querySelector('.price-range');
    if (priceRange) {
        priceRange.addEventListener('input', function() {
            filterProducts();
        });
    }
    
    // Filtro de tamanhos
    document.querySelectorAll('.size-option input').forEach(checkbox => {
        checkbox.addEventListener('change', filterProducts);
    });
    
    // Filtro de cores
    document.querySelectorAll('.color-option').forEach(color => {
        color.addEventListener('click', function() {
            this.classList.toggle('active');
            filterProducts();
        });
    });
    
    // Ordenação
    const sortSelect = document.querySelector('.sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', sortProducts);
    }
    
    // Filtro de categorias
    document.querySelectorAll('.filter-options a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover active de todos
            document.querySelectorAll('.filter-options a').forEach(a => {
                a.classList.remove('active');
            });
            
            // Adicionar active ao clicado
            this.classList.add('active');
            
            filterProducts();
        });
    });
}

function filterProducts() {
    const products = document.querySelectorAll('.product-card');
    const priceRange = document.querySelector('.price-range');
    const maxPrice = priceRange ? parseInt(priceRange.value) : 500;
    
    // Obter tamanhos selecionados
    const selectedSizes = Array.from(document.querySelectorAll('.size-option input:checked'))
        .map(checkbox => checkbox.parentElement.textContent.trim());
    
    // Obter cores selecionadas
    const selectedColors = Array.from(document.querySelectorAll('.color-option.active'))
        .map(color => getColorName(color.style.background));
    
    // Obter categoria ativa
    const activeCategory = document.querySelector('.filter-options a.active')?.textContent || 'Todos os Produtos';
    
    products.forEach(product => {
        let show = true;
        
        // Filtro por categoria
        if (activeCategory !== 'Todos os Produtos') {
            const productCategory = product.dataset.category;
            if (!productCategory.includes(activeCategory.toLowerCase())) {
                show = false;
            }
        }
        
        // Filtro por preço
        const priceText = product.querySelector('.product-price').textContent;
        const price = extractPrice(priceText);
        if (price > maxPrice) {
            show = false;
        }
        
        // Filtro por tamanho (em implementação real, isso viria do backend)
        if (selectedSizes.length > 0) {
            // Simulação - produtos com nomes específicos
            const productName = product.querySelector('.product-title').textContent.toLowerCase();
            const hasSize = selectedSizes.some(size => 
                productName.includes(size.toLowerCase())
            );
            if (!hasSize) {
                show = false;
            }
        }
        
        // Mostrar/ocultar produto
        product.style.display = show ? 'block' : 'none';
    });
}

function sortProducts() {
    const sortSelect = document.querySelector('.sort-select');
    const sortValue = sortSelect.value;
    const productsContainer = document.querySelector('.products-grid-page');
    const products = Array.from(document.querySelectorAll('.product-card'));
    
    products.sort((a, b) => {
        const priceA = extractPrice(a.querySelector('.product-price').textContent);
        const priceB = extractPrice(b.querySelector('.product-price').textContent);
        
        switch (sortValue) {
            case 'price-low':
                return priceA - priceB;
            case 'price-high':
                return priceB - priceA;
            case 'popular':
                // Simulação - produtos com badge são mais populares
                const badgeA = a.querySelector('.product-badge') ? 1 : 0;
                const badgeB = b.querySelector('.product-badge') ? 1 : 0;
                return badgeB - badgeA;
            case 'recent':
            default:
                return 0; // Mantém ordem original
        }
    });
    
    // Reordenar no DOM
    products.forEach(product => {
        productsContainer.appendChild(product);
    });
}

// ========== MENU MOBILE ==========
function initializeMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
}

// ========== ANIMAÇÕES ==========
function initializeAnimations() {
    // Animação de fade-in para elementos com a classe fade-in
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// ========== FUNÇÕES AUXILIARES ==========
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function extractPrice(priceText) {
    const match = priceText.match(/R\$\s*([\d,]+)/);
    if (match) {
        return parseFloat(match[1].replace(',', '.'));
    }
    return 0;
}

function formatPrice(price) {
    return price.toFixed(2).replace('.', ',');
}

function getColorName(color) {
    const colorMap = {
        '#000': 'Preto',
        '#fff': 'Branco',
        '#0a1f36': 'Azul Marinho',
        '#4a8ac8': 'Azul',
        '#64748b': 'Cinza'
    };
    return colorMap[color] || color;
}

function showSuccessMessage(message) {
    const successMsg = document.createElement('div');
    successMsg.className = 'success-message';
    successMsg.textContent = message;
    successMsg.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #4a8ac8;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    document.body.appendChild(successMsg);
    
    setTimeout(() => {
        successMsg.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            successMsg.remove();
        }, 300);
    }, 3000);
}

 
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
    
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(-100%);
        }
    }
    
    .color-option.active {
        transform: scale(1.2);
        box-shadow: 0 0 0 2px #4a8ac8;
    }
    
    .nav-menu.active {
        display: block !important;
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            z-index: 1000;
        }
    }
`;
document.head.appendChild(style);