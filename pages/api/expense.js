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
		await splitCheck(amount, payer, participants);
		await expense.save();
		connection.close();
		res.status(200).json({ message: 'OK' });
	} else {
		res.status(405).json({ error: 'only POST is allowed' });
	}
}

const splitCheck = async (amount, payer, participants) => {
	const split = amount / participants.length;
	await User.findOneAndUpdate({ name: payer }, { $inc: { expenses: amount.toFixed(2) } });
	await User.updateMany({ name: { $in: participants } }, { $inc: { balance: -split.toFixed(2) } });
};
