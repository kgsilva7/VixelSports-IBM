// Alterna entre login e registro
const wrapper = document.querySelector('.wrapper');
const registerLink = document.querySelector('.register-link');
const loginLink = document.querySelector('.login-link');

registerLink.onclick = () => {
    wrapper.classList.add('active');
};

loginLink.onclick = () => {
    wrapper.classList.remove('active');
};

// Função para mostrar mensagens
function showMessage(message, isSuccess = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isSuccess ? 'success' : 'error'}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${isSuccess ? '#4CAF50' : '#f44336'};
        color: white;
        border-radius: 5px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// Login
document.querySelector('.login form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const username = this.querySelector('input[type="text"]').value;
    const password = this.querySelector('input[type="password"]').value;
    
    try {
        const response = await fetch('login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });
        
        const data = await response.json();
        
        if(data.success) {
            showMessage(data.message, true);
            // Redirecionar ou fazer algo após login
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        } else {
            showMessage(data.message, false);
        }
    } catch(error) {
        showMessage('Erro de conexão!', false);
    }
});

// Cadastro
document.querySelector('.register form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const username = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const password = this.querySelector('input[type="password"]').value;
    
    // Validação de senha
    if(password.length < 8) {
        showMessage('A senha deve ter pelo menos 8 caracteres!', false);
        return;
    }
    
    try {
        const response = await fetch('register.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        });
        
        const data = await response.json();
        
        if(data.success) {
            showMessage(data.message, true);
            // Alternar para login após cadastro
            setTimeout(() => {
                wrapper.classList.remove('active');
            }, 1500);
        } else {
            showMessage(data.message, false);
        }
    } catch(error) {
        showMessage('Erro de conexão!', false);
    }
});

// Verificar sessão ao carregar a página
document.addEventListener('DOMContentLoaded', async function() {
    try {
        const response = await fetch('check_session.php');
        const data = await response.json();
        
        if(data.logged_in) {
            // Usuário já está logado, redirecionar
            window.location.href = 'dashboard.html';
        }
    } catch(error) {
        console.log('Erro ao verificar sessão');
    }
});