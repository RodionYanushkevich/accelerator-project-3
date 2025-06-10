import Swiper from 'swiper';
// import { Navigation, Scrollbar } from 'swiper/modules';
import { A11y, Navigation, Scrollbar } from 'swiper/modules';
// import 'swiper/css/a11y';

const programsSwiperContainer = document.querySelector('.programs__swiper');

// const initSwiper = () => {
// programsSwiper =

new Swiper(programsSwiperContainer, {
  // modules: [Navigation, Scrollbar],
  modules: [A11y, Navigation, Scrollbar],
  speed: 300,
  slidesPerView: 1,
  // a11y: { enabled: true },
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
      slidesPerGroup: 1,
      spaceBetween: 30,
      slidesPerView: 2,
    },
    1440: {
      scrollbar: {
        dragSize: 394,
      },
      slidesPerView: 3,
      spaceBetween: 30,
      allowTouchMove: false,
      simulateTouch: false
    }
  }
});
