// Function to load PC details from various sources
const params = new URLSearchParams(window.location.search);
const pcId = params.get('id');

// Get the featuredItems array from localStorage
const featuredItems = JSON.parse(localStorage.getItem('featuredItems')) || [];

// Find the correct PC by ID
const selectedPC = featuredItems.find(item => item.id === pcId);

// Render the details for selectedPC
if (selectedPC) {
    // ...render logic for selectedPC...
} else {
    // ...show error or redirect...
}
function loadPCDetails() {
    const container = document.getElementById('pcDetailsContainer');
    const notFound = document.getElementById('pcNotFound');
    
    // Try to get PC data from different sources
    let pcData = null;
    
    // 1. Check URL parameters first
    const urlParams = new URLSearchParams(window.location.search);
    const pcId = urlParams.get('id');
    
    // 2. If URL has ID, try to find in featuredItems (from home.js)
    if (pcId && typeof featuredItems !== 'undefined') {
        pcData = featuredItems.find(item => item.id === pcId);
    }
    
    // 3. If not found, try sessionStorage (from prebuilt-pcs.js)
    if (!pcData) {
        pcData = JSON.parse(sessionStorage.getItem('currentPC')) || 
                 JSON.parse(sessionStorage.getItem('selectedPC'));
    }
    
    // If no PC data found, show error
    if (!pcData) {
        container.classList.add('hidden');
        notFound.classList.remove('hidden');
        return;
    }
    
    // Normalize the data structure since it might come from different sources
    const pc = {
        id: pcData.id || '',
        name: pcData.name || pcData.title || 'Unnamed PC',
        image: pcData.image || 'images/default-pc.jpg',
        specs: pcData.specs || 'Not specified',
        price: pcData.price || 'Price not available',
        location: pcData.location || 'Location not specified',
        description: pcData.description || 'No description available.'
    };
    
    // Show the container and hide not-found message
    container.classList.remove('hidden');
    notFound.classList.add('hidden');
    
    // Render PC details
    container.innerHTML = `
        <div class="pc-image">
            <img src="${pc.image}" alt="${pc.name}">
        </div>
        <div class="pc-info">
            <h2>${pc.name}</h2>
            <p class="specs"><strong>Specifications:</strong> ${pc.specs}</p>
            <p class="price"><strong>Price:</strong> ${pc.price}</p>
            <p class="location"><strong>Location:</strong> ${pc.location}</p>
            <div class="description">
                <h3>Description</h3>
                <p>${pc.description}</p>
            </div>
            <button class="btn contact-btn">Contact Seller</button>
            <a href="prebuilt-pcs.html" class="btn back-btn">Back to All PCs</a>
        </div>
    `;
    
    // Add event listener to contact button
    document.querySelector('.contact-btn')?.addEventListener('click', function() {
        alert('Contact feature is not available in this demo.');
    });
}

// Check login status and load PC details
window.addEventListener('DOMContentLoaded', () => {
    if (sessionStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'index.html';
        return;
    }
    
    loadPCDetails();
});