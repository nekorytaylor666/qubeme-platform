import { useContext } from 'react';
import { AuthContext } from './context';

export const useAuth = () => {
	const { user, authenticated, setUser, loadingAuthState } = useContext(AuthContext);
	return { user: authenticated ? user.user : null, creds: user, authenticated, setUser, loadingAuthState };
};
