import { useState } from 'react'
import Head from 'next/head'

import ContactNav from '../../components/Contacts/ContactNav.js'
import ContactDash from '../../components/Contacts/ContactDash.js'
import styles from '../../styles/contacts.module.css'

const Contacts = () => {
	return (
		<>
			<Head>
				<title>Contacts | Conspectus</title>
				<meta 
					name="description" 
					content="Your Contacts"
				/>
				{/* <link rel="canonical" href="/" /> */}
				<meta property="og:title" content="Contacts | Conspectus" />
				<meta property="og:url" content="" />
				<meta 
					property="og:description" 
					content="Your Contacts"
				/>
				<meta name="twitter:site" content="" />
				<meta name="twitter:description" content="Your Contacts" />
			</Head>

			<div className={styles.contactContainer}>
				<ContactNav />
				<ContactDash />
			</div>
		</>
	)
}

export default Contacts