const LOOP_DUPLICATE_ATTRIBUTE = "data-loop-duplicate-slide";

interface DuplicateLoopSlidesOptions {
  minSets?: number;
  minWidthMultiplier?: number;
}

export const duplicateLoopSlides = (
  slider: HTMLElement,
  { minSets = 2, minWidthMultiplier = 2 }: DuplicateLoopSlidesOptions = {}
) => {
  const wrapper = slider.querySelector<HTMLElement>(".swiper-wrapper");

  if (!wrapper) return;

  removeLoopSlideDuplicates(slider);

  const slides = Array.from(wrapper.children).filter(
    (slide): slide is HTMLElement =>
      slide instanceof HTMLElement &&
      slide.classList.contains("swiper-slide") &&
      !slide.hasAttribute(LOOP_DUPLICATE_ATTRIBUTE)
  );

  if (slides.length === 0) return;

  const sourceWidth = slides.reduce(
    (width, slide) => width + slide.getBoundingClientRect().width,
    0
  );
  const sliderWidth = slider.getBoundingClientRect().width;
  const widthSets =
    sourceWidth > 0 && sliderWidth > 0
      ? Math.ceil((sliderWidth * minWidthMultiplier) / sourceWidth)
      : 1;
  const setsCount = Math.max(minSets, widthSets);

  if (setsCount <= 1) return;

  const fragment = document.createDocumentFragment();

  for (let setIndex = 1; setIndex < setsCount; setIndex += 1) {
    slides.forEach((slide) => {
      const clone = slide.cloneNode(true);

      if (!(clone instanceof HTMLElement)) return;

      clone.setAttribute(LOOP_DUPLICATE_ATTRIBUTE, "true");
      fragment.append(clone);
    });
  }

  wrapper.append(fragment);
};

export const removeLoopSlideDuplicates = (slider: HTMLElement) => {
  slider
    .querySelectorAll(`[${LOOP_DUPLICATE_ATTRIBUTE}]`)
    .forEach((slide) => slide.remove());
};
