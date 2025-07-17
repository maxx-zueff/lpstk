"use client"

import Image from "next/image";
import styles from "./products.module.scss";
import { manrope } from "../fonts";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-transition-progress/next";

function Menu({ activeItemIndex, setActiveItemIndex, isFixed, setIsFixed, products, selectedItemsHeaderRef}) {
  const [startPosition, setStartPosition] = useState(0);
  const [leftStyle, setLeftStyle] = useState(0);
  const [delta, setDelta] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const menuItemRefs = useRef([]);
  const menuWrapperRef = useRef(null);
  const menuContainer = useRef(null);

  const handleDown = (event) => {
    setIsMouseDown(true);
    setStartPosition(event.touches[0].clientX - menuWrapperRef.current.offsetLeft);
  };

  const handleMove = (event) => {
    if (!isMouseDown) return;
    const deltaRight = menuWrapperRef.current.offsetWidth - menuContainer.current.scrollWidth;

    let newDelta = event.touches[0].clientX - menuWrapperRef.current.offsetLeft - startPosition;
    let newLeft = currentTranslate + (newDelta*2);

    if (newLeft > 0) {
      newLeft = 0;
      newDelta = 0;
      setCurrentTranslate(0);
    }

    if (newLeft < deltaRight) {
      newLeft = deltaRight;
      newDelta = 0;
      setCurrentTranslate(deltaRight);
    }

    setDelta(newDelta);
    setLeftStyle(newLeft);
  };

  const handleUp = () => {
    setIsMouseDown(false);
    setCurrentTranslate(currentTranslate + delta);
    setDelta(0);
  };

  useEffect(() => {
    if (menuItemRefs.current[activeItemIndex]) {
      const activeItem = menuItemRefs.current[activeItemIndex];
      const activeItemPosition = activeItem.getBoundingClientRect().left;
      const activeItemWidth = activeItem.offsetWidth;
      const menuContainerWidth = menuContainer.current.offsetWidth;
      const deltaRight = menuWrapperRef.current.offsetWidth - menuContainer.current.scrollWidth;

      
      let newLeft = currentTranslate;
      
      if (activeItemPosition + activeItemWidth > menuContainerWidth) {
        newLeft = currentTranslate - (activeItemPosition + activeItemWidth - menuContainerWidth);
      
      } else if (activeItemPosition < 0) {
        // activeItemPosition на 30px дальше от фактического края
        newLeft = currentTranslate - activeItemPosition + 30;
      }
  
      if (newLeft < deltaRight) {
        newLeft = deltaRight;
      }
  
      setCurrentTranslate(newLeft);
      setLeftStyle(newLeft);
    }
  }, [activeItemIndex]);

  useEffect(() => {
    const handleScroll = () => {
        
        setIsFixed( window.scrollY >= 340);

        if (!isScrolling) {
          const itemsWrappers = document.querySelectorAll(`.${styles.items_section}`);
          itemsWrappers.forEach((wrapper, index) => {
            const wrapperPosition = wrapper.getBoundingClientRect().top;
            if (wrapperPosition <= 160) {
              setActiveItemIndex(index);
            }
          })
        }
      };

      window.addEventListener('scroll', handleScroll);
      
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
}, [isScrolling]);

useEffect(() => {

  if (selectedItemsHeaderRef.current && isScrolling) {
    let scrollOffset = selectedItemsHeaderRef.current.offsetTop - 200;
    if (isFixed) {
      scrollOffset = selectedItemsHeaderRef.current.offsetTop - 135;
    } 
    window.scrollTo({
      top: scrollOffset,
      behavior: 'smooth'
    });
    setTimeout(() => {
      setIsScrolling(false);
    },700)
  }

  
}, [activeItemIndex]);


  return (
    <div className={isFixed ? styles.menu_container_fixed : ''}>
      <div ref={menuWrapperRef} className={styles.menu_wrapper}>
        <div
          ref={menuContainer}
          className={styles.menu_container}
          onTouchStart={handleDown}
          onTouchMove={handleMove}
          onTouchEnd={handleUp}
          style={{ left: `${leftStyle}px` }}
        >
          {products.map((item, index) => (
            <div
              key={index}
              ref={(el) => (menuItemRefs.current[index] = el)}
              className={`${styles.menu_item} ${
                item.title.isActive == activeItemIndex ? styles.active : ''
              }`}
              onClick={() => {
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
          ))}
        </div>
      </div>
    </div>
  );
}

function Items({ activeItemIndex, isFixed,products,setProducts, selectedItemsHeaderRef }) {
  
  const [sortOrder, setSortOrder] = useState('asc');
  const [clickedItemIndex, setClickedItemIndex] = useState(null);
  const newProducts = [...products];

  const sortItems = (productIndex) => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    newProducts[productIndex].items.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    setProducts(newProducts);
  };
 
  return (
    <div className={styles.items_container} style={{ paddingTop: isFixed ? 100 : 0 }}>
      {products.map((item, index) => (
        <div className={styles.items_section} key={index} ref={activeItemIndex === index ? selectedItemsHeaderRef : null}>
          <div className={styles.items_header}>
            <h1>{item.title.text}</h1>
            <div className={styles.items_sort} onClick={() => sortItems(index)}>
              <span>Сортировка</span>
              <Image src={sortOrder == 'desc' ? "/sort-up.png": "/sort-down.png"} alt="Сортировка" width={25} height={25} />
            </div>
          </div>
          <div className={styles.items_list}>
            {item.items.map((item, idx) => (
              
              <div
                className={`${styles.item} ${clickedItemIndex === index ? styles.clicked : ''}`} 
                key={idx}
                onClick={() => {
                  setClickedItemIndex(index);
                }}
              >
                <Link href={`/${item.item}`}>
                <Image src={item.image} alt={item.alt} fill className={styles.image} />
                <div className={styles.items_description}>
                  <p className={`${styles.items_price} ${manrope.className}`}>{item.price} ₽</p>
                  <p className={styles.items_title}>{item.title}</p>
                </div>
                </Link>
              </div>
              
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function Products() {

    const [isFixed, setIsFixed] = useState(false);
    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const selectedItemsHeaderRef = useRef(null);

    const [products, setProducts] = useState([
      {
        title: {src: "/menu-item.png", text: "Авторские букеты", isActive: 0},
        items: [
          {image: '/item-1.png', price: 2150, title: 'Букет Милан', alt: 'Image of Букет Милан', item: 1},
          {image: '/item-2.png', price: 3350, title: 'Букет Пиономания', alt: 'Image of Букет Пиономания', item: 2},
          {image: '/item-2.png', price: 3350, title: 'Букет Пиономания', alt: 'Image of Букет Пиономания', item: 3},
          {image: '/item-1.png', price: 2150, title: 'Букет Милан', alt: 'Image of Букет Милан', item: 4},
          {image: '/item-2.png', price: 3350, title: 'Букет Пиономания', alt: 'Image of Букет Пиономания', item: 5}
        ]
      },
      {
        title: {src: "/menu-item2.png", text: "Цветочные композиции", isActive: 1},
        items: [
          {image: '/item-1.png', price: 2150, title: 'Букет Милан', alt: 'Image of Букет Милан', item:6},
          {image: '/item-2.png', price: 3350, title: 'Букет Пиономания', alt: 'Image of Букет Пиономания', item:7},
          {image: '/item-2.png', price: 3350, title: 'Букет Пиономания', alt: 'Image of Букет Пиономания', item:8},
          {image: '/item-1.png', price: 2150, title: 'Букет Милан', alt: 'Image of Букет Милан', item:9},
          {image: '/item-2.png', price: 3350, title: 'Букет Пиономания', alt: 'Image of Букет Пиономания', item:10}
        ]
      },
      {
        title: {src: "/menu-item.png", text: "Свадебные букеты", isActive: 2},
        items: [
          {image: '/item-1.png', price: 2150, title: 'Букет Милан', alt: 'Image of Букет Милан', item:11},
          {image: '/item-2.png', price: 3350, title: 'Букет Пиономания', alt: 'Image of Букет Пиономания',item:12},
          {image: '/item-2.png', price: 3350, title: 'Букет Пиономания', alt: 'Image of Букет Пиономания',item:13},
          {image: '/item-1.png', price: 2150, title: 'Букет Милан', alt: 'Image of Букет Милан',item:14},
          {image: '/item-2.png', price: 3350, title: 'Букет Пиономания', alt: 'Image of Букет Пиономания',item:15}
        ]
      },
      {
        title: {src: "/menu-item4.png", text: "Цветы с конфетами", isActive: 3},
        items: [
          {image: '/item-1.png', price: 2150, title: 'Букет Милан', alt: 'Image of Букет Милан', item:16},
          {image: '/item-2.png', price: 3350, title: 'Букет Пиономания', alt: 'Image of Букет Пиономания',item:17},
          {image: '/item-2.png', price: 3350, title: 'Букет Пиономания', alt: 'Image of Букет Пиономания',item:18},
          {image: '/item-1.png', price: 2150, title: 'Букет Милан', alt: 'Image of Букет Милан',item:19},
          {image: '/item-2.png', price: 3350, title: 'Букет Пиономания', alt: 'Image of Букет Пиономания',item:20}
        ]
      },
      {
        title: {src: "/menu-item.png", text: "Моно букеты", isActive: 4},
        items: [
          {image: '/item-1.png', price: 2150, title: 'Букет Милан', alt: 'Image of Букет Милан',item:21},
          {image: '/item-2.png', price: 3350, title: 'Букет Пиономания', alt: 'Image of Букет Пиономания',item:22},
          {image: '/item-2.png', price: 3350, title: 'Букет Пиономания', alt: 'Image of Букет Пиономания',item:23},
          {image: '/item-1.png', price: 2150, title: 'Букет Милан', alt: 'Image of Букет Милан',item:24},
          {image: '/item-2.png', price: 3350, title: 'Букет Пиономания', alt: 'Image of Букет Пиономания',item:25}
        ]
      }
    ]);
  
    return (
      <>
        <Menu
          selectedItemsHeaderRef={selectedItemsHeaderRef}
          activeItemIndex={activeItemIndex}
          isFixed={isFixed}
          products={products}
          setIsFixed={setIsFixed}
          setActiveItemIndex={setActiveItemIndex}
        />
        <Items
          selectedItemsHeaderRef={selectedItemsHeaderRef}
          activeItemIndex={activeItemIndex}
          isFixed={isFixed}
          products={products}
          setProducts={setProducts}
        />
      </>
    );
  
  }