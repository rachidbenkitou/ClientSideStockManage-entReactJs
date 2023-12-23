import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import {addItem} from "../redux/actions";
import {checkIfUserIsAuthenticated, getAuthToken} from "../services/authService";
import axios from "axios";
import {css} from "@emotion/react";
import {ClipLoader} from "react-spinners";



function Pack() {

    const {id} = useParams();
    const [product, setProduct] = useState([]);
    const [products, setProducts] = useState([]);
    const [isPackCommandSuccess, setIsPackCommandSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch= useDispatch();
    const [cartBtn, setCartBtn] = useState('Buy the pack');
    const navigate = useNavigate(); // Declare navigate here
    const [showPackageDetails, setShowPackageDetails] = useState(false); // State for managing popup visibility

    const getPackProducts = async () => {
        setLoading(true);

        try {
            const response = await fetch("http://127.0.0.1:8000/api/packProduits/id/"+id);
            const reponseData = await response.json();
            console.log("Rachid")
            console.log(reponseData.packs.data[0].produits)

            if ( response.ok) {
                setProducts(reponseData.packs.data[0].produits);
                setLoading(false);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const handleShowPackageDetails = () => {
        setShowPackageDetails(!showPackageDetails);
    };
    const close = () => {
        setShowPackageDetails(!showPackageDetails);
    };

    const handleCheckout = async () => {

        const isUserAuthenticated = checkIfUserIsAuthenticated();

        if (!isUserAuthenticated) {
            // If the user is not authenticated, navigate to the login page
            navigate('/login');
            return;
        }

        const authToken = getAuthToken();

        // Set the authorization header with the token
        const config = {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        };

        const order = {
            client_id:localStorage.getItem("ecommerceClientId"),
            prix: product.prix,
            pack_command_id: product.id,
            date_commande: "2023-12-23",  // replace with the actual formatted date
            orderStatus_id: 1,
            discount_id: 1,
            packs: [
                {
                    pack_id: product.id,  // replace with the actual product ID
                    price: product.prix  // replace with the actual unit price
                }
                // Add more products if needed
            ]
        };
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/packsCommandes', order, config);
            setIsPackCommandSuccess(true)
        } catch (error) {
            // Handle errors
            console.log(order)
            console.error('Error during checkout:', error);
            alert('Checkout failed');
        }
    };
    useEffect(()=>{
        const  getPack = async ()=>{
            setLoading(true);
            const response=  await fetch(`http://127.0.0.1:8000/api/packs/id/${id}`);
            const reponseData=await response.clone().json()
            setProduct(reponseData.pack.data[0]);
            console.log(product)
            setLoading(false);
        }
        getPack().then(r => {
            getPackProducts()
        });

    }, []);


    const Loading = () => {
        const override = css`
      display: block;
      margin: 0 auto;
    `;

        return (
            <>
                {[1, 2, 3, 4].map((index) => (
                    <div key={index} className="col-md-3">
                        <ClipLoader color={"#123abc"} loading={true} css={override} size={50} />
                    </div>
                ))}
            </>
        );
    };

    const  ShowProduct=()=>{
        return(
            <>
                {isPackCommandSuccess &&
                    <div className="alert alert-success" role="alert">
                        You order has been sent successfully!
                    </div>
                }
                <div className={"col-md-6"}>
                    <img src={`/assets/packs/pack.jpg`} alt={product.codePack} height="400px" width="400px" />
                </div>

                <div className={"col-md-6"}>
                    <h4 className={"test-uppercase text-black-50"}>
                        {product.codePack}
                    </h4>
                    <h1 className={"display-5"}>{product.prix}</h1>
                    <p className={"lead fw-bolder"}>
                        {/*Rating {product.rating && product.rating.rate}*/}
                        5/5 Good Quality   <i className={"fa fa-star"}></i>
                        <i className={"fa fa-star"}></i>
                        <i className={"fa fa-star"}></i>
                        <i className={"fa fa-star"}></i>
                        <i className={"fa fa-star"}></i>

                    </p>

                    <h3 className={"display-6 fw-bold my-4"}>
                        $ {product.prix}
                    </h3>

                    <p className={"lead"}>

                        Pack is a good quality phone, we have an important stock, if you want to buy send a message in our whatsApp or order here in website, if you want to buy send a message in our whatsApp or order here in website.
                    </p>
                    <button className={"btn btn-outline-dark px-4 py-2 "} onClick={handleCheckout}>
                        {cartBtn}
                    </button>

                    <button className={"btn btn-dark px-4 py-2 m-2 "} onClick={handleShowPackageDetails}>
                        Pack details
                    </button>

                    {/* Bootstrap Modal */}
                    <div className="modal" tabIndex="-1" style={{ display: showPackageDetails ? 'block' : 'none' }}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Package Details</h5>
                                    <button type="button" className="btn-close" onClick={handleShowPackageDetails}></button>
                                </div>
                                <div className="modal-body">
                                    <h5>List of Products</h5>
                                    <div className="row">
                                        {products.map((product) => (
                                            <div className="col-md-6" key={product.nom}>
                                                <div className="card mb-3">
                                                    <img
                                                        className="card-img-top"
                                                        src={`/assets/produits/samsung.jpg`}
                                                        alt={product.nom}
                                                        style={{ height: '100px', width: '100px', objectFit: 'cover' }}
                                                    />
                                                    <div className="card-body">
                                                        <h5 className="card-title">{product.nom}</h5>
                                                        <p className="card-text">Price: ${product.prix_unitaire}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>


                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={close}>
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <div className={"container py-5"}>
                <div className={"row py-5"}>
                    {loading ? <Loading/> : <ShowProduct/>}
                </div>
            </div>


        </>
    );
}
export default Pack;
