"use client";

import Image from "next/image";
import styles from "./page.module.scss";
import { Header } from "@/app/_components/header";
import { useParams } from "next/navigation";

const feedbackData = [
  { name: "Аркадий", date: "26/12/2024", feedback: "Отличный букет, всем рекомендую!", stars: 5, photo: "/review_1.jpg" },
  { name: "Мария", date: "15/11/2024", feedback: "Быстрая доставка, свежие цветы!", stars: 5, photo: "/review_2.jpg" },
  { name: "Игорь", date: "03/10/2024", feedback: "Неплохо, но есть куда стремиться.", stars: 3, photo: "/review_1.jpg" },
];

export function AverageRating() {
  const averageRating = feedbackData.reduce((sum, item) => sum + item.stars, 0) / feedbackData.length;
  const roundedRating = Math.round(averageRating * 2) / 2;
  const fullStars = Math.floor(roundedRating);
  const hasHalfStar = roundedRating % 1 !== 0;

  return (
    <div className={styles.averagerating_container}>
      <div className={styles.averagerating_number}>{roundedRating.toFixed(1)}</div>
      <div className={styles.averagerating_info}>
        <div className={styles.averagerating_stars}>
          {[...Array(5)].map((_, index) => (
            <Image
              key={index}
              src={
                index < fullStars
                  ? "/star.png"
                  : index === fullStars && hasHalfStar
                  ? "/star-half.png"
                  : "/star-empty.png"
              }
              width={20}
              height={20}
              className={styles.feedback_item}
            />
          ))}
        </div>
        <div className={styles.averagerating_description}>
          Основано на {feedbackData.length} отзывах
        </div>
      </div>
    </div>
  );
}



export function FeedbackItems() {
  return (
    <div className={styles.feedback_items}>
      {feedbackData.map((item, index) => (
        <FeedbackItem key={index} {...item} />
      ))}
    </div>
  );
}

export function FeedbackItem({ name, date, feedback, stars, photo }) {
  return (
    <div className={styles.feedback_container}>
      <div className={styles.feedback_info}>
        <div className={styles.feedback_stars}>
          {[...Array(5)].map((_, i) => (
            <Image
              key={i}
              src={i < stars ? "/star.png" : "/star-empty.png"}
              width={12}
              height={12}
              className={styles.feedback_item}
            />
          ))}
        </div>
        <div className={styles.feedback_sign}>
          <div className={styles.feedback_author}>{name}</div>
          <div className={styles.feedback_date}>{date}</div>
        </div>
      </div>
      <Image src={photo} fill className={styles.feedback_photo} />
      <div className={styles.feedback_text}>{feedback}</div>
    </div>
  );
}
export default function Page() {
  const { item } = useParams();
  const type = "Отзывы";

  return (
    <>
      <Header title={type} path={`/${item}`} />
      <AverageRating />
      <FeedbackItems/>
    </>
  );
}
