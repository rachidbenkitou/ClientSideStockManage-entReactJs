import './App.css';
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import {Route, Routes} from "react-router-dom";
import Products from "./components/Products";
import Product from "./components/Product";
import Cart from "./components/Cart";

function App() {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path={"/"} element={<Home />} />
                <Route path={"/products"} element={<Products />} />
                <Route path={"/products/:id"} element={<Product />} />
                <Route path={"/cart"} element={<Cart />} />
            </Routes>
        </>
    );
}


export default App;
