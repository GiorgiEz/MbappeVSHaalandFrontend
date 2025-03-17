import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="bg-blue-600 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <nav>
                    <ul className="flex space-x-4">
                        <li><a href="#" className="hover:text-gray-200">All Time Stats</a></li>
                        <li><a href="#" className="hover:text-gray-200">Stats By Season</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
