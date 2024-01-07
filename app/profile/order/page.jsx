import Image from 'next/image'
import styles from './page.module.scss'
import { manrope } from '../../fonts'

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
				Заказ 000001
			</p>
		</div>
	)
}

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
				<div className={styles.detail_title}>Ваш заказ</div>
				<div className={styles.detail_edit}>Изменить</div>
			</div>
		</div>		
	)
}

// export function Feedback() {
// 	return ()
// }

// export function Help() {
// 	return ()
// }


export default function Page() {
  return (
	    <div>
		    <Header />
		    <Progress />
		    <Photo />
		    <Order />
		    <Detail />
		</div>
  )
}