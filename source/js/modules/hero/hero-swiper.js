import Swiper from 'swiper';

import { EffectFade, Pagination, A11y } from 'swiper/modules';

import 'swiper/css/effect-fade';

const paginationContainer = document.querySelector('.hero__pagination.swiper-pagination');

new Swiper('.hero__swiper', {
  modules: [EffectFade, Pagination, A11y],
  loop: true,
  speed: 300,
  slidesPerView: 1,
  effect: 'fade',
  fadeEffect: {
    crossFade: true,
  },
  a11y: {
    enabled: true,
  },
  autoHeight: true,
  // on: {
  //   init: function () {
  //     this.slides.forEach((slide) => {
  //       if (!slide.classList.contains('swiper-slide-active')) {
  //         slide.children[0].children[2].setAttribute('tabindex', '-1');
  //       }
  //     });
  //   },
  //   slideChange: function () {
  //     this.slides.forEach((slide) => {
  //       slide.children[0].children[2].setAttribute('tabindex', '-1');
  //     });

  //     const activeSlide = this.slides[this.activeIndex];
  //     activeSlide.children[0].children[2].setAttribute('tabindex', '0');
  //   },
  // },
  pagination: {
    el: paginationContainer,
    type: 'bullets',
    clickable: true,
    renderBullet: function (index) {
      return `<button class=" hero__pagination-bullet swiper-pagination-bullet" type="button">
      <span class="visually-hidden">кнопка пагинации туров слайд № ${index + 1}
      </span>
      </button>`;
    },
  },
  breakpoints: {
    1440: {
      allowTouchMove: false,
      simulateTouch: false,
    }
  }
});

