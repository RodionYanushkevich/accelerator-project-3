import Swiper from 'swiper';
import { Navigation, Grid, Pagination } from 'swiper/modules';
import 'swiper/css/grid';

import { duplicateSlides, mobileBreakpoint, tabletBreakpoint, desktopBreakpoint } from '../../util.js';

const newsSwiperContainer = document.querySelector('.news__swiper');
const swiperWrapper = newsSwiperContainer.children[0];

const originalSlidesArray = Array.from(swiperWrapper.children);

const SLIDES_TO_DUPLICATE = 16;

const SLIDES_BY_PAGE = [2, 4, 3];

const itLastSides = (swiper) => {
  const blockFromSlide = swiper.slides.length - SLIDES_BY_PAGE[2];
  return swiper.activeIndex >= blockFromSlide;
};

const updateSlideSizes = (swiper, index) => {
  swiper.slides.forEach((slide) => {
    slide.style.width = '286px';

    slide.children[0].classList.remove('news-card--big-card');
  });
  swiper.slides[index].style.width = '604px';
  swiper.slides[index].children[0].classList.add('news-card--big-card');

};

const disableBulletTabIndex = () => {
  const bullets = newsSwiperContainer.querySelectorAll('.swiper-pagination-bullet');
  bullets.forEach((button) => {
    if (button.classList.contains('swiper-pagination-bullet-active')) {
      button.setAttribute('tabindex', '-1');
      button.blur();
    } else {
      button.setAttribute('tabindex', '0');
    }
  });
};

const updateTabIndex = (swiper) => {
  const slides = swiper.slides;

  Array.from(slides).forEach((slide) => {
    const button = slide.querySelector('.news-card__link');
    button.setAttribute('tabindex', '-1');
  });

  let activeSlides;
  const step = swiper.activeIndex + swiper.activeIndex;

  if (window.innerWidth < 768) {
    activeSlides = [slides[step], slides[step + 1]];

  } else if (window.innerWidth < 1440) {
    activeSlides = [slides[step], slides[step + 1], slides[step + 2], slides[step + 3]];
  } else {

    activeSlides = [slides[swiper.activeIndex], slides[swiper.activeIndex + 1], slides[swiper.activeIndex + 2]];
    if (itLastSides(swiper)) {
      const lastSlideIndex = slides.length;
      activeSlides = [slides[lastSlideIndex - SLIDES_BY_PAGE[2] + 1], slides[lastSlideIndex - SLIDES_BY_PAGE[2]], slides[lastSlideIndex - SLIDES_BY_PAGE[2] + 2]];
    }
  }

  activeSlides.forEach((slide) => {
    const button = slide.querySelector('.news-card__link');
    button.setAttribute('tabindex', '0');
  });
};

const updateButtons = (swiper) => {
  const nextButton = swiper.navigation.nextEl;
  const prevButton = swiper.navigation.prevEl;

  const isFirstSlide = swiper.activeIndex < SLIDES_BY_PAGE[2];
  const isLastSlide = swiper.activeIndex >= swiper.slides.length - SLIDES_BY_PAGE[2];

  nextButton.disabled = isLastSlide;
  prevButton.disabled = isFirstSlide;
};

const paginationBulletsHide = (swiper) => {
  const bullets = swiper.el.querySelectorAll('.swiper-pagination-bullet');
  const totalSlides = swiper.slides.length;
  const activeIndex = swiper.activeIndex;

  if (totalSlides <= 4) {
    bullets.forEach((bullet) => {
      bullet.style.display = 'flex';
    });
    return;
  }

  let start, end;
  bullets.forEach((bullet) => {
    bullet.style.display = 'none';
  });


  if (window.innerWidth < 1440 && window.innerWidth >= 768) {
    start = 0;
    end = 3;
  } else if (activeIndex < 2) {
    start = 0;
    end = 3;
  } else if (activeIndex >= totalSlides - 2) {
    start = totalSlides - 4;
    end = totalSlides - 1;
  } else {
    start = activeIndex - 2;
    end = activeIndex + 1;
  }

  if (window.innerWidth >= 1440 && itLastSides(swiper)) {
    start = totalSlides - SLIDES_BY_PAGE[2] - 1;
    end = totalSlides;
  }

  for (let i = start; i <= end; i++) {
    if (bullets[i]) {
      bullets[i].style.display = 'flex';
    }
  }

};

