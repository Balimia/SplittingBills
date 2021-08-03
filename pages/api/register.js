import { hash } from 'bcrypt';
import { appendFile } from 'fs';

export default async function register(req, res) {
	if (req.method === 'POST') {
		hash(req.body.pwd, 8, function (err, hash) {
			if (err) console.error(err);
			const user = `${req.body.name},${hash}\n`;
			appendFile('./users.csv', user, (err) => {
				if (err) throw err;
			});
			return res.status(200).json({ message: 'Registered', user: req.body.name });
		});
	} else {
		res.status(405).json({ message: 'only POST is allowed' });
	}
}
