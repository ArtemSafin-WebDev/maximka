import homePages from "./home.js";

const callbackModal = {
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
      textBefore: "Я согласен на обработку персональных данных и принимаю ",
      policy: {
        href: "#",
        label: "условия политики конфиденциальности",
      },
    },
  ],
};

export default {
  "/about.html": {
    title: "О проекте — ЖК «Максима»",
    aboutIntro: {
      image: "/images/about-intro/bg.webp",
      imageMobile: "/images/about-intro/bg-mobile.webp",
      title: "ЖК «Максима» — современный комфорт в\u00a0привычном\u00a0районе",
      description:
        "Новый монолитно-кирпичный дом. Все жилые помещения будут сдаваться с качественной предчистовой отделкой (white box), что позволит вам избежать черновых строительных работ и быстро сделать финальный ремонт",
      stats: [
        {
          value: "332",
          label: "Квартиры",
        },
        {
          value: "9–13",
          label: "Переменная этажность",
        },
      ],
      primaryAction: {
        label: "Выбрать квартиру",
        href: "/#layouts",
      },
      secondaryAction: {
        label: "Записаться на встречу",
        href: "#callback-dialog",
      },
      status: {
        label: "Статус проекта",
        title: "Возведение монолитного каркаса",
        href: "#construction-stage",
        image: "/images/about-intro/status.webp",
      },
    },
    projectLocation: {
      titleLines: [
        "Локация и инфраструктура:",
        "все для комфортной жизни",
      ],
      description:
        "Жилой комплекс «Максима» возводится на пересечении улиц Максимова и Годовикова в Казани. Это тихий и развитый микрорайон с устоявшейся городской инфраструктурой.",
      cards: [
        {
          image: "/images/project-location/transport.webp",
          imageClass: "project-location-card__image--transport",
          imageLoading: "eager",
          title: "Транспортная доступность",
          description:
            "Всего 12–15 минут пешком до станции метро «Авиастроительная». До делового центра Казани на автомобиле можно добраться за 20 минут",
        },
        {
          image: "/images/project-location/ecology.webp",
          imageClass: "project-location-card__image--ecology",
          imageLoading: "lazy",
          title: "Благоустройство и экология",
          description:
            "В шаговой доступности находятся Караваевский парк и парк «Крылья Советов» — отличные места для прогулок и отдыха на свежем воздухе",
        },
        {
          image: "/images/project-location/comfort.webp",
          imageClass: "project-location-card__image--comfort",
          imageLoading: "lazy",
          title: "Внутренний комфорт",
          description:
            "Проектом предусмотрен закрытый безопасный двор без машин с круглосуточным видеонаблюдением, собственный подземный паркинг и коммерческие помещения под магазины и аптеки на первом этаже дома",
        },
      ],
    },
    aboutDeveloper: {
      label: "О застройщике",
      titleSegments: [
        {
          text: "Альянс Девелопмент — компания более 9 лет проектирует",
          desktopBreak: true,
        },
        {
          text: "и реализует жилые комплексы",
          mobileBreak: true,
        },
        {
          text: "и коттеджные поселки нового поколения в Москве и Казани",
        },
      ],
      descriptionSegments: [
        {
          text: "Каждый проект — это тщательно продуманная концепция, современная архитектура, развитая инфраструктура",
          mobileBreak: true,
        },
        {
          text: "и пространство, созданное",
          desktopBreak: true,
        },
        {
          text: "для комфортной жизни",
        },
      ],
    },
    reliablePartner: {
      label: "Надежный партнер",
      name: "Сбер Банк",
      descriptionSegments: [
        {
          text: "Проектное финансирование",
          mobileBreak: true,
        },
        {
          text: " и безопасность",
          desktopBreak: true,
        },
        {
          text: " каждой сделки",
        },
      ],
      logo: "/images/reliable-partner/sber-bank.svg",
      illustration: "/images/reliable-partner/security.webp",
    },
    constructionStage: {
      label: "Этап строительства",
      mobileLabel: "Этапы строительства",
      title: "Котлован",
      completion: "Завершение этапа: 3 квартал 2026 года",
      onlineLabel: "Сейчас онлайн",
      image: "/images/construction-stage/excavation.webp",
      imageAlt: "Вид на строящийся жилой комплекс «Максима»",
      playLabel: "Смотреть трансляцию со стройплощадки",
    },
    progress: homePages["/index.html"].progress,
    aboutApartments: {
      sliderLabel: "Преимущества квартир",
      slides: [
        {
          title: "Каждый метр работает для вас",
          description:
            "Без длинных коридоров и пустых метров. Просторные кухни-гостиные, места для хранения, балконы и продуманные решения делают каждую квартиру комфортной",
          images: [
            {
              src: "/images/about-apartments/interior.webp",
              alt: "Светлая кухня-гостиная с продуманной зоной отдыха",
              className: "about-apartments__image--interior",
            },
          ],
        },
        {
          title: "Меньше ремонта — больше времени на переезд",
          description:
            "Все основные работы уже выполнены: стены подготовлены, пол выровнен, коммуникации разведены. Остается только выбрать материалы и оформить интерьер по своему вкусу.",
          images: [
            {
              src: "/images/about-apartments/white-box.webp",
              alt: "Квартира с предчистовой отделкой и панорамным окном",
              className: "about-apartments__image--white-box",
            },
          ],
        },
        {
          title: "Больше естественного света каждый день",
          description:
            "Увеличенные окна делают квартиры визуально просторнее и наполняют комнаты светом даже в пасмурные дни",
          images: [
            {
              src: "/images/about-apartments/natural-light.webp",
              alt: "Светлая кухня с увеличенным окном",
              className: "about-apartments__image--natural-light",
            },
          ],
        },
      ],
    },
    aboutGallery: {
      title: "Галерея",
      moreLabel: "Загрузить еще",
      items: [
        {
          image: "/images/about-gallery/1.webp",
          width: 1280,
          height: 837,
          alt: "Семейная пара в новой квартире",
        },
        {
          image: "/images/about-gallery/2.webp",
          width: 1280,
          height: 840,
          alt: "Отец играет с ребенком в парке",
        },
        {
          image: "/images/about-gallery/3.webp",
          width: 1280,
          height: 853,
          alt: "Семья с маленьким ребенком дома",
        },
        {
          image: "/images/about-gallery/4.webp",
          width: 1280,
          height: 853,
          alt: "Родители играют с ребенком на прогулке",
        },
        {
          image: "/images/about-gallery/5.webp",
          width: 1280,
          height: 853,
          alt: "Девушка читает книгу в кафе",
        },
        {
          image: "/images/about-gallery/6.webp",
          width: 1280,
          height: 844,
          alt: "Мама гуляет с ребенком в зеленом парке",
        },
      ],
    },
    meetingCta: {
      title: "Запишитесь на встречу",
      descriptionStart:
        "Подберем планировку под ваши задачи, расскажем",
      descriptionEnd:
        "о преимуществах проекта и поможем выбрать наиболее выгодный вариант покупки.",
      buttonLabel: "Выбрать дату встречи",
      buttonLabelMobile: "Записаться на экскурсию",
      href: "#callback-dialog",
      image: "/images/meeting-cta/bg.svg",
      imageMobile: "/images/meeting-cta/bg-mobile.svg",
    },
    modals: [callbackModal],
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
  },
};
