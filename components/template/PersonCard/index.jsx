import React from 'react';
import Image from 'next/image';
import { faTelegramPlane, faFacebookSquare, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import QbSpinner from '../../atom/QbSpinner';
import { faBriefcase, faEnvelope, faEnvelopeOpenText, faLocationArrow, faPhone, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { getLinkFromSocial } from '../../../utils/socials';
import { getIconFromSocial } from '../../molecules/SocialsGrid/socialsList';

const PersonCard = ({ person, avatar, avatarLoading }) => {
	const { info } = person;
	const getSocialComponentFromSocial = (social) => {
		let value;
		let socialType;
		for (const property in social) {
			if (social.hasOwnProperty(property)) {
				const element = social[property];
				value = element;
				socialType = property;
			}
		}
		const link = getLinkFromSocial(socialType, value);
		const socialLink = getIconFromSocial(socialType);
		return (
			<div key={value} className="flex flex-col w-full items-center">
				<a href={link}>
					<FontAwesomeIcon size="5x" icon={socialLink}></FontAwesomeIcon>
					<p className="underline text-center">{value}</p>
				</a>
			</div>
		);
	};
	return (
		<div className="m-4">
			<div className="container mx-auto shadow-md m-4  bg-white rounded-xl min-h-screen pb-16 ">
				<div className="flex flex-col justify-center items-center py-4 ">
					{avatarLoading ? (
						<QbSpinner mini></QbSpinner>
					) : (
						<img className="w-64 h-64 object-cover rounded-xl shadow-xl border-4 border-black" src={avatar ? avatar : '/guy.jpeg'}></img>
					)}

					<h1 className="font-serif text-4xl  text-center mt-6">{info.fullName}</h1>
					<div className="mt-2">
						<p className="text-base font-light text-center text-gray-600 space-x-2">
							<FontAwesomeIcon icon={faBriefcase}></FontAwesomeIcon>
							<span>
								{info.occupation} at {info.company}
							</span>
						</p>
						<p className="font-sans font-light text-base text-center text-gray-600 space-x-2">
							<FontAwesomeIcon icon={faLocationArrow}></FontAwesomeIcon>
							<span>{info.location}</span>
						</p>
					</div>
					<div className="mt-8 space-y-2 flex flex-col justify-center items-center">
						<a href={`tel:${info.phoneNumber}`}>
							<div className="flex items-center">
								<FontAwesomeIcon icon={faPhone}></FontAwesomeIcon>
								<div className="w-2"></div>
								<span>{info.phoneNumber}</span>
							</div>
						</a>
						<a href={`mailto:${person.email}`}>
							<div className="flex items-center">
								<FontAwesomeIcon icon={faEnvelopeOpenText}></FontAwesomeIcon>
								<div className="w-2"></div>
								<span>{person.email}</span>
							</div>
						</a>
					</div>
					<div className="mt-4">
						<a href={`https://us-central1-businesscardapp-d89e9.cloudfunctions.net/app/vcard/${person.uid}`}>
							<div className="rounded-full bg-black text-white font-bold text-xl w-full px-4 py-2 cursor-pointer shadow-md">
								<span className="mr-2">Add to contacts</span>
								<FontAwesomeIcon icon={faUserPlus}></FontAwesomeIcon>
							</div>
						</a>
					</div>
					<div className="h-2"></div>
				</div>
				<div className="w-full border-b-2 border-gray-400 "></div>
				<div className="h-2"></div>

				<h3 className="font-sans text-2xl font-bold ml-4">Socials</h3>
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
					{info.socials.map(getSocialComponentFromSocial)}
				</div>
			</div>
		</div>
	);
};

export default PersonCard;
