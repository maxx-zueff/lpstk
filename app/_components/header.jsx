import Image from 'next/image'
import Link from 'next/link'
import styles from './header.module.scss'

export function Header({title, path = "/"}) {
	return (
		<div className={styles.header_container}>
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