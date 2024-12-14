const hamburgerBtn = document.getElementById('hamburger-btn');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

// Alterna a exibição da sidebar e do overlay
hamburgerBtn.addEventListener('click', () => {
  sidebar.classList.toggle('open');
  overlay.style.display = sidebar.classList.contains('open') ? 'block' : 'none';
});

// Esconde a sidebar e o overlay ao clicar no overlay
overlay.addEventListener('click', () => {
  sidebar.classList.remove('open');
  overlay.style.display = 'none';
});

const cartIcon = document.querySelector('.cart-link'); // Ícone do carrinho




// Fecha o carrinho ao clicar no overlay
overlay.addEventListener('click', () => {
  cartSidebar.classList.remove('open');
  overlay.style.display = 'none';
});

const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
let index = 0;

// Função para alternar slides automaticamente
function moveCarousel() {
  const slideWidth = track.offsetWidth; // Calcula a largura do carrossel
  index = (index + 1) % slides.length; // Avança ao próximo slide (volta ao início quando chega ao último)
  const offset = index * -slideWidth; // Calcula o deslocamento com base na largura
  track.style.transform = `translateX(${offset}px)`; // Move o carrossel
}

// Configura o carrossel para alternar slides a cada 3 segundos
setInterval(moveCarousel, 5000);

// Seleciona elementos
const sectionTitle = document.getElementById('section-title');

// Seleciona os elementos
const categoryLinks = document.querySelectorAll('.category-link');
const productCards = document.querySelectorAll('.product-card');

// Função para filtrar os produtos com base na categoria
function filterProducts(category) {
    productCards.forEach((card) => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block'; // Mostra o produto
        } else {
            card.style.display = 'none'; // Oculta o produto
        }
    });
}

// Adiciona evento de clique para os links de categoria
categoryLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); // Impede o redirecionamento
        const category = link.dataset.category; // Obtém a categoria selecionada
        filterProducts(category); // Filtra os produtos
    });
});

// Exibe todos os produtos ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
    filterProducts('all'); // Mostra todos os produtos
});

const cartSidebar = document.getElementById('cart-sidebar');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.getElementById('cart-total');
const buyButtons = document.querySelectorAll('.buy-btn');

let cart = []; // Array para armazenar os itens do carrinho

// Função para adicionar itens ao carrinho
function addToCart(productCard) {
    const productName = productCard.querySelector('h3').textContent;
    const productPrice = parseFloat(
        productCard.querySelector('.price').textContent.replace('R$', '').replace(',', '.')
    );

    // Cria um objeto para o item do carrinho
    const product = {
        name: productName,
        price: productPrice,
    };

    // Adiciona o item ao carrinho
    cart.push(product);

    // Atualiza a interface do carrinho
    updateCartUI();

    // Abre o carrinho automaticamente
    openCart();
}

// Função para atualizar o carrinho na interface
function updateCartUI() {
    // Limpa os itens exibidos no carrinho
    cartItems.innerHTML = '';

    // Adiciona cada item do carrinho à interface
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${item.name}</span>
            <span>R$ ${item.price.toFixed(2).replace('.', ',')}</span>
            <button class="remove-btn" data-index="${index}">X</button>
        `;
        cartItems.appendChild(li);
    });

    // Atualiza o total do carrinho
    const total = cart.reduce((acc, item) => acc + item.price, 0);
    cartTotal.textContent = total.toFixed(2).replace('.', ',');

    // Adiciona evento de remoção para os botões "X"
    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const index = button.dataset.index;
            removeFromCart(index);
        });
    });
}

// Função para abrir o carrinho e exibir o overlay
function openCart() {
    cartSidebar.classList.add('open'); // Abre o carrinho
    overlay.style.display = 'block'; // Exibe o overlay
}

// Função para fechar o carrinho e esconder o overlay
function closeCart() {
    cartSidebar.classList.remove('open'); // Fecha o carrinho
    overlay.style.display = 'none'; // Esconde o overlay
}

// Função para remover itens do carrinho
function removeFromCart(index) {
    cart.splice(index, 1); // Remove o item do array
    updateCartUI(); // Atualiza a interface do carrinho
}

// Adiciona eventos aos botões "Comprar"
buyButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
        const productCard = event.target.closest('.product-card'); // Seleciona o produto correspondente
        addToCart(productCard); // Adiciona ao carrinho
    });
});

// Evento para exibir/ocultar o carrinho manualmente (ícone do carrinho)
document.querySelector('.cart-link').addEventListener('click', (event) => {
    event.preventDefault(); // Impede o redirecionamento
    openCart(); // Abre o carrinho
});

const clearCartButton = document.querySelector('.clear-cart-btn');

// Função para limpar todos os itens do carrinho
function clearCart() {
    cart = []; // Limpa o array do carrinho
    updateCartUI(); // Atualiza a interface do carrinho
}

// Adiciona evento ao botão "Limpar Carrinho"
clearCartButton.addEventListener('click', () => {
    clearCart();
});


// Evento para fechar o carrinho ao clicar no overlay
overlay.addEventListener('click', closeCart);
