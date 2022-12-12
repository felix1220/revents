import React, { useContext } from "react";
import './CartIcon.styles.css';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { CartContext } from "../../contexts/cart.context";

export default function CartIcon() {
    const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);
    
    return(
        <div className="cart-icon-container" >
            <ShoppingIcon className='shopping-icon' onClick={toggleIsCartOpen} />
            <span className="item-count">{cartCount}</span>
        </div>
    );
}