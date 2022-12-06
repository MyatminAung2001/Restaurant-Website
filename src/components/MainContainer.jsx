import React, { useEffect } from 'react';
import { useStateValue } from '../context/StateProvider';
import Cart from './Cart';
import Home from './Home';
import MainSection from './MainSection';
import Menu from './Menu';

const MainContainer = () => {

    const [{cartShow}, dispatch] = useStateValue();

    useEffect(() => {}, [cartShow]);

    return (
        <div className="w-full h-auto flex flex-col items-center justify-center">
            <Home />
            <MainSection />
            <Menu/>
            {
                cartShow && <Cart />
            }
        </div>
    );
};

export default MainContainer;