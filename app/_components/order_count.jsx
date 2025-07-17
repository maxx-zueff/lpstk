"use client";

import styles from "./order_count.module.scss";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function OrderCount({quantityX, onQuantityChange}) {
  const [quantity, setQuantity] = useState(quantityX);
  const router = useRouter();

  const changeQuantity = (amount) => {
    const newQuantity = quantity + amount;
    if (newQuantity <= 0) {
          router.push('/remove');
        } else {
          setQuantity(newQuantity);
          onQuantityChange(newQuantity);
        }
    };

  return (
    <div className={styles.order_count}>
      <div className={styles.order_sign} onClick={() => changeQuantity(-1)}>
        -
      </div>
      <div className={styles.order_count_number}>{quantity}</div>
      <div className={styles.order_sign} onClick={() => changeQuantity(1)}>
        +
      </div>
    </div>
  );
}
