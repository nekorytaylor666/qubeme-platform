import React, { useState } from 'react';

const QbInputLabel = ({ placeholder, name, icon, register, required, label, styles, type, textCenter, labelBold }) => {
	const textCenterStyle = textCenter ? 'text-center' : '';
	const labelBoldStyle = labelBold ? 'font-bold' : '';
	const [focused, setFocused] = useState(false);
	const borderClass = focused ? 'border-gray-400' : 'border-black';
	return (
		<div className="flex flex-col flex-grow space-y-2">
			<label className="flex space-x-1" htmlFor={name}>
				{icon}
				<span className={`block ${labelBoldStyle}`}>{label ?? name}</span>
			</label>
			<div className={`flex items-center border-b-2  py-2 ${borderClass}  transition-all ease-in-out`}>
				<input
					onFocus={() => setFocused(true)}
					onBlur={() => setFocused(false)}
					className={`appearance-none bg-transparent border-none w-full text-gray-900 mr-3 py-1 px-2 leading-tight focus:outline-none ${textCenterStyle}`}
					type={type}
					placeholder={placeholder}
					aria-label={name}
					name={name}
					ref={register({ required })}
				/>
			</div>
		</div>
	);
};

export default QbInputLabel;
