// Funcion para detectar visibilidad de .cards

document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.cards');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeInUp');
            }
        });
    });

    cards.forEach(card => {
        observer.observe(card);
    });
});