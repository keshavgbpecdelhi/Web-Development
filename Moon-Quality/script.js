document.addEventListener("DOMContentLoaded", () => {
    const selectElement = document.getElementById("options");
    const images = document.querySelectorAll(".img-container img");

    // Function to hide all images
    function hideAllImages() {
        images.forEach(img => {
            img.style.display = "none";
        });
    }

    // Event listener for the select element
    selectElement.addEventListener("change", (event) => {
        hideAllImages();
        const selectedValue = event.target.value;
        const selectedImage = document.getElementById(`img-${selectedValue}`);
        if (selectedImage) {
            selectedImage.style.display = "block";
        }
    });
});
