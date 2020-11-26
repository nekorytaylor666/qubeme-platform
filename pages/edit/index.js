import cookies from 'next-cookies';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import QbInput from '../../components/atom/QbInput';
import { EditPerson } from '../../components/template/EditPerson';
import { useAuth } from '../../context/UserContext';
import { validateToken } from '../../utils/auth/validateToken';
import { db, storage } from '../../utils/firebaseClient';

const EditPage = ({ user }) => {
	const router = useRouter();
	const { logout } = useAuth();
	const [userData, setUserData] = useState(null);
	const [avatar, setAvatar] = useState(null);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		const fetchUserInfo = async () => {
			setLoading(true);
			const url = `https://us-central1-businesscardapp-d89e9.cloudfunctions.net/app/user?id=${user.uid}`;
			const result = await fetch(url).then((res) => res.json());
			console.log('res:', result);
			const { info, uid } = result;
			if (result.avatar) {
				const avatarUrl = await storage.ref().child(result.avatar).getDownloadURL();
				setAvatar(avatarUrl);
			}
			setUserData(info);
			setLoading(false);
		};

		if (!user) {
			router.push('/signin');
		}
		if (user && user.uid) {
			fetchUserInfo();
		}
	}, [user]);

	const onSubmit = async (data) => {
		const url = `https://us-central1-businesscardapp-d89e9.cloudfunctions.net/app/user?id=${user.uid}`;
		const result = await fetch(url, {
			method: 'post',
			body: JSON.stringify({ ...data }),
		}).then(function (response) {
			return response.json();
		});
		console.log('submitted:', result);
		if (result.error) {
			return console.log(result.error);
		}
		setUserData(result);
	};

	const onImageUpload = async (data) => {
		const file = data.avatar[0];
		const userAvatarPath = `users/${user.uid}/${file.name}`;
		const fileRef = storage.ref().child(userAvatarPath);
		fileRef.put(file).then(() => {
			alert('file uploaded');
		});
		db.collection('users').doc(user.uid).update({ avatar: userAvatarPath });
	};

	return (
		<div className="my-16">
			<EditPerson onSubmit={onSubmit} userData={userData} onImageUpload={onImageUpload} avatar={avatar}></EditPerson>
		</div>
	);
};

export default EditPage;
