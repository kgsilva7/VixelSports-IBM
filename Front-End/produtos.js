// script.js - Arquivo principal com todas as funcionalidades

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas as funcionalidades
    initMenu();
    initSearch();
    initCart();
    initFilters();
    initProductInteractions();
    updateCartCounter();
});

// =============================================
// 1. Funções para o Menu Mobile
// =============================================
function initMenu() {
    const menuIcon = document.getElementById('menu-icon');
    const navbar = document.getElementById('navbar');
    
    if (menuIcon && navbar) {
        menuIcon.addEventListener('click', toggleMenu);
    }
    
    // Submenu de produtos
    const productsLink = document.querySelector('.dropdown a');
    if (productsLink) {
        productsLink.addEventListener('click', function(e) {
            e.preventDefault();
            toggleSubmenu();
        });
    }
}

function toggleMenu() {
    const navbar = document.getElementById('navbar');
    navbar.classList.toggle('active');
    document.body.classList.toggle('menu-open');
}

function toggleSubmenu() {
    const submenu = document.getElementById('submenu');
    submenu.classList.toggle('hidden');
}

// =============================================
// 2. Funções para a Barra de Pesquisa
// =============================================
function initSearch() {
    const searchIcon = document.querySelector('.search');
    if (searchIcon) {
        searchIcon.addEventListener('click', function(e) {
            e.preventDefault();
            toggleSearchBar();
        });
    }
    
    // Pesquisa ao pressionar Enter
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchProducts();
            }
        });
    }
}

function toggleSearchBar() {
    const searchBar = document.getElementById('search-bar');
    searchBar.classList.toggle('hidden');
    
    if (!searchBar.classList.contains('hidden')) {
        searchBar.querySelector('input').focus();
    }
}

function searchProducts() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const productItems = document.querySelectorAll('.product-item');
    
    productItems.forEach(item => {
        const productName = item.querySelector('h3').textContent.toLowerCase();
        if (productName.includes(searchTerm)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
    
    // Fechar a barra de pesquisa após a busca
    toggleSearchBar();
}

// =============================================
// 3. Funções para o Carrinho de Compras
// =============================================
function initCart() {
    const cartIcon = document.getElementById('cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', function(e) {
            e.preventDefault();
            toggleCart();
        });
    }
    
    // Fechar carrinho ao clicar no overlay
    const overlay = document.getElementById('overlay');
    if (overlay) {
        overlay.addEventListener('click', toggleCart);
    }
    
    // Fechar carrinho ao clicar no botão X
    const closeCart = document.querySelector('.close-cart');
    if (closeCart) {
        closeCart.addEventListener('click', toggleCart);
    }
    
    // Atualizar carrinho quando a página carrega
    updateCartDisplay();
}

function toggleCart() {
    const cartModal = document.getElementById('cart-modal');
    const overlay = document.getElementById('overlay');
    
    cartModal.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.classList.toggle('cart-open');
}

function addToCart(name, price, image, size, quantity = 1) {
    let cart = JSON.parse(localStorage.getItem('vixelCart')) || [];
    
    // Verificar se o item já está no carrinho com o mesmo tamanho
    const existingItemIndex = cart.findIndex(item => 
        item.name === name && item.size === size
    );
    
    if (existingItemIndex !== -1) {
        // Item existe, atualizar quantidade
        cart[existingItemIndex].quantity += quantity;
    } else {
        // Adicionar novo item
        cart.push({
            name: name,
            price: parseFloat(price),
            image: image,
            size: size,
            quantity: quantity
        });
    }
    
    // Salvar no localStorage
    localStorage.setItem('vixelCart', JSON.stringify(cart));
    
    // Atualizar a UI
    updateCartCounter();
    updateCartDisplay();
    
    // Mostrar notificação
    showNotification(`${name} (${size}) adicionado ao carrinho!`);
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('vixelCart')) || [];
    
    if (index >= 0 && index < cart.length) {
        cart.splice(index, 1);
        localStorage.setItem('vixelCart', JSON.stringify(cart));
        updateCartDisplay();
        updateCartCounter();
    }
}

