export const validateToken = async (token) => {
	const dev = process.env.NODE_ENV === 'development';
	const public_url = process.env.VERCEL_URL;
	//!TODO change to env var
	const server = dev ? 'http://localhost:3000' : 'https://us-central1-businesscardapp-d89e9.cloudfunctions.net/app/validate';

	// If token exists run Firebase validation on server side before rendering.
	if (token) {
		try {
			const headers = {
				'Context-Type': 'application/json',
				Authorization: JSON.stringify({ token: token }),
			};
			// const url = `${server}/api/validate/`;
			const url = `https://us-central1-businesscardapp-d89e9.cloudfunctions.net/app/validate`;
			const result = await fetch(url, { headers }).then((res) => res.json());
			return result;
		} catch (e) {
			throw e;
		}
	}
};
