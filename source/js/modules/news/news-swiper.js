import Swiper from 'swiper';
import { Navigation, A11y, Grid, Pagination } from 'swiper/modules';
import 'swiper/css/grid';
// import 'swiper/css/pagination';
const newsSwiperContainer = document.querySelector('.news__swiper');

const SLIDES_TO_DUPLICATE = 16;

const SLIDES_BY_PAGE = 3;

const itLastSides = (swiper) => {
  const blockFromSlide = swiper.slides.length - SLIDES_BY_PAGE;
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
  const slides = Array.from(swiper.slides);

  slides.forEach((slide) => {
    const button = slide.querySelector('.news-card__link');
    if (button) {
      button.setAttribute('tabindex', '-1');
      button.style.backgroundColor = 'red';
    }
  });
  const step = swiper.activeIndex;
  const activeSlide1 = swiper.slides[swiper.activeIndex + step];
  const activeSlide2 = swiper.slides[swiper.activeIndex + step + 1];

  if (activeSlide1) {
    const button1 = activeSlide1.querySelector('.news-card__link');
    if (button1) {
      button1.setAttribute('tabindex', '0');
      button1.style.backgroundColor = 'green';
    }
  }
  if (activeSlide2) {
    const button2 = activeSlide2.querySelector('.news-card__link');
    if (button2) {
      button2.setAttribute('tabindex', '0');
      button2.style.backgroundColor = 'green';
    }
  }
};

const updateButtons = (swiper) => {
  const nextButton = swiper.navigation.nextEl;
  const prevButton = swiper.navigation.prevEl;

  const isFirstSlide = swiper.activeIndex < SLIDES_BY_PAGE;
  const isLastSlide = swiper.activeIndex >= swiper.slides.length - SLIDES_BY_PAGE;

  nextButton.disabled = isLastSlide;
  prevButton.disabled = isFirstSlide;
};

const duplicateSlides = (swiper) => {
  const wrapper = swiper.wrapperEl;
  const originalSlides = Array.from(swiper.slides);
  wrapper.innerHTML = '';
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < SLIDES_TO_DUPLICATE; i++) {
    const originalIndex = i % originalSlides.length;

    const clone = originalSlides[originalIndex].cloneNode(true);
    fragment.appendChild(clone);
  }

  wrapper.appendChild(fragment);
  fragment.innerHTML = '';
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

  if (activeIndex < 2) {
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
    start = totalSlides - SLIDES_BY_PAGE - 1;
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
  const STEP = SLIDES_BY_PAGE - 1;
  const lastActiveIndex = swiper.slides.length - SLIDES_BY_PAGE;

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
  const lastBulletsStart = totalSlides - SLIDES_BY_PAGE;

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

// const newsSwiper =
new Swiper(newsSwiperContainer, {
  modules: [Navigation, Grid, Pagination],
  speed: 500,
  grid: {
    rows: 2,
    fill: 'column',
    slidesPerView: 2,
  },
  slidesPerGroup: 1,
  spaceBetween: 15,
  // a11y: {
  //   enabled: true,
  // },

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
      duplicateSlides(this);
      this.update();
      updateTabIndex(this);

      if (window.innerWidth < 768) {
        updateSlideHeight(this);
      }

      disableBulletTabIndex();

      if (window.innerWidth >= 1440) {
        updateButtons(this);
        handleNavigationButtonsClick(this);
        handleLastBulletsClick(this);
        updateSlideSizes(this, this.activeIndex);
      }
      paginationBulletsHide(this);
    },
    slideChange: function () {
      disableBulletTabIndex();
      paginationBulletsHide(this);
      updateTabIndex(this);

      if (window.innerWidth >= 1440) {
        updateSlideSizes(this, this.activeIndex);
        updateButtons(this);

        if (itLastSides(this)) {
          const index = this.activeIndex;
          this.slideTo(this.slides.length - SLIDES_BY_PAGE);
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
    }
  },
  breakpoints: {
    768: {
      grid: {
        rows: 2,
        fill: 'row',
      },
      slidesPerGroup: 2,
      spaceBetween: 30,
      slidesPerView: 2,
    },
    1440: {
      grid: {
        rows: 1,
        fill: 'row',
      },
      pagination: {
        clickable: false,
      },
      // centeredSlides: true,
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 32,
      // allowTouchMove: false,
      // simulateTouch: false
    }
  }
});
