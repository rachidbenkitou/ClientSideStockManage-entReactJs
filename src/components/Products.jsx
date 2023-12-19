import '../App.css';
import {useEffect, useState} from "react";
import Skeleton from "react-loading-skeleton";
import {NavLink} from "react-router-dom";


const Products = () =>  {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState(data);
    const [loading, setLoading] =useState(false);
    let componentMounted= true;
    useEffect(()=>{
        getProducts();

    }, []);
    const getProducts=async () =>{
        setLoading(true);
        const  response= await fetch("http://127.0.0.1:8000/api/produits");
        if(componentMounted){
            const reponseData=await response.clone().json()
            setData(reponseData.produits.data);
            setFilter(reponseData.produits.data);
            setLoading(false)
        }

        return ()=>{
            componentMounted= false;
        }
    }
    const Loading= ()=>{
        return (
            <>
                <div className={"col-md-3"}>
                    <Skeleton height={350}/>
                </div>
                <div className={"col-md-3"}>
                    <Skeleton height={350}/>
                </div>
                <div className={"col-md-3"}>
                    <Skeleton height={350}/>
                </div>
                <div className={"col-md-3"}>
                    <Skeleton height={350}/>
                </div>

            </>
        )
    }

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
                                    <img  src={`assets/produits/${product.image}`} className="card-img-top"
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
