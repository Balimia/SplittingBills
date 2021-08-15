import connect from '../../utils/mongoose';
import Expense from '../../utils/Expense';

export default async function expense(req, res) {
	if (req.method === 'POST') {
		const { date, reason, amount, payer, participants } = req.body;
		await connect();
		const expense = new Expense({
			date,
			reason,
			amount,
			payer,
			participants,
		});
		await expense.save();
		res.status(200).json({ message: 'OK' });
	} else {
		res.status(405).json({ error: 'only POST is allowed' });
	}
}
