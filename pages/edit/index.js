import cookies from 'next-cookies';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import QbInput from '../../components/atom/QbInput';
import { EditPerson } from '../../components/template/EditPerson';
import { useAuth } from '../../context/UserContext';
import { validateToken } from '../../utils/auth/validateToken';
import { db } from '../../utils/firebaseClient';

const EditPage = ({ user }) => {
	const router = useRouter();
	const { logout } = useAuth();
	const [userData, setUserData] = useState(null);

	useEffect(() => {
		const fetchUserInfo = async () => {
			const url = `https://us-central1-businesscardapp-d89e9.cloudfunctions.net/app/user?id=${user.uid}`;
			const result = await fetch(url).then((res) => res.json());
			setUserData(result);
		};
		if (!user) {
			router.push('/signin');
		}
		fetchUserInfo();
	}, [user]);

	const onSubmit = async (data) => {
		const url = `https://us-central1-businesscardapp-d89e9.cloudfunctions.net/app/user?id=${user.uid}`;
		const result = await fetch(url, {
			method: 'post',
			body: JSON.stringify({ ...data, uid: user.uid }),
		}).then(function (response) {
			return response.json();
		});
		console.log('submitted:', result);
		if (result.error) {
			return console.log(result.error);
		}
		setUserData(result);
	};

	return (
		<div>
			<button onClick={() => logout()}>Log out</button>
			<EditPerson onSubmit={onSubmit} userData={userData}></EditPerson>
		</div>
	);
};

export default EditPage;
