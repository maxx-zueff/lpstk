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
				Личный кабинет
			</p>
		</div>
	)
}

export function Profile() {
	return (
		<div className={styles.profile_container}>
			<div className={styles.profile_info}>
				<Image
					src="/avatar.jpg"
					width={80}
					height={80}
					alt="Avatar"
					className={styles.profile_avatar}
				/>
				<div className={styles.profile_title}>
					<h1>Максим</h1>
					<p>153 бонуса</p>
				</div>
			</div>
			<Image
				src="/edit.svg"
				width={30}
				height={30}
				alt="Edit"
			/>
		</div>
	)
}

export function Orders() {
	return (
		<div className={styles.orders_container}>
			<h1>История заказов</h1>
			<div>

				<div className={styles.order}>
					<div className={styles.order_container}>
						<Image
							src="/item-1.png"
							width={80}
							height={80}
							alt="Товар"
							className={styles.order_img}
						/>			
						<div className={styles.order_description}>
						<div className={styles.order_title}>Доставили за 57 минут</div>
						<div className={styles.order_info}>2150₽ <div className={styles.order_point}></div> 24.02.2018</div>
						</div>
					</div>
					<Image
						src="/next.svg"
						width={30}
						height={30}
						alt="Подробнее"
						className={styles.order_detail}
					/>			
				</div>
				<div className={`${styles.order} ${styles.active}`}>
					<div className={styles.order_container}>
						<Image
							src="/item-1.png"
							width={80}
							height={80}
							alt="Товар"
							className={styles.order_img}
						/>			
						<div className={styles.order_description}>
							<div className={styles.order_title}>Доставляем</div>
							<div className={styles.order_info}>2150₽ <div className={styles.order_point}></div>Сейчас</div>
						</div>
					</div>
					<Image
						src="/next.svg"
						width={30}
						height={30}
						alt="Подробнее"
						className={styles.order_detail}
					/>			
				</div>
			</div>
		</div>
	)
}

export function Exit() {
	return (
		<div className={styles.exit_container}>
				<Image
					src="/exit.svg"
					width={20}
					height={20}
					alt="Выход"
				/>
				<div className={styles.exit_text}>Выйти</div>						
		</div>
	)
}


export default function Page() {
  return (
    <div className={styles.page_container}>
	    <div>
		    <Header />
		    <Profile />
		    <Orders />
			</div>

	    <Exit />
    </div>
  )
}