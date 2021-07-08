import Counter from "../Counter"
import { useEffect, useState } from "react";
// import styles from "./ProductSelector.module.scss"
import VariantSelect from "../VariantSelect";
import { updateRecords, getRecord } from "../../services/crud";


const ProductSelector = ({ product }) => {
    const [cartId, setCartId] = useState("eOlYq5Ls5F0dQz7aURLA")
    const [productId, setProductId] = useState(product.id);
    const [newQuantity, setNewQuantity] = useState(1);
    const [newVariant, setNewVariant] = useState(product.variants[0]);

    const [cartArr, setCartArr] = useState([]);

    useEffect(() => {
        const getCart = async () => {
            const data = await getRecord("cart", cartId);
            setCartArr(data.products);
        }
        getCart()
    }, []);
    console.log(cartArr);
    const handleCountChange = (count) => {
        setNewQuantity(count);
    };

    const handleVariantChange = (variant) => {
        setNewVariant(variant);
    }

    const handleSubmit = () => {
        const cartItem = {
            productId: productId,
            quantity: newQuantity,
            variant: newVariant,            
        };

        const sameItemIndex = cartArr.findIndex((item, index) => item.productId === product.id && item.variant === newVariant && item.quantity === newQuantity);

        const itemIndex = cartArr.findIndex((item, index) => item.productId === productId);

        const varIndex = cartArr.findIndex((item, index) => item.variant === newVariant);

        
        if (newQuantity === 0) {} 
        else if (sameItemIndex === -1) {
            cartArr.push(cartItem);
            console.log(cartItem);
            updateRecords("cart", cartId, cartArr);
        } else if (itemIndex >= 0 && varIndex >= 0) {
            cartArr[itemIndex].quantity += newQuantity;
            console.log(cartItem);
            updateRecords("cart", cartId, cartArr);
        } else if (itemIndex >= 0 && varIndex === -1) {
            cartArr.push(cartItem);
            console.log(cartItem);
            updateRecords("cart", cartId, cartArr);
        }
    }


// console.log(variant);
    return (
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
    )
}

export default ProductSelector;