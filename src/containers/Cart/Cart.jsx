import { useState, useEffect } from "react";

import { getProducts } from "../../services/products";
import { updateRecords, getRecords, getRecord } from "../../services/crud";
import CartCard from "../../components/CartCard";

import styles from "./Cart.module.scss"

const Cart = () => {
    const [products, setProducts] = useState([]);
    const [productsInCart, setProductsInCart] = useState([]);
    const [cartId, setCartId] = useState("eOlYq5Ls5F0dQz7aURLA")

    useEffect(() => {   
        const getData = async () => {
            const data = await getProducts();
            setProducts(data);
            const cartData = await getRecord("cart", cartId);
            setProductsInCart(cartData.products);
        };
        getData();
    }, []);


    
    // console.log("productsInCart", productsInCart);

    // let productIndex = 0;
    // let varIndex = 0;

    const itemIndex = (queryItem) => {
        const indexFinder = products.findIndex((item, index) => item.id === queryItem);
        return indexFinder;
    };
    

    const variantIndex = (queryIndex, queryItem) => {
        const variants = products[queryIndex].variants;
        return variants.findIndex((item, index) => item.variant === queryItem);
    }

        
    return (
        <div className={styles.Cart}>
            {productsInCart.map(product => {
                const productIndex = itemIndex(product.productId);
                const varIndex = variantIndex(productIndex, product.variant);
                // console.log(product.variant),
                // console.log(productIndex),
                // console.log(varIndex),

                return (
                    <CartCard
                        key={products[productIndex].id}
                        product={products[productIndex]} 
                        quantity={product.quantity}
                        variant={product.variant}
                        // imgLink={""}
                        imgLink={products[productIndex].variants[varIndex].imgLink}
                    />
                    )
                }
                )
            }
        </div> 
    )
};

export default Cart;