function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalPrice = document.getElementById('cart-total-price');
    const cart = JSON.parse(localStorage.getItem('vixelCart')) || [];
    
    // Limpar o container
    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = '';
        
        // Adicionar cada item do carrinho
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>Tamanho: ${item.size}</p>
                    <p>R$ ${item.price.toFixed(2)}</p>
                    <div class="cart-item-quantity">
                        <button onclick="adjustCartQuantity(${index}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="adjustCartQuantity(${index}, 1)">+</button>
                    </div>
                </div>
                <div class="cart-item-remove">
                    <button onclick="removeFromCart(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
        
        // Calcular total
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotalPrice.textContent = `R$ ${total.toFixed(2)}`;
    }
}

function adjustCartQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem('vixelCart')) || [];
    
    if (index >= 0 && index < cart.length) {
        cart[index].quantity += change;
        
        // Remover item se quantidade for zero ou menos
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        
        localStorage.setItem('vixelCart', JSON.stringify(cart));
        updateCartDisplay();
        updateCartCounter();
    }
}

function updateCartCounter() {
    const cart = JSON.parse(localStorage.getItem('vixelCart')) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const counter = document.getElementById('cart-count');
    
    if (counter) {
        counter.textContent = totalItems;
        counter.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

function checkout() {
    const cart = JSON.parse(localStorage.getItem('vixelCart')) || [];
    
    if (cart.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }
    
    // Aqui você pode adicionar a lógica para finalizar a compra
    // Por exemplo, redirecionar para a página de checkout
    alert('Redirecionando para a página de checkout...');
    // window.location.href = 'checkout.html';
}

// =============================================
// 4. Funções para Filtros de Produtos
// =============================================
function initFilters() {
    // Atualizar valor do range de preço
    const priceRange = document.getElementById('priceRange');
    if (priceRange) {
        priceRange.addEventListener('input', updatePriceValue);
        updatePriceValue(); // Inicializar o valor
    }
    
    // Aplicar filtros quando qualquer opção for alterada
    const filterInputs = document.querySelectorAll('#category, input[name="size"], .color-circle, #priceRange');
    filterInputs.forEach(input => {
        input.addEventListener('change', applyFilters);
    });
}

function updatePriceValue() {
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');
    
    if (priceRange && priceValue) {
        priceValue.textContent = priceRange.value;
    }
}

function applyFilters() {
    const category = document.getElementById('category').value;
    const selectedSize = document.querySelector('input[name="size"]:checked')?.value;
    const selectedColor = document.querySelector('.color-circle.selected')?.dataset.color;
    const maxPrice = parseFloat(document.getElementById('priceRange').value);
    
    const productItems = document.querySelectorAll('.product-item');
    
    productItems.forEach(item => {
        const itemCategory = item.dataset.category || 'tudo';
        const itemSize = item.dataset.sizes || '';
        const itemColor = item.dataset.color || '';
        const itemPrice = parseFloat(item.dataset.price) || 0;
        
        // Verificar filtros
        const categoryMatch = category === 'tudo' || itemCategory.includes(category);
        const sizeMatch = !selectedSize || itemSize.includes(selectedSize);
        const colorMatch = !selectedColor || itemColor.includes(selectedColor);
        const priceMatch = itemPrice <= maxPrice;
        
        if (categoryMatch && sizeMatch && colorMatch && priceMatch) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// =============================================
// 5. Interações com Produtos
// =============================================
function initProductInteractions() {
    // Adicionar event listeners para os círculos de cor
    const colorCircles = document.querySelectorAll('.color-circle');
    colorCircles.forEach(circle => {
        circle.addEventListener('click', function() {
            colorCircles.forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            applyFilters();
        });
    });
    
    // Adicionar data attributes para os produtos (simulação)
    // Na prática, esses dados viriam do seu backend ou seriam definidos no HTML
    const products = document.querySelectorAll('.product-item');
    products.forEach((product, index) => {
        // Simular alguns atributos para demonstração
        const categories = ['camisas', 'calças', 'shorts'];
        const colors = ['preto', 'branco', 'azul', 'vermelho', 'cinza'];
        const sizes = ['P', 'M', 'G', 'GG'];
        
        product.dataset.category = categories[index % 3];
        product.dataset.color = colors[index % 5];
        product.dataset.sizes = sizes.join(',');
        product.dataset.price = (50 + (index * 10)).toString();
    });
}

// =============================================
// 6. Funções Auxiliares
// =============================================
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function openProductPage(name, price, image, description) {
    const params = new URLSearchParams();
    params.append('name', name);
    params.append('price', price);
    params.append('image', image);
    params.append('description', description);
    
    window.location.href = `compra.html?${params.toString()}`;
}



// =============================================
// Funções Globais (acessíveis via HTML)
// =============================================
window.toggleMenu = toggleMenu;
window.toggleSubmenu = toggleSubmenu;
window.toggleSearchBar = toggleSearchBar;
window.searchProducts = searchProducts;
window.toggleCart = toggleCart;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.adjustCartQuantity = adjustCartQuantity;
window.checkout = checkout;
window.updatePriceValue = updatePriceValue;
window.applyFilters = applyFilters;
window.openProductPage = openProductPage;


// --- Menu Mobile ---
document.getElementById('menu-toggle').addEventListener('click', () => {
    const menu = document.getElementById('menu');
    menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
  });
  
  // --- Barra de Pesquisa ---
  document.getElementById('search-icon').addEventListener('click', () => {
    const barra = document.getElementById('search-bar');
    barra.classList.toggle('active');
  });
  
  // --- Carrinho com localStorage ---
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartCount = document.getElementById('cart-count');
  const cartTotal = document.getElementById('cart-total');
  
  function updateCartUI() {
    cartCount.textContent = cart.length;
    let total = 0;
    cart.forEach(item => {
      total += parseFloat(item.preco);
    });
    cartTotal.textContent = `Total: R$ ${total.toFixed(2)}`;
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  
  // --- Adicionar ao carrinho ---
  function addToCart(produto) {
    cart.push(produto);
    updateCartUI();
  }
  
  // --- Remover do carrinho (opcional) ---
  function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
  }
  
  // --- Atribui evento aos botões de adicionar ao carrinho ---
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
      const produtoEl = button.closest('.produto');
      const nome = produtoEl.querySelector('.produto-nome').textContent;
      const preco = produtoEl.querySelector('.produto-preco').textContent.replace('R$', '').trim();
      addToCart({ nome, preco });
    });
  });
  
  updateCartUI(); // Atualiza o carrinho ao carregar a página
  
  // --- Filtro por categoria ---
  document.querySelectorAll('.filtro-categoria').forEach(filtro => {
    filtro.addEventListener('click', () => {
      const categoria = filtro.dataset.categoria;
      document.querySelectorAll('.produto').forEach(prod => {
        prod.style.display = prod.classList.contains(categoria) || categoria === 'todos' ? 'block' : 'none';
      });
    });
  });
  
  // --- Modal dos produtos ---
  document.querySelectorAll('.produto').forEach(produto => {
    produto.addEventListener('click', () => {
      const modalId = produto.dataset.modal;
      const modal = document.getElementById(modalId);
      if (modal) modal.style.display = 'block';
    });
  });
  
  document.querySelectorAll('.modal .fechar').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal');
      modal.style.display = 'none';
    });
  });
  
  // Fecha o modal se clicar fora dele
  window.addEventListener('click', e => {
    document.querySelectorAll('.modal').forEach(modal => {
      if (e.target === modal) modal.style.display = 'none';
    });
  });
  