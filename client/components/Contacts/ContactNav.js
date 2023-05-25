import Link from 'next/link'

import styles from '../../styles/contacts.module.css'

const ContactNav = () => {
	return (
		<div className={styles.contactNav}>
			<div className={styles.contactNavSections}>
				<Link href="/contacts" className={styles.contactNavItem}>
					<img width="30" height="30" src="https://img.icons8.com/doodle/96/name.png" alt="contact image"/>
					<h3>Contacts</h3>
				</Link>
				<ul>
					<li>Important</li>
					<li>Reminders</li>
					<li>Map</li>
					<li>Graph</li>
				</ul>
			</div>
			<div className={styles.contactNavSections}>
				<Link href="/contacts" className={styles.contactNavItem}>
					<img width="30" height="30" src="https://img.icons8.com/doodle/96/group--v1.png" alt="groups image"/>
					<h3>Groups</h3>
				</Link>
				<ul>
					<li>Work</li>
					<li>School</li>
					<li>Hiking</li>
					<li>Community</li>
				</ul>
			</div>
			<div className={styles.contactNavSections}>
				<Link href="/contacts" className={styles.contactNavItem}>
					<img width="30" height="30" src="https://img.icons8.com/doodle/96/price-tag--v2.png" alt="tags image"/>
					<h3>Tags</h3>
				</Link>
			</div>
		</div>
	)
}

export default ContactNav