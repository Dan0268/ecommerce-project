import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../../services/products";

import styles from "./Product.module.scss";
import ProductCard from "../../components/ProductCard";
import ProductSelector from "../../components/ProductSelector";

const Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(undefined);

    useEffect(() => {
        const getData = async () => {
            const data = await getProduct(id);
            setProduct(data);
            // console.log(product);
            // console.log(data);
        };
        getData();
        }, []);
    return (
        <>
        {console.log(product)}
            {product ? (
                <div className={styles.Product}>
                <ProductCard
                    key={product.id}
                    product={product}        
                />
                <ProductSelector 
                    key={product.id}
                    product={product}
                    />
                </div>            
            ) : (
                <p>
                    Product with id ={">"} {id} does not exist
                </p>
            )
            }
        </>
    );
};

export default Product;