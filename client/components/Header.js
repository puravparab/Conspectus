import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import styles from '../styles/header.module.css'

const Header = () => {
	const router = useRouter()
	const [currentTheme, setCurrentTheme] = useState('')

	const DARK = '🌙'
	const LIGHT = '☀'

	useEffect(() => {
		const theme = getTheme()
		setCurrentTheme(theme)
	}, [])

	const toggleTheme = () => {
		const theme = localStorage.getItem('theme')
		if (theme == 'dark'){
			localStorage.setItem('theme', 'light')
			setCurrentTheme('light')
		} 
		else{
			localStorage.setItem('theme', 'dark')
			setCurrentTheme('dark')
		}
		router.reload()
	}

	const getTheme = () => {
		const theme = localStorage.getItem('theme')
		if (theme == 'dark'){return 'dark'} 
		else{ return 'light'}
	}

	return (
		<div className={styles.headerContainer}>
			<div className={styles.headerMain}>
				<div className={styles.headerTitle}>
					<Link href='/'><h1>Conspectus</h1></Link>
					{/* <p>Welcome!</p> */}
				</div>

				{/* Navbar */}
				<div className={styles.navbar}>
					<div className={styles.navItem}>
						<Link href="/contacts"><h2 className={router.pathname == '/contacts'? styles.navActive: ""}>Contacts</h2></Link>
					</div>
					<div className={styles.navItem}>
						<Link href="/orgs"><h2 className={router.pathname == '/orgs'? styles.navActive: ""}>Orgs</h2></Link>
					</div>
					<div className={styles.navItem}>
						<Link href="/notes"><h2 className={router.pathname == '/notes'? styles.navActive: ""}>Notes</h2></Link>
					</div>
				</div>

				<div className={styles.headerRight}>
					<p onClick={toggleTheme}>
						{currentTheme === 'dark' && DARK}
						{currentTheme === 'light' && LIGHT}
					</p>
				</div>
			</div>
		</div>
	)
}

export default Header