"use client";

import Image from "next/image";
import styles from "./page.module.scss";
import { Header } from "@/app/_components/header";
import { useState } from "react";
import { Link } from "react-transition-progress/next";
import { usePathname } from "next/navigation";

const bouquetData = {
  name: "Букет Милан",
  type: "Авторский букет",
  price: 2150,
  description:
    "Букет с пионом, альстромерией, хризантемой и танацетумом в окружении веточек эвкалипта",
  width: 35,
  height: 35,
  rating: 4.7,
  feedbackCount: 19,
  reviewsCount: 10,
  images: ["/bouqet1.png", "/bouqet2.png", "/bouqet3.png"],
};

export function Photos() {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className={styles.photos_container}>
      <Image
        src={bouquetData.images[activeImage]}
        fill
        className={styles.photos_selected}
      />
      <div className={styles.photos_list}>
        {bouquetData.images.map((src, index) => (
          <div
            key={index}
            className={styles.photos_item}
            onClick={() => setActiveImage(index)}
          >
            <Image
              src={src}
              fill
              className={`${styles.image} ${
                index === activeImage ? styles.active : ""
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function Title() {
  const pathname = usePathname();

  return (
    <div className={styles.details}>
      <div>
        <h1 className={styles.details_title}>{bouquetData.name}</h1>
        <Link href={`${pathname}/reviews`}>
          <div className={styles.details_rating}>
            <Image
              src="/star.png"
              width={15}
              height={15}
              className={styles.feedback_item}
            />
            <div className={styles.feedback_item}>
              {bouquetData.rating}{" "}
              <span style={{ color: "#989BA5" }}>
                ({bouquetData.feedbackCount})
              </span>
            </div>
            <div className={styles.details_separator}></div>
            <div
              className={styles.feedback_item}
              style={{ color: "#59ADFF", fontWeight: 600 }}
            >
              <span>{bouquetData.reviewsCount}</span> отзывов
            </div>
          </div>
        </Link>
      </div>
      <div className={styles.details_price}>{bouquetData.price} ₽</div>
      <p className={styles.details_description}>{bouquetData.description}</p>
      <div className={styles.details_dimensions}>
        <div className={styles.size_item}>
          Ширина: <span>{bouquetData.width}</span>см
        </div>
        <div className={styles.size_item}>
          Высота: <span>{bouquetData.height}</span>см
        </div>
      </div>
    </div>
  );
}

export function Button() {
  const [isAdded, setIsAdded] = useState(false);

  const handleClick = () => {
    setIsAdded(true);
  };

  return (
    <div
      className={styles.btn_container}
      style={{ backgroundColor: isAdded ? "#1A3046" : "" }}
      onClick={handleClick}
    >
      {isAdded ? (
        <Link href="/basket">
          <div className={styles.btn_img}>
            <Image src="/basket.svg" width={20} height={20} />
            <p>Перейти в корзину</p>
          </div>
        </Link>
      ) : (
        <p>Добавить в корзину</p>
      )}
    </div>
  );
}

export default function Item() {
  const type = "Авторский букет";

  return (
    <>
      <Header title={type} />
      <Photos />
      <Title />
      <Button />
    </>
  );
}
