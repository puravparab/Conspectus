import { useState } from 'react'

import styles from '../../styles/contacts.module.css'

export const AddContactModal = ( props ) => {
	const [details, setDetails] = useState({
		"name": "",
		"email": "",
		"phone_number": "",
		"workplace": "",
		"job": "",
		"current_location_city": "",
		"current_location_country": "",
		"importance": "",
		"relationship": "",
		"day_met": "",
		"original_location_city": "",
		"original_location_country": ""
	})

	const handleDetailsChange = () => {

	}

	return (
		<div className={styles.ContactFormContainer}>
			<div className={styles.ContactForm}>
				<div className={styles.ContactFormHeader} onClick={props.handleAddContact}>
					<span>X</span>
				</div>
				<div className={styles.ContactFormBody}>
					<form>
						<div className={styles.contactFormSection}>
							<label>Name:</label>
							<input type="text" value={details.name} onChange={handleDetailsChange} />

							<label>Phone Number:</label>
							<input type="text" value={details.phoneNumber} onChange={handleDetailsChange} />

							<label>Email:</label>
							<input type="email" value={details.email} onChange={handleDetailsChange} />

							<label>Job:</label>
							<input type="text" value={details.job} onChange={handleDetailsChange} />

							<label>Relationship:</label>
							<input type="text" value={details.relationship} onChange={handleDetailsChange} />
							
						</div>

						<div className={styles.contactFormSection}>
							<label>Day met:</label>
							<input type="text" value={details.day_met} onChange={handleDetailsChange} />

							<label>Importance:</label>
							<input type="text" value={details.importance} onChange={handleDetailsChange} />

							<label>Current Location (City):</label>
							<input type="text" value={details.currentLocationCity} onChange={handleDetailsChange} />

							<label>Current Location (Country):</label>
							<input type="text" value={details.currentLocationCountry} onChange={handleDetailsChange} />

							<label>Original Location City:</label>
							<input type="text" value={details.original_location_city} onChange={handleDetailsChange} />

							<label>Original Location Country:</label>
							<input type="text" value={details.original_location_country} onChange={handleDetailsChange} />
						</div>
						
					</form>
				</div>
			</div>
		</div>
	)
}