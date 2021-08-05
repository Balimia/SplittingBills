import Link from 'next/link';
import styles from '../styles/index.module.css';
import { useUser } from './user';

export default function Nav() {
	const { user, setUser } = useUser();

	const logout = () => {
		localStorage.removeItem('user');
		setUser(null);
	};

	return (
		<nav className={styles.nav}>
			<div className={styles.box}>
				<h3>
					<Link href="/">
						<a>Overview</a>
					</Link>
				</h3>
			</div>
			<div className={styles.box}>
				<h3>
					<Link href="/">
						<a>History</a>
					</Link>
				</h3>
			</div>
			<div className={styles.box}>
				<h3>Hola, {user}!</h3>
			</div>
			<div className={styles.box}>
				<h3>
					<Link href="/login">
						<a onClick={logout}>Logout</a>
					</Link>
				</h3>
			</div>
		</nav>
	);
}
