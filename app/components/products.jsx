"use client"

import Image from "next/image";
import styles from "../page.module.scss";
import { manrope } from "../fonts";
import { useState, useEffect, useRef } from "react";
import { compileString } from "sass";

function Menu({ activeItemIndex, isFixed, isScrolling, setIsScrolling, setActiveItemIndex, menuItemRefs,menuWrapperRef, menuContainer, products}) {
  const [startPosition, setStartPosition] = useState(0);
  const [leftStyle, setLeftStyle] = useState(0);
  const [delta, setDelta] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const handleDown = (event) => {
    setIsMouseDown(true);
    setStartPosition(event.touches[0].clientX - menuWrapperRef.current.offsetLeft);
  };

  const handleMove = (event) => {
    if (!isMouseDown) return;
    const deltaRight = menuWrapperRef.current.offsetWidth - menuContainer.current.scrollWidth;

    let newDelta = event.touches[0].clientX - menuWrapperRef.current.offsetLeft - startPosition;
    let newLeft = currentTranslate + newDelta;

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

function Items({ activeItemIndex, isFixed, menuWrapperHeight,products,setProducts,selectedItemsHeaderRef }) {
  
  const [sortOrder, setSortOrder] = useState('asc');
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
    <div className={styles.items_container} style={{ paddingTop: isFixed ? menuWrapperHeight - 10 : 0 }}>
      {products.map((item, index) => (
        <div className={styles.items_wrapper} ref={activeItemIndex === index ? selectedItemsHeaderRef : null}>
          <div className={styles.items_header} key={index}>
            <h1>{item.title.text}</h1>
            <div className={styles.items_sort} onClick={() => sortItems(index)}>
              <span>Сортировка</span>
              <Image src={sortOrder == 'desc' ? "/sort-up.png": "/sort-down.png"} alt="Сортировка" width={25} height={25} />
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

export function Products() {

    const [isFixed, setIsFixed] = useState(false);
    const menuWrapperRef = useRef(null);
    const menuContainer = useRef(null);
    const [menuWrapperHeight, setMenuWrapperHeight] = useState(0);
    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const selectedItemsHeaderRef = useRef(null);
    const [isScrolling, setIsScrolling] = useState(false);
    const menuItemRefs = useRef([]);
    // const [leftStyle, setLeftStyle] = useState(0);

    const [products, setProducts] = useState([
      {
        title: {src: "/menu-item.png", text: "Авторские букеты", isActive: 0},
        items: [
          {image: '/item-1.png', price: 2150, title: 'Букет Милан', alt: 'Image of Букет Милан'},
          {image: '/item-2.png', price: 3350, title: 'Букет Пиономания', alt: 'Image of Букет Пиономания'},
          {image: '/item-2.png', price: 3350, title: 'Букет Пиономания', alt: 'Image of Букет Пиономания'},
          {image: '/item-1.png', price: 2150, title: 'Букет Милан', alt: 'Image of Букет Милан'},
          {image: '/item-2.png', price: 3350, title: 'Букет Пиономания', alt: 'Image of Букет Пиономания'}
        ]
      },
      {
        title: {src: "/menu-item2.png", text: "Цветочные композиции", isActive: 1},
        items: [
          {image: '/item-1.png', price: 2150, title: 'Букет Милан', alt: 'Image of Букет Милан'},
          {image: '/item-2.png', price: 3350, title: 'Букет Пиономания', alt: 'Image of Букет Пиономания'},
          {image: '/item-2.png', price: 3350, title: 'Букет Пиономания', alt: 'Image of Букет Пиономания'},
          {image: '/item-1.png', price: 2150, title: 'Букет Милан', alt: 'Image of Букет Милан'},
          {image: '/item-2.png', price: 3350, title: 'Букет Пиономания', alt: 'Image of Букет Пиономания'}
        ]
      },
      {
        title: {src: "/menu-item.png", text: "Свадебные букеты", isActive: 2},
        items: [
          {image: '/item-1.png', price: 2150, title: 'Букет Милан', alt: 'Image of Букет Милан'},
          {image: '/item-2.png', price: 3350, title: 'Букет Пиономания', alt: 'Image of Букет Пиономания'},
          {image: '/item-2.png', price: 3350, title: 'Букет Пиономания', alt: 'Image of Букет Пиономания'},
          {image: '/item-1.png', price: 2150, title: 'Букет Милан', alt: 'Image of Букет Милан'},
          {image: '/item-2.png', price: 3350, title: 'Букет Пиономания', alt: 'Image of Букет Пиономания'}
        ]
      },
      {
        title: {src: "/menu-item4.png", text: "Цветы с конфетами", isActive: 3},
        items: [
          {image: '/item-1.png', price: 2150, title: 'Букет Милан', alt: 'Image of Букет Милан'},
          {image: '/item-2.png', price: 3350, title: 'Букет Пиономания', alt: 'Image of Букет Пиономания'},
          {image: '/item-2.png', price: 3350, title: 'Букет Пиономания', alt: 'Image of Букет Пиономания'},
          {image: '/item-1.png', price: 2150, title: 'Букет Милан', alt: 'Image of Букет Милан'},
          {image: '/item-2.png', price: 3350, title: 'Букет Пиономания', alt: 'Image of Букет Пиономания'}
        ]
      },
      {
        title: {src: "/menu-item.png", text: "Моно букеты", isActive: 4},
        items: [
          {image: '/item-1.png', price: 2150, title: 'Букет Милан', alt: 'Image of Букет Милан'},
          {image: '/item-2.png', price: 3350, title: 'Букет Пиономания', alt: 'Image of Букет Пиономания'},
          {image: '/item-2.png', price: 3350, title: 'Букет Пиономания', alt: 'Image of Букет Пиономания'},
          {image: '/item-1.png', price: 2150, title: 'Букет Милан', alt: 'Image of Букет Милан'},
          {image: '/item-2.png', price: 3350, title: 'Букет Пиономания', alt: 'Image of Букет Пиономания'}
        ]
      }
    ]);

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

      useEffect(() => {
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
                })
              }
            };

            window.addEventListener('scroll', handleScroll);
            
          return () => {
            window.removeEventListener('scroll', handleScroll);
          };
      }, [isScrolling]);



      useEffect(() => {
        if (menuWrapperRef.current) {
          setMenuWrapperHeight(menuWrapperRef.current.offsetHeight);
        }
      }, []);



  
    return (
      <>
        <Menu
          activeItemIndex={activeItemIndex}
          isFixed={isFixed}
          isScrolling={isScrolling}
          setIsScrolling={setIsScrolling}
          setActiveItemIndex={setActiveItemIndex}
          menuItemRefs={menuItemRefs}
          menuWrapperRef={menuWrapperRef}
          menuContainer={menuContainer}
          products={products}
        />
        <Items
          activeItemIndex={activeItemIndex}
          isFixed={isFixed}
          menuWrapperHeight={menuWrapperHeight}
          products={products}
          setProducts={setProducts}
          selectedItemsHeaderRef={selectedItemsHeaderRef}
        />
      </>
    );
  
  }