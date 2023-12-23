import React, {useEffect, useState} from 'react';
import {clearCart, delItem} from '../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from "react-router-dom";

import axios from "axios";
import {checkIfUserIsAuthenticated, getAuthToken} from "../services/authService";

const Cart = () => {
    const state = useSelector((state) => state.addItem);
    const [total, setTotal] = useState()
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Declare navigate here
    const [isOrderSent, setSentOrder] = useState(false)


    const handleClose = (item) => {
        dispatch(delItem(item));
        setTotal(total-item.prix_unitaire)
    };

    const handleCheckout = async () => {

        const isUserAuthenticated = checkIfUserIsAuthenticated();

        if (!isUserAuthenticated) {
            // If the user is not authenticated, navigate to the login page
            navigate('/login');
            return;
        }
        // Simulate the process of creating an order
        const currentDate = new Date();
        const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

        const authToken = getAuthToken();

        // Set the authorization header with the token
        const config = {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        };

        const order = {
            date_commande: formattedDate,
            prix: total,
            client_id: localStorage.getItem('ecommerceClientId'),
            orderStatus_id: 1,
            discount_id: 1,
            produits: state.map((item) => ({
                produit_id: item.id,
                quantity: 1,
                price: item.prix_unitaire,
            })),
        };

        try {
            // Send the order data to the API
            const response = await axios.post('http://127.0.0.1:8000/api/commandes', order, config);

            // Handle the response as needed
            //console.log('Order placed successfully: Rachid', response.commandes);

            // Clear the cart after placing the order
            dispatch(clearCart());
            setTotal(0);
            //navigate('/products');
            setSentOrder(true)


            // Redirect to the products page or any other page
            //navigate('/products');
        } catch (error) {
            // Handle errors
            console.error('Error during checkout:', error);
            alert('Checkout failed');
        }

        // Log the order or send it to the server
        console.log('Order:', order);

        // Clear the cart after placing the order
        dispatch(clearCart());
        setTotal(0)
    };

    useEffect(() => {
        setTotal(state.reduce((total, item) => total + item.prix_unitaire, 0).toFixed(2))

    }, []);
    const cartItems = (cartItem) => {
        console.log('Product in Cart:', cartItem);

        return (
            <div className="px-4 my-5 bg-light rounded-3"  key={cartItem.id}>
                <div className="container py-4">
                    <button onClick={() => handleClose(cartItem)} className="btn-close float-end"
                            aria-label="Close"></button>
                    <div className="row justify-content-center">
                        <div className="col-md-4">
                            <img src={`/assets/produits/samsung.jpg`} alt={cartItem.nom} height="100px"
                                 width="80px"/>
                        </div>
                        <div className="col-md-4">
                            <h3>{cartItem.nom}</h3>
                            <p className="lead fw-bold">${cartItem.prix_unitaire}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const emptyCart = () => {
        return (
            <div className="px-4 my-5 bg-light rounded-3 py-5">
                <div className="container py-4">
                    <div className="row">
                        <h3>Your Cart is Empty</h3>
                    </div>
                </div>
            </div>
        );
    };

    const orderSentSuccessfully = () => {
        return (
            <div className="container py-4">
                <div className="row">
                    <div className="alert alert-success" role="alert">
<span style={{fontWeight: 'bold', fontSize: '1.2em', textAlign: 'center', display: 'block', margin: 'auto'}}>
    Your order has been sent successfully!
</span>


                    </div>
                </div>
            </div>
        );
    };

    const button = () => {

        return (
            <div className="container">
                <div className="row">
                    <button onClick={handleCheckout} className="btn btn-outline-dark mb-3 w-25 mx-auto">Proceed To
                        Checkout
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div style={{marginTop: 100}}>
            <p className="lead fw-bold d-flex justify-content-center">Order Total Price: ${total}</p>

            {isOrderSent && orderSentSuccessfully()}
            {state.length === 0 && emptyCart()}
            {state.length !== 0 && state.map(cartItems)}
            {state.length !== 0 && button()}
        </div>
    );
};

export default Cart;
