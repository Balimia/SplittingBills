import { compare } from 'bcrypt';
import connect from '../../utils/mongoose';
import User from '../../utils/User';

export default async function users(req, res) {
	if (req.method === 'POST') {
		const connection = await connect();
		const user = await User.findOne({ name: req.body.name }).exec();
		connection.close();

		if (user) {
			const match = await compare(req.body.pwd, user.hash);
			if (match) {
				return res.status(200).json({ redirect: 'login' });
			} else {
				return res.status(403).json({ message: 'Wrong password' });
			}
		}
		return res.status(200).json({ redirect: 'register' });
	} else {
		res.status(405).json({ message: 'only POST is allowed' });
	}
}
