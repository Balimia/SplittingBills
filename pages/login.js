import { useRouter } from 'next/router';
import { useRef, useEffect, useState } from 'react';
import styles from '../styles/index.module.css';

const URL = process.env.URL;

export default function Login() {
	const router = useRouter();
	const nameRef = useRef(null);
	const pwdRef = useRef(null);
	const [showField, setShowField] = useState(false);

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

	const handleEnter = (event) => {
		if (event.keyCode === 13) {
			const form = event.target.form;
			const index = Array.prototype.indexOf.call(form, event.target);
			index === 0 ? form.elements[index + 1]?.focus() : handleSubmit(event);
			event.preventDefault();
		}
	};

	const checkAPI = async (url) => {
		const res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: nameRef.current?.value.toLowerCase(),
				pwd: pwdRef.current?.value,
			}),
		});
		return await res.json();
	};

	async function handleSubmit(e) {
		e.preventDefault();
		if (nameRef.current?.value === '' || pwdRef.current?.value === '') return;
		const { message, redirect } = await checkAPI(`${URL}/api/users`);
		if (message) return alert('Wrong password!'); // TODO better
		const json = await checkAPI(`${URL}/api/${redirect}`);
		if (json.user) localStorage.setItem('user', json.user);
		if (json.message) router.push('/register');
		else router.push('/login');
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

export async function getStaticProps() {
	return {
		props: {
			login: true,
		},
	};
}
