document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Navigation fluide (Smooth Scroll)
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // 2. Effet Parallaxe sur le personnage Miles
    const heroImage = document.querySelector('.hero-character');
    
    if (heroImage) {
        window.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            // On déplace l'image légèrement selon la souris
            const moveX = (mouseX - 0.5) * 30;
            const moveY = (mouseY - 0.5) * 20;
            
            heroImage.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    }

    // 3. Animation d'apparition au scroll (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target); // On n'anime qu'une seule fois
            }
        });
    }, observerOptions);

    // Ciblage des éléments à animer
    const itemsToReveal = document.querySelectorAll('article, .post-card, .img-wrapper');
    
    itemsToReveal.forEach(item => {
        item.style.opacity = "0";
        item.style.transform = "translateY(30px)";
        item.style.transition = "all 0.8s ease-out";
        revealObserver.observe(item);
    });

    // Classe active pour l'animation
    document.addEventListener('scroll', () => {
        itemsToReveal.forEach(item => {
            if (item.classList.contains('active')) {
                item.style.opacity = "1";
                item.style.transform = "translateY(0)";
            }
        });
    });
});