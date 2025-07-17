export const contentItems = [
  [
    {
      image: "/offer_1.png",
      description: "Описание предложения 1.1",
      id: 1,
    },
    {
      image: "/offer_1.png",
      description: "Описание предложения 1.2",
      id: 2,
    },
    {
      image: "/offer_1.png",
      description: "Описание предложения 1.3",
      id: 3,
    },
  ],
  [
    {
      image: "/offer_1.png",
      description: "Описание предложения 2.1",
      id: 4,
    },
    {
      image: "/offer_1.png",
      description: "Описание предложения 2.2",
      id: 5,
    },
    {
      image: "/offer_1.png",
      description: "Описание предложения 2.3",
      id: 6,
    },
    {
      image: "/offer_1.png",
      description: "Описание предложения 2.4",
      id: 7,
    },
  ],
  [
    {
      image: "/offer_1.png",
      description: "Описание предложения 3.1",
      id: 8,
    },
    {
      image: "/offer_1.png",
      description: "Описание предложения 3.2",
      id: 9,
    },
  ],
];

export const navItems = [
  { href: "/", src: "/home.svg", alt: "Главная страница" },
  { href: "/profile", src: "/profile.svg", alt: "Профиль" },
  { href: "/search", src: "/search.svg", alt: "Поиск" },
  {
    href: "/basket",
    src: "/basket.svg",
    alt: "Корзина",
    count: 2,
    active: true,
  },
];

export const basketItems = [
  { key: "basket", icon: "/basket.svg", label: "Корзина", path: "/basket"},
  { key: "delivery", icon: "/delivery.svg", label: "Доставка", path: "/delivery"},
  { key: "pay", icon: "/pay.svg", label: "Оплата", path: "/pay"},
];

export const orderItems = [
  {
    src: "/item-1.png",
    alt: "Букет",
    title: "Букет Милан",
    type: "Авторский букет",
    price: 2150,
    quantity: 1,
    id: 1
  },
  {
    src: "/item-2.png",
    alt: "Букет",
    title: "Букет Пиономания",
    type: "Авторский букет",
    price: 4590,
    quantity: 1,
    id: 2
  },
  {
    src: "/item-3.png",
    alt: "Подкормка для цветов",
    title: "Подкормка для цветов",
    type: "Прочее",
    price: 0,
    oldPrice: "20",
    quantity: 1,
    id: 3
  }
]

export const orderAdditionalItem = [
  {
    src: "/add-1.png",
    alt: "Образец",
    type: "Топпер деревянный",
    price: 99,
    title: 'Топпер "С Днём Рождения"',
    quantity: 1,
    id: 4
  },
  {
    src: "/add-2.png",
    alt: "Образец",
    price: 99,
    type: "Топпер деревянный",
    title: 'Топпер "Любовь"',
    quantity: 1,
    id: 5
  },
  {
    src: "/add-3.png",
    alt: "Образец",
    price: 649,
    type: "Шар гелиевый",
    title: 'Шар гелиевый "Звезда"',
    quantity: 1,
    id: 6
  },
  {
    src: "/add-4.png",
    alt: "Образец",
    price: 689,
    type: "Конфеты",
    title: "Раффаэлло 7шт в сердце",
    quantity: 1,
    id: 7
  }
];

export const formField = {
  pickup: {
    type: "pickup",
    adress: false,
    phone: false,
    comment: false,
    date: true,
    img: "/icon_store.svg",
    title: "Самовывоз",
    description:
      "Букет будет ждать вас по адресу: г. Ярославль, ул. Бабича, д. 3в",
    price: "бесплатно",
    free: true,
    delivery_range: 0,
    required: ["date", "time"]
  },
  clarify: {
    type: "clarify",
    adress: false,
    phone: true,
    comment: false,
    date: false,
    img: "/icon_phone.svg",
    title: "Уточнить адрес и время у получателя",
    description: "Сами свяжемся с получателем",
    price: "от 489 ₽",
    free: false,
    delivery_range: 30,
    required: ["phone"]
  },
  urgent: {
    type: "urgent",
    adress: true,
    phone: true,
    comment: true,
    date: false,
    img: "/icon_flash.svg",
    title: "Срочная доставка",
    description: "Доставка быстрее 59 минут",
    price: "от 289 ₽",
    local: true,
    free: false,
    delivery_range: 30,
    required: ["phone", "address"]
  },
  long: {
    type: "long",
    adress: true,
    phone: true,
    comment: true,
    date: true,
    img: "/icon_fire.svg",
    title: "Долгая доставка (до 4 часов)",
    description: "Доставка по всему городу",
    price: "бесплатно",
    free: true,
    delivery_range: 240,
    required: ["date", "time", "phone", "address"]
  },
  date: {
    type: "date",
    adress: true,
    phone: true,
    comment: true,
    date: true,
    img: "/icon_watch.svg",
    title: "Доставка ко времени",
    description: "Доставка каждый день с 9:00 до 22:00",
    price: "от 189 ₽",
    local: true,
    free: false,
    delivery_range: 30,
    required: ["date", "time", "phone", "address"]
  },
};