import '../styles/index.css';
import fetch from 'isomorphic-unfetch';
import cookies from 'next-cookies';
import UserProvider from '../context/UserContext';
import App from 'next/app';
const dev = process.env.NODE_ENV === 'development';

const server = dev ? 'http://localhost:3000' : 'https://qubeme.com/';

function MyApp({ user, Component, pageProps }) {
	return (
		<UserProvider>
			<Component user={user} {...pageProps} />
		</UserProvider>
	);
}

MyApp.getInitialProps = async (appContext) => {
	const { ctx } = appContext;
	// Calls `getInitialProps` and fills `appProps.pageProps`
	let error;
	const appProps = await App.getInitialProps(appContext);

	const { firebaseToken } = cookies(ctx);

	// If token exists run Firebase validation on server side before rendering.
	if (firebaseToken) {
		try {
			const headers = {
				'Context-Type': 'application/json',
				Authorization: JSON.stringify({ token: firebaseToken }),
			};
			const result = await fetch(`${server}/api/validate`, { headers }).then((res) => res.json());
			const props = { ...result, ...appProps };
			return { ...props };
		} catch (e) {
			console.log(e);
		}
	}
	return { ...appProps };
};
export default MyApp;
