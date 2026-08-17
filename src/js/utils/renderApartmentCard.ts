export interface ApartmentImageData {
  src: string;
  width: number;
  height: number;
  alt: string;
  className?: string;
}

export interface ApartmentCardData {
  id: string;
  href: string;
  title: string;
  area: string;
  floor: string;
  images: ApartmentImageData[];
  hasMultipleImages: boolean;
  price: string;
  oldPrice?: string;
  discount?: string;
  discountIcon?: string;
  mortgage?: string;
  features: string[];
  allFeatures: string[];
  featuresRemaining: number;
  reserved: boolean;
}

const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
const ALLOWED_IMAGE_CLASSES = new Set(["apartment-card__image--floor"]);

function createElement<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  className?: string,
  text?: string
) {
  const element = document.createElement(tagName);

  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;

  return element;
}

function createSeparator(modifier?: string) {
  const separator = createElement(
    "span",
    `apartment-card__separator${modifier ? ` ${modifier}` : ""}`
  );
  separator.setAttribute("aria-hidden", "true");
  return separator;
}

function createSvgUse(
  href: string,
  width: number,
  height: number,
  className?: string
) {
  const svg = document.createElementNS(SVG_NAMESPACE, "svg");
  svg.setAttribute("width", String(width));
  svg.setAttribute("height", String(height));
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("focusable", "false");
  if (className) svg.setAttribute("class", className);

  const use = document.createElementNS(SVG_NAMESPACE, "use");
  use.setAttribute("href", href);
  svg.append(use);

  return svg;
}

function getSafeUrl(value: string) {
  try {
    const url = new URL(value, window.location.origin);
    return url.protocol === "http:" || url.protocol === "https:"
      ? url.href
      : null;
  } catch {
    return null;
  }
}

function createFeature(text: string) {
  return createElement("span", "apartment-card__feature", text);
}

export default function renderApartmentCard(item: ApartmentCardData) {
  const listItem = createElement("li", "apartment-catalog__item");
  listItem.dataset.apartmentId = item.id;

  if (item.reserved) {
    listItem.classList.add("js-reserved-apartment");
  }

  const card = createElement(
    "article",
    `apartment-card apartment-card--catalog${item.reserved ? " is-reserved" : ""}`
  );

  if (item.reserved) {
    card.setAttribute("aria-disabled", "true");
  } else {
    const href = getSafeUrl(item.href);

    if (href) {
      const link = createElement("a", "apartment-card__link");
      link.href = href;
      link.setAttribute(
        "aria-label",
        `Открыть ${item.title}, ${item.area}, ${item.floor}`
      );
      card.append(link);
    }
  }

  const header = createElement("header", "apartment-card__header");
  const title = createElement("h3", "apartment-card__title", item.title);
  const meta = createElement("p", "apartment-card__meta");
  meta.append(
    createElement("span", undefined, item.area),
    createSeparator(),
    createElement("span", undefined, item.floor)
  );
  header.append(title, meta);

  const media = createElement(
    "div",
    "apartment-card__media js-apartment-card-gallery"
  );
  const progress = createElement(
    "span",
    "apartment-card__image-progress"
  );
  progress.setAttribute("aria-hidden", "true");

  item.images.forEach((imageData, index) => {
    const src = getSafeUrl(imageData.src);
    if (!src) return;

    const image = createElement(
      "img",
      `apartment-card__image js-apartment-card-image${index === 0 ? " is-active" : ""}`
    );
    image.src = src;
    image.width = imageData.width;
    image.height = imageData.height;
    image.alt = imageData.alt;
    image.loading = "lazy";

    if (imageData.className && ALLOWED_IMAGE_CLASSES.has(imageData.className)) {
      image.classList.add(imageData.className);
    }

    if (index !== 0) image.setAttribute("aria-hidden", "true");
    media.append(image);

    const progressItem = createElement(
      "span",
      `apartment-card__image-progress-item${index === 0 ? " is-active" : ""}`
    );
    progress.append(progressItem);
  });

  if (item.hasMultipleImages && media.children.length > 1) {
    media.append(progress);
  }

  const priceBlock = createElement("div", "apartment-card__price-block");
  const price = createElement("div", "apartment-card__price");
  price.append(
    createElement("span", "apartment-card__price-label", "Цена"),
    createElement("strong", undefined, item.price)
  );
  priceBlock.append(price);

  if (item.mortgage) {
    priceBlock.append(
      createElement("p", "apartment-card__mortgage", item.mortgage)
    );
  } else if (item.oldPrice && item.discount && item.discountIcon) {
    const discount = createElement("div", "apartment-card__discount");
    const icon = createElement("img", "apartment-card__discount-icon");
    const iconSrc = getSafeUrl(item.discountIcon);
    if (iconSrc) icon.src = iconSrc;
    icon.width = 18;
    icon.height = 18;
    icon.alt = "";
    icon.setAttribute("aria-hidden", "true");
    discount.append(
      createElement("del", undefined, item.oldPrice),
      createSeparator("apartment-card__separator--dark"),
      createElement("span", undefined, item.discount),
      icon
    );
    priceBlock.append(discount);
  }

  const divider = createElement("div", "apartment-card__divider");
  divider.setAttribute("aria-hidden", "true");
  const scrim = createElement("span", "apartment-card__scrim");
  scrim.setAttribute("aria-hidden", "true");

  const features = createElement("div", "apartment-card__features");
  const featureList = createElement("div", "apartment-card__feature-list");
  featureList.append(...item.features.map(createFeature));
  features.append(featureList);

  if (item.featuresRemaining > 0 && item.allFeatures.length > 0) {
    const popoverId = `apartment-features-${item.id}`;
    const toggle = createElement(
      "button",
      "apartment-card__feature apartment-card__feature--count js-apartment-features-toggle",
      `+${item.featuresRemaining}`
    );
    toggle.type = "button";
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", popoverId);
    toggle.setAttribute("aria-label", "Показать все особенности квартиры");
    toggle.disabled = item.reserved;

    const popover = createElement(
      "div",
      "apartment-card__feature-popover js-apartment-features-popover"
    );
    popover.id = popoverId;
    popover.setAttribute("role", "region");
    popover.setAttribute("aria-label", "Особенности квартиры");
    popover.append(...item.allFeatures.map(createFeature));
    features.append(toggle, popover);
  }

  card.append(header, media, priceBlock, divider, scrim, features);

  if (item.reserved) {
    const reservedScrim = createElement(
      "span",
      "apartment-card__reserved-scrim"
    );
    reservedScrim.setAttribute("aria-hidden", "true");

    const status = createElement("span", "apartment-card__reserved-status");
    status.setAttribute("role", "status");
    status.append(
      createSvgUse(
        "#apartment-reserved",
        18,
        18,
        "apartment-card__reserved-icon"
      ),
      createElement("span", undefined, "Забронировано")
    );
    card.append(reservedScrim, status);
  }

  listItem.append(card);
  return listItem;
}
