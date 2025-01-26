(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Header fixed top on scroll
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    let headerOffset = selectHeader.offsetTop
    let nextElement = selectHeader.nextElementSibling
    const headerFixed = () => {
      if ((headerOffset - window.scrollY) <= 0) {
        selectHeader.classList.add('fixed-top')
        nextElement.classList.add('scrolled-offset')
      } else {
        selectHeader.classList.remove('fixed-top')
        nextElement.classList.remove('scrolled-offset')
      }
    }
    window.addEventListener('load', headerFixed)
    onscroll(document, headerFixed)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();



    // slider Clients ////////

    const slider = document.querySelector('.slider');
    const slides = Array.from(document.querySelectorAll('.slide'));
    const totalSlides = slides.length;
    let currentIndex = 2;

    // Clone the first two and last two slides
    const firstTwoSlides = slides.slice(0, 2).map(slide => slide.cloneNode(true));
    const lastTwoSlides = slides.slice(-2).map(slide => slide.cloneNode(true));

    // Append the cloned first two slides to the end and prepend the cloned last two slides to the beginning
    firstTwoSlides.forEach(slide => slider.appendChild(slide));
    lastTwoSlides.forEach(slide => slider.insertBefore(slide, slides[0]));

    const updatedSlides = document.querySelectorAll('.slide');
    if (updatedSlides.length > 0) {
        const slideWidth = updatedSlides[0].offsetWidth;

        // Initial position (slide to the first real slide)
        slider.style.transform = `translateX(${-slideWidth * currentIndex}px)`;

        document.querySelector('.next').addEventListener('click', () => {
            if (currentIndex >= totalSlides + 2) {
                slider.style.transition = 'none';
                currentIndex = 2;
                slider.style.transform = `translateX(${-slideWidth * currentIndex}px)`;
                setTimeout(() => {
                    slider.style.transition = 'transform 0.5s ease-in-out';
                    currentIndex++;
                    slider.style.transform = `translateX(${-slideWidth * currentIndex}px)`;
                }, 0);
            } else {
                currentIndex++;
                slider.style.transform = `translateX(${-slideWidth * currentIndex}px)`;
            }
        });

        document.querySelector('.prev').addEventListener('click', () => {
            if (currentIndex <= 1) {
                slider.style.transition = 'none';
                currentIndex = totalSlides + 1;
                slider.style.transform = `translateX(${-slideWidth * currentIndex}px)`;
                setTimeout(() => {
                    slider.style.transition = 'transform 0.5s ease-in-out';
                    currentIndex--;
                    slider.style.transform = `translateX(${-slideWidth * currentIndex}px)`;
                }, 0);
            } else {
                currentIndex--;
                slider.style.transform = `translateX(${-slideWidth * currentIndex}px)`;
            }
        });
    }

    // slider Team ////////

    const slider_t = document.querySelector('.slider-t');
    const slides_t = Array.from(document.querySelectorAll('.slide-t'));
    const totalSlides_t = slides_t.length;
    let currentIndex_t = 2;

    // Clone the first two and last two slides
    const firstTwoSlides_t = slides_t.slice(0, 2).map(slide => slide.cloneNode(true));
    const lastTwoSlides_t = slides_t.slice(-2).map(slide => slide.cloneNode(true));

    // Append the cloned first two slides to the end and prepend the cloned last two slides to the beginning
    firstTwoSlides_t.forEach(slide => slider_t.appendChild(slide));
    lastTwoSlides_t.forEach(slide => slider_t.insertBefore(slide, slides_t[0]));

    const updatedSlides_t = document.querySelectorAll('.slide-t');
    if (updatedSlides_t.length > 0) {
        const slideWidth_t = updatedSlides_t[0].offsetWidth;

        // Initial position (slide to the first real slide)
        slider_t.style.transform = `translateX(${-slideWidth_t * currentIndex_t}px)`;

        document.querySelector('.next-t').addEventListener('click', () => {
            if (currentIndex_t >= totalSlides_t + 2) {
                slider_t.style.transition = 'none';
                currentIndex_t = 2;
                slider_t.style.transform = `translateX(${-slideWidth_t * currentIndex_t}px)`;
                setTimeout(() => {
                    slider_t.style.transition = 'transform 0.5s ease-in-out';
                    currentIndex_t++;
                    slider_t.style.transform = `translateX(${-slideWidth_t * currentIndex_t}px)`;
                }, 0);
            } else {
                currentIndex_t++;
                slider_t.style.transform = `translateX(${-slideWidth_t * currentIndex_t}px)`;
            }
        });

        document.querySelector('.prev-t').addEventListener('click', () => {
            if (currentIndex_t <= 1) {
                slider_t.style.transition = 'none';
                currentIndex_t = totalSlides_t + 1;
                slider_t.style.transform = `translateX(${-slideWidth_t * currentIndex_t}px)`;
                setTimeout(() => {
                    slider_t.style.transition = 'transform 0.5s ease-in-out';
                    currentIndex_t--;
                    slider_t.style.transform = `translateX(${-slideWidth_t * currentIndex_t}px)`;
                }, 0);
            } else {
                currentIndex_t--;
                slider_t.style.transform = `translateX(${-slideWidth_t * currentIndex_t}px)`;
            }
        });
    }
})()