import Swiper from 'swiper';
import { A11y } from 'swiper/modules';

const linkSwiperContainer = document.querySelector('.news__links-swiper');

const swiperClassListToggle = (swiperContainer) => {
  swiperContainer.classList.toggle('swiper-container');
  const swiperWrapper = swiperContainer.children[0];
  swiperWrapper.classList.toggle('swiper-wrapper');

  const swiperSlidesArray = Array.from(swiperWrapper.children);
  swiperSlidesArray.forEach((slide) => {
    slide.classList.toggle('swiper-slide');
  });
};


let linksSwiper = null;

const initSwiper = () => {
  linksSwiper = new Swiper(linkSwiperContainer, {
    modules: [A11y],
    speed: 300,
    spaceBetween: 10,
    slidesPerView: 'auto',
    a11y: {
      enabled: true,
    },
  });
};

const destroySwiper = () => {
  if (linksSwiper) {
    linksSwiper.destroy(true, true);
    linksSwiper = null;
    swiperClassListToggle(linkSwiperContainer);
  }
};

const resizeListener = () => {
  if (window.innerWidth < 768 && !linksSwiper) {
    swiperClassListToggle(linkSwiperContainer);
    initSwiper();
  } else if (window.innerWidth >= 768 && linksSwiper) {
    destroySwiper();
  }
};

window.addEventListener('resize', resizeListener);
resizeListener();
