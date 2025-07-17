"use client";

import Image from "next/image";
import styles from "./page.module.scss";
import OrderCount from "@/app/_components/order_count";
import { Total }  from "@/app/_components/total";
import { Link } from "react-transition-progress/next";
import { orderAdditionalItem, orderItems } from "@/app/_data";
import { useState, useRef, createRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export function Order({ onQuantityChange, orderItems }) {
  const router = useRouter();
  const orderItemRefs = useRef([]);
  const [touchStart, setTouchStart] = useState(0);
  const handleTouchStart = (index, event) => {
    setTouchStart(event.touches[0].clientX);
  };

  const handleTouchOver = (index, event) => {
    let move = (event.touches[0].clientX - touchStart) * 2;
    if (move > 0) {
      orderItemRefs.current[index].style.transform = `translateX(${Math.min(
        move,
        50
      )}px)`;
    }
  };

  const handleTouchEnd = (index, event) => {
    const touchEnd = event.changedTouches[0].clientX;
    let move = touchEnd - touchStart;
    if (move >= 50) {
      router.push("/remove");
    }

    orderItemRefs.current[index].style.transform = `translateX(${0}px)`;
  };

  const renderItem = (
    { src, alt, title, type, price, oldPrice, quantity, id },
    index
  ) => {
    return (
      <div className={styles.order_item_wrapper}>
        <div className={styles.order_remove_container}>
          <div className={styles.order_remove_bg}></div>
          <Image
            src="/trash.png"
            alt={alt}
            width={20}
            height={20}
            className={styles.order_img_remove}
          />
        </div>
        <div
          key={id}
          className={styles.order_item}
          onTouchStart={(e) => handleTouchStart(index, e)}
          onTouchEnd={(e) => handleTouchEnd(index, e)}
          onTouchMove={(e) => handleTouchOver(index, e)}
          ref={(el) => (orderItemRefs.current[index] = el)}
        >
          <div className={styles.order_item_content}>
            <div className={styles.order_img_container}>
              <Image
                src={src}
                alt={alt}
                width={80}
                height={80}
                className={styles.order_img}
              />
            </div>
            <div className={styles.order_description}>
              <div className={styles.order_title}>{title}</div>
              <div className={styles.order_type}>{type}</div>
              <div className={styles.order_price}>
                {price} ₽
                {oldPrice && (
                  <span className={styles.old_price}>{oldPrice} ₽</span>
                )}
              </div>
            </div>
          </div>
          <OrderCount
            quantityX={quantity}
            onQuantityChange={(newQuantity) =>
              onQuantityChange(id, newQuantity)
            }
          />
        </div>
      </div>
    );
  };

  return (
    <div className={styles.order_container}>
      {orderItems.map((item, index) => renderItem(item, index))}
    </div>
  );
}

export function AdditionalProducts({ onAdditionalItemClick }) {
  const additionalItemsRef = useRef(null);
  const additionalItemsWrapperRef = useRef(null);

  const [startPosition, setStartPosition] = useState(0);
  const [leftStyle, setLeftStyle] = useState(0);
  const [delta, setDelta] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  const handleDown = (event) => {
    setIsMouseDown(true);
    setStartPosition(
      event.touches[0].clientX - additionalItemsWrapperRef.current.offsetLeft
    );
  };

  const handleMove = (event) => {
    if (!isMouseDown) return;
    const deltaRight =
      additionalItemsWrapperRef.current.offsetWidth -
      additionalItemsRef.current.scrollWidth;

    let newDelta =
      event.touches[0].clientX -
      additionalItemsWrapperRef.current.offsetLeft -
      startPosition;
    let newLeft = currentTranslate + newDelta * 2;

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

  return (
    <div className={styles.additional_container}>
      <div className={styles.title}>Добавить к заказу?</div>
      <div
        className={styles.additional_items_container}
        ref={additionalItemsWrapperRef}
      >
        <div
          className={styles.additional_items}
          ref={additionalItemsRef}
          onTouchStart={handleDown}
          onTouchMove={handleMove}
          onTouchEnd={handleUp}
          style={{ left: `${leftStyle}px` }}
        >
          {orderAdditionalItem.map((item, index) => (
            <div
              key={index}
              className={styles.additional_item}
              onClick={() => onAdditionalItemClick(item)}
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={80}
                height={80}
                className={styles.additional_img}
              />
              <div className={styles.additional_description}>
                <div className={styles.additional_price}>{item.price} ₽</div>
                <div>{item.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Promo({ onPromoConfirm }) {
  const [confirm, setConfirm] = useState(true); // Add this state
  const [promoState, setPromoState] = useState("button"); // Add this state

  const handlePromoClick = () => {
    if (confirm) {
      setPromoState("ok");
      onPromoConfirm(600);
    } else {
      setPromoState("cancel");
      onPromoConfirm(false);
      setTimeout(() => {
        setPromoState("button");
      }, 1500);
    }
  };

  return (
    <div className={styles.promo_container}>
      <div className={styles.title}>Промокод</div>
      <div className={styles.promo_input}>
        <input type="text" placeholder="Ваш промокод" maxlength="10" />
        {promoState === "button" && (
          <div className={styles.promo_btn} onClick={handlePromoClick}>
            Применить
          </div>
        )}
        {promoState === "ok" && (
          <Image
            src="/done.png"
            alt="Done"
            width={15}
            height={15}
            className={styles.promo_ok}
          />
        )}
        {promoState === "cancel" && (
          <Image
            src="/cancel.png"
            alt="Cancel"
            width={15}
            height={15}
            className={styles.promo_cancel}
          />
        )}
      </div>
    </div>
  );
}

export function Confirm() {
  return (
    <Link href="/delivery">
      <div className={styles.confirm}>К оформлению заказа</div>;
    </Link>
  );
}

export default function Page() {
  const [orderItemsState, setOrderItemsState] = useState(orderItems);
  const [totalItems, setTotalItems] = useState(
    orderItemsState.reduce((acc, item) => acc + item.quantity, 0)
  );
  const [totalPrice, setTotalPrice] = useState(
    orderItemsState.reduce((acc, item) => acc + parseInt(item.price), 0)
  );
  const [discountPromo, setDiscountPromo] = useState(false);

  const handleAdditionalItemClick = (item) => {
    if (!orderItemsState.some((orderItem) => orderItem.id === item.id)) {
      setOrderItemsState((prevItems) => [...prevItems, item]);
      setTotalItems(totalItems + 1);
      setTotalPrice(totalPrice + parseInt(item.price));
    }
  };

  let updatedItems = [];
  const handleQuantityChange = (id, newQuantity) => {
    updatedItems = orderItemsState.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity} : item
    );
    setTotalItems(updatedItems.reduce((acc, item) => acc + item.quantity, 0));
    setTotalPrice(
      updatedItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    );
    setOrderItemsState(updatedItems);
  };

  const handlePromoConfirm = (value) => {
    setDiscountPromo(value);
  };

  return (
    <>
      <Order
        onQuantityChange={handleQuantityChange}
        orderItems={orderItemsState}
      />
      <AdditionalProducts onAdditionalItemClick={handleAdditionalItemClick} />
      <Promo onPromoConfirm={handlePromoConfirm} />
      <Total
        totalItems={totalItems}
        totalPrice={totalPrice}
        discountPromo={discountPromo}
      />
      <Confirm />
    </>
  );
}
