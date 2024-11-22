const buttons = document.querySelectorAll('.filter-buttons button');
const galleryItems = document.querySelectorAll('.gallery-item');

// Add event listeners to all filter buttons
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        buttons.forEach((btn) => btn.classList.remove('active'));

        // Add active class to the clicked button
        button.classList.add('active');

        // Get the category to filter
        const filter = button.getAttribute('data-filter');

        // Show/hide gallery items based on the filter
        galleryItems.forEach((item) => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Lightbox/Modal Logic
const lightboxModal = document.getElementById('lightbox-modal');
const lightboxImage = document.getElementById('lightbox-image');
const closeLightbox = document.querySelector('.close-modal');

// Open modal on gallery image click
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        const imgSrc = item.querySelector('img').src;
        lightboxImage.src = imgSrc;
        lightboxModal.style.display = 'block';
        currentImageIndex = index;
        showLightboxImage();
    });
});

// Close modal when close button is clicked
closeLightbox.addEventListener('click', () => {
    lightboxModal.style.display = 'none';
});

// Close modal when clicking outside the image
lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal) {
        lightboxModal.style.display = 'none';
    }
});

// Handle form submission with fetch
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value,
    };

    try {
        const response = await fetch('http://localhost:3000/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        const result = await response.json();
        alert(result.message);
        contactForm.reset();
    } catch (error) {
        console.error('Error: ', error);
        alert('There was an error submitting the form. Please try again later.');
    }
});

// Lightbox navigation
let currentImageIndex = 0;
const galleryImagesArray = Array.from(galleryItems).map((item) => item.querySelector('img').src);
const prevArrow = document.querySelector('.prev-arrow');
const nextArrow = document.querySelector('.next-arrow');

// Show current image in the modal
function showLightboxImage() {
    lightboxImage.src = galleryImagesArray[currentImageIndex];
    lightboxModal.style.display = 'block';
};

// Navigate to previous image
prevArrow.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + galleryImagesArray.length) % galleryImagesArray.length;
    showLightboxImage();
});

// Navigate to next image
nextArrow.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % galleryImagesArray.length;
    showLightboxImage();
});