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
