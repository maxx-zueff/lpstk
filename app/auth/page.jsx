import Image from 'next/image'
import styles from './page.module.scss'
import { manrope } from './../fonts'
import { Header } from '@/app/_components/header';

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
      <Header title={"Авторизация"}/>
      <Main />
      </>
    )
}