import { useState } from 'react'
import { useRouter } from 'next/router';

import axios from 'axios';
import getConfig from 'next/config';
import styles from '../../styles/contacts.module.css'

const { publicRuntimeConfig } = getConfig();

export const AddContactModal = ( props ) => {
	const router = useRouter();

	const url = publicRuntimeConfig.SERVER_URL + "/api/contacts/"
	const date = new Date()
	const [details, setDetails] = useState({
		"name": "",
		"email": "",
		"phone_number": "",
		"job": "",
		"current_location_city": "",
		"current_location_country": "",
		"importance": "",
		"relationship": "",
		"day_met": `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`,
		"original_location_city": "",
		"original_location_country": "",
		"workplace": -1
	})

	const [isJsonInput, setIsJsonInput] = useState(false)
	const [detailsJSON, setDetailsJSON] = useState(JSON.stringify([details]))

	const switchFormInput = () => {
		if (isJsonInput){setIsJsonInput(false)}
		else {setIsJsonInput(true)}
	}

	const handleDetailsChange = (e, type) => {
		if (isJsonInput){setDetailsJSON(e.target.value)}
		else{
			setDetails((prev_details) => ({
				...prev_details,
				[type]: e.target.value
			}))
		}
	}
	const handleFormSubmit = () => {
		if (isJsonInput){
			const data = JSON.parse(detailsJSON)
			// validate
			axios.post(url, {"contacts": data})
				.then((response) => {
					console.log(response)
					router.reload();
				})
				.catch((response) => {
					console.log(response)
				})
		}
		else {
			// Validate
			axios.post(url, {"contacts": [details]})
				.then((response) => {
					console.log(response)
					router.reload();
				})
				.catch((response) => {
					console.log(response)
				})
		}
	}

	return (
		<div className={styles.ContactFormContainer}>
			<div className={styles.ContactForm}>
				<h3>Add new contact</h3>
				<div className={styles.ContactFormHeader} onClick={props.handleAddContact}>
					<span>X</span>
				</div>

				<div className={styles.ContactFormOptions}>
					<p><span onClick={switchFormInput}>Manual</span> | <span onClick={switchFormInput}>JSON</span></p> 
				</div>
				<div className={styles.ContactFormBody}>
					{isJsonInput? 
						<form>
							<textarea value={detailsJSON} onChange={handleDetailsChange}></textarea>
						</form> :
						<form>
							<div className={styles.contactFormSection}>
								<label>Name:</label>
								<input type="text" value={details.name} onChange={(e) => handleDetailsChange(e, "name")} required />

								<label>Phone Number:</label>
								<input type="text" value={details.phone_number} onChange={(e) => handleDetailsChange(e, "phone_number")} />

								<label>Email:</label>
								<input type="email" value={details.email} onChange={(e) => handleDetailsChange(e, "email")} />

								<label>Job:</label>
								<input type="text" value={details.job} onChange={(e) => handleDetailsChange(e, "job")} />

								<label>Relationship:</label>
								<input type="text" value={details.relationship} onChange={(e) => handleDetailsChange(e, "relationship")} />
								
							</div>

							<div className={styles.contactFormSection}>
								<label>Day met:</label>
								<input type="date" value={details.day_met} onChange={(e) => handleDetailsChange(e, "day_met")} />

								<label>Importance:</label>
								<input type="text" value={details.importance} onChange={(e) => handleDetailsChange(e, "importance")} />

								<label>Current Location (City):</label>
								<input type="text" value={details.current_location_city} onChange={(e) => handleDetailsChange(e, "current_location_city")} />

								<label>Current Location (Country):</label>
								<input type="text" value={details.current_location_country} onChange={(e) => handleDetailsChange(e, "current_location_country")} />

								<label>Original Location (City):</label>
								<input type="text" value={details.original_location_city} onChange={(e) => handleDetailsChange(e, "original_location_city")} />

								<label>Original Location (Country):</label>
								<input type="text" value={details.original_location_country} onChange={(e) => handleDetailsChange(e, "original_location_country")} />
							</div>
							
						</form>
					}
				</div>

				<div className={styles.contactDashOther}>
					<button type="submit" onClick={handleFormSubmit}><span>+ Add Contact</span></button>
				</div>
			</div>
		</div>
	)
}

export const EditContactModal = (props) => {
	const router = useRouter();

	const url = publicRuntimeConfig.SERVER_URL + `/api/contacts/${props.data.id}/`
	const [details, setDetails] = useState({
		"name": props.data.name,
		"email": props.data.email,
		"phone_number": props.data.phone_number,
		"job": props.data.job,
		"current_location_city": props.data.current_location_city,
		"current_location_country": props.data.current_location_country,
		"importance": props.data.importance,
		"relationship": props.data.relationship,
		"day_met": props.data.day_met,
		"original_location_city": props.data.original_location_city,
		"original_location_country": props.data.original_location_country
	})

	const handleDetailsChange = (e, type) => {
		setDetails((prev_details) => ({
			...prev_details,
			[type]: e.target.value
		}))
	}
	const handleFormSubmit = () => {
		// Validate
		const editChanges = {}
		for (const key in details){
			if (details[key] == "" || details[key] == null){editChanges[key] = null}
			else{editChanges[key] = details[key]}
		}

		axios.put(url, editChanges)
			.then((response) => {
				console.log(response)
				// router.reload();
			})
			.catch((response) => {
				console.log(response)
			})
	}

	return (
		<div className={styles.ContactFormContainer}>
			<div className={styles.ContactForm}>
				<h3>Edit contact</h3>
				<div className={styles.ContactFormHeader} onClick={props.handleEditContact}>
					<span>X</span>
				</div>

				<div className={styles.ContactFormBody}>
					<form>
						<div className={styles.contactFormSection}>
							<label>Name:</label>
							<input type="text" value={details.name} onChange={(e) => handleDetailsChange(e, "name")} required />

							<label>Phone Number:</label>
							<input type="text" value={details.phone_number} onChange={(e) => handleDetailsChange(e, "phone_number")} />

							<label>Email:</label>
							<input type="email" value={details.email} onChange={(e) => handleDetailsChange(e, "email")} />

							<label>Job:</label>
							<input type="text" value={details.job} onChange={(e) => handleDetailsChange(e, "job")} />

							<label>Relationship:</label>
							<input type="text" value={details.relationship} onChange={(e) => handleDetailsChange(e, "relationship")} />
							
						</div>

						<div className={styles.contactFormSection}>
							<label>Day met:</label>
							<input type="date" value={details.day_met} onChange={(e) => handleDetailsChange(e, "day_met")} />

							<label>Importance:</label>
							<input type="text" value={details.importance} onChange={(e) => handleDetailsChange(e, "importance")} />

							<label>Current Location (City):</label>
							<input type="text" value={details.current_location_city} onChange={(e) => handleDetailsChange(e, "current_location_city")} />

							<label>Current Location (Country):</label>
							<input type="text" value={details.current_location_country} onChange={(e) => handleDetailsChange(e, "current_location_country")} />

							<label>Original Location (City):</label>
							<input type="text" value={details.original_location_city} onChange={(e) => handleDetailsChange(e, "original_location_city")} />

							<label>Original Location (Country):</label>
							<input type="text" value={details.original_location_country} onChange={(e) => handleDetailsChange(e, "original_location_country")} />
						</div>			
					</form>
				</div>

				<div className={styles.contactDashOther}>
					<button type="submit" onClick={handleFormSubmit}><span>Edit Contact</span></button>
				</div>
			</div>
		</div>
	)
}