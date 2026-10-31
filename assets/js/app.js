// لودینگ اول صفحه
const preloader = document.querySelector("[data-preaload]");
window.addEventListener("load", function () {
    preloader.classList.add("loaded");
    document.body.classList.add("loaded");
});

// تغیر رنگ بک گراند هدر با کمی اسکرول عمودی
window.addEventListener('scroll', function () {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

// اسکرول خودکار و انیمیشن اسلایدر
document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector(".carousel");

    if (!carousel) return;

    const slides = Array.from(carousel.querySelectorAll(".slide"));
    const prevButton = document.querySelector(".slider-arrow.prev");
    const nextButton = document.querySelector(".slider-arrow.next");
    const dotsContainer = carousel.querySelector(".slider-dots");

    if (slides.length === 0) return;

    let currentIndex = 0;
    let autoplay = null;
    let animationFrame = null;

    // تنظیمات زمان‌بندی
    const autoplayDelay = 8000; // تعویض خودکار هر ۸ ثانیه
    const transitionDuration = 2000; // حرکت بین اسلایدها: ۲ ثانیه

    // ساخت نقطه‌های پایین اسلایدر
    if (dotsContainer) {
        dotsContainer.innerHTML = "";

        slides.forEach((slide, index) => {
            const dot = document.createElement("button");

            dot.type = "button";
            dot.className = "slider-dot";
            dot.setAttribute(
                "aria-label",
                `رفتن به اسلاید ${index + 1}`
            );

            dot.addEventListener("click", () => {
                showSlide(index);
                restartAutoplay();
            });

            dotsContainer.appendChild(dot);
        });
    }

    const dots = dotsContainer
        ? Array.from(dotsContainer.querySelectorAll(".slider-dot"))
        : [];

    // حرکت نرم با مدت‌زمان قابل تنظیم
    function animateScrollTo(targetLeft) {
    if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame);
    }

    const startLeft = carousel.scrollLeft;
    const distance = targetLeft - startLeft;
    const startTime = performance.now();

    function step(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / transitionDuration, 1);

        // حرکت نرم و پیوسته
        const easedProgress =
            0.5 - Math.cos(Math.PI * progress) / 2;

        carousel.scrollLeft =
            startLeft + distance * easedProgress;

        if (progress < 1) {
            animationFrame = requestAnimationFrame(step);
        } else {
            carousel.scrollLeft = targetLeft;
            animationFrame = null;
        }
    }

    animationFrame = requestAnimationFrame(step);
}

    // نمایش اسلاید انتخاب‌شده
    function showSlide(index) {
        currentIndex = (index + slides.length) % slides.length;

        slides.forEach((slide, i) => {
            slide.classList.toggle("active", i === currentIndex);
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === currentIndex);
            dot.setAttribute(
                "aria-current",
                i === currentIndex ? "true" : "false"
            );
        });

        const targetLeft = slides[currentIndex].offsetLeft;

        animateScrollTo(targetLeft);
    }

    // شروع تعویض خودکار
    function startAutoplay() {
        clearInterval(autoplay);

        if (document.hidden) return;

        autoplay = setInterval(() => {
            showSlide(currentIndex + 1);
        }, autoplayDelay);
    }

    function restartAutoplay() {
        startAutoplay();
    }

    // فلش اسلاید قبلی
    if (prevButton) {
        prevButton.addEventListener("click", () => {
            showSlide(currentIndex - 1);
            restartAutoplay();
        });
    }

    // فلش اسلاید بعدی
    if (nextButton) {
        nextButton.addEventListener("click", () => {
            showSlide(currentIndex + 1);
            restartAutoplay();
        });
    }

    // اجرای اسلاید اول
    showSlide(0);
    startAutoplay();

    // توقف تایمر هنگام مخفی بودن تب مرورگر
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            clearInterval(autoplay);
        } else {
            startAutoplay();
        }
    });
});

// ظاهر شدن دکمه سفارش میز با اسکرول
const show_book_table_btn = document.querySelector('.book-table');
window.addEventListener("scroll", function () {
    if(window.scrollY >= window.innerHeight){
        show_book_table_btn.classList.add("show-btn")
    }else{
        show_book_table_btn.classList.remove("show-btn");
    }
})