import cookies from 'next-cookies';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import QbInput from '../../components/atom/QbInput';
import { validateToken } from '../../utils/auth/validateToken';
import { db } from '../../utils/firebaseClient';

const EditPage = ({ user }) => {
	const router = useRouter();

	useEffect(() => {
		if (!user) {
			router.push('/signin');
		}
	}, [user]);

	const [userData, setUserData] = useState(null);
	const { register, handleSubmit } = useForm({
		defaultValues: {
			...userData,
		},
	});

	const onSubmit = async (data) => {
		const { fullName, bio, phoneNumber } = data;
		try {
			const newUserRef = await db
				.collection('users')
				.doc(user.uid)
				.set({
					...data,
				});
			alert('Saved!');
		} catch (error) {
			alert(error);
		}
	};

	return (
		<div>
			<h1 className="font-sans text-4xl font-bold mb-8 ml-4 mt-4">Edit page</h1>
			<form onSubmit={handleSubmit(onSubmit)} className="px-4 py-4 flex flex-col">
				<h3 className="font-sans text-2xl font-bold mb-4">Basic info</h3>
				<QbInput
					name="fullName"
					placeholder={userData?.fullName}
					icon={
						<svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
							/>
						</svg>
					}
					register={register}></QbInput>
				<div className="h-4"></div>
				<QbInput
					name="bio"
					placeholder={userData?.bio}
					icon={
						<svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path
								Linecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
							/>
						</svg>
					}
					register={register}></QbInput>
				<div className="h-4"></div>

				<QbInput
					name="phoneNumber"
					placeholder={userData?.phoneNumber ?? 'Phone number'}
					icon={
						<svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
							/>
						</svg>
					}
					register={register}></QbInput>
				<div className="h-4"></div>
				<QbInput
					name="telegram"
					placeholder={userData?.telegram ?? 'Telegram'}
					icon={
						<svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
							/>
						</svg>
					}
					register={register}></QbInput>
				<div className="h-4"></div>
				<QbInput
					name="location"
					placeholder={userData?.location ?? 'Location'}
					icon={
						<svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
							/>
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
						</svg>
					}
					register={register}></QbInput>

				<div className="h-8"></div>

				<input
					className="px-4 py-2 bg-black text-gray-200 border-2 rounded-xl font-bold items-center"
					type="submit"
					value="Сохранить"></input>
			</form>
		</div>
	);
};

export default EditPage;
