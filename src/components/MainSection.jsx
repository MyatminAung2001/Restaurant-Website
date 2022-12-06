import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

import RowContainer from './RowContainer';
import { useStateValue } from '../context/StateProvider';

const MainSection = () => {

    const [{foodItems}, dispatch] = useStateValue();

    const [scrollValue, setscrollValue] = useState(0);

    useEffect(() => {}, [scrollValue]);

    const scrollLeftHandler = () => {
        setscrollValue(-400)
    };

    const scrollRightHandler = () => {
        setscrollValue(400)
    };

    return (
        <section className="w-full mt-16">
            <div className="w-full flex items-center justify-between">
                <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute 
                    before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 
                    before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100">
                    Today Special Cuisine We Offer
                </p>

                <div className="hidden md:flex gap-3 items-center mt-10">
                    <motion.div
                        whileTap={{ scale: 0.75 }}
                        className="w-12 h-12 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg flex items-center justify-center"
                        onClick={scrollLeftHandler}
                    >
                        <MdChevronLeft className="text-lg text-white" />
                    </motion.div>
                    <motion.div
                        whileTap={{ scale: 0.75 }}
                        className="w-12 h-12 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg flex items-center justify-center"
                        onClick={scrollRightHandler}
                    >
                        <MdChevronRight className="text-lg text-white" />
                    </motion.div>
                </div>
            </div>
            <RowContainer
                scrollValue={scrollValue}
                flag={true}
                data={foodItems?.filter((n) => (n.category === "Cuisine" ))}
            />
        </section>
    );
};

export default MainSection;