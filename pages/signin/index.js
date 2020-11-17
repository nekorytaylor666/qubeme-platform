import { auth } from '../../utils/firebaseClient';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import QbInputLabel from '../../components/atom/QbInputLabel';
import QbSubmit from '../../components/atom/QbSubmit';
import { useAuth } from '../../context/UserContext';

const SignIn = () => {
	const router = useRouter();
	const { emailLogin } = useAuth();

	const onSubmit = (data) => {
		emailLogin(data.email, data.password)
			.then(() => {
				router.push('/edit');
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const { register, handleSubmit, watch, errors } = useForm();

	return (
		<div className="container mx-auto">
			<div className="flex flex-col items-center mt-16 ">
				<img className="w-2/3 md:w-1/4 h-auto mb-8" src="/login.svg" alt="login"></img>
				<form onSubmit={handleSubmit(onSubmit)} className="w-full md:w-2/3 lg:w-1/3 space-y-8 mb-16 px-8 p-4">
					<QbInputLabel
						icon={
							<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
							</svg>
						}
						name="email"
						label="Email"
						type="text"
						placeholder="Input your login..."
						required
						register={register}></QbInputLabel>
					<QbInputLabel
						icon={
							<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path>
							</svg>
						}
						name="password"
						label="Password"
						type="password"
						placeholder="Input your password..."
						required
						register={register}></QbInputLabel>
					<QbSubmit></QbSubmit>
				</form>
				<div className="flex justify-center space-x-2">
					<a href="#">Sign up</a>
					<img src="/circle.svg" alt="circle"></img>
					<a href="#">Forgot password?</a>
				</div>
			</div>
		</div>
	);
};

export default SignIn;
