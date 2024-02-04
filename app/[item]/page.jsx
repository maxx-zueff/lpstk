import Image from 'next/image'
import styles from './page.module.scss'
import { manrope } from '../fonts'

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
				Авторский букет
			</p>
		</div>
	)
}

export function Photos() {
  const images = [
    { src: "/bouqet1.png", active: true },
    { src: "/bouqet2.png", active: false },
    { src: "/bouqet3.png", active: false }
  ];

  return (
    <div className={styles.photos_container}>
      <div className={styles.photos_selected}>
        <Image
          src="/bouqet1.png"
          fill
          className={styles.image}
        />
      </div>
      <div className={styles.photos_list}>
        {images.map((image, index) => (
          <div className={styles.photos_item} >
            <Image
              key={index}
              src={image.src}
              fill
              className={`${styles.image} ${image.active ? styles.active : ''}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function Title() {
  const feedbackRating = 4.7;
  const feedbackCount = 19;
  const reviewsCount = 10;
  const bouquetPrice = 2150;
  const bouquetDescription = "Букет с пионом, альстромерией, хризантемой и танацетумом в окружении веточек эвкалипта";
  const bouquetWidth = 35;
  const bouquetHeight = 35;

  return (
    <div className={styles.description_container}>
      <div>
        <h1>Букет Милан</h1>
        <div className={styles.feedback}>
          <Image
            src="/star.png"
            width={15}
            height={15}
            className={styles.feedback_item}
          />
          <div className={`${styles.feedback_item} ${manrope.className}`}>{feedbackRating} <span style={{color:"#989BA5"}}>({feedbackCount})</span></div>
          <div className={`${styles.point} ${styles.feedback_item}`}></div>
          <div className={styles.feedback_item} style={{color:"#59ADFF",fontWeight: 600}}><span className={manrope.className}>{reviewsCount}</span> отзывов</div>
        </div>
      </div>
      <div className={`${styles.price} ${manrope.className}`}>
        {bouquetPrice} ₽
      </div>
      <p className={styles.subdescription}>
        {bouquetDescription}
      </p>
      <div className={styles.size}>
        <div className={styles.size_item}>Ширина: <span className={manrope.className}>{bouquetWidth}</span>см</div>
        <div className={styles.size_item}>Высота: <span className={manrope.className}>{bouquetHeight}</span>см</div>
      </div>
    </div>
  );
}

export function Button() {
	return (
		<div className={styles.btn_container}>
			<p>Добавить в корзину</p>
		</div>
	)
}

export default function Item() {
  return (
    <>
    <Header />
    <Photos />
    <Title />
    <Button />
    </>
  )
}