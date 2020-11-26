import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { socialListWithIcons } from './socialsList.js';
const SocialsGrid = ({ onSelect }) => {
	return (
		<div className="grid grid-cols-4 justify-around gap-4 w-full">
			{socialListWithIcons.map((social) => (
				<div
					key={social.type}
					onClick={() => onSelect(social)}
					className=" transition-all ease-in-out flex flex-col items-center space-y-2 cursor-pointer p-2 hover:border-black border-2 rounded-xl">
					<p>{social.type}</p>
					<FontAwesomeIcon icon={social.icon} size="3x"></FontAwesomeIcon>
				</div>
			))}
		</div>
	);
};

export default SocialsGrid;
