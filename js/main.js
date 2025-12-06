document.addEventListener('DOMContentLoaded', () => {
    const filterInput = document.getElementById('filterInput');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterInput.addEventListener('keyup', () => {
        const filterText = filterInput.value.toLowerCase();

        galleryItems.forEach(item => {
            const title = item.getAttribute('data-title').toLowerCase();
            if (title.includes(filterText)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});
