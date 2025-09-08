 
function toggleSearchBar() {
    const searchBar = document.getElementById('search-bar');
    searchBar.classList.toggle('hidden');
    searchBar.classList.toggle('visible');
}

 
function searchProducts() {
    const input = document.getElementById('search-input').value.toLowerCase();  
    const productItems = document.querySelectorAll('.product-item');  

    productItems.forEach(item => {
        const productName = item.querySelector('h3').innerText.toLowerCase();  
        item.style.display = productName.includes(input) ? 'block' : 'none';
    });
}

  
 