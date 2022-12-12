import React, { useContext } from "react";
import './CartDropDown.styles.css';
import { Button } from '../../layout/Button';
import { CartContext } from "../../contexts/cart.context";
import CartItem from "../cart-item/CartItem";

export default function CartDropDown() {
    const { cartItems } = useContext(CartContext);
    console.log('The items are => ', cartItems);
    return(
        <div className="cart-dropdown-container">
            <div className='cart-items'>
                {
                    cartItems.map(item => <CartItem key={item.id} cartItem={item}/>)
                }
            </div>
            <Button>Go to Checkout</Button>
                
        </div>
    )
}