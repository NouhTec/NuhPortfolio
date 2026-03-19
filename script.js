// تأثير ظهور العناصر عند التمرير (Reveal Effect)
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

window.addEventListener("scroll", reveal);

// لتفعيل التأثير فور تحميل الصفحة وتحريك العناصر في الخلفية
document.addEventListener('DOMContentLoaded', () => {
    reveal();
    
    // تحريك الأشكال بالخلفية مع حركة الماوس بشكل خفيف ليعطي إحساساً بالعمق
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        const blob1 = document.querySelector('.blob-1');
        const blob2 = document.querySelector('.blob-2');
        
        if(blob1 && blob2) {
            blob1.style.transform = `translate(${x * 50}px, ${y * 50}px)`;
            blob2.style.transform = `translate(${x * -50}px, ${y * -50}px)`;
        }
    });
});

// التنقل السلس عند الضغط على أزرار القائمة
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
