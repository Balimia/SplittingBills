import Loading from '../components/Loading';
import Nav from '../components/Nav';
import { fetcher } from '../utils/helpers';
import useSWR from 'swr';
import styles from '../styles/history.module.css';

export default function Home() {
	const { data, error } = useSWR('/api/history', fetcher);

	if (error) return <div>Failed to Load...</div>;
	if (!data) return <Loading />;

	const PopulateTable = ({ props }) => {
		const { data } = props;

		return data.map((transaction) => {
			const namesOfParticipants = transaction.participants.map((person) => <li key={person._id}>{person.name}</li>);
			const splitOfParticipants = transaction.participants.map((person) => <li key={person._id}>{`${person.split}€`}</li>);
			return (
				<tr key={transaction._id}>
					<td className={styles.td}>{transaction.date.substr(0, 10)}</td>
					<td className={styles.td}>{transaction.payer}</td>
					<td className={styles.td}>{`${transaction.amount}€`}</td>
					<td className={styles.td}>{transaction.reason}</td>
					<td className={styles.td}>
						<ul>{namesOfParticipants}</ul>
					</td>
					<td className={styles.td}>
						<ul>{splitOfParticipants}</ul>
					</td>
				</tr>
			);
		});
	};

	return (
		<div className={styles.container}>
			<Nav />
			<div className={styles.tableContainer}>
				<table className={`${styles.table} ${styles.unselectable}`}>
					<thead>
						<tr className={styles.thead}>
							<th>Date</th>
							<th>Payer</th>
							<th>Amount</th>
							<th>Reason</th>
							<th>Participants</th>
							<th>Split</th>
						</tr>
					</thead>
					<tbody>
						<PopulateTable props={data} />
					</tbody>
				</table>
			</div>
		</div>
	);
}
