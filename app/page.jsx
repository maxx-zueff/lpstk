import Image from 'next/image'
import styles from './page.module.scss'
import { manrope } from './fonts'

export function Logo() {
  return (
    <div className={styles.logo}>
      <Image
        src="/logo.png"
        width={240}
        height={40}
        alt="Logo"
      />
    </div>
  )
}

export function PickUp() {
  return (
    <div className={styles.pickup_container}>
      <div>
        <p className={styles.pickup_description}>Доставка по адресу</p>
        <p className={styles.pickup_point}>г. Москва, ул. Пушкина, д. 1</p>
      </div>
      <div className={styles.pickup_change}>
        <div>Изменить</div> 
      </div>
    </div>
  )
}

export function Slider() {
  const navItems = ["Предложения", "Отзывы", "Промокоды"];
  const subNavItems = [1, 2, 3];

  return (
    <div className={styles.slider_container}>
      <ul className={styles.slider_nav}>
        {navItems.map((item, index) =>
          <li key={index} className={index === 0 ? styles.active : ""}>{item}</li>
        )}
      </ul>
      <div className={styles.slider_content}>
        <div className={styles.slider_image_wrapper}>
          <Image
            src="/offer_1.png"
            alt="Offer image"
            fill
            className={styles.image}
          />
        </div>
        <p>Доставляем цветы <span className={styles.bold}>бесплатно</span> по всему городу Ярославль</p>
      </div>
      <div>
        <ul className={styles.slider_subnav}>
          {subNavItems.map((item, index) =>
            <li key={index} className={index === 2 ? styles.active : ""}></li>
          )}
        </ul>
      </div>
    </div>
  )
}

export function Products() {

  const items = [
    {image: '/item-1.png', price: 2150, title: 'Букет Милан', alt: 'Image of Букет Милан'},
    {image: '/item-2.png', price: 3350, title: 'Букет Пиономания', alt: 'Image of Букет Пиономания'},
    {image: '/item-2.png', price: 3350, title: 'Букет Пиономания', alt: 'Image of Букет Пиономания'},
    {image: '/item-1.png', price: 2150, title: 'Букет Милан', alt: 'Image of Букет Милан'},
    {image: '/item-2.png', price: 3350, title: 'Букет Пиономания', alt: 'Image of Букет Пиономания'}
  ];

  const menuItems = [
    {src: "/menu-item.png", text: "Авторские букеты", isActive: true},
    {src: "/menu-item2.png", text: "Цветочные композиции"},
    {src: "/menu-item.png", text: "Свадебные букеты"},
    {src: "/menu-item4.png", text: "Цветы с конфетами"},
    {src: "/menu-item.png", text: "Моно букеты"},
  ];

  function Menu() {

    return (
      <div className={styles.menu_container}>
        
        {menuItems.map((item, index) => 
          <div key={index} className={`${styles.menu_item} ${item.isActive ? styles.active : ""}`}>
            <Image
              src={item.src}
              alt={item.text}
              width={70}
              height={70}                  
              className={styles.menu_image}
            />
            <p>{item.text}</p>
          </div>
        )}

      </div>
    )
  }

  function Items() {
    return (
      <div className={styles.items_container}>

        <div className={styles.items_header}>
          <h1>Авторские букеты</h1>
          <div className={styles.items_sort}>
            <span>Сортировка</span>
            <Image
              src="/sort.png"
              alt="Сортировка"
              width={25}
              height={25}                  
            />
          </div>
        </div>

        <div className={styles.items_list}>

        {
          items.map((item, idx) => (
            <div className={styles.item} key={idx}>
              <Image
                src={item.image}
                alt={item.alt}
                fill
                className={styles.image}
              />
              <div className={styles.items_description}>
                <p className={`${styles.items_price} ${manrope.className}`}>{item.price} ₽</p>
                <p className={styles.items_title}>{item.title}</p>
              </div>
            </div>
          ))
        }
          
        </div>
      </div>
    )
  }  

  return (<><Menu /><Items /></>)

}

export function Footer() {
  return (
    <div className={styles.footer_container}>
      <p className={styles.footer_tagline}>Букеты быстро и со вкусом</p>
      <p className={`${styles.footer_phone} ${manrope.className}`}>+7 (929) 076 42 95</p>
      <p className={styles.footer_about}>Узнать больше о нас</p>
      <Image
        className={styles.footer_social}
        src="/social.png"
        alt="Вконтакте"
        width={30}
        height={30}                  
      />
      <p>© 2023 ИП Иванов Иван Иванович ОГРН 11111111111111111 ИНН 1111111111111</p>
    </div>
  )
}

export function Nav() {
  return (
    <div className={styles.nav_container}>
      <div className={styles.nav_item}>
        <Image
          src="/home.svg"
          alt="Главная страница"
          width={25}
          height={25}                  
        />
      </div>  
      <div className={styles.nav_item}>
        <Image
          src="/profile.svg"
          alt="Профиль"
          width={25}
          height={25}                  
        />
      </div>
      <div className={styles.nav_item}>
        <Image
          src="/search.svg"
          alt="Поиск"
          width={25}
          height={25}                  
        />
      </div>  
      <div className={`${styles.nav_item} ${styles.active}`}>
        <Image
          src="/basket.svg"
          alt="Корзина"
          width={25}
          height={25}                  
        />
      </div>

    </div>
  )
}

export default function Home() {
  return (
    <>
    <Logo />
    <PickUp />
    <Slider />
    <Products />
    <Footer />
    <Nav />
    </>
  )
}

