import React, { useContext, useEffect, useState } from 'react';

import cookie from 'js-cookie';
import { auth } from '../utils/firebaseClient';
import { useRouter } from 'next/dist/client/router';

export const UserContext = React.createContext();

const tokenName = 'firebaseToken';

export const useAuth = () => {
	const { emailLogin, logout, currentUser, signUpEmailLogin } = useContext(UserContext);
	return { emailLogin, logout, currentUser, signUpEmailLogin };
};
const UserProvider = ({ children }) => {
	const router = useRouter();
	const [currentUser, setCurrentUser] = useState(null);
	// Basic Firebase email login function.
	const emailLogin = (email, password, redirectPath) => {
		return auth.signInWithEmailAndPassword(email, password);
	};
	const signUpEmailLogin = (email, password) => {
		return auth.createUserWithEmailAndPassword(email, password);
	};

	const logout = () => {
		return auth.signOut().then(() => router.push('/signin'));
	};
	// Checks that user state has changed and then creates or destroys cookie with Firebase token.
	const onAuthStateChange = () => {
		return auth.onAuthStateChanged(async (user) => {
			if (user) {
				setCurrentUser(user);
				const token = await user.getIdToken();
				cookie.set(tokenName, token, { expires: 14 });
			} else {
				setCurrentUser(null);
				cookie.remove(tokenName);
			}
		});
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChange();
		return () => {
			unsubscribe();
		};
	}, [currentUser]);

	return <UserContext.Provider value={{ emailLogin, logout, currentUser, signUpEmailLogin }}>{children}</UserContext.Provider>;
};

export default UserProvider;
