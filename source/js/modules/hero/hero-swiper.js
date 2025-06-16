import Swiper from 'swiper';
import { EffectFade } from 'swiper/modules';
import 'swiper/css/effect-fade';

const paginationBulletsCreate = (swiper) => {
  const activeSlide = swiper.slides[swiper.activeIndex];
  const paginationParent = activeSlide.querySelector('.swiper-pagination');
  paginationParent.innerHTML = '';

  for (let i = 0; i < swiper.slides.length; i++) {
    const bullet = document.createElement('button');
    bullet.setAttribute('type', 'button');
    bullet.classList.add('hero-card__bullet', 'swiper-pagination-bullet');
    bullet.setAttribute('tabIndex', '0');

    if (i === swiper.realIndex) {
      bullet.classList.add('swiper-pagination-bullet-active');
      bullet.setAttribute('tabIndex', '-1');

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

const disableTabIndex = (swiper) => {
  swiper.slides.forEach((slide) => {
    const button = slide.querySelector('.hero-card__button');
    if (!slide.classList.contains('swiper-slide-active')) {
      button.setAttribute('tabindex', '-1');
    }
  });
};

const tabIndexToggle = (swiper) => {
  swiper.slides.forEach((slide) => {
    slide.querySelector('.hero-card__button').setAttribute('tabindex', '-1');
  });

  const activeSlide = swiper.slides[swiper.activeIndex];
  activeSlide.querySelector('.hero-card__button').setAttribute('tabindex', '0');
};

new Swiper('.hero__swiper', {
  modules: [EffectFade],
  loop: true,
  speed: 300,
  slidesPerView: 1,
  effect: 'fade',
  fadeEffect: { crossFade: true },
  a11y: { enabled: true },
  autoHeight: true,
  breakpoints: {
    1440: {
      allowTouchMove: false,
      simulateTouch: false
    },
  },
  on: {
    init: function () {
      paginationBulletsCreate(this);
      disableTabIndex(this);
    },
    slideChange: function () {
      paginationBulletsCreate(this);
      tabIndexToggle(this);
      document.activeElement.blur();
    },
  }

});
