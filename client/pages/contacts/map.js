import { useState } from 'react'
import Head from 'next/head'
import styles from '../../styles/contacts.module.css'

import ContactNav from '../../components/Contacts/ContactNav.js'
import {DynamicOrgMap}  from '../../components/Contacts/Map/index.js'

const ContactsMap = () => {
	return (
		<>
			<Head>
				<title>Contact Map | Conspectus</title>
				<meta 
					name="description" 
					content="Contact map"
				/>
				{/* <link rel="canonical" href="/" /> */}
				<meta property="og:title" content="Contact Map| Conspectus" />
				<meta property="og:url" content="" />
				<meta 
					property="og:description" 
					content="Contact map"
				/>
				<meta name="twitter:site" content="" />
				<meta name="twitter:description" content="Contact map" />
			</Head>

			<div className={styles.contactContainer}>
				<ContactNav />
				<DynamicOrgMap />
			</div>
		</>
	)
}

export default ContactsMap