const fetcher = (url) => fetch(url).then((res) => res.json());
const capitalize = (str) => {
	str = str.toLowerCase();
	return str.charAt(0).toUpperCase() + str.slice(1);
};

const helpers = { capitalize, fetcher };

export default helpers;
