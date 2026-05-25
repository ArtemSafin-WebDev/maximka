export default {
  "/index.html": {
    title: "Главная страница",
    hero: {
      image: "/images/hero/bg.webp",
      imageMobile: "/images/hero/bg-mobile.webp",
      eyebrow: "Жилой комплекс «Максима»",
      title: "Новое качество жизни по доступной цене",
      cta: {
        label: "Выбрать квартиру",
        href: "#layouts",
      },
      promo: {
        image: "/images/hero/card-bg.svg",
        imageMobile: "/images/hero/card-bg-mobile.svg",
        title: "Старт продаж",
        description: "Идеальное предложение для вас",
        buttonLabel: "Оставить заявку",
        buttonHref: "#request-dialog",
      },
      tagsLabel: "Преимущества жилого комплекса",
      tags: [
        {
          icon: "/images/hero/icons/1.svg",
          label: "Комфорт-класс",
        },
        {
          icon: "/images/hero/icons/2.svg",
          label: "Двор без машин",
        },
        {
          icon: "/images/hero/icons/3.svg",
          label: "Предчистовая отделка",
        },
        {
          icon: "/images/hero/icons/4.svg",
          label: "Подземный паркинг",
        },
        {
          icon: "/images/hero/icons/5.svg",
          label: "12 мин до м. Авиастроительная",
        },
      ],
    },
    aboutProject: {
      image: "/images/about-project/bg.svg",
      imageMobile: "/images/about-project/bg-mobile.svg",
      label: "О проекте",
      title:
        "ЖК «Максима» — современный дом комфорт-класса с умными планировками в шаговой доступности от метро Авиастроительная",
      summary:
        "Дом переменной этажности 9–13 этажей из 6 секций на 332 квартиры от 20 до 87м². Вся необходимая инфраструктура на первых этажах",
      openLabel: "Подробнее о проекте",
      closeLabel: "Скрыть подробную информацию",
      details: [
        "В «Максиме» будет всё необходимое для комфортной жизни: в коммерческих помещениях на первых этажах откроются минимаркет, кофейня, аптека и салон красоты. Для жителей предусмотрен подземный паркинг с прямым доступом на лифте.",
        "Двор — закрытое приватное пространство без машин и сквозного проезда. Здесь будут ландшафтный дизайн, геопластика и озеленение в несколько уровней. Для детей — площадка с сертифицированным ударопоглощающим покрытием и зонами для малышей и школьников. Для взрослых — воркаут-площадка и лаунж-зона.",
        "Доступны квартиры евроформата с кухней-гостиной и классические с изолированной кухней. В двух — и трёхкомнатных — два санузла. В каждой квартире — балкон или лоджия, увеличенные окна и низкие подоконники. В прихожих — готовые ниши под шкафы. Есть квартиры с мастер-спальнями, гардеробными и просторными кухнями-гостиными, где действительно можно собраться всей семьёй. Все квартиры сдаются с предчистовой отделкой.",
      ],
    },
    gallery: {
      ariaLabel: "Фотогалерея жилого комплекса",
      controlsLabel: "Управление фотогалереей",
      prevLabel: "Предыдущее фото",
      nextLabel: "Следующее фото",
      items: [
        {
          image: "/images/gallery/1.webp",
          width: 3057,
          height: 1800,
          alt: "Вид на жилой комплекс со стороны дороги",
          caption: "До метро «Авиастроительная» — 12 минут пешком.",
        },
        {
          image: "/images/gallery/2.webp",
          width: 3057,
          height: 1800,
          alt: "Фасад жилого комплекса с озеленением",
          caption: "До метро «Авиастроительная» — 12 минут пешком.",
        },
        {
          image: "/images/gallery/3.webp",
          width: 3057,
          height: 1800,
          alt: "Дворовое пространство жилого комплекса",
        },
        {
          image: "/images/gallery/4.webp",
          width: 3057,
          height: 1800,
          alt: "Входная группа жилого комплекса",
        },
        {
          image: "/images/gallery/5.webp",
          width: 3142,
          height: 1850,
          alt: "Архитектура жилого комплекса",
        },
        {
          image: "/images/gallery/6.webp",
          width: 3060,
          height: 1802,
          alt: "Общий вид жилого комплекса",
        },
      ],
    },
    progress: {
      title: "Ход строительства",
      filtersLabel: "Фильтры хода строительства",
      controlsLabel: "Управление слайдером хода строительства",
      prevLabel: "Предыдущее фото хода строительства",
      nextLabel: "Следующее фото хода строительства",
      emptyText: "Фотографии за выбранный период скоро появятся.",
      filters: [
        {
          class: "progress__select progress__select--quarter",
          name: "progress-quarter",
          placeholder: "2 квартал",
          ariaLabel: "Выберите квартал",
          options: [
            {
              value: "1",
              label: "1 квартал",
            },
            {
              value: "2",
              label: "2 квартал",
              checked: true,
            },
            {
              value: "3",
              label: "3 квартал",
            },
            {
              value: "4",
              label: "4 квартал",
            },
          ],
        },
        {
          class: "progress__select progress__select--year",
          name: "progress-year",
          placeholder: "2026 год",
          ariaLabel: "Выберите год",
          options: [
            {
              value: "2026",
              label: "2026 год",
              checked: true,
            },
            {
              value: "2027",
              label: "2027 год",
            },
            {
              value: "2028",
              label: "2028 год",
            },
          ],
        },
      ],
      items: [
        {
          image: "/images/progress/1.webp",
          width: 1410,
          height: 1030,
          alt: "Строительная площадка с краном и грузовой техникой",
          year: "2026",
          quarter: "2",
        },
        {
          image: "/images/progress/2.webp",
          width: 1410,
          height: 1030,
          alt: "Подготовленная дорога на строительной площадке",
          year: "2026",
          quarter: "2",
        },
        {
          image: "/images/progress/3.webp",
          width: 1410,
          height: 1030,
          alt: "Работы на строительной площадке рядом с жилым домом",
          year: "2026",
          quarter: "2",
        },
        {
          image: "/images/progress/4.webp",
          width: 1410,
          height: 1030,
          alt: "Строительная техника на площадке жилого комплекса",
          year: "2026",
          quarter: "2",
        },
        {
          image: "/images/progress/5.webp",
          width: 1410,
          height: 1030,
          alt: "Ход строительных работ на территории комплекса",
          year: "2026",
          quarter: "2",
        },
        {
          image: "/images/progress/6.webp",
          width: 1410,
          height: 1030,
          alt: "Общий вид строительной площадки жилого комплекса",
          year: "2026",
          quarter: "2",
        },
      ],
    },
    features: {
      label: "Особенности проекта",
      title: "Современный дом с продуманной инфраструктурой для всей семьи",
      description:
        "Проект сочетает продуманные планировочные решения с собственной инфраструктурой внутри ЖК — для жизни в ритме большого города.",
      buttonLabel: "Выбрать квартиру",
      buttonHref: "#layouts",
      items: [
        {
          number: "01",
          titleLines: ["Архитектура", "и масштаб"],
          image: "/images/features/1.webp",
          alt: "Архитектура жилого комплекса",
        },
        {
          number: "02",
          titleLines: ["Сервисы внутри", "дома"],
          image: "/images/features/2.webp",
          alt: "Фасад с коммерческими помещениями на первых этажах",
        },
        {
          number: "03",
          titleLines: ["Закрытый двор", "без машин"],
          image: "/images/features/3.webp",
          alt: "Зелёный двор с прогулочной зоной",
        },
        {
          number: "04",
          titleLines: ["Планировки", "для жизни"],
          image: "/images/features/4.webp",
          alt: "Планировка квартиры с видом сверху",
        },
      ],
    },
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
              buttonHref: "#request-dialog",
            },
            {
              image: "/images/solutions/2.webp",
              title: "Однокомнатные",
              area: "от 32,2 до 36,3 м",
              description:
                "Изолированная кухня. Увеличенные окна, балкон или лоджия, встроенные ниши для хранения в прихожей.",
              price: "12 455 000 р",
              buttonLabel: "Подобрать квартиру",
              buttonHref: "#request-dialog",
            },
            {
              image: "/images/solutions/3.webp",
              title: "Двухкомнатные",
              area: "от 55,9 до 59,3 м",
              description:
                "Распашные планировки на две стороны света. Просторные изолированные кухни, отдельная гостиная и спальня.",
              price: "12 455 000 р",
              buttonLabel: "Подобрать квартиру",
              buttonHref: "#request-dialog",
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
              buttonHref: "#request-dialog",
            },
            {
              image: "/images/solutions/5.webp",
              title: "3К",
              area: "от 59,9 до 67,5 м",
              description:
                "Евроформат с просторной кухней-гостиной и двумя изолированными спальнями. Два санузла, вместительная прихожая. Отдельные спальни позволяют каждому иметь своё приватное пространство.",
              price: "12 455 000 р",
              buttonLabel: "Подобрать квартиру",
              buttonHref: "#request-dialog",
            },
            {
              image: "/images/solutions/6.webp",
              title: "4К",
              area: "72,7 м",
              description:
                "Просторная кухня-гостиная наполнена светом благодаря двум широким окнам. Компактный кабинет идеально подходит для работы или творчества, а рядом расположена уютная детская комната.",
              price: "12 455 000 р",
              buttonLabel: "Подобрать квартиру",
              buttonHref: "#request-dialog",
            },
          ],
        },
      ],
    },
    advantages: {
      label: "Преимущества ЖК «Максима»",
      title:
        "Квартиры в ЖК «Максима» с предчистовой отделкой и повышенным комфортом",
      description:
        "От компактных студий до семейных форматов: кухни-гостиные, изолированные спальни, ниши для хранения и балкон или лоджия в каждой квартире",
      controlsLabel: "Управление слайдером преимуществ",
      prevLabel: "Предыдущее преимущество",
      nextLabel: "Следующее преимущество",
      items: [
        {
          image: "/images/advantages/1.webp",
          width: 830,
          height: 1160,
          alt: "Архитектура жилого комплекса",
          title: "Выразительная архитектура",
        },
        {
          image: "/images/advantages/2.webp",
          width: 830,
          height: 1160,
          alt: "Лобби с панорамным остеклением",
          title: "Лобби с панорамным остеклением",
        },
        {
          image: "/images/advantages/3.webp",
          width: 830,
          height: 1160,
          alt: "Интерьер квартиры с продуманной планировкой",
          title: "Умные планировки",
        },
        {
          image: "/images/advantages/4.webp",
          width: 830,
          height: 1160,
          alt: "Квартира с предчистовой отделкой",
          title: "Предчистовая отделка",
        },
        {
          image: "/images/advantages/5.webp",
          width: 830,
          height: 1160,
          alt: "Подземный паркинг жилого комплекса",
          title: "Подземный паркинг",
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
          buttonHref: "#request-dialog",
        },
        {
          image: "/images/promos/2.svg",
          title: "Скидка до 15%",
          titleMobile: "Старт продаж",
          descriptionLines: ["Идеальное предложение", "для вас"],
          descriptionMobileLines: ["Идеальное предложение для", "вас"],
          buttonLabel: "Перейти в каталог",
          buttonLabelMobile: "Оставить заявку",
          buttonHref: "#request-dialog",
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
          buttonHref: "#request-dialog",
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
          buttonHref: "#request-dialog",
        },
        {
          title: "Специальные условия при 100% оплате",
          image: "/images/where-to-buy/2.svg",
          imageMobile: "/images/where-to-buy/2-mobile.svg",
          buttonLabel: "Уточнить у менеджера",
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
            placeholder: "Ваше имя",
            required: true,
          },
          {
            type: "tel",
            name: "phone",
            placeholder: "Ваш телефон",
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
            placeholder: "Ваше имя",
            required: true,
          },
          {
            type: "tel",
            name: "phone",
            placeholder: "Ваш телефон",
            required: true,
          },
          {
            type: "email",
            name: "email",
            placeholder: "Ваша почта",
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
    ],
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
          textarea: true,
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
