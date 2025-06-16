import Swiper from 'swiper';
import { Navigation, Scrollbar } from 'swiper/modules';
import { duplicateSlides } from '../../util.js';

const reviewsSwiperContainer = document.querySelector('.reviews__swiper');

const swiperWrapper = reviewsSwiperContainer.children[0];
const originalSlidesArray = Array.from(swiperWrapper.children);

const SLIDES_TO_DUPLICATE = 6;

new Swiper(reviewsSwiperContainer, {
  modules: [Navigation, Scrollbar],
  speed: 300,
  slidesPerView: 1,
  spaceBetween: 20,
  autoHeight: true,
  allowTouchMove: true,
  simulateTouch: true,

  navigation: {
    nextEl: '.reviews__swiper-button.swiper-button-next',
    prevEl: '.reviews__swiper-button.swiper-button-prev',
  },
  scrollbar: {
    el: '.reviews__scrollbar.swiper-scrollbar',
    draggable: true,
    snapOnRelease: true,
    hide: false,
    dragSize: 326,
  },
  breakpoints: {
    768: {
      slidesPerView: 1,
      spaceBetween: 30,
      allowTouchMove: true,
      simulateTouch: true,
    },
    1440: {
      scrollbar: {
        dragSize: 394,
      },
      slidesPerView: 2,
      spaceBetween: 32,
    }
  },
  on: {
    init: function () {
      duplicateSlides(this, originalSlidesArray, SLIDES_TO_DUPLICATE);
    }
  }
});
