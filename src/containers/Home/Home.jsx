import { useState, useEffect } from "react";

import { getProducts } from "../../services/products";
import ProductCard from "../../components/ProductCard";

import styles from "./Home.module.scss"

const Home = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {   
        const getData = async () => {
            const data = await getProducts();
            setProducts(data);    
        }; 
        getData();
        
    }, []);

    // const handleDelete = async (id) => {
    //     await deleteProduct(id);
    //     getData();
    // }
    // console.log(products);
    return (
        <div className={styles.Home}>
            {products.map(product => (
                <ProductCard
                    key={product.id}
                    product={product}       
                />
            ))}
        </div> 
    );
}

export default Home;