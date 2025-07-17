"use client";

import classNames from "classnames";
import Image from "next/image";
import { Link } from "react-transition-progress/next";
import { usePathname } from "next/navigation";
import { basketItems } from "@/app/_data";
import styles from "./nav_order.module.scss";

export function Nav() {
  const pathname = usePathname();
  const page = pathname.split("/")[1];
  if (page === "remove") {
    return null;
  }

  const isActive = (targetPage) => (page === targetPage ? styles.active : "");

  return (
    <div className={styles.nav_container}>
      {basketItems.map((item) => (
        <Link href={item.path}>
          <div
            key={item.key}
            className={classNames(styles.nav_item, isActive(item.key))}
          >
            <Image src={item.icon} width={25} height={25} alt={item.label} />
            <div className={styles.description}>
              {page === item.key && item.label}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
