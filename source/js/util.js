
const duplicateSlides = (swiper, originalSlides, slidesCountToDuplicate) => {
  const wrapper = swiper.wrapperEl;
  wrapper.innerHTML = '';
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < slidesCountToDuplicate; i++) {
    const originalIndex = i % originalSlides.length;

    const clone = originalSlides[originalIndex].cloneNode(true);
    fragment.appendChild(clone);
  }

  wrapper.appendChild(fragment);
  fragment.innerHTML = '';
};

const mobileBreakpoint = window.matchMedia('(max-width: 767px)');
const tabletBreakpoint = window.matchMedia('(min-width: 768px) and (max-width: 1439px)');
const desktopBreakpoint = window.matchMedia('(min-width: 1440px)');


export { duplicateSlides, mobileBreakpoint, tabletBreakpoint, desktopBreakpoint };
