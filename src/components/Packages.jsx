import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";

const Products = () => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isListEmpty, setIsListEmpty] = useState(false);

    let componentMounted = true;

    useEffect(() => {
        getPacks();

        return () => {
            componentMounted = false;
        };
    }, []);

    const getPacks = async () => {
        setLoading(true);

        try {
            const response = await fetch("http://127.0.0.1:8000/api/packs");
            const reponseData = await response.json();

            if (componentMounted &&  reponseData.status==='200'){
                setData(reponseData.packs.data);
                setFilter(reponseData.packs.data);
                setLoading(false);
            }
            if (reponseData.status==='404'){
                setIsListEmpty(true);
                setLoading(false);
            }

        } catch (error) {
            console.error("Error fetching data:", error);
            setIsListEmpty(true);
            setLoading(false);
        }
    };

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

    const NoPackageFound = () => {
        return (
            <div className="d-flex align-items-center justify-content-center ">
                <div className="text-center">
                    <h1 className="display-1 fw-bold">404</h1>
                    <p className="fs-3">
                        <span className="text-danger">Oops!</span> No package found.
                    </p>
                    <p className="lead">No package found this time! Go to home</p>
                    <NavLink to={"/home"} className="btn btn-primary">
                        Go Home
                    </NavLink>
                </div>
            </div>
        );
    };

    const ShowProducts = () => {
        return (
            <>
                {filter
                    .filter((pack) => pack.disponible === 1)
                    .map((pack) => (
                    <div key={pack.id} className="col-md-3 mb-4">
                        <div className="card h-100 text-center p-4">
                            <img src={`assets/packs/pack.jpg`} className="card-img-top" alt={pack.codePack} height="250" />
                            <div className="card-body">
                                <h5 className="card-title mb-0">{pack.codePack.substring(0, 12)}</h5>
                                <p className="card-text lead fw-bold ">${pack.prix}</p>
                                <NavLink to={`/packages/${pack.id}`} className={"btn btn-outline-dark"}>
                                    Pack Details
                                </NavLink>
                            </div>
                        </div>
                    </div>
                ))}
            </>
        );
    };

    return (
        <div>
            <div className={"container my-5 py-5"}>
                <div className={"row"}>
                    <div className={"col-12"}>
                        <h1 className={"display-6 fw-bolder text-center"}>Latest Packs</h1>
                        <hr />
                    </div>
                </div>

                {!isListEmpty ? (
                    <div className="row justify-content-center">
                        {loading ? <Loading /> : <ShowProducts />}
                    </div>
                ) : (
                    <NoPackageFound />
                )}
            </div>
        </div>
    );
};

export default Products;
