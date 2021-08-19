import useSWR from 'swr';
import { fetcher } from '../utils/helpers';
import { useUser } from '../context/user';
import Nav from '../components/Nav';
import Overview from '../components/Overview';
import Form from '../components/Form';
import Loading from '../components/Loading';
import styles from '../styles/index.module.css';
import { BalanceContext } from '../context/balances';
import { useEffect, useState } from 'react';

export default function Home() {
	const { user } = useUser();
	const { data, error } = useSWR('/api/data', fetcher);
	const [balances, setBalances] = useState({});
	const value = { balances, setBalances };

	useEffect(() => {
		if (data) {
			if (Object.keys(balances).length === 0 && balances.constructor === Object) return setBalances(data.result);
			return setBalances(balances);
		}
	}, [data, balances]);

	if (!user || error) return <div>Failed to Load...</div>;
	if (!data) return <Loading />;

	return (
		<BalanceContext.Provider value={value}>
			<div className={styles.container}>
				<Nav />
				<Overview users={data.sortedUsers} />
				<Form users={data.sortedUsers} />
			</div>
		</BalanceContext.Provider>
	);
}
