import '../styles/globals.css';
import { UserContext } from '../context/user';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import Loading from '../components/Loading.js';

function MyApp({ Component, pageProps }) {
	const [user, setUser] = useState(null);
	const value = { user, setUser };

	useEffect(() => {
		const storedUser = localStorage.getItem('user');
		setUser(storedUser);
		if (Router.pathname == '/' && storedUser === null) {
			Router.push('/login');
		}
	}, []);

	if (user === undefined) {
		return <Loading />;
	}

	return (
		<UserContext.Provider value={value}>
			<Component {...pageProps} />
		</UserContext.Provider>
	);
}

export default MyApp;
