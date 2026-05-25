export default {
  "/index.html": {
    title: "Главная страница",
    promos: {
      title: "Акции",
      items: [
        {
          image: "/images/promos/1.svg",
          title: "Скидка до 15%",
          titleMobile: "Старт продаж",
          description: "Идеальное предложение для вас",
          descriptionMobileLines: ["Идеальное предложение для", "вас"],
          buttonLabel: "Перейти в каталог",
          buttonLabelMobile: "Оставить заявку",
          buttonHref: "#individual-conditions",
        },
        {
          image: "/images/promos/2.svg",
          title: "Скидка до 15%",
          titleMobile: "Старт продаж",
          description: "Идеальное предложение для вас",
          descriptionMobileLines: ["Идеальное предложение для", "вас"],
          buttonLabel: "Перейти в каталог",
          buttonLabelMobile: "Оставить заявку",
          buttonHref: "#individual-conditions",
        },
        {
          image: "/images/promos/3.svg",
          themeClass: "promos__card--dark",
          title: "Скидка до 15%",
          titleMobile: "Старт продаж",
          description: "Идеальное предложение для вас",
          descriptionMobileLines: ["Идеальное предложение для", "вас"],
          buttonLabel: "Перейти в каталог",
          buttonLabelMobile: "Оставить заявку",
          buttonHref: "#individual-conditions",
        },
      ],
    },
    participants: {
      label: "Участники проекта",
      title:
        "Надёжность застройщика, скорость строительства и безопасность сделки — самые важные факторы при покупке недвижимости",
      items: [
        {
          image: "/images/participants/1.webp",
          alt: "КСТ",
          roleLines: ["Генеральный", "подрядчик"],
        },
        {
          image: "/images/participants/2.webp",
          alt: "Альянс Девелопмент",
          roleLines: ["Девелопер", "проекта"],
        },
        {
          image: "/images/participants/3.webp",
          alt: "Сбер Банк",
          roleLines: ["Проектное", "финансирование"],
        },
        {
          image: "/images/participants/4.webp",
          alt: "Altera",
          roleLines: ["Партнёр", "по реализации"],
        },
      ],
    },
    whereToBuy: {
      title: "Как купить",
      items: [
        {
          title: "Рассрочка 0%",
          descriptionLines: ["До конца строительства.", "ПВ от 10%."],
          image: "/images/where-to-buy/1.svg",
          imageMobile: "/images/where-to-buy/1-mobile.svg",
          buttonLabel: "Уточнить у менеджера",
          buttonHref: "#individual-conditions",
        },
        {
          title: "Специальные условия при 100% оплате",
          image: "/images/where-to-buy/2.svg",
          imageMobile: "/images/where-to-buy/2-mobile.svg",
          buttonLabel: "Уточнить у менеджера",
          buttonHref: "#individual-conditions",
        },
      ],
    },
    individualConditions: {
      image: "/images/individual-conditions/bg.webp",
      imageMobile: "/images/individual-conditions/bg-mobile.webp",
      title: "Получите индивидуальные условия",
      phoneLabel: "Телефон:",
      phone: "+7 (495) 132-07-08",
      phoneHref: "tel:+74951320708",
      submitLabel: "Оставить заявку",
      fields: [
        {
          type: "text",
          name: "name",
          placeholder: "Ваше имя",
          required: true,
        },
        {
          type: "email",
          name: "email",
          placeholder: "Ваша почта",
          required: true,
        },
        {
          type: "tel",
          name: "phone",
          placeholder: "Ваш телефон",
          required: true,
        },
        {
          type: "text",
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
          text:
            "Я согласен на получение рекламных и информационных email-рассылок",
        },
      ],
    },
  },
};
