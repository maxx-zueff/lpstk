"use client"

import Image from "next/image";
import styles from "../page.module.scss";
import { manrope } from "../fonts";
import { useState, useEffect, useRef } from "react";




export function Products() {

    const [isFixed, setIsFixed] = useState(false);
    const menuWrapperRef = useRef(null);
    const menuContainer = useRef(null);
    const [menuWrapperHeight, setMenuWrapperHeight] = useState(0);
    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const [menuItemWidth, setMenuItemWidth] = useState(0);
    const [menuContainerScrollX, setMenuContainerScrollX] = useState(0);
    const selectedItemsHeaderRef = useRef(null);
    const [isScrolling, setIsScrolling] = useState(false);
    const menuItemRefs = useRef([]);

    const products = [
      {
        title: {src: "/menu-item.png", text: "Авторские букеты", isActive: activeItemIndex === 0},
        items: [
          {image: '/item-1.png', price: 2150, title: 'Букет Милан', alt: 'Image of Букет Милан'},
          {image: '/item-2.png', price: 3350, title: 'Букет Пиономания', alt: 'Image of Букет Пиономания'},
          {image: '/item-2.png', price: 3350, title: 'Букет Пиономания', alt: 'Image of Букет Пиономания'},
          {image: '/item-1.png', price: 2150, title: 'Букет Милан', alt: 'Image of Букет Милан'},
          {image: '/item-2.png', price: 3350, title: 'Букет Пиономания', alt: 'Image of Букет Пиономания'}
        ]
      },
      {
        title: {src: "/menu-item2.png", text: "Цветочные композиции", isActive: activeItemIndex === 1},
        items: [
          {image: '/item-1.png', price: 2150, title: 'Букет Милан', alt: 'Image of Букет Милан'},
          {image: '/item-2.png', price: 3350, title: 'Букет Пиономания', alt: 'Image of Букет Пиономания'},
          {image: '/item-2.png', price: 3350, title: 'Букет Пиономания', alt: 'Image of Букет Пиономания'},
          {image: '/item-1.png', price: 2150, title: 'Букет Милан', alt: 'Image of Букет Милан'},
          {image: '/item-2.png', price: 3350, title: 'Букет Пиономания', alt: 'Image of Букет Пиономания'}
        ]
      },
      {
        title: {src: "/menu-item.png", text: "Свадебные букеты", isActive: activeItemIndex === 2},
        items: [
          {image: '/item-1.png', price: 2150, title: 'Букет Милан', alt: 'Image of Букет Милан'},
          {image: '/item-2.png', price: 3350, title: 'Букет Пиономания', alt: 'Image of Букет Пиономания'},
          {image: '/item-2.png', price: 3350, title: 'Букет Пиономания', alt: 'Image of Букет Пиономания'},
          {image: '/item-1.png', price: 2150, title: 'Букет Милан', alt: 'Image of Букет Милан'},
          {image: '/item-2.png', price: 3350, title: 'Букет Пиономания', alt: 'Image of Букет Пиономания'}
        ]
      },
      {
        title: {src: "/menu-item4.png", text: "Цветы с конфетами", isActive: activeItemIndex === 3},
        items: [
          {image: '/item-1.png', price: 2150, title: 'Букет Милан', alt: 'Image of Букет Милан'},
          {image: '/item-2.png', price: 3350, title: 'Букет Пиономания', alt: 'Image of Букет Пиономания'},
          {image: '/item-2.png', price: 3350, title: 'Букет Пиономания', alt: 'Image of Букет Пиономания'},
          {image: '/item-1.png', price: 2150, title: 'Букет Милан', alt: 'Image of Букет Милан'},
          {image: '/item-2.png', price: 3350, title: 'Букет Пиономания', alt: 'Image of Букет Пиономания'}
        ]
      },
      {
        title: {src: "/menu-item.png", text: "Моно букеты", isActive: activeItemIndex === 4},
        items: [
          {image: '/item-1.png', price: 2150, title: 'Букет Милан', alt: 'Image of Букет Милан'},
          {image: '/item-2.png', price: 3350, title: 'Букет Пиономания', alt: 'Image of Букет Пиономания'},
          {image: '/item-2.png', price: 3350, title: 'Букет Пиономания', alt: 'Image of Букет Пиономания'},
          {image: '/item-1.png', price: 2150, title: 'Букет Милан', alt: 'Image of Букет Милан'},
          {image: '/item-2.png', price: 3350, title: 'Букет Пиономания', alt: 'Image of Букет Пиономания'}
        ]
      }
    ]
  
    function Menu() {
      
      // useEffect(() => {
      //   if (menuItemRefs.current[activeItemIndex]) {
      //     const menuItem = menuItemRefs.current[activeItemIndex];
      //     const menuContainerRect = menuContainer.current.getBoundingClientRect();
      //     const menuItemRect = menuItem.getBoundingClientRect();

      //     // Check if the menu item is not fully visible
      //     if (menuItemRect.left < menuContainerRect.left || menuItemRect.right > menuContainerRect.right) {
      //       // Scroll the menu item into view
      //       console.log(menuItem.scrollIntoView)
      //       setTimeout(() => {
      //         menuItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      //         setMenuContainerScrollX(menuContainer.current.scrollLeft)
      //       }, 300);         
      //     }
      //   }
      // }, [activeItemIndex]);

        useEffect(() => {

          console.log(activeItemIndex)
          
            const handleScroll = () => {
                const sliderContent = document.querySelector(`.${styles.slider_content}`);
                const sliderPosition = sliderContent.getBoundingClientRect().bottom;
                setIsFixed(sliderPosition <= 0);

                if (!isScrolling) {
                  const itemsWrappers = document.querySelectorAll(`.${styles.items_wrapper}`);
                  itemsWrappers.forEach((wrapper, index) => {
                    const wrapperPosition = wrapper.getBoundingClientRect().top;
                    if (wrapperPosition <= 160) {
                      setActiveItemIndex(index);
                    }
                  });
                  
                }
            };

            menuContainer.current.scrollLeft = menuContainerScrollX;

            window.addEventListener('scroll', handleScroll);
            return () => {
              window.removeEventListener('scroll', handleScroll);
            };
        }, []);

        useEffect(() => {

          if (selectedItemsHeaderRef.current && isFixed && isScrolling) {
            const scrollOffset = selectedItemsHeaderRef.current.offsetTop - 150;
            window.scrollTo({
              top: scrollOffset,
              behavior: 'smooth'
            });
            setTimeout(() => {
              setIsScrolling(false);
            }, 500);
          }
        }, [activeItemIndex]);
  
      return (
        <div ref={menuWrapperRef} className={`${styles.menu_wrapper} ${isFixed ? styles.menu_container_fixed : ''}`}>
            <div ref={menuContainer} className={styles.menu_container}>
            
            {products.map((item, index) => 
                <div 
                  key={index}
                  ref={el => menuItemRefs.current[index] = el}
                  className={`${styles.menu_item} ${item.title.isActive ? styles.active : ""}`}
                  onClick={() => {
                    setMenuContainerScrollX(menuContainer.current.scrollLeft);
                    setIsScrolling(true);
                    setActiveItemIndex(index);
                  }}
                >
                  <Image
                      src={item.title.src}
                      alt={item.title.text}
                      width={70}
                      height={70}                  
                      className={styles.menu_image}
                  />
                  <p>{item.title.text}</p>
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
          <div className={styles.items_container} style={{ paddingTop: isFixed ? menuWrapperHeight-60 : 0 }}>
            {products.map((item, index) => (
              <div className={styles.items_wrapper} ref={activeItemIndex === index ? selectedItemsHeaderRef : null}>
              <div className={styles.items_header} key={index}>
                <h1>{item.title.text}</h1>
                <div className={styles.items_sort}>
                  <span>Сортировка</span>
                  <Image src="/sort.png" alt="Сортировка" width={25} height={25} />
                </div>
              </div>
              <div className={styles.items_list}>
                {item.items.map((item, idx) => (
                  <div className={styles.item} key={idx}>
                    <Image src={item.image} alt={item.alt} fill className={styles.image} />
                    <div className={styles.items_description}>
                      <p className={`${styles.items_price} ${manrope.className}`}>{item.price} ₽</p>
                      <p className={styles.items_title}>{item.title}</p>
                    </div>
                  </div>
                ))}
              </div>
              </div>
            ))}
          </div>
        );
    }  
  
    return (<><Menu /><Items /></>)
  
  }