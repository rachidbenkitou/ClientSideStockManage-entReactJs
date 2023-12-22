import '../App.css';
import {useEffect, useState} from "react";
import Skeleton from 'react-loading-skeleton';
import {NavLink} from "react-router-dom";
import Button from "bootstrap/js/src/button";
import {css} from "@emotion/react";
import {ClipLoader} from "react-spinners";


const Products = () =>  {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState(data);
    const [loading, setLoading] =useState(false);
    const [isListEmpty, setIsListEmpty] = useState(false)
    let componentMounted= true;
    useEffect(()=>{
        getProducts();

    }, []);
    const getProducts=async () =>{
        setLoading(true);
        const  response= await fetch("http://127.0.0.1:8000/api/produits");
        if(componentMounted){
            const reponseData=await response.clone().json()
            if(reponseData.status===200){
                setIsListEmpty(false)
                setData(reponseData.produits.data);
                setFilter(reponseData.produits.data);
                setLoading(false)
            }else {
                setIsListEmpty(true)

            }
        }

        return ()=>{
            componentMounted= false;
        }
    }

    const NotproductFound= ()=>{
        return (
            <div className="d-flex align-items-center justify-content-center">
                {setLoading(false)}
                <div className="text-center">
                    <h1 className="display-1 fw-bold">404</h1>
                    <p className="fs-3">
                        <span className="text-danger">Oops!</span> No product found.
                    </p>
                    <p className="lead">No product found this time! Go to home</p>
                    <NavLink to={'/home'} className="btn btn-primary">
                        Go Home
                    </NavLink>
                </div>
            </div>
        );
    }


    const Loading = () => {
        const override = css`
    display: block;
    margin: 0 auto;
  `;

        return (
            <>
                <div className={"col-md-3"}>
                    <ClipLoader color={"#123abc"} loading={true} css={override} size={50} />
                </div>
                <div className={"col-md-3"}>
                    <ClipLoader color={"#123abc"} loading={true} css={override} size={50} />
                </div>
                <div className={"col-md-3"}>
                    <ClipLoader color={"#123abc"} loading={true} css={override} size={50} />
                </div>
                <div className={"col-md-3"}>
                    <ClipLoader color={"#123abc"} loading={true} css={override} size={50} />
                </div>
            </>
        );
    };


    const filterProdut= (cat)=>{
        const updatedList= data.filter((x)=> x.categorie_nom===cat);
        setFilter(updatedList);
    }
    const ShowProducts= ()=>{
        return (
            <>

                <div className={"buttons d-flex justify-content-center mb-0 pb-3"}>
                    <button className={"btn btn-outline-dark me-2"} onClick={()=>setFilter(data)}>All</button>
                    <button className={"btn btn-outline-dark me-2"} onClick={()=>filterProdut("men's clothing")}>Men's Clothing</button>
                    <button className={"btn btn-outline-dark me-2"} onClick={()=>filterProdut("women's clothing")}>Women's Clothing</button>
                    <button className={"btn btn-outline-dark me-2"} onClick={()=>filterProdut("jewelery")}>Jewelery</button>
                    <button className={"btn btn-outline-dark me-2"} onClick={()=>filterProdut("electronics")}>Electronics</button>
                </div>
                {filter.map((product)=>{
                    return (

                            <div className={"col-md-3 mb-4"} key={product.id}>

                                <div className="card h-100 text-center p-4"  >
                                    <img  src={`assets/produits/samsung.jpg`} className="card-img-top"
                                          alt={product.nom} height="250"/>
                                    <div className="card-body">
                                        <h5 className="card-title mb-0">{product.nom.substring(0, 12)}</h5>
                                        <p className="card-text lead fw-bold ">${product.prix_unitaire}</p>
                                        <NavLink to={`/products/${product.id}`} className={"btn btn-outline-dark"}>Product Details</NavLink>
                                    </div>
                                </div>

                            </div>

                    )
                })}
            </>
        )
    }


    return (
        <>
            <div>
                <div className={"container my-5 py-5"}>
                    <div className={"row"}>
                        <div className={"col-12"}>
                            <h1 className={"display-6 fw-bolder text-center"}>Latest Products</h1>
                            <hr/>
                            {isListEmpty && (
                                <NotproductFound/>
                            )}
                        </div>

                    </div>

                    <div className={"row justify-content-center"}>
                        {loading ? <Loading/> : <ShowProducts/>}

                    </div>

                </div>
            </div>

        </>
    );
}

export default Products;
