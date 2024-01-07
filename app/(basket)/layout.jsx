'use client'

import classNames from "classnames";
import Image from 'next/image'
import styles from './page.module.scss'
import { usePathname } from 'next/navigation'

export function Header() {
  return (
    <div className={styles.header_container}>
      <Image
        src="/back.svg"
        width={30}
        height={30}
        alt="Back"
      />
      <p className={styles.header_title}>
        Оформление заказа
      </p>
    </div>
  )
}

export function Nav() {

  const pathname = usePathname()
  const page = pathname.split('/')[1]

  const isActive = (currentPage, targetPage) => currentPage === targetPage ? styles.active : "";

  return (
    <div className={styles.layout_container}>
    <div className={styles.header_container}>
      <Image
        src="/back.svg"
        width={30}
        height={30}
        alt="Back"
      />
      <p className={styles.header_title}>
        Оформление заказа
      </p>
    </div>
    <div className={styles.nav_container}>
      <div className={classNames(styles.nav_item, isActive(page, "basket"))}>
        <Image
          src="/basket.svg"
          width={30}
          height={30}
          alt="Корзина"
        />
        <span>{page === "basket" && "Корзина"}</span>
      </div>
      <div  className={classNames(styles.nav_item, isActive(page, "delivery"))}>
        <Image
          src="/delivery.svg"
          width={30}
          height={30}
          alt="Доставка"
        />
        <span>{page === "delivery" && "Доставка"}</span>
      </div>
      <div className={classNames(styles.nav_item, isActive(page, "pay"))}>
        <Image
          src="/pay.svg"
          width={30}
          height={30}
          alt="Оплата"
        />
        <span>{page === "pay" && "Оплата"}</span>
      </div>
    </div>
    </div>
  )
}


export default function BasketLayout({ children }) {

  return (
    <>
      {/*<Header />*/}
      <Nav />
      <div className={styles.layout}>
        {children}
      </div>  
    </>
  )
}