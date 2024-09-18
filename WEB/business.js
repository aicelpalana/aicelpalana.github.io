document.addEventListener('DOMContentLoaded', () => {
    const services = document.querySelectorAll('.service-item');

    services.forEach(service => {
        service.style.opacity = 0;
        service.style.transform = 'translateY(20%)';

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.transition = 'all 1s ease';
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        });

        observer.observe(service);
    });
});