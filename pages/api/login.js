export default async function login(req, res) {
	if (req.method === 'POST') {
		res.status(200).json({ message: 'Logged', user: req.body.name });
	} else {
		res.status(405).json({ message: 'only POST is allowed' });
	}
}
