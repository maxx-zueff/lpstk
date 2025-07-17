import { Link } from "react-transition-progress/next";
import styles from "./page.module.scss";
import { Header } from "@/app/_components/header";
import { Total } from "@/app/_components/total";

export function Price() {
  return (
    <div className={styles.price_container}>
      <div className={`${styles.price_item} ${styles.price_title}`}>
        Сумма заказа
      </div>
      <div className={`${styles.price_item} ${styles.price_total}`}>5996 ₽</div>
    </div>
  );
}

export function Confirm() {
  return (
    <Link href="/">
      <div className={styles.confirm}>Оплатить</div>;
    </Link>
  );
}

export default function Page() {
  return (
    <div>
      <Header title={"Оформление заказа"} />
      <Price />
      <Total />
      <Confirm />
    </div>
  );
}
