import Swiper from 'swiper';
import { Navigation, A11y, Grid, Pagination } from 'swiper/modules';
import 'swiper/css/grid';
// import 'swiper/css/pagination';
const newsSwiperContainer = document.querySelector('.news__swiper');

const SLIDES_TO_DUPLICATE_BY_BREAKPOINT = [8, 12, 16];

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
  const slides = swiper.wrapperEl.childNodes;
  const activeIndex = swiper.activeIndex;

  if (window.innerWidth <= 768) {
    slides.forEach((slide, index) => {
      const button = slide.querySelector('.news-card__link');

      const isVisible = index === activeIndex || index === activeIndex + 4;

      if (isVisible) {
        button.setAttribute('tabindex', '0');
      } else {
        button.setAttribute('tabindex', '-1');
      }
    });
  } else {

    // !!!
    slides.forEach((slide) => {
      const button = slide.querySelector('.news-card__link');
      if (button) {
        button.setAttribute('tabindex', '0');
      }
    });
  }
};

const duplicateSlides = (swiper) => {
  const wrapper = swiper.wrapperEl;
  const originalSlides = Array.from(swiper.slides);
  wrapper.innerHTML = '';

  const getSlidesCount = () => {
    if (window.innerWidth >= 1440) {
      return SLIDES_TO_DUPLICATE_BY_BREAKPOINT[2];
    }
    if (window.innerWidth >= 768) {
      return SLIDES_TO_DUPLICATE_BY_BREAKPOINT[1];
    }
    return SLIDES_TO_DUPLICATE_BY_BREAKPOINT[0];
  };
  const slidesToCreate = getSlidesCount();


  const fragment = document.createDocumentFragment();

  for (let i = 0; i < slidesToCreate; i++) {
    let originalIndex = null;
    if (i < 4) {
      if (i % 2 === 0) {
        originalIndex = 0;
      } else {
        originalIndex = 2;
      }
    } else {
      if (i % 2 === 0) {
        originalIndex = 1;
      } else {
        originalIndex = 3;
      }
    }

    const clone = originalSlides[originalIndex].cloneNode(true);
    fragment.appendChild(clone);
  }

  wrapper.appendChild(fragment);
  fragment.innerHTML = '';
};


// const newsSwiper =
new Swiper(newsSwiperContainer, {
  modules: [Navigation, Grid, Pagination],
  speed: 300,
  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 15,
  // a11y: {
  //   enabled: true,
  // },
  grid: {
    rows: 2,
    fill: 'row',
  },
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
      updateTabIndex(this);
      this.update();
      disableBulletTabIndex();
    },
    slideChange: function () {
      disableBulletTabIndex();
      updateTabIndex(this);

    },
  },
  breakpoints: {
    768: {
      slidesPerGroup: 2,
      spaceBetween: 30,
      slidesPerView: 2,
    },
    // 1440: {
    //   scrollbar: {
    //     dragSize: 394,
    //   },
    //   slidesPerView: 2,
    //   spaceBetween: 32,
    //   allowTouchMove: false,
    //   simulateTouch: false
    // }
  }
});
