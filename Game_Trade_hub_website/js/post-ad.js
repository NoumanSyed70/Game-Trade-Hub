const postAdForm = document.getElementById("postAdForm");
const imageUpload = document.getElementById("imageUpload");
const successMessage = document.getElementById("successMessage");

postAdForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const type = document.getElementById("type").value;
    const platform = document.getElementById("platform").value;
    const price = document.getElementById("price").value.trim();
    const description = document.getElementById("description").value.trim();
    const imageFiles = imageUpload.files;
    if (!title || !type || !platform || !price || !description || imageFiles.length === 0) {
        alert("Please fill in all fields and upload at least one image.");
        return;
    }

    if (isNaN(price) || parseFloat(price) <= 0) {
        alert("Please enter a valid price.");
        return;
    }

    const imagesBase64 = [];
    const readers = [];

    for (let i = 0; i < imageFiles.length; i++) {
        const reader = new FileReader();
        readers.push(new Promise((resolve) => {
            reader.onload = function (e) {
                imagesBase64.push(e.target.result);
                resolve();
            };
            reader.readAsDataURL(imageFiles[i]);
        }));
    }
    Promise.all(readers).then(() => {
        const newAd = {
            title,
            type,
            platform,
            price,
            description,
            images: imagesBase64,
            postedBy: "admin"
        };

        const ads = JSON.parse(localStorage.getItem("ads")) || [];
        ads.push(newAd);
        localStorage.setItem("ads", JSON.stringify(ads));

        postAdForm.reset(); 
        successMessage.classList.remove("hidden");
        postAdForm.classList.add("hidden");
    });
});
