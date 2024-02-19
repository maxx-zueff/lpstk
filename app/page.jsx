import Image from 'next/image'
import styles from './page.module.scss'
import { manrope } from './fonts'
import { Slider } from './components/slider'
import { Products } from './components/products'
import Link from 'next/link'

const contentItems = [
  [
    {
      image: "/offer_1.png",
      description: "Описание предложения 1.1",
    },
    {
      image: "/offer_1.png",
      description: "Описание предложения 1.2",
    },
    {
      image: "/offer_1.png",
      description: "Описание предложения 1.3",
    }
  ],
  [
    {
      image: "/offer_1.png",
      description: "Описание предложения 2.1",
    },
    {
      image: "/offer_1.png",
      description: "Описание предложения 2.2",
    },
    {
      image: "/offer_1.png",
      description: "Описание предложения 2.3",
    },
    {
      image: "/offer_1.png",
      description: "Описание предложения 2.4",
    }
  ],
  [
    {
      image: "/offer_1.png",
      description: "Описание предложения 3.1",
    },
    {
      image: "/offer_1.png",
      description: "Описание предложения 3.2",
    }
  ]     
]

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



export function Footer() {
  return (
    <div className={styles.footer_container}>
      <p className={styles.footer_tagline}>Букеты быстро и со вкусом</p>
      <p className={`${styles.footer_phone} ${manrope.className}`}>+7 (929) 076 42 95</p>
      <Link href="/about" className={styles.footer_about}>Узнать больше о нас</Link>
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
      <Link href="/">
      <div className={styles.nav_item}>
        <Image
          src="/home.svg"
          alt="Главная страница"
          width={25}
          height={25}                  
        />
      </div>
      </Link>
      <Link href="/profile">
        <div className={styles.nav_item}>
          <Image
            src="/profile.svg"
            alt="Профиль"
            width={25}
            height={25}                  
          />
        </div>
      </Link>
      <Link href="/search">
        <div className={styles.nav_item}>
          <Image
            src="/search.svg"
            alt="Поиск"
            width={25}
            height={25}                  
          />
        </div>  
      </Link>
      <Link href="/basket">
        <div className={`${styles.nav_item} ${styles.active}`}>
          <Image
            src="/basket.svg"
            alt="Корзина"
            width={25}
            height={25}                  
          />
          <span className={`${styles.count}  ${manrope.className}`}>+ {2}</span>
        </div>
      </Link>

    </div>
  )
}

export default function Home() {
  return (
    <>
    <Logo />
    {/* <PickUp /> */}
    <Slider contentItems={contentItems}/>
    <Products />
    <Footer />
    <Nav />
    </>
  )
}

