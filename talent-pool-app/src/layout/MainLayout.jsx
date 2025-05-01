import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/customComponents/LoadingSpinner';
import { Outlet } from 'react-router-dom';

const Layout = () => {
	const loader = useSelector((state) => state.loader.loader);

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header */}
			<header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-10 h-14">
				<Navbar />
			</header>

			{/* Main Content */}
			<main className="min-h-screen bg-[#F6F8FB] pt-6 px-4">
				<div className="pt-12">
					<Outlet />
				</div>
			</main>

			<LoadingSpinner loader={loader} />
		</div>
	);
};

export default Layout;
