import connect from '../../utils/mongoose';
import Expense from '../../utils/Expense';

export default async function balances(req, res) {
	await connect();
	const data = await Expense.find({});
	return res.status(200).json({ data });
}
