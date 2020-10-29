import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { faTelegramPlane } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PersonCard = ({ person }) => {
	const router = useRouter();
	const { id } = router.query;
	return (
		<div className="container mx-auto shadow-md mt-4  bg-white rounded-xl h-screen relative divide-y-2 divide-gray-400">
			<div className="flex flex-col justify-center items-center py-4">
				<Image className="relative w-16 shadow-md object-cover rounded-xl" width={120} height={120} src="/guy.jpeg"></Image>
				<div className="h-6"></div>
				<h1 className="font-serif text-4xl text-center">{person.fullName}</h1>
				<p className="font-sans font-light text-base text-center text-gray-600">New york, USA</p>
				<div className="h-4"></div>
				<a>
					<div className="flex ">
						<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
							/>
						</svg>
						<div className="w-2"></div>
						<span>{person.phoneNumber}</span>
					</div>
				</a>
				<div className="h-2"></div>

				<a>
					<div className="flex ">
						<FontAwesomeIcon icon={faTelegramPlane} className="text-2xl"></FontAwesomeIcon>
						<div className="w-2"></div>
						<span>@{person.telegram}</span>
					</div>
				</a>
			</div>
			<div className="w-full border-b-2 border-gray-400 "></div>
		</div>
	);
};

export async function getStaticPaths() {
	// Call an external API endpoint to get posts
	const url = `https://us-central1-businesscardapp-d89e9.cloudfunctions.net/allUsers`;
	const res = await fetch(url);
	const people = await res.json();
	// Get the paths we want to pre-render based on posts
	const paths = people.map((person) => {
		const id = person.uid ? person.uid.toString() : '';
		return {
			params: { id: id },
		};
	});

	// We'll pre-render only these paths at build time.
	// { fallback: false } means other routes should 404.
	return { paths, fallback: true };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
	const { id } = params;
	console.log(id);
	const url = `http://localhost:3000/api/person/${id}`;
	const res = await fetch(url);
	const person = await res.json();

	return {
		props: {
			person,
		}, // will be passed to the page component as props
	};
}

export default PersonCard;
