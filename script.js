document.addEventListener("DOMContentLoaded", () => {
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Navbar Scroll Effect
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // Mobile Menu Toggle
    const mobileMenu = document.getElementById("mobile-menu");
    const navLinks = document.querySelector(".nav-links");

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener("click", () => {
            mobileMenu.classList.toggle("active");
            navLinks.classList.toggle("active");
        });

        // Close menu when a link is clicked
        const navLinkElements = navLinks.querySelectorAll(".nav-link");
        navLinkElements.forEach(link => {
            link.addEventListener("click", () => {
                mobileMenu.classList.remove("active");
                navLinks.classList.remove("active");
            });
        });
    }

    // Preloader and Hero Animations Timeline
    const tl = gsap.timeline();

    // Showreel Playback Logic
    const watchShowreelBtn = document.getElementById('watch-showreel-btn');
    const heroVideo = document.querySelector('.hero-video');
    const heroOverlay = document.querySelector('.hero-overlay');
    const heroContent = document.querySelector('.hero-content');
    const scrollIndicator = document.querySelector('.showreel-scroll-indicator');

    if (watchShowreelBtn && heroVideo) {
        let isShowreelActive = false;

        watchShowreelBtn.addEventListener('click', (e) => {
            e.preventDefault();
            isShowreelActive = true;

            // Restart video, unmute and enable native controls
            heroVideo.currentTime = 0;
            heroVideo.muted = false;
            heroVideo.controls = true;
            heroVideo.style.display = 'block'; // Force show on mobile
            const mobileBg = document.querySelector('.hero-mobile-bg');
            if (mobileBg) mobileBg.style.display = 'none';
            heroVideo.play();

            // Hide overlay and content for clean viewing
            gsap.to([heroOverlay, heroContent, scrollIndicator], {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    heroOverlay.style.pointerEvents = 'none';
                    heroContent.style.pointerEvents = 'none';
                }
            });

            // Revert back when video ends
            heroVideo.addEventListener('ended', revertHero);
        });

        // Revert on scroll
        window.addEventListener('scroll', () => {
            if (isShowreelActive && window.scrollY > window.innerHeight * 0.2) {
                revertHero();
            }
        });

        function revertHero() {
            if (!isShowreelActive) return;
            isShowreelActive = false;

            // Reset video to background mode
            heroVideo.muted = true;
            heroVideo.controls = false;
            heroVideo.style.display = ''; // Revert to CSS default
            const mobileBg = document.querySelector('.hero-mobile-bg');
            if (mobileBg) mobileBg.style.display = '';
            heroVideo.play();

            // Hide native controls

            // Exit fullscreen if active
            if (document.fullscreenElement) {
                document.exitFullscreen().catch(err => console.log(err));
            }

            // Bring back UI
            gsap.to([heroOverlay, heroContent, scrollIndicator], {
                opacity: 1,
                duration: 0.5,
                onComplete: () => {
                    heroOverlay.style.pointerEvents = 'auto';
                    heroContent.style.pointerEvents = 'auto';
                }
            });
        }
    }

    // Preloader Animation
    tl.fromTo(".preloader-text",
        { opacity: 0, scale: 0.8, letterSpacing: "40px", filter: "blur(10px)" },
        { opacity: 1, scale: 1, letterSpacing: "15px", filter: "blur(0px)", duration: 1.6, ease: "power4.out" }
    )
        .to(".preloader-text",
            { opacity: 0, scale: 1.1, letterSpacing: "25px", filter: "blur(5px)", duration: 0.8, ease: "power3.in", delay: 0.8 }
        )
        .to(".preloader",
            { y: "-100%", duration: 1.2, ease: "power4.inOut" }
        )
        .set(".preloader", { display: "none" });

    // Entrance Animation
    tl.to(".sub-headline", {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        delay: 0.5
    });

    // Simple text reveal by line/word fade for main headline
    tl.fromTo(".main-headline",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power4.out" },
        "-=0.5"
    );

    tl.fromTo(".hero-desc",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
        "-=1.0"
    );

    tl.fromTo(".hero-impact",
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1, ease: "power3.out" },
        "-=0.5"
    );

    // Scroll Indicator pulse
    tl.fromTo(".scroll-indicator",
        { opacity: 0 },
        { opacity: 1, duration: 1 },
        "-=0.5"
    );

    // General scroll animations using GSAP

    // Vertical line drawing down
    gsap.to(".vert-line", {
        height: "100%",
        ease: "none",
        scrollTrigger: {
            trigger: ".who-we-are",
            start: "top 80%",
            end: "top 20%",
            scrub: 1
        }
    });

    // Fade Up Elements
    const fadeUps = document.querySelectorAll(".fade-up");
    fadeUps.forEach(elem => {
        gsap.fromTo(elem,
            { opacity: 0, y: 50, visibility: "hidden" },
            {
                opacity: 1,
                y: 0,
                visibility: "visible",
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: elem,
                    start: "top 85%",
                }
            }
        );
    });

    // Section title horizontal slide
    const slideRights = document.querySelectorAll(".slide-right");
    slideRights.forEach(elem => {
        gsap.fromTo(elem,
            { opacity: 0, x: -50, visibility: "hidden" },
            {
                opacity: 1,
                x: 0,
                visibility: "visible",
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: elem,
                    start: "top 85%",
                }
            }
        );
    });

    // Section body vertical slide
    const slideUps = document.querySelectorAll(".slide-up");
    slideUps.forEach(elem => {
        gsap.fromTo(elem,
            { opacity: 0, y: 30, visibility: "hidden" },
            {
                opacity: 1,
                y: 0,
                visibility: "visible",
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: elem,
                    start: "top 90%",
                }
            }
        );
    });

    // Gold separators
    const fadeIns = document.querySelectorAll(".fade-in");
    fadeIns.forEach(elem => {
        gsap.fromTo(elem,
            { opacity: 0, visibility: "hidden", scaleX: 0 },
            {
                opacity: 1,
                visibility: "visible",
                scaleX: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: elem,
                    start: "top 90%",
                }
            }
        );
    });

    // Staggered list items
    const staggerItems = document.querySelectorAll(".stagger-fade-up");
    gsap.fromTo(staggerItems,
        { opacity: 0, y: 40, visibility: "hidden" },
        {
            opacity: 1,
            y: 0,
            visibility: "visible",
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".portfolio-grid, .expertise-grid", // Updated to trigger on both portfolio and expertise
                start: "top 80%",
            }
        }
    );

    // Initialize Swiper for Videography Portfolio
    const videoSwiper = new Swiper('.video-swiper', {
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 30,
        loop: true,
        speed: 600,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            // Adjust space between slides on smaller screens
            320: {
                spaceBetween: 15
            },
            768: {
                spaceBetween: 30
            }
        }
    });

    // Pause videos when swiping away
    videoSwiper.on('slideChangeTransitionEnd', function () {
        const slides = document.querySelectorAll('.video-swiper .swiper-slide video');
        slides.forEach(v => v.pause());
        const activeSlide = document.querySelector('.video-swiper .swiper-slide-active video');
        if (activeSlide) {
            // Reset active video to start but do not auto-play
            activeSlide.currentTime = 0;
        }
    });
    // Read More functionality for reviews
    const readMoreBtns = document.querySelectorAll('.read-more');
    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const parent = e.target.parentElement;
            const dots = parent.querySelector('.dots');
            const moreText = parent.querySelector('.more-text');

            if (moreText.style.display === "none" || moreText.style.display === "") {
                moreText.style.display = "inline";
                if (dots) dots.style.display = "none";
                e.target.textContent = "Read less";
            } else {
                moreText.style.display = "none";
                if (dots) dots.style.display = "inline";
                e.target.textContent = "Read more";
            }
        });
    });
});
