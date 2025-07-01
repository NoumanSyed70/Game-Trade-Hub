// Sample PC data
const prebuiltPCs = [
    {
        id: 1,
        name: "Predator RTX Beast",
        specs: "Intel i7-12700K, 32GB RAM, RTX 3080, 1TB SSD",
        price: "PKR 320,000",
        location: "Lahore",
        image: "images/predator.jpeg",
        description: "High-end gaming PC with liquid cooling and RGB lighting. Perfect for 4K gaming and content creation."
    },
    {
        id: 2,
        name: "Gaming Pro Xtreme",
        specs: "AMD Ryzen 9 5900X, 16GB RAM, RTX 3070, 500GB SSD + 2TB HDD",
        price: "PKR 250,000",
        location: "Karachi",
        image: "images/gaming pro xtrm.webp",
        description: "Powerful gaming rig with excellent price-to-performance ratio. Comes with 3 months warranty."
    },
    {
        id: 3,
        name: "Compact Gaming Rig",
        specs: "Intel i5-12400F, 16GB RAM, RTX 3060 Ti, 1TB SSD",
        price: "PKR 180,000",
        location: "Islamabad",
        image: "images/compact.jpeg",
        description: "Compact yet powerful gaming PC with excellent thermals. Ideal for 1440p gaming."
    },
    {
    id: 3,
    title: "Shadow Stealth Rig",
    specs: "AMD Ryzen 9 5900X, 32GB DDR4, RTX 4070 Ti, 2TB NVMe SSD",
    price: "PKR 385,000",
    location: "Karachi",
    image: "images/stealth.jpg",
    description: "Powerful workstation for high-end gaming and content creation."
    },
];

// Function to render PCs
function renderPCs() {
    const container = document.getElementById('pcsContainer');
    const noPCsMsg = document.getElementById('noPCsMessage');
    
    if (prebuiltPCs.length === 0) {
        container.classList.add('hidden');
        noPCsMsg.classList.remove('hidden');
        return;
    }
    
    container.classList.remove('hidden');
    noPCsMsg.classList.add('hidden');
    container.innerHTML = '';
    
    prebuiltPCs.forEach(pc => {
        const pcCard = document.createElement('div');
        pcCard.className = 'pc-card';
        pcCard.innerHTML = `
            <img src="${pc.image}" alt="${pc.name}">
            <div class="pc-info">
                <h3>${pc.name}</h3>
                <p class="specs">${pc.specs}</p>
                <p class="price">${pc.price}</p>
                <p class="location">${pc.location}</p>
                <button class="btn view-btn" data-id="${pc.id}">View Details</button>
            </div>
        `;
        container.appendChild(pcCard);
    });
    
    // Add event listeners to view buttons
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            viewPCDetails(id);
        });
    });
}

// Function to view PC details
function viewPCDetails(id) {
    const pc = prebuiltPCs.find(p => p.id === parseInt(id));
    if (pc) {
        // Store PC details in sessionStorage to pass to details page
        sessionStorage.setItem('currentPC', JSON.stringify(pc));
        // Redirect to PC details page
        window.location.href = 'pc-details.html';
    }
}

// Check login status and render PCs
window.addEventListener('DOMContentLoaded', () => {
    if (sessionStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'index.html';
    }
    
    renderPCs();
});