import React from 'react';
import { useState, useEffect } from 'react';

import axios from 'axios';
import getConfig from 'next/config';
import { AddContactModal, EditContactModal } from './ContactForm.js'
import styles from '../../styles/contacts.module.css'

const { publicRuntimeConfig } = getConfig();

const ContactDashPriority = () => {
	// // // //
	// DATA
	// // // //

	const [contactData, setContactData] = useState({
		"high": [],
		"medium": [],
		"low": [],
		"none": []
	})
	const [dataLength, setDataLength] = useState({
		"high": 0,
		"medium": 0,
		"low": 0,
		"none": 0,
		"total": 0
	})

	// Request data on first render
	useEffect(() => {
		getContactData()
	}, [])

	// Get contact data from api
	const getContactData = () =>{
		const url = publicRuntimeConfig.SERVER_URL + "/api/contacts/"
		axios.get(url)
			.then((response) => {
				processData(response.data.data)
			})
			.catch((error) => {
				console.log(error)
			})
	}
	// Change null and empty values for cleaner display
	const processData = (data) => {
		const priority_data = {
			"high": [],
			"medium": [],
			"low": [],
			"none": []
		}
		const data_length = {
			"high": 0,
			"medium": 0,
			"low": 0,
			"none": 0,
			"total": 0
		}

		for (let i=0; i < data.length; i++){
			data_length["total"] += 1

			// Determine priority
			let category = "none"
			if (data[i].importance == "High"){category = "high"}
			else if (data[i].importance == "Medium"){category = "medium"}
			else if (data[i].importance == "Low"){category = "low"}

			// Process null or empty values
			for (const key in data[i]) {
				if (data[i][key] == null || data[i][key] === ""){data[i][key] = "-"}
			}

			priority_data[category].push(data[i])
			data_length[category] += 1
		}
		setContactData(priority_data)
		setDataLength(data_length)
	}

	// // // //
	// MODALS
	// // // //

	// Open modal when add contact button is clicked
	const [showModal, setShowModal] = useState(false)
	const handleAddContact = () => {
		if (showModal === true){setShowModal(false)}
		else {setShowModal(true)}
	}

	// Open modal when edit contact button is clicked
	const [showEditModal, setShowEditModal] = useState(false)
	const handleEditContact = () => {
		if (showEditModal === true){setShowEditModal(false)}
		else {setShowEditModal(true)}
	}

	// // // //
	// CARDS
	// // // //
	
	// Display contact card
	const [CardID, setCardID] = useState(-1)
	const [ContactCardDetails, setContactCardDetails] = useState({})

	// Behavior when user clicks on a row
	const handleEntrySelect = (row) => {
		setContactCardDetails({
			"id": row.id,
			"name": row.name,
			"email": row.email,
			"phone_number": row.phone_number,
			"workplace": row.workplace,
			"job": row.job,
			"current_location_city": row.current_location_city,
			"current_location_country": row.current_location_country,
			"importance": row.importance,
			"relationship": row.relationship,
			"day_met": row.day_met,
			"original_location_city": row.original_location_city,
			"original_location_country": row.original_location_country
		})
		if (CardID == row.id){setCardID(-1)}
		else {setCardID(row.id)}
	}

	// // // //
	// COMPONENT RENDER
	// // // //

	return (
		<div className={styles.contactDashContainer}>
			{showModal && <AddContactModal handleAddContact={handleAddContact}/>}
			{showEditModal && <EditContactModal data={ContactCardDetails} handleEditContact={handleEditContact} />}

			<div className={styles.contactDashHeader}>
				<div className={styles.contactDashTitle}>
					<h3>Priority contacts</h3>
					<p>{dataLength.total} total contacts</p>
				</div>
				<div className={styles.contactDashOther}>
					<button onClick={handleAddContact}><span>+ Add Contact</span></button>
				</div>
			</div>

			<div className={styles.contactDashMain}>
				<div className={styles.contactPriorityContainer}>
					<div className={styles.contactPrioritySection}>
						<div className={styles.contactPriorityTitle}>
							<h4 style={{color: 'rgb(76, 175, 80)'}}>High</h4>
							<p>{dataLength.high} contacts</p>
						</div>
						<div className={styles.contactPriorityList}>
							{contactData["high"].map((contact) => (
								<div key={contact.id} className={CardID == contact.id? styles.contactPriorityItemActive : styles.contactPriorityItem} onClick={() => handleEntrySelect(contact)}>
									<p>{contact.name}</p>
									{CardID == contact.id &&
										<div className={styles.contactPriorityItemCard}>
											<div className={styles.ContactCardText}><h5>Email:</h5><p>{ContactCardDetails.email}</p></div>
											<div className={styles.ContactCardText}><h5>Phone No:</h5><p>{ContactCardDetails.phone_number}</p></div>
											<div className={styles.ContactCardText}><h5>Relationship:</h5><p>{ContactCardDetails.relationship}</p></div>
											<div className={styles.ContactCardText}><h5>Job:</h5><p>{ContactCardDetails.job} at {ContactCardDetails.workplace}</p></div>
											<div className={styles.ContactCardText}><h5>Location:</h5><p>{ContactCardDetails.current_location_city}, {ContactCardDetails.current_location_country}</p></div>
										</div>
									}
								</div>
							))}
						</div>
					</div>
					<div className={styles.contactPrioritySection}>
						<div className={styles.contactPriorityTitle}>
							<h4 style={{color: 'rgb(139, 195, 74)'}}>Medium</h4>
							<p>{dataLength.medium} contacts</p>
						</div>
						<div className={styles.contactPriorityList}>
							{contactData["medium"].map((contact) => (
								<div key={contact.id} className={CardID == contact.id? styles.contactPriorityItemActive : styles.contactPriorityItem} onClick={() => handleEntrySelect(contact)}>
									<p>{contact.name}</p>
									{CardID == contact.id &&
										<div className={styles.contactPriorityItemCard}>
											<div className={styles.ContactCardText}><h5>Email:</h5><p>{ContactCardDetails.email}</p></div>
											<div className={styles.ContactCardText}><h5>Phone No:</h5><p>{ContactCardDetails.phone_number}</p></div>
											<div className={styles.ContactCardText}><h5>Relationship:</h5><p>{ContactCardDetails.relationship}</p></div>
											<div className={styles.ContactCardText}><h5>Job:</h5><p>{ContactCardDetails.job} at {ContactCardDetails.workplace}</p></div>
											<div className={styles.ContactCardText}><h5>Location:</h5><p>{ContactCardDetails.current_location_city}, {ContactCardDetails.current_location_country}</p></div>
										</div>
									}
								</div>
							))}
						</div>
					</div>
					<div className={styles.contactPrioritySection}>
						<div className={styles.contactPriorityTitle}>
							<h4 style={{color: 'rgb(205, 220, 57)'}}>Low</h4>
							<p>{dataLength.low} contacts</p>
						</div>
						<div className={styles.contactPriorityList}>
							{contactData["low"].map((contact) => (
								<div key={contact.id} className={CardID == contact.id? styles.contactPriorityItemActive : styles.contactPriorityItem} onClick={() => handleEntrySelect(contact)}>
									<p>{contact.name}</p>
									{CardID == contact.id &&
										<div className={styles.contactPriorityItemCard}>
											<div className={styles.ContactCardText}><h5>Email:</h5><p>{ContactCardDetails.email}</p></div>
											<div className={styles.ContactCardText}><h5>Phone No:</h5><p>{ContactCardDetails.phone_number}</p></div>
											<div className={styles.ContactCardText}><h5>Relationship:</h5><p>{ContactCardDetails.relationship}</p></div>
											<div className={styles.ContactCardText}><h5>Job:</h5><p>{ContactCardDetails.job} at {ContactCardDetails.workplace}</p></div>
											<div className={styles.ContactCardText}><h5>Location:</h5><p>{ContactCardDetails.current_location_city}, {ContactCardDetails.current_location_country}</p></div>
										</div>
									}
								</div>
							))}
						</div>
					</div>
					<div className={styles.contactPrioritySection}>
						<div className={styles.contactPriorityTitle}>
							<h4 style={{ color: 'rgb(158, 158, 158)'}}>None</h4>
							<p>{dataLength.none} contacts</p>
						</div>
						<div className={styles.contactPriorityList}>
							{contactData["none"].map((contact) => (
								<div key={contact.id} className={CardID == contact.id? styles.contactPriorityItemActive : styles.contactPriorityItem} onClick={() => handleEntrySelect(contact)}>
									<p>{contact.name}</p>
									{CardID == contact.id &&
										<div className={styles.contactPriorityItemCard}>
											<div className={styles.ContactCardText}><h5>Email:</h5><p>{ContactCardDetails.email}</p></div>
											<div className={styles.ContactCardText}><h5>Phone No:</h5><p>{ContactCardDetails.phone_number}</p></div>
											<div className={styles.ContactCardText}><h5>Relationship:</h5><p>{ContactCardDetails.relationship}</p></div>
											<div className={styles.ContactCardText}><h5>Job:</h5><p>{ContactCardDetails.job} at {ContactCardDetails.workplace}</p></div>
											<div className={styles.ContactCardText}><h5>Location:</h5><p>{ContactCardDetails.current_location_city}, {ContactCardDetails.current_location_country}</p></div>
										</div>
									}
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ContactDashPriority