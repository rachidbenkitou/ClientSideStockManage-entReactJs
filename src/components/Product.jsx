import {useEffect, useState} from "react";
import { useDispatch} from "react-redux";
import {NavLink, useParams} from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import {addItem, delItem} from "../redux/actions";
import {checkIfUserIsAuthenticated} from "../services/authService";
import {useNavigate } from "react-router-dom";


function Product() {
    const {id} = useParams();
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch= useDispatch();
    const [cartBtn, setCartBtn] = useState('Add to Cart');
    const navigate = useNavigate(); // Declare navigate here


    const addProduct= (product)=>{
        dispatch(addItem(product));
    }
    useEffect(()=>{
        const  getProduct = async ()=>{
            setLoading(true);
            const response=  await fetch(`http://127.0.0.1:8000/api/produits/id/${id}`);
            const reponseData=await response.clone().json()
            setProduct(reponseData.produits.data[0]);
            setLoading(false);
        }
        getProduct();

    }, []);

    const handleCart = (product) => {
        const isUserAuthenticated = checkIfUserIsAuthenticated();

        if (!isUserAuthenticated) {
            // If the user is not authenticated, navigate to the login page
            navigate('/login');
            return;
        }
        if (cartBtn === 'Add to Cart') {
            dispatch(addItem(product));
            setCartBtn('Remove from Cart');
        } else {
            dispatch(delItem(product));
            setCartBtn('Add to Cart');
        }
    };
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
                    <img src={`/assets/produits/${product.image}`} alt={product.title} height="400px" width="400px" />
                </div>

                <div className={"col-md-6"}>
                    <h4 className={"test-uppercase text-black-50"}>
                        {product.category}
                    </h4>
                    <h1 className={"display-5"}>{product.title}</h1>
                    <p className={"lead fw-bolder"}>
                        {/*Rating {product.rating && product.rating.rate}*/}
                        5/5 Good Quality   <i className={"fa fa-star"}></i>
                        <i className={"fa fa-star"}></i>
                        <i className={"fa fa-star"}></i>
                        <i className={"fa fa-star"}></i>
                        <i className={"fa fa-star"}></i>

                    </p>

                    <h3 className={"display-6 fw-bold my-4"}>
                        $ {product.price}
                    </h3>

                    <p className={"lead"}>{product.description}</p>
                    <button className={"btn btn-outline-dark px-4 py-2 "} onClick={()=>handleCart(product)}>
                        {cartBtn}
                    </button>
                    <NavLink className={"btn btn-dark ms-2 px-3 py-2"} to={'/cart'}>
                        Go to Cart
                    </NavLink>
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
export default Product;
