import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';

export default function Home() {
	return (
		<div>
			<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css" rel="stylesheet" />
			<div className="w-screen flex flex-row items-center p-1 justify-between bg-white shadow-xs">
				<div className="ml-8 text-lg text-gray-700 hidden md:flex">My Website</div>
				<span className="w-screen md:w-1/3 h-10 bg-gray-200 cursor-pointer border border-gray-300 text-sm rounded-full flex">
					<input
						type="search"
						name="serch"
						placeholder="Search"
						className="flex-grow px-4 rounded-l-full rounded-r-full text-sm focus:outline-none"
					/>
					<i className="fas fa-search m-3 mr-5 text-lg text-gray-700 w-4 h-4"></i>
				</span>
				<div className="flex flex-row-reverse mr-4 ml-4 md:hidden">
					<i className="fas fa-bars"></i>
				</div>
				<div className="flex flex-row-reverse mr-8 hidden md:flex">
					<Link href="/signin">
						<a>
							<div className="text-gray-700 text-center bg-gray-400 px-4 py-2 m-2">Login</div>
						</a>
					</Link>
					<Link href="/signup">
						<a>
							<div className="text-gray-700 text-center bg-gray-400 px-4 py-2 m-2">Sign up</div>
						</a>
					</Link>
				</div>
			</div>
		</div>
	);
}
