import React from 'react';
import { useState, useEffect } from 'react';
import { useTable, useSortBy, useFilters } from 'react-table'

import axios from 'axios';
import getConfig from 'next/config';
import { AddContactModal, EditContactModal } from './ContactForm.js'
import styles from '../../styles/contacts.module.css'

const { publicRuntimeConfig } = getConfig();

const ContactDash = () => {
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
	// CARDS
	// // // //

	// Contact Card
	// const [DisplayContactCard, setDisplayContactCard] = useState(true)
	const [ContactCardDetails, setContactCardDetails] = useState({})

	useEffect(()=>{
		if (contactData[0]){
			setContactCardDetails({
				"id": contactData[0]["id"],
				"name": contactData[0]["name"],
				"email": contactData[0]["email"],
				"phone_number": contactData[0]["phone_number"],
				"workplace": contactData[0]["workplace"],
				"job": contactData[0]["job"],
				"current_location_city": contactData[0]["current_location_city"],
				"current_location_country": contactData[0]["current_location_country"],
				"importance": contactData[0]["importance"],
				"relationship": contactData[0]["relationship"],
				"day_met": contactData[0]["day_met"],
				"original_location_city": contactData[0]["original_location_city"],
				"original_location_country": contactData[0]["original_location_country"]
			})
		}
	}, [contactData])
	// Behavior when user clicks on a row
	const handleEntrySelect = (row) => {
		setContactCardDetails({
			"id": row.original["id"],
			"name": row.original["name"],
			"email": row.original["email"],
			"phone_number": row.original["phone_number"],
			"workplace": row.original["workplace"],
			"job": row.original["job"],
			"current_location_city": row.original["current_location_city"],
			"current_location_country": row.original["current_location_country"],
			"importance": row.original["importance"],
			"relationship": row.original["relationship"],
			"day_met": row.original["day_met"],
			"original_location_city": row.original["original_location_city"],
			"original_location_country": row.original["original_location_country"]
		})
	}

	// // // //
	// TABLE
	// // // //

	const data = React.useMemo(() => contactData, [contactData])
	const columns = React.useMemo(
		() => [
			{
				Header: 'Name',
				accessor: 'name',
			},
			{
				Header: 'Email',
				accessor: 'email',
			},
			{
				Header: 'Phone Number',
				accessor: 'phone_number',
			},
			{
				Header: 'Relationship',
				accessor: 'relationship',
			},
			{
				Header: 'Workplace',
				accessor: 'workplace',
			},
			{
				Header: 'Job',
				accessor: 'job',
			},
			{
				Header: 'City',
				accessor: 'current_location_city',
			},
			{
				Header: 'Country',
				accessor: 'current_location_country',
			},
			{
				Header: 'Priority',
				accessor: 'importance',
			},
		],
		[]
	)

	const tableInstance = useTable({ columns, data }, useFilters, useSortBy)
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
	} = tableInstance

	const generateSortingIndicator = column => {
		return column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""
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
					<h3>All contacts</h3>
					<p>{dataLength} total contacts</p>
				</div>
				<div className={styles.contactDashOther}>
					<button onClick={handleAddContact}><span>+ Add Contact</span></button>
				</div>
			</div>

			<div className={styles.contactDashMain}>
				<table {...getTableProps()}>
					<thead>
						{/* Loop over the header rows */}
						{headerGroups.map(headerGroup => (
							// Apply the header row props
							<tr {...headerGroup.getHeaderGroupProps()}>
								{/* Loop over the headers in each row */}
								{headerGroup.headers.map(column => (
									// Apply the header cell props
									<th {...column.getHeaderProps(column.getSortByToggleProps())}>
										{/* Render the header */}
										{column.render('Header')}
										{generateSortingIndicator(column)}
									</th>
								))}
							</tr>
						))}
					</thead>

					<tbody {...getTableBodyProps()}>
						{/* Loop over the table rows */}
						{rows.map(row => {
							// Prepare the row for display
							prepareRow(row)
							return (
								// Apply the row props
								<tr {...row.getRowProps()} onClick={()=>handleEntrySelect(row)}>
									{/* // Loop over the rows cells */}
									{row.cells.map(cell => {
										// Apply the cell props
										return (
											<td {...cell.getCellProps()}>
												{/* Render the cell contents */}
												{cell.render('Cell')}
											</td>
										)
									})}
								</tr>
							)
						})}
					</tbody>
				</table>

				<div className={styles.contactCard}>
					<img width="100" height="100" src="https://img.icons8.com/doodle/96/user-male-circle.png" alt="user-male-circle"/>
					<div className={styles.ContactCardBody}>
						<h4>{ContactCardDetails.name}</h4>
						<span onClick={handleEditContact}>Edit</span>

						<div className={styles.ContactCardText}><h5>Email:</h5><p>{ContactCardDetails.email}</p></div>
						<div className={styles.ContactCardText}><h5>Phone No:</h5><p>{ContactCardDetails.phone_number}</p></div>
						<div className={styles.ContactCardText}><h5>Relationship:</h5><p>{ContactCardDetails.relationship}</p></div>
						<div className={styles.ContactCardText}><h5>Job:</h5><p>{ContactCardDetails.job} at {ContactCardDetails.workplace}</p></div>
						<div className={styles.ContactCardText}><h5>Location:</h5><p>{ContactCardDetails.current_location_city}, {ContactCardDetails.current_location_country}</p></div>
						<div className={styles.ContactCardText}><h5>Day met:</h5><p>{ContactCardDetails.day_met}</p></div>
						<div className={styles.ContactCardText}><h5>Location met:</h5><p>{ContactCardDetails.original_location_city}, {ContactCardDetails.original_location_country}</p></div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ContactDash 