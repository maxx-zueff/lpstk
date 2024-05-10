import Image from 'next/image'
import styles from './page.module.scss'
import { manrope } from './../../fonts'
import { Header } from '@/app/_components/header';

export function Price() {
	return(
		<div className={styles.price_container}>
			<div className={`${styles.price_item} ${styles.price_title}`}>Сумма заказа</div>
			<div className={`${styles.price_item} ${styles.price_total} ${manrope.className}`}>5996 ₽</div>
		</div>
	)
}

export function Total() {

	const total = {
		items: 3,
		price: {
			items: 6740,
			discount_bonus: 177,
			discount_promo: 600,
			delivery: 289,
			sum: 5996
		}
	}

	return (
		<div className={styles.total_container}>
			<table className={styles.total_table}>
				<tbody>
				  <tr className={styles.row}>
				    <td>{total.items} товара</td>
				    <td className={`${styles.price} ${manrope.className}`}>{total.price.items} ₽</td>
				  </tr>
				  <tr className={styles.row}>
				    <td>Доставка</td>
				    <td className={`${styles.price} ${manrope.className}`}>{total.price.delivery} ₽</td>
				  </tr>
				  <tr className={styles.row}>
				    <td>Скидка бонусами <span className={styles.discount}>копить бонусы</span></td>
				    <td className={`${styles.price} ${manrope.className}`}>-{total.price.discount_bonus} ₽</td>
				  </tr>
				  <tr className={styles.row}>
				    <td>Скидка по промокоду</td>
				    <td className={`${styles.price} ${manrope.className}`}>-{total.price.discount_promo} ₽</td>
				  </tr>
				  <tr className={styles.row}>
				    <td>Сумма заказа</td>
				    <td className={`${styles.price} ${manrope.className}`}>{total.price.sum} ₽</td>
				  </tr>
			  </tbody>
			</table>

		</div>
	)
}

export function Confirm() {
	return (
		<div className={styles.confirm}>
			Оплатить
		</div>
	)
}

export default function Page() {
	return (
		<div className={styles.page_container}>
			<Header title={"Оформление заказа"}/>
			<div>
				<Price />
				<Total />
			</div>
			<Confirm />
		</div>
	)
}