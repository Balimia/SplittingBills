import { hash } from 'bcrypt';
import connect from '../../utils/mongoose';
import User from '../../utils/User';

export default async function register(req, res) {
	if (req.method === 'POST') {
		hash(req.body.pwd, 8, async function (err, hash) {
			if (err) console.error(err);
			const connection = await connect();
			const user = new User({ name: req.body.name, hash });
			await user.save();
			connection.close();
			return res.status(200).json({ message: 'Registered', user: req.body.name });
		});
	} else {
		res.status(405).json({ message: 'only POST is allowed' });
	}
}
