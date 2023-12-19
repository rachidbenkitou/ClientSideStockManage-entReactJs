import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

function Register() {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null);


    async function save(event){
        event.preventDefault();
        try {
            await axios.post("http://127.0.0.1:8000/api/registerClient",{
                firstName: firstName,
                lastName: lastName,
                adresse: address,
                phone: phone,
                email: email,
                password: password
            },
                {
                    withCredentials: false
                });

            makeAlert()
        } catch (err){
            // Display error message for 1 second
            setErrorMessage("Email or Phone already exists");
            setTimeout(() => {
                setErrorMessage(null);
            }, 10000);
        }
}

    const [showAlert, setShowAlert] = useState(false);

    const makeAlert = () => {
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
            navigate('/login')
        }, 100);

    };
    const Alert = () => {
        return (
            <div className="d-flex justify-content-center align-items-center">
                <div className="alert alert-success" role="alert" style={{ width: '400px', height: '50px', textAlign: 'center' }}>
                    Client Register Successfully.
                </div>
            </div>

        );
    };

    return (
        <>

            <div style={{ marginTop: '100px' }}>
                {showAlert && <Alert />}
            </div>

            <div className="container my-5">

                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card shadow">

                            <div className="card-body p-5">
                                <h2 className="text-center mb-4">Sign Up</h2>
                                {/* Display error message */}
                                {errorMessage && (

                                    <div className="alert alert-danger" role="alert">
                                        {errorMessage}
                                    </div>

                                )}
                                <form>
                                    <div className="mb-3">
                                        <label  className="form-label">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="firstName"
                                            value={firstName}
                                            onChange={(event)=>{
                                                setFirstName(event.target.value)
                                            }}
                                            placeholder="Enter your first name"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="lastName" className="form-label">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="lastName"
                                            placeholder="Enter your last name"
                                            value={lastName}
                                            onChange={(event)=>{
                                                setLastName(event.target.value)
                                            }}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="address" className="form-label">
                                            Address
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="address"
                                            placeholder="Enter your address"
                                            value={address}
                                            onChange={(event)=>{
                                                setAddress(event.target.value)
                                            }}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(event)=>{
                                                setEmail(event.target.value)
                                            }}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="telephone" className="form-label">
                                            Telephone
                                        </label>
                                        <input
                                            type="tel"
                                            className="form-control"
                                            id="telephone"
                                            placeholder="Enter your telephone number"
                                            value={phone}
                                            onChange={(event)=>{
                                                setPhone(event.target.value)
                                            }}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={(event)=>{
                                                setPassword(event.target.value)
                                            }}
                                        />
                                    </div>
                                    <div className="d-grid">
                                        <button type="submit" className="btn btn-dark btn-lg" onClick={save}>
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
