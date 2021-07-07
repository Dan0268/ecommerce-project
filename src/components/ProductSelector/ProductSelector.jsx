import Counter from "../Counter"
import { useEffect, useState } from "react";
import styles from "./ProductSelector.module.scss"
import VariantSelect from "../VariantSelect";
import { updateRecords, getRecords, getRecord } from "../../services/crud";


const ProductSelector = ({ product }) => {
    const [cartId, setCartId] = useState("eOlYq5Ls5F0dQz7aURLA")
    const [productId, setProductId] = useState(product.id);
    const [quantity, setQuantity] = useState(0);
    const [variant, setVariant] = useState("");

    const [cartArr, setCartArr] = useState([]);

    useEffect(() => {
        const getCart = async () => {
            const data = await getRecord("cart", cartId);
            setCartArr(data.products);
        }
        getCart()
    }, []);

    const handleCountChange = (count) => {
        setQuantity(count);
    };

    const handleVariantChange = (variant) => {
        setVariant(variant);
    }

    const handleSubmit = () => {
        const cartItem = {
            productId: productId,
            quantity: quantity,
            variant: variant,            
        };

        const itemIndex = cartArr.findIndex((item, index) => 
        item.productId == productId);

        console.log(itemIndex);
        
        if (quantity == 0) {} 
        else if (itemIndex == -1) {
            cartArr.push(cartItem);
            updateRecords("cart", cartId, cartArr);
        } else if (itemIndex >= 0) {
            cartArr[itemIndex].quantity += quantity;
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
        />
        <Counter onChange={handleCountChange}/>
        <button onClick={handleSubmit}>Add to Cart</button>
        </div>
    )
}

export default ProductSelector;