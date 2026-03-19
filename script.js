// Sayfa yüklendiğinde çalışacak fonksiyonlar
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Yumuşak Kaydırma (Smooth Scroll) alternatifi (Eğer CSS çalışmazsa)
    const links = document.querySelectorAll('.nav-links a, .hero-btns a');
    
    for (const link of links) {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Eğer link sayfa içi bir anchor ise
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70, // Navigasyon bar yüksekliği kadar ofset
                        behavior: 'smooth'
                    });
                }
            }
        });
    }

    // 2. Kaydırma Sırasında Kaybolan/Beliren Navigasyon Bar (Opsiyonel Geliştirme)
    let lastScrollTop = 0;
    const navbar = document.querySelector('nav');

    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop) {
            // Aşağı kaydırırken navbar'ı gizle
            navbar.style.top = '-80px';
        } else {
            // Yukarı kaydırırken navbar'ı göster
            navbar.style.top = '0';
        }
        lastScrollTop = scrollTop;
    });

    // 3. Elemanların Kaydırırken Belirmesi Efekti (Intersection Observer)
    const observerOptions = {
        threshold: 0.15, // Elemanın %15'i göründüğünde tetikle
        rootMargin: "0px 0px -50px 0px" // Biraz erken başla
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                // Performans için gözlemlemeyi bırak
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Gözlemlenecek elemanları seç ve başlangıç stillerini uygula
    const hiddenElements = document.querySelectorAll('.skill-card, .project-card, .section-title');
    
    // CSS'de tanımlanacak sınıfı JS ile ekliyoruz
    hiddenElements.forEach(el => {
        el.classList.add('hidden-el');
        observer.observe(el);
    });
});

// Kaydırma efekti için gerekli CSS sınıflarını JS ile ekleyelim (style.css'e eklememek için)
const style = document.createElement('style');
style.textContent = `
    .hidden-el {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease-out;
    }
    .show {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);
