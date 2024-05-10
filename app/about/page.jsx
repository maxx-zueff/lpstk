import Image from 'next/image'
import styles from './page.module.scss'
import { manrope } from '../fonts'
import { Header } from '@/app/_components/header';

function Description()  {
    return (
        <div className={styles.main_container}>
            <Image src="/bg.webp" alt="Background" fill className={styles.image} />
            <div className={styles.desc_container}>
                <p>Салон цветов «Лепесток» — это уютный цветочный в Ярославле. Мы работаем с 2019 года. Наши флористы очень быстро и со вкусом собирают оригинальные букеты из привычных цветов. Мы гарантируем быструю сборку букетов, а также бережное отношение к каждому заказу.</p>
                <p>У нас всегда свежие и красивые цветы, которые подарят радость и уют вашему дому или близким. Мы создаем настроение и эмоции через каждый цветочный акцент. Заказывайте красоту у нас, ведь цветы — это всегда актуальный и незабываемый подарок для любого случая. </p>
            </div>
        </div>
    )
}

export default function Page() {
    return (
      <>
      <Header title={"О Нас"}/>
      <Description />
      </>
    )
  }