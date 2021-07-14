import styles from "./ProductCard.module.scss";
import VariantSelect from "../VariantSelect";
import Counter from "../Counter";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { updateRecords, getRecord } from "../../services/crud";

const ProductCard = ({ product }) => {
    const [cartId, setCartId] = useState("eOlYq5Ls5F0dQz7aURLA")
    const [cartArr, setCartArr] = useState([]);
    const [productId, setProductId] = useState(product.id);
    const [newQuantity, setNewQuantity] = useState(1);
    const [newVariant, setNewVariant] = useState(product.variants[0].variant);
    
    const getCart = async () => {
        const data = await getRecord("cart", cartId);
        setCartArr(data.products);
    }

    useEffect(() => {
        getCart()
    }, []);

    const handleCountChange = (count) => {
        setNewQuantity(count);
    };

    const handleVariantChange = (item) => {
        setNewVariant(item);
    }

    const handleSubmit = () => {
        const cartItem = {
            productId: productId,
            quantity: newQuantity,
            variant: newVariant,            
        };
        const sameItemIndex = cartArr.findIndex((item, index) => (item.productId === product.id && item.variant === newVariant));
        
        if (newQuantity === 0) {} 
        else if (sameItemIndex === -1) {
            cartArr.push(cartItem);
            // console.log(cartItem);
            updateRecords("cart", cartId, cartArr);
            getCart();

        } else if (sameItemIndex >= 0) {
            cartArr[sameItemIndex].quantity += newQuantity;
            // console.log(cartItem);
            updateRecords("cart", cartId, cartArr);
            getCart();
        }
    }

    return (
        <div className={styles.ProductCard}>
            <div>                
                <h2><Link to={`/products/${product.id}`}>{product.name}</Link></h2>
                <p>Price: ${product.price}</p>
                <div className={styles.Variants}>
                    {product.variants.map(item => {
                        return (
                            <div className={styles.Variant}>
                                <p>{item.variant}</p>
                                <img src={item.imgLink} alt={item.variant} height="300" />
                            </div>
                        );
                    })}
                </div>
            </div>
            <div>
                {/* {console.log(product),
                console.log(product.variants)} */}
                <VariantSelect
                    onChange={handleVariantChange}
                    key={product.id}
                    product={product}
                    variant={newVariant}
                />
                <Counter onChange={handleCountChange} value={1}/>
                <button onClick={handleSubmit}>Add to Cart</button>
            </div>
        </div>
    )
}

export default ProductCard;