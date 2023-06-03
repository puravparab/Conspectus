import { useState } from 'react'
import Head from 'next/head'

import OrgDash from '../../components/Organizations/OrgDash.js'
import styles from '../../styles/organizations.module.css'

const Orgs = () => {
	return (
		<>
			<Head>
				<title>Organizations | Conspectus</title>
				<meta 
					name="description" 
					content="Organizations"
				/>
				{/* <link rel="canonical" href="/" /> */}
				<meta property="og:title" content="Organizations | Conspectus" />
				<meta property="og:url" content="" />
				<meta 
					property="og:description" 
					content="Organizations"
				/>
				<meta name="twitter:site" content="" />
				<meta name="twitter:description" content="Organizations" />
			</Head>

			<diV className={styles.orgContainer}>
				<OrgDash />
			</diV>
		</>
	)
}

export default Orgs