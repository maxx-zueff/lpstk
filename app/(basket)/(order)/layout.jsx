import styles from "./page.module.scss";
import { Header } from "@/app/_components/header";
import { Nav } from "@/app/_components/nav_order";

export default function BasketLayout({ children }) {
  return (
    <>
      <div className={styles.header_container}>
        <Header fixed={false} />
        <Nav />
      </div>
      <div className={styles.wrapper}>{children}</div>
    </>
  );
}
