import React from 'react';

function Register() {
    return (
        <>
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card shadow">
                            <div className="card-body p-5">
                                <h2 className="text-center mb-4">Sign Up</h2>
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">
                                            Name
                                        </label>
                                        <input type="text" className="form-control" id="name" placeholder="Enter your name" />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">
                                            Email
                                        </label>
                                        <input type="email" className="form-control" id="email" placeholder="Enter your email" />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="telephone" className="form-label">
                                            Telephone
                                        </label>
                                        <input type="tel" className="form-control" id="telephone" placeholder="Enter your telephone number" />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">
                                            Password
                                        </label>
                                        <input type="password" className="form-control" id="password" placeholder="Enter your password" />
                                    </div>

                                    <div className="d-grid">
                                        <button type="submit" className="btn btn-dark btn-lg">
                                            Sign Up
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;
