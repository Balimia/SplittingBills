import connect from '../../utils/mongoose';
import User from '../../utils/User';

export default async function data(req, res) {
	const connection = await connect();
	const users = await User.find({});
	const sortedUsers = users.sort((a, b) => a.name.localeCompare(b.name));
	const balances = sortedUsers.reduce((prev, user) => {
		return {
			...prev,
			[user.name]: Math.round((user.expenses + user.balance + Number.EPSILON) * 100) / 100,
		};
	}, {});
	connection.close();

	if (sortedUsers) {
		return res.status(200).json({ sortedUsers, balances });
	}
	return res.status(200).json({ error: true });
}
