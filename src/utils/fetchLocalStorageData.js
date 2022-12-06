export const fetchUser = () => {
    const userInfo = localStorage.getItem('user') !== 'undefined' ?
    JSON.parse(localStorage.getItem('user')) :
    localStorage.clear();

    return userInfo;
};

export const fetchCartItems = () => {
    const cartInfo = localStorage.getItem('cartItems') !== 'undefined' ?
    JSON.parse(localStorage.getItem('cartItems')) :
    localStorage.clear();

    return cartInfo ? cartInfo : [];
};