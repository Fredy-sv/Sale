// Datos de productos (simulación)
const products = [
    {
        id: 1,
        name: "Astronauta",
        description: "Hermosa lampara de astronauta.",
        price: 16,
        offerPrice: 10,
        specifications: {
            tamaño: "20x30 cm",
            color: "Blanco",
            peso: "500g"
        },
        images: [
            "img/astro.jpg",
            "img/astro1.webp",
            "img/astro2.avif"
        ]
    },
    {
        id: 2,
        name: "Peluche Capibara",
        description: "Este es un hermoso peluche de capibara.",
        price: 10,
        offerPrice: 8,
        specifications: {
            tamaño: "25x35 cm",
            color: "Azul",
            peso: "750g"
        },
        images: [
            "img/capi1.jpg",
            "img/capi2.avif",
            "img/capi.jpg"
        ]
    },
    {
        id: 3,
        name: "Cojín de Minecraft",
        description: "Cojín suave y cómodo para tu hogar.",
        price: 12,
        offerPrice: null, // Sin oferta
        specifications: {
            tamaño: "40x40 cm",
            color: "Verde",
            peso: "400g"
        },
        images: [
            "img/cojin.jpg",
            "img/cojin1.jpg",
            "img/cojin2.webp"
        ]
    },
    {
        id: 4,
        name: "Bocina de 8 pulgadas",
        description: "Gran bocina con microfono",
        price: 28,
        offerPrice: 15, 
        specifications: {
            tamaño: "8 pulgadas",
            color: "Negro",
            peso: "200g",
            accesorio: "Microfono",
            modos: "Bluetooth, radio fm, usb,sd",

        },
        images: [
            "img/bocina1.jpg",
            "img/bocina.webp",
            "img/bocina2.jpg"
        ]
    },
    {
        id: 5,
        name: "Lampara Goku Led",
        description: "Hermosa lampara led neon",
        price: 8,
        offerPrice: null, // Sin oferta
        specifications: {
            alto: "15 cm",
            ancho: "8 cm",
            color: "Blanco, azul, rojo, verde, amarillo",
            peso: "80g",
            accesorio: "Base de madera",
            modos: "Cable usb",

        },
        images: [
            "img/goku.jpg",
            "img/goku1.avif",
            "img/naruto.avif"
        ]
    },
    
];

// Función para generar las tarjetas de los productos
function generateProductCards() {
    const productList = document.getElementById('product-list');
    products.forEach(product => {
        const productCard = `
            <div class="col-md-3 mb-4">
                <div class="card ${product.offerPrice ? 'offer' : ''}" style="cursor: pointer;" onclick="showProductDetails(${product.id})">
                    ${product.offerPrice ? `<div class="offer-badge">OFERTA!</div>` : ''}
                    <img src="${product.images[0]}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.description}</p>
                        <p class="card-text">
                            ${product.offerPrice !== null ? 
                                `<span class="price-offer">$${product.offerPrice}</span> <span class="old-price">$${product.price}</span>` :
                                `<span class="price-no-offer">$${product.price}</span>` 
                            }
                        </p>
                    </div>
                </div>
            </div>
        `;
        productList.innerHTML += productCard;
    });
}

// Mostrar el modal con los detalles del producto
function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);

    // Rellenar los detalles en el modal
    document.getElementById('product-name').innerText = product.name;
    document.getElementById('product-description').innerText = product.description;

    // Mostrar los precios en el modal
    if (product.offerPrice !== null) {
        document.getElementById('old-price').innerHTML = `<span class="price-label">Antes:</span> <span class="price-old">$${product.price}</span>`;
        document.getElementById('new-price').innerHTML = `<span class="price-label">Ahora:</span> <span class="price-new">$${product.offerPrice}</span>`;
    } else {
        document.getElementById('old-price').innerHTML = '';
        document.getElementById('new-price').innerHTML = `<span class="price-label">Ahora:</span> <span class="price-new">$${product.price}</span>`;
    }

    // Mostrar la imagen principal
    document.getElementById('main-image').src = product.images[0];

    // Agregar miniaturas de las imágenes
    const imageGallery = document.getElementById('product-image-gallery');
    imageGallery.innerHTML = '';
    product.images.forEach((img, index) => {
        imageGallery.innerHTML += `
            <img src="${img}" alt="Imagen ${index + 1}" onclick="changeMainImage('${img}')" class="img-thumbnail">
        `;
    });

    // Rellenar las especificaciones
    const specTable = document.getElementById('spec-table');
    specTable.innerHTML = '';
    for (const [key, value] of Object.entries(product.specifications)) {
        specTable.innerHTML += `<tr><td>${key}</td><td>${value}</td></tr>`;
    }

    // Configurar enlace de WhatsApp
    const whatsappLink = document.getElementById('whatsapp-button');
    whatsappLink.href = `https://wa.me/50370212388?text=¡Me%20interesa%20el%20producto%20${product.name}%20por%20${product.offerPrice || product.price}€`;

    // Mostrar el modal
    const modal = new bootstrap.Modal(document.getElementById('productModal'));
    modal.show();
}

// Cambiar la imagen principal en el modal
function changeMainImage(img) {
    document.getElementById('main-image').src = img;
}

// Llamar a la función para generar las tarjetas de productos
window.onload = generateProductCards;
