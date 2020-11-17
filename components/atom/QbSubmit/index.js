import React from 'react';

const QbSubmit = ({ value }) => {
	return (
		<input
			type="submit"
			value={value}
			className="rounded-full bg-black text-white font-bold text-xl w-full px-4 py-2 cursor-pointer shadow-md"></input>
	);
};

export default QbSubmit;
