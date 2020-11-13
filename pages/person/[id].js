import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { faTelegramPlane } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PersonCard from '../../components/template/PersonCard';

const PersonCardPage = ({ person }) => {
	return <PersonCard person={person}></PersonCard>;
};

// export async function getStaticPaths() {
// 	// Call an external API endpoint to get posts
// 	const url = `https://us-central1-businesscardapp-d89e9.cloudfunctions.net/allUsers`;
// 	const res = await fetch(url);
// 	const people = await res.json();
// 	// Get the paths we want to pre-render based on posts
// 	const paths = people.map((person) => {
// 		if (person.uid) {
// 			const id = person.uid.toString();
// 			return {
// 				params: { id: id },
// 			};
// 		}
// 	});

// 	// We'll pre-render only these paths at build time.
// 	// { fallback: false } means other routes should 404.
// 	return { paths, fallback: false };
// }

// // This also gets called at build time
// export async function getStaticProps({ params }) {
// 	const { id } = params;
// 	console.log(id);
// 	const url = `http://localhost:3000/api/person/${id}`;
// 	// const url = `https://us-central1-businesscardapp-d89e9.cloudfunctions.net/user?id=${id}`;
// 	const res = await fetch(url);
// 	const person = await res.json();

// 	return {
// 		props: {
// 			person,
// 		}, // will be passed to the page component as props
// 	};
// }

export async function getServerSideProps({ params }) {
	const { id } = params;
	console.log(id);
	const url = `https://us-central1-businesscardapp-d89e9.cloudfunctions.net/user?id=${id}`;
	const res = await fetch(url);
	const person = await res.json();
	console.log(person);
	return {
		props: {
			person,
		}, // will be passed to the page component as props
	};
}

export default PersonCardPage;
