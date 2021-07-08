import styles from "./ProductCard.module.scss";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
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
        </div>
    )
}

export default ProductCard;