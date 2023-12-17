import './App.css';
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import {Route, Routes} from "react-router-dom";
import Products from "./components/Products";
import Product from "./components/Product";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Register from "./components/Register";
import Package from "./components/Packages";
import Contact from "./components/Contact";

function App() {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path={"/"} element={<Home />} />
                <Route path={"/products"} element={<Products />} />
                <Route path={"/products/:id"} element={<Product />} />
                <Route path={"/cart"} element={<Cart />} />
                <Route path={"/login"} element={<Login />} />
                <Route path={"/register"} element={<Register />} />
                <Route path={"/packages"} element={<Package />} />
                <Route path={"/contact"} element={<Contact />} />
            </Routes>
        </>
    );
}


export default App;
