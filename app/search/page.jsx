"use client"

import Image from 'next/image'
import styles from './page.module.scss'
import { manrope } from '../fonts'
import { useState } from 'react';
import Fuse from 'fuse.js';
import Link from 'next/link'

const popularItems = [
    {
        imageSrc: "/bouqet1.png",
        title: "Букет Элегант",
        price: 2150,
        description: "Авторский букет",
        flowers: ['розы', 'ромашки', 'хризантемы', 'лилии'],
        id: 1
    },
    {
        imageSrc: "/item-2.png",
        title: "Букет Милан",
        price: 2150,
        description: "Моно букет",
        flowers: ['розы', 'ромашки', 'хризантемы', 'лилии'],
        id: 12
    },
    {
        imageSrc: "/bouqet1.png",
        title: "Букет Премиум",
        price: 2150,
        description: "Композиция",
        flowers: ['розы', 'ромашки', 'хризантемы', 'лилии'],
        id: 13
    },
    {
        imageSrc: "/item-2.png",
        title: "Букет Прелесть",
        price: 2150,
        description: "Авторский букет",
        flowers: ['розы', 'ромашки', 'хризантемы', 'лилии'],
        id: 14
    },
    {
        imageSrc: "/bouqet1.png",
        title: "Букет Восторг",
        price: 2150,
        description: "Авторский букет",
        flowers: ['розы', 'ромашки', 'хризантемы', 'лилии'],
        id: 15
    },
    {
        imageSrc: "/item-2.png",
        title: "Букет Роза",
        price: 2150,
        description: "Авторский букет",
        flowers: ['розы', 'ромашки', 'хризантемы', 'лилии'],
        id: 16
    }
]

const allItems = [
    {
        imageSrc: "/bouqet1.png",
        title: "Букет Элегант",
        price: 2150,
        description: "Авторский букет",
        flowers: ['розы', 'ромашки', 'хризантемы', 'лилии'],
        id: 1
    },
    {
        imageSrc: "/item-2.png",
        title: "Букет Милан",
        price: 2150,
        description: "Моно букет",
        flowers: ['розы', 'ромашки', 'хризантемы', 'лилии'],
        id: 12
    },
    {
        imageSrc: "/bouqet1.png",
        title: "Букет Премиум",
        price: 2150,
        description: "Композиция",
        flowers: ['розы', 'ромашки', 'хризантемы', 'лилии'],
        id: 13
    },
    {
        imageSrc: "/item-2.png",
        title: "Букет Прелесть",
        price: 2150,
        description: "Авторский букет",
        flowers: ['розы', 'ромашки', 'хризантемы', 'лилии'],
        id: 14
    },
    {
        imageSrc: "/bouqet1.png",
        title: "Букет Восторг",
        price: 2150,
        description: "Авторский букет",
        flowers: ['розы', 'ромашки', 'хризантемы', 'лилии'],
        id: 15
    },
    {
        imageSrc: "/item-2.png",
        title: "Букет Роза",
        price: 2150,
        description: "Авторский букет",
        flowers: ['розы', 'ромашки', 'хризантемы', 'лилии'],
        id: 16
    }
]



function Header({ inputValue, setInputValue, matches, setMatches, result, setResult, upResult}) {
    
    
    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        upResult(value);
    };

	return (

        <div className={styles.header_container}>
            <Link href="/">
            <Image
				src="/back.svg"
				width={30}
				height={30}
				alt="Back"
			/>
            </Link>
			<div className={styles.header_search}>
                <Image
                    src="/search-grey.png"
                    width={15}
                    height={15}
                    alt="Search"
                />
                <input 
                    type="text"
                    placeholder='Что будем искать?'
                    value={inputValue}
                    onChange={handleInputChange} />
			</div>
		</div>


	)
}

