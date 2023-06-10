import { useState, useEffect } from 'react';
import Link from 'next/link'

import axios from 'axios';
import getConfig from 'next/config';
import { AddOrgModal } from './OrgForm.js'
import {DynamicOrgMap} from './Map/index.js'
import styles from '../../styles/organizations.module.css'

const { publicRuntimeConfig } = getConfig();

const OrgDash = () => {
	// // // //
	// DATA
	// // // //
	
	const [orgData, setOrgData] = useState('')

	// Request data on first render
	useEffect(() => {
		getOrgData()
	}, [])
	
	// Get contact data from api
	const getOrgData = () => {
		const url = publicRuntimeConfig.SERVER_URL + "/api/organizations/"
		axios.get(url)
			.then((response) => {
				processData(response.data.data)
			})
			.catch((error) => {
				console.log(error)
			})
	}

	// Process and store the org data
	const processData = (data) => {
		let org_by_city = {}

		// Store org by city
		for (let i=0; i < data.length; i++){
			let city = data[i].location_city
			if (city === null){
				continue
			}

			if (!org_by_city[city]){
				org_by_city[city] = []
			}
			org_by_city[city].push(data[i])
		}
		setOrgData(org_by_city)
		// setSelectedCity(Object.keys(org_by_city)[0])
		setSelectedCity("San Francisco")
	}

	// // // //
	// MODALS
	// // // //

	// Open modal when add contact button is clicked
	const [showModal, setShowModal] = useState(false)
	const handleAddOrg = () => {
		if (showModal === true){setShowModal(false)}
		else {setShowModal(true)}
	}


	// // // //
	// COMPONENT RENDER
	// // // //
	
	const [selectedCity, setSelectedCity] = useState('')

	const handleCitySelect = (city) => {
		setSelectedCity(city)
	}

	return (
		<div className={styles.orgDashContainer}>
			{showModal && <AddOrgModal handleAddOrg={handleAddOrg} location_city={selectedCity} location_country={orgData[selectedCity][0].location_country}/>}

			<div className={styles.orgDashLeft}>
				{Object.entries(orgData)
					.sort()
					.map(([city]) => (
						<div 
							className={styles.orgDashLeftItem} key={city} 
							onClick={() => handleCitySelect(city)}
							style={{ backgroundColor: selectedCity === city && 'var(--dark-primary-heading)'}}
						>
							<span>{city}</span>
						</div>
					))
				}
			</div>
			<div className={styles.orgDashMain}>
				{selectedCity && 
					<div className={styles.orgDashHeader}>
						<div className={styles.orgDashTitle}>
							<h3>{selectedCity}, {orgData[selectedCity][0].location_country}</h3>
								<p>{orgData[selectedCity].length} total organizations</p>
								<p>
									{orgData[selectedCity].reduce(
										(total_contacts, org) => total_contacts + org.no_of_contacts, 0
									)} total contacts
								</p>
						</div>

						<div className={styles.orgDashOther}>
							<button onClick={handleAddOrg}><span>+ Add organization</span></button>
						</div>
					</div>
				}
				{selectedCity &&
					<div className={styles.orgDashBody}>
						{orgData[selectedCity]
							.sort((a, b) => a.name.localeCompare(b.name))
							.map((org, id) => (
								<div className={styles.orgDashBodyItem} key={id}>
									<div className={styles.orgDashBodyItemLeft}>
										{org.image? 
											<img width="25" height="25" src={org.image} alt={`${org.name} image`} />
											:<img width="25" height="25" src="https://img.icons8.com/doodle/96/company--v1.png" alt="company--v1"/>
										}
									</div>
									<div className={styles.orgDashBodyItemContent}>
										<a href={org.website} target="_blank" rel="noopener noreferrer">
											<h4>{org.name}</h4>
										</a>
										<p>{org.no_of_contacts} contacts</p>
									</div>
									
								</div>
							))
						}
					</div>
				}
			</div>

			{/* MAP */}
			<DynamicOrgMap data={orgData} selectedCity={selectedCity}/>
		</div>
	)
}

export default OrgDash