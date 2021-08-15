import connect from '../../utils/mongoose';
import User from '../../utils/User';
import Expense from '../../utils/Expense';

export default async function data(req, res) {
	await connect();
	const transactions = await Expense.find({});
	const users = await User.find({});
	const sortedUsers = users.sort((a, b) => a.name.localeCompare(b.name));
	const result = calculateBalances(users, transactions);

	if (sortedUsers) {
		return res.status(200).json({ sortedUsers, result });
	}

	return res.status(200).json({ error: true });
}

const calculateBalances = (users, transactions) => {
	const balances = {};
	if (!users) return;
	users.forEach((u) => {
		balances[u.name] = 0;
	});

	transactions.forEach((transaction) => {
		balances[transaction.payer] += transaction.amount;
		for (const participant in transaction.participants) {
			balances[participant] -= transaction.participants[participant];
		}
	});

	for (const person in balances) {
		balances[person] = Math.round((balances[person] + Number.EPSILON) * 100) / 100;
	}
	return balances;
};
