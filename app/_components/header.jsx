"use client";

import Image from 'next/image'
import { Link } from "react-transition-progress/next";
import styles from './header.module.scss'
import { usePathname } from "next/navigation";

export function Header({title, fixed = true, path = "/"}) {
	const pathname = usePathname();
	const page = pathname.split("/")[1];

	const titlePath = {
        "remove": "Подтвердить удаление",
        "pay": "Оформление заказа",
		"basket": "Оформление заказа",
        "delivery": "Оформление заказа",
	}

	if (titlePath[page]) {
		title = titlePath[page];
	}

	return (
		<div className={fixed ? styles.header_container : styles.header_container_static}>
			<Link href={path}>
				<Image
					src="/back.svg"
					width={30}
					height={30}
					alt="Back"
				/>
			</Link>
			<p className={styles.header_title}>
				{title}
			</p>
		</div>
	)
}