function toggleSearchBar() {
    const searchBar = document.getElementById('search-bar');
    searchBar.classList.toggle('hidden');
    searchBar.classList.toggle('visible');

    if (searchBar.classList.contains('visible')) {
        document.getElementById('search-input').focus();
    }
}

document.addEventListener('click', function(event) {
    const searchBar = document.getElementById('search-bar');
    const searchIcon = document.querySelector('.search');
    
    if (!searchBar.contains(event.target) && !searchIcon.contains(event.target)) {
        searchBar.classList.add('hidden');
        searchBar.classList.remove('visible');
    }
});

function liveSearch() {
    const input = document.getElementById('search-input').value.toLowerCase();
    const productItems = document.querySelectorAll('.product-item');
    
    productItems.forEach(item => {
        const productName = item.querySelector('h3').innerText.toLowerCase();
        item.style.display = productName.includes(input) ? 'block' : 'none';
    });
}
