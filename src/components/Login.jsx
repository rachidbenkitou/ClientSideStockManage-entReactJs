import {NavLink, useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null);


    async function save(event) {
        event.preventDefault();
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/loginClient", {
                    email: email,
                    password: password
                },
                {
                    withCredentials: false
                });

            const token  = response.data.token;

            // Store the token in localStorage
            localStorage.setItem('myapptoken', token);
            navigate('/products')

        } catch (err) {
            // Display error message for 1 second
            setErrorMessage("Invalid email or password");
            setTimeout(() => {
                setErrorMessage(null);
            }, 10000);
        }
    }

    return (
        <>

            {/* Login 1 - Bootstrap Brain Component */}
            <div className="bg-light py-3 py-md-5">
                <div className="container">

                    <div className="row justify-content-md-center">
                        <div className="col-12 col-md-11 col-lg-8 col-xl-7 col-xxl-6">
                            <div className="bg-white p-4 p-md-5 rounded shadow-sm">
                                <div className="row">
                                    {/* Display error message */}
                                    {errorMessage && (

                                        <div className="alert alert-danger" role="alert">
                                            {errorMessage}
                                        </div>

                                    )}
                                    <div className="col-12">
                                        <div className="text-center mb-5">
                                            <NavLink className="navbar-brand fw-bold fs-4" to={'/'}>Please sign in
                                                here</NavLink>
                                        </div>
                                    </div>
                                </div>
                                <form>
                                    <div className="row gy-3 gy-md-4 overflow-hidden">
                                        <div className="col-12">
                                            <label htmlFor="email" className="form-label">Email <span
                                                className="text-danger">*</span></label>
                                            <div className="input-group">
                        <span className="input-group-text">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                               className="bi bi-envelope" viewBox="0 0 16 16">
                            <path
                                d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
                          </svg>
                        </span>
                                                <input type="email" className="form-control" name="email" id="email"
                                                       required
                                                       value={email}
                                                       onChange={(event)=>{
                                                           setEmail(event.target.value)
                                                       }}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="password" className="form-label">Password <span
                                                className="text-danger">*</span></label>
                                            <div className="input-group">
                        <span className="input-group-text">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                               className="bi bi-key" viewBox="0 0 16 16">
                            <path
                                d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8zm4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5z"/>
                            <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                          </svg>
                        </span>
                                                <input type="password" className="form-control" name="password"
                                                       id="password"  required
                                                       value={password}
                                                       onChange={(event)=>{
                                                           setPassword(event.target.value)
                                                       }}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="d-grid">
                                                <button className="btn btn-dark btn-lg" onClick={save}>Log In</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <div className="row">
                                    <div className="col-12">
                                        <hr className="mt-5 mb-4 border-secondary-subtle"/>
                                        <div
                                            className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-center">
                                            <NavLink to="#" className="link-secondary text-decoration-none">
                                                Create new account
                                            </NavLink>
                                            <NavLink to="#" className="link-secondary text-decoration-none">
                                                Forgot password
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
