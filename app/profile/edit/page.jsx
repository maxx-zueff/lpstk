import Image from 'next/image'
import styles from './page.module.scss'

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
				Редактировать профиль
			</p>
		</div>
	)
}

export function Profile() {
	return (
		<div className={styles.profile_container}>
			<div>
				<div className={styles.profile_avatar_container}>
					<Image
						src="/avatar.jpg"
						width={100}
						height={100}
						alt="Avatar"
						className={styles.profile_avatar}
					/>
					<Image
						src="/paint.png"
						width={30}
						height={30}
						alt="Avatar"
						className={styles.profile_avatar_edit}
					/>
				</div>
				<h1>Максим</h1>
			</div>	
		</div>
	)
}

export function Form() {
	return(
		<div className={styles.form_container}>
			<div className={styles.form_row}>
				<div className={styles.form_col}>
					<div className={styles.form_title}>Имя</div>
					<input type="text" placeholder="ХХХХХХХХХХХХХХХХ"/>
				</div>	
			</div>
			<div className={styles.form_row}>
				<div className={styles.form_col}>
					<div className={styles.form_title}>Телефон</div>
					<input type="text" placeholder="+7 (ХХХ) ХХХ ХХ ХХ"/>
				</div>	
			</div>
			<div className={styles.form_row}>
				<div className={styles.form_col}>
					<div className={styles.form_title}>Дата рождения</div>
					<div className={styles.img_input}>
						<input type="text" placeholder="ХХ/ХХ"/>
						<Image src="/calendar.png" alt="Календарь" width={20} height={20} />
					</div>
				</div>	
				<div className={styles.form_col}>
					<div className={styles.form_title}>Пол</div>
					<div className={styles.img_input}>
						<input type="text" placeholder="ХХХХХХХХХ"/>
						<Image src="/next.svg" alt="Список" width={10} height={10} className={styles.img_down} />
					</div>
				</div>	
			</div>
		</div>
	)
}

export default function Page() {
  return (
    <div className={styles.page_container}>
	    <div>
		    <Header />
		    <Profile />
		    <Form />
		</div>
		<div className={styles.start_container}>Первая покупка <span className={styles.start_date}>24/02/2018</span></div>
    </div>
  )
}