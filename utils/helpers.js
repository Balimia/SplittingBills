const fetcher = (url) => fetch(url).then((res) => res.json());

const helpers = { fetcher };

export default helpers;
