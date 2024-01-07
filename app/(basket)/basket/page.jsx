import Image from 'next/image'
import styles from '../page.module.scss'
import { manrope } from '../../fonts'
import classNames from "classnames";

export function OrderItem({ src, alt, title, type, price, oldPrice, quantity }) {
  const itemPrice = oldPrice ? (
    <div className={`${styles.order_price} ${manrope.className}`}>
      {price} ₽<span className={styles.oldprice}>{oldPrice} ₽</span>
    </div>
  ) : (
    <div className={`${styles.order_price} ${manrope.className}`}>{price} ₽</div>
  );

  return (
    <div className={styles.order_item}>
      <div className={styles.order_item_content}>
        <div className={styles.order_img_container}>
          <Image src={src} alt={alt} width={90} height={90} className={styles.order_img} />
        </div>
        <div className={styles.order_description}>
          <div className={styles.order_title}>{title}</div>
          <div className={styles.order_type}>{type}</div>
          {itemPrice}
        </div>
      </div>
      <div className={`${styles.order_count} ${manrope.className}`}>
        <div>-</div>
        <div className={styles.order_count_number}>{quantity}</div>
        <div>+</div>
      </div>
    </div>
  );
}

export function Order() {

	const orderItems = [
    {
      src: "/item-1.png",
      alt: "Букет",
      title: "Букет Милан",
      type: "Авторский букет",
      price: "2150",
      quantity: 1,
    },
    {
      src: "/item-2.png",
      alt: "Букет",
      title: "Букет Пиономания",
      type: "Авторский букет",
      price: "4590",
      quantity: 1,
    },
    {
      src: "/item-3.png",
      alt: "Подкормка для цветов",
      title: "Подкормка для цветов",
      type: "Прочее",
      price: "0",
      oldPrice: "20",
      quantity: 1,
    }
  ]

  return (
    <div className={styles.order_container}>
     
			{orderItems.map((item, index) => (
				<OrderItem key={index} {...item} />
	    ))}

    </div>
  );
}

export function AdditionalProducts() {

	const additionalItem = [
		{
			src: "/add-1.png",
			alt: "Образец",
			price: 99,
			description: 'Топпер "С Днём Рождения"'
		},
		{
			src: "/add-2.png",
			alt: "Образец",
			price: 99,
			description: 'Топпер "Любовь"'
		},
		{
			src: "/add-3.png",
			alt: "Образец",
			price: 649,
			description: 'Шар гелиевый "Звезда"'
		},
		{
			src: "/add-4.png",
			alt: "Образец",
			price: 689,
			description: "Раффаэлло 7шт в сердце"
		}
	] 

	return(
		<div className={styles.additional_container}>

			<div className={styles.additional_title}>Добавить к заказу?</div>
			<div className={styles.additional_items}>
			{additionalItem.map((item, index) => <div key={index} className={styles.additional_item}>
				<Image src={item.src} alt={item.alt} width={80} height={80} className={styles.additional_img} />
				<div className={`${styles.additional_price} ${manrope.className}`}>{item.price} ₽</div>
				<div className={styles.additional_description}>{item.description}</div>
			</div>)}
			</div>
		
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
			sum: 5996
		}
	}

	return (
		<div className={styles.total_container}>
			
			<div className={styles.promo_container}>
				<div className={styles.promo_title}>Промокод</div>
				<div className={styles.promo_input}>
					<input type="text" placeholder="XXXXXX" maxlength="10" />
					<div className={styles.promo_btn}>Применить</div>
				</div>
			</div>

			<table className={styles.total_table}>
				<tbody>
				  <tr className={styles.row}>
				    <td>{total.items} товара</td>
				    <td className={`${styles.price} ${manrope.className}`}>{total.price.items} ₽</td>
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
			К оформлению заказа
		</div>
	)
}

export default function Page() {

  return (
    <>
			<Order />
			<AdditionalProducts />
			<Total />
			<Confirm />
    </>
  )
}