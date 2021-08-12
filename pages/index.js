import useSWR from 'swr';
import { fetcher } from '../utils/helpers';
import { useUser } from '../context/user';
import Nav from '../components/Nav';
import Overview from '../components/Overview';
import Form from '../components/Form';
import Loading from '../components/Loading';
import styles from '../styles/index.module.css';

export default function Home() {
	const { user } = useUser();
	const { data, error } = useSWR('/api/data', fetcher);

	if (!user || error) return <div>Failed to Load...</div>;
	if (!data) return <Loading />;
	const sortedUsers = data.users.sort((a, b) => a.name.localeCompare(b.name));

	return (
		<div className={styles.container}>
			<Nav />
			<Overview users={sortedUsers} />
			<h2>Add an expense</h2>
			<Form users={sortedUsers} />
		</div>
	);
}
