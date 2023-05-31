import { useState } from 'react'
import Head from 'next/head'
import styles from '../../styles/contacts.module.css'

import ContactNav from '../../components/Contacts/ContactNav.js'
import ContactDashPriority from '../../components/Contacts/ContactDashPriority.js'

const ContactsPriority = () => {
	return (
		<>
			<Head>
				<title>Priority Contacts | Conspectus</title>
				<meta 
					name="description" 
					content="Your priority contacts"
				/>
				{/* <link rel="canonical" href="/" /> */}
				<meta property="og:title" content="Priority Contacts | Conspectus" />
				<meta property="og:url" content="" />
				<meta 
					property="og:description" 
					content="Your priority contacts"
				/>
				<meta name="twitter:site" content="" />
				<meta name="twitter:description" content="Your priority contacts" />
			</Head>

			<div className={styles.contactContainer}>
				<ContactNav />
				<ContactDashPriority />
			</div>
		</>
	)
}

export default ContactsPriority