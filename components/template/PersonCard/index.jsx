import React from 'react';
import Image from 'next/image';
import { faTelegramPlane, faFacebookSquare, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PersonCard = ({ person }) => {
	return (
		<div className="container mx-auto shadow-md mt-4  bg-white rounded-xl h-screen relative ">
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
			<div className="h-2"></div>

			<h3 className="font-sans text-2xl font-bold ml-4">Socials</h3>
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
				<div className="flex flex-col w-full items-center">
					<a href="">
						<FontAwesomeIcon size="5x" icon={faTelegramPlane}></FontAwesomeIcon>
						<p className="underline">Telegram</p>
					</a>
				</div>
				<div className="flex flex-col w-full items-center">
					<a href="">
						<FontAwesomeIcon size="5x" icon={faFacebookSquare}></FontAwesomeIcon>
						<p className="underline">Facebook</p>
					</a>
				</div>
				<div className="flex flex-col w-full items-center">
					<a href="">
						<FontAwesomeIcon size="5x" icon={faInstagram}></FontAwesomeIcon>
						<p className="underline">Instagram</p>
					</a>
				</div>
				<div className="flex flex-col w-full items-center">
					<a href="">
						<FontAwesomeIcon size="5x" icon={faTwitter}></FontAwesomeIcon>
						<p className="underline">Twitter</p>
					</a>
				</div>
			</div>
		</div>
	);
};

export default PersonCard;
