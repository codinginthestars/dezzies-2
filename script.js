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
galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
        const imgSrc = item.querySelector('img').src;
        lightboxImage.src = imgSrc;
        lightboxModal.style.display = 'block';
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


const contactForm = document.getElementById('contact-form');