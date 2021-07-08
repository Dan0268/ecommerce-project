import styles from './App.module.scss';

import Home from './containers/Home';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Product from './containers/Product';
import Header from './containers/Header';
import Cart from './containers/Cart';



const App = () => {
    return (
        <>
            <Router>
                <Header />
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/products/:id">
                        <Product />
                    </Route>
                    <Route path="/cart">
                        <Cart />
                    </Route>
                </Switch>
            
            </Router>
        </>
    )
};

export default App;
