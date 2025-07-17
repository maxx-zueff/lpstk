"use client";

import styles from './total.module.scss'
import { useState } from "react";
import classNames from "classnames";

export function Total({ totalItems=0, totalPrice=0, discountPromo=false }) {
    const [showBonus, setShowBonus] = useState(false);
    const toggleBonus = () => {
      setShowBonus((prevShowBonus) => !prevShowBonus);
    };
  
    let discount = showBonus ? 0 : 177;
  
    const total = {
      items: totalItems,
      price: {
        items: totalPrice,
        discount_bonus: discount,
        discount_promo: discountPromo,
        sum: totalPrice - discount - discountPromo,
      },
    };
  
    return (
      <div className={styles.total_container}>
        <div className={styles.title}>Итого</div>
  
        <table className={styles.total_table}>
          <tbody>
            <tr className={styles.row}>
              <td>
                <span className={styles.digit}>{total.items}</span> товара
              </td>
              <td className={styles.price}>{total.price.items} ₽</td>
            </tr>
            <tr className={styles.row}>
              <td>
                Скидка бонусами{" "}
                {showBonus ? (
                  <span className={styles.discount} onClick={toggleBonus}>
                    списать бонусы
                  </span>
                ) : (
                  <span className={styles.discount} onClick={toggleBonus}>
                    копить бонусы
                  </span>
                )}
              </td>
              <td className={classNames(styles.price, styles.discount_price)}>{total.price.discount_bonus} ₽</td>
            </tr>
            {total.price.discount_promo && (
              <tr className={styles.row}>
                <td>Скидка по промокоду</td>
                <td className={classNames(styles.price, styles.discount_price)}>{total.price.discount_promo} ₽</td>
              </tr>
            )}
            <tr className={styles.row}>
              <td>Сумма заказа</td>
              <td className={styles.price}>{total.price.sum} ₽</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  