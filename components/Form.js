import useSWR from 'swr';
import Loading from './Loading';
import { useUser } from './user';
import styles from '../styles/form.module.css';
import { fetcher } from '../utils/helpers';
import { useRef, useState } from 'react';

export default function Form() {
	const { data, error } = useSWR('/api/data', fetcher);
	if (error) return <div>Failed to Load...</div>;
	if (!data) return <Loading />;
	return <Table arr={data.users} />;
}

const Table = ({ arr }) => {
	const date = new Date().toISOString().substr(0, 10);
	const { user } = useUser();
	const [value, setValue] = useState(user);

	const sorted = arr.sort((a, b) => a.name.localeCompare(b.name));

	const list = sorted.map((user) => (
		<option key={user._id} value={user.name}>
			{user.name}
		</option>
	));

	const checboxList = sorted.map((user) => (
		<div className={styles.formEntry} key={user._id}>
			<label className={styles.pointer}>
				<input type="checkbox" name={user.name} />
				<span className={styles.span}>{user.name}</span>
			</label>
		</div>
	));

	const handleDDL = (e) => setValue(e.target.value);
	const handleCheckbox = () => {};

	return (
		<div className={styles.container}>
			<form className={styles.form}>
				{/* REASON */}
				<div className={styles.formEntry}>
					<input
						className={`${styles.textInput} ${styles.large}`}
						type="text"
						name="reason"
						placeholder="What did you buy?"
						autoFocus
						autoComplete="false"
					/>
					<input
						className={`${styles.textInput} ${styles.large}`}
						type="text"
						name="price"
						placeholder="How much did it cost?"
						autoComplete="false"
					/>
				</div>
				{/* BUYER */}
				<div className={styles.formEntry}>
					<label>
						<select className={`${styles.textInput} ${styles.ddl} ${styles.smoll} ${styles.pointer}`} value={value} onChange={handleDDL}>
							{list}
						</select>
						<span className={styles.span}>paid the bill, on </span>
					</label>
					<label>
						<input className={`${styles.textInput} ${styles.medium} ${styles.pointer}`} type="date" name="date" defaultValue={date} />
					</label>
				</div>

				{/* RECIPIENTS SELECT ALL */}
				<div className={styles.formEntry}>
					<label className={styles.pointer}>
						<input type="checkbox" onClick={handleCheckbox} />
						<span className={styles.span}>Toggle everyone</span>
					</label>
				</div>
				{/* RECIPIENTS LIST */}
				{checboxList}
				{/* SUBMIT TODOOOO */}
				<div className={`${styles.formEntry} ${styles.button}`}>
					<input className={`${styles.textInput} ${styles.smol} ${styles.submit} ${styles.pointer}`} type="submit" value="submit" />
				</div>
			</form>
		</div>
	);
};
