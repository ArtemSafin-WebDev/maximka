export default {
  "/index.html": {
    title: "Главная страница",
    hero: {
      image: "/images/hero/bg.webp",
      imageMobile: "/images/hero/bg-mobile.webp",
      eyebrow: "Жилой комплекс на Максимова",
      title: "Новое качество жизни по доступной цене",
      cta: {
        label: "Выбрать квартиру",
        href: "#layouts",
      },
      promo: {
        image: "/images/hero/card-bg.svg",
        imageMobile: "/images/hero/card-bg-mobile.svg",
        title: "Старт продаж",
        description: "Подберём оптимальное предложение для вас",
        buttonLabel: "Оставить заявку",
        buttonHref: "#request-dialog",
      },
      tagsLabel: "Преимущества жилого комплекса",
      tags: [
        {
          icon: "/images/hero/icons/buildings.svg",
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
          icon: "/images/hero/icons/garage.svg",
          label: "Подземный паркинг",
        },
        {
          icon: "/images/hero/icons/5.svg",
          label: "12 мин. до м. Авиастроительная",
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
      mobileCloseLabel: "Скрыть",
      details: [
        "В «Максиме» будет всё необходимое для комфортной жизни: в коммерческих помещениях на первых этажах откроются минимаркет, кофейня, аптека и салон красоты. Для жителей предусмотрен подземный паркинг с прямым доступом на лифте.",
        "Двор — закрытое приватное пространство без машин и сквозного проезда. Здесь будут ландшафтный дизайн, геопластика и озеленение в несколько уровней. Для детей — площадка с сертифицированным ударопоглощающим покрытием и зонами для малышей и школьников. Для взрослых — воркаут-площадка и лаунж-зона.",
        "Доступны квартиры евроформата с кухней-гостиной и классические с изолированной кухней. В двух — и трёхкомнатных — два санузла. В каждой квартире — балкон или лоджия, увеличенные окна и низкие подоконники. В прихожих — готовые ниши под шкафы. Есть квартиры с мастер-спальнями, гардеробными и просторными кухнями-гостиными, где действительно можно собраться всей семьёй. Все квартиры сдаются с предчистовой отделкой.",
      ],
    },
    infrastructure: {
      label: "Максимум комфорта",
      title:
        "ЖК «Максима» расположен в центральной части Авиастроительного района — одном из самых самодостаточных в Казани",
      description:
        "До метро — 12 минут пешком, до остановки «Максимова» — 150 метров. Школы, сады, магазины, спорт и медицина — рядом с домом.",
      cta: {
        label: "Назначить встречу",
        href: "#request-dialog",
      },
      ctaMobile: {
        label: "Выбрать квартиру",
        href: "#layouts",
      },
      defaultCategoryLabel: "Вся инфраструктура",
      filtersLabel: "Фильтр инфраструктуры на карте",
      map: {
        apiKey: "80bff7c6-235c-4656-a3f5-125be62881db",
        ariaLabel: "Карта инфраструктуры рядом с ЖК Максима",
        center: "49.0992,55.8605",
        zoom: "15.6",
        complex: {
          title: "ЖК «Максима»",
          coordinates: "49.10198,55.85944",
          contour:
            "49.10134,55.85964;49.10215,55.85975;49.10229,55.85952;49.10262,55.85958;49.10278,55.85932;49.10243,55.85925;49.10234,55.85912;49.10155,55.85923;49.10134,55.85964",
          icon: "/images/infrastructure/complex-marker.svg",
        },
      },
      categories: [
        {
          id: "all",
          label: "Вся инфраструктура",
          icon: "/images/infrastructure/all.svg",
          active: true,
        },
        {
          id: "transport",
          label: "Транспорт",
          icon: "/images/infrastructure/transport.svg",
        },
        {
          id: "school",
          label: "Школы",
          icon: "/images/infrastructure/school.svg",
        },
        {
          id: "kindergarten",
          label: "Детские сады",
          icon: "/images/infrastructure/kindergarten.svg",
        },
        {
          id: "sport",
          label: "Спорт для взрослых и детей",
          icon: "/images/infrastructure/sport.svg",
        },
        {
          id: "medicine",
          label: "Медицина и здоровье",
          icon: "/images/infrastructure/medicine.svg",
        },
        {
          id: "shop",
          label: "Магазины и сервисы",
          icon: "/images/infrastructure/shop.svg",
        },
        {
          id: "park",
          label: "Парки",
          icon: "/images/infrastructure/park.svg",
        },
      ],
      points: [
        {
          category: "transport",
          title: "Остановка «Максимова»",
          address: "ул. Максимова",
          distance: "150 м, 2 мин пешком",
          coordinates: "49.09773,55.86048",
          icon: "/images/infrastructure/transport.svg",
        },
        {
          category: "transport",
          title: "Ст. м. «Авиастроительная»",
          address: "ул. Копылова",
          distance: "1 км, 12-15 мин пешком",
          coordinates: "49.08411,55.85322",
          icon: "/images/infrastructure/transport.svg",
        },
        {
          category: "school",
          title: "Школа № 168",
          description:
            "Обучение малыми группами для детей с соматическими заболеваниями",
          address: "ул. Годовикова, 8",
          distance: "300 м, 4 мин",
          coordinates: "49.09723,55.85915",
          icon: "/images/infrastructure/school.svg",
        },
        {
          category: "school",
          title: "Школа № 62",
          address: "ул. Симонова, 5/28",
          distance: "700 м, 8 мин",
          coordinates: "49.09430,55.86410",
          icon: "/images/infrastructure/school.svg",
        },
        {
          category: "school",
          title: "Школа № 54",
          description:
            "Углубленное изучение математики, русского и английского языков",
          address: "ул. Ленинградская, 38",
          distance: "1 км, 12 мин",
          coordinates: "49.08662,55.86496",
          icon: "/images/infrastructure/school.svg",
        },
        {
          category: "school",
          title: "Лицей № 145",
          description: "Физико-математический лицей",
          address: "ул. Дементьева, 16",
          distance: "800 м, 10 мин",
          coordinates: "49.10193,55.85762",
          icon: "/images/infrastructure/school.svg",
        },
        {
          category: "school",
          title: "Гимназия № 33",
          description: "Гимназия с углубленным изучением английского и французского",
          address: "ул. Симонова, 17",
          distance: "1,2 км, 15 мин",
          coordinates: "49.08480,55.86538",
          icon: "/images/infrastructure/school.svg",
        },
        {
          category: "kindergarten",
          title: "ДС № 141",
          address: "ул. Максимова, 7А",
          distance: "300 м, 4 мин",
          coordinates: "49.09504,55.85976",
          icon: "/images/infrastructure/kindergarten.svg",
        },
        {
          category: "kindergarten",
          title: "ДС № 348",
          address: "ул. Молодежная, 10Б",
          distance: "500 м, 6 мин",
          coordinates: "49.10024,55.86175",
          icon: "/images/infrastructure/kindergarten.svg",
        },
        {
          category: "kindergarten",
          title: "ДС № 20",
          address: "ул. Симонова, 3",
          distance: "600 м, 7 мин",
          coordinates: "49.09649,55.86347",
          icon: "/images/infrastructure/kindergarten.svg",
        },
        {
          category: "kindergarten",
          title: "ДС № 308",
          address: "ул. Молодежная, 6А",
          distance: "600 м, 7 мин",
          coordinates: "49.10255,55.86146",
          icon: "/images/infrastructure/kindergarten.svg",
        },
        {
          category: "medicine",
          title: "Поликлиника № 11",
          address: "ул. Максимова, 34/24",
          distance: "В пешей доступности",
          coordinates: "49.08659,55.86278",
          icon: "/images/infrastructure/medicine.svg",
        },
        {
          category: "medicine",
          title: "Горбольница № 11",
          address: "ул. Максимова, 34/24",
          distance: "В пешей доступности",
          coordinates: "49.08691,55.86301",
          icon: "/images/infrastructure/medicine.svg",
        },
        {
          category: "medicine",
          title: "Горбольница № 12",
          address: "ул. Лечебная, 7",
          distance: "В пешей доступности",
          coordinates: "49.07758,55.85813",
          icon: "/images/infrastructure/medicine.svg",
        },
        {
          category: "medicine",
          title: "Детская больница № 7",
          address: "ул. Айдарова, 2А",
          distance: "В пешей доступности",
          coordinates: "49.09155,55.86801",
          icon: "/images/infrastructure/medicine.svg",
        },
        {
          category: "sport",
          title: "Бассейн «Волна»",
          address: "ул. Максимова, 34А",
          distance: "7 мин пешком",
          coordinates: "49.08845,55.86273",
          icon: "/images/infrastructure/sport.svg",
        },
        {
          category: "sport",
          title: "Стадион «Мотор»",
          address: "ул. Ленинградская, 26",
          distance: "9 мин пешком",
          coordinates: "49.08744,55.86356",
          icon: "/images/infrastructure/sport.svg",
        },
        {
          category: "sport",
          title: "С/к «Триумф»",
          address: "ул. Олега Кошевого, 17",
          distance: "8 мин",
          coordinates: "49.09243,55.85670",
          icon: "/images/infrastructure/sport.svg",
        },
        {
          category: "sport",
          title: "Спортшкола «Авиатор»",
          address: "ул. Олега Кошевого, 19",
          distance: "8 мин",
          coordinates: "49.09415,55.85697",
          icon: "/images/infrastructure/sport.svg",
        },
        {
          category: "sport",
          title: "Спортклуб «Ахиллес»",
          address: "ул. Олега Кошевого, 19",
          distance: "4 мин",
          coordinates: "49.09418,55.85690",
          icon: "/images/infrastructure/sport.svg",
        },
        {
          category: "sport",
          title: "ДЦ «Яшьлек»",
          address: "ул. Годовикова, 16",
          distance: "4 мин",
          coordinates: "49.09875,55.86142",
          icon: "/images/infrastructure/sport.svg",
        },
        {
          category: "shop",
          title: "Пятерочка",
          address: "ул. Максимова, 1",
          distance: "200 м, 3 мин",
          coordinates: "49.09833,55.85976",
          icon: "/images/infrastructure/shop.svg",
        },
        {
          category: "shop",
          title: "Магнит",
          address: "ул. Максимова, 3",
          distance: "300 м, 2 мин",
          coordinates: "49.09622,55.86008",
          icon: "/images/infrastructure/shop.svg",
        },
        {
          category: "shop",
          title: "Бахетле",
          address: "ул. Ленинградская, 27",
          distance: "900 м, 10 мин",
          coordinates: "49.08510,55.86336",
          icon: "/images/infrastructure/shop.svg",
        },
        {
          category: "shop",
          title: "ТЦ «Восторг»",
          address: "ул. Максимова, 4Б",
          distance: "150 м, 2 мин",
          coordinates: "49.09773,55.86048",
          icon: "/images/infrastructure/shop.svg",
        },
        {
          category: "shop",
          title: "OZON",
          address: "ул. Максимова, 3",
          distance: "300 м, 4 мин",
          coordinates: "49.09618,55.86003",
          icon: "/images/infrastructure/shop.svg",
        },
        {
          category: "shop",
          title: "Wildberries",
          address: "ул. Максимова, 3",
          distance: "300 м, 4 мин",
          coordinates: "49.09625,55.86013",
          icon: "/images/infrastructure/shop.svg",
        },
        {
          category: "shop",
          title: "Яндекс.Маркет",
          address: "ул. Максимова, 7/8",
          distance: "400 м, 5 мин",
          coordinates: "49.10357,55.85897",
          icon: "/images/infrastructure/shop.svg",
        },
        {
          category: "park",
          title: "Парк «Крылья Советов»",
          address: "Авиастроительный район",
          distance: "Пешком",
          coordinates: "49.08884,55.85179",
          icon: "/images/infrastructure/park.svg",
        },
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
          title: "Архитектура и масштаб",
          titleLines: ["Архитектура", "и масштаб"],
          image: "/images/features/1.webp",
          alt: "Архитектура жилого комплекса",
          detail: {
            image: "/images/features/details/1.webp",
            imageWidth: 1346,
            imageHeight: 1410,
            title: "Архитектура и масштаб",
            titleLines: ["Архитектура и масштаб"],
            description:
              "Дом состоит из 6 секций переменной этажности — от 9 до 13 этажей. Такой масштаб застройки делает пространство вокруг дома светлым и соразмерным человеку. Лаконичный фасад в коричнево-бежевых тонах дополнен ритмичным рисунком остекления, а в вечернее время включается архитектурная подсветка.",
          },
        },
        {
          number: "02",
          title: "Сервисы внутри дома",
          titleLines: ["Сервисы внутри", "дома"],
          image: "/images/features/2.webp",
          alt: "Фасад с коммерческими помещениями на первых этажах",
          detail: {
            image: "/images/features/details/2.webp",
            imageWidth: 1346,
            imageHeight: 1410,
            title: "Сервисы внутри дома",
            titleLines: ["Сервисы внутри", "дома"],
            description:
              "В «Максиме» будет всё необходимое для комфортной жизни: в коммерческих помещениях на первых этажах откроются минимаркет, кофейня, аптека и салон красоты. Для жителей предусмотрен подземный паркинг с прямым доступом на лифте.",
          },
        },
        {
          number: "03",
          title: "Закрытый двор без машин",
          titleLines: ["Закрытый двор", "без машин"],
          image: "/images/features/3.webp",
          alt: "Зелёный двор с прогулочной зоной",
          detail: {
            image: "/images/features/details/3.webp",
            imageWidth: 1346,
            imageHeight: 1410,
            title: "Закрытый двор без машин",
            titleLines: ["Закрытый двор без машин"],
            description:
              "Двор — закрытое приватное пространство без машин и сквозного проезда. Здесь будут ландшафтный дизайн, геопластика и озеленение в несколько уровней. Для детей — площадка с сертифицированным ударопоглощающим покрытием и зонами для малышей и школьников. Для взрослых — воркаут-площадка, столы для настольного тенниса и лаунж-зона с гамаками.",
          },
        },
        {
          number: "04",
          title: "Планировки для жизни",
          titleLines: ["Планировки", "для жизни"],
          image: "/images/features/4.webp",
          alt: "Планировка квартиры с видом сверху",
          detail: {
            image: "/images/features/details/4.webp",
            imageWidth: 1346,
            imageHeight: 1410,
            title: "Планировки для жизни",
            titleLines: ["Планировки для жизни"],
            description:
              "Доступны квартиры евроформата с кухней-гостиной и классические с изолированной кухней. В двух- и трёхкомнатных — два санузла. В каждой квартире — балкон или лоджия, увеличенные окна и низкие подоконники. В прихожих — готовые ниши под шкафы. Есть квартиры с мастер-спальнями, гардеробными и просторными кухнями-гостиными, где действительно можно собраться всей семьёй. Все квартиры сдаются с предчистовой отделкой.",
          },
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
      mobileTitle: "Преимущества",
      mobileDescription: [
        "ЖК «Максима» расположен в центральной части Авиастроительного района — одном из самых самодостаточных в Казани.",
        "До метро — 12 минут пешком, до остановки «Максимова» — 150 метров. Школы, сады, магазины, спорт и медицина — рядом с домом.",
      ],
      mobileTags: [
        {
          icon: "/images/hero/icons/buildings.svg",
          label: "Комфорт-класс",
        },
        {
          icon: "/images/hero/icons/garage.svg",
          label: "Подземный паркинг",
        },
      ],
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
          href: "#layouts",
        },
        {
          image: "/images/advantages/2.webp",
          width: 830,
          height: 1160,
          alt: "Лобби с панорамным остеклением",
          title: "Лобби с панорамным остеклением",
          href: "#layouts",
        },
        {
          image: "/images/advantages/3.webp",
          width: 830,
          height: 1160,
          alt: "Интерьер квартиры с продуманной планировкой",
          title: "Умные планировки",
          href: "#layouts",
        },
        {
          image: "/images/advantages/4.webp",
          width: 830,
          height: 1160,
          alt: "Квартира с предчистовой отделкой",
          title: "Предчистовая отделка",
          href: "#layouts",
        },
        {
          image: "/images/advantages/5.webp",
          width: 830,
          height: 1160,
          alt: "Подземный паркинг жилого комплекса",
          title: "Подземный паркинг",
          href: "#layouts",
        },
      ],
    },
    promos: {
      title: "Акции",
      titleMobile: "Спецпредложения",
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
    participants: {
      label: "Участники проекта",
      title:
        "Надёжность застройщика, скорость строительства и безопасность сделки — самые важные факторы при покупке недвижимости.",
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
      imageMobile: "/images/individual-conditions/bg-mobile.svg",
      title: "Получите индивидуальные условия",
      phoneLabel: "Телефон:",
      phone: "+7 (495) 132-07-08",
      phoneHref: "tel:+74951320708",
      submitLabel: "Оставить заявку",
      fields: [
        {
          type: "text",
          name: "name",
          placeholder: "Имя*",
          required: true,
        },
        {
          type: "email",
          name: "email",
          placeholder: "Почта",
        },
        {
          type: "tel",
          name: "phone",
          placeholder: "Телефон*",
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
