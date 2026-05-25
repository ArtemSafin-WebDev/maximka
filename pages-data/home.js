export default {
  "/index.html": {
    title: "Главная страница",
    solutions: {
      label: "Планировочные решения",
      titleLines: [
        "Продуманные планировки с акцентом",
        "на высокую ликвидность",
      ],
      descriptionLines: [
        "Рациональное проектирование без лишних метров: максимум полезной жилплощади",
        "для работы и отдыха всех членов семьи",
      ],
      tabs: [
        {
          title: "Классические планировки",
          items: [
            {
              image: "/images/solutions/1.webp",
              title: "Квартиры-студии",
              area: "от 20 до 26 м",
              description:
                "В прихожей — ниша для хранения, в ванной комнате поместится стиральная машина и в ряде планировок полноценная ванна.",
              price: "12 455 000 р",
              buttonLabel: "Подобрать квартиру",
              buttonHref: "#individual-conditions",
            },
            {
              image: "/images/solutions/2.webp",
              title: "Однокомнатные",
              area: "от 32,2 до 36,3 м",
              description:
                "Изолированная кухня. Увеличенные окна, балкон или лоджия, встроенные ниши для хранения в прихожей.",
              price: "12 455 000 р",
              buttonLabel: "Подобрать квартиру",
              buttonHref: "#individual-conditions",
            },
            {
              image: "/images/solutions/3.webp",
              title: "Двухкомнатные",
              area: "от 55,9 до 59,3 м",
              description:
                "Распашные планировки на две стороны света. Просторные изолированные кухни, отдельная гостиная и спальня.",
              price: "12 455 000 р",
              buttonLabel: "Подобрать квартиру",
              buttonHref: "#individual-conditions",
            },
          ],
        },
        {
          title: "Евроформат",
          items: [
            {
              image: "/images/solutions/4.webp",
              title: "2К",
              area: "от 33 до 40,7 м",
              description:
                "Современные евро-планировки с кухней-гостиной и изолированной спальней. Компактный метраж не в ущерб приватности: общая зона подходит для семейных вечеров, а спальня остаётся тихим личным пространством.",
              price: "12 455 000 р",
              buttonLabel: "Подобрать квартиру",
              buttonHref: "#individual-conditions",
            },
            {
              image: "/images/solutions/5.webp",
              title: "3К",
              area: "от 59,9 до 67,5 м",
              description:
                "Евроформат с просторной кухней-гостиной и двумя изолированными спальнями. Два санузла, вместительная прихожая. Отдельные спальни позволяют каждому иметь своё приватное пространство.",
              price: "12 455 000 р",
              buttonLabel: "Подобрать квартиру",
              buttonHref: "#individual-conditions",
            },
            {
              image: "/images/solutions/6.webp",
              title: "4К",
              area: "72,7 м",
              description:
                "Просторная кухня-гостиная наполнена светом благодаря двум широким окнам. Компактный кабинет идеально подходит для работы или творчества, а рядом расположена уютная детская комната.",
              price: "12 455 000 р",
              buttonLabel: "Подобрать квартиру",
              buttonHref: "#individual-conditions",
            },
          ],
        },
      ],
    },
    promos: {
      title: "Акции",
      items: [
        {
          image: "/images/promos/1.svg",
          title: "Скидка до 15%",
          titleMobile: "Старт продаж",
          descriptionLines: ["Идеальное предложение", "для вас"],
          descriptionMobileLines: ["Идеальное предложение для", "вас"],
          buttonLabel: "Перейти в каталог",
          buttonLabelMobile: "Оставить заявку",
          buttonHref: "#individual-conditions",
        },
        {
          image: "/images/promos/2.svg",
          title: "Скидка до 15%",
          titleMobile: "Старт продаж",
          descriptionLines: ["Идеальное предложение", "для вас"],
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
          descriptionLines: ["Идеальное предложение", "для вас"],
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
