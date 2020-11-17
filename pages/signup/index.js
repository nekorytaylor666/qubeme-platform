import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../auth/useAuth';
import { auth, db } from '../../utils/firebaseClient';
const SignUp = () => {
	const router = useRouter();
	const { setUser } = useAuth();
	const SignUpUser = async (email, pass) => {
		let cred = null;
		try {
			cred = await auth.createUserWithEmailAndPassword(email, pass);
		} catch (error) {
			cred = null;
		}
		return cred;
	};

	const onSubmit = async (data) => {
		const { fullname, email, password, bio } = data;
		try {
			const creds = await SignUpUser(email, password);
			const newUserRef = await db.collection('users').doc(creds.user.uid).set({
				fullName: fullname,
				bio,
				version: '2',
			});

			if (creds === null) {
				alert('Some error try again later');
				return;
			}

			setUser(creds);
		} catch (error) {
			return alert('error');
		}
		router.push('/edit');
	};

	const { register, handleSubmit, watch, errors } = useForm();

	return (
		<div className="bg-grey-lighter min-h-screen flex flex-col">
			<div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
				<form onSubmit={handleSubmit(onSubmit)} className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
					<h1 className="mb-8 text-3xl text-center">Sign up</h1>
					<input
						type="text"
						className="block border border-grey-light w-full p-3 rounded mb-4"
						name="fullname"
						placeholder="Full Name"
						ref={register({ required: true })}
					/>
					<input
						type="text"
						className="block border border-grey-light w-full p-3 rounded mb-4"
						name="bio"
						placeholder="BIO"
						ref={register({ required: true })}
					/>

					<input
						type="text"
						className="block border border-grey-light w-full p-3 rounded mb-4"
						name="email"
						placeholder="Email"
						ref={register({ required: true })}
					/>

					<input
						type="password"
						className="block border border-grey-light w-full p-3 rounded mb-4"
						name="password"
						placeholder="Password"
						ref={register({ required: true })}
					/>
					<input
						type="password"
						className="block border border-grey-light w-full p-3 rounded mb-4"
						name="confirm_password"
						placeholder="Confirm Password"
						ref={register({ required: true })}
					/>

					<button
						type="submit"
						className="w-full text-center py-3 rounded bg-blue-600 text-white hover:bg-green-dark focus:outline-none my-1">
						Create Account
					</button>

					<div className="text-center text-sm text-grey-dark mt-4">
						By signing up, you agree to the
						<a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
							Terms of Service
						</a>
						and
						<a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
							Privacy Policy
						</a>
					</div>
				</form>

				<div className="text-grey-dark mt-6">
					Already have an account?
					<Link href="/signin">
						<a className="no-underline border-b border-blue text-blue">Log in</a>
					</Link>
					.
				</div>
			</div>
		</div>
	);
};

export default SignUp;
