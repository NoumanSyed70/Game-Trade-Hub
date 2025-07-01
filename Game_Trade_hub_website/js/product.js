// Function to render product details
function renderProductDetails() {
    const container = document.getElementById('productContainer');
    const notFound = document.getElementById('productNotFound');
    
    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    
    if (!productId) {
        container.classList.add('hidden');
        notFound.classList.remove('hidden');
        return;
    }
    
    // Get product from localStorage
    const listings = JSON.parse(localStorage.getItem('listings')) || [];
    const product = listings.find(item => item.id === productId);
    
    if (!product) {
        container.classList.add('hidden');
        notFound.classList.remove('hidden');
        return;
    }
    
    container.classList.remove('hidden');
    notFound.classList.add('hidden');
    
    // Format platform
    const platforms = {
        pc: "PC",
        ps5: "PS5",
        xbox: "Xbox",
        nintendo: "Nintendo"
    };
    const platform = platforms[product.platform] || product.platform;
    
    // Render product details
    container.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.title}">
        </div>
        <div class="product-info">
            <h2>${product.title}</h2>
            <p class="platform"><strong>Platform:</strong> ${platform}</p>
            <p class="price"><strong>Price:</strong> PKR ${product.price.toLocaleString()}</p>
            <div class="description">
                <h3>Description</h3>
                <p>${product.description}</p>
            </div>
            <p class="seller"><strong>Posted by:</strong> Admin</p>
            <button class="btn contact-btn">Contact Seller</button>
        </div>
    `;
    
    // Add event listener to contact button
    document.querySelector('.contact-btn').addEventListener('click', function() {
        alert('Contact feature is not available in this demo.');
    });
}

// Check login status and render product
window.addEventListener('DOMContentLoaded', () => {
    if (sessionStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'index.html';
    }
    
    renderProductDetails();
});