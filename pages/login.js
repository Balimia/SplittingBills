import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '../components/user';
import styles from '../styles/login.module.css';
import checkAPI from '../utils/apiCall';
import helpers from '../utils/helpers';

export default function Login() {
	const { user, setUser } = useUser();
	const router = useRouter();
	const nameRef = useRef(null);
	const pwdRef = useRef(null);
	const [showField, setShowField] = useState(false);

	useEffect(() => {
		if (user) return router.push('/');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	useEffect(() => {
		if (nameRef.current) {
			nameRef.current.focus();
		}
	}, []);

	const PwdField = () => {
		return (
			<input type="password" placeholder="choose a password" required ref={pwdRef} name="pwd" onKeyDown={handleEnter} className={styles.textArea} />
		);
	};

	const handleChange = (event) => {
		if (event.target.name === 'name') event.target.value !== '' ? setShowField(true) : setShowField(false);
	};

	const handleEnter = (e) => {
		if (e.keyCode === 13) {
			const form = e.target.form;
			const index = Array.prototype.indexOf.call(form, e.target);
			index === 0 ? form.elements[index + 1]?.focus() : handleSubmit(e);
			e.preventDefault();
		}
	};

	async function handleSubmit() {
		if (nameRef.current?.value === '' || pwdRef.current?.value === '') return;
		const body = JSON.stringify({
			name: helpers.capitalize(nameRef.current?.value),
			pwd: pwdRef.current?.value,
		});
		const { message, redirect } = await checkAPI('/api/users', body);
		if (message) return alert('Wrong password!'); // TODO better
		const json = await checkAPI(`/api/${redirect}`, body);
		if (json.user) {
			localStorage.setItem('user', json.user);
			setUser(json.user);
		}
		if (json.message) return router.push('/');
		else return router.push('/login');
	}

	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<h1>Hello, stranger.</h1>
				<form onSubmit={handleSubmit}>
					<div>
						<input
							type="text"
							placeholder="how should we call you?"
							autoFocus
							required
							ref={nameRef}
							name="name"
							autoComplete="off"
							onChange={handleChange}
							onKeyDown={handleEnter}
							className={styles.textArea}
						/>
					</div>
					<div>{showField ? <PwdField /> : null}</div>
				</form>
			</div>
		</div>
	);
}
