import Image from 'next/image'
import styles from './page.module.scss'
import { manrope } from './../fonts'

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
            <div className={styles.title}>Добро пожаловать!</div>
            <div className={styles.desc}>Каждый день <span>Лепесток</span> выбирают десятки клиентов. Спасибо вам за это!</div>
            <div className={styles.form_row}>
                <div className={styles.form_col}>
                    <div className={styles.form_title}>Телефон</div>
                    <input type="text" placeholder="+7 (ХХХ) ХХХ ХХ ХХ"/>
                </div>	
            </div>

            <div className={styles.confirm}>Получить код</div>
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