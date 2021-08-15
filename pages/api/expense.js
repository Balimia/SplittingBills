import connect from '../../utils/mongoose';
import Expense from '../../utils/Expense';
import User from '../../utils/User';

export default async function expense(req, res) {
	if (req.method === 'POST') {
		const { date, reason, amount, payer, participants } = req.body;
		const connection = await connect();
		const expense = new Expense({
			date,
			reason,
			amount,
			payer,
			participants,
		});
		await splitCheck(expense);
		await expense.save();
		connection.close();
		res.status(200).json({ message: 'OK' });
	} else {
		res.status(405).json({ error: 'only POST is allowed' });
	}
}

const splitCheck = async (expense) => {
	await User.findOneAndUpdate({ name: expense.payer }, { $inc: { expenses: expense.amount } });
	for (const participant in expense.participants) {
		await User.findOneAndUpdate({ name: participant }, { $inc: { balance: -expense.participants[participant] } });
	}
};
