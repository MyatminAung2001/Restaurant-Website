import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineShoppingCart, MdAdd, MdLogout } from 'react-icons/md'

import { motion } from 'framer-motion';

import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from '../firebase.config';

import Logo from '../images/logo.png';
import Avatar from '../images/user.jpg'
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/Reducer';

const NavBar = () => {

    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const [{user, cartShow, cartItems}, dispatch] = useStateValue();

    const [isMenu, setIsMenu] = useState(false);

    const loginHandler = async () => {
        if (!user) {
            const {user: {refreshToken, providerData}} = await signInWithPopup(firebaseAuth, provider);
            dispatch({
                type: actionType.SET_USER,
                user: providerData[0]
            });
            localStorage.setItem('user', JSON.stringify(providerData[0]));
        } else {
            setIsMenu(!isMenu);
        }
    };

    const logoutHandler = () => {
        setIsMenu(false);

        localStorage.clear()

        dispatch({
            type: actionType.SET_USER,
            user: null,
        });
    };

    const logoutModalHandler = () => {
        setIsMenu(false)
    };

    const showCartHandler = () => {
        dispatch({
            type: actionType.SET_CART_SHOW,
            cartShow: !cartShow,
        });
    };

    return (
        <header className="fixed z-50 w-screen p-3 px-4 md:p-4 md:px-16 drop-shadow bg-primary">
            {/* Destop And Tablet */}
            <div className="hidden md:flex w-full h-full items-center justify-between">
                <Link to={'/'} className="flex items-center gap-2">
                    <p className='text-headingColor text-xl font-bold'>
                        <span className="text-orange-500 text-[2rem]">Rand</span>    
                        {" "} Restaurant
                    </p>
                </Link>

                <div className="flex items-center gap-8">
                    <motion.ul 
                        initial={{opacity: 0, x: 200}}
                        animate={{opacity: 1, x: 0}}
                        exit={{opacity: 0, x: 200}}
                        className="flex items-center gap-24">
                        <li
                            onClick={logoutModalHandler}
                            className="text-lg font-semibold text-textColor hover:text-hoverNavBarColor duration-100 transition-all ease-in-out cursor-pointer"
                        >
                            Home
                        </li>
                        <li 
                            onClick={logoutModalHandler}
                            className="text-lg font-semibold text-textColor hover:text-hoverNavBarColor duration-100 transition-all ease-in-out cursor-pointer"
                        >
                            Menu
                        </li>
                        <li 
                            onClick={logoutModalHandler}
                            className="text-lg font-semibold text-textColor hover:text-hoverNavBarColor duration-100 transition-all ease-in-out cursor-pointer"
                        >
                            Service
                        </li>
                        <li 
                            onClick={logoutModalHandler}
                            className="text-lg font-semibold text-textColor hover:text-hoverNavBarColor duration-100 transition-all ease-in-out cursor-pointer"
                        >
                            About Us
                        </li>
                    </motion.ul>

                    <div className="relative flex items-center justify-center mx-4" onClick={showCartHandler}>
                        <MdOutlineShoppingCart className="text-textColor text-2xl cursor-pointer" />
                        {
                            cartItems && cartItems.length > 0 && (
                                <div className="w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center absolute -top-2 -right-3">
                                    <p className="text-xs text-white font-semibold">
                                        {cartItems.length}
                                    </p>
                                </div>
                            )
                        }
                    </div>

                    <div className="relative">
                        <motion.img
                            onClick={loginHandler} 
                            whileTap={{scale: 0.6}} 
                            src={user ? user.photoURL : Avatar} alt="userprofile" 
                            className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl rounded-full cursor-pointer"
                        />
                        {
                            isMenu && (
                                <motion.div 
                                    initial={{opacity: 0, scale: 0.6}} 
                                    animate={{opacity: 1, scale: 1}} 
                                    exit={{opacity: 0, scale: 0.6}} 
                                    className="flex flex-col w-40 bg-gray-50 shadow-xl rounded-lg absolute top-12 right-0">
                                    {
                                        user && user.email === "iridiamthegreat@gmail.com" && (
                                            <Link to={'/createItem'}>
                                                <p 
                                                    onClick={logoutModalHandler}
                                                    className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                                                >
                                                    New Item <MdAdd/> 
                                                </p>
                                            </Link>
                                        )
                                    }
                                    <p 
                                        onClick={logoutHandler}
                                        className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                                    >
                                        Logout <MdLogout/> 
                                    </p>
                                </motion.div>
                            )
                        }
                    </div>
                </div>
            </div>

            {/* Mobile */}
            <div className="flex items-center justify-between md:hidden w-full h-full">
                <div className="relative flex items-center justify-center" onClick={showCartHandler}>
                    <MdOutlineShoppingCart className="text-textColor text-2xl cursor-pointer" />
                    {
                        cartItems && cartItems.length > 0 && (
                            <div className="w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center absolute -top-2 -right-3">
                                <p className="text-xs text-white font-semibold">
                                    {cartItems.length}
                                </p>
                            </div>
                        )
                    }
                </div>

                <Link to={'/'} className="flex items-center gap-2">
                    <img src={Logo} className="w-20 object-cover" alt="logo" />
                    {/* <p className='text-headingColor text-xl font-bold'>Rand Restaurant</p> */}
                </Link>

                <div className="relative">
                    <motion.img
                        onClick={loginHandler} 
                        whileTap={{scale: 0.6}} 
                        src={user ? user.photoURL : Avatar} alt="userprofile" 
                        className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl rounded-full cursor-pointer"
                    />
                    {
                        isMenu && (
                            <motion.div 
                                initial={{opacity: 0, scale: 0.6}} 
                                animate={{opacity: 1, scale: 1}} 
                                exit={{opacity: 0, scale: 0.6}} 
                                className="flex flex-col w-40 bg-gray-50 shadow-xl rounded-lg absolute top-12 right-0">
                                {
                                    user && user.email === "iridiamthegreat@gmail.com" && (
                                        <Link to={'/createItem'}>
                                            <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                                                New Item <MdAdd/> 
                                            </p>
                                        </Link>
                                    )
                                }
                                <ul className="flex flex-col">
                                    <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2">
                                        Home
                                    </li>
                                    <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2">
                                        Menu
                                    </li>
                                    <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2">
                                        Service
                                    </li>
                                    <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2">
                                        About Us
                                    </li>
                                </ul>
                                <p 
                                    onClick={logoutHandler}
                                    className="m-2 p-2 flex items-center justify-center bg-gray-400 gap-3 cursor-pointer rounded-full hover:bg-slate-300 hover:text-textColor transition-all duration-100 ease-in-out text-white text-base"
                                >
                                    Logout <MdLogout/> 
                                </p>
                            </motion.div>
                        )
                    }
                </div>
            </div>
        </header>
    );
};

export default NavBar;