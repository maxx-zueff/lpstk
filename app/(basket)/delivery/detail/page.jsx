import Image from 'next/image'
import styles from './page.module.scss'
import { manrope } from '../../../fonts'

export function Option() {
	return(
		<>
		<div className={styles.option_item}>
			<div>
	            <div className={styles.option_title}>
	                <Image
	                    src="/icon_watch.svg"
	                    alt="Доставка ко времени"
	                    width={20}
	                    height={20}
	                    className={styles.title_image}
	                />
	                <div>Доставка ко времени</div>
	            </div>
	            <div className={styles.option_description}>Каждый день с 9:00 до 22:00</div>
	        </div>
	        <div className={styles.option_done}>
	            <Image
	                src="/done.svg"
	                alt="Готово"
	                width={30}
	                height={30}
	            />
	        </div>
		</div>
		<div className={styles.option_more}>Показать ещё варианты вручения</div>
		</>
	)
}

export function Form() {

	return(
		<div className={styles.form_container}>
			<div className={styles.form_row}>
				<div className={styles.form_col}>
					<div className={styles.form_title}>Адрес</div>
					<input type="text" placeholder="ХХХХХХХХХХХХХХХХ"/>
				</div>	
			</div>	
			<div className={styles.form_row} style={{color: "#989BA5"}}>
				<div className={styles.form_col}>
					<div className={styles.form_title}>Квартира</div>
					<input type="text" placeholder="ХХХ" />
				</div>
				<div className={styles.form_col}>
					<div className={styles.form_title}>Подъезд</div>
					<input type="text" placeholder="ХХ"/>
				</div>
				<div className={styles.form_col}>
					<div className={styles.form_title}>Этаж</div>
					<input type="text" placeholder="ХХ"/>
				</div>
			</div>
			<div className={styles.form_row}>
				<div className={styles.form_col}>
					<div className={styles.form_title}>Телефон получателя</div>
					<input type="text" placeholder="+7 (ХХХ) ХХХ ХХ ХХ"/>
				</div>	
			</div>
			<div className={styles.form_row}>
				<div className={`${styles.form_col} ${styles.comment}`}>
					<div className={styles.form_title}>Дополнительная информация</div>
					<input type="text" placeholder="ХХХХХХХХХХХХХХ"/>
				</div>	
			</div>
			<div className={styles.form_row}>
				<div className={styles.form_col}>
					<div className={styles.form_title}>Дата</div>
					<div className={styles.img_input}>
						<input type="text" placeholder="ХХ/ХХ"/>
						<Image src="/calendar.png" alt="Календарь" width={20} height={20} />
					</div>
				</div>
				<div className={styles.form_col}>
					<div className={styles.form_title}>Час</div>
					<div className={styles.img_input}>
						<input type="text" placeholder="ХХ"/>
						<Image src="/next.svg" alt="Список" width={10} height={10} className={styles.img_down} />
					</div>
				</div>
				<div className={styles.form_col}>
					<div className={styles.form_title}>Минута</div>
					<div className={styles.img_input}>
						<input type="text" placeholder="ХХ"/>
						<Image src="/next.svg" alt="Список" width={10} height={10} className={styles.img_down} />
					</div>
				</div>
			</div>
		</div>
	)
}

export function Notify() {

	const date = "3 января";
	const time = "15:30 - 16:00";
	const district = "Центр"

	return (
	<>
		<div className={styles.notify_time}>
			Диапазон доставки 30 минут<br/>
			Цветы доставим {date} в <b>{time}</b>
		</div>
		{district === "Центр" && <div className={styles.notify_price}>
			Доставка до центра <b>=189 ₽</b>
		</div>}
	</>
	)
}

export function Confirm() {
	return(
		<div className={styles.confirm}>
			К оплате
		</div>
	)
}



export default function Page() {
	return (
		<>
		<Option />
		<Form />
		<Notify />
		<Confirm />
		</>
	)
}