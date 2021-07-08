import { useState, useEffect } from "react";

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

export default Counter;
