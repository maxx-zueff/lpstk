import styles from "./page.module.scss";

export default function BasketLayout({ children }) {
  return (
    <>
      <div className={styles.wrapper}>{children}</div>
    </>
  );
}
