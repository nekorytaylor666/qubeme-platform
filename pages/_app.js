import '../styles/index.css';
import fetch from 'isomorphic-unfetch';
import cookies from 'next-cookies';
import UserProvider from '../context/UserContext';
import App from 'next/app';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
	faBehance,
	faDribbble,
	faFacebook,
	faGithub,
	faInstagram,
	faLinkedin,
	faSnapchat,
	faTelegram,
	faTwitter,
	faVk,
	faWhatsapp,
	faYoutube,
} from '@fortawesome/free-brands-svg-icons';
library.add({
	faBehance,
	faDribbble,
	faFacebook,
	faGithub,
	faInstagram,
	faLinkedin,
	faSnapchat,
	faTelegram,
	faTwitter,
	faVk,
	faWhatsapp,
	faYoutube,
});
function MyApp({ user, Component, pageProps }) {
	return (
		<UserProvider>
			<Component user={user} {...pageProps} />
		</UserProvider>
	);
}

MyApp.getInitialProps = async (appContext) => {
	const validateToken = async (token) => {
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
	const { ctx } = appContext;
	// Calls `getInitialProps` and fills `appProps.pageProps`
	let error;
	const appProps = await App.getInitialProps(appContext);

	const { firebaseToken } = cookies(ctx);
	try {
		// If token exists run Firebase validation on server side before rendering.

		const result = await validateToken(firebaseToken);
		const props = { ...result, ...appProps };
		return { ...props };
	} catch (error) {
		return { ...appProps };
	}
};
export default MyApp;
