import React from 'react';

const QbInputLabel = ({ placeholder, name, icon, register, required, label, styles, type }) => {
	return (
		<div className="flex flex-col w-full">
			<label className="flex space-x-1" htmlFor={name}>
				<span className="block">{label ?? name}</span>
				{icon}
			</label>
			<div className="flex items-center border-b-2 border-black  py-2 ">
				<input
					className="appearance-none bg-transparent border-none w-full text-gray-900 mr-3 py-1 px-2 leading-tight focus:outline-none text-center"
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
