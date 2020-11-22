import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import QbInput from '../../atom/QbInput';
import QbModal from '../../atom/QbModal';
import SocialsGrid from '../../molecules/SocialsGrid';
import { getIconFromSocial } from '../../molecules/SocialsGrid/socialsList';

export const EditPerson = ({ onSubmit, userData }) => {
	const currentSocials = userData && userData.socials;
	const [showSocialGrid, setShowSocialGrid] = useState(false);
	const { register, control, handleSubmit, reset, trigger, setError, setValue } = useForm();
	useEffect(() => {
		if (userData) {
			for (const userProperty in userData) {
				if (userData.hasOwnProperty(userProperty)) {
					const data = userData[userProperty];
					setValue(userProperty, data);
				}
			}
			console.log(userData);
			setValue('socials', userData.socials);
		}
	}, [userData]);
	const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
		control,
		name: 'socials',
	});
	return (
		<div>
			<h1 className="font-sans text-4xl font-bold  ml-4 mt-4">Edit page</h1>
			<form onSubmit={onSubmit && handleSubmit(onSubmit)} className="px-4 py-4">
				<h3 className="font-sans text-2xl font-bold mb-4">Basic info</h3>
				<div className=" flex flex-col space-y-4">
					<QbInput
						name="fullName"
						placeholder={userData?.fullName}
						icon={
							<svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
								/>
							</svg>
						}
						register={register}></QbInput>
					<QbInput
						name="bio"
						placeholder={userData?.bio}
						icon={
							<svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path
									Linecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
								/>
							</svg>
						}
						register={register}></QbInput>

					<QbInput
						name="phoneNumber"
						placeholder={userData?.phoneNumber ?? 'Phone number'}
						icon={
							<svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
								/>
							</svg>
						}
						register={register}></QbInput>

					<QbInput
						name="location"
						placeholder={userData?.location ?? 'Location'}
						icon={
							<svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
								/>
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
							</svg>
						}
						register={register}></QbInput>

					<div className="flex flex-col ">
						<h3 className="font-sans text-2xl font-bold mb-4">Socials</h3>
						<div className="flex flex-col items-start">
							<button
								class="border-4 border-black rounded-xl px-8 py-2 font-bold focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
								onClick={() => {
									setShowSocialGrid(true);
								}}>
								<div class="flex items-center space-x-1 ">
									<div>Add social</div>
									<svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
									</svg>
								</div>
							</button>
						</div>
					</div>
					<div className="space-y-4">
						{fields.map((field, index) => {
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
								<QbInput
									name={`socials[${index}].${socialType}`}
									key={field.id}
									defaultValue={socialValue}
									placeholder={`Input your ${socialType}`}
									icon={<FontAwesomeIcon icon={icon} size="2x"></FontAwesomeIcon>}
									register={register}></QbInput>
							);
						})}
					</div>
				</div>
				<div className="h-8"></div>

				<input
					className="px-8 py-2 border-4 bg-black text-gray-200 rounded-xl font-bold items-center focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50 cursor-pointer"
					type="submit"
					value="Сохранить"></input>
			</form>
			<QbModal visible={showSocialGrid} onCancel={() => setShowSocialGrid(false)}>
				<SocialsGrid
					onSelect={(social) => {
						const socialType = social.type;
						const socialField = {};
						socialField[socialType] = '';
						append(socialField);
					}}></SocialsGrid>
			</QbModal>
		</div>
	);
};
