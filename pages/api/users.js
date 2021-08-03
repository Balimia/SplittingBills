import { readFileSync } from 'fs';
import { compare } from 'bcrypt';

export default async function users(req, res) {
	if (req.method === 'POST') {
		const users = new Map();
		const data = readFileSync('./users.csv', 'utf8').split('\n');
		data.forEach((row) => {
			const user = row.split(',');
			if (user[0] !== '') users.set(user[0], user[1]);
		});

		if (users.has(req.body.name)) {
			const match = await compare(req.body.pwd, users.get(req.body.name));
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
