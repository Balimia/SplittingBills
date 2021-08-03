import { useEffect } from 'react';
import Router from 'next/router';

export default function useUser({ redirectTo = false } = {}) {
	const user = localStorage.getItem('user');

	useEffect(() => {
		if (!redirectTo || !user) return;
		if (redirectTo && !user) {
			Router.push(redirectTo);
		}
	}, [user, redirectTo]);

	return { user };
}
