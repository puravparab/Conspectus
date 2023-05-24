import { useState } from 'react'
import Head from 'next/head'
import styles from '../../styles/contacts.module.css'

import ContactNav from '../../components/Contacts/ContactNav.js'

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
			</div>
		</>
	)
}

export default Contacts