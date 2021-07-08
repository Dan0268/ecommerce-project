import Counter from "../Counter"
import { useEffect, useState } from "react";
// import styles from "./ProductSelector.module.scss"
import VariantSelect from "../VariantSelect";
import { updateRecords, getRecord } from "../../services/crud";


const UpdateQuantity = ({ product, quantity, variant }) => {
    const [cartId, setCartId] = useState("eOlYq5Ls5F0dQz7aURLA")
    const [productId, setProductId] = useState(product.id);
    const [newQuantity, setNewQuantity] = useState(quantity);
    const [newVariant, setNewVariant] = useState(variant);

    const [cartArr, setCartArr] = useState([]);

    useEffect(() => {
        const getCart = async () => {
            const data = await getRecord("cart", cartId);
            setCartArr(data.products);
        }
        getCart()
    }, []);

    const handleCountChange = (count) => {
        setNewQuantity(count);
    };

    const handleVariantChange = (type) => {
        setNewVariant(type);
    }

    

    const handleSubmit = () => {
        const cartItem = {
            productId: productId,
            quantity: newQuantity,
            variant: newVariant,            
        };

        const sameItemIndex = cartArr.findIndex((item, index) => item.productId === product.id && item.variant === variant && item.quantity === quantity);

        // const differentVariant = cartArr.findIndex((item, index) => item.productId === product.id && item.variant !== variant);

        // const varIndex = cartArr.findIndex((item, index) => item.variant === variant);
 

        if (newQuantity === 0) {
            cartArr.splice(sameItemIndex, 1);
            updateRecords("cart", cartId, cartArr);
        } else if (sameItemIndex >= 0) {
            cartArr.splice(sameItemIndex, 1, cartItem);
            updateRecords("cart", cartId, cartArr);
        }
        console.log(sameItemIndex);
        // console.log(quantity);
        console.log(newQuantity);
        console.log(cartArr[sameItemIndex]);
        console.log(cartItem);
    }

    // useEffect(() => {
    // }, [handleSubmit()]);

// console.log(variant);
    return (
        <div>
        {/* {console.log(product),
        console.log(product.variants)} */}
        <VariantSelect
            onChange={handleVariantChange}
            // key={product.id}
            product={product}
            variant={variant}
        />
        <Counter
            onChange={handleCountChange}
            value={quantity}            
            />
        <button onClick={handleSubmit}>Update Cart</button>
        </div>
    )
}

export default UpdateQuantity;