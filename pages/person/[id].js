import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { faTelegramPlane } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PersonCard from '../../components/template/PersonCard';
import { storage } from '../../utils/firebaseClient';
const PersonCardPage = ({ person }) => {
	const [avatar, setAvatar] = useState('');
	const [avatarLoading, setAvatarLoading] = useState(false);
	console.log(person);
	useEffect(() => {
		const fetchAvatar = async () => {
			if (person.avatar) {
				setAvatarLoading(true);
				const avatarUrl = await storage.ref().child(person.avatar).getDownloadURL();
				setAvatar(avatarUrl);
				setAvatarLoading(false);
			}
		};
		fetchAvatar();
	}, [person]);
	return <PersonCard person={person} avatar={avatar} avatarLoading={avatarLoading}></PersonCard>;
};

export async function getServerSideProps({ params }) {
	const { id } = params;
	const url = `https://us-central1-businesscardapp-d89e9.cloudfunctions.net/app/user?id=${id}`;

	const res = await fetch(url);
	const person = await res.json();
	return {
		props: {
			person,
		}, // will be passed to the page component as props
	};
}

export default PersonCardPage;
