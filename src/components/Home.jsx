import React from 'react';

import Logo from '../images/logo.png';
import Arrow from '../images/arrow.png';
import Background from '../images/bg-food.png';
import { homeData } from '../utils/Data';

const Home = () => {
    return (
        <section id="home" className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full mt-4">
            <div className="py-2 flex-1 flex flex-col items-start justify-center gap-6">
                <div className="flex items-center gap-2 justify-center mb-6 relative">
                    <img 
                        src={Logo}
                        alt="" 
                    />
                    <img 
                        className="w-[30rem] absolute z-50 left-[32rem] top-[9rem]"
                        src={Arrow}
                        alt="" 
                    />
                </div>

                <p className="font-bold text-[1.3rem]">
                    "Cooking With Love Provides Food For The Soul."
                </p>

                <p className="text-[2.5rem] lg:text-[3rem] font-bold tracking-wide text-headingColor">
                    The Most Delicious Cuisine in {" "}
                    <span className="text-orange-600 text-[3rem] lg:text-[6rem]">
                        Your City
                    </span>
                </p>

                <p className="text-base text-textColor text-center md:text-left md:w-[80%] mb-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. A veritatis sit, nihil aperiam iste nesciunt et soluta dolor architecto excepturi blanditiis ipsum, veniam voluptatem, quam corporis sapiente quos quo? Necessitatibus.
                </p>

                <button 
                    type="button"
                    className="w-full md:w-auto px-4 py-2 font-semibold border-2 border-orange-500 rounded-lg hover:bg-orange-500 hover:text-white transition-all ease-in-out duration-200"
                >
                    Order Now
                </button>
            </div>

            <div className="py-2 flex-1 flex items-center relative mt-10">
                <img 
                    className="ml-auto h-600 lg:w-auto w-full opacity-10 mr-20" 
                    src={Background}
                    alt="home" 
                />

                <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center lg:px-32 py-4 gap-4 flex-wrap">
                    {
                        homeData && homeData.map((data) => (
                            <div 
                            key={data.id} 
                            className="lg:w-190 p-4 bg-cardOverLay backdrop-blur-md rounded-3xl mx-5 my-3 flex flex-col items-center justify-center drop-shadow-lg">
                                <img
                                    className="w-20 lg:w-40 -mt-10 lg:-mt-20" 
                                    src={data.img} 
                                    alt="" 
                                />
                                <p className="text-base lg:text-xl font-semibold text-textColor lg:mt-4">
                                    {data.name}
                                </p>
                                <p className="text-[12px] lg:text-sm text-center text-semibold text-headingColor my-1 lg:my-3">
                                    {data.des}
                                </p>
                                {/* <p className="text-sm font-semibold text-headingColor">
                                    <span className="text-xs text-red-600">$</span>
                                    {data.price}
                                </p> */}
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    );
};

export default Home;