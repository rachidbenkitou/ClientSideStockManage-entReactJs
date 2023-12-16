import React, {useEffect, useState} from 'react';
import { clearCart, delItem } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

const Cart = () => {
    const state = useSelector((state) => state.addItem);
    const [total, setTotal] = useState()
    const dispatch = useDispatch();

    const handleClose = (item) => {
        dispatch(delItem(item));
    };

    const handleCheckout = () => {
        // Simulate the process of creating an order
        const currentDate = new Date();
        const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

        const order = {
            date_commande: formattedDate,
            prix: state.reduce((total, item) => total + item.price * item.quantity, 0),
            client_id: 1,
            orderStatus_id: 1,
            discount_id: 1,
            produits: state.map((item) => ({
                produit_id: item.id,
                quantity: item.quantity,
                price: item.price,
            })),
        };

        // Log the order or send it to the server
        console.log('Order:', order);

        // Clear the cart after placing the order
        dispatch(clearCart());
        setTotal(0)
    };

    useEffect(() => {
        setTotal(state.reduce((total, item) => total + item.price , 0).toFixed(2))

    }, []);
    const cartItems = (cartItem) => {
        console.log('Product in Cart:', cartItem);

        return (
            <div className="px-4 my-5 bg-light rounded-3" key={cartItem.id}>
                <div className="container py-4">
                    <button onClick={() => handleClose(cartItem)} className="btn-close float-end" aria-label="Close"></button>
                    <div className="row justify-content-center">
                        <div className="col-md-4">
                            <img src={cartItem.image} alt={cartItem.title} height="200px" width="180px" />
                        </div>
                        <div className="col-md-4">
                            <h3>{cartItem.title}</h3>
                            <p className="lead fw-bold">${cartItem.price}</p>
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

    const button = () => {

        return (
            <div className="container">
                <div className="row">
                    <button onClick={handleCheckout} className="btn btn-outline-dark mb-3 w-25 mx-auto">Proceed To Checkout</button>
                </div>
            </div>
        );
    };

    return (
        <div style={{ marginTop: 100 }}>
            <p className="lead fw-bold d-flex justify-content-center">Total: ${total}</p>

            {state.length === 0 && emptyCart()}
            {state.length !== 0 && state.map(cartItems)}
            {state.length !== 0 && button()}
        </div>
    );
};

export default Cart;
