import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {

    const existinItem = cartItems.find( f => f.id === productToAdd.id);
    if(existinItem) {
        return cartItems.map(m => m.id === productToAdd.id ? { ...m, quantity: m.quantity + 1} : m)
    }
    return [...cartItems, {...productToAdd, quantity: 1}];
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems:[],
    addItemToCart: () => {},
    cartCount: 0

});

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount ] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems])
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems,productToAdd));
    }
    const value = { isCartOpen, setIsCartOpen,  cartItems, addItemToCart, cartCount };

    return <CartContext.Provider value={value} >{children}</CartContext.Provider>
}