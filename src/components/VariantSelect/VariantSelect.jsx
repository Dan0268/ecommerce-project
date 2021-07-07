import { useEffect, useState } from "react";

const VariantSelect = ({ onChange, product }) => {
    const [variant, setVariant] = useState();


    useEffect(()=>{
        setVariant(product.variants[0].variant);
    }, [])
   
    useEffect(() => {
        onChange(variant); 
    }, [variant]);

    // console.log(variant);

    const selectVariant = (selection) => {
        setVariant(selection.target.value);
        // console.log(variant);
    };
    // console.log(variant);
    return (
        <select onChange={selectVariant}>
        {product.variants.map((item) => (
            <option value={item.variant}>{item.variant}</option>
            ))}
        </select>
    )
}

export default VariantSelect;