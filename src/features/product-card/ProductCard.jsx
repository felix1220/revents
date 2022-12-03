import React from 'react';
import './ProductCard.styles.css';
import { Button } from "../../layout/Button";

export default function ProductCard({product}) {
    const { name, price, imageUrl } = product
    return (
        <div className="product-card-container">
            <img src={imageUrl} alt={`${name}`} />
            <div className="footer">
                <span className="name">{name} </span>
                <span className="price"> {price}</span>
            </div>
            <Button buttonType="inverted">Add TO Cart</Button>
        </div>
    )
}