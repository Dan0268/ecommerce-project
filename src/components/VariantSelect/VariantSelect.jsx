import { useEffect, useState } from "react";

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

export default VariantSelect;