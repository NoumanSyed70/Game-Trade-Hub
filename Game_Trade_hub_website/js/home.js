localStorage.removeItem('featuredItems');
const featuredItems = [

    {
        id: 'pc-1',
        title: "Predator RTX Beast",
        type: "prebuilt-pc",
        specs: "Intel i7-12700K, 32GB RAM, RTX 3080, 1TB SSD",
        price: "PKR 320,000",
        location: "Lahore",
        image: "images/predator.jpeg",
        description: "High-end gaming PC with liquid cooling and RGB lighting."
    },
    
    {
        id: 'pc-2',
        title: "Gaming Pro Xtreme",
        type: "prebuilt-pc", 
        specs: "AMD Ryzen 9 5900X, 16GB RAM, RTX 3070, 500GB SSD + 2TB HDD",
        price: "PKR 250,000",
        location: "Karachi",
        image: "images/gaming pro xtrm.webp",
        description: "Powerful gaming rig with excellent price-to-performance ratio."
    },
    {
    id: 'pc-3',
    title: "Shadow Stealth Rig",
    type: "prebuilt-pc",
    specs: "AMD Ryzen 9 5900X, 32GB DDR4, RTX 4070 Ti, 2TB NVMe SSD",
    price: "PKR 385,000",
    location: "Karachi",
    image: "images/stealth.jpg",
    description: "Powerful workstation for high-end gaming and content creation."
    },
    {
    id: 'gpu-1',
    title: "MSI GeForce RTX 3060 Ventus 2X",
    type: "graphic-card",
    specs: "12GB GDDR6, 192-bit, PCIe 4.0",
    price: "PKR 120,000",
    location: "Faisalabad",
    image: "images/rtx.png",
    description: "Efficient and cool GPU for 1080p and 1440p high-refresh gaming."
    },
    {
    id: 'gpu-2',
    title: "ASUS ROG Strix RTX 3080",
    type: "graphic-card",
    specs: "10GB GDDR6X, Triple-Fan Cooling, RGB, Overclocked Edition",
    price: "PKR 195,000",
    location: "Peshawar",
    image: "images/3080.jpg",
    description: "High-end GPU built for 4K gaming and demanding workloads."
    },
    {
        id: 'browse-all',
        title: "Browse All Listings",
        type: "browse",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&h=500",
        description: "View all available gaming products in our marketplace."
    }
];
function renderFeaturedItems() {
    const container = document.getElementById('featuredContainer');
    
    featuredItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'featured-card';
        
        if (item.type === 'prebuilt-pc') {
            card.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <h4>${item.title}</h4>
                <p class="specs">${item.specs}</p>
                <p class="price">${item.price} | ${item.location}</p>
            `;
            card.addEventListener('click', () => {
                sessionStorage.setItem('selectedPC', JSON.stringify(item));
                window.location.href = `pc-details.html?id=${item.id}`;
            });
        }
        else if (item.type === 'graphic-card') { 
            card.innerHTML = `
        <img src="${item.image}" alt="${item.title}">
        <h4>${item.title}</h4>
        <p class="specs">${item.specs}</p>
        <p class="price">${item.price} | ${item.location}</p>
    `;
    card.addEventListener('click', () => {
        alert('This product is sold out');
    });
        }
        else { // Browse card
            card.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <h4>${item.title}</h4>
                <p>View all available products</p>
            `;
            card.addEventListener('click', () => {
                window.location.href = 'browse.html';
            });
        }
        
        card.style.cursor = 'pointer';
        container.appendChild(card);
    });
}

window.addEventListener('DOMContentLoaded', () => {
    if (sessionStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'index.html';
    }
    renderFeaturedItems();
});
localStorage.setItem('featuredItems', JSON.stringify(featuredItems));