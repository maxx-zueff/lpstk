"use client"

import Image from "next/image";
import styles from "../page.module.scss";
import { manrope } from "../fonts";
import { useState, useEffect, useRef } from "react";




export function Products() {

    const [isFixed, setIsFixed] = useState(false);
    const menuWrapperRef = useRef(null);
    const [menuWrapperHeight, setMenuWrapperHeight] = useState(0);

    const items = [
      {image: '/item-1.png', price: 2150, title: 'Букет Милан', alt: 'Image of Букет Милан'},
      {image: '/item-2.png', price: 3350, title: 'Букет Пиономания', alt: 'Image of Букет Пиономания'},
      {image: '/item-2.png', price: 3350, title: 'Букет Пиономания', alt: 'Image of Букет Пиономания'},
      {image: '/item-1.png', price: 2150, title: 'Букет Милан', alt: 'Image of Букет Милан'},
      {image: '/item-2.png', price: 3350, title: 'Букет Пиономания', alt: 'Image of Букет Пиономания'}
    ];
  
    const menuItems = [
      {src: "/menu-item.png", text: "Авторские букеты", isActive: true},
      {src: "/menu-item2.png", text: "Цветочные композиции"},
      {src: "/menu-item.png", text: "Свадебные букеты"},
      {src: "/menu-item4.png", text: "Цветы с конфетами"},
      {src: "/menu-item.png", text: "Моно букеты"},
    ];
  
    function Menu() {

        
        
        

        useEffect(() => {
            const handleScroll = () => {
                const sliderContent = document.querySelector(`.${styles.slider_content}`);
                const sliderPosition = sliderContent.getBoundingClientRect().bottom;
                setIsFixed(sliderPosition <= 0);
            };

            window.addEventListener('scroll', handleScroll);
            return () => {
            window.removeEventListener('scroll', handleScroll);
            };
        }, []);

  
      return (
        <div ref={menuWrapperRef} className={`${styles.menu_wrapper} ${isFixed ? styles.menu_container_fixed : ''}`}>
            <div className={styles.menu_container}>
            
            {menuItems.map((item, index) => 
                <div key={index} className={`${styles.menu_item} ${item.isActive ? styles.active : ""}`}>
                <Image
                    src={item.src}
                    alt={item.text}
                    width={70}
                    height={70}                  
                    className={styles.menu_image}
                />
                <p>{item.text}</p>
                </div>
            )}
    
            </div>
        </div>
      )
    }
  
    function Items() {
        
        
      
        useEffect(() => {
          if (menuWrapperRef.current) {
            setMenuWrapperHeight(menuWrapperRef.current.offsetHeight);
          }
        }, []);

      return (
        <div className={styles.items_container} style={{ paddingTop: isFixed ? menuWrapperHeight-30 : 30 }}>
  
          <div className={styles.items_header}>
            <h1>Авторские букеты</h1>
            <div className={styles.items_sort}>
              <span>Сортировка</span>
              <Image
                src="/sort.png"
                alt="Сортировка"
                width={25}
                height={25}                  
              />
            </div>
          </div>
  
          <div className={styles.items_list}>
  
          {
            items.map((item, idx) => (
              <div className={styles.item} key={idx}>
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className={styles.image}
                />
                <div className={styles.items_description}>
                  <p className={`${styles.items_price} ${manrope.className}`}>{item.price} ₽</p>
                  <p className={styles.items_title}>{item.title}</p>
                </div>
              </div>
            ))
          }
            
          </div>
        </div>
      )
    }  
  
    return (<><Menu /><Items /></>)
  
  }