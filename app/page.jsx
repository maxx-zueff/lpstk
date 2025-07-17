import Image from "next/image";
import { Link } from "react-transition-progress/next";
import styles from "./page.module.scss";
import { Slider } from "./_components/slider";
import { Products } from "./_components/products";
import { contentItems } from "@/app/_data";
import { navItems } from "@/app/_data";

export function Logo() {
  return (
    <div className={styles.logo}>
      <Image src="/logo.png" width={240} height={40} alt="Logo" />
    </div>
  );
}

export function Footer() {
  return (
    <div className={styles.footer_container}>
      <p className={styles.footer_tagline}>Букеты быстро и со вкусом</p>
      <p className={styles.footer_phone}>+7 (929) 076 42 95</p>
      
        <div className={styles.footer_about}><Link href="/about">Узнать больше о нас</Link></div>
      
      <Image
        className={styles.footer_social}
        src="/social.png"
        alt="Вконтакте"
        width={30}
        height={30}
      />
      <p>
        © 2023 ИП Иванов Иван Иванович ОГРН 11111111111111111 ИНН 1111111111111
      </p>
    </div>
  );
}

export function Nav() {
  return (
    <div className={styles.nav_container}>
      {navItems.map((item) => (
        <Link href={item.href} key={item.href}>
          <div
            className={item.active ? styles.active : ""}
          >
            <Image src={item.src} alt={item.alt} width={25} height={25} />
            {item.count && <span className={styles.nav_count}>+ {item.count}</span>}
          </div>
        </Link>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Logo />
      <Slider contentItems={contentItems} />
      <Products />
      <Footer />
      <Nav />
    </>
  );
}
