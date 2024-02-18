import Image from 'next/image'
import styles from './page.module.scss'
import { manrope } from '../fonts'

function Header() {
	return (
		<div className={styles.header_container}>
			<Image
				src="/back.svg"
				width={30}
				height={30}
				alt="Back"
			/>
			<div className={styles.header_search}>
                <Image
                    src="/search-grey.png"
                    width={15}
                    height={15}
                    alt="Search"
                />
                <input type="text" placeholder='Что будем искать?'></input>
			</div>
		</div>
	)
}

function LastSearch() {
    return (
        <div className={styles.lastsearch_container}>
             <h1 className={styles.lastsearch_header}>
                Недавние запросы
             </h1>
            <div className={styles.lastsearch_items}>
             <div className={styles.lastsearch_item}>розы</div>
             <div className={styles.lastsearch_item}>хризантемы</div>
             <div className={styles.lastsearch_item}>композиции</div>
             <div className={styles.lastsearch_item}>монобукет</div>
             <div className={styles.lastsearch_item}>лилии</div>
            </div>
        </div>
    )
}

function Popular() {
    return (
        <div className={styles.popular_container}>
            <h1 className={styles.popular_header}>
                Популярные букеты
            </h1>
            <div className={styles.popular_items}>
                <div className={styles.popular_item}>
                    <Image
                        src="/bouqet1.png"
                        width={50}
                        height={50}
                        alt="Bouqet"
                        className={styles.popular_image}
                    />
                    <div  className={styles.description}>
                        <div className={styles.description_row}>
                            <div className={styles.title}>Букет Элегант</div>
                            <div className={styles.point}></div>
                            <div className={styles.price}>2150 ₽</div>
                        </div>
                        <div className={styles.description_row}>Авторский букет</div>    
                    </div>
                    
                </div>
            </div>
            <div className={styles.popular_items}>
                <div className={styles.popular_item}>
                    <Image
                        src="/item-2.png"
                        width={50}
                        height={50}
                        alt="Bouqet"
                        className={styles.popular_image}
                    />
                    <div  className={styles.description}>
                        <div className={styles.description_row}>
                            <div className={styles.title}>Букет Милан</div>
                            <div className={styles.point}></div>
                            <div className={styles.price}>2150 ₽</div>
                        </div>
                        <div className={styles.description_row}>Авторский букет</div>    
                    </div>
                    
                </div>
            </div>
            <div className={styles.popular_items}>
                <div className={styles.popular_item}>
                    <Image
                        src="/item-1.png"
                        width={50}
                        height={50}
                        alt="Bouqet"
                        className={styles.popular_image}
                    />
                    <div  className={styles.description}>
                        <div className={styles.description_row}>
                            <div className={styles.title}>Букет Премиум</div>
                            <div className={styles.point}></div>
                            <div className={styles.price}>2150 ₽</div>
                        </div>
                        <div className={styles.description_row}>Авторский букет</div>    
                    </div>
                    
                </div>
            </div>
            <div className={styles.popular_items}>
                <div className={styles.popular_item}>
                    <Image
                        src="/item-2.png"
                        width={50}
                        height={50}
                        alt="Bouqet"
                        className={styles.popular_image}
                    />
                    <div  className={styles.description}>
                        <div className={styles.description_row}>
                            <div className={styles.title}>Букет Прелесть</div>
                            <div className={styles.point}></div>
                            <div className={styles.price}>2450 ₽</div>
                        </div>
                        <div className={styles.description_row}>Авторский букет</div>    
                    </div>
                    
                </div>
            </div>
            <div className={styles.popular_items}>
                <div className={styles.popular_item}>
                    <Image
                        src="/bouqet1.png"
                        width={50}
                        height={50}
                        alt="Bouqet"
                        className={styles.popular_image}
                    />
                    <div  className={styles.description}>
                        <div className={styles.description_row}>
                            <div className={styles.title}>Букет Милан</div>
                            <div className={styles.point}></div>
                            <div className={styles.price}>2990 ₽</div>
                        </div>
                        <div className={styles.description_row}>Авторский букет</div>    
                    </div>
                    
                </div>
            </div>
            <div className={styles.popular_items}>
                <div className={styles.popular_item}>
                    <Image
                        src="/item-2.png"
                        width={50}
                        height={50}
                        alt="Bouqet"
                        className={styles.popular_image}
                    />
                    <div  className={styles.description}>
                        <div className={styles.description_row}>
                            <div className={styles.title}>Букет Милан</div>
                            <div className={styles.point}></div>
                            <div className={styles.price}>2390 ₽</div>
                        </div>
                        <div className={styles.description_row}>Авторский букет</div>    
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default function Page() {
    return (
      <>
      <Header />
      <LastSearch />
      <Popular />
      </>
    )
}