const handleNavigationButtonsClick = (swiper) => {
  const nextButton = swiper.navigation.nextEl;
  const prevButton = swiper.navigation.prevEl;
  const STEP = SLIDES_BY_PAGE[2] - 1;
  const lastActiveIndex = swiper.slides.length - SLIDES_BY_PAGE[2];

  nextButton.removeEventListener('click', nextButton.clickHandler);
  prevButton.removeEventListener('click', prevButton.clickHandler);

  nextButton.clickHandler = () => {
    swiper.slideTo(Math.min(swiper.activeIndex + STEP, lastActiveIndex));
    updateButtons(swiper);
  };

  prevButton.clickHandler = () => {
    swiper.slideTo(Math.max(swiper.activeIndex - STEP, 0));
    updateButtons(swiper);
  };

  nextButton.addEventListener('click', nextButton.clickHandler);
  prevButton.addEventListener('click', prevButton.clickHandler);
};

const handleLastBulletsClick = (swiper) => {
  const bullets = swiper.pagination.bullets;
  const totalSlides = swiper.slides.length;
  const lastBulletsStart = totalSlides - SLIDES_BY_PAGE[2];

  bullets.forEach((bullet, index) => {
    bullet.addEventListener('click', () => {
      if (index < lastBulletsStart) {
        swiper.slideTo(index);
        updateSlideSizes(swiper, index);
        return;
      }
      bullets.forEach((b) => b.classList.remove('swiper-pagination-bullet-active'));
      bullet.classList.add('swiper-pagination-bullet-active');

      if (index === lastBulletsStart) {
        swiper.slideTo(index);
      }
      updateSlideSizes(swiper, index);
    });
  });
};
const handleLastSlidesClick = (swiper, index) => {
  const bullets = swiper.pagination.bullets;
  bullets.forEach((bullet) => bullet.classList.remove('swiper-pagination-bullet-active'));
  swiper.pagination.bullets[index].classList.add('swiper-pagination-bullet-active');
};
const updateSlideHeight = (swiper) => {
  swiper.slides.forEach((slide, index) => {
    if (index % 2 !== 0) {
      slide.style.height = '240px';
    }
  });
};

let newsSwiper;

function ininSwiper() {

  if (newsSwiper) {
    newsSwiper.destroy(true, true);
  }

  newsSwiper =
    new Swiper(newsSwiperContainer, {
      modules: [Navigation, Grid, Pagination],
      speed: 500,
      slidesPerView: 1,
      grid: {
        rows: 2,
        fill: 'column',
      },
      slidesPerGroup: 1,
      spaceBetween: 15,
      navigation: {
        nextEl: '.news__swiper-button.swiper-button-next',
        prevEl: '.news__swiper-button.swiper-button-prev',
      },
      pagination: {
        el: '.news__pagination.swiper-pagination',
        clickable: true,
        renderBullet: function (index,) {
          return `<button class="news__swiper-bullet swiper-pagination-bullet" type='button'>${index + 1}</button>`;
        }
      },
      on: {
        init: function () {
          duplicateSlides(this, originalSlidesArray, SLIDES_TO_DUPLICATE);
          this.update();
          disableBulletTabIndex();
          paginationBulletsHide(this);
          updateTabIndex(this);

          if (window.innerWidth < 768) {
            updateSlideHeight(this);
          }

          if (window.innerWidth >= 1440) {
            this.slides.forEach((slide) => {
              slide.style.order = '';
            });
            updateButtons(this);
            handleLastBulletsClick(this);
            handleNavigationButtonsClick(this);
            updateSlideSizes(this, this.activeIndex);
          }

        },
        slideChange: function () {
          disableBulletTabIndex();
          paginationBulletsHide(this);
          updateTabIndex(this);

          if (window.innerWidth >= 1440) {
            updateButtons(this);
            updateSlideSizes(this, this.activeIndex);

            if (itLastSides(this)) {
              const index = this.activeIndex;
              this.slideTo(this.slides.length - SLIDES_BY_PAGE[2]);
              updateSlideSizes(this, index);
              handleLastSlidesClick(this, index);
            }
          }
        },
        click: function () {
          if (window.innerWidth >= 1440) {
            this.slideTo(this.clickedIndex);
            updateSlideSizes(this, this.clickedIndex);
            if (itLastSides(this)) {
              handleLastSlidesClick(this, this.clickedIndex);
            }
          }
        },
      },
      breakpoints: {
        768: {
          grid: { rows: 2, fill: 'row' },
          slidesPerGroup: 2,
          slidesPerView: 2,
          spaceBetween: 30,
        },
        1440: {
          grid: { rows: 1, fill: 'row' },
          updateOnWindowResize: false,
          slidesPerGroup: 1,
          slidesPerView: 1,
          spaceBetween: 32,
        }
      }
    });
}

const updateSwiper = (e) => {
  if (e.matches) {
    ininSwiper();
  }
};

ininSwiper();

mobileBreakpoint.addEventListener('change', updateSwiper);
tabletBreakpoint.addEventListener('change', updateSwiper);
desktopBreakpoint.addEventListener('change', updateSwiper);
