import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faBriefcase, faBuilding, faCommentDots, faCompass, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import QbInput from '../../atom/QbInput';
import QbInputLabel from '../../atom/QbInputLabel';
import QbModal from '../../atom/QbModal';
import SocialsGrid from '../../molecules/SocialsGrid';
import { getIconFromSocial } from '../../molecules/SocialsGrid/socialsList';
import Image from 'next/image';
import { storage } from '../../../utils/firebaseClient';

export const EditPerson = ({ onSubmit, userData, onImageUpload, avatar }) => {
	const currentSocials = userData && userData.socials;
	const [showSocialGrid, setShowSocialGrid] = useState(false);
	const { register, control, handleSubmit, reset, trigger, setError, setValue, getValues } = useForm();
	useEffect(() => {
		console.log(userData);

		if (userData) {
			const { socials } = userData;
			reset(userData);
			setValue('socials', socials);
		}
	}, [userData]);
	const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
		control,
		name: 'socials',
	});

	const getSocialInputFromField = (field, index) => {
		//field is an object with the structure {'id': #hash, #socialName: #value}.
		//This code takes second property that is not id
		const socialType = Object.keys(field)
			.filter((property) => property !== 'id')
			.pop();
		const icon = getIconFromSocial(socialType);
		//after we get the type of social we get value of this socialtype
		//to get it we need to find out is there any item with this social type and if it has we get its value
		const socialValue = field[socialType];
		return (
			<div key={field.id} className="flex items-center justify-between space-x-4">
				<QbInput
					name={`socials[${index}].${socialType}`}
					defaultValue={socialValue}
					placeholder={`Input your ${socialType}`}
					icon={<FontAwesomeIcon icon={icon} size="2x"></FontAwesomeIcon>}
					register={register}></QbInput>
				<button type="button" onClick={() => remove(index)}>
					<svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>
		);
	};

	const onSelectSocial = (social) => {
		const socialType = social.type;
		const socialField = {};
		socialField[socialType] = '';
		append(socialField);
		setShowSocialGrid(false);
	};

	return (
		<div className="container mx-auto">
			<form onSubmit={onImageUpload && handleSubmit(onImageUpload)}>
				<img width={120} height={120} src={avatar} alt="avatar" />
				<input type="file" name="avatar" id="avatar" ref={register} />
				<input type="submit" value="Save" />
			</form>
			<h1 className="font-sans text-4xl font-bold  ml-4 mt-4">Edit page</h1>
			<form onSubmit={onSubmit && handleSubmit(onSubmit)} className="px-4 py-4">
				<h3 className="font-sans text-2xl font-bold mb-4">Basic info</h3>
				<div className=" flex flex-col space-y-4">
					<QbInputLabel
						label="Full name"
						name="fullName"
						placeholder={userData?.fullName}
						icon={<FontAwesomeIcon icon={faUser} style={{ fontSize: 20 }}></FontAwesomeIcon>}
						register={register}></QbInputLabel>
					<QbInputLabel
						label="Biography"
						name="bio"
						placeholder={userData?.bio}
						icon={<FontAwesomeIcon icon={faCommentDots} style={{ fontSize: 20 }}></FontAwesomeIcon>}
						register={register}></QbInputLabel>
					<QbInputLabel
						label="Occupation"
						name="occupation"
						placeholder={userData?.occupation}
						icon={<FontAwesomeIcon icon={faBriefcase} style={{ fontSize: 20 }}></FontAwesomeIcon>}
						register={register}></QbInputLabel>
					<QbInputLabel
						label="Compnay"
						name="company"
						placeholder={userData?.company}
						icon={<FontAwesomeIcon icon={faBuilding} style={{ fontSize: 20 }}></FontAwesomeIcon>}
						register={register}></QbInputLabel>

					<QbInputLabel
						label="Phone number"
						name="phoneNumber"
						placeholder={userData?.phoneNumber ?? 'Phone number'}
						icon={<FontAwesomeIcon icon={faPhone} style={{ fontSize: 20 }}></FontAwesomeIcon>}
						register={register}></QbInputLabel>

					<QbInputLabel
						label="Location"
						name="location"
						placeholder={userData?.location ?? 'Location'}
						icon={<FontAwesomeIcon icon={faCompass} style={{ fontSize: 20 }}></FontAwesomeIcon>}
						register={register}></QbInputLabel>

					<div className="flex flex-col ">
						<h3 className="font-sans text-2xl font-bold mb-4">Socials</h3>
						<div className="flex flex-col items-center">
							<button
								className="border-4 border-black rounded-xl px-8 py-2 font-bold focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
								onClick={() => {
									setShowSocialGrid(true);
								}}>
								<div className="flex items-center space-x-1 ">
									<div>Add social</div>
									<svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
									</svg>
								</div>
							</button>
						</div>
					</div>
					<div className="space-y-4">{fields.map(getSocialInputFromField)}</div>
				</div>
				<div className="h-8"></div>

				<div className="flex justify-center">
					<input
						className="px-12 py-2 border-4 bg-black text-gray-200 rounded-xl font-bold items-center focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50 cursor-pointer"
						type="submit"
						value="Сохранить"></input>
				</div>
			</form>
			<QbModal visible={showSocialGrid} onCancel={() => setShowSocialGrid(false)}>
				<SocialsGrid onSelect={onSelectSocial}></SocialsGrid>
			</QbModal>
		</div>
	);
};
