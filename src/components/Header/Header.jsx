import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

function Header() {
    const [showPopup, setShowPopup] = useState(false);

    const handleMouseEnter = () => {
        setShowPopup(true);
    };

    const handleMouseLeave = () => {
        setShowPopup(false);
    };

    return (
        <>
            <nav className='bg-black h-32 w-screen flex flex-row py-4 items-center justify-center'>
                <div className='border border-white border-1 hover:border-2 hover:border-cyan-300 rounded-lg flex flex-row text-white justify-between py-4 px-8 h-5/6 w-5/6'>
                    
                    <Link to="/" className="">
                        <img
                            src="https://alexharkness.com/wp-content/uploads/2020/06/logo-2.png"
                            className="h-12 w-32"
                            alt="Logo"
                        />
                    </Link>
                    <div className='text-2xl w-2/6 flex items-center justify-between'>
                    <NavLink to="/about" className="hover:text-cyan-300" activeClassName="text-cyan-300">
                            Home
                        </NavLink>
                        <NavLinkWithPopup
                            to="/shows"
                            popupContent={
                                <div className="flex flex-col gap-2">
                                    <Link to="/comedy">Comedy</Link>
                                    <Link to="/movies">Movies</Link>
                                    <Link to="/concerts">Concerts</Link>
                                </div>
                            }
                        >
                            Shows
                        </NavLinkWithPopup>
                        <NavLink to="/about" className="hover:text-cyan-300" activeClassName="text-cyan-300">
                            About Us
                        </NavLink>
                    </div>
                    <div className='flex text-xl flex-row items-center w-44 justify-between '>
                        <NavLink to="/login" className="hover:text-cyan-300" activeClassName="text-cyan-300">
                            Log in
                        </NavLink>
                        <NavLink to="/signup" className="hover:text-cyan-300" activeClassName="text-cyan-300">
                            Get Started
                        </NavLink>
                    </div>
                </div>
                {showPopup && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white dark:bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl py-2 px-4"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        {popupContent}
                    </motion.div>
                )}
            </nav>
        </>
    );
}

const NavLinkWithPopup = ({ to, children, popupContent }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative"
        >
            <NavLink
                to={to}
                className={`hover:text-cyan-300 ${isHovered ? 'text-cyan-300' : ''}`}
                activeClassName="text-cyan-300"
            >
                {children}
            </NavLink>
            {isHovered && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white dark:bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl py-2 px-4"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {popupContent}
                </motion.div>
            )}
        </div>
    );
};

export default Header;
