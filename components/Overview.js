import styles from '../styles/overview.module.css';
import styles2 from '../styles/form.module.css';
import { useBalance } from '../context/balances';

export default function Overview({ users }) {
	const { balances } = useBalance();

	const names = users.map((user) => (
		<th className={`${styles.thead} ${styles.row} ${styles2.unselectable}`} key={user._id}>
			{user.name}
		</th>
	));
	const values = users.map((user) => (
		<td className={`${styles.row} ${styles2.unselectable}`} key={user._id}>
			{`${balances[user.name]}€`}
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
