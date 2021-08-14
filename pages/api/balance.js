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
	const balances = {};
	transactions.forEach((transaction) => {
		balances[transaction.payer] ? (balances[transaction.payer] += transaction.amount) : (balances[transaction.payer] = transaction.amount);
		transaction.participants.forEach((participant) =>
			balances[participant.name] ? (balances[participant.name] -= participant.split) : (balances[participant.name] = -participant.split)
		);
	});
	for (const person in balances) {
		balances[person] = Math.round((balances[person] + Number.EPSILON) * 100) / 100;
	}
	return balances;
};
