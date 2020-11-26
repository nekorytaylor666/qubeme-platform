import React from 'react';
import { useState } from 'react';

const QbModal = ({ visible, onCancel, children }) => {
	const showClass = visible ? '' : 'opacity-0 hidden';
	return visible ? (
		<div className="fixed z-10 inset-0 overflow-y-auto">
			<div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
				<div className="fixed inset-0 transition-opacity" aria-hidden="true">
					<div className="absolute inset-0 bg-gray-500 opacity-75" onClick={onCancel}></div>
				</div>

				<span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
					&#8203;
				</span>

				<div
					className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
					role="dialog"
					aria-modal="true"
					aria-labelledby="modal-headline">
					<div className="rounded bg-white p-4">{children}</div>
				</div>
			</div>
		</div>
	) : null;
};

export default QbModal;
