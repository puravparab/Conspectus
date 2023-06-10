import { useState, useEffect } from 'react'

import axios from 'axios';
import getConfig from 'next/config';
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, CircleMarker, Tooltip} from 'react-leaflet'
import styles from '../../../styles/contacts.module.css'

const { publicRuntimeConfig } = getConfig();

const ContactMap = ( props ) => {
	// // // //
	// DATA
	// // // //
	
	const [contactData, setContactData] = useState(null)
	const [renderData, setRenderData] = useState(null)
	const [showCurrentCity, setShowCurrentCity] = useState(true)

	// Request data on first render
	useEffect(() => {
		getContactData()
	}, [])

	// Get contact data from api
	const getContactData = () =>{
		const url = publicRuntimeConfig.SERVER_URL + "/api/contacts/"
		axios.get(url)
			.then((response) => {
				// console.log(response.data.data)
				setContactData(response.data.data)
				processData(response.data.data)
			})
			.catch((error) => {
				console.log(error)
			})
	}

	const processData = (data) => {
		let contact_by_city = {}
		let city = ""
		for (let i=0; i < data.length; i++){
			if (showCurrentCity){city = data[i].current_location_city}
			else{city = data[i].original_location_city}
			
			if (city === null){continue}
			if (!contact_by_city[city]){contact_by_city[city] = []}
			contact_by_city[city].push(data[i])
		}
		setRenderData(contact_by_city)
	}

	// // // //
	// CITIES DATA
	// // // //

	const [citiesData, setCitiesData] = useState(null);

	useEffect(() =>{
		axios.get('/cities.json')
			.then((response) => {
				setCitiesData(response.data)
			})
			.catch((error) => {
				console.log(error)
			})
	}, [])

	// // // //
	// MODALS
	// // // //

	// Open modal when add contact button is clicked
	const [showModal, setShowModal] = useState(false)
	const handleAddContact = () => {
		if (showModal === true){setShowModal(false)}
		else {setShowModal(true)}
	}

	return (
		<div className={styles.contactsMapContainer}>
			<div className={styles.contactDashHeader}>
				<div className={styles.contactDashTitle}>
					<h3>Contact Map</h3>
					{/* <p>{dataLength.total} total contacts</p> */}
					<p>0 total contacts</p>
				</div>
				<div className={styles.contactDashOther}>
					<button onClick={handleAddContact}><span>+ Add Contact</span></button>
				</div>
			</div>

			<div className={styles.contactsMapMain}>
				<MapContainer 
					className={styles.map} 
					center={[0, 0]} 
					zoom={2} scrollWheelZoom={true}
				>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
					{citiesData && renderData &&
						<>
							{Object.entries(renderData).map(([city, contacts], id) => {
								return (
									<CircleMarker
										key={id}
										center={[citiesData[city]["latitude"], citiesData[city]["longitude"]]}
										radius={10 * Math.log(contacts.length + 1)}
										fillOpacity={0.7}
										stroke={false}
										pathOptions={{ color: 'var(--dark-primary-heading)' }}
									>
										<Tooltip direction="right" offset={[-8, -2]} opacity={1}>
											<span>{city}: {contacts.length} contacts</span>
										</Tooltip>
									</CircleMarker>
								)
							})}
						</>
					}
				</MapContainer>

				<div className={styles.contactsMapMainRight}>
					
				</div>
			</div>
		</div>
	)
}

export default ContactMap