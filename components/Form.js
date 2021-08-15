import styles from '../styles/form.module.css';
import { useUser } from '../context/user';
import checkAPI from '../utils/apiCall';
import { useEffect, useRef, useState } from 'react';
import { useBalance } from '../context/balances';

export default function Form({ users }) {
	const { balances, setBalances } = useBalance();
	const { user } = useUser();
	const reason = useRef();
	const price = useRef();
	const date = useRef();
	const customUsers = useRef({});
	const [customForm, setCustomForm] = useState(false);
	const [dropdown, setDropdown] = useState(user);
	const [selectedUsers, setSelectedUsers] = useState([]);
	const [allUsers, setAllUsers] = useState([]);

	useEffect(() => {
		setAllUsers(
			users.map((user) => {
				return { name: user.name };
			})
		);
	}, [users]);

	const resetForm = () => {
		reason.current.value = '';
		price.current.value = '';
		date.current.value = new Date().toISOString().substr(0, 10);
		setDropdown(user);
		setSelectedUsers([]);
		customUsers.current = {};
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
	const handleFormChange = (e) => setCustomForm(!customForm);
	const handleCustomUsers = (e) => (customUsers.current = { ...customUsers.current, [e.target.name]: Number(e.target.value).toFixed(2) });
	const handleSubmit = async (e) => {
		e.preventDefault();
		let participants = {};
		if (customForm) {
			let sum = 0;
			for (const person in customUsers.current) {
				sum += Number(customUsers.current[person]);
			}
			if (sum !== Number(price.current.value)) return alert("Please make sure that the sum of each person's share matches the total amount paid.");
			participants = customUsers.current;
		} else {
			if (!selectedUsers.length) return alert('Please select more than 0 participants.');
			participants = selectedUsers.reduce((prev, person) => {
				return {
					...prev,
					[person]: Number(price.current.value / selectedUsers.length).toFixed(2),
				};
			}, {});
		}
		const body = JSON.stringify({
			date: date.current.value,
			reason: reason.current.value,
			amount: Number(price.current.value).toFixed(2),
			payer: dropdown,
			participants,
		});
		const { error, message } = await checkAPI('/api/expense', body);
		if (error) return alert('An error has occured, sorry!');
		if (message) resetForm();
		const { data } = await checkAPI('/api/data', JSON.stringify({}));
		if (data) return setBalances({ ...balances, ...data.result });
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

	const CustomInputList = () =>
		users.map((user) => (
			<div className={styles.formEntry} key={user._id}>
				<label className={`${styles.pointer} ${styles.miniContainer}`}>
					<span className={`${styles.span} ${styles.unselectable}`}>{user.name}</span>
					<input
						className={`${styles.textInput} ${styles.large}`}
						name={user.name}
						type="number"
						placeholder="0.00€"
						autoComplete="false"
						step=".01"
						onChange={handleCustomUsers}
					/>
				</label>
			</div>
		));

	const Equal = () => {
		return (
			<>
				<div className={styles.formEntry}>
					<span className={`${styles.span} ${styles.unselectable}`}>
						<i>
							Split the bill equally among the participants.<br></br>Do not forget to include the payer with the participants.
						</i>
					</span>
				</div>
				<div className={styles.formEntry}>
					<label className={styles.pointer}>
						<input type="checkbox" checked={selectedUsers.length === allUsers.length} onChange={handleSelectAllUsers} />
						<span className={`${styles.span} ${styles.unselectable}`}>Toggle everyone</span>
					</label>
				</div>
				<CheckboxList />
			</>
		);
	};

	const Custom = () => {
		return (
			<>
				<div className={styles.formEntry}>
					<span className={`${styles.span} ${styles.unselectable}`}>
						<i>
							Split the bill by entering a custom amount for each person who participated.<br></br>You may leave empty fields to skip non
							participants.
						</i>
					</span>
				</div>
				<CustomInputList />
			</>
		);
	};

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
						step=".01"
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
					<select className={`${styles.textInput} ${styles.ddl} ${styles.large} ${styles.pointer}`} value={customForm} onChange={handleFormChange}>
						<option value={false}>Equal Repartition</option>
						<option value={true}>Custom Repartition</option>
					</select>
				</div>
				{customForm ? <Custom /> : <Equal />}
				<div className={`${styles.formEntry} ${styles.button}`}>
					<input className={`${styles.textInput} ${styles.smol} ${styles.submit} ${styles.pointer}`} type="submit" value="Submit" />
				</div>
			</form>
		</div>
	);
}
