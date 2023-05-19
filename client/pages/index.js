import { useRouter } from 'next/router'
import Head from 'next/head'

const Home = () => {
	const router = useRouter()

	const toggleLightMode = () => {
		const theme = localStorage.getItem('theme')
		if (theme == 'dark'){
			localStorage.setItem('theme', 'light')
		} else{
			localStorage.setItem('theme', 'dark')
		}
		router.reload()
	}

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

			<div>
				<button onClick={toggleLightMode}>Btn</button>
			</div>
		</>
	)
}

export default Home