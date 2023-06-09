import 'leaflet/dist/leaflet.css'
import styles from '../../../styles/organizations.module.css'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const OrgMap = () => {
	const organizations = [
		{ city: 'City 1', latitude: 51.505, longitude: 51.505 },
		{ city: 'City 2', latitude: 789, longitude: 1011 },
		// Add more organization objects as needed
	]

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
			</MapContainer>
		</div>
	)
}

export default OrgMap