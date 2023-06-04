import { useState } from 'react'
import { useRouter } from 'next/router';

import axios from 'axios';
import getConfig from 'next/config';
import styles from '../../styles/organizations.module.css'

const { publicRuntimeConfig } = getConfig();

export const AddOrgModal = (props) => {
	const router = useRouter();

	const url = publicRuntimeConfig.SERVER_URL + "/api/organizations/"
	const date = new Date()
	const [details, setDetails] = useState({
		"name": "",
		"website": "",
		"image": "",
		"location_city": props.location_city,
		"location_country": props.location_country
	})

	const handleDetailsChange = (e, type) => {
		setDetails((prev_details) => ({
			...prev_details,
			[type]: e.target.value
		}))
	}
	const handleFormSubmit = () => {
		// Validate
		axios.post(url, {"organizations": [details]})
			.then((response) => {
				console.log(response)
				router.reload();
			})
			.catch((response) => {
				console.log(response)
			})
	}

	return (
		<div className={styles.OrgFormContainer}>
			<div className={styles.OrgForm}>
				<h3>Add new organizations</h3>
				<div className={styles.OrgFormHeader} onClick={props.handleAddOrg}>
					<span>X</span>
				</div>

				<div className={styles.OrgFormBody}>
					<form>
						<div className={styles.OrgFormSection}>
							<label>Name:</label>
							<input type="text" value={details.name} onChange={(e) => handleDetailsChange(e, "name")} required />

							<label>Website:</label>
							<input type="text" value={details.email} onChange={(e) => handleDetailsChange(e, "website")} />

							<label>Image:</label>
							<input type="text" value={details.image} onChange={(e) => handleDetailsChange(e, "image")} />													
						</div>

						<div className={styles.OrgFormSection}>
							<label>City:</label>
							<input type="text" value={details.location_city} onChange={(e) => handleDetailsChange(e, "location_city")} />

							<label>Country:</label>
							<input type="text" value={details.location_country} onChange={(e) => handleDetailsChange(e, "location_country")} />
						</div>
					</form>
				</div>

				<div className={styles.orgDashOther}>
					<button type="submit" onClick={handleFormSubmit}><span>Add Organization</span></button>
				</div>
			</div>
		</div>
	)
}