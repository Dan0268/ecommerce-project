import { Link, useLocation } from "react-router-dom";

const Header = () => {
    return (
        <Link to={`/cart`}>Go to Cart</Link>
    )
}

export default Header;