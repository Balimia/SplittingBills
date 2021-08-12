import { hash } from 'bcrypt';
import connect from '../../utils/mongoose';
import User from '../../utils/User';

export default async function register(req, res) {
	if (req.method === 'POST') {
		return new Promise((resolve, reject) => {
			hash(req.body.pwd, 8)
				.then(async (hash) => {
					const connection = await connect();
					const user = new User({ name: req.body.name, hash });
					await user.save();
					connection.close();
					return resolve(res.status(200).json({ message: 'Registered', user: req.body.name }));
				})
				.catch((error) => {
					res.json(error);
					res.status(405).end();
					return resolve();
				});
		});
	} else {
		res.status(405).json({ message: 'only POST is allowed' });
	}
}
