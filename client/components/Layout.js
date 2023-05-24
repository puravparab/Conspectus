import { useState, useEffect } from 'react'

import Header from './Header.js'
import styles from '../styles/layout.module.css'

const Layout = ({ children }) => {
	const [IsLightMode, setIsLightMode] = useState(false)

	useEffect(() => {
		// Check if the theme is saved in local storage
		const savedTheme = localStorage.getItem('theme')
		if (savedTheme === "light"){setIsLightMode(true)}
		else if (savedTheme === "dark"){setIsLightMode(false)}
		else { 
			localStorage.setItem('theme', 'dark')
			setIsLightMode(false)
		}
	}, [])

	return (
		<>
			<div className={IsLightMode? styles.pageLayoutLight : styles.pageLayoutDark}>
				<Header />
				<div className={styles.pageBodyLayout}>
					{ children }
				</div>
			</div>
		</>
	)
}

export default Layout