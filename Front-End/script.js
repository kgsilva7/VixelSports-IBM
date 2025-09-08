 let menu = document.querySelector('#menu-icon');
 let navbar = document.querySelector('#navbar');

 menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('open');
 }

 function toggleSubmenu() {
    var submenu = document.getElementById("submenu");

     
    if (submenu.classList.contains("hidden")) {
        submenu.classList.remove("hidden");
        submenu.style.display = "block";
    } else {
        submenu.classList.add("hidden");
        submenu.style.display = "none";
    }
}

const images = document.querySelectorAll('.carousel-images img');
let currentIndex = 0;

function showImage(index) {
    images.forEach(img => img.classList.remove('active'));
    images[index].classList.add('active');
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
}

setInterval(nextImage, 3000);
  
 
document.addEventListener("DOMContentLoaded", function () {
    const cookieConsentPopup = document.getElementById("cookieConsentPopup");
    const acceptButton = document.getElementById("acceptCookies");
  
     
    cookieConsentPopup.style.display = "block";
  
    
    acceptButton.addEventListener("click", function () {
      cookieConsentPopup.style.display = "none";
       
    });
  });

   
  function toggleSidebar() {
    let sidebar = document.getElementById('sidebar');
    if (sidebar.style.width === '250px' || sidebar.style.width === '') {
        sidebar.style.width = '0';
    } else {
        sidebar.style.width = '250px';
    }
}
function updatePrice() {
    let range = document.getElementById('priceRange');
    let value = document.getElementById('priceValue');
    value.innerText = range.value;
}

document.addEventListener("DOMContentLoaded", function () {
  let images = document.querySelectorAll(".carousel-images img");
  let index = 0;

  function nextImage() {
    images[index].classList.remove("active");
    index = (index + 1) % images.length;
    images[index].classList.add("active");
  }

  setInterval(nextImage, 3000);
});  
document.addEventListener("DOMContentLoaded", function () {
    let selectionBar = document.querySelector(".selection-bar");
    let footer = document.querySelector("footer");

    function adjustSelectionBar() {
        let footerPosition = footer.getBoundingClientRect().top;
        let viewportHeight = window.innerHeight;

        if (footerPosition < viewportHeight) {
            selectionBar.style.position = "absolute";
            selectionBar.style.top = (footer.offsetTop - selectionBar.offsetHeight - 20) + "px";
        } else {
            selectionBar.style.position = "fixed";
            selectionBar.style.top = "160px";
        }
    }
 
    adjustSelectionBar();
    window.addEventListener("scroll", adjustSelectionBar);
    window.addEventListener("resize", adjustSelectionBar);
});

document.querySelectorAll('.color-circle').forEach(circle => {
    circle.addEventListener('click', () => {
        
        document.querySelectorAll('.color-circle').forEach(c => c.classList.remove('selected'));
       
        circle.classList.add('selected');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Captura os parâmetros da URL
    const urlParams = new URLSearchParams(window.location.search);
    const productName = urlParams.get('name');
    const productPrice = urlParams.get('price');
    const productImage = urlParams.get('image');

    // Exibe os detalhes do produto na página
    document.getElementById('product-name').textContent = productName;
    document.getElementById('product-price').textContent = `R$ ${productPrice}`;
    document.getElementById('product-image').src = productImage;

    // Adiciona evento de clique para seleção de cor
    const colorCircles = document.querySelectorAll('.color-circle');
    colorCircles.forEach(circle => {
        circle.addEventListener('click', function() {
            colorCircles.forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    // Adiciona evento de clique para o botão "Adicionar ao Carrinho"
    document.querySelector('.add-to-cart').addEventListener('click', function() {
        alert('Produto adicionado ao carrinho!');
    });

    // Adiciona evento de clique para o botão "Comprar Agora"
    document.querySelector('.buy-now').addEventListener('click', function() {
        alert('Compra realizada com sucesso!');
    });
});

function calculateShipping() {
    const zipcode = document.getElementById('zipcode').value;
    if (zipcode.length === 8) { // Verifica se o CEP tem 8 dígitos
        const shippingCost = Math.floor(Math.random() * 20) + 10; // Gera um valor aleatório para o frete
        document.getElementById('shipping-cost').textContent = `Frete: R$ ${shippingCost}`;
        updateTotal(shippingCost);
    } else {
        alert('CEP inválido'); // Alerta se o CEP não tiver 8 dígitos
    }
}

function updateTotal(shippingCost) {
    const productPrice = parseFloat(document.getElementById('product-price').textContent.replace('R$ ', '')); // Remove o "R$ " e converte para número
    const total = productPrice + shippingCost; // Calcula o total
    document.getElementById('total').textContent = total.toFixed(2); // Exibe o total com 2 casas decimais
}

 function openModal(name, price, image) {
    window.location.href = `comprar.html?name=${encodeURIComponent(name)}&price=${encodeURIComponent(price)}&image=${encodeURIComponent(image)}`;
}

 

    // Carrossel Responsivo
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.carousel-images img');
    if (images.length > 0) {
        let current = 0;
        
        // Mostrar a primeira imagem
        images[current].classList.add('active');
        
        function nextImage() {
            images[current].classList.remove('active');
            current = (current + 1) % images.length;
            images[current].classList.add('active');
        }
        
        // Configurar intervalo para mudar as imagens
        const carouselInterval = setInterval(nextImage, 3000);
        
        // Pausar ao passar o mouse (para melhor UX)
        const carousel = document.querySelector('.carousel-images');
        if (carousel) {
            carousel.addEventListener('mouseenter', function() {
                clearInterval(carouselInterval);
            });
            
            carousel.addEventListener('mouseleave', function() {
                carouselInterval = setInterval(nextImage, 3000);
            });
        }
    }
    
   
    function adjustCarouselImages() {
        const carouselImages = document.querySelectorAll('.carousel-images img');
        if (carouselImages.length > 0) {
            const screenWidth = window.innerWidth;
            let imgSize;
            
            if (screenWidth >= 1200) {
                imgSize = 80;
            } else if (screenWidth >= 768) {
                imgSize = 70;
            } else if (screenWidth >= 576) {
                imgSize = 60;
            } else {
                imgSize = 50;
            }
            
            carouselImages.forEach(img => {
                img.style.width = `${imgSize}px`;
                img.style.height = `${imgSize}px`;
            });
        }
    }
    
     
    adjustCarouselImages();
    window.addEventListener('resize', adjustCarouselImages);
});

 
