import connect from '../../utils/mongoose';
import User from '../../utils/User';

export default async function data(req, res) {
	const connection = await connect();
	const users = await User.find({});
	connection.close();

	if (users) {
		return res.status(200).json({ users });
	}
	return res.status(200).json({ error: true });
}
