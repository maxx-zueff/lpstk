import Image from 'next/image'
import styles from './page.module.scss'
import { manrope } from '../../fonts'
import { Header } from '@/app/_components/header';

export function Progress() {
	return (
		<div className={styles.progress_container}>
			<div className={`${styles.complete} ${styles.progress_point}`}>
				<div className={`${styles.progress_num} ${manrope.className}`}>1</div>
				<Image
					src="/done2.svg"
					width={10}
					height={10}
					alt="Complete"
					className={styles.progress_complete}
				/>
				<div style={{left: 0}} className={styles.progress_label}>Принятие</div>
			</div>
			
			<div className={`${styles.active} ${styles.progress_point} `}>
				<div className={`${styles.progress_num} ${manrope.className}`}>2</div>
				<Image
					src="/done2.svg"
					width={10}
					height={10}
					alt="Complete"
					className={styles.progress_complete}
				/>
				<div className={styles.progress_label}>Сборка</div>
			</div>
			<div className={styles.progress_point}>
				<div className={`${styles.progress_num} ${manrope.className}`}>3</div>
				<Image
					src="/done2.svg"
					width={10}
					height={10}
					alt="Complete"
					className={styles.progress_complete}
				/>
				<div className={styles.progress_label}>Вручение</div>
			</div>
			<div className={styles.progress_point}>
				<div className={`${styles.progress_num} ${manrope.className}`}>4</div>
				<Image
					src="/done2.svg"
					width={10}
					height={10}
					alt="Complete"
					className={styles.progress_complete}
				/>
				<div style={{right: 0}} className={styles.progress_label}>Готово</div>				
			</div>

			<div className={styles.progress_bar}>
				<div style={{width: "33.33%"}} className={styles.progress_indicator}></div>
			</div>

		</div>
	)
}

export function Photo() {
	return (
		<div className={styles.photo_container}>
			<div className={styles.photo_title}>Фото до доставки</div>
			<Image
			  src="/before.png"
			  fill
			  className={styles.photo_itself}
			/>
			<div className={styles.photo_rate}>
				<Image
					src="/like.svg"
					width={50}
					height={50}
					alt="Like"
					className={styles.photo_point}
				/>
				<Image
					src="/like-active.svg"
					width={50}
					height={50}
					alt="Like"
					className={`${styles.photo_point} ${styles.active}`}
					
				/>
			</div>
		</div>
	)
}

export function Order() {
	return (
		<div className={styles.order_container}>
			<div className={styles.order_title_container}>
				<div className={styles.order_title}>Ваш заказ</div>
				<div className={styles.order_repeat}>
					<Image
						src="/refresh.svg"
						width={15}
						height={15}
						alt="refresh"
						className={styles.image}
					/>
					<div>Повторить заказ</div>
				</div>
			</div>

			<div className={styles.order_list}>
				<div className={styles.order_item}>
					<div className={styles.order_item_main}>
						<div className={styles.order_item_title}>Милан</div>
						<div className={styles.point}></div>
						<div>1шт</div>
					</div>
					<div className={styles.order_item_description}>Авторский букет</div>
				</div>				
				<div className={styles.order_item}>
					<div className={styles.order_item_main}>
						<div className={styles.order_item_title}>Подкормка для цветов</div>
						<div className={styles.point}></div>
						<div>2шт</div>
					</div>
					<div className={styles.order_item_description}>Прочее</div>
				</div>
				<div className={styles.order_line}></div>
				<div className={styles.order_total}>
					<div>Сумма заказа</div>
					<div>5996 ₽</div>
				</div>
			</div>
		</div>
	)
}

export function Detail() {
	return (
		<div className={styles.detail_container}>
			<div className={styles.detail_title_container}>
				<div className={styles.detail_title}>Детали вручения</div>
				<div className={styles.detail_edit}>Изменить</div>
			</div>

			<div className={styles.detail_list}>
				<div className={styles.detail_item}>
					<div className={styles.detail_item_title}>Доставка по адресу</div>
					<div className={styles.detail_item_main}>г. Москва, ул. Пушкина, д. 1</div>
				</div>
				<div className={styles.detail_line}></div>
				<div className={styles.detail_item}>
					<div className={styles.detail_item_title}>Квартира / Подъезд / Этаж</div>
					<div className={styles.detail_item_main}>107 / - / -</div>
				</div>
				<div className={styles.detail_line}></div>
				<div className={styles.detail_item}>
					<div className={styles.detail_item_title}>Дата и время вручения</div>
					<div className={styles.detail_item_main}>01/01/2024<div className={styles.point}></div>20:30-21:00</div>
				</div>
			</div>
		</div>		
	)
}

export function Feedback() {
	return (
		<div className={styles.feedback_container}>
			<div className={styles.feedback_title}>Ваш отзыв</div>
			<div className={styles.feedback_rate}>
				<div className={styles.feedback_stars}>
					<Image
						src="/star.png"
						width={15}
						height={15}
						alt="Star"
						className={styles.feedback_star}
					/>
					<Image
						src="/star.png"
						width={15}
						height={15}
						alt="Star"
						className={styles.feedback_star}
					/>
					<Image
						src="/star.png"
						width={15}
						height={15}
						alt="Star"
						className={styles.feedback_star}
					/>
					<Image
						src="/star.png"
						width={15}
						height={15}
						alt="Star"
						className={styles.feedback_star}
					/>
					<Image
						src="/star-blank.png"
						width={15}
						height={15}
						alt="Star"
						className={styles.feedback_star}
					/>					
				</div>
				<div className={styles.feedback_edit}>Изменить</div>
			</div>
			<div className={styles.feedback_comment}>Всё супер! Букет полностью соответсвует ожиданиям.</div>
		</div>
	)
}

export function Help() {
	return (
		<div className={styles.help_container}>
			<Image
				src="/chat.png"
				width={15}
				height={15}
				alt="Chat"
				className={styles.help_icon}
			/>
			<>Задать вопрос по заказу</>
		</div>
	)
}


export default function Page() {
  return (
	    <div>
		    <Header title={"Заказ 000031"}/>
		    <Progress />
		    <Photo />
		    <Order />
		    <Detail />
			<Feedback />
			<Help />
		</div>
  )
}