// Efeitos específicos para a página home
document.addEventListener('DOMContentLoaded', function() {
    // Animação do título
    const title = document.querySelector('.title');
    if (title) {
        setTimeout(() => {
            title.style.opacity = '1';
            title.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // Animação dos botões CTA
    const ctaButtons = document.querySelectorAll('#cta_buttons .btn_default');
    ctaButtons.forEach((button, index) => {
        setTimeout(() => {
            button.style.opacity = '1';
            button.style.transform = 'translateY(0)';
        }, 500 + (index * 200));
    });
    
    // Animação das redes sociais
    const socialButtons = document.querySelectorAll('.social-media-buttons a');
    socialButtons.forEach((button, index) => {
        setTimeout(() => {
            button.style.opacity = '1';
            button.style.transform = 'translateY(0)';
        }, 1000 + (index * 100));
    });
    
    // Efeito de hover nos produtos em promoção
    const promoItems = document.querySelectorAll('.dish');
    promoItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const star = this.querySelector('.dish-star');
            if (star) {
                star.style.transform = 'scale(1.1) rotate(15deg)';
                star.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const star = this.querySelector('.dish-star');
            if (star) {
                star.style.transform = 'scale(1) rotate(0)';
                star.style.boxShadow = 'none';
            }
        });
    });
    
    // Simular contagem de clientes satisfeitos
    if (document.querySelector('.review-container')) {
        let counts = [0, 0, 0];
        const targets = [95, 87, 92]; // Números fictícios para demonstração
        const counters = document.querySelectorAll('.review-card .stars');
        
        const interval = setInterval(() => {
            let allReached = true;
            
            counters.forEach((counter, index) => {
                if (counts[index] < targets[index]) {
                    counts[index]++;
                    counter.textContent = counts[index] + '%';
                    allReached = false;
                }
            });
            
            if (allReached) {
                clearInterval(interval);
                counters.forEach(counter => {
                    counter.textContent = counter.textContent.replace('%', '') + '% satisfação';
                });
            }
        }, 30);
    }
});