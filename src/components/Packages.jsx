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
        getPacks();

    }, []);
    const getPacks=async () =>{
        setLoading(true);
        const  response= await fetch("http://127.0.0.1:8000/api/packs");
        if(componentMounted){
            const reponseData=await response.clone().json()
            setData(reponseData.packs.data);
            setFilter(reponseData.packs.data);
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

    const ShowProducts= ()=>{
        return (
            <>
                {filter.map((pack)=>{
                    return (

                        <div className={"col-md-3 mb-4"} key={pack.id}>

                            <div className="card h-100 text-center p-4"  >
                                <img  src={`assets/packs/pack.jpg`} className="card-img-top"
                                      alt={pack.codePack} height="250"/>
                                <div className="card-body">
                                    <h5 className="card-title mb-0">{pack.codePack.substring(0, 12)}</h5>
                                    <p className="card-text lead fw-bold ">${pack.prix}</p>
                                    <NavLink to={`/packages/${pack.id}`} className={"btn btn-outline-dark"}>Pack Details</NavLink>
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
                            <h1 className={"display-6 fw-bolder text-center"}>Latest Packs</h1>
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
