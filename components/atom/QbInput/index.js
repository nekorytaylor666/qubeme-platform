import React, { useState } from 'react';

const QbInput = ({ placeholder, name, icon, register, required, defaultValue, containerStyle }) => {
	const [focused, setFocused] = useState(false);
	const borderClass = focused ? 'border-gray-400' : 'border-black';
	return (
		<div className={`flex items-center border-b-2 transition-all ease-in-out  border-black flex-grow  py-2 ${borderClass} `}>
			{icon ? <div className="block">{icon}</div> : null}
			<input
				onFocus={() => setFocused(true)}
				onBlur={() => setFocused(false)}
				className="appearance-none bg-transparent border-none w-full text-gray-900 mr-3 py-1 px-2 leading-tight focus:outline-none"
				type="text"
				placeholder={placeholder}
				aria-label={name}
				name={name}
				defaultValue={defaultValue}
				ref={register({ required })}
			/>
		</div>
	);
};

export default QbInput;
