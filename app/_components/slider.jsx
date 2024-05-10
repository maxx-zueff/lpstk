"use client";

import Image from "next/image";
import styles from './slider.module.scss'
import { manrope } from "../fonts";
import { useState, useRef } from "react";

export function Slider({ contentItems }) {
  const sliderContentRef = useRef(null);
  const navItems = ["Предложения", "Отзывы", "Промокоды"];
  const [activeState, setActiveState] = useState({ index: 0, subIndex: 0 });
  const { index, subIndex } = activeState;
  const [touchStart, setTouchStart] = useState(0);
  
  const handleTouchStart = (event) => {
    setTouchStart(event.touches[0].clientX);
  };

  const handleTouchOver = (event) => {
    let move = event.touches[0].clientX - touchStart;
    const sliderContent = document.querySelector(`.${styles.slider_content}`);
    sliderContent.style.transform = `translateX(${move}px)`;
  };

  const decrementSubIndex = (prevState) => ({
    ...prevState,
    subIndex: prevState.subIndex === 0 ? contentItems[((prevState.index - 1 + navItems.length) % navItems.length)].length - 1 : prevState.subIndex - 1,
    index: prevState.subIndex === 0 ? (prevState.index - 1 + navItems.length) % navItems.length : prevState.index,
  });

  const incrementSubIndex = (prevState) => ({  
    ...prevState,
    subIndex: (prevState.subIndex + 1) % contentItems[prevState.index].length,
    index: prevState.subIndex === contentItems[prevState.index].length - 1 ? (prevState.index + 1) % navItems.length : prevState.index,
  });

  const handleTouchEnd = (event) => {

    const touchEnd = event.changedTouches[0].clientX
    if (touchEnd > touchStart) {
      setActiveState(decrementSubIndex);
    } else {
      setActiveState(incrementSubIndex);
    }
    const sliderContent = document.querySelector(`.${styles.slider_content}`);
    sliderContent.classList.add("slider_animation");

  }

  return (
    <div className={styles.slider_container}>
      <ul className={styles.slider_nav}>
        {navItems.map((item, index) => (
          <li
            key={item}
            className={index === activeState.index ? styles.active : ""}
            onClick={() => setActiveState({ index, subIndex: 0 })}
          >
            {item}
          </li>
        ))}
      </ul>

      {contentItems.map((subArray, index) => (
        <>
          {subArray.map(
            (item, subIndex) =>
              index === activeState.index &&
              subIndex === activeState.subIndex && (
                <div className={styles.slider_content}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                  onTouchMove={handleTouchOver}
                >
                  <div className={styles.slider_image_wrapper}>
                    <Image
                      src={item.image}
                      alt={item.description}
                      layout="fill"
                      className={styles.slider_image}
                    />
                  </div>
                  <div className={styles.slider_description}>{item.description}</div>
                </div>
              )
          )}

          {index === activeState.index && (
            <ul className={styles.slider_subnav}>
              {subArray.map((item, subIndex) => (
                <li
                  key={item}
                  className={
                    subIndex === activeState.subIndex ? styles.active : ""
                  }
                  onClick={() => setActiveState({ ...activeState, subIndex })}
                ></li>
              ))}
            </ul>
          )}
        </>
      ))}
    </div>
  );
}