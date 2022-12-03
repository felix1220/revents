import React, { useContext} from "react";
import { ProductsContext } from '../../contexts/products.context';
import ProductCard from "../product-card/ProductCard";
import "./shop.styles.css";

export default function Shop() {
    const { products } = useContext(ProductsContext);
    return (
        <div className="products-container">
            {
                products.map((product) => (
                    <ProductCard key={product.id} product={product}></ProductCard>
                ))
            }
        </div>
    )
}