import React from 'react';
import { useState, useEffect } from 'react';
import { useTable } from 'react-table'

import axios from 'axios';
import getConfig from 'next/config';
import { AddContactModal } from './ContactForm.js'
import styles from '../../styles/contacts.module.css'

const { publicRuntimeConfig } = getConfig();

const ContactDash = () => {
	const [contactData, setContactData] = useState([])
	const [dataLength, setDataLength] = useState(0)
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
				Header: 'Importance',
				accessor: 'importance',
			},
		],
		[]
	)


	// Contact Card
	const [DisplayContactCard, setDisplayContactCard] = useState(false)
	const [ContactCardDetails, setContactCardDetails] = useState({})

	// Open modal when add contact button is clicked
	const [showModal, setShowModal] = useState(false)
	const handleAddContact = () => {
		if (showModal === true){setShowModal(false)}
		else {setShowModal(true)}
	}

	// Behavior when user clicks on a row
	const handleEntrySelect = (row) => {
		setContactCardDetails({
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
		setDisplayContactCard(true)
	}

	// Request data on first render
	useEffect(() => {
		getContactData()
	}, [])

	// Get contact data from api
	const getContactData = () =>{
		const url = publicRuntimeConfig.SERVER_URL + "/api/contacts/"
		axios.get(url)
			.then((response) => {
				setContactData(response.data.data)
				setDataLength(response.data.data.length)
			})
			.catch((error) => {
				console.log(error)
			})
	}

	const tableInstance = useTable({ columns, data })
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
	} = tableInstance

	return (
		<div className={styles.contactDashContainer}>
			<div className={styles.contactDashHeader}>
				<div className={styles.contactDashTitle}>
					<h3>All contacts</h3>
					<p>{dataLength} total contacts</p>
				</div>
				<div className={styles.contactDashOther}>
					<button onClick={handleAddContact}><span>+ Add Contact</span></button>
					{showModal && <AddContactModal handleAddContact={handleAddContact}/>}
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
									<th {...column.getHeaderProps()}>
										{/* Render the header */}
										{column.render('Header')}
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

				{DisplayContactCard &&
					<div className={styles.contactCard}>
						<img width="100" height="100" src="https://img.icons8.com/doodle/96/user-male-circle.png" alt="user-male-circle"/>
						<div className={styles.ContactCardBody}>
							<h4>{ContactCardDetails.name}</h4>
							<div className={styles.ContactCardText}><h5>Email:</h5><p>{ContactCardDetails.email}</p></div>
							<div className={styles.ContactCardText}><h5>Phone No:</h5><p>{ContactCardDetails.phone_number}</p></div>
							<div className={styles.ContactCardText}><h5>Relationship:</h5><p>{ContactCardDetails.relationship}</p></div>
							<div className={styles.ContactCardText}><h5>Job:</h5><p>{ContactCardDetails.job} at {ContactCardDetails.workplace}</p></div>
							<div className={styles.ContactCardText}><h5>Location:</h5><p>{ContactCardDetails.current_location_city}, {ContactCardDetails.current_location_country}</p></div>
							<div className={styles.ContactCardText}><h5>Day met:</h5><p>{ContactCardDetails.day_met}</p></div>
							<div className={styles.ContactCardText}><h5>Location:</h5><p>{ContactCardDetails.original_location_city}, {ContactCardDetails.original_location_country}</p></div>
						</div>
					</div>
				}
			</div>
		</div>
	)
}

export default ContactDash 