function Match({matches}) {

    return (
        <div className={styles.match_container}>
            <h1 className={styles.match_header}>
                Похожие запросы
             </h1>

             <div className={styles.match_items}>
             {matches.length === 0 && <div>
                К сожалению, нет похожих запросов
             </div>}
            {matches.map((match, index) => (
                <div className={styles.match_item} key={index}>{match}</div>
            ))}
            

            </div>
            
        </div>
    )
}

function LastSearch({ searchItems, setInputValue, upResult }) {

    function handleClick(value) {
        setInputValue(value);
        upResult(value)
    }
    
    return (
        <div className={styles.lastsearch_container}>
             <h1 className={styles.lastsearch_header}>
                Недавние запросы
             </h1>
            <div className={styles.lastsearch_items}>
                {searchItems.map((item, index) => (
                    <div key={index} className={styles.lastsearch_item} onClick={() => handleClick(item)}>{item}</div>
                ))}
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
            {popularItems.map((item, index) => (
                <Link href={`/${item.id}`}>
                <div className={styles.popular_items} key={index}>
                    <div className={styles.popular_item}>
                        <Image
                            src={item.imageSrc}
                            width={50}
                            height={50}
                            alt={item.title}
                            className={styles.popular_image}
                        />
                        <div  className={styles.description}>
                            <div className={styles.description_row}>
                                <div className={styles.title}>{item.title}</div>
                                <div className={styles.point}></div>
                                <div className={styles.price}>{item.price} ₽</div>
                            </div>
                            <div className={styles.description_row}>{item.description}</div>    
                        </div>
                        
                    </div>
                </div>
                </Link>
            ))}
        </div>
    )
}

function SearchResult({result}) {


    return (
        <div className={styles.popular_container}>
            <h1 className={styles.popular_header}>
            Найдено <span className={manrope.className}>{result.length}</span> товаров
            </h1>
            {result.map((item, index) => (
                <Link href={`/${item.id}`}>
                <div className={styles.popular_items} key={index}>
                    <div className={styles.popular_item}>
                        <Image
                            src={item.imageSrc}
                            width={50}
                            height={50}
                            alt="Bouqet"
                            className={styles.popular_image}
                        />
                        <div  className={styles.description}>
                            <div className={styles.description_row}>
                                <div className={styles.title}>{item.title}</div>
                                <div className={styles.point}></div>
                                <div className={styles.price}>{item.price} ₽</div>
                            </div>
                            <div className={styles.description_row}>{item.description}</div>    
                        </div>
                        
                    </div>
                </div>
                </Link>
            ))}
        </div>
    )
}


export default function Page() {
    const [inputValue, setInputValue] = useState('');
    const [matches, setMatches] = useState([]);
    const [result, setResult] = useState([]);
    let searchItems = ["розы", "хризантемы", "композиции", "монобукет", "лилии"];

    function upResult(value) {
        const searchOptions = allItems.flatMap(bouquet => [bouquet.title, bouquet.description, ...bouquet.flowers]);
        const _searchOptions = [...new Set(searchOptions)];
        
        const fuse = new Fuse(_searchOptions, { threshold: 0.3, keys: ['title'] });
        const fuse_2 = new Fuse(allItems, { threshold: 0.3, keys: ['title', 'description', 'flowers'] });

        const filteredMatches = fuse.search(value).map(result => result.item);
        const filteredMatches_2 = fuse_2.search(value).map(result => result.item);
        
        setMatches(filteredMatches);
        setResult(filteredMatches_2)

    }

    return (
        <>
            <Header inputValue={inputValue} setInputValue={setInputValue} matches={matches} setMatches={setMatches} result={result} setResult={setResult} upResult={upResult}/>
        
            {inputValue.length === 0 ? (
                <>
                <LastSearch searchItems={searchItems} setInputValue={setInputValue} upResult={upResult}/>
                <Popular />
                </>
            ) : (
                <>
                <Match matches={matches} />
                <SearchResult result={result} />
                </>
            )}
        </>
    )
}