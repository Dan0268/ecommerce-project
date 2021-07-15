import styles from "./CartCard.module.scss";
import { Link } from "react-router-dom";
import { updateRecords, getRecord } from "../../services/crud";
// import UpdateQuantity from "../UpdateQuantity";
import { useEffect, useState  } from "react";
import VariantSelect from "../VariantSelect";
import Counter from "../Counter";

const CartCard = ({ cartItem, imgLink, index, cart, product, onChange }) => {
    // useEffect(() =>{
    // }, [ product, quantity, variant]);
    // console.log(product);
    // console.log(quantity);
    // console.log(variant);
    // console.log(imgLink);
    const [cartId, setCartId] = useState("eOlYq5Ls5F0dQz7aURLA")
    const [newCartItem, setNewCartItem] = useState(cartItem);
    // const [productId, setProductId] = useState(cartItem.id);
    const [newQuantity, setNewQuantity] = useState(cartItem.quantity);
    const [newVariant, setNewVariant] = useState(cartItem.variant);
    const [cartArr, setCartArr] = useState([cart]);
    // const getCart = async () => {
    //     const data = await getRecord("cart", cartId);
    //     setCartArr(data.products);
    // }

    const handleCountChange = (count) => {
        setNewQuantity(count);
    };

    const handleVariantChange = (type) => {
        setNewVariant(type);
    }

    // useEffect(() => {
    //     onChange(cartArr); 
    // }, [cartArr]);


    const handleSubmit = () => {
        newCartItem.variant = newVariant;
        newCartItem.quantity = newQuantity;

        // const newCartItem = {
        //     productId: productId,
        //     quantity: newQuantity,
        //     variant: newVariant,            
        // };

        // const sameItemIndex = cartArr.findIndex((item, index) => item.productId === product.id && item.variant === variant && item.quantity === quantity);

        // const differentVariant = cartArr.findIndex((item, index) => item.productId === product.id && item.variant !== variant);

        // const varIndex = cartArr.findIndex((item, index) => item.variant === variant);
 

        if (newQuantity === 0) {
            cartArr.splice(index, 1);
            console.log(cartArr)
            updateRecords("cart", cartId, cartArr);

        } else {
            cartArr.splice(index, 1, newCartItem);
            updateRecords("cart", cartId, cartArr);
        }
        // console.log(sameItemIndex);
        // console.log(quantity);
        // console.log(newQuantity);
        // console.log(cartArr[sameItemIndex]);
        // console.log(cartItem);
    }


    return (
        <div className={styles.CartCard}>
            <div>                
                <h2><Link to={`/products/${product.id}`}>{product.name} {cartItem.variant}</Link></h2>
                <p>Price: ${product.price}</p>
                <div className={styles.Variants}>
                    <div className={styles.Variant}>
                        <p>{cartItem.variant}</p>
                        <p>{cartItem.quantity}</p>
                        <img src={imgLink} alt="variant" height="300" />
                    </div>    
                </div>
            </div>
            <div>
                <VariantSelect
                onChange={handleVariantChange}
                // key={product.id}
                product={product}
                variant={cartItem.variant}
                />
                <Counter
                onChange={handleCountChange}
                value={cartItem.quantity}            
                />
                <button onClick={() => onChange(handleSubmit)}>Update Cart</button>
            </div>
        </div>
    )
}

export default CartCard;