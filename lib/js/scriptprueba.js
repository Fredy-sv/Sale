const products = [
    { id: 1, name: "Astronauta", description: "Hermosa lámpara.", price: 16, offerPrice: 10, specifications: { tamaño: "20x30 cm", color: "Blanco", peso: "500g" }, images: ["img/astro.jpg"] },
    { id: 2, name: "Peluche Capibara", description: "Hermoso peluche.", price: 10, offerPrice: 8, specifications: { tamaño: "25x35 cm", color: "Azul", peso: "750g" }, images: ["img/capi1.jpg"] },
    { id: 3, name: "Cojín Minecraft", description: "Cojín cómodo.", price: 12, offerPrice: null, specifications: { tamaño: "40x40 cm", color: "Verde", peso: "400g" }, images: ["img/cojin.jpg"] }
];

function generateProductCards() {
    const productList = document.getElementById('product-list');
    products.forEach(product => {
        const card = `
        <div class="col-md-4 col-sm-6">
            <div class="card ${product.offerPrice ? 'offer' : ''}" onclick="showProductDetails(${product.id})">
                ${product.offerPrice ? '<div class="offer-badge">OFERTA!</div>' : ''}
                <img src="${product.images[0]}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <p>${product.offerPrice ? `<span class="price-offer">$${product.offerPrice}</span> <span class="old-price">$${product.price}</span>` : `<span class="price-no-offer">$${product.price}</span>`}</p>
                </div>
            </div>
        </div>`;
        productList.innerHTML += card;
    });
}

function showProductDetails(id) {
    const product = products.find(p => p.id === id);
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('product-description').textContent = product.description;
    document.getElementById('main-image').src = product.images[0];
    document.getElementById('whatsapp-button').href = `https://wa.me/?text=Interesado%20en%20${product.name}`;
    const specs = Object.entries(product.specifications).map(([key, val]) => `<tr><td>${key}</td><td>${val}</td></tr>`).join('');
    document.getElementById('spec-table').innerHTML = specs;
    const modal = new bootstrap.Modal(document.getElementById('productModal'));
    modal.show();
}

window.onload = generateProductCards;
