import globalContext from "./globalContext.js";

const apartmentImages = [
  {
    src: "/images/apartment-card/layout.webp",
    width: 751,
    height: 1103,
    alt: "Планировка квартиры-студии площадью 22,1 м²",
  },
  {
    src: "/images/apartment-card/floor.webp",
    width: 860,
    height: 540,
    alt: "Расположение квартиры-студии на этаже",
    className: "apartment-card__image--floor",
  },
];

const featureSets = [
  ["Окно в ванной", "Просторная кухня", "Балкон"],
  ["Санузел с полноценной ванной", "Балкон"],
];

const apartments = Array.from({ length: 11 }, (_, index) => ({
  id: `catalog-${index + 1}`,
  modifier: "catalog",
  href: "/apartment.html",
  title: "Квартира - студия",
  area: "22,1 м²",
  floor: "3 / 13 этаж",
  images: apartmentImages,
  hasMultipleImages: true,
  price: "6 735 319 ₽",
  oldPrice: index < 3 ? "6 935 117 ₽" : undefined,
  discount: index < 3 ? "Скидка 199 798 ₽" : undefined,
  mortgage: index < 3 ? undefined : "Ипотека от 35 041 ₽/мес",
  features: featureSets[index % featureSets.length],
  allFeatures: [
    "Окно в ванной",
    "Просторная кухня",
    "Санузел с полноценной ванной",
    "Изолированная спальня",
    "Балкон",
    "Кухня-гостиная",
    "2 санузла",
  ],
  featuresRemaining: 5,
  reserved: index === 1,
}));

const formAgreements = [
  {
    name: "personal-data",
    required: true,
    textBefore: "Я согласен на обработку персональных данных и принимаю ",
    policy: {
      href: "#",
      label: "условия политики конфиденциальности",
    },
  },
];

export default {
  "/catalog.html": {
    title: "Каталог квартир — ЖК «Максима»",
    header: {
      ...globalContext.header,
      phone: "+7 (4722) 78-95-49",
      phoneHref: "tel:+74722789549",
      nav: [
        { label: "О проекте", href: "/about.html" },
        { label: "Расположение", href: "/about.html#location" },
        { label: "Квартиры", href: "/catalog.html" },
        { label: "Акции", href: "/#promotions" },
        { label: "Контакты", href: "/contacts.html" },
      ],
      apartments: {
        ...globalContext.header.apartments,
        href: "/catalog.html",
      },
    },
    catalog: {
      title: "Подбор квартир",
      breadcrumbs: {
        ariaLabel: "Хлебные крошки",
        items: [
          { label: "Главная", href: "/" },
          { label: "Каталог квартир" },
        ],
      },
      count: 345,
      totalCount: 107,
      moreCount: 15,
      filters: {
        rooms: [
          { label: "Студия", value: "studio", checked: true, wide: true },
          { label: "1", value: "1", checked: true },
          { label: "2", value: "2" },
          { label: "3", value: "3" },
        ],
        price: {
          class: "catalog-filter__group--price",
          label: "Стоимость, ₽",
          min: 3678809,
          max: 15500000,
          valueMin: 3678809,
          valueMax: 10932340,
          displayMin: "3 678 809",
          displayMax: "10 932 340",
          step: 1,
        },
        area: {
          class: "catalog-filter__group--area",
          label: "Площадь, м²",
          min: 22,
          max: 68,
          valueMin: 22,
          valueMax: 68,
          displayMin: "22",
          displayMax: "68",
          step: 1,
        },
        entrances: [
          { label: "1", value: "1", checked: true },
          { label: "2", value: "2" },
          { label: "3", value: "3", checked: true },
          { label: "4", value: "4", checked: true },
          { label: "5", value: "5" },
          { label: "6", value: "6" },
        ],
        floor: {
          min: 2,
          max: 13,
          valueMin: 2,
          valueMax: 13,
          displayMin: "2",
          displayMax: "13",
          options: [
            { label: "Не первый", value: "not-first", checked: true },
            { label: "Не последний", value: "not-last" },
          ],
        },
        features: [
          { label: "2 санузла", value: "two-bathrooms" },
          { label: "Окно в ванной", value: "bathroom-window", checked: true },
          { label: "Мастер-спальня", value: "master-bedroom" },
          { label: "Балкон", value: "balcony" },
          { label: "Просторная кухня", value: "spacious-kitchen", checked: true },
          { label: "Кухня-гостиная", value: "kitchen-living-room" },
          { label: "Изолированная спальня", value: "isolated-bedroom" },
        ],
      },
      sortOptions: [
        { label: "Сначала дешевле", value: "price-asc" },
        { label: "Сначала дороже", value: "price-desc" },
        { label: "Сначала больше", value: "area-desc" },
      ],
      itemsBeforeForm: apartments.slice(0, 8),
      itemsAfterForm: apartments.slice(8),
      contactRequest: {
        id: "catalog-contact-request",
        title: "Оставьте контакт",
        subtitle: "Наш эксперт подберет\nподходящий вариант",
        action: "#",
        successModalId: "success-dialog",
        errorModalId: "error-dialog",
        submitLabel: "Отправить заявку",
        fields: [
          { type: "text", name: "name", placeholder: "Имя*", required: true },
          { type: "tel", name: "phone", placeholder: "Телефон*", required: true },
        ],
      },
      mortgageOffer: {
        title: "Ипотека от 3,5%",
        descriptionStart: "Поможем с оформлением IT-ипотеки",
        descriptionEnd: "или семейной",
        buttonHref: "#request-dialog",
        buttonLabel: "Получить консультацию",
        buttonLabelMobile: "Получить консультацию",
      },
    },
    modals: [
      {
        id: "callback-dialog",
        formName: "callback",
        title: "Заказать звонок",
        description: "Менеджер свяжется с вами и согласует время консультации",
        submitLabel: "Оставить заявку",
        fields: [
          { type: "text", name: "name", placeholder: "Имя*", required: true },
          { type: "tel", name: "phone", placeholder: "Телефон*", required: true },
        ],
        agreements: formAgreements,
      },
      {
        id: "request-dialog",
        formName: "request",
        title: "Получить консультацию",
        description: "Эксперт поможет подобрать подходящую ипотечную программу",
        submitLabel: "Оставить заявку",
        fields: [
          { type: "text", name: "name", placeholder: "Имя*", required: true },
          { type: "tel", name: "phone", placeholder: "Телефон*", required: true },
        ],
        agreements: formAgreements,
      },
    ],
    successModal: {
      id: "success-dialog",
      title: "Спасибо! Ваша заявка отправлена",
      description: "Менеджер свяжется с вами в ближайшее время",
    },
    errorModal: {
      id: "error-dialog",
      title: "Заявку не удалось отправить",
      description: "Попробуйте еще раз или свяжитесь с нами по телефону",
    },
  },
};
