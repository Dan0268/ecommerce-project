import styles from "./CartCard.module.scss";
import { Link, useLocation } from "react-router-dom";

const CartCard = ({ product, quantity, variant, imgLink }) => {
    // console.log(product);
    // console.log(quantity);
    // console.log(variant);
    // console.log(imgLink);
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
        </div>
    )
}

export default CartCard;