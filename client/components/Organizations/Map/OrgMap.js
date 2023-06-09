import { useState, useEffect } from 'react'

import axios from 'axios';
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, CircleMarker, Tooltip} from 'react-leaflet'
import styles from '../../../styles/organizations.module.css'

const OrgMap = ( props ) => {
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

	return (
		<div className={styles.OrgMapContainer}>
			<MapContainer 
				className={styles.map} 
				center={[0, 0]} 
				zoom={1} scrollWheelZoom={true}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{citiesData &&
					<>
						{Object.entries(props.data).map((city, id) => {
							console.log(city[1].length)
							return (
								<CircleMarker
									key={id}
									center={[citiesData[city[0]]["latitude"], citiesData[city[0]]["longitude"]]}
									radius={6 * Math.log(city[1].length + 1)}
									fillOpacity={0.7}
									stroke={false}
									pathOptions={{ color: 'var(--dark-primary-heading)' }}
								>
									<Tooltip direction="right" offset={[-8, -2]} opacity={1}>
										<span>{city[0]}: {city[1].length} organizations</span>
									</Tooltip>
								</CircleMarker>
							)
						})}
					</>
				}
			</MapContainer>
		</div>
	)
}

export default OrgMap