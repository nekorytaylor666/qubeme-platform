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
// "phoneNumber": "tel:",
// "phone2": "tel:",
// "email": "mail",
// "web": "https://",
// "telegram": "https://t.me/",
// "whatsapp": "https://wa.me/",
// "vk": "https://vk.com/",
// "instagram": "https://instagram.com/",
// "facebook": "https://facebook.com/",
// "linkedin": "https://linkedin.com/in/",
// "twitter": "https://twitter.com/",
// "youtube": "https://youtube.com/c/"
const socialsList = [
	{ type: 'site', icon: faGlobe, linkBase: 'https://' },
	{
		type: 'telegram',
		icon: faTelegram,
		linkBase: 'https://t.me/',
	},
	{
		type: 'whatsapp',
		icon: faWhatsapp,
		linkBase: 'https://wa.me/',
	},
	{
		type: 'twitter',
		icon: faTwitter,
		linkBase: 'https://twitter.com/',
	},
	{
		type: 'github',
		icon: faGithub,
		linkBase: 'https://github.com/',
	},
	{
		type: 'linkedin',
		icon: faLinkedin,
		linkBase: 'https://linkedin.com/in/',
	},
	{
		type: 'instagram',
		icon: faInstagram,
		linkBase: 'https://instagram.com/',
	},
	{
		type: 'snapchat',
		icon: faSnapchat,
		linkBase: 'https://www.snapchat.com/add/',
	},
	{
		type: 'youtube',
		icon: faYoutube,
		linkBase: 'https://youtube.com/c/',
	},
	{
		type: 'vk',
		icon: faVk,
		linkBase: 'https://vk.com/',
	},
	{
		type: 'dribbble',
		icon: faDribbble,
		linkBase: 'https://dribbble.com/',
	},
	{
		type: 'behance',
		icon: faBehance,
		linkBase: 'https://www.behance.net/',
	},
	{
		type: 'facebook',
		icon: faFacebook,
		linkBase: 'https://facebook.com/',
	},
];

export const socialListWithIcons = socialsList.map((item) => {
	return { type: item.type, icon: [item.icon.prefix, item.icon.iconName], linkBase: item.linkBase };
});

export const getIconFromSocial = (social) => socialListWithIcons.find((item) => item.type === social).icon;

export const getLinkFromSocial = (social, value) => {
	const socialObject = socialListWithIcons.find((item) => item.type === social);
	return socialObject.linkBase + value;
};
