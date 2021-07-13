import styles from "./CartCard.module.scss";
import { Link } from "react-router-dom";
// import UpdateQuantity from "../UpdateQuantity";
import { useEffect, useState  } from "react";

const CartCard = ({ product, quantity, variant, imgLink }) => {
    useEffect(() =>{

    }, [ product, quantity, variant]);
    // console.log(product);
    // console.log(quantity);
    // console.log(variant);
    // console.log(imgLink);
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


    const VariantSelect = ({ onChange, product, variant = product.variants[0] }) => {
        const [newVariant, setNewVariant] = useState();
    
        useEffect(()=>{
            setNewVariant(variant);
        }, [])
       
        useEffect(() => {
            onChange(newVariant); 
        }, [newVariant]);
    
        // console.log(variant);
    
        const selectVariant = (selection) => {
            setNewVariant(selection.target.value);
            // console.log(variant);
        };
        // console.log(variant);
        return (
            <select onChange={selectVariant} value={newVariant}>
            {product.variants.map((item) => (
                <option value={item.variant}>{item.variant}</option>
                ))}
            </select>
        )
    }

    const handleSubmit = () => {
        const cartItem = {
            productId: productId,
            quantity: newQuantity,
            variant: newVariant,            
        };

        // const sameItemIndex = cartArr.findIndex((item, index) => item.productId === product.id && item.variant === variant && item.quantity === quantity);

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

    const Counter = ({ onChange, value = 1 }) => {
        const [count, setCount] = useState(value);
        
        useEffect(() => {
            onChange(count);
        }, [count]);
    
        const decrement = (e) => {
            if (count === 0) {
                setCount(0);
            } else
            setCount(count - 1);
        };
    
        const increment = (e) => {
            setCount(count + 1);
        };
        return (
            <>
                <button onClick={() => onChange(decrement)}>-</button>
                {count}
                <button onClick={() => onChange(increment)}>+</button>
            </>
        );
    };

    return (
        <div className={styles.CartCard}>
            <div>                
                <h2><Link to={`/products/${product.id}`}>{product.name}</Link></h2>
                <p>Price: ${product.price}</p>
                <div className={styles.Variants}>
                    <div className={styles.Variant}>
                        <p>{variant}</p>
                        <p>{quantity}</p>
                        <img src={imgLink} alt={variant} height="300" />
                    </div>    
                </div>
            </div>
            <div>
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
        </div>
    )
}

export default CartCard;