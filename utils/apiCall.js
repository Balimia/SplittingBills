export default async function checkAPI(url, body) {
	const res = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body,
	});
	return await res.json();
}
