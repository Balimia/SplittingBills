import { useUser } from '../components/user';
import styles from '../styles/index.module.css';
import Nav from '../components/Nav';
import Overview from '../components/Overview';
import Form from '../components/Form';

export default function Home() {
	const { user } = useUser();

	if (!user) return <div></div>;

	return (
		<div className={styles.container}>
			<Nav />
			<Overview />
			<h2>Add an expense</h2>
			<Form />
		</div>
	);
}
