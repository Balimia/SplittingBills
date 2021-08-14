import connect from '../../utils/mongoose';
import Expense from '../../utils/Expense';

export default async function balances(req, res) {
	const connection = await connect();
	const data = await Expense.find({});
	connection.close();
	return res.status(200).json({ data });
}
