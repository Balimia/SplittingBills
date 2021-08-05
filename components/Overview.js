import useSWR from 'swr';
import Loading from './Loading';
import styles from '../styles/overview.module.css';
import { fetcher } from '../utils/helpers';

export default function Overview() {
	const { data, error } = useSWR('/api/data', fetcher);
	if (error) return <div>Failed to Load...</div>;
	if (!data) return <Loading />;
	return <Table arr={data.users} />;
}

const Table = ({ arr }) => {
	const names = arr.map((user) => (
		<th className={`${styles.thead} ${styles.row}`} key={user._id}>
			{user.name}
		</th>
	));
	const values = arr.map((user) => (
		<td className={styles.row} key={user._id}>
			{user.balance}
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
};
