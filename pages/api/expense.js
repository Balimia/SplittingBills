import connect from '../../utils/mongoose';
import Expense from '../../utils/Expense';
import User from '../../utils/User';

export default async function expense(req, res) {
	if (req.method === 'POST') {
		const { date, reason, amount, payer, participants } = req.body;
		const connection = await connect();
		const split = amount / participants.length;
		const participantsForDb = participants.map((person) => {
			return {
				name: person,
				split,
			};
		});
		const expense = new Expense({
			date,
			reason,
			amount,
			payer,
			participants: participantsForDb,
		});
		await splitCheck(amount, payer, participants, split);
		await expense.save();
		connection.close();
		res.status(200).json({ message: 'OK' });
	} else {
		res.status(405).json({ error: 'only POST is allowed' });
	}
}

const splitCheck = async (amount, payer, participants, split) => {
	await User.findOneAndUpdate({ name: payer }, { $inc: { expenses: amount.toFixed(2) } });
	await User.updateMany({ name: { $in: participants } }, { $inc: { balance: -split.toFixed(2) } });
};
