// Sample data for listings with corrected image paths
localStorage.removeItem('listings');
const sampleListings = [
    {
        id: 1,
        title: "Call of Duty: Modern Warfare II",
        type: "game",
        platform: "ps5",
        price: 5000,
        description: "Brand new, sealed copy of Call of Duty: Modern Warfare II for PS5.",
        image: "images/codmw2.jpg",
        postedBy: "admin"
    },
    {
        id: 2,
        title: "Xbox Series X",
        type: "console",
        platform: "xbox",
        price: 120000,
        description: "Like new Xbox Series X with 2 controllers and all original packaging.",
        image: "images/xbo.webp",
        postedBy: "admin"
    },
    {
        id: 3,
        title: "Razer BlackWidow Keyboard",
        type: "accessory",
        platform: "pc",
        price: 15000,
        description: "Mechanical gaming keyboard with RGB lighting.",
        image: "images/razer.png",
        postedBy: "admin"
    }
];

// Initialize localStorage with sample data if empty
if (!localStorage.getItem('listings')) {
    localStorage.setItem('listings', JSON.stringify(sampleListings));
}
// Function to render listings with improved image handling
function renderListings(listings) {
    const container = document.getElementById('listingsContainer');
    container.innerHTML = '';
    
    console.log("listing length",listings.length)
    if (!listings || listings.length === 0) {
        container.innerHTML = '<p class="no-results">No listings found.</p>';
        return;
    }
    
    // Create document fragment for better performance
    const fragment = document.createDocumentFragment();
    
    listings.forEach((listing) => {
        const listingCard = document.createElement('div');
        listingCard.className = 'listing-card';
        
        // Create image element with proper error handling
        const img = new Image();
        img.alt = listing.title;
        img.className = 'listing-img';
        
        // Set up loading and error handlers
        img.onload = function() {
            this.style.opacity = 1; // Fade in when loaded
        };
        
        img.onerror = function() {
            console.warn(`Failed to load: ${this.src}`);
            this.src = 'images/default.jpg';
            this.onerror = null; // Prevent infinite loop
        };
        
        // Set the source (convert to absolute path if needed)
        // img.src = listing.image.startsWith('http') ? 
        //          listing.image : 
        //          `${window.location.origin}/${listing.image.replace(/^\//, '')}`;
        img.src = listing.image;
        // Create info div
        const infoDiv = document.createElement('div');
        infoDiv.className = 'listing-info';
        infoDiv.innerHTML = `
            <h3>${listing.title}</h3>
            <p class="platform">${formatPlatform(listing.platform)}</p>
            <p class="price">PKR ${listing.price.toLocaleString()}</p>
            <button class="btn view-btn" data-id="${listing.id}">View Details</button>
        `;
        
        listingCard.appendChild(img);
        listingCard.appendChild(infoDiv);
        fragment.appendChild(listingCard);
    });
    
    container.appendChild(fragment);
    
    // Add event listeners to view buttons
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            window.location.href = `product.html?id=${id}`;
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

// Filter and search functionality
function filterListings() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const platformFilter = document.getElementById('platformFilter').value;
    const typeFilter = document.getElementById('typeFilter').value;
    
    const listings = JSON.parse(localStorage.getItem('listings')) || [];
    
    const filtered = listings.filter(listing => {
        const matchesSearch = listing.title.toLowerCase().includes(searchTerm) || 
                             listing.description.toLowerCase().includes(searchTerm);
        const matchesPlatform = platformFilter === 'all' || listing.platform === platformFilter;
        const matchesType = typeFilter === 'all' || listing.type === typeFilter;
        
        return matchesSearch && matchesPlatform && matchesType;
    });
    
    renderListings(filtered);
}

// Event listeners for filters and search
document.getElementById('searchInput').addEventListener('input', filterListings);
document.getElementById('platformFilter').addEventListener('change', filterListings);
document.getElementById('typeFilter').addEventListener('change', filterListings);
document.getElementById('searchBtn').addEventListener('click', filterListings);

// Initial render
window.addEventListener('DOMContentLoaded', () => {
    if (sessionStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'index.html';
        return;
    }
    
    const listings = JSON.parse(localStorage.getItem('listings'));
    renderListings(listings);
});