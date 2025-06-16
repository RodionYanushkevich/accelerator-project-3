import Swiper from 'swiper';
import { A11y, Navigation, Scrollbar } from 'swiper/modules';

import { duplicateSlides } from '../../util.js';

const programsSwiperContainer = document.querySelector('.programs__swiper');
const swiperWrapper = programsSwiperContainer.children[0];

const originalSlidesArray = Array.from(swiperWrapper.children);

const SLIDES_TO_DUPLICATE = 9;

new Swiper(programsSwiperContainer, {
  modules: [A11y, Navigation, Scrollbar],
  speed: 300,
  slidesPerView: 1,
  slidesPerGroup: 1,
  autoHeight: true,
  spaceBetween: 20,
  navigation: {
    nextEl: '.programs__swiper-button.swiper-button-next',
    prevEl: '.programs__swiper-button.swiper-button-prev',
  },
  scrollbar: {
    el: '.programs__scrollbar.swiper-scrollbar',
    draggable: true,
    snapOnRelease: true,
    hide: false,
    dragSize: 326,
  },
  breakpoints: {
    768: {
      slidesPerGroup: 2,
      spaceBetween: 30,
      slidesPerView: 2,
      allowTouchMove: true,
      simulateTouch: true
    },
    1440: {
      scrollbar: {
        dragSize: 394,
      },
      slidesPerGroup: 3,

      slidesPerView: 3,
      spaceBetween: 30,
      allowTouchMove: false,
      simulateTouch: false
    }
  },
  on: {
    init: function () {

      duplicateSlides(this, originalSlidesArray, SLIDES_TO_DUPLICATE);
    }
  }
});
