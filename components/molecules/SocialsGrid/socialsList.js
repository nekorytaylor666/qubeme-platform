import {
	faBehance,
	faDribbble,
	faFacebook,
	faGithub,
	faInstagram,
	faLinkedin,
	faSnapchat,
	faTelegram,
	faTwitter,
	faVk,
	faWhatsapp,
	faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

const socialsList = [
	{ type: 'site', icon: faGlobe },
	{
		type: 'telegram',
		icon: faTelegram,
	},
	{
		type: 'whatsapp',
		icon: faWhatsapp,
	},
	{
		type: 'twitter',
		icon: faTwitter,
	},
	{
		type: 'github',
		icon: faGithub,
	},
	{
		type: 'linkedin',
		icon: faLinkedin,
	},
	{
		type: 'instagram',
		icon: faInstagram,
	},
	{
		type: 'snapchat',
		icon: faSnapchat,
	},
	{
		type: 'youtube',
		icon: faYoutube,
	},
	{
		type: 'vk',
		icon: faVk,
	},
	{
		type: 'dribbble',
		icon: faDribbble,
	},
	{
		type: 'behance',
		icon: faBehance,
	},
	{
		type: 'facebook',
		icon: faFacebook,
	},
];

export const socialListWithIcons = socialsList.map((item) => {
	return { type: item.type, icon: [item.icon.prefix, item.icon.iconName] };
});

export const getIconFromSocial = (social) => socialListWithIcons.find((item) => item.type === social).icon;
