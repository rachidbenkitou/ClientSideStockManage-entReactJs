import '../App.css';
import {useEffect, useState} from "react";
import Skeleton from "react-loading-skeleton";


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
        const  response= await fetch("https://fakestoreapi.com/products");
        if(componentMounted){
            setData(await response.clone().json());
            setFilter(await response.json() );
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
        const updatedList= data.filter((x)=> x.category===cat);
        setFilter(updatedList);
    }
    const ShowProducts= ()=>{
        return (
            <>
                <div className={"buttons d-flex justify-content-center mb-5 pb-5"}>
                    <button className={"btn btn-outline-dark me-2"} onClick={()=>setFilter(data)}>All</button>
                    <button className={"btn btn-outline-dark me-2"} onClick={()=>filterProdut("men's clothing")}>Men's Clothing</button>
                    <button className={"btn btn-outline-dark me-2"} onClick={()=>filterProdut("women's clothing")}>Women's Clothing</button>
                    <button className={"btn btn-outline-dark me-2"} onClick={()=>filterProdut("jewelery")}>Jewelery</button>
                    <button className={"btn btn-outline-dark me-2"} onClick={()=>filterProdut("electronics")}>Electronics</button>
                </div>
                {filter.map((product)=>{
                    return (
                        <>
                            <div className={"col-md-3 mb-4"} >

                                <div className="card h-100 text-center p-4" key={product.id} >
                                    <img  src={product.image} className="card-img-top"
                                          alt={product.title} height="250"/>
                                    <div className="card-body">
                                        <h5 className="card-title mb-0">{product.title.substring(0, 12)}</h5>
                                        <p className="card-text lead fw-bold ">${product.price}</p>
                                        <a href={"#"} className={"btn btn-outline-dark"}>Add to Card</a>
                                    </div>
                                </div>

                            </div>
                        </>
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
