import React from 'react';

const QbInput = ({ placeholder, name, icon, register, required }) => {
	return (
		<div>
			<div className="flex items-center border-b-2 border-black  py-2 ">
				{icon}
				<input
					className="appearance-none bg-transparent border-none w-full text-gray-900 mr-3 py-1 px-2 leading-tight focus:outline-none"
					type="text"
					placeholder={placeholder}
					aria-label={name}
					name={name}
					ref={register({ required })}
				/>
			</div>
		</div>
	);
};

export default QbInput;
