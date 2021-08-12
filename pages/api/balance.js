import connect from '../../utils/mongoose';
import Expense from '../../utils/Expense';

export default async function balances(req, res) {
	const connection = await connect();
	const transactions = await Expense.find({});
	const result = calculateBalances(transactions);
	connection.close();
	return res.status(200).json({ result });
}

const calculateBalances = (transactions) => {
	const participants = {};
	transactions.forEach((e) => {
		let split = e.amount / e.participants.length;
		participants[e.payer] ? (participants[e.payer] += e.amount) : (participants[e.payer] = e.amount);
		e.participants.forEach((i) => (participants[i] ? (participants[i] -= split) : (participants[i] = -split)));
	});
	for (const p in participants) {
		participants[p] = Math.round((participants[p] + Number.EPSILON) * 100) / 100;
	}
	return participants;
};
