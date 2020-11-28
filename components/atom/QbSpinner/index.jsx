import React from 'react';
const QbSpinner = ({ mini }) => {
	return mini ? (
		<div className="lds-ripple">
			<div></div>
			<div></div>
		</div>
	) : (
		<div className="flex flex-col justify-center items-center h-screen">
			<div className="lds-ripple">
				<div></div>
				<div></div>
			</div>
			<p className="font-bold text-xl text-center">Loading...</p>
		</div>
	);
};

export default QbSpinner;
