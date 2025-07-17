import Image from "next/image";
import styles from "./page.module.scss";
import classNames from "classnames";
import { Link } from "react-transition-progress/next";
import { Header } from "@/app/_components/header";

const orders = [
  {
    id: 14551,
    status: "Доставили за 57 минут",
    price: "2150₽",
    date: "24.02.2018",
    image: "/item-1.png",
    active: false,
  },
  {
    id: 14542,
    status: "Доставляем",
    price: "2150₽",
    date: "Сейчас",
    image: "/item-1.png",
    active: true,
  },
];
const userName = "Максим";
const userBonus = 153;

export function Profile() {
  return (
    <div className={styles.profile}>
      <div className={styles.profile_info}>
        <Image
          src="/avatar.jpg"
          width={80}
          height={80}
          alt="Avatar"
          className={styles.profile_avatar}
        />
        <div className={styles.profile_title}>
          <h1>{userName}</h1>
          <p>{userBonus} бонуса</p>
        </div>
      </div>
      <Link href="/profile/edit">
        <Image src="/edit.svg" width={30} height={30} alt="Edit" />
      </Link>
    </div>
  );
}

export function Orders() {
  return (
    <div className={styles.orders}>
      <h1>История заказов</h1>
      <div>
        {orders.map((order) => (
          <Link href={`/profile/${order.id}`} key={order.id}>
            <div
              className={classNames(styles.item, {
                [styles.active]: order.active,
              })}
            >
              <div className={styles.item_main}>
                <Image
                  src={order.image}
                  width={80}
                  height={80}
                  alt="Товар"
                  className={styles.item_img}
                />
                <div className={styles.item_description}>
                  <div className={styles.item_title}>{order.status}</div>
                  <div className={styles.item_info}>
                    {order.price} <div className={styles.item_point}></div>{" "}
                    {order.date}
                  </div>
                </div>
              </div>
              {order.active && (
                <Image src="/next.svg" width={30} height={30} alt="Подробнее" />
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function Exit() {
  return (
    <div className={styles.exit}>
      <Image src="/exit.svg" width={20} height={20} alt="Выход" />
      <span>Выйти</span>
    </div>
  );
}

export default function Page() {
  return (
    <div className={styles.page}>
      <div>
        <Header title={"Личный кабинет"} />
        <Profile />
        <Orders />
      </div>

      <Exit />
    </div>
  );
}
