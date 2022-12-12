import React, { useContext} from 'react';
import './ProductCard.styles.css';
import { Button } from "../../layout/Button";
import { CartContext } from '../../contexts/cart.context';

export default function ProductCard({product}) {
    const { name, price, imageUrl } = product;
    const { addItemToCart } = useContext(CartContext);
    const addProductToCart = () => {
        console.log('the product is => ', product)
        addItemToCart(product);
    }

    return (
        <div className="product-card-container">
            <img src={imageUrl} alt={`${name}`} />
            <div className="footer">
                <span className="name">{name} </span>
                <span className="price"> {price}</span>
            </div>
            <Button buttonType="inverted" onClick={addProductToCart}>Add TO Cart</Button>
        </div>
    )
}