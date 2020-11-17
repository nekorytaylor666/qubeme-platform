import '../styles/index.css';
import fetch from 'isomorphic-unfetch';
import cookies from 'next-cookies';
import UserProvider from '../context/UserContext';
import App from 'next/app';
import { validateToken } from '../utils/auth/validateToken';

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
	try {
		// If token exists run Firebase validation on server side before rendering.
		const result = await validateToken(firebaseToken);
		console.log(result);
		const props = { ...result, ...appProps };
		return { ...props };
	} catch (error) {
		return { ...appProps };
	}
};
export default MyApp;
