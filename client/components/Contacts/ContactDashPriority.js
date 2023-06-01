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
	const [contactComponents, setContactComponents] = useState({
		"high": "",
		"medium": "",
		"low": "",
		"none": ""
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

	// Rerender when contactData state is changed
	useEffect(() => {

	}, [contactData])

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

			let category = "none"
			if (data[i].importance == "High"){category = "high"}
			else if (data[i].importance == "Medium"){category = "medium"}
			else if (data[i].importance == "Low"){category = "low"}

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
							<h4>High</h4>
							<p>{dataLength.high} contacts</p>
						</div>
						<div className={styles.contactPriorityList}>
							{contactData["high"].map((contact) => (
								<div key={contact.id} className={styles.contactPriorityItem}>
									<p>{contact.name}</p>
								</div>
							))}
						</div>
					</div>
					<div className={styles.contactPrioritySection}>
						<div className={styles.contactPriorityTitle}>
							<h4>Medium</h4>
							<p>{dataLength.medium} contacts</p>
						</div>
						<div className={styles.contactPriorityList}>
							{contactData["medium"].map((contact) => (
								<div key={contact.id} className={styles.contactPriorityItem}>
									<p>{contact.name}</p>
								</div>
							))}
						</div>
					</div>
					<div className={styles.contactPrioritySection}>
						<div className={styles.contactPriorityTitle}>
							<h4>Low</h4>
							<p>{dataLength.low} contacts</p>
						</div>
						<div className={styles.contactPriorityList}>
							{contactData["low"].map((contact) => (
								<div key={contact.id} className={styles.contactPriorityItem}>
									<p>{contact.name}</p>
								</div>
							))}
						</div>
					</div>
					<div className={styles.contactPrioritySection}>
						<div className={styles.contactPriorityTitle}>
							<h4>None</h4>
							<p>{dataLength.none} contacts</p>
						</div>
						<div className={styles.contactPriorityList}>
							{contactData["none"].map((contact) => (
								<div key={contact.id} className={styles.contactPriorityItem}>
									<p>{contact.name}</p>
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