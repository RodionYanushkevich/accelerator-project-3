import Swiper from 'swiper';
import { EffectFade, A11y } from 'swiper/modules';
import 'swiper/css/effect-fade';

const paginationBulletsCreate = (swiper) => {
  const activeSlide = swiper.slides[swiper.activeIndex];
  const paginationParent = activeSlide.querySelector('.swiper-pagination');

  paginationParent.innerHTML = '';

  for (let i = 0; i < swiper.slides.length; i++) {
    const bullet = document.createElement('button');
    bullet.setAttribute('type', 'button');
    bullet.classList.add('hero-card__bullet', 'swiper-pagination-bullet');

    if (i === swiper.realIndex) {
      bullet.classList.add('swiper-pagination-bullet-active');
    }

    const buttonDescription = document.createElement('span');
    buttonDescription.classList.add('visually-hidden');
    buttonDescription.textContent = `Перейти к слайду ${i + 1}`;
    bullet.appendChild(buttonDescription);

    bullet.addEventListener('click', () => {
      swiper.slideToLoop(i);
    });

    paginationParent.appendChild(bullet);
  }
};

new Swiper('.hero__swiper', {
  modules: [EffectFade, A11y],
  loop: true,
  speed: 300,
  slidesPerView: 1,
  effect: 'fade',
  fadeEffect: { crossFade: true },
  a11y: { enabled: true },
  autoHeight: true,

  on: {
    init: function () {
      paginationBulletsCreate(this);
    },
    slideChange: function () {
      paginationBulletsCreate(this);
    }
  },
  breakpoints: {
    1440: {
      allowTouchMove: false,
      simulateTouch: false
    }
  }
});
