// Reveal on Scroll
const reveals = document.querySelectorAll(".reveal");
window.addEventListener("scroll", () => {
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 100;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
});

// Active Navigation
const sections = document.querySelectorAll("section, header");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        if (scrollY >= sectionTop) current = section.getAttribute("id");
    });
    navLinks.forEach(a => {
        a.classList.remove("active");
        if(a.getAttribute("href") === "#" + current) a.classList.add("active");
    });
});

// Cursor Glow
const glow = document.querySelector(".cursor-glow");
document.addEventListener("mousemove",(e)=>{
    glow.style.left = e.clientX+"px";
    glow.style.top = e.clientY+"px";
});

// Project Hover Slider
document.querySelectorAll(".project-slider").forEach(img=>{
    const images = img.dataset.images.split(",");
    let i = 0;
    let interval;
    img.parentElement.addEventListener("mouseenter",()=>{
        interval = setInterval(()=>{
            i = (i+1)%images.length;
            img.src = images[i];
        },700);
    });
    img.parentElement.addEventListener("mouseleave",()=>{
        clearInterval(interval);
        img.src = images[0];
    });
});
