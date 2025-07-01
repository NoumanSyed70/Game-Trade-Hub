// Function to render user's listings
// Function to render user's listings
function renderMyListings() {
    const container = document.getElementById('myListingsContainer');
    const noListingsMsg = document.getElementById('noListingsMessage');
    
    // Get current user (adjust as needed)
    const user = sessionStorage.getItem('user') || 'admin';
    // Get only this user's listings
    const myListings = JSON.parse(localStorage.getItem(`myListings_${user}`)) || [];
    
    if (myListings.length === 0) {
        container.classList.add('hidden');
        noListingsMsg.classList.remove('hidden');
        return;
    }
    
    container.classList.remove('hidden');
    noListingsMsg.classList.add('hidden');
    container.innerHTML = '';
    
    myListings.forEach(listing => {
        const listingCard = document.createElement('div');
        listingCard.className = 'listing-card';
        listingCard.innerHTML = `
            <img src="${listing.images && listing.images.length ? listing.images[0] : 'images/default.jpg'}" alt="${listing.title}">
            <div class="listing-info">
                <h3>${listing.title}</h3>
                <p class="platform">${formatPlatform(listing.platform)}</p>
                <p class="price">PKR ${listing.price.toLocaleString()}</p>
                <div class="action-buttons">
                    <button class="btn view-btn" data-id="${listing.id}">View</button>
                    <button class="btn delete-btn" data-id="${listing.id}">Delete</button>
                </div>
            </div>
        `;
        container.appendChild(listingCard);
    });

    // Add event listeners to view buttons
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            window.location.href = `product.html?id=${id}`;
        });
    });

    // Add event listeners to delete buttons
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            if (confirm('Are you sure you want to delete this listing?')) {
                deleteListing(id);
            }
        });
    });
}

// Helper function to format platform
function formatPlatform(platform) {
    const platforms = {
        pc: "PC",
        ps5: "PS5",
        xbox: "Xbox",
        nintendo: "Nintendo"
    };
    return platforms[platform] || platform;
}

// Function to delete a listing
function deleteListing(id) {
    const user = sessionStorage.getItem('user') || 'admin';
    let myListings = JSON.parse(localStorage.getItem(`myListings_${user}`)) || [];
    myListings = myListings.filter(listing => listing.id != id);
    localStorage.setItem(`myListings_${user}`, JSON.stringify(myListings));
    renderMyListings();
}
// Check login status and render listings
window.addEventListener('DOMContentLoaded', () => {
    if (sessionStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'index.html';
    }
    
    renderMyListings();
});