import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import {addItem} from "../redux/actions";
import {checkIfUserIsAuthenticated, getAuthToken} from "../services/authService";
import axios from "axios";


function Pack() {
    const {id} = useParams();
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch= useDispatch();
    const [cartBtn, setCartBtn] = useState('Buy the pack');
    const navigate = useNavigate(); // Declare navigate here

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
            prix: 1,
            client_id: localStorage.getItem('ecommerceClientId'),
            price: product.prix,
            pack_id: product.id
        };
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/packsCommandes', order, config);
        } catch (error) {
            // Handle errors
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
        getPack();

    }, []);


    const  Loading=()=>{
        return(
            <>
                <div className={"col-md-6"}>
                    <Skeleton height={400}/>
                </div>
                <div className={"col-md-6"} style={{lineHeight:2}}>
                    <Skeleton height={50} width={300}/>
                    <Skeleton height={75}/>
                    <Skeleton height={25} width={150}/>
                    <Skeleton height={50}/>
                    <Skeleton height={150}/>
                    <Skeleton height={50} width={100}/>
                    <Skeleton height={50} width={100} style={{marginLeft:6}}/>
                </div>
            </>
        )
    }
    const  ShowProduct=()=>{
        return(
            <>
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
                    <button className={"btn btn-outline-dark px-4 py-2 "} onClick={handleCheckout()}>
                        {cartBtn}
                    </button>
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
