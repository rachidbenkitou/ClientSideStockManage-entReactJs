import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/actions";

const NavBar = () => {
    const state = useSelector((state) => state.addItem);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        localStorage.removeItem('myapptoken');
        localStorage.removeItem('ecommerceClientId');
        dispatch(clearCart());
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 shadow-sm fixed-top">
            <div className="container">
                <NavLink className="navbar-brand fs-3 fw-bold text-dark" to={'/'}>
                    <i className="fa fa-shopping-bag me-2"></i> RYA Store
                </NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" to={'/'}>
                                <i className="fa fa-home me-1"></i> Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to={'products'}>
                                <i className="fa fa-bank me-1"></i> Products
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to={'packages'}>
                                <i className="fa fa-gift me-1"></i> Packages
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to={'/contact'}>
                                <i className="fa fa-envelope me-1"></i> Contact
                            </NavLink>
                        </li>
                    </ul>
                    <div className="buttons">
                        <NavLink to={'login'} className="btn btn-dark me-2">
                            <i className="fa fa-sign-in me-1"></i> Login
                        </NavLink>
                        <button className="btn btn-dark" onClick={handleLogout}>
                            <i className="fa fa-sign-out me-1"></i> Logout
                        </button>
                        <NavLink to={'/register'} className="btn btn-dark ms-2">
                            <i className="fa fa-user-plus me-1"></i> Register
                        </NavLink>
                        <NavLink to={'/cart'} className="btn btn-dark ms-2">
                            <i className="fa fa-shopping-cart me-1"></i> Cart ({state.length})
                        </NavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
