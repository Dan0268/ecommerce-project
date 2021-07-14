import styles from "./Cart.module.scss"
import { useState, useEffect } from "react";
import { getProducts } from "../../services/products";
import { updateRecords, getRecords, getRecord } from "../../services/crud";
import CartCard from "../../components/CartCard";



const Cart = () => {
    const [products, setProducts] = useState([]);
    const [cartArr, setCartArr] = useState([]);
    const [cartId, setCartId] = useState("eOlYq5Ls5F0dQz7aURLA")

    const getCart = async () => {
        const data = await getRecord("cart", cartId);
        setCartArr(data.products);
    }
    const getData = async () => {
        const data = await getProducts();
        setProducts(data);
        getCart();
    };

    useEffect(() => {
        getData();
    }, []);

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
            {cartArr.map((product, index) => {
                // const productIndex = itemIndex(product.productId);
                // const varIndex = variantIndex(productIndex, product.variant);
                // console.log(product.variant),
                // console.log(productIndex),
                // console.log(varIndex),

                return (
                    <CartCard
                        key={index}
                        product={product} 
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