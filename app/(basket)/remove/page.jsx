import Image from "next/image";
import styles from "./page.module.scss";
import { Header } from "@/app/_components/header";


export default function Remove() {
    return (
        <>
            <Header/>
            <div className={styles.container}>
                <div className={styles.image_container}>
                    <Image
                        src="/bouqet1.png"
                        alt="Удалить"
                        className={styles.image}
                        fill
                    />
                </div>
                <div className={styles.confirm_header}>Удалить из ваших покупок товар <span className={styles.confirm_item}>Пиономания</span>?</div>
                <div className={styles.confirm_text}>Что бы вернуть товар в корзину, нужно будет снова добавить его из каталога</div>
            </div>
            <div className={styles.confirm_button}>Удалить</div>
        </>
    )
}