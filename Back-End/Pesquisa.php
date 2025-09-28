<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pesquisa de Produtos</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        } 
        body {
            background-color: #f5f7fa;
            color: #333;
            line-height: 1.6;
        }  
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        .search-container {
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            padding: 30px;
            margin-bottom: 30px;
        }
        .search-header {
            text-align: center;
            margin-bottom: 25px;
        }
        .search-header h1 {
            color: #0a2b5e;
            margin-bottom: 10px;
        }
        .search-header p {
            color: #666;
            font-size: 16px;
        }
        .search-form {
            display: flex;
            gap: 15px;
            margin-bottom: 20px;
        }
        .search-input {
            flex: 1;
            padding: 12px 15px;
            border: 2px solid #e1e5eb;
            border-radius: 6px;
            font-size: 16px;
            transition: all 0.3s;
        }
        .search-input:focus {
            border-color: #0a2b5e;
            outline: none;
            box-shadow: 0 0 0 3px rgba(10, 43, 94, 0.1);
        }
        .search-btn {
            background-color: #0a2b5e;
            color: white;
            border: none;
            padding: 12px 25px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 600;
            transition: background-color 0.3s;
        }
        .search-btn:hover {
            background-color: #1a4b8c;
        }
        .filters-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-bottom: 20px;
        }
        .filter-group {
            margin-bottom: 15px;
        }
        .filter-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: #444;
        }
        .filter-select {
            width: 100%;
            padding: 10px;
            border: 1px solid #e1e5eb;
            border-radius: 6px;
            background-color: white;
        }
        .price-range {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .price-input {
            width: 100px;
            padding: 8px;
            border: 1px solid #e1e5eb;
            border-radius: 4px;
        }
        .results-container {
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            padding: 30px;
        }
        .results-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 25px;
            padding-bottom: 15px;
            border-bottom: 1px solid #e1e5eb;
        }
        .results-count {
            font-size: 18px;
            color: #666;
        }
        .sort-options select {
            padding: 8px 12px;
            border: 1px solid #e1e5eb;
            border-radius: 6px;
        }
        .products-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 25px;
        }
        .product-card {
            background-color: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
            transition: transform 0.3s, box-shadow 0.3s;
        }
        .product-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
        }
        .product-image {
            width: 100%;
            height: 200px;
            object-fit: cover;
        }
        .product-info {
            padding: 15px;
        }
        .product-name {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 8px;
            color: #0a2b5e;
        }
        .product-category {
            color: #666;
            font-size: 14px;
            margin-bottom: 10px;
        }
        .product-price {
            font-size: 20px;
            font-weight: 700;
            color: #0a2b5e;
            margin-bottom: 10px;
        }
        .product-actions {
            display: flex;
            justify-content: space-between;
        }
        .add-to-cart {
            background-color: #0a2b5e;
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            transition: background-color 0.3s;
        }
        .add-to-cart:hover {
            background-color: #1a4b8c;
        }
        .view-details {
            background-color: transparent;
            color: #0a2b5e;
            border: 1px solid #0a2b5e;
            padding: 8px 15px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.3s;
        } 
        .view-details:hover {
            background-color: #0a2b5e;
            color: white;
        }
        .empty-state {
            text-align: center;
            padding: 40px 0;
        }  
        .empty-state img {
            max-width: 200px;
            margin-bottom: 20px;
            opacity: 0.7;
        }   
        .empty-state h3 {
            color: #666;
            margin-bottom: 10px;
        }   
        .empty-state p {
            color: #888;
        }
        @media (max-width: 768px) {
            .search-form {
                flex-direction: column;
            }          
            .filters-container {
                grid-template-columns: 1fr;
            }        
            .products-grid {
                grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            }        
            .results-header {
                flex-direction: column;
                align-items: flex-start;
                gap: 15px;
            }
        }   
        @media (max-width: 480px) {
            .products-grid {
                grid-template-columns: 1fr;
            }       
          .container {
                padding: 10px;
            }          
            .search-container, .results-container {
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="search-container">
            <div class="search-header">
                <h1>Pesquisar Produtos</h1>
                <p>Encontre os melhores produtos esportivos para suas necessidades</p>
            </div>         
            <form class="search-form" id="search-form">
                <input type="text" class="search-input" id="search-input" placeholder="Digite o nome do produto, categoria ou descrição...">
                <button type="submit" class="search-btn">Pesquisar</button>
            </form>         
            <div class="filters-container">
                <div class="filter-group">
                    <label for="category-filter">Categoria</label>
                    <select class="filter-select" id="category-filter">
                        <option value="">Todas as categorias</option>
                        <option value="Roupas">Roupas</option>
                        <option value="Calçados">Calçados</option>
                        <option value="Acessórios">Acessórios</option>
                        <option value="Roupas Esportivas">Roupas Esportivas</option>
                    </select>
                </div>             
                <div class="filter-group">
                    <label for="gender-filter">Gênero</label>
                    <select class="filter-select" id="gender-filter">
                        <option value="">Todos</option>
                        <option value="M">Masculino</option>
                        <option value="F">Feminino</option>
                        <option value="U">Unissex</option>
                    </select>
                </div>              
                <div class="filter-group">
                    <label for="size-filter">Tamanho</label>
                    <select class="filter-select" id="size-filter">
                        <option value="">Todos os tamanhos</option>
                        <option value="P">P</option>
                        <option value="M">M</option>
                        <option value="G">G</option>
                        <option value="GG">GG</option>
                        <option value="38">38</option>
                        <option value="39">39</option>
                        <option value="40">40</option>
                        <option value="41">41</option>
                        <option value="42">42</option>
                        <option value="43">43</option>
                    </select>
                </div>              
                <div class="filter-group">
                    <label for="price-filter">Preço Máximo</label>
                    <div class="price-range">
                        <span>R$</span>
                        <input type="number" class="price-input" id="price-filter" min="0" max="500" value="500">
                    </div>
                </div>
            </div>
        </div>      
        <div class="results-container">
            <div class="results-header">
                <div class="results-count" id="results-count">0 produtos encontrados</div>
                <div class="sort-options">
                    <select id="sort-options">
                        <option value="name">Ordenar por Nome</option>
                        <option value="price-low">Preço: Menor para Maior</option>
                        <option value="price-high">Preço: Maior para Menor</option>
                    </select>
                </div>
            </div>         
            <div class="products-grid" id="products-grid">
            </div>     
            <div class="empty-state" id="empty-state" style="display: none;">
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik04MCA2MEgxMjBNODAgODBIMTIwTTgwIDEwMEgxMjBNNjAgNjBWNzBNNjAgODBWMTAwTTYwIDEyMFYxNDBNMTQwIDYwVjcwTTE0MCA4MFYxMDBNMTQwIDEyMFYxNDBNNDAgNDBIMTYwVjE2MEg0MFY0MFoiIHN0cm9rZT0iIzk5OSIgc3Ryb2tlLXdpZHRoPSIyIi8+Cjwvc3ZnPg==" alt="Nenhum produto encontrado">
                <h3>Nenhum produto encontrado</h3>
                <p>Tente ajustar seus critérios de pesquisa ou filtros</p>
            </div>
        </div>
    </div>
<?php
include_once 'produto.php';
$produtoObj = new Produto();
$produtosBD = $produtoObj->consultar();
$produtos = array();
foreach ($produtosBD as $produto) {
    $produtos[] = array(
        'id' => $produto['id_produto'],
        'nome' => $produto['nome'],
        'categoria' => $produto['categoria'],
        'tamanho' => $produto['tamanho'],
        'cor' => $produto['cor'],
        'preco' => $produto['preco'],
        'genero' => $produto['genero'],
        'imagem' => '' 
    );
}
?>    
    <script>
        const produtos = <?php echo json_encode($produtos); ?>;
        const searchForm = document.getElementById('search-form');
        const searchInput = document.getElementById('search-input');
        const categoryFilter = document.getElementById('category-filter');
        const genderFilter = document.getElementById('gender-filter');
        const sizeFilter = document.getElementById('size-filter');
        const priceFilter = document.getElementById('price-filter');
        const sortOptions = document.getElementById('sort-options');
        const productsGrid = document.getElementById('products-grid');
        const resultsCount = document.getElementById('results-count');
        const emptyState = document.getElementById('empty-state');       
        function filterProducts() {
            const searchTerm = searchInput.value.toLowerCase();
            const category = categoryFilter.value;
            const gender = genderFilter.value;
            const size = sizeFilter.value;
            const maxPrice = parseFloat(priceFilter.value) || 500;
            let filteredProducts = produtos.filter(produto => {
                const matchesSearch = searchTerm === '' || 
                    produto.nome.toLowerCase().includes(searchTerm) || 
                    produto.categoria.toLowerCase().includes(searchTerm) ||
                    produto.cor.toLowerCase().includes(searchTerm);
                const matchesCategory = category === '' || produto.categoria === category;
                const matchesGender = gender === '' || produto.genero === gender;
                const matchesSize = size === '' || produto.tamanho === size;               
                const matchesPrice = produto.preco <= maxPrice;
                return matchesSearch && matchesCategory && matchesGender && matchesSize && matchesPrice;
            });
            const sortBy = sortOptions.value;
            if (sortBy === 'name') {
                filteredProducts.sort((a, b) => a.nome.localeCompare(b.nome));
            } else if (sortBy === 'price-low') {
                filteredProducts.sort((a, b) => a.preco - b.preco);
            } else if (sortBy === 'price-high') {
                filteredProducts.sort((a, b) => b.preco - a.preco);
            }
            return filteredProducts;
        }
        function renderProducts(products) {
            productsGrid.innerHTML = '';
            if (products.length === 0) {
                emptyState.style.display = 'block';
                resultsCount.textContent = '0 produtos encontrados';
                return;
            }
            emptyState.style.display = 'none';
            resultsCount.textContent = `${products.length} produto(s) encontrado(s)`;
            products.forEach(produto => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                let generoTexto = '';
                if (produto.genero === 'M') generoTexto = 'Masculino';
                else if (produto.genero === 'F') generoTexto = 'Feminino';
                else generoTexto = 'Unissex';
                productCard.innerHTML = `
                    <img src="${produto.imagem}" alt="${produto.nome}" class="product-image" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDI1MCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyNTAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRTVFNUU1Ii8+CjxwYXRoIGQ9Ik0xMDAgODBIMTUwTTEwMCAxMDBIMTUwTTEwMCAxMjBIMTUwTTc1IDgwVjEwME03NSAxMjBWMTQwTTE3NSA4MFYxMDBMMTc1IDEyMFYxNDBNNTAgNjBIMjAwVjE2MEg1MFY2MFoiIHN0cm9rZT0iIzk5OSIgc3Ryb2tlLXdpZHRoPSIyIi8+Cjwvc3ZnPg=='">
                    <div class="product-info">
                        <h3 class="product-name">${produto.nome}</h3>
                        <p class="product-category">${produto.categoria} • ${generoTexto} • ${produto.tamanho}</p>
                        <p class="product-price">R$ ${produto.preco.toFixed(2)}</p>
                        <div class="product-actions">
                            <button class="add-to-cart" onclick="addToCart(${produto.id})">Adicionar</button>
                            <button class="view-details" onclick="viewDetails(${produto.id})">Detalhes</button>
                        </div>
                    </div>
                `;
                productsGrid.appendChild(productCard);
            });
        }
        function addToCart(productId) {
            alert(`Produto ${productId} adicionado ao carrinho!`);
        }
        function viewDetails(productId) {
            alert(`Visualizando detalhes do produto ${productId}`);
        }
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const filteredProducts = filterProducts();
            renderProducts(filteredProducts);
        });
        [categoryFilter, genderFilter, sizeFilter, priceFilter, sortOptions].forEach(element => {
            element.addEventListener('change', function() {
                const filteredProducts = filterProducts();
                renderProducts(filteredProducts);
            });
        });
        renderProducts(produtos);
    </script>
</body>
</html>
