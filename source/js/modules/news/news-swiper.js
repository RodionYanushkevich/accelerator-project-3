import Swiper from 'swiper';
import { Navigation, Scrollbar, Grid, Pagination } from 'swiper/modules';
import 'swiper/css/grid';
// import 'swiper/css/pagination';
const newsSwiperContainer = document.querySelector('.news__swiper');

const disableTabIndex = () => {
  const paginationBullets = document.querySelectorAll('.swiper-pagination-bullet');
  paginationBullets.forEach((bullet) => {
    if (bullet.classList.contains('swiper-pagination-bullet-active')) {
      bullet.setAttribute('tabindex', '-1');
    } else {
      bullet.setAttribute('tabindex', '0');
    }
  });
};

const newsSwiper = new Swiper(newsSwiperContainer, {
  modules: [Navigation, Scrollbar, Grid, Pagination],
  speed: 300,
  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 15,
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
    renderBullet: function (index, className) {
      return `<button class="${className}" type='button'>${index + 1}</button>`;
    }
  },
  on: {
    init: function () {
      disableTabIndex();
      duplicateSlides(newsSwiperContainer);

    },
    slideChange: function () {
      disableTabIndex();

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


function duplicateSlides(container) {
  const wrapper = container.querySelector('.swiper-wrapper');
  const originalSlides = Array.from(container.querySelectorAll('.swiper-slide'));

  wrapper.innerHTML = '';

  // const originalCount = originalSlides.length;

  const getSlidesCount = () => {
    if (window.innerWidth >= 1440) {
      return 12;
    }
    if (window.innerWidth >= 768) {
      return 16;
    }
    return 8;
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
}
