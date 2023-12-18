import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";


import Button from "bootstrap/js/src/button";
import {clearCart} from "../redux/actions";

const NavBar = () => {
    const  state = useSelector((state)=> state.addItem)
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleLogout = () => {
        // Remove the token from localStorage
        localStorage.removeItem('myapptoken');
        localStorage.removeItem('ecommerceClientId');
        dispatch(clearCart());

        // Redirect to the login page or any other page after logout
        navigate('/login');
    };
    return (

        <div>

            <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 shadow-sm fixed-top" >
                <div className="container">
                    <NavLink className="navbar-brand fw-bold fs-4" href="#" to={'/'}>Bokeito Store</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" href="#" to={'/'}>Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to={'products'}>Products</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" href="#" to={'packages'}>Packages</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link"  to={'/contact'}>Contact</NavLink>
                            </li>
                        </ul>
                        <div className={"buttons"}>
                            <NavLink to={'login'} className={"btn btn-outline-dark me-2"}>
                                <i className={"fa fa-sign-in me-1"}></i> Login
                            </NavLink>

                            <button className={"btn btn-outline-dark"} onClick={handleLogout}>
                                <i className={"fa fa-sign-out me-1"} ></i> Logout
                            </button>

                            <NavLink to={'/register'} className={"btn btn-outline-dark ms-2"}>
                                <i className={"fa fa-user-plus me-1"}></i> Register
                            </NavLink>
                            <NavLink to={'/cart'} className={"btn btn-outline-dark ms-2" }>
                                <i className={"fa fa-shopping-cart me-1"}></i> Cart ({state.length})
                            </NavLink>

                        </div>

                    </div>
                </div>
            </nav>


        </div>
    )
}

export default NavBar;