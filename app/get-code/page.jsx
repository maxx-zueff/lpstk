import Image from 'next/image'
import styles from './page.module.scss'
import { manrope } from './../fonts'

let phone = "+7 999 000 00 00"

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
				Авторизация
			</p>
		</div>
	)
}

export function Main() {
	return (
        <div className={styles.auth_container}>
            <div className={styles.title}>Код</div>
            <div className={styles.desc}>Введите код из СМС. Мы отправили его на номер <span className={manrope.className}>{phone}</span>. <a>Изменить номер</a></div>
            <div className={styles.form_row}>
                <div className={styles.form_col}>
                    <div className={styles.form_title}>Введите код</div>
                    <input type="text" placeholder="ХХ ХХ"/>
                </div>	
            </div>

            <div className={styles.repeat}>Отправить код ещё раз через 00:30</div>

        </div>
    )
}

export default function Page() {
    return (
      <>
      <Header />
      <Main />
      </>
    )
}