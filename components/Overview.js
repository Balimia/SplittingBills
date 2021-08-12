import styles from '../styles/overview.module.css';
import { useState } from 'react';

export default function Overview({ users }) {
	const [balance] = useState(
		users.reduce((obj, user) => {
			return {
				...obj,
				[user.name]: user.expenses + user.balance,
			};
		}, {})
	);

	const names = users.map((user) => (
		<th className={`${styles.thead} ${styles.row}`} key={user._id}>
			{user.name}
		</th>
	));
	const values = users.map((user) => (
		<td className={styles.row} key={user._id}>
			{balance[user.name]}
		</td>
	));
	return (
		<div className={styles.container}>
			<table className={styles.table}>
				<thead>
					<tr>{names}</tr>
				</thead>
				<tbody>
					<tr>{values}</tr>
				</tbody>
			</table>
		</div>
	);
}
