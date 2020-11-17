import React, { useContext, useEffect, useState } from 'react';

import cookie from 'js-cookie';
import { auth } from '../utils/firebaseClient';

export const UserContext = React.createContext();

const tokenName = 'firebaseToken';

export const useAuth = () => {
	const { emailLogin } = useContext(UserContext);
	return { emailLogin };
};
const UserProvider = ({ user, children }) => {
	// Basic Firebase email login function.
	const emailLogin = (email, password, redirectPath) => {
		return auth.signInWithEmailAndPassword(email, password);
	};

	// Checks that user state has changed and then creates or destroys cookie with Firebase token.
	const onAuthStateChange = () => {
		return auth.onAuthStateChanged(async (user) => {
			if (user) {
				const token = await user.getIdToken();
				cookie.set(tokenName, token, { expires: 14 });
			} else {
				cookie.remove(tokenName);
			}
		});
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChange();
		return () => {
			unsubscribe();
		};
	}, []);

	return <UserContext.Provider value={{ emailLogin }}>{children}</UserContext.Provider>;
};

export default UserProvider;
