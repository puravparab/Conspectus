import Head from 'next/head'

const Home = () => {
	return (
		<>
			<Head>
				<title>Conspectus</title>
				<meta 
					name="description" 
					content="Personal Dashboard"
				/>
				{/* <link rel="canonical" href="/" /> */}
				<meta property="og:title" content="Conspectus" />
				<meta property="og:url" content="" />
				<meta 
					property="og:description" 
					content="Personal Dashboard"
				/>
				<meta name="twitter:site" content="" />
				<meta name="twitter:description" content="Personal Dashboard" />
			</Head>
		</>
	)
}

export default Home