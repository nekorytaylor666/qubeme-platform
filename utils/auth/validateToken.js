export const validateToken = async (token) => {
	const dev = process.env.NODE_ENV === 'development';
	const public_url = process.env.VERCEL_URL;
	//!TODO change to env var
	const server = dev ? 'http://localhost:3000' : public_url;

	// If token exists run Firebase validation on server side before rendering.
	if (token) {
		try {
			const headers = {
				'Context-Type': 'application/json',
				Authorization: JSON.stringify({ token: token }),
			};
			console.log('variables:', dev, server, public_url);
			const url = `${server}/api/validate/`;
			console.log('api url:', url);
			const result = await fetch(url, { headers, mode: 'cors' }).then((res) => res.json());
			return result;
		} catch (e) {
			throw e;
		}
	}
};
