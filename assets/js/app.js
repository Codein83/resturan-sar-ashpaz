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
// اسلایدر با افکت محو شدن و ظاهر شدن (Crossfade)
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

    // تنظیمات زمان‌بندی
    const autoplayDelay = 6500;

    // ساخت نقطه‌های پایین اسلایدر، در صورت وجود
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

    // نمایش اسلاید اول
    showSlide(0);
    startAutoplay();

    // توقف تعویض خودکار هنگام مخفی بودن تب
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