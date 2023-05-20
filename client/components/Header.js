import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

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
		console.log(theme)
		if (theme == 'dark'){return 'dark'} 
		else{ return 'light'}
	}

	return (
		<div className={styles.headerContainer}>
			<div className={styles.headerMain}>
				<div className={styles.headerTitle}>
					<h1>Conspectus</h1>
					<p>Welcome, Purav!</p>
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