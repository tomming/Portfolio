document.addEventListener('DOMContentLoaded', () => {
    console.log('Script loaded and DOM ready.');
    
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const closeBtn = document.querySelector('.lightbox-close');
    const galleryItems = document.querySelectorAll('.item a');

    if (!lightbox || !lightboxImage || !closeBtn) {
        console.error('Lightbox elements not found!');
        return;
    }

    galleryItems.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault(); // prevent default anchor action
            const img = link.querySelector('img');
            if (img) {
                lightbox.style.display = 'flex';
                lightboxImage.src = img.src;
            }
        });
    });

    closeBtn.addEventListener('click', () => {
        console.log('Close button clicked');
        lightbox.style.display = 'none';
        lightboxImage.src = '';
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            console.log('Clicked outside the image, closing lightbox');
            lightbox.style.display = 'none';
            lightboxImage.src = '';
        }
    });
});