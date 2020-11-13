import { auth } from '../../utils/firebaseClient';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../auth/useAuth';

const SignIn = () => {
	const router = useRouter();
	const { user, setUser } = useAuth();
	const SignInUser = async (email, pass) => {
		let cred = null;
		try {
			cred = await auth.signInWithEmailAndPassword(email, pass);
		} catch (error) {
			cred = null;
		}
		return cred;
	};

	const onSubmit = async (data) => {
		const creds = await SignInUser(data.email, data.password);
		console.log(creds);
		if (creds === null) {
			alert('No such user');
			return;
		}
		setUser(creds);
		router.push('/edit');
		console.log(data);
	};

	const { register, handleSubmit, watch, errors } = useForm();

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
			<div className="mb-4">
				<label className="block text-grey-darker text-sm font-bold mb-2" for="username">
					Email
				</label>
				<input
					name="email"
					className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
					id="username"
					type="email"
					placeholder="Username"
					ref={register({ required: true })}
				/>
			</div>
			<div className="mb-6">
				<label className="block text-grey-darker text-sm font-bold mb-2" for="password">
					Password
				</label>
				<input
					name="password"
					className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
					id="password"
					type="password"
					placeholder="******************"
					ref={register({ required: true })}
				/>
				<p className="text-red text-xs italic">Please choose a password.</p>
			</div>
			<div className="flex items-center justify-between">
				<button className="bg-blue-600 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded" type="submit">
					Sign In
				</button>
				<a className="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker" href="#">
					Forgot Password?
				</a>
			</div>
		</form>
	);
};

export default SignIn;
