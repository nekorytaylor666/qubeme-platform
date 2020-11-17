export const validateToken = async (token) => {
	const dev = process.env.NODE_ENV === 'development';

	const server = dev ? 'http://localhost:3000' : 'https://qubeme.com/';

	// If token exists run Firebase validation on server side before rendering.
	if (token) {
		try {
			const headers = {
				'Context-Type': 'application/json',
				Authorization: JSON.stringify({ token: token }),
			};
			const result = await fetch(`${server}/api/validate`, { headers }).then((res) => res.json());

			return result;
		} catch (e) {
			throw e;
		}
	}
};
