import Swiper from 'swiper';
import { Navigation, Scrollbar } from 'swiper/modules';

const reviewsSwiperContainer = document.querySelector('.reviews__swiper');

// const initSwiper = () => {
// programsSwiper =

new Swiper(reviewsSwiperContainer, {
  modules: [Navigation, Scrollbar],
  speed: 300,
  slidesPerView: 1,
  spaceBetween: 20,
  autoHeight: true,
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
      // slidesPerGroup: 1,
      spaceBetween: 30,
      // slidesPerView: 2,
    },
    1440: {
      scrollbar: {
        dragSize: 394,
      },
      slidesPerView: 2,
      spaceBetween: 32,
      allowTouchMove: false,
      simulateTouch: false
    }
  }
});
