import styles from '../styles/form.module.css';
import { useUser } from '../context/user';
import checkAPI from '../utils/apiCall';
import { useRef, useState } from 'react';
import { useRouter } from 'next/router';

export default function Form({ users }) {
	const router = useRouter();
	const { user } = useUser();
	const reason = useRef();
	const price = useRef();
	const date = useRef();
	const [dropdown, setDropdown] = useState(user);
	const [selectedUsers, setSelectedUsers] = useState([]);
	const [allUsers] = useState(
		users.map((user) => {
			return { name: user.name };
		})
	);

	const resetForm = () => {
		reason.current.value = '';
		price.current.value = '';
		date.current.value = new Date().toISOString().substr(0, 10);
		setDropdown(user);
		setSelectedUsers([]);
		router.reload(window.location.pathname); // POOP
	};

	const handleSelectUser = (e) => {
		if (!selectedUsers.includes(e.target.name)) {
			setSelectedUsers([...selectedUsers, e.target.name]);
		} else {
			setSelectedUsers(
				selectedUsers.filter((selectedUserId) => {
					return selectedUserId !== e.target.name;
				})
			);
		}
	};
	const handleSelectAllUsers = () => {
		if (selectedUsers.length < allUsers.length) {
			setSelectedUsers(allUsers.map(({ name }) => name));
		} else {
			setSelectedUsers([]);
		}
	};
	const handleDDLChange = (e) => setDropdown(e.target.value);
	const handleSubmit = async (e) => {
		e.preventDefault();
		const body = JSON.stringify({
			date: date.current.value,
			reason: reason.current.value,
			amount: Number(price.current.value),
			payer: dropdown,
			participants: selectedUsers,
		});
		const { error, message } = await checkAPI('/api/expense', body);
		if (error) return alert('An error has occured, sorry!');
		if (message) return resetForm();
	};

	const DropdownList = () =>
		users.map((user) => (
			<option key={user._id} value={user.name}>
				{user.name}
			</option>
		));

	const CheckboxList = () =>
		users.map((user) => (
			<div className={styles.formEntry} key={user._id}>
				<label className={styles.pointer}>
					<input type="checkbox" name={user.name} checked={selectedUsers.includes(user.name)} onChange={handleSelectUser} />
					<span className={`${styles.span} ${styles.unselectable}`}>{user.name}</span>
				</label>
			</div>
		));

	return (
		<div className={styles.container}>
			<form className={styles.form} onSubmit={handleSubmit}>
				<div className={styles.formEntry}>
					<input
						className={`${styles.textInput} ${styles.large}`}
						type="text"
						ref={reason}
						placeholder="What did you buy?"
						autoFocus
						autoComplete="false"
						required
					/>
					<input
						className={`${styles.textInput} ${styles.large}`}
						type="number"
						ref={price}
						placeholder="How much did it cost?"
						autoComplete="false"
						required
					/>
				</div>
				<div className={styles.formEntry}>
					<label>
						<select className={`${styles.textInput} ${styles.ddl} ${styles.smoll} ${styles.pointer}`} value={dropdown} onChange={handleDDLChange}>
							<DropdownList />
						</select>
						<span className={`${styles.span} ${styles.unselectable}`}>paid the bill, on </span>
					</label>
					<label>
						<input
							className={`${styles.textInput} ${styles.medium} ${styles.pointer}`}
							type="date"
							ref={date}
							defaultValue={new Date().toISOString().substr(0, 10)}
						/>
					</label>
				</div>
				<div className={styles.formEntry}>
					<label className={styles.pointer}>
						<input type="checkbox" checked={selectedUsers.length === allUsers.length} onChange={handleSelectAllUsers} />
						<span className={`${styles.span} ${styles.unselectable}`}>Toggle everyone</span>
					</label>
				</div>
				<CheckboxList />
				<div className={`${styles.formEntry} ${styles.button}`}>
					<input className={`${styles.textInput} ${styles.smol} ${styles.submit} ${styles.pointer}`} type="submit" value="Submit" />
				</div>
			</form>
		</div>
	);
}
