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

	const [contactData, setContactData] = useState([])
	const [dataLength, setDataLength] = useState(0)

	// Request data on first render
	useEffect(() => {
		getContactData()
	}, [])

	// Get contact data from api
	const getContactData = () =>{
		const url = publicRuntimeConfig.SERVER_URL + "/api/contacts/"
		axios.get(url)
			.then((response) => {
				const cleaned_data = cleanData(response.data.data)
				setContactData(cleaned_data)
				setDataLength(cleaned_data.length)
			})
			.catch((error) => {
				console.log(error)
			})
	}
	// Change null and empty values for cleaner display
	const cleanData = (data) => {
		for (let i=0; i < data.length; i++){
			for (const key in data[i]) {
				if (data[i][key] == null || data[i][key] === ""){data[i][key] = "-"}
			}
		}
		return data
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
	// COMPONENT RENDER
	// // // //

	return (
		<div className={styles.contactDashContainer}>
			{showModal && <AddContactModal handleAddContact={handleAddContact}/>}
			{showEditModal && <EditContactModal data={ContactCardDetails} handleEditContact={handleEditContact} />}

			<div className={styles.contactDashHeader}>
				<div className={styles.contactDashTitle}>
					<h3>Priority contacts</h3>
					<p>{dataLength} total contacts</p>
				</div>
				<div className={styles.contactDashOther}>
					<button onClick={handleAddContact}><span>+ Add Contact</span></button>
				</div>
			</div>

			<div className={styles.contactDashMain}>
				<div className={styles.contactPriorityContainer}>
					<div className={styles.contactPrioritySection}>
						<div className={styles.contactPriorityTitle}></div>
					</div>
					<div className={styles.contactPrioritySection}></div>
						<div className={styles.contactPriorityTitle}></div>
					<div className={styles.contactPrioritySection}></div>
						<div className={styles.contactPriorityTitle}></div>
				</div>
			</div>
		</div>
	)
}

export default ContactDashPriority