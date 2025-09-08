
const wrapper = document.querySelector('.wrapper');
const registerLink = document.querySelector('.register-link');
const loginLink = document.querySelector('.login-link');

registerLink.onclick = () => {
    wrapper.classList.add('active');
};

loginLink.onclick = () => {
    wrapper.classList.remove('active');
};

 
function validatePassword(input, errorMessage) {
    if (input.value.length < 8) {
        errorMessage.style.display = 'block';   
        return false;
    } else {
        errorMessage.style.display = 'none';  
        return true;
    }
}

function togglePassword(input, toggleIcon) {
    if (input.type === 'password') {
        input.type = 'text';
        toggleIcon.textContent = 'esconder.png';  
    } else {
        input.type = 'password';
        toggleIcon.textContent = 'ver.png';  
    }
}

document.getElementById('myButton').addEventListener('click', function() {
    window.location.href = 'login.html';
});

