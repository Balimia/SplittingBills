import '../styles/globals.css';
import { UserContext } from '../components/user';
import { useState, useEffect } from 'react';
import Router from 'next/router';

function MyApp({ Component, pageProps }) {
	const [user, setUser] = useState();

	useEffect(() => {
		const storedUser = localStorage.getItem('user');
		setUser(storedUser);
		if (Router.pathname == '/' && storedUser === null) {
			Router.push('/login');
		}
	}, []);

	// TODO BETTER LOADING
	const Loading = () => {
		return <div>Loading...</div>;
	};

	if (user === undefined) {
		return <Loading />;
	}

	return (
		<UserContext.Provider value={user}>
			<Component {...pageProps} />
		</UserContext.Provider>
	);
}

export default MyApp;
