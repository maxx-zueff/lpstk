"use client"

import Image from "next/image";
import styles from "./page.module.scss";
import { useState} from "react";

export function Notify() {
  return (
    <div className={styles.notify}>
      Все варианты доставки{" "}
      <span className={styles.free}>бесплатно </span>
      в следующих районах: Дзержинский
    </div>
  );
}

export function Options() {
  const [activeOption, setActiveOption] = useState(null);
  const options = [
    {
      img: "/icon_store.svg",
      title: "Самовывоз",
      description:
        "Букет будет ждать вас по адресу: г. Ярославль, ул. Бабича, д. 3в",
      price: "бесплатно",
      free: true,
    },
    {
      img: "/icon_phone.svg",
      title: "Уточнить адрес и время у получателя",
      description: "Сами свяжемся с получателем",
      price: "от 489 ₽",
      free: false,
    },
    {
      img: "/icon_flash.svg",
      title: "Срочная доставка",
      description: "Доставка быстрее 59 минут",
      price: "от 289 ₽",
      local: true,
      free: false,
    },
    {
      img: "/icon_watch.svg",
      title: "Доставка ко времени",
      description: "Доставка каждый день с 9:00 до 22:00",
      price: "от 189 ₽",
      local: true,
      free: false,
    },
    {
      img: "/icon_fire.svg",
      title: "Долгая доставка (до 4 часов)",
      description: "Доставка по всему городу",
      price: "бесплатно",
      free: true,
    },
  ];

  return (
    <div className={styles.options_container}>
      {options.map((item, index) => (
        <div
		className={`${styles.option_container} ${activeOption === index ? styles.active : ""}`}
		key={index}
		onClick={() => setActiveOption(index)}
	  >
          <>
            <Image
              src={item.img}
              alt={item.title}
              width={20}
              height={20}
              className={styles.title_image}
            />
          </>

          <div key={item.title} className={styles.option_item}>
            <div>
              <div>
                <div className={styles.option_title}>{item.title}</div>
                {item.free && <div className={styles.free}>бесплатно</div>}
              </div>
              <div className={styles.option_description}>
                {item.description}
              </div>
            </div>
            <div className={styles.option_more}>
              <Image
                src={activeOption === index ? "/done.svg" : "/next.svg"}
                alt="Подробнее"
                width={30}
                height={30}
                className={styles.image}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Page() {
  return (
    <>
      <Notify />
      <Options />
    </>
  );
}
