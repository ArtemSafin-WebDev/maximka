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

const similarApartments = Array.from({ length: 8 }, (_, index) => ({
  id: index + 1,
  href: "/apartment.html",
  title: "Квартира - студия",
  area: "22,1 м²",
  floor: "3 / 13 этаж",
  images: index === 0 ? apartmentImages.slice(0, 1) : apartmentImages,
  hasMultipleImages: index !== 0 && apartmentImages.length > 1,
  price: "6 735 319 ₽",
  oldPrice: "6 935 117 ₽",
  discount: "Скидка 199 798 ₽",
  features: ["Окно в ванной", "Просторная кухня"],
  allFeatures: [
    "Окно в ванной",
    "Просторная кухня",
    "Изолированная спальня",
    "Балкон",
    "Кухня-гостиная",
    "2 санузла",
  ],
  featuresRemaining: 5,
}));

export default {
  "/apartment.html": {
    title: "Квартира — ЖК «Максима»",
    apartmentHero: {
      breadcrumbs: {
        ariaLabel: "Хлебные крошки",
        items: [
          { label: "Главная", href: "/" },
          { label: "Каталог квартир", href: "/#layouts" },
          { label: "Студия, 22,1 м²" },
        ],
      },
      backHref: "/#layouts",
      backLabel: "Назад",
      sunLabel: "Солнце",
      tabs: [
        {
          label: "Проект квартиры",
          image: "/images/apartment-hero/layout.webp",
          imageWidth: 1274,
          imageHeight: 1115,
          imageAlt: "Проект квартиры-студии площадью 22,1 м²",
          active: true,
          selected: "true",
          tabIndex: "0",
        },
        {
          label: "3D-планировка",
          image: "/images/apartment-hero/layout.webp",
          imageWidth: 1274,
          imageHeight: 1115,
          imageAlt: "Трёхмерная планировка квартиры-студии",
          selected: "false",
          tabIndex: "-1",
        },
        {
          label: "На этаже",
          image: "/images/apartment-hero/layout.webp",
          imageWidth: 1274,
          imageHeight: 1115,
          imageAlt: "Расположение квартиры на этаже",
          selected: "false",
          tabIndex: "-1",
        },
      ],
      title: "Квартира-студия 22,1 м²",
      description:
        "Cтудия с балконом, шкаф для организации хранения при входе",
      priceLabel: "Цена",
      price: "6 735 319 ₽",
      oldPrice: "6 935 117 ₽",
      mortgage: "Ипотека от 35 041 ₽/мес",
      discount: "Скидка 199 798 ₽",
      characteristicsLabel: "Все характеристики",
      characteristicsCollapseLabel: "Свернуть",
      characteristics: [
        { label: "Общая площадь", value: "22,1 м²" },
        { label: "Жилая площадь", value: "14,3 м²" },
        { label: "Санузел", value: "3,7 м²" },
        { label: "Холл", value: "3,3 м²" },
        { label: "Балкон", value: "2,9 м²" },
        { label: "Подъезд", value: "1/6" },
        { label: "Этаж", value: "3/9" },
        { label: "Комнатность", value: "1" },
        { label: "№ квартиры", value: "33" },
        { label: "Высота потолков", value: "2,8 м" },
        { label: "Вид", value: "на ул. Максимова" },
      ],
      ctaLabel: "Забронировать",
      ctaShortLabel: "Забронировать",
      ctaHref: "#request-dialog",
    },
    promos: {
      title: "Акции",
      titleMobile: "Спецпредложения",
      showcaseLabel: "Специальные предложения жилого комплекса",
      showcaseItems: [
        {
          variantClass: "promos-showcase__slide--discount",
          image: "/images/promos-showcase/discount-desktop.webp",
          imageMobile: "/images/promos-showcase/discount-mobile.webp",
          imageWidth: 3440,
          imageHeight: 1570,
          imageAlt: "Вид сверху на жилой комплекс и благоустроенный двор",
          titlePrefix: "Скидка до",
          title: "500 000 ₽",
          descriptionLines: ["Сотрудникам заводов", "и участникам СВО"],
          descriptionMobile: "Сотрудникам заводов и участникам СВО",
          discount: {
            value: "3%",
            label: "к основной скидке",
            note: "Оплата без субсидирования или cash",
          },
          buttonLabel: "Получить расчет",
          buttonHref: "#request-dialog",
        },
        {
          variantClass: "promos-showcase__slide--trade-in",
          image: "/images/promos-showcase/trade-in-desktop.webp",
          imageMobile: "/images/promos-showcase/trade-in-mobile.webp",
          imageWidth: 3410,
          imageHeight: 1334,
          imageAlt: "Фасады жилого комплекса со стороны благоустроенного сквера",
          title: "Трейд-ин",
          descriptionLines: ["Подробности", "у менеджера"],
          descriptionMobile: "Подробности у менеджера",
          buttonLabel: "Связаться",
          buttonHref: "#request-dialog",
        },
      ],
      items: [
        {
          image: "/images/promos/1.svg",
          imageMobile: "/images/promos/mobile-1.svg",
          title: "Старт продаж!",
          descriptionLines: ["Подберём оптимальное", "предложение для вас"],
          buttonLabel: "Получить консультацию",
          buttonHref: "#request-dialog",
        },
        {
          image: "/images/promos/2.svg",
          imageMobile: "/images/promos/mobile-2.svg",
          title: "Ипотека от 3,5%",
          descriptionLines: ["Подберем для вас выгодную", "программу"],
          buttonLabel: "Получить консультацию",
          buttonHref: "#request-dialog",
        },
        {
          image: "/images/promos/3.svg",
          imageMobile: "/images/promos/mobile-3.svg",
          themeClass: "promos__card--dark",
          title: "Рассрочка от 10%",
          descriptionLines: ["Без удорожания стоимости"],
          buttonLabel: "Получить консультацию",
          buttonHref: "#request-dialog",
        },
      ],
    },
    modals: [
      {
        id: "callback-dialog",
        formName: "callback",
        title: "Заказать звонок",
        description:
          "Менеджер свяжется с вами для подтверждения заявки и согласует время консультации",
        submitLabel: "Оставить заявку",
        fields: [
          {
            type: "text",
            name: "name",
            placeholder: "Имя*",
            required: true,
          },
          {
            type: "tel",
            name: "phone",
            placeholder: "Телефон*",
            required: true,
          },
        ],
        agreements: [
          {
            name: "personal-data",
            required: true,
            textBefore:
              "Я согласен на обработку персональных данных и принимаю ",
            policy: {
              href: "#",
              label: "условия политики конфиденциальности",
            },
          },
        ],
      },
      {
        id: "request-dialog",
        formName: "request",
        title: "Оставить заявку",
        description:
          "Менеджер свяжется с вами для подтверждения заявки и согласует время консультации",
        submitLabel: "Оставить заявку",
        fields: [
          {
            type: "text",
            name: "name",
            placeholder: "Имя*",
            required: true,
          },
          {
            type: "tel",
            name: "phone",
            placeholder: "Телефон*",
            required: true,
          },
          {
            type: "email",
            name: "email",
            placeholder: "Почта",
          },
          {
            textarea: true,
            name: "comment",
            placeholder: "Комментарий",
          },
        ],
        agreements: [
          {
            name: "personal-data",
            required: true,
            textBefore:
              "Я согласен на обработку персональных данных и принимаю ",
            policy: {
              href: "#",
              label: "условия политики конфиденциальности",
            },
          },
          {
            name: "newsletter",
            required: true,
            text: "Я согласен на получение рекламных и информационных email-рассылок",
          },
        ],
      },
    ],
    successModal: {
      id: "success-dialog",
      title: "Спасибо! Ваша заявка отправлена",
      description:
        "Менеджер свяжется с вами для подтверждения заявки и согласует время консультации",
    },
    errorModal: {
      id: "error-dialog",
      title: "Заявку не удалось отправить",
      description:
        "Попробуйте отправить форму ещё раз или свяжитесь с нами по телефону",
    },
    individualConditions: {
      modifier: "apartment",
      image: "/images/individual-conditions/apartment/bg.webp",
      imageMobile: "/images/individual-conditions/apartment/bg-mobile.svg",
      imageWidth: 1722,
      imageHeight: 1147,
      imageMobileWidth: 1756,
      imageMobileHeight: 1174,
      imageLoading: "eager",
      title: "Поможем найти квартиру",
      subtitle: "В которую захочется возвращаться",
      subtitleLines: ["В которую захочется", "возвращаться"],
      formTitle: "Мы свяжемся с вами в ближайшее время",
      submitLabel: "Оставить заявку",
      fields: [
        {
          type: "text",
          name: "name",
          placeholder: "Имя*",
          required: true,
        },
        {
          type: "tel",
          name: "phone",
          placeholder: "Телефон*",
          required: true,
        },
        {
          textarea: true,
          name: "comment",
          placeholder: "Комментарий",
        },
      ],
      agreements: [
        {
          name: "personal-data",
          required: true,
          textBefore: "Я согласен на обработку персональных данных и принимаю ",
          policy: {
            href: "#",
            label: "условия политики конфиденциальности",
          },
        },
        {
          name: "newsletter",
          required: true,
          text: "Я согласен на получение рекламных и информационных email-рассылок",
        },
      ],
    },
    apartmentBenefits: {
      eyebrow: "О квартире",
      title: "Дополнительный комфорт для вашей жизни",
      items: [
        {
          image: "/images/apartment-benefits/1.webp",
          imageWidth: 673,
          imageHeight: 704,
          title: "Функциональные планировки",
          titleMobile: "Предчистовая отделка",
          description:
            "Минимум коридоров, просторные кухни-гостиные, изолированные спальни",
        },
        {
          image: "/images/apartment-benefits/2.webp",
          imageWidth: 683,
          imageHeight: 1024,
          title: "Балкон в каждой квартире",
          description:
            "Дополнительное пространство — от студии до большой квартиры",
        },
        {
          image: "/images/apartment-benefits/3.webp",
          imageWidth: 1024,
          imageHeight: 509,
          title: "От квартиры до машины на лифте",
          description:
            "Прямой доступ из секции в тёплый подземный паркинг без выхода на улицу",
        },
        {
          image: "/images/apartment-benefits/4.webp",
          imageWidth: 643,
          imageHeight: 963,
          title: "Все рядом с домом",
          description:
            "Метро, школы, сады, спорт и магазины — в пешей доступности",
        },
        {
          image: "/images/apartment-benefits/5.webp",
          imageWidth: 673,
          imageHeight: 704,
          title: "Просторное дизайнерское лобби",
          description:
            "Панорамное остекление, зона ожидания, отдельная колясочная",
        },
        {
          image: "/images/apartment-benefits/6.webp",
          imageWidth: 1280,
          imageHeight: 1024,
          title: "Предчистовая отделка",
          description: "Трудоёмкие этапы ремонта берёт на себя застройщик",
        },
      ],
    },
    apartmentRecommendations: {
      titleFirstLine: "Похожие варианты",
      titleSecondLine: "для вашего будущего",
      items: similarApartments,
    },
    apartmentOptions: {
      title: "Парковка и кладовая",
      items: [
        {
          theme: "parking",
          title: "Теплый подземный паркинг",
          titleLines: ["Теплый подземный", "паркинг"],
          description:
            "С доступом на лифте убережет автомобиль от непогоды и ваши руки от тяжелых покупок",
          descriptionLines: [
            "С доступом на лифте убережет",
            "автомобиль от непогоды и ваши",
            "руки от тяжелых покупок",
          ],
          image: "/images/apartment-options/parking.webp",
          imageMobile: "/images/apartment-options/parking-mobile.webp",
          imageWidth: 1750,
          imageHeight: 899,
          alt: "Подземный паркинг с автомобилем",
          buttonLabel: "Выбрать",
          buttonHref: "/#layouts",
        },
        {
          theme: "storage",
          title: "Вместительная кладовая",
          titleLines: ["Вместительная", "кладовая"],
          description:
            "Спортивный инвентарь и сезонные вещи всегда будут на своем месте",
          descriptionLines: [
            "Спортивный инвентарь",
            "и сезонные вещи всегда будут",
            "на своем месте",
          ],
          image: "/images/apartment-options/storage.webp",
          imageMobile: "/images/apartment-options/storage-mobile.webp",
          imageWidth: 1700,
          imageHeight: 874,
          alt: "Кладовая с системой хранения",
          buttonLabel: "Выбрать",
          buttonHref: "/#layouts",
        },
      ],
    },
  },